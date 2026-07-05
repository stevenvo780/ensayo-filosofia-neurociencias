"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SlideData {
  title: string;
  subtitle: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  speakerNotes: string;
}

const slidesData: SlideData[] = [
  {
    title: "¿Silicio o Tejido?",
    subtitle: "Límites materiales y ontológicos en la emulación de la mente",
    bullets: [
      "Tesis: La emulación mental en silicio digital es térmicamente incompatible con el carbono orgánico vivo.",
      "El funcionalismo clásico sostiene que el sustrato material es irrelevante para los estados mentales.",
      "Sin embargo, la bioenergética y la termodinámica demuestran una insostenible brecha de eficiencia.",
      "El problema duro de la conciencia (qualia) requiere la homeostasis y la vulnerabilidad metabólica de la vida celular."
    ],
    image: "/graficos/exp5_aprendizaje.png",
    imageAlt: "Tesis de investigación",
    speakerNotes: "Buenas tardes. En esta exposición analizaremos la tesis central de mi ensayo: la emulación de la mente biológica en silicio digital se topa con límites termodinámicos infranqueables. Planteamos que la conciencia no es un software abstracto, sino una propiedad de la dinámica material de la vida."
  },
  {
    title: "El Cuello de Botella de Von Neumann",
    subtitle: "Separación física vs. integración biológica",
    bullets: [
      "Silicio Clásico: Separación estricta entre CPU/GPU (procesamiento) y memoria RAM (almacenamiento).",
      "Cerebro de Carbono: El procesamiento y el almacenamiento son co-locales, ocurriendo in-situ en el cambio sináptico.",
      "Experimento 5: STDP local (4 KB de memoria de estado) frente a la retropropagación global de silicio (768 KB de memoria).",
      "La plasticidad biológica es un reordenamiento molecular pasivo; en silicio es una simulación matemática costosa."
    ],
    image: "/graficos/exp5_aprendizaje.png",
    imageAlt: "Mapeo de memoria STDP vs Backpropagation",
    speakerNotes: "El primer problema del silicio es su arquitectura física. Von Neumann separa la memoria del cómputo. En el carbono, la sinapsis es a la vez memoria y procesador. Vemos en el experimento 5 cómo la plasticidad local STDP requiere 200 veces menos memoria de estado que el algoritmo de Backpropagation usado en silicio."
  },
  {
    title: "Economía del Silencio",
    subtitle: "Codificación esparcida contra procesamiento denso",
    bullets: [
      "Células de Concepto (Quian Quiroga): Activación ultra-específica ante ideas discretas en el temporal medial.",
      "Esparsidad del 1%: El cerebro apaga activamente el 99% de su red, optimizando energía y evitando el crosstalk.",
      "Experimento 2: El solapamiento del 64% en redes densas de silicio produce interferencia destructiva de memoria.",
      "En silicio digital, simular el silencio o valor cero requiere computar y gastar energía de conmutación de compuertas."
    ],
    image: "/graficos/exp2_crosstalk.png",
    imageAlt: "Histograma de crosstalk conceptual",
    speakerNotes: "En el Experimento 2 evaluamos la codificación esparcida. Mientras que las redes artificiales de silicio procesan de forma densamente distribuido, sufriendo interferencias del 64%, la red biológica del 1% aísla por completo los conceptos (0.01% de solape). En silicio, simular el silencio cuesta energía lógicas; en carbono, el silencio es gratis."
  },
  {
    title: "El Canal Químico",
    subtitle: "El alfabeto molecular frente al cableado binario",
    bullets: [
      "Silicio Digital: Canal de señalización única basado en el flujo de electrones en pistas de cobre estáticas.",
      "Carbono Biológico: Decenas de neurotransmisores y neuromoduladores que difunden volumétricamente en paralelo.",
      "Experimento 3: Incorporar modulación química digital escala linealmente los FLOPs por canal en el microchip.",
      "La química biológica realiza cómputos volumétricos pasivos; el silicio debe emularlos mediante costosas ecuaciones lógicas."
    ],
    image: "/graficos/exp3_escalamiento_quimico.png",
    imageAlt: "Escalamiento de canales químicos",
    speakerNotes: "El cerebro no está cableado de forma binaria. La difusión por volumen de dopamina o GABA ocurre físicamente en un espacio tridimensional de forma paralela. Para simular esto en silicio, debemos iterar sobre costosos bucles lógicos secuenciales por cada neurotransmisor, incrementando los FLOPs lineales."
  },
  {
    title: "La Paradoja Termodinámica",
    subtitle: "Costo del cómputo lógico vs. física molecular pasiva",
    bullets: [
      "Principio de Landauer: Borrar bits digitales disipa calor calorífico inevitable ($kT \\ln 2$).",
      "Termodinámica del ATP: El flujo de iones por espiga es pasivo; restaurar el gradiente consume ATP metabólico diferido.",
      "Benchmark Empírico: La GPU gasta $6.56 \\times 10^{-9}$ J por sinapsis; el carbono gasta $1.65 \\times 10^{-13}$ J.",
      "La emulación en silicio digital es unas 39,760 veces más ineficiente por evento que el cerebro orgánico vivo."
    ],
    image: "/graficos/energia_silicio_vs_carbono.png",
    imageAlt: "Eficiencia energética logarítmica",
    speakerNotes: "Esta es la diapositiva central. Realizando una comparación justa por evento sináptico individual, la GPU gasta 6.56 nanojoules por sinapsis, mientras que el modelo de ATP biológico gasta 0.16 picojoules. La brecha es de casi 40,000 veces a escala masiva, y de miles de millones de veces a menor escala debido a la sobrecarga del software."
  },
  {
    title: "Emergencia Temporal",
    subtitle: "Sincronización Gamma y retardos físicos axonales",
    bullets: [
      "Sincronía Cortical (Bechtel): Las ondas Gamma (~40 Hz) ligan perceptivamente los conceptos en el cerebro.",
      "Retardo Axonal: En el carbono, el retardo de conducción es una propiedad pasiva del espacio físico de los axones.",
      "Experimento 4: Emergencia espontánea de ritmos Gamma al simular redes excitatorias-inhibitorias con retardo.",
      "En silicio digital, mantener los desfases temporales precisos exige un inmenso procesamiento de buffers de memoria."
    ],
    image: "/graficos/exp4_oscilaciones_emergentes.png",
    imageAlt: "Gráficos de oscilaciones Gamma",
    speakerNotes: "Las oscilaciones cerebrales sincronizan áreas distantes para unificar la percepción. En el Experimento 4, demostramos cómo estas oscilaciones emergen de forma natural gracias a los retardos de conducción axonal. En silicio digital, procesar estos buffers de desfase temporal requiere miles de operaciones secuenciales por segundo."
  },
  {
    title: "Computación Morfológica",
    subtitle: "El cuerpo inorgánico como andamio cognitivo",
    bullets: [
      "Grillo Robot de Webb (1996): Resuelve la fonotaxis mediante acústica morfológica traqueal física pasiva.",
      "Experimento 6: El modelo desencarnado (Fourier/FFT) requiere 21,480 FLOPs; el modelo corporal requiere 2 FLOPs.",
      "Contradicción clave: El robot de Webb demuestra que el silicio analógico/inorgánico sí puede usar computación morfológica.",
      "Mente Extendida (Clark): El silicio funciona como andamio sintáctico acoplado; el carbono origina el qualia."
    ],
    image: "/graficos/exp6_morfologia.png",
    imageAlt: "Costo FLOPs Computación Morfológica",
    speakerNotes: "El grillo de Webb demuestra la computación morfológica: delegar cómputo al cuerpo. El modelo desencarnado necesita 21,480 FLOPs matemáticos, mientras que el corporizado hace una simple resta de 2 FLOPs. Esto muestra que la cognición depende del acoplamiento corporal, y que el silicio puede actuar como andamio de esta extensión."
  },
  {
    title: "Hacia el Neuromorfismo Analógico",
    subtitle: "Límites lógicos de Turing y conclusiones",
    bullets: [
      "El sustrato material importa: El qualia y la conciencia fenoménica emergen de la lucha autopoyética celular viva.",
      "El silicio digital Von Neumann es un accidente histórico industrial, no el medio óptimo para la cognición.",
      "Computación neuromórfica analógica (Loihi 2, memristores): Integra corrientes pasivas directamente en el hardware.",
      "Conclusión: Debemos transitar de la computación digital abstracta a sistemas analógicos neuromórficos corporizados."
    ],
    image: "/graficos/tiempo_escalamiento.png",
    imageAlt: "Crossover de latencia computacional",
    speakerNotes: "Para concluir, la ineficiencia de la GPU no es un problema de potencia de cálculo, sino de paradigma. La conciencia surge de la necesidad biológica de supervivencia. Si queremos emular procesos conscientes, debemos abandonar la arquitectura Von Neumann digital tradicional y transitar hacia el silicio neuromórfico analógico corporizado."
  }
];

export default function SlideClient({ slideIndex }: { slideIndex: number }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (slideIndex < slidesData.length - 1) {
          window.location.href = `/slides/${slideIndex + 1}`;
        }
      } else if (e.key === "ArrowLeft") {
        if (slideIndex > 0) {
          window.location.href = `/slides/${slideIndex - 1}`;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideIndex]);

  if (isNaN(slideIndex) || slideIndex < 0 || slideIndex >= slidesData.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Diapositiva no encontrada</h2>
        <Link href="/slides/0" style={{ color: "var(--primary-light)" }}>Volver al inicio</Link>
      </div>
    );
  }

  const slide = slidesData[slideIndex];

  return (
    <div style={{
      minHeight: "calc(100vh - 180px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "20px"
    }}>
      <div style={{
        background: "var(--bg-card)",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        padding: "35px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        flexGrow: 1
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "15px"
        }}>
          <div>
            <h2 style={{ fontSize: "1.8rem", color: "#ffffff", fontWeight: 700, margin: 0 }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--primary-light)", margin: 0 }}>
              {slide.subtitle}
            </p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "bold" }}>
            Slide {slideIndex + 1} / {slidesData.length}
          </span>
        </div>

        {/* Content Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "30px",
          alignItems: "center",
          flexGrow: 1
        }}>
          {/* Bullets */}
          <ul style={{
            listStyleType: "none",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            fontSize: "1.05rem"
          }}>
            {slide.bullets.map((bullet, idx) => (
              <li key={idx} style={{
                position: "relative",
                paddingLeft: "25px",
                lineHeight: "1.6"
              }}>
                <span style={{
                  position: "absolute",
                  left: 0,
                  top: "6px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)"
                }} />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Visual Panel */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            padding: "15px",
            border: "1px solid var(--border)",
            height: "100%",
            minHeight: "280px"
          }}>
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              width={450}
              height={260}
              style={{
                borderRadius: "6px",
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain"
              }}
            />
          </div>
        </div>

        {/* Speaker Notes */}
        <div style={{
          background: "rgba(105, 240, 174, 0.05)",
          borderLeft: "4px solid var(--accent)",
          padding: "15px 20px",
          borderRadius: "4px",
          fontSize: "0.95rem",
          color: "#e2e8f0"
        }}>
          <strong style={{ color: "var(--accent-light)", display: "block", marginBottom: "5px" }}>
            🎙️ Notas del Orador:
          </strong>
          &ldquo;{slide.speakerNotes}&rdquo;
        </div>
      </div>

      {/* Slide Controls */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Tip: Usa las teclas <strong>← izquierda</strong> y <strong>→ derecha</strong> de tu teclado para navegar.
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {slideIndex > 0 ? (
            <Link href={`/slides/${slideIndex - 1}`} style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "#ffffff",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 600
            }}>
              Anterior
            </Link>
          ) : (
            <button disabled style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              cursor: "not-allowed"
            }}>
              Anterior
            </button>
          )}

          {slideIndex < slidesData.length - 1 ? (
            <Link href={`/slides/${slideIndex + 1}`} style={{
              background: "var(--primary)",
              color: "#ffffff",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 600
            }}>
              Siguiente
            </Link>
          ) : (
            <Link href="/" style={{
              background: "var(--accent)",
              color: "#0b0f19",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 700
            }}>
              Finalizar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
