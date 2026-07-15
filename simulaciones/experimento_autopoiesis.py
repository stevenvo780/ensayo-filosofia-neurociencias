"""
Experimento 10 — κ NO mide autopoiesis: mide dónde se traza la frontera.

QUÉ ERA ESTE EXPERIMENTO (hasta el 15-jul-2026)
-----------------------------------------------
Se presentaba como la «firma operacional de la autopoiesis»: dos sistemas que
computan bajo una «lesión metabólica», con κ = (caída de desempeño)/(caída de la
bomba P). Daba κ≈0,88 para el «carbono» (acoplado) y κ=0,00 para el «silicio»
(desacoplado), y se afirmaba que era «la primera medida operacional de la
precariedad de Di Paolo y del acoplamiento homeostático de Damasio».

POR QUÉ ESO ERA FALSO (auditoría forense, 15-jul-2026)
------------------------------------------------------
1. κ_desacoplado = 0 NO ES UNA MEDIDA, es una identidad aritmética. En esa rama
   `R = np.ones(M)` se reasigna en cada paso y P NUNCA SE LEE: es código muerto.
   Barrido de 720 configuraciones (P0 × CONSUMO × UMBRAL × FACTOR_LESION,
   incluyendo valores absurdos): κ_desacoplado ≡ 0. Envenenando P0 con NaN o inf:
   sigue dando 0. Es una función constante. El experimento no podía fallar.

2. κ_acoplado ≈ 0,88 no es analítico, pero tampoco es un descubrimiento: tiene
   forma cerrada. En campo medio, desempeño(P) ≈ min(1, P(1-UMBRAL)/(CONSUMO·λ)),
   de donde κ_pred = 0,893 frente a κ_emp = 0,875. El 0,88 es un artefacto de
   parámetros: recorre todo [0,1] al mover un solo parámetro 10×, y el baseline
   está sobre la parte más empinada de la pendiente.

3. NINGUNA DE LAS DOS RAMAS ES AUTOPOIÉTICA. En ambas, P es un parámetro exógeno
   que el experimentador lesiona desde fuera. No hay clausura de producción ni
   adaptividad — que es exactamente lo que Di Paolo (2005) exige. El modelo
   «carbono» no modela la autopoiesis: modela un recurso que se agota.

4. LO QUE κ MIDE, CUANDO MIDE ALGO, ES COMPARTICIÓN DE PRESUPUESTO DE RECURSOS.
   Eso lo tiene un portátil cuyo cómputo compite con su refrigeración por el mismo
   presupuesto eléctrico. Si κ fuera la firma de la autopoiesis, un portátil con
   throttling térmico estaría vivo.

QUÉ HACE AHORA
--------------
El experimento se conserva —reformado— porque su fracaso es el resultado: sirve de
CONTRAEJEMPLO CONSTRUIDO a la tesis de que κ mide una propiedad del sustrato. Se
añade una tercera rama, IDÉNTICA a la del «silicio» salvo en DÓNDE SE TRAZA LA
FRONTERA DEL SISTEMA: si se incluye la fuente de alimentación dentro del sistema
(en vez de tratarla como un exterior inagotable), la MISMA máquina pasa a tener
κ>0. El sustrato no cambió; cambió el corte.

CLASE EPISTÉMICA: experimento mental computacional / contraejemplo construido.
NO mide conciencia. NO mide autopoiesis. NO decide nada sobre el silicio.

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
SI, CARB, MIX, DANGER, BG, TXT, MUTED = "#2f6ea6", "#b25a24", "#6b8f3a", "#d94f4f", "#fdfbf6", "#1f1c17", "#756d5f"
plt.rcParams.update({
    "figure.facecolor": BG, "axes.facecolor": BG, "savefig.facecolor": BG,
    "text.color": TXT, "axes.labelcolor": TXT, "xtick.color": MUTED, "ytick.color": MUTED,
    "axes.edgecolor": "#d2c9b4", "font.size": 11, "axes.titlesize": 13, "axes.titleweight": "bold",
})

# --- Parámetros ---
M = 200
T = 2000
T_PERT = 1000
UMBRAL = 0.25
CONSUMO = 0.06
P0 = 0.05
LAMBDA = 0.5
FACTOR_LESION = 0.3
SEMILLAS = list(range(24))

# Modos = tres CORTES distintos sobre el mismo tipo de máquina.
CORTE_ACOPLADO = "acoplado"        # el recurso que computa es el que hay que regenerar
CORTE_ESTRECHO = "estrecho"        # frontera = el chip; la fuente es un exterior inagotable
CORTE_AMPLIADO = "ampliado"        # frontera = chip + fuente; la fuente depende de P


def simular(corte, seed):
    rng = np.random.default_rng(seed)
    R = np.ones(M)
    P = P0
    reserva = 1.0          # sólo se usa en CORTE_AMPLIADO: estado de la fuente
    desempeno = np.zeros(T)
    for t in range(T):
        if t == T_PERT:
            P = P0 * FACTOR_LESION
        entrada = rng.random(M) < LAMBDA
        puede = R > UMBRAL
        spike = entrada & puede
        n_ent = entrada.sum()
        desempeno[t] = spike.sum() / n_ent if n_ent else 1.0

        if corte == CORTE_ACOPLADO:
            R = np.clip(R - CONSUMO * spike + P * (1.0 - R), 0.0, 1.0)

        elif corte == CORTE_ESTRECHO:
            # La fuente es EXTERNA por estipulación: repone R a 1 pase lo que pase.
            # P no se lee. Por eso kappa = 0 es analitico, no empirico.
            R = np.ones(M)

        elif corte == CORTE_AMPLIADO:
            # MISMA máquina que CORTE_ESTRECHO, otra frontera: la fuente entra DENTRO
            # del sistema. Su reserva se regenera a ritmo P (la red electrica, el
            # tecnico, el presupuesto termico) y se agota con la demanda del computo;
            # y sólo puede reponer el recurso de las unidades en proporcion a esa
            # reserva. Nada del "sustrato" cambió: cambió dónde dejamos de contar.
            demanda = CONSUMO * spike.sum() / M
            reserva = float(np.clip(reserva - demanda + P * (1.0 - reserva), 0.0, 1.0))
            R = np.clip(R - CONSUMO * spike + (P0 * reserva) * (1.0 - R), 0.0, 1.0)
        else:
            raise ValueError(corte)
    return desempeno


def kappa(desempeno):
    antes = desempeno[T_PERT - 200:T_PERT].mean()
    despues = desempeno[T - 200:T].mean()
    caida = (antes - despues) / antes if antes else 0.0
    return caida / (1.0 - FACTOR_LESION)


def main():
    os.makedirs(DATOS, exist_ok=True)
    cortes = [CORTE_ACOPLADO, CORTE_ESTRECHO, CORTE_AMPLIADO]
    curvas = {c: [] for c in cortes}
    ks = {c: [] for c in cortes}
    for c in cortes:
        for s in SEMILLAS:
            d = simular(c, s)
            curvas[c].append(d)
            ks[c].append(kappa(d))
        curvas[c] = np.array(curvas[c])
        ks[c] = np.array(ks[c])

    pd.DataFrame({
        "paso": np.arange(T),
        **{f"desempeno_{c}": curvas[c].mean(0) for c in cortes},
        **{f"desempeno_{c}_de": curvas[c].std(0) for c in cortes},
    }).to_csv(f"{DATOS}/exp10_acoplamiento.csv", index=False)

    etiquetas = {
        CORTE_ACOPLADO: "Recurso propio (el que computa es el que se regenera)",
        CORTE_ESTRECHO: "Frontera estrecha: chip solo (fuente externa estipulada)",
        CORTE_AMPLIADO: "Frontera ampliada: chip + fuente (MISMA maquina)",
    }
    pd.DataFrame([
        {"corte": etiquetas[c], "kappa_media": ks[c].mean(), "kappa_de": ks[c].std(),
         "n_semillas": len(SEMILLAS)}
        for c in cortes
    ]).to_csv(f"{DATOS}/exp10_resumen.csv", index=False)

    print("--- EXP 10: kappa es relativo al CORTE, no al sustrato ---")
    for c in cortes:
        print(f"  {etiquetas[c]:58s} kappa = {ks[c].mean():.2f} +/- {ks[c].std():.2f}")
    print("  Los dos ultimos son la MISMA maquina. Solo cambio donde se traza la frontera.")
    print("  kappa NO mide autopoiesis: mide comparticion de presupuesto de recursos.")

    # --- Gráfico ---
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11.5, 4.3))
    x = np.arange(T)
    for c, col in [(CORTE_ACOPLADO, CARB), (CORTE_ESTRECHO, SI), (CORTE_AMPLIADO, MIX)]:
        m, sd = curvas[c].mean(0), curvas[c].std(0)
        ax1.plot(x, m, color=col, lw=1.8, label=etiquetas[c])
        ax1.fill_between(x, m - sd, m + sd, color=col, alpha=0.15)
    ax1.axvline(T_PERT, color=DANGER, ls="--", lw=1.3)
    ax1.text(T_PERT + 20, 0.62, "misma perturbación\n(P al 30%)", color=DANGER, fontsize=8.5, va="top")
    ax1.set_xlabel("paso de simulación"); ax1.set_ylabel("desempeño")
    ax1.set_ylim(0, 1.08); ax1.set_title("La misma máquina, dos fronteras, dos resultados")
    ax1.legend(frameon=False, fontsize=7.2, loc="lower left", bbox_to_anchor=(0.0, 0.02))

    labels = ["Recurso\npropio", "Frontera\nestrecha", "Frontera\nampliada"]
    medias = [ks[c].mean() for c in cortes]
    errs = [ks[c].std() for c in cortes]
    ax2.bar(labels, medias, yerr=errs, capsize=6, color=[CARB, SI, MIX], alpha=0.9)
    ax2.set_ylabel("κ")
    ax2.set_title("κ es función del corte, no del material")
    for i, (mm, ee) in enumerate(zip(medias, errs)):
        ax2.text(i, mm + ee + 0.03, f"{mm:.2f}", ha="center", fontsize=11, fontweight="bold")
    ax2.set_ylim(0, max(medias) * 1.5 + 0.1)
    ax2.annotate("", xy=(1.92, medias[2] + 0.16), xytext=(1.08, medias[1] + 0.16),
                 arrowprops=dict(arrowstyle="->", color=DANGER, lw=1.4,
                                 connectionstyle="arc3,rad=-0.35"))
    ax2.text(1.5, max(medias) * 1.30, "mismo hardware,\notra frontera", ha="center",
             fontsize=8.5, color=DANGER, fontweight="bold")

    fig.suptitle("Exp 10 · κ no mide autopoiesis: mide dónde se traza la frontera (contraejemplo construido)",
                 fontsize=11.5, fontweight="bold", y=1.02)
    fig.tight_layout()
    for d in SALIDAS:
        os.makedirs(d, exist_ok=True)
        fig.savefig(f"{d}/exp10_acoplamiento.png", dpi=150, bbox_inches="tight")
    plt.close(fig)
    print("  Grafico: graficos/exp10_acoplamiento.png (+ web/public/graficos)")


if __name__ == "__main__":
    main()
