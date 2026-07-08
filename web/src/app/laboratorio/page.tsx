import Reveal from "@/components/Reveal";
import SparseCoding from "@/components/explainers/SparseCoding";
import VonNeumannBus from "@/components/explainers/VonNeumannBus";
import EfficiencyStaircase from "@/components/explainers/EfficiencyStaircase";
import LandauerFloor from "@/components/explainers/LandauerFloor";
import GammaOscillation from "@/components/explainers/GammaOscillation";
import MorphologyFlops from "@/components/explainers/MorphologyFlops";
import StateSpaceVariability from "@/components/explainers/StateSpaceVariability";
import IOBandwidth from "@/components/explainers/IOBandwidth";
import ExchangeMode from "@/components/explainers/ExchangeMode";

const TIERS = [
  { t: "Tier 1 · CPU", hw: "NumPy · hasta 8K", cuello: "loop Python", c: "var(--si)" },
  { t: "Tier 2 · Single GPU", hw: "RTX 5070 Ti · hasta 6M", cuello: "VRAM 16 GB", c: "var(--si-2)" },
  { t: "Tier 3 · Multi-GPU", hw: "+ RTX 2060 · hasta 12M", cuello: "bus PCIe (×10)", c: "var(--carbon-2)" },
  { t: "Tier 4 · Híbrido", hw: "CPU+2GPU+DDR · hasta 16M", cuello: "DDR+PCIe+GIL (×100)", c: "var(--carbon)" },
];

const EXPERIMENTS = [
  { n: "01", title: "Codificación esparcida", sub: "Exp 2 · crosstalk 80% → 1,03%", C: SparseCoding },
  { n: "02", title: "Cuello de botella de Von Neumann", sub: "Exp 5 · 20.000 KB vs 39 KB (512×)", C: VonNeumannBus },
  { n: "03", title: "La escalera de la ineficiencia", sub: "Benchmark · brecha 3.000× → 104.450×", C: EfficiencyStaircase },
  { n: "04", title: "El piso de Landauer", sub: "Límite termodinámico universal", C: LandauerFloor },
  { n: "05", title: "Oscilaciones beta–gamma", sub: "Exp 4 · emergencia de la física pasiva", C: GammaOscillation },
  { n: "06", title: "Cómputo morfológico", sub: "Exp 6 · 757.760 FLOPs vs 2 FLOPs", C: MorphologyFlops },
  { n: "07", title: "Variabilidad · espacio de estados", sub: "Exp 7 · 4,7 bits vs 1 bit por sinapsis (Bartol 2015)", C: StateSpaceVariability },
  { n: "08", title: "Ancho de banda de I/O", sub: "Exp 8 · fan-out 1.167× + entrega circulatoria", C: IOBandwidth },
  { n: "09", title: "Intercambio: químico vs. eléctrico", sub: "Exp 9 · mover datos cuesta 650× computarlos (Horowitz 2014)", C: ExchangeMode },
];

export default function Laboratorio() {
  return (
    <div className="container" style={{ maxWidth: 820, paddingTop: 56 }}>
      <Reveal>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Laboratorio computacional · reproducible</div>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.4rem)", margin: "0 0 0.4em" }}>
          Los experimentos, en vivo
        </h1>
        <p className="prose" style={{ marginBottom: 40 }}>
          Un benchmark <strong>deliberadamente escalonado</strong> en cuatro tiers de hardware
          (CPU → Single GPU → Multi-GPU → Híbrido) hace visible el cuello de botella de Von Neumann en
          cada nivel de escala. Cada tier expone un límite físico distinto del silicio; cada experimento
          es interactivo y usa los datos reales de <span className="mono">simulaciones/datos/</span>.
        </p>
      </Reveal>

      <Reveal>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 14,
            marginBottom: 56,
          }}
        >
          {TIERS.map((t) => (
            <div
              key={t.t}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${t.c}`,
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div className="mono" style={{ fontSize: "0.82rem", fontWeight: 600, color: t.c }}>{t.t}</div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-soft)", margin: "6px 0" }}>{t.hw}</div>
              <div className="mono" style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                cuello: {t.cuello}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {EXPERIMENTS.map(({ n, title, sub, C }) => (
        <Reveal key={n}>
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 4 }}>
              <span
                className="mono"
                style={{ fontSize: "0.9rem", color: "var(--carbon)", fontWeight: 600 }}
              >
                {n}
              </span>
              <div>
                <h2 style={{ fontSize: "1.5rem", margin: 0 }}>{title}</h2>
                <div className="mono" style={{ fontSize: "0.74rem", color: "var(--muted)", marginTop: 2 }}>
                  {sub}
                </div>
              </div>
            </div>
            <C />
          </div>
        </Reveal>
      ))}

      <Reveal>
        <div
          style={{
            marginTop: 48,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: 28,
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: "1.3rem" }}>Reproducir</h3>
          <p style={{ color: "var(--text-soft)", fontSize: "1rem" }}>
            La suite implementa homeostasis sináptica, topología esparcida y propagación por chunks. El
            costo del carbono se basa en la hidrólisis de ATP (1,65·10⁻⁹ J/spike). Es{" "}
            <strong>deliberadamente ineficiente</strong>: cada cuello de botella es una observación.
          </p>
          <pre
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              padding: "16px 18px",
              borderRadius: 10,
              fontFamily: "var(--font-mono)",
              fontSize: "0.95rem",
              color: "var(--carbon)",
              overflowX: "auto",
              margin: 0,
            }}
          >
            $ ./ejecutar_laboratorio.sh
          </pre>
        </div>
      </Reveal>
    </div>
  );
}
