"""
experimentos_variabilidad.py — Tres experimentos que convierten la diferencia
de sustrato en argumento filosofico: la VARIABILIDAD del carbono frente al
silicio se escala en muchos ejes simultaneos.

  Exp 7 — Variabilidad / espacio de estados : grados de libertad por unidad
  Exp 8 — I/O y ancho de banda de conexion   : fan-out 3D + entrega circulatoria
  Exp 9 — Intercambio quimico-pasivo vs       : el MODO de intercambio fija el
           electrico-activo (energia)            piso energetico

Cifras fundamentadas (fuentes en el ensayo/tesis):
  - Bartol et al. 2015 (eLife 10778): 26 estados sinapticos = 4.7 bits/sinapsis.
  - Attwell & Laughlin 2001 (JCBFM 21:1133): ~3.29e9 ATP = 210.85 pJ por potencial de accion.
  - Horowitz 2014 (ISSCC): FLOP ~0.1-3 pJ; acceso DRAM 64-bit ~1300-2600 pJ (mover >> computar).
  - Vasculatura: ~600 km de capilares, cada neurona a ~20 um de un capilar, ratio 1:1.
  - Sinapsis por neurona pyramidal cortical: ~7.000 excitatorias (+ >1.000 inhibitorias).
"""
import os
import math
import numpy as np
import pandas as pd

DATOS = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos"

# --- Constantes fundamentadas ---
BITS_SYN_CARBONO = 4.7      # Bartol et al. 2015
BITS_SYN_SILICIO = 1.0      # senalizacion binaria (spike/no-spike por ciclo)
NIVELES_MODULADOR = 10      # niveles graduados por neuromodulador (analogico)
E_FLOP_PJ = 3.0             # Horowitz 2014: mult 32-bit ~3 pJ
E_DRAM64_PJ = 1950.0        # Horowitz 2014: acceso DRAM 64-bit ~1300-2600 pJ (media)
E_AP_PJ = 210.85            # Attwell & Laughlin 2001
FANOUT_CARBONO = 7000       # sinapsis excitatorias / neurona pyramidal L2/3
FANOUT_SILICIO = 6          # fan-out electrico tipico de una compuerta CMOS
CAPILARES_KM = 600.0
DIST_NEURONA_CAPILAR_UM = 20.0


def asegurar_dir():
    os.makedirs(DATOS, exist_ok=True)


# ==========================================================
# EXP 7: VARIABILIDAD / ESPACIO DE ESTADOS (grados de libertad)
# ==========================================================
def exp7_variabilidad():
    print("\n--- EXP 7: Variabilidad / espacio de estados ---")
    # (a) Barrido por numero de sinapsis: log2 del espacio de estados accesible
    n_syn = [100, 500, 1000, 5000, 7000, 10000, 20000]
    filas = []
    for n in n_syn:
        carb = n * BITS_SYN_CARBONO          # log2(estados) carbono (graduado)
        sil = n * BITS_SYN_SILICIO           # log2(estados) silicio (binario)
        filas.append({
            "n_sinapsis": n,
            "carbono_log2_estados": carb,
            "silicio_log2_estados": sil,
            "bits_extra_carbono": carb - sil,
            "ratio_log10_estados": (carb - sil) * math.log10(2),
        })
    pd.DataFrame(filas).to_csv(f"{DATOS}/exp7_variabilidad.csv", index=False)

    # (b) Combinatoria neuromoduladora a n=7000 sinapsis
    mods = list(range(0, 101, 10))
    filas_m = []
    base = FANOUT_CARBONO * BITS_SYN_CARBONO
    for m in mods:
        mod_bits = m * math.log2(NIVELES_MODULADOR)
        filas_m.append({
            "n_moduladores": m,
            "carbono_log2_estados": base + mod_bits,
            "modulacion_log2": mod_bits,
        })
    pd.DataFrame(filas_m).to_csv(f"{DATOS}/exp7_modulacion.csv", index=False)

    per_syn = BITS_SYN_CARBONO / BITS_SYN_SILICIO
    print(f"  Por sinapsis: carbono {BITS_SYN_CARBONO} bits vs silicio {BITS_SYN_SILICIO} bit = {per_syn:.1f}x info")
    print(f"  A 7.000 sinapsis: carbono ~{base:,.0f} bits de espacio de estados vs silicio {FANOUT_CARBONO:,} bits")
    print(f"  +100 neuromoduladores (x{NIVELES_MODULADOR} niveles): +{100*math.log2(NIVELES_MODULADOR):,.0f} bits combinatorios")


# ==========================================================
# EXP 8: I/O Y ANCHO DE BANDA DE CONEXION
# ==========================================================
def exp8_io():
    print("\n--- EXP 8: I/O y ancho de banda de conexion ---")
    # (a) Fan-out por unidad
    ratio_fanout = FANOUT_CARBONO / FANOUT_SILICIO

    # (b) Costo de cableado 2D (silicio) vs 3D (carbono) al escalar N unidades.
    #     Indice de cableado ~ fan-out * distancia caracteristica ~ N^(1/D).
    #     Ratio 2D/3D = N^(1/2 - 1/3) = N^(1/6).
    Ns = [1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 8.6e10, 1e11]
    filas = []
    for N in Ns:
        wire_2d = N ** (1.0 / 2.0)
        wire_3d = N ** (1.0 / 3.0)
        filas.append({
            "N_unidades": N,
            "cableado_2d_silicio": wire_2d,
            "cableado_3d_carbono": wire_3d,
            "ratio_2d_sobre_3d": wire_2d / wire_3d,   # = N^(1/6)
        })
    pd.DataFrame(filas).to_csv(f"{DATOS}/exp8_io.csv", index=False)

    # (c) Entrega de recursos: co-localizacion volumetrica del sistema circulatorio
    resumen = pd.DataFrame([{
        "fanout_carbono": FANOUT_CARBONO,
        "fanout_silicio": FANOUT_SILICIO,
        "ratio_fanout": ratio_fanout,
        "capilares_km": CAPILARES_KM,
        "dist_neurona_capilar_um": DIST_NEURONA_CAPILAR_UM,
        "ratio_capilar_neurona": 1.0,
        "ratio_cableado_cerebro_1e11": (1e11) ** (1.0 / 6.0),
    }])
    resumen.to_csv(f"{DATOS}/exp8_resumen.csv", index=False)

    print(f"  Fan-out: carbono {FANOUT_CARBONO:,} vs silicio {FANOUT_SILICIO} = {ratio_fanout:,.0f}x")
    print(f"  Cableado a escala cerebral (N=1e11): 2D silicio necesita {(1e11)**(1/6):,.0f}x el 3D del carbono")
    print(f"  Entrega: {CAPILARES_KM:.0f} km de capilares, cada neurona a ~{DIST_NEURONA_CAPILAR_UM:.0f} um, ratio 1:1 (sin analogo cableado)")


# ==========================================================
# EXP 9: INTERCAMBIO QUIMICO-PASIVO vs ELECTRICO-ACTIVO
# ==========================================================
def exp9_intercambio():
    print("\n--- EXP 9: Intercambio quimico-pasivo vs electrico-activo ---")
    e_bit_dram = E_DRAM64_PJ / 64.0    # pJ por bit movido off-chip
    ratio_mover_vs_computar = E_DRAM64_PJ / E_FLOP_PJ

    eventos = pd.DataFrame([
        {"evento": "Computar (silicio, activo)", "energia_pJ": E_FLOP_PJ, "modo": "electrico-activo"},
        {"evento": "Mover 64 bits a DRAM (silicio, activo)", "energia_pJ": E_DRAM64_PJ, "modo": "electrico-activo"},
        {"evento": "Potencial de accion (carbono)", "energia_pJ": E_AP_PJ, "modo": "quimico-pasivo (restauracion amortizada)"},
    ])
    eventos.to_csv(f"{DATOS}/exp9_intercambio.csv", index=False)

    # Desglose: en el silicio, ¿cuanto es computo y cuanto es intercambio (movimiento)?
    desglose = pd.DataFrame([
        {"componente": "Computo (aritmetica)", "energia_pJ": E_FLOP_PJ, "fraccion": E_FLOP_PJ / (E_FLOP_PJ + E_DRAM64_PJ)},
        {"componente": "Intercambio (mover datos)", "energia_pJ": E_DRAM64_PJ, "fraccion": E_DRAM64_PJ / (E_FLOP_PJ + E_DRAM64_PJ)},
    ])
    desglose.to_csv(f"{DATOS}/exp9_desglose.csv", index=False)

    print(f"  Silicio: mover datos cuesta ~{ratio_mover_vs_computar:.0f}x computarlos (Horowitz 2014)")
    print(f"    -> {desglose['fraccion'].iloc[1]*100:.1f}% de la energia es INTERCAMBIO, no computo")
    print(f"  Carbono: el transporte es difusion pasiva (gradiente espontaneo); solo se paga la")
    print(f"    restauracion del gradiente via bomba ATPasa, amortizada ({E_AP_PJ:.0f} pJ/PA, Attwell-Laughlin)")


def main():
    asegurar_dir()
    exp7_variabilidad()
    exp8_io()
    exp9_intercambio()
    print("\n===> 3 experimentos de variabilidad completados")


if __name__ == "__main__":
    main()
