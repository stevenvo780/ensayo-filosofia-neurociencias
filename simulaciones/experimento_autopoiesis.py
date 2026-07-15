"""
Experimento 10 — Acoplamiento homeostático: la firma operacional de la autopoiesis.

NO mide conciencia. Mide el *acoplamiento estructural* entre cómputo y
auto-mantenimiento, que es la signatura operacional de un sistema autopoiético:
en el carbono vivo, los recursos que HACEN el cómputo (gradientes iónicos) son
los mismos que hay que REGENERAR activamente para no disolverse; cómputo y
supervivencia son el mismo proceso. En el silicio de Von Neumann, el cómputo se
alimenta de una fuente externa y el "mantenimiento" está desacoplado.

Diseño (simulación dinámica, N semillas → media ± DE):
- M unidades con un recurso R∈[0,1] (integridad de membrana / gradiente).
- Tarea: responder a una entrada de Poisson. Una unidad responde (spike) solo si
  R > umbral; cada spike consume el recurso.
- ACOPLADO (carbono): R se restaura por una bomba homeostática de capacidad P
  (dR = P·(1-R) − consumo). Si P cae, R no se recupera y el cómputo degrada.
- DESACOPLADO (silicio): R se mantiene a 1 por suministro externo cada paso; P es
  un costo aparte que NO afecta a R. Perturbar P no toca el cómputo.
- A mitad de la simulación se aplica una "lesión metabólica" (P ·= 0.3).
- Coeficiente de acoplamiento κ = (caída relativa de desempeño) / (caída de P).

Salidas: datos/exp10_acoplamiento.csv, datos/exp10_resumen.csv,
graficos/exp10_acoplamiento.png (y copia en web/public/graficos).
"""
import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

DATOS = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos"
SALIDAS = [
    "/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos",
    "/workspace/ensayo-filosofia-neurociencias/web/public/graficos",
]
SI, CARB, DANGER, BG, TXT, MUTED = "#2f6ea6", "#b25a24", "#d94f4f", "#fdfbf6", "#1f1c17", "#756d5f"
plt.rcParams.update({
    "figure.facecolor": BG, "axes.facecolor": BG, "savefig.facecolor": BG,
    "text.color": TXT, "axes.labelcolor": TXT, "xtick.color": MUTED, "ytick.color": MUTED,
    "axes.edgecolor": "#d2c9b4", "font.size": 11, "axes.titlesize": 13, "axes.titleweight": "bold",
})

# --- Parámetros ---
M = 200            # unidades
T = 2000           # pasos
T_PERT = 1000      # paso de la lesión metabólica
UMBRAL = 0.25      # R mínimo para poder computar
CONSUMO = 0.06     # recurso consumido por spike
P0 = 0.05          # capacidad de bomba homeostática (restauración/paso)
LAMBDA = 0.5       # prob. de entrada por unidad por paso
FACTOR_LESION = 0.3  # P se reduce al 30% tras la lesión
SEMILLAS = list(range(24))


def simular(acoplado, seed):
    rng = np.random.default_rng(seed)
    R = np.ones(M)
    P = P0
    desempeno = np.zeros(T)
    for t in range(T):
        if t == T_PERT:
            P = P0 * FACTOR_LESION
        entrada = rng.random(M) < LAMBDA          # eventos de entrada
        puede = R > UMBRAL                          # ¿tiene recurso para computar?
        spike = entrada & puede
        # desempeño = fracción de entradas atendidas
        n_ent = entrada.sum()
        desempeno[t] = spike.sum() / n_ent if n_ent else 1.0
        if acoplado:
            R = R - CONSUMO * spike                 # consumo del recurso propio
            R = R + P * (1.0 - R)                    # restauración homeostática (depende de P)
            R = np.clip(R, 0.0, 1.0)
        else:
            # silicio: recurso repuesto por fuente externa, independiente de P
            R = np.ones(M)
    return desempeno


def kappa(desempeno):
    # caída relativa de desempeño (ventanas antes/después de la lesión) / caída de P
    antes = desempeno[T_PERT - 200:T_PERT].mean()
    despues = desempeno[T - 200:T].mean()
    caida_desemp = (antes - despues) / antes if antes else 0.0
    caida_P = 1.0 - FACTOR_LESION
    return caida_desemp / caida_P, antes, despues


def main():
    os.makedirs(DATOS, exist_ok=True)
    curvas_ac, curvas_de = [], []
    ks_ac, ks_de = [], []
    for s in SEMILLAS:
        d_ac = simular(True, s)
        d_de = simular(False, s)
        curvas_ac.append(d_ac)
        curvas_de.append(d_de)
        ks_ac.append(kappa(d_ac)[0])
        ks_de.append(kappa(d_de)[0])
    curvas_ac, curvas_de = np.array(curvas_ac), np.array(curvas_de)
    ks_ac, ks_de = np.array(ks_ac), np.array(ks_de)

    # Serie temporal media
    df = pd.DataFrame({
        "paso": np.arange(T),
        "desempeno_acoplado": curvas_ac.mean(0),
        "desempeno_acoplado_de": curvas_ac.std(0),
        "desempeno_desacoplado": curvas_de.mean(0),
        "desempeno_desacoplado_de": curvas_de.std(0),
    })
    df.to_csv(f"{DATOS}/exp10_acoplamiento.csv", index=False)
    resumen = pd.DataFrame([
        {"sistema": "Acoplado (carbono)", "kappa_media": ks_ac.mean(), "kappa_de": ks_ac.std(), "n_semillas": len(SEMILLAS)},
        {"sistema": "Desacoplado (silicio)", "kappa_media": ks_de.mean(), "kappa_de": ks_de.std(), "n_semillas": len(SEMILLAS)},
    ])
    resumen.to_csv(f"{DATOS}/exp10_resumen.csv", index=False)

    print("--- EXP 10: Acoplamiento homeostático (autopoiesis operacional) ---")
    print(f"  Lesion metabolica en t={T_PERT}: bomba P al {int(FACTOR_LESION*100)}%")
    print(f"  Acoplado (carbono):    kappa = {ks_ac.mean():.2f} +/- {ks_ac.std():.2f}  (desempeno cae con la lesion)")
    print(f"  Desacoplado (silicio): kappa = {ks_de.mean():.2f} +/- {ks_de.std():.2f}  (computo indiferente a la lesion)")

    # --- Gráfico ---
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.2))
    x = np.arange(T)
    for curvas, col, lab in [(curvas_ac, CARB, "Acoplado (carbono)"), (curvas_de, SI, "Desacoplado (silicio)")]:
        m, sd = curvas.mean(0), curvas.std(0)
        ax1.plot(x, m, color=col, lw=1.8, label=lab)
        ax1.fill_between(x, m - sd, m + sd, color=col, alpha=0.15)
    ax1.axvline(T_PERT, color=DANGER, ls="--", lw=1.3)
    ax1.text(T_PERT + 15, 0.12, "lesión metabólica\n(bomba al 30%)", color=DANGER, fontsize=9, va="bottom")
    ax1.set_xlabel("paso de simulación"); ax1.set_ylabel("desempeño (fracción de entradas atendidas)")
    ax1.set_ylim(0, 1.05); ax1.set_title("Cómputo bajo insulto al auto-mantenimiento")
    ax1.legend(frameon=False, fontsize=9, loc="lower left")

    labels = ["Acoplado\n(carbono)", "Desacoplado\n(silicio)"]
    medias = [ks_ac.mean(), ks_de.mean()]
    errs = [ks_ac.std(), ks_de.std()]
    ax2.bar(labels, medias, yerr=errs, capsize=6, color=[CARB, SI], alpha=0.9)
    ax2.set_ylabel("κ  (acoplamiento cómputo↔mantenimiento)")
    ax2.set_title("Coeficiente de acoplamiento (24 semillas)")
    for i, (mm, ee) in enumerate(zip(medias, errs)):
        ax2.text(i, mm + ee + 0.03, f"{mm:.2f}", ha="center", fontsize=11, fontweight="bold")
    ax2.set_ylim(0, max(medias) * 1.3 + 0.1)

    fig.suptitle("Exp 10 · Acoplamiento homeostático: firma operacional de la autopoiesis (no mide conciencia)",
                 fontsize=12, fontweight="bold", y=1.02)
    fig.tight_layout()
    for d in SALIDAS:
        os.makedirs(d, exist_ok=True)
        fig.savefig(f"{d}/exp10_acoplamiento.png", dpi=150, bbox_inches="tight")
    plt.close(fig)
    print("  Grafico: graficos/exp10_acoplamiento.png (+ web/public/graficos)")


if __name__ == "__main__":
    main()
