import Image from "next/image";

interface LabCard {
  id: number;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  image: string;
}

const labCardsData: LabCard[] = [
  {
    id: 1,
    title: "Exp 1: Jerarquía Visual",
    desc: "Cálculo local retinotópico con campos receptivos del 10% (Zeki, 1992) vs. conexionismo denso clásico.",
    metric: "90% Ahorro",
    metricLabel: "reducción de FLOPs",
    image: "/graficos/exp1_visual.png"
  },
  {
    id: 2,
    title: "Exp 2: Interferencia Conceptual",
    desc: "Nivel de solapamiento conceptual (crosstalk) entre 20 conceptos usando codificación esparcida del 1% (WTA).",
    metric: "0.01% Solape",
    metricLabel: "frente a 64% en densa",
    image: "/graficos/exp2_crosstalk.png"
  },
  {
    id: 3,
    title: "Exp 3: Diversidad Química",
    desc: "Impacto en los FLOPs de silicio al simular múltiples neurotransmisores difusos por volumen en paralelo.",
    metric: "Escalamiento Lineal",
    metricLabel: "de costo en CPU/GPU",
    image: "/graficos/exp3_escalamiento_quimico.png"
  },
  {
    id: 4,
    title: "Exp 4: Oscilaciones Gamma",
    desc: "Emergencia espontánea de ritmos colectivos (~40 Hz) mediante interacciones E-I y retardos de propagación.",
    metric: "Ondas Gamma",
    metricLabel: "emergencia pasiva física",
    image: "/graficos/exp4_oscilaciones_emergentes.png"
  },
  {
    id: 5,
    title: "Exp 5: Plasticidad Sináptica",
    desc: "Memoria de estado requerida para el aprendizaje con la regla local STDP vs. retropropagación global.",
    metric: "200x Menos RAM",
    metricLabel: "4 KB vs 768 KB",
    image: "/graficos/exp5_aprendizaje.png"
  },
  {
    id: 6,
    title: "Exp 6: Cómputo Morfológico",
    desc: "Operaciones lógicas requeridas para localización sonora usando morfología acústica (grillo de Webb) vs. FFT.",
    metric: "2 FLOPs vs 21k",
    metricLabel: "delegación en la morfología",
    image: "/graficos/exp6_morfologia.png"
  }
];

export default function LaboratorioPage() {
  return (
    <div style={{ color: "var(--text-color)" }}>
      <header style={{ marginBottom: "45px" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "10px" }}>
          Métricas e Infraestructura de Simulación
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
          Resultados empíricos obtenidos en el benchmark de aceleración por GPU (N=2,000,000 neuronas esparcidas) y emulación física.
        </p>
      </header>

      {/* Grid of Experiments */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "25px",
        marginBottom: "50px"
      }}>
        {labCardsData.map((card) => (
          <div key={card.id} style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "15px"
          }}>
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px", color: "#ffffff" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: "1.5" }}>
                {card.desc}
              </p>
              <div style={{
                display: "inline-block",
                background: "rgba(0, 230, 118, 0.08)",
                border: "1px solid var(--accent)",
                borderRadius: "6px",
                padding: "8px 12px",
                marginBottom: "15px"
              }}>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--accent-light)", display: "block" }}>
                  {card.metric}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {card.metricLabel}
                </span>
              </div>
            </div>
            
            <div style={{
              background: "rgba(0,0,0,0.15)",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid var(--border)",
              textAlign: "center"
            }}>
              <Image
                src={card.image}
                alt={card.title}
                width={300}
                height={160}
                style={{
                  borderRadius: "4px",
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain"
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reproduction Guide */}
      <section style={{
        background: "linear-gradient(135deg, #151d30 0%, #0f172a 100%)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "35px",
        marginTop: "40px"
      }}>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "15px", color: "#ffffff" }}>
          Reproducción del Experimento
        </h3>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "20px", lineHeight: "1.6" }}>
          La suite de simulaciones fue optimizada eliminando llamadas de sincronización bloqueantes host-device en PyTorch CUDA. El cálculo energético del carbono biológico implementa un modelo de ATP basado en la restauración del gradiente iónico por la bomba sodio-potasio.
        </p>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "15px" }}>
          Puedes compilar, ejecutar y verificar el benchmark completo de forma local corriendo el script maestro en tu terminal:
        </p>
        <pre style={{
          backgroundColor: "#0b0f19",
          border: "1px solid var(--border)",
          padding: "20px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "1rem",
          color: "var(--primary-light)",
          overflowX: "auto"
        }}>
          $ ./ejecutar_laboratorio.sh
        </pre>
      </section>
    </div>
  );
}
