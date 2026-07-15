"use client";

import { useEffect, useLayoutEffect, useRef, useState, ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mic, ArrowLeft, ArrowRight, LayoutGrid, X, FileText } from "lucide-react";
import Emblem from "@/components/Emblem";
import SparseCoding from "@/components/explainers/SparseCoding";
import VonNeumannBus from "@/components/explainers/VonNeumannBus";
import EfficiencyStaircase from "@/components/explainers/EfficiencyStaircase";
import GammaOscillation from "@/components/explainers/GammaOscillation";
import MorphologyFlops from "@/components/explainers/MorphologyFlops";
import StateSpaceVariability from "@/components/explainers/StateSpaceVariability";
import ExchangeMode from "@/components/explainers/ExchangeMode";
import IOBandwidth from "@/components/explainers/IOBandwidth";

interface SlideData {
  title: string;
  subtitle: string;
  bullets: string[];
  explainer?: ComponentType;
  image?: string;
  imageAlt?: string;
  speakerNotes: string;
}

const slidesData: SlideData[] = [
  {
    title: "¿Silicio o Tejido?",
    subtitle: "Límites materiales y ontológicos en la emulación de la mente",
    bullets: [
      "Tesis con dos niveles: el material (demostrable) y el ontológico (conjetura fundada en la autopoiesis).",
      "El funcionalismo sostiene que el sustrato es irrelevante para los estados mentales.",
      "Pero emular el carbono vivo sobre silicio digital revela una incompatibilidad material profunda.",
      "La conciencia fenoménica (qualia) exige la vulnerabilidad homeostática de la vida celular.",
    ],
    speakerNotes:
      "Buenas tardes. La tesis tiene dos niveles que no hay que confundir: uno práctico —el costo de emular carbono sobre silicio es insostenible— y uno ontológico —el sustrato vivo sería constitutivo de la conciencia—, y este segundo NO se sigue del primero: se funda en la autopoiesis.",
  },
  {
    title: "El cuello de botella de Von Neumann",
    subtitle: "Separación física vs. integración biológica",
    bullets: [
      "Silicio: procesador y memoria separados por un bus; el tráfico de datos es el límite.",
      "Carbono: procesamiento y almacenamiento son co-locales, en la propia sinapsis (Bechtel).",
      "Experimento 5: STDP local (39 KB) frente a la retropropagación global (20.000 KB): 512× menos.",
      "La plasticidad biológica es reordenamiento físico pasivo; en silicio, simulación matemática costosa.",
    ],
    explainer: VonNeumannBus,
    speakerNotes:
      "Von Neumann separa memoria y cómputo; en el carbono la sinapsis es ambas cosas. El experimento 5 muestra que la regla local STDP necesita 512 veces menos memoria de estado que la retropropagación.",
  },
  {
    title: "Economía del silencio",
    subtitle: "Codificación esparcida contra procesamiento denso",
    bullets: [
      "Células de concepto (Quian Quiroga): activación ultra-específica en el temporal medial.",
      "Esparsidad del 1%: el cerebro apaga activamente el 99%, ahorrando energía y evitando crosstalk.",
      "Experimento 2: la red densa solapa el 80% entre conceptos; la esparcida del 1%, solo el 1,03%.",
      "En silicio, simular el silencio (el cero) también gasta energía de conmutación.",
    ],
    explainer: SparseCoding,
    speakerNotes:
      "En el Experimento 2, la red densa sufre un solapamiento del 80% entre conceptos; la esparcida del 1% lo reduce al 1,03%. Arrastra el control para verlo: la interferencia crece con la densidad.",
  },
  {
    title: "El canal químico",
    subtitle: "El alfabeto molecular frente al cableado binario",
    bullets: [
      "Silicio: señalización de canal único, electrones en pistas de cobre estáticas.",
      "Carbono: decenas de neurotransmisores y neuromoduladores que difunden en volumen, en paralelo.",
      "Experimento 3: incorporar cada canal químico escala linealmente los FLOPs (120K → 428K).",
      "La química realiza cómputos volumétricos pasivos; el silicio debe emularlos con ecuaciones lógicas.",
    ],
    image: "/graficos/exp3_escalamiento_quimico.png",
    imageAlt: "Escalamiento lineal de canales químicos",
    speakerNotes:
      "El cerebro no es binario: la difusión por volumen de dopamina o GABA ocurre en 3D y en paralelo. Simularla en silicio incrementa los FLOPs de forma lineal por cada neurotransmisor.",
  },
  {
    title: "La paradoja termodinámica",
    subtitle: "Costo del cómputo lógico vs. física molecular pasiva",
    bullets: [
      "Principio de Landauer: piso universal (kT·ln 2) que NI el silicio NI el carbono se acercan a tocar.",
      "La brecha medida (3.000× → 104.450×) es arquitectónica, no fundamental.",
      "No es monotónica: baja en single-GPU y rebota al cruzar VRAM → PCIe → DDR.",
      "Cautela: compara potencia total de hardware no optimizado con señalización idealizada por spike.",
    ],
    explainer: EfficiencyStaircase,
    speakerNotes:
      "La brecha va de ~3.000× con una GPU hasta 104.450× en el híbrido a 16M, porque cada cuello de botella la amplifica. Pero el límite fundamental, Landauer, es común a ambos sustratos: no favorece a ninguno.",
  },
  {
    title: "Emergencia temporal",
    subtitle: "Sincronización beta–gamma y retardos axonales",
    bullets: [
      "Las oscilaciones rápidas (~40 Hz) ligan perceptivamente los conceptos en el cerebro (Bechtel).",
      "El retardo de conducción es una propiedad pasiva del espacio físico de los axones.",
      "Experimento 4: emergen oscilaciones beta–gamma (13–80 Hz, ~58% de potencia) de la red E-I.",
      "En silicio, mantener los desfases exige indexar miles de buffers de memoria.",
    ],
    explainer: GammaOscillation,
    speakerNotes:
      "Las oscilaciones sincronizan áreas distantes para unificar la percepción. En el Experimento 4 emergen solas de los retardos de conducción de una red excitatoria-inhibitoria; en silicio, procesarlas exige miles de operaciones por segundo.",
  },
  {
    title: "Computación morfológica",
    subtitle: "El cuerpo como parte del cómputo",
    bullets: [
      "Grillo robot de Webb (1996): resuelve la fonotaxis por acústica morfológica pasiva.",
      "Experimento 6: el modelo desencarnado gasta 757.760 FLOPs; el corporizado, solo 2 FLOPs.",
      "El cómputo no desaparece: se REUBICA en la física del cuerpo (que puede ser materia no viva).",
      "Lo decisivo, entonces, no es el carbono, sino la autopoiesis. El silicio andamia; no origina.",
    ],
    explainer: MorphologyFlops,
    speakerNotes:
      "El grillo de Webb reubica el cómputo en el cuerpo: 757.760 FLOPs frente a 2. Y como ese cuerpo puede ser materia no viva, lo decisivo no es el carbono en sí, sino la autopoiesis; el silicio sirve de andamio.",
  },
  {
    title: "La variabilidad del sustrato",
    subtitle: "Grados de libertad: analógico graduado vs. binario",
    bullets: [
      "El silicio conmuta 1 bit por señal; una sinapsis de carbono porta ~4,7 bits (26 estados graduados; Bartol et al., 2015).",
      "La modulación química añade una dimensión combinatoria: +100 neuromoduladores ≈ +332 bits de contexto.",
      "El espacio de estados del carbono no es más grande: es de otro tipo.",
      "Emular esa variabilidad en digital exige N bits por valor graduado: el patrón físico-local vs. contable-global.",
    ],
    explainer: StateSpaceVariability,
    speakerNotes:
      "Primer eje nuevo. La realizabilidad múltiple asume que un medio de baja variabilidad puede instanciar la misma organización. Pero una sinapsis de carbono codifica 4,7 bits graduados frente a 1 binario, y la modulación química multiplica el espacio de estados de forma combinatoria. La variabilidad quizá no sea implementación, sino parte de la organización relevante.",
  },
  {
    title: "El modo de intercambio",
    subtitle: "Químico-pasivo vs. eléctrico-activo",
    bullets: [
      "Lo que fija el piso energético no es cuánto se computa, sino cómo se intercambia la señal.",
      "En silicio, mover un dato cuesta ~650× computarlo; el 99,8% de la energía es tráfico, no cómputo (Horowitz, 2014).",
      "El carbono difunde química de forma pasiva, a favor del gradiente; solo restaura el gradiente de forma amortizada (Attwell-Laughlin, 2001).",
      "La asimetría de consumo se sigue de elegir electrones-que-empujar sobre iones-que-se-difunden.",
    ],
    explainer: ExchangeMode,
    speakerNotes:
      "El eje más decisivo, porque explica la energía sin apelar a una esencia. En el silicio cada bit movido carga y descarga activamente un cable, y ese transporte domina el consumo (99,8%). En el carbono el transporte es difusión pasiva a favor del gradiente; solo se paga, amortizada, la restauración del gradiente. El modo de intercambio fija el piso.",
  },
  {
    title: "Ancho de banda de I/O",
    subtitle: "Fan-out 3D y entrega circulatoria",
    bullets: [
      "Fan-out: una neurona irradia ~7.000 sinapsis en 3D; una compuerta CMOS, ~6 (1.167×).",
      "Cablear en 2D vs. 3D penaliza como N^(1/6): a escala cerebral, ~68× más interconexión.",
      "600 km de capilares, cada neurona a ~20 µm, ratio 1:1: entrega volumétrica de energía y química.",
      "Los cables difícilmente superarán a los sistemas circulatorios.",
    ],
    explainer: IOBandwidth,
    speakerNotes:
      "Tercer eje: la conectividad. El fan-out biológico supera al del silicio por mil, el cableado 3D es intrínsecamente más eficiente que el 2D, y —lo decisivo— el sistema circulatorio entrega combustible y señal en el mismo volumen donde se computa. El silicio no tiene análogo a una vasculatura. La I/O biológica no es solo más ancha: es de otra clase topológica.",
  },
  {
    title: "Autopoiesis: el sustrato como candidato",
    subtitle: "Del costo material a la conjetura ontológica",
    bullets: [
      "Maturana y Varela (1974): lo vivo se define por auto-producirse —regenerar continuamente su propia frontera material—.",
      "En el carbono, procesar información es inseparable de mantenerse existiendo: la neurona computa para regular su homeostasis, no para resolver un problema lógico.",
      "Thompson (2007): el sentido nace de la precariedad de un ser que debe producirse para no disolverse.",
      "Conjetura: los qualia podrían requerir esa vulnerabilidad homeostática. El silicio es estático: no tiene nada que perder.",
    ],
    speakerNotes:
      "Aquí bajo del costo a la ontología, y aquí suelto el laboratorio. El salto NO lo da la energía —eso sería ilícito—, lo da la autopoiesis: la idea de que la conciencia primaria requiere que algo importe a un sistema porque su existencia está en juego. Variabilidad, intercambio pasivo y entrega circulatoria dejan de ser 'eficiencia' y pasan a ser las condiciones de un sistema que se auto-produce.",
  },
  {
    title: "La objeción de Chalmers",
    subtitle: "Qualia danzantes y la respuesta enactivista",
    bullets: [
      "Chalmers (1995): si sustituyes neuronas por chips funcionalmente idénticos, los qualia no deberían 'danzar' sin que lo notes → la experiencia la fijaría la organización, no el material.",
      "Respuesta: distingo ser 'discreto' de estar 'desacoplado de la vida'.",
      "Aproximar la salida no es instanciar la organización; el isomorfo de grano fino tendría que replicar variabilidad, intercambio pasivo y entrega volumétrica.",
      "En ese punto ya no es 'lo mismo en otro sustrato': es construir otro sistema físico con esas propiedades.",
    ],
    speakerNotes:
      "No caricaturizo a Chalmers: su argumento es fuerte. Mi respuesta no niega su fuerza, sino su premisa —que la organización relevante se preserve en un medio discreto y desacoplado de la vida—. No afirmo que sea no-computable en principio; afirmo que la carga de la prueba no está saldada, y que los cinco ejes dan razones concretas para dudarlo.",
  },
  {
    title: "Hacia el neuromorfismo corporizado",
    subtitle: "Límites de Turing y conclusión",
    bullets: [
      "El sustrato importa: la conciencia fenoménica se apoya en la auto-producción autopoiética.",
      "El silicio digital de Von Neumann es un accidente histórico, no el medio óptimo para la cognición.",
      "Neuromorfismo analógico (Loihi, memristores): integra corrientes pasivas en el hardware.",
      "Transitar del cálculo digital abstracto a sistemas analógicos neuromórficos corporizados.",
    ],
    speakerNotes:
      "La ineficiencia del silicio no es un problema de potencia, sino de paradigma. Si queremos emular procesos conscientes, hay que abandonar la arquitectura de Von Neumann y transitar hacia el silicio neuromórfico analógico corporizado.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function SlideClient({ slideIndex }: { slideIndex: number }) {
  const [picker, setPicker] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const total = slidesData.length;

  // Ajuste a la pantalla: cada diapositiva se escala para caber ENTERA en el
  // viewport (16:9 1080p incluido), sin scroll ni desborde, a cualquier
  // resolución. Se recalcula al cambiar de slide y al redimensionar.
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    let raf = 0;
    const fit = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nW = el.offsetWidth;
        const nH = el.offsetHeight;
        if (!nW || !nH) return;
        const availW = window.innerWidth - 32;
        const availH = window.innerHeight - 92; // reserva la barra flotante
        setScale(Math.min(1, availW / nW, availH / nH));
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    const timers = [setTimeout(fit, 300), setTimeout(fit, 800)];
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [slideIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPicker(false);
      else if (e.key === "ArrowRight" && slideIndex < total - 1)
        window.location.href = `/slides/${slideIndex + 1}`;
      else if (e.key === "ArrowLeft" && slideIndex > 0)
        window.location.href = `/slides/${slideIndex - 1}`;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slideIndex, total]);

  if (isNaN(slideIndex) || slideIndex < 0 || slideIndex >= total) {
    return (
      <div className="sd-deck">
        <div className="sd-stage">
          <article className="sd-panel" style={{ textAlign: "center" }}>
            <h1 className="sd-title">Diapositiva no encontrada</h1>
            <Link href="/slides/0" className="sd-navlink" style={{ margin: "1rem auto 0" }}>
              <ArrowLeft size={14} /> Volver al inicio
            </Link>
          </article>
        </div>
      </div>
    );
  }

  const slide = slidesData[slideIndex];
  const Explainer = slide.explainer;
  const isTitle = slideIndex === 0;
  const kicker = isTitle
    ? "Sustentación · Filosofía de las Neurociencias"
    : `Diapositiva ${pad(slideIndex + 1)} · Silicio ⇄ Tejido`;

  return (
    <div className="sd-deck">
      <span className="sd-orb sd-orb-a" aria-hidden="true" />
      <span className="sd-orb sd-orb-b" aria-hidden="true" />
      <span className="sd-grid" aria-hidden="true" />

      <div className="sd-stage">
        <article
          ref={panelRef}
          className={`sd-panel${isTitle ? " sd-panel-hero" : ""}`}
          style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
        >
          <header className="sd-head">
            <span className="sd-brand">
              <Emblem size={24} />
              Silicio ⇄ Tejido
            </span>
            <span className="sd-counter">
              {pad(slideIndex + 1)} <i>/</i> {pad(total)}
            </span>
          </header>

          <p className="sd-eyebrow">{kicker}</p>
          <h1 className={`sd-title${isTitle ? " sd-title-hero" : ""}`}>{slide.title}</h1>
          <p className="sd-subtitle">{slide.subtitle}</p>

          <div className="sd-body" data-media={Explainer || slide.image ? "1" : "0"}>
            <ul className="sd-bullets">
              {slide.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            {Explainer ? (
              <div className="sd-screen">
                <Explainer />
              </div>
            ) : slide.image ? (
              <div className="sd-screen">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt || slide.title}
                  width={460}
                  height={280}
                  style={{ borderRadius: 8, maxWidth: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
            ) : null}
          </div>

          <aside className="sd-notes">
            <strong>
              <Mic size={13} /> Notas del orador
            </strong>
            {slide.speakerNotes}
          </aside>
        </article>
      </div>

      {/* Barra flotante */}
      <nav className="sd-navbar" aria-label="Navegación de diapositivas">
        <span
          className="sd-navprogress"
          style={{ width: `${((slideIndex + 1) / total) * 100}%` }}
        />
        <span className="sd-navbrand">S⇄T</span>
        <button
          className="sd-arrow"
          onClick={() => slideIndex > 0 && (window.location.href = `/slides/${slideIndex - 1}`)}
          disabled={slideIndex === 0}
          aria-label="Anterior"
        >
          <ArrowLeft size={17} />
        </button>
        <button className="sd-navpill" onClick={() => setPicker(true)}>
          <LayoutGrid size={13} />
          <span className="sd-navpill-label">{slide.title}</span>
          <small>{pad(slideIndex + 1)}/{pad(total)}</small>
        </button>
        <button
          className="sd-arrow"
          onClick={() => slideIndex < total - 1 && (window.location.href = `/slides/${slideIndex + 1}`)}
          disabled={slideIndex === total - 1}
          aria-label="Siguiente"
        >
          <ArrowRight size={17} />
        </button>
        <Link href="/" className="sd-navdata">
          <FileText size={13} /> Ensayo
        </Link>
      </nav>

      {/* Selector de diapositivas */}
      {picker && (
        <div className="sd-modal-backdrop" onClick={() => setPicker(false)}>
          <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sd-modal-head">
              <span>Diapositivas · {total}</span>
              <button className="sd-modal-close" onClick={() => setPicker(false)} aria-label="Cerrar">
                <X size={16} />
              </button>
            </div>
            <div className="sd-modal-grid">
              {slidesData.map((s, i) => (
                <Link
                  key={i}
                  href={`/slides/${i}`}
                  className={`sd-modal-item${i === slideIndex ? " active" : ""}`}
                  onClick={() => setPicker(false)}
                >
                  <span className="sd-modal-num">{pad(i + 1)}</span>
                  <span className="sd-modal-name">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
