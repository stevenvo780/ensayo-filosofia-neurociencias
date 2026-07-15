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

/**
 * Fuentes primarias de los datos de literatura que citan los explicadores.
 * Verificadas contra Crossref / eLife / PubMed (jul-2026). `nota` dice qué
 * sostiene REALMENTE cada fuente — y qué cifra es derivación del laboratorio
 * y no del paper.
 */
const FUENTES = [
  {
    exp: "Exp 7",
    cita: (
      <>
        Bartol, T. M., Bromer, C., Kinney, J., Chirillo, M. A., Bourne, J. N., Harris, K. M., y
        Sejnowski, T. J. (2015). <em>Nanoconnectomic upper bound on the variability of synaptic
        plasticity</em>. <em>eLife</em>, 4, e10778.
      </>
    ),
    doi: "10.7554/eLife.10778",
    nota: (
      <>
        Reconstrucción por microscopía electrónica de serie de neuropilo de hipocampo de rata
        (<em>stratum radiatum</em>, área CA1; tres ratas adultas) — no de «la sinapsis» en general.
        Reportan un <strong>mínimo</strong> de 26 estados sinápticos distinguibles ≈ 4,7 bits: es una
        cota <strong>inferior</strong> de la información almacenable por sinapsis, derivada de una
        cota <strong>superior</strong> de la variabilidad de la plasticidad (CV ≈ 0,083). El paper{" "}
        <strong>no compara con silicio</strong>: esa comparación era del laboratorio, y es la que
        §IV.1 retiró.
      </>
    ),
  },
  {
    exp: "Exp 6",
    cita: (
      <>
        Webb, B. (1996). <em>A Cricket Robot</em>. <em>Scientific American</em>, 275(6), 94–99.
      </>
    ),
    doi: "10.1038/scientificamerican1296-94",
    nota: (
      <>
        Fuente del grillo robot y de su tubo de desfase. Los conteos de FLOPs que muestra el
        explicador (757.760 frente a 2) son <strong>estipulaciones de este laboratorio</strong>, no
        cifras publicadas por Webb.
      </>
    ),
  },
  {
    exp: "Exp 4 · piso de Landauer",
    cita: (
      <>
        Landauer, R. (1961). <em>Irreversibility and Heat Generation in the Computing Process</em>.{" "}
        <em>IBM Journal of Research and Development</em>, 5(3), 183–191.
      </>
    ),
    doi: "10.1147/rd.53.0183",
    nota: <>Origen del límite kT·ln2 por conmutación lógica irreversible.</>,
  },
  {
    exp: "Exp 9",
    cita: (
      <>
        Horowitz, M. (2014). <em>1.1 Computing&rsquo;s energy problem (and what we can do about
        it)</em>. <em>2014 IEEE International Solid-State Circuits Conference (ISSCC)</em>, 10–14.
      </>
    ),
    doi: "10.1109/ISSCC.2014.6757323",
    nota: <>Fuente citada para el costo relativo de mover un dato frente a computarlo.</>,
  },
  {
    exp: "Exp 9",
    cita: (
      <>
        Attwell, D., y Laughlin, S. B. (2001). <em>An Energy Budget for Signaling in the Grey Matter
        of the Brain</em>. <em>Journal of Cerebral Blood Flow &amp; Metabolism</em>, 21(10),
        1133–1145.
      </>
    ),
    doi: "10.1097/00004647-200110000-00001",
    nota: (
      <>
        Presupuesto energético de la señalización excitatoria en materia gris de roedor.{" "}
        <strong>Advertencia:</strong> la cifra de 210,85 pJ «por potencial de acción» que usa el Exp 9
        es una <strong>derivación de este laboratorio</strong>, no un número publicado por Attwell y
        Laughlin; <strong>no está verificada contra el texto primario</strong> y queda pendiente de
        comprobación.
      </>
    ),
  },
];

const EXPERIMENTS = [
  { n: "01", title: "Codificación esparcida", sub: "Exp 2 · ◐ cálculo cerrado — E[solapamiento] = p", C: SparseCoding },
  { n: "02", title: "Cuello de botella de Von Neumann", sub: "Exp 5 · memoria separada vs. memoria local", C: VonNeumannBus },
  { n: "03", title: "La escalera de la ineficiencia", sub: "Benchmark · ● la única medición real, y es una cota amañada", C: EfficiencyStaircase },
  { n: "04", title: "El piso de Landauer", sub: "Límite universal · no favorece a ningún sustrato", C: LandauerFloor },
  { n: "05", title: "Oscilaciones beta–gamma", sub: "Exp 4 · coherencia por organización, no por material", C: GammaOscillation },
  { n: "06", title: "Cómputo morfológico", sub: "Exp 6 · el tubo de Webb no está vivo, y computa", C: MorphologyFlops },
  { n: "07", title: "Variabilidad · espacio de estados", sub: "Exp 7 · archivo — la premisa «1 bit» era una estipulación", C: StateSpaceVariability },
  { n: "08", title: "Ancho de banda de I/O", sub: "Exp 8 · fan-out ~7.000 vs ~4 · restricción de empaquetado", C: IOBandwidth },
  { n: "09", title: "Intercambio: químico vs. eléctrico", sub: "Exp 9 · archivo — comparación sesgada por construcción", C: ExchangeMode },
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

      <Reveal>
        <section id="fuentes-lab" style={{ marginTop: 48, marginBottom: 24, scrollMarginTop: 80 }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: 6 }}>Fuentes</h3>
          <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", marginTop: 0 }}>
            Referencias completas de los datos de literatura que citan los explicadores de esta
            página. Cada entrada dice también <strong>qué sostiene realmente la fuente</strong>: varias
            de las cifras de este laboratorio son estipulaciones o derivaciones propias, y no cosas que
            los autores citados publiquen.
          </p>

          <ol style={{ listStyle: "none", padding: 0, margin: "24px 0 0" }}>
            {FUENTES.map((f, i) => (
              <li
                key={f.doi}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "16px 18px",
                  marginBottom: 12,
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: "0.72rem", color: "var(--carbon)", marginBottom: 6 }}
                >
                  [{i + 1}] · {f.exp}
                </div>
                <div style={{ fontSize: "0.95rem", lineHeight: 1.55 }}>{f.cita}</div>
                <div style={{ marginTop: 6 }}>
                  <a
                    className="mono"
                    href={`https://doi.org/${f.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.74rem", color: "var(--si)" }}
                  >
                    doi:{f.doi}
                  </a>
                </div>
                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--text-soft)",
                    lineHeight: 1.6,
                    margin: "10px 0 0",
                  }}
                >
                  {f.nota}
                </p>
              </li>
            ))}
          </ol>

          <p
            style={{
              fontSize: "0.86rem",
              color: "var(--muted)",
              lineHeight: 1.6,
              marginTop: 18,
            }}
          >
            <strong>Sin fuente en este repositorio.</strong> Las cifras de fan-out del Exp 8 (~7.000
            sinapsis por neurona piramidal; ~6 de una celda CMOS) se publican sin referencia
            verificada. Se listan aquí como deuda declarada, no como dato respaldado.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
