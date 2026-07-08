"""Graficos de los experimentos 7/8/9 con la paleta editorial (silicio azul / carbono ambar)."""
import os
import math
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

SI = "#2f6ea6"
CARB = "#b25a24"
DANGER = "#d94f4f"
BG = "#fdfbf6"
TXT = "#1f1c17"
MUTED = "#756d5f"

plt.rcParams.update({
    "figure.facecolor": BG, "axes.facecolor": BG, "savefig.facecolor": BG,
    "text.color": TXT, "axes.labelcolor": TXT, "xtick.color": MUTED, "ytick.color": MUTED,
    "axes.edgecolor": "#d2c9b4", "font.size": 11, "axes.titlesize": 13, "axes.titleweight": "bold",
})


def guardar(fig, nombre):
    for d in SALIDAS:
        os.makedirs(d, exist_ok=True)
        fig.savefig(f"{d}/{nombre}", dpi=150, bbox_inches="tight")
    plt.close(fig)


def g_exp7():
    df = pd.read_csv(f"{DATOS}/exp7_variabilidad.csv")
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.2))
    x = np.arange(len(df))
    ax1.bar(x - 0.2, df["carbono_log2_estados"], 0.4, color=CARB, label="Carbono (4,7 bits/sinapsis)")
    ax1.bar(x + 0.2, df["silicio_log2_estados"], 0.4, color=SI, label="Silicio (1 bit/sinapsis)")
    ax1.set_xticks(x); ax1.set_xticklabels([f"{n:,}" for n in df["n_sinapsis"]], rotation=45, ha="right")
    ax1.set_xlabel("nº de sinapsis"); ax1.set_ylabel("log₂(estados accesibles) [bits]")
    ax1.set_title("Espacio de estados por unidad")
    ax1.legend(frameon=False, fontsize=9)
    dm = pd.read_csv(f"{DATOS}/exp7_modulacion.csv")
    ax2.plot(dm["n_moduladores"], dm["carbono_log2_estados"], color=CARB, lw=2.4, marker="o", ms=4)
    ax2.axhline(7000, color=SI, ls="--", lw=1.6, label="silicio (7.000 bits)")
    ax2.set_xlabel("nº de neuromoduladores (×10 niveles)"); ax2.set_ylabel("log₂(estados) [bits]")
    ax2.set_title("Combinatoria neuromoduladora (7.000 sinapsis)")
    ax2.legend(frameon=False, fontsize=9)
    fig.suptitle("Exp 7 — Variabilidad: la analógica graduada abre otro espacio de estados", fontsize=12, y=1.02)
    guardar(fig, "exp7_variabilidad.png")


def g_exp8():
    df = pd.read_csv(f"{DATOS}/exp8_io.csv")
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.2))
    ax1.bar(["Carbono\n(neurona)", "Silicio\n(compuerta)"], [7000, 6], color=[CARB, SI])
    ax1.set_yscale("log"); ax1.set_ylabel("fan-out (conexiones / unidad)")
    ax1.set_title("Fan-out: 1.167×")
    for i, v in enumerate([7000, 6]):
        ax1.text(i, v * 1.3, f"{v:,}", ha="center", fontweight="bold")
    ax2.plot(df["N_unidades"], df["ratio_2d_sobre_3d"], color=DANGER, lw=2.4, marker="o", ms=4)
    ax2.set_xscale("log"); ax2.set_xlabel("N unidades"); ax2.set_ylabel("cableado 2D / 3D (×)")
    ax2.set_title("Penalización de cablear en 2D vs 3D (∝ N^{1/6})")
    ax2.annotate("cerebro (N≈10¹¹): ~68×", xy=(1e11, 68), xytext=(1e7, 55),
                 fontsize=9, color=MUTED, arrowprops=dict(arrowstyle="->", color=MUTED))
    fig.suptitle("Exp 8 — I/O: fan-out 3D + entrega circulatoria (600 km, 1:1)", fontsize=12, y=1.02)
    guardar(fig, "exp8_io.png")


def g_exp9():
    ev = pd.read_csv(f"{DATOS}/exp9_intercambio.csv")
    dg = pd.read_csv(f"{DATOS}/exp9_desglose.csv")
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.2))
    cols = [SI, DANGER, CARB]
    ax1.barh(ev["evento"], ev["energia_pJ"], color=cols)
    ax1.set_xscale("log"); ax1.set_xlabel("energía por evento (pJ)")
    ax1.set_title("Energía por evento: computar vs. mover vs. spike")
    for i, v in enumerate(ev["energia_pJ"]):
        ax1.text(v * 1.2, i, f"{v:g} pJ", va="center", fontsize=9)
    ax1.invert_yaxis()
    frac = dg["fraccion"].values * 100
    ax2.barh(["Silicio"], [frac[1]], color=DANGER, label=f"Intercambio (mover): {frac[1]:.1f}%")
    ax2.barh(["Silicio"], [frac[0]], left=[frac[1]], color=SI, label=f"Cómputo: {frac[0]:.1f}%")
    ax2.set_xlim(0, 100); ax2.set_xlabel("% de la energía"); ax2.set_title("En silicio, el intercambio DOMINA (Horowitz 2014)")
    ax2.legend(frameon=False, fontsize=9, loc="lower center", bbox_to_anchor=(0.5, -0.35))
    fig.suptitle("Exp 9 — Intercambio: químico-pasivo vs. eléctrico-activo (mover ≈ 650× computar)", fontsize=12, y=1.02)
    guardar(fig, "exp9_intercambio.png")


if __name__ == "__main__":
    g_exp7(); g_exp8(); g_exp9()
    print("Graficos 7/8/9 generados en simulaciones/graficos y web/public/graficos")
