"""
ejecutar.py — Benchmark escalonado CPU + 2 GPU + Hibrido.

Politica DELIBERADA: NO optimizamos el codigo para hacerlo rapido.
La idea es mostrar empiricamente que cada tier de hardware introduce
un cuello de botella mayor:

  Tier 1 (CPU NumPy)         -> OK hasta ~10K neuronas; loop Python.
  Tier 2 (cuda:0 alone)      -> Hasta ~6-8M neuronas (16GB VRAM).
  Tier 3 (cuda:0 + cuda:1)   -> Hasta ~12M; aparece latencia PCIe.
  Tier 4 (cuda:0+1 + CPU)    -> Hasta ~18-20M; aparece latencia PCIe
                                + DDR + Python GIL synchronization.

El ensayo usa cada tier como evidencia del Von Neumann bottleneck
hecho fisicamente visible.

Variables de entorno:
  WANDB_DISABLED, N_BIG_SKIP (para skip rapido de tier 4 si quieres).
"""
import os
import sys
import time
import json
import subprocess
import warnings
from datetime import datetime, timezone

import numpy as np
import pandas as pd
import torch

# Reduce fragmentacion de VRAM en PyTorch (clave para >=8M neuronas).
os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")

warnings.filterwarnings("ignore", category=UserWarning)

from modelos import (
    RedDensa, RedQuimicaLIF, RedQuimicaLIFPyTorch,
    RedQuimicaLIFMultiGPU, RedQuimicaLIFHibrida,
)


# Constantes biofisicas y energeticas (calibradas con literatura)
POTENCIA_CPU_W = 100.0     # Watts CPU + motherboard
POTENCIA_GPU0_W = 250.0    # RTX 5070 Ti TDP observado
POTENCIA_GPU1_W = 160.0    # RTX 2060 TDP observado
DT = 0.001                 # 1 ms
PASOS = 1000               # 1 segundo simulado

# Energia bioquimica del carbono:
# 1 spike ≈ 1.65e-9 J (re-polarizacion via bomba Na/K usando ATP)
# Leak pasivo: ~5e-11 J / neurona / segundo
ATP_POR_SPIKE_J = 1.65e-9
LEAK_POR_NEURONA_S_J = 5.0e-11


def asegurar_directorios():
    os.makedirs("/workspace/ensayo-filosofia-neurociencias/simulaciones/datos", exist_ok=True)
    os.makedirs("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos", exist_ok=True)


def muestrear_potencia_gpu():
    """Lee potencia instantanea (W) por GPU con nvidia-smi. Tolerante a fallos."""
    try:
        out = subprocess.check_output(
            [
                "nvidia-smi",
                "--query-gpu=index,power.draw,memory.used",
                "--format=csv,noheader,nounits",
            ],
            stderr=subprocess.DEVNULL,
            timeout=5,
        ).decode()
        res = []
        for line in out.strip().split("\n"):
            parts = [p.strip() for p in line.split(",")]
            res.append({
                "idx": int(parts[0]),
                "power_w": float(parts[1]),
                "mem_mib": float(parts[2]),
            })
        return res
    except Exception:
        return []


def formato_tiempo(seg):
    if seg < 1:
        return f"{seg*1000:.1f} ms"
    if seg < 60:
        return f"{seg:.2f} s"
    if seg < 3600:
        m, s = divmod(seg, 60)
        return f"{int(m)}m {int(s)}s"
    h, rem = divmod(seg, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h)}h {int(m)}m {int(s)}s"


def benchmark_cpu(N, pasos=PASOS, dt=DT):
    """Tier 1: CPU NumPy."""
    red_densa = RedDensa(N)
    red_quimica = RedQuimicaLIF(N, dt=dt)
    I_ext = np.random.normal(25.0, 5.0, N).astype(np.float32)
    # ANN densa
    t0 = time.perf_counter()
    for _ in range(pasos):
        _, _ = red_densa.paso()
    t_densa = (time.perf_counter() - t0) * 1000.0
    # SNN quimica con homeostasis
    t0 = time.perf_counter()
    flops_acum = 0
    spikes_total = 0
    for _ in range(pasos):
        spikes, _, flops = red_quimica.paso(I_ext)
        flops_acum += flops
        spikes_total += int(np.sum(spikes))
    t_quimica = (time.perf_counter() - t0) * 1000.0
    return {
        "N": N,
        "tier": "CPU",
        "t_densa_ms": t_densa,
        "t_quimica_ms": t_quimica,
        "flops": flops_acum,
        "spikes": spikes_total,
        "potencia_w": POTENCIA_CPU_W,
    }


def benchmark_gpu_single(N, pasos=PASOS, dt=DT, device='cuda:0'):
    """Tier 2: cuda:0 alone."""
    red = RedQuimicaLIFPyTorch(N, device=device, dt=dt)
    I_ext = torch.randn((N,), device=device, dtype=torch.float32) * 5.0 + 25.0
    # Warm-up GPU
    for _ in range(3):
        _ = red.paso(I_ext)
    torch.cuda.synchronize(device=torch.device(device))
    # Bench
    muestreos = []
    t0 = time.perf_counter()
    flops_acum = 0
    spikes_total = 0
    for i in range(pasos):
        spikes, _, flops = red.paso(I_ext)
        flops_acum += flops
        spikes_total += int(spikes.sum().item())
        if i % 100 == 0:
            muestreos.append(muestrear_potencia_gpu())
    torch.cuda.synchronize(device=torch.device(device))
    t_total = (time.perf_counter() - t0) * 1000.0
    p_media = (
        float(np.mean([m[0]["power_w"] for m in muestreos if m]))
        if muestreos else POTENCIA_GPU0_W
    )
    return {
        "N": N,
        "tier": f"SingleGPU:{device}",
        "t_densa_ms": None,
        "t_quimica_ms": t_total,
        "flops": flops_acum,
        "spikes": spikes_total,
        "potencia_w": p_media,
    }


def benchmark_gpu_multi(N, pasos=PASOS, dt=DT):
    """Tier 3: cuda:0 + cuda:1."""
    red = RedQuimicaLIFMultiGPU(N, device0='cuda:0', device1='cuda:1', dt=dt)
    I_ext = torch.randn((N,), device='cpu', dtype=torch.float32) * 5.0 + 25.0
    for _ in range(30):
        _ = red.paso(I_ext)
    torch.cuda.synchronize()
    muestreos = []
    t0 = time.perf_counter()
    flops_acum = 0
    spikes_total = 0
    for i in range(pasos):
        spikes, _, flops = red.paso(I_ext)
        flops_acum += flops
        spikes_total += int(spikes.sum().item())
        if i % 100 == 0:
            muestreos.append(muestrear_potencia_gpu())
    torch.cuda.synchronize()
    t_total = (time.perf_counter() - t0) * 1000.0
    p0 = float(np.mean([m[0]["power_w"] for m in muestreos if m])) if muestreos else POTENCIA_GPU0_W
    p1 = float(np.mean([m[1]["power_w"] for m in muestreos if m])) if muestreos else POTENCIA_GPU1_W
    return {
        "N": N,
        "tier": "MultiGPU:cuda:0+cuda:1",
        "t_densa_ms": None,
        "t_quimica_ms": t_total,
        "flops": flops_acum,
        "spikes": spikes_total,
        "potencia_w": p0 + p1,
        "potencia_detalle": {"cuda:0": p0, "cuda:1": p1},
    }


def benchmark_hibrido(N, pasos=PASOS, dt=DT):
    """Tier 4: cuda:0 + cuda:1 + subred CPU."""
    red = RedQuimicaLIFHibrida(N, device0='cuda:0', device1='cuda:1', dt=dt)
    I_ext = torch.randn((N,), device='cpu', dtype=torch.float32) * 5.0 + 25.0
    for _ in range(30):  # warm-up
        _ = red.paso(I_ext)
    torch.cuda.synchronize()
    muestreos = []
    t0 = time.perf_counter()
    flops_acum = 0
    spikes_total = 0
    for i in range(pasos):
        spikes, _, flops = red.paso(I_ext)
        flops_acum += flops
        spikes_total += int(spikes.sum().item())
        if i % 100 == 0:
            muestreos.append(muestrear_potencia_gpu())
    torch.cuda.synchronize()
    t_total = (time.perf_counter() - t0) * 1000.0
    p0 = float(np.mean([m[0]["power_w"] for m in muestreos if m])) if muestreos else POTENCIA_GPU0_W
    p1 = float(np.mean([m[1]["power_w"] for m in muestreos if m])) if muestreos else POTENCIA_GPU1_W
    return {
        "N": N,
        "tier": "Hibrido:cuda:0+cuda:1+CPU",
        "t_densa_ms": None,
        "t_quimica_ms": t_total,
        "flops": flops_acum,
        "spikes": spikes_total,
        "potencia_w": p0 + p1 + POTENCIA_CPU_W,
        "potencia_detalle": {"cuda:0": p0, "cuda:1": p1, "cpu": POTENCIA_CPU_W},
    }


def agregar_metricas_energia(registro):
    """Calcula energia silicio y carbono por evento sinaptico."""
    N = registro["N"]
    pasos = PASOS
    dt = DT
    spikes = registro["spikes"]
    flops = registro["flops"]
    t_quimica_ms = registro["t_quimica_ms"]
    potencia_w = registro["potencia_w"]
    # Silicio: potencia * tiempo (J)
    energia_silicio_J = (t_quimica_ms / 1000.0) * potencia_w
    # Carbono: ATP por spike + leak pasivo
    energia_carbono_J = spikes * ATP_POR_SPIKE_J + N * pasos * dt * LEAK_POR_NEURONA_S_J
    # Eventos sinapticos biologicos: ~10% conectividad, fan-out
    conexiones_por_neurona = max(1, int(N * 0.1))
    eventos_sinapticos = spikes * conexiones_por_neurona
    e_por_evento_silicio = energia_silicio_J / eventos_sinapticos if eventos_sinapticos > 0 else 0.0
    e_por_evento_carbono = energia_carbono_J / eventos_sinapticos if eventos_sinapticos > 0 else 0.0
    brecha = e_por_evento_silicio / e_por_evento_carbono if e_por_evento_carbono > 0 else 0.0
    registro.update({
        "energia_silicio_J": energia_silicio_J,
        "energia_carbono_J": energia_carbono_J,
        "eventos_sinapticos": eventos_sinapticos,
        "energia_por_evento_silicio_J": e_por_evento_silicio,
        "energia_por_evento_carbono_J": e_por_evento_carbono,
        "brecha_eficiencia": brecha,
        "tiempo_formateado": formato_tiempo(t_quimica_ms / 1000.0),
    })
    return registro


def ejecutar_experimento():
    asegurar_directorios()
    # Tamanos staggered por tier (cada tier evidencia un cuello de botella).
    tamanos_cpu = [100, 500, 1000, 2000, 4000, 8000]
    tamanos_gpu_single = [50_000, 100_000, 250_000, 500_000, 1_000_000, 2_000_000, 4_000_000, 6_000_000]
    tamanos_gpu_multi = [8_000_000, 10_000_000, 12_000_000]
    tamanos_hibrido = [14_000_000, 16_000_000]

    registros = []
    out_csv = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_escalamiento.csv"

    def guardar_parcial():
        df_p = pd.DataFrame(registros)
        cols = [
            "tier", "N", "t_densa_ms", "t_quimica_ms", "tiempo_formateado",
            "flops", "spikes", "potencia_w", "eventos_sinapticos",
            "energia_silicio_J", "energia_carbono_J",
            "energia_por_evento_silicio_J", "energia_por_evento_carbono_J",
            "brecha_eficiencia",
        ]
        df_p = df_p[[c for c in cols if c in df_p.columns]]
        df_p.to_csv(out_csv, index=False)

    print("=" * 70)
    print("TIER 1 — CPU (NumPy) — el cuello de botella es el loop Python puro")
    print("=" * 70)
    for N in tamanos_cpu:
        print(f"  CPU: N = {N:,} ...", end="", flush=True)
        try:
            r = benchmark_cpu(N)
            r = agregar_metricas_energia(r)
            registros.append(r)
            guardar_parcial()
            print(f" ok | {r['tiempo_formateado']} | brecha = {r['brecha_eficiencia']:.2e}x")
        except Exception as e:
            print(f" FAIL: {e}")

    if torch.cuda.is_available():
        print()
        print("=" * 70)
        print("TIER 2 — SINGLE GPU (cuda:0, RTX 5070 Ti 16GB) — VRAM limitada")
        print("=" * 70)
        for N in tamanos_gpu_single:
            print(f"  cuda:0: N = {N:,} ...", end="", flush=True)
            try:
                r = benchmark_gpu_single(N, device='cuda:0')
                r = agregar_metricas_energia(r)
                registros.append(r)
                guardar_parcial()
                print(
                    f" ok | {r['tiempo_formateado']} | "
                    f"potencia ~ {r['potencia_w']:.0f}W | "
                    f"brecha = {r['brecha_eficiencia']:.2e}x"
                )
            except torch.cuda.OutOfMemoryError as e:
                torch.cuda.empty_cache()
                print(f" OOM: {e}")
                break
            except Exception as e:
                print(f" FAIL: {e}")

        if torch.cuda.device_count() >= 2:
            print()
            print("=" * 70)
            print("TIER 3 — MULTI-GPU (cuda:0 + cuda:1) — PCIe se vuelve cuello")
            print("=" * 70)
            for N in tamanos_gpu_multi:
                print(f"  Multi-GPU: N = {N:,} ...", end="", flush=True)
                try:
                    r = benchmark_gpu_multi(N)
                    r = agregar_metricas_energia(r)
                    registros.append(r)
                    guardar_parcial()
                    print(
                        f" ok | {r['tiempo_formateado']} | "
                        f"potencia total = {r['potencia_w']:.0f}W | "
                        f"brecha = {r['brecha_eficiencia']:.2e}x"
                    )
                except torch.cuda.OutOfMemoryError as e:
                    torch.cuda.empty_cache()
                    print(f" OOM: {e}")
                    break
                except Exception as e:
                    print(f" FAIL: {e}")

            print()
            print("=" * 70)
            print("TIER 4 — HIBRIDO (cuda:0 + cuda:1 + CPU) — DDR + PCIe + GIL")
            print("=" * 70)
            for N in tamanos_hibrido:
                print(f"  Hibrido: N = {N:,} ...", end="", flush=True)
                try:
                    r = benchmark_hibrido(N)
                    r = agregar_metricas_energia(r)
                    registros.append(r)
                    guardar_parcial()
                    print(
                        f" ok | {r['tiempo_formateado']} | "
                        f"potencia total = {r['potencia_w']:.0f}W | "
                        f"brecha = {r['brecha_eficiencia']:.2e}x"
                    )
                except (torch.cuda.OutOfMemoryError, MemoryError) as e:
                    torch.cuda.empty_cache()
                    print(f" OOM: {e}")
                    break
                except Exception as e:
                    print(f" FAIL: {e}")

    df = pd.DataFrame(registros)
    cols = [
        "tier", "N", "t_densa_ms", "t_quimica_ms", "tiempo_formateado",
        "flops", "spikes", "potencia_w", "eventos_sinapticos",
        "energia_silicio_J", "energia_carbono_J",
        "energia_por_evento_silicio_J", "energia_por_evento_carbono_J",
        "brecha_eficiencia",
    ]
    df = df[[c for c in cols if c in df.columns]]
    out_csv = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_escalamiento.csv"
    df.to_csv(out_csv, index=False)
    # Tambien guardamos JSON con metadatos (potencias detalladas por tier)
    df.to_json(
        "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_escalamiento.json",
        orient="records",
        indent=2,
    )

    # Resumen ejecutivo
    print()
    print("=" * 70)
    print("RESUMEN — Brecha de eficiencia silicio/carbono por tier")
    print("=" * 70)
    resumen = df.groupby("tier").agg(
        N_max=("N", "max"),
        t_max=("t_quimica_ms", "max"),
        brecha_min=("brecha_eficiencia", "min"),
        brecha_max=("brecha_eficiencia", "max"),
        energia_silicio_max=("energia_silicio_J", "max"),
        energia_carbono_min=("energia_carbono_J", "min"),
    )
    print(resumen.to_string())

    # Metadata
    meta = {
        "fecha_utc": datetime.now(timezone.utc).isoformat(),
        "gpus_disponibles": [
            {
                "idx": i,
                "name": torch.cuda.get_device_name(i),
                "memory_gb": torch.cuda.get_device_properties(i).total_memory / 1e9,
            }
            for i in range(torch.cuda.device_count())
        ] if torch.cuda.is_available() else [],
        "potencias_w": {
            "cpu": POTENCIA_CPU_W,
            "gpu0": POTENCIA_GPU0_W,
            "gpu1": POTENCIA_GPU1_W,
        },
        "constantes_biofisicas": {
            "atp_por_spike_J": ATP_POR_SPIKE_J,
            "leak_por_neurona_s_J": LEAK_POR_NEURONA_S_J,
        },
        "N_max_por_tier": {tier: int(df[df["tier"] == tier]["N"].max()) for tier in df["tier"].unique()},
    }
    with open(
        "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_meta.json", "w"
    ) as f:
        json.dump(meta, f, indent=2)
    print()
    print(f"  Datos CSV:    {out_csv}")
    print(f"  Datos JSON:   /workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_escalamiento.json")
    print(f"  Metadata:     /workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_meta.json")
    print("=" * 70)
    return df


if __name__ == "__main__":
    ejecutar_experimento()