import os
import time
import pandas as pd
import numpy as np
import torch
from modelos import RedDensa, RedLIF, RedQuimicaLIF, RedQuimicaLIFPyTorch

def asegurar_directorios():
    os.makedirs("/workspace/ensayo-filosofia-neurociencias/simulaciones/datos", exist_ok=True)
    os.makedirs("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos", exist_ok=True)

def ejecutar_experimento():
    asegurar_directorios()
    
    # Rango de tamaños de red para CPU (escala menor para evitar timeout)
    tamanos_cpu = [100, 500, 1000, 2000, 4000, 6000, 8000]
    # Rango de tamaños de red para GPU (escala masiva aprovechando la RTX 5070 Ti)
    tamanos_gpu = [100, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 100000, 250000, 500000, 1000000, 2000000]
    
    dt = 0.001 # 1 ms
    pasos_tiempo = 1000 # 1 segundo simulado
    
    # Consumos eléctricos estimados
    potencia_cpu = 100.0   # Watts (CPU + placa base)
    potencia_gpu = 250.0   # Watts (RTX 2060 + sistema en uso)
    
    registros_cpu = []
    registros_gpu = []
    
    print("==========================================================")
    # Ignorar advertencias de CUDA para el log limpio
    import warnings
    warnings.filterwarnings("ignore", category=UserWarning)
    
    # ------------------ 1. EJECUCIÓN BENCHMARK EN CPU (NUMPY) ------------------
    print("[+] Iniciando Benchmark en CPU (NumPy)...")
    for N in tamanos_cpu:
        print(f"    -> CPU: Probando N = {N}...")
        
        # Red Densa (ANN)
        red_densa = RedDensa(N)
        t_inicio = time.perf_counter()
        flops_densa_acum = 0
        for _ in range(pasos_tiempo):
            _, flops = red_densa.paso()
            flops_densa_acum += flops
        t_densa_ms = (time.perf_counter() - t_inicio) * 1000.0
        
        # Red Química Spiking (SNN)
        red_quimica = RedQuimicaLIF(N, dt=dt)
        I_ext = np.random.normal(25.0, 5.0, N).astype(np.float32)
        t_inicio = time.perf_counter()
        flops_quimica_acum = 0
        total_spikes_quimica = 0
        for _ in range(pasos_tiempo):
            spikes, _, flops = red_quimica.paso(I_ext)
            flops_quimica_acum += flops
            total_spikes_quimica += np.sum(spikes)
        t_quimica_ms = (time.perf_counter() - t_inicio) * 1000.0
        
        # Energía del carbono biológico con el nuevo modelo biofísico de ATP
        duracion = pasos_tiempo * dt
        energia_carbono_atp = (total_spikes_quimica * 1.65e-9) + (N * duracion * 5e-11)
        
        conexiones_por_neurona = int(N * 0.1)
        eventos_sinapticos = total_spikes_quimica * conexiones_por_neurona
        energia_por_evento_sinaptico_cpu = (potencia_cpu * (t_quimica_ms / 1000.0)) / eventos_sinapticos if eventos_sinapticos > 0 else 0.0
        energia_por_evento_sinaptico_carbono = energia_carbono_atp / eventos_sinapticos if eventos_sinapticos > 0 else 0.0
        
        registros_cpu.append({
            'N': N,
            'Tiempo_Densa_ms': t_densa_ms,
            'Tiempo_Quimica_ms': t_quimica_ms,
            'FLOPs_Quimica': flops_quimica_acum,
            'Energia_Silicio_J': (t_quimica_ms / 1000.0) * potencia_cpu,
            'Energia_Carbono_Sinaptica_J': energia_carbono_atp,  # Para compatibilidad con graficar.py
            'Energia_Carbono_ATP_J': energia_carbono_atp,
            'Eventos_Sinapticos': eventos_sinapticos,
            'Energia_Por_Evento_Sinaptico_Silicio_J': energia_por_evento_sinaptico_cpu,
            'Energia_Por_Evento_Sinaptico_Carbono_J': energia_por_evento_sinaptico_carbono,
            'Spikes_Totales': total_spikes_quimica
        })

    # ------------------ 2. EJECUCIÓN BENCHMARK EN GPU (PYTORCH + CUDA) ------------------
    print("\n[+] Iniciando Benchmark en GPU (PyTorch CUDA:0 - RTX 5070 Ti)...")
    device = 'cuda:0' if torch.cuda.is_available() else 'cpu'
    if device == 'cpu':
        print("[!] Advertencia: CUDA no disponible. Corriendo PyTorch en CPU.")
        
    for N in tamanos_gpu:
        print(f"    -> GPU: Probando N = {N}...")
        
        # Red Química Spiking en GPU (PyTorch)
        red_quimica_gpu = RedQuimicaLIFPyTorch(N, device=device, dt=dt)
        # Corriente externa directamente cargada en VRAM
        I_ext_gpu = torch.randn((N,), device=device, dtype=torch.float32) * 5.0 + 25.0
        
        t_inicio = time.perf_counter()
        flops_quimica_acum = torch.tensor(0.0, device=device)
        total_spikes_quimica = torch.tensor(0.0, device=device)
        
        for _ in range(pasos_tiempo):
            spikes, _, flops = red_quimica_gpu.paso(I_ext_gpu)
            flops_quimica_acum += flops
            total_spikes_quimica += spikes.sum()
            
        # Esperar a que la GPU complete todas las operaciones de forma asíncrona
        if torch.cuda.is_available():
            torch.cuda.synchronize(device=torch.device(device))
            
        t_quimica_ms = (time.perf_counter() - t_inicio) * 1000.0
        
        # Extraer valores finales a la CPU de una sola vez
        flops_quimica_acum = flops_quimica_acum.item()
        total_spikes_quimica = total_spikes_quimica.item()
        
        # Energía del carbono biológico con el nuevo modelo biofísico de ATP
        duracion = pasos_tiempo * dt
        energia_carbono_atp = (total_spikes_quimica * 1.65e-9) + (N * duracion * 5e-11)
        
        conexiones_por_neurona = int(N * 0.1)
        eventos_sinapticos = total_spikes_quimica * conexiones_por_neurona
        energia_por_evento_sinaptico_gpu = (potencia_gpu * (t_quimica_ms / 1000.0)) / eventos_sinapticos if eventos_sinapticos > 0 else 0.0
        energia_por_evento_sinaptico_carbono = energia_carbono_atp / eventos_sinapticos if eventos_sinapticos > 0 else 0.0
        
        registros_gpu.append({
            'N': N,
            'Tiempo_Quimica_ms': t_quimica_ms,
            'FLOPs_Quimica': flops_quimica_acum,
            'Energia_Silicio_J': (t_quimica_ms / 1000.0) * potencia_gpu,
            'Energia_Carbono_Sinaptica_J': energia_carbono_atp,  # Para compatibilidad con graficar.py
            'Energia_Carbono_ATP_J': energia_carbono_atp,
            'Eventos_Sinapticos': eventos_sinapticos,
            'Energia_Por_Evento_Sinaptico_Silicio_J': energia_por_evento_sinaptico_gpu,
            'Energia_Por_Evento_Sinaptico_Carbono_J': energia_por_evento_sinaptico_carbono,
            'Spikes_Totales': total_spikes_quimica
        })
        print(f"       [Spikes: {int(total_spikes_quimica):,} | Tiempo GPU: {t_quimica_ms:.2f} ms | Energía GPU: {(t_quimica_ms/1000.0)*potencia_gpu:.2e} J]")

    # Exportar resultados
    df_cpu = pd.DataFrame(registros_cpu)
    df_gpu = pd.DataFrame(registros_gpu)
    
    df_cpu.to_csv("/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_escalamiento.csv", index=False)
    df_gpu.to_csv("/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/resultados_escalamiento_gpu.csv", index=False)
    
    print("\n==========================================================")
    print("[+] Benchmark a gran escala completado.")
    print("[+] Datos de CPU guardados en: datos/resultados_escalamiento.csv")
    print("[+] Datos de GPU guardados en: datos/resultados_escalamiento_gpu.csv")
    print("==========================================================")

if __name__ == "__main__":
    ejecutar_experimento()
