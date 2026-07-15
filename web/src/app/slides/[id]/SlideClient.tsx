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
import ArgMap from "@/components/ArgMap";

interface SlideData {
  title: string;
  subtitle: string;
  bullets: string[];
  explainer?: ComponentType;
  image?: string;
  imageAlt?: string;
  argmap?: boolean;
  speakerNotes: string;
}

const slidesData: SlideData[] = [
  {
    title: "La unidad que falta",
    subtitle: "La falacia mereológica y el argumento del sustrato",
    bullets: [
      "Problema: ¿puede la autopoiesis decidir quién puede sentir?",
      "Tesis: no. Individúa células, no sujetos.",
      "No defiendo que el silicio sienta.",
    ],
    speakerNotes:
      "Buenas tardes. El título nombra lo que le falta a un argumento muy atractivo. El argumento dice: la conciencia es de los seres vivos; lo vivo se autoproduce; el silicio no se autoproduce; luego el silicio no siente. Lo llamo el argumento del sustrato. Voy a sostener que se rompe antes de llegar al silicio: para funcionar necesita que la auto-producción material individúe al sujeto de la conciencia, y no lo hace —individúa células—. Aclaro de entrada el alcance, porque es la mitad del trabajo: de nada de lo que diga se sigue que una máquina sienta. Se sigue algo más modesto y más firme: que la autopoiesis no es el instrumento que puede decidirlo.",
  },
  {
    title: "El argumento de un vistazo",
    subtitle: "Un problema, una tesis, un dilema del que no se sale",
    bullets: [],
    argmap: true,
    speakerNotes:
      "El mapa completo antes del detalle, para que sepan a dónde voy. Arriba, el argumento del sustrato en su mejor forma. En el centro, lo que sus premisas le exigen a la autopoiesis: no distinguir vivo de no-vivo, sino individuar al portador de la experiencia. Abajo, las tres cargas que no puede pagar: en un cuerpo hay diez billones de unidades autopoiéticas y ninguna es el sujeto; el cerebro no es una de ellas; y el hígado es tan autopoiético como el cerebro. A la derecha, la salida y su precio: para seleccionar la escala hay que añadir integración causal o clausura operacional, y eso es organizacional, es decir, sustrato-neutral. Ese es el dilema, y es el eje de todo lo que sigue.",
  },
  {
    title: "El problema",
    subtitle: "Una sola pregunta, y no es la del problema difícil",
    bullets: [
      "Funcionalismo: el rol causal basta; el material no importa.",
      "Réplica viva: sólo lo que se autoproduce puede sentir.",
      "Mi pregunta: ¿puede la autopoiesis decidir eso?",
    ],
    speakerNotes:
      "Un solo problema. Putnam y Fodor establecieron la realizabilidad múltiple: los estados mentales se definen por su rol causal, no por su composición. El corolario polémico es que el sustrato sería ontológicamente irrelevante. Contra ese corolario convergen Searle, con el naturalismo biológico, y la tradición enactivista, que define lo vivo por la autopoiesis: un sistema que produce y regenera continuamente los componentes y la frontera que lo constituyen como unidad. Thompson extrae de ahí la continuidad vida-mente; Di Paolo la corrige desde dentro exigiendo adaptividad. Mi pregunta no es si el funcionalismo es verdadero. Es más estrecha y por eso decidible: ¿puede la autopoiesis decidir qué sistemas pueden ser conscientes? Ese es el único problema de la sesión.",
  },
  {
    title: "El argumento del sustrato",
    subtitle: "En su versión más fuerte, no en una caricatura",
    bullets: [
      "La conciencia requiere un sujeto: algo que sea uno.",
      "Hay valencia sólo si el sistema puede dejar de existir.",
      "El silicio digital no se produce a sí mismo.",
      "Luego: ningún sistema de silicio es sujeto.",
    ],
    speakerNotes:
      "Lo reconstruyo en su mejor forma, porque atacar una caricatura no valdría nada. Premisa uno: la conciencia requiere un sujeto, un sistema que sea uno y para el cual sus estados tengan valencia. Premisa dos: un sistema tiene valencia propia sólo si se produce a sí mismo y puede dejar de existir. Premisa tres: ningún sistema de silicio digital se produce a sí mismo. Conclusión: ninguno es sujeto de conciencia. Es un buen argumento: la premisa dos tiene detrás a Jonas, a Di Paolo, a Thompson, y detrás de todo hay neurociencia real —la interocepción muestra hasta qué punto la experiencia se organiza alrededor de la regulación del estado corporal—. Y sean exactos con su mejor defensor: Seth dice que sus argumentos «no refutan» el funcionalismo, sólo lo vuelven «menos plausible y menos atractivo», y rechaza explícitamente el chovinismo del carbono. Su eje es vivo / no-vivo.",
  },
  {
    title: "Lo que le exige a la autopoiesis",
    subtitle: "No clasificar lo vivo: individuar al sujeto",
    bullets: [
      "No basta separar vivo de no-vivo.",
      "Exige: el sujeto está donde está la auto-producción.",
      "Ahí se rompe. No en la premisa del silicio.",
    ],
    speakerNotes:
      "Aquí está el paso que nadie audita. Miren qué le piden las dos primeras premisas a la autopoiesis. No le piden distinguir lo vivo de lo no vivo —eso sí lo hace—. Le piden localizar al portador de la experiencia: dicen, en efecto, que el sujeto está donde está la auto-producción. Ese es un compromiso enorme y silencioso, porque convierte un criterio de vida en un criterio de individuación de sujetos. Y mi ataque no va contra la tercera premisa: concedo sin discutir que el silicio digital no se autoproduce. El argumento se rompe antes, en el tránsito de «esto está vivo» a «esto es un sujeto». Lo que sigue es simplemente preguntar por la extensión del criterio: ¿a qué cosas, exactamente, se aplica?",
  },
  {
    title: "La unidad equivocada",
    subtitle: "Diez billones de unidades autopoiéticas, y ninguna soy yo",
    bullets: [
      "La unidad canónica es la célula (Varela, Maturana y Uribe, 1974).",
      "En mi cuerpo: ~10¹³ unidades autopoiéticas.",
      "Ninguna escribió este ensayo.",
      "Excluía al silicio; multiplica sujetos en el carbono.",
    ],
    speakerNotes:
      "Preguntemos por la extensión de «sistema autopoiético». La unidad canónica es la célula: es el caso que Varela, Maturana y Uribe modelan en el 74 y el paradigma de la tradición entera. Y subrayo algo crucial, porque es donde se equivocan casi todas las objeciones: no acuso a la autopoiesis de ser vaga ni relativa al observador. Es objetiva: hay un hecho, independiente de nosotros, sobre si una red metabólica produce la membrana que la encierra. Fijada una granularidad, es decidible. Mi cargo es de extensión, no de subjetividad. Y el cargo es aritmética: en mi cuerpo hay del orden de diez billones de unidades autopoiéticas, y ninguna soy yo. Si el sujeto está donde está la auto-producción, hay diez billones de sujetos aquí y ninguno escribe este ensayo. El argumento que debía excluir al silicio termina multiplicando sujetos dentro del carbono.",
  },
  {
    title: "El cerebro no es autopoiético",
    subtitle: "Primera consecuencia: un sistema de segundo orden",
    bullets: [
      "El cerebro no produce sus componentes: los producen sus células.",
      "Es un sistema de segundo orden, no una unidad autopoiética.",
      "La teoría pone al sujeto donde no están los correlatos.",
    ],
    speakerNotes:
      "De ahí salen tres consecuencias, cada una peor que la anterior. La primera: el cerebro no es una unidad autopoiética. No produce sus componentes; los producen sus células, cada una por su cuenta. En el vocabulario de la propia tradición es un sistema de segundo orden: una unidad compuesta de unidades autopoiéticas que no es ella misma autopoiética en sentido estricto. Y noten la incomodidad que eso genera. La teoría localiza al sujeto exactamente donde la neurociencia que estos mismos autores invocan no localiza los correlatos de la conciencia. Si el criterio se aplica en serio, el candidato a sujeto no es el cerebro. Si se aplica flojamente para que el cerebro clasifique, ya no es el criterio material que el argumento necesitaba.",
  },
  {
    title: "El hígado es tan autopoiético como el cerebro",
    subtitle: "Segunda consecuencia: un criterio que no distingue órganos",
    bullets: [
      "Ambos son agregados de células que se autoproducen.",
      "La auto-producción no dice por qué el cerebro y no el hígado.",
      "Un criterio del sujeto que no separa órganos no es criterio.",
    ],
    speakerNotes:
      "Segunda consecuencia, y es la que más me convenció a mí. El hígado es tan autopoiético como el cerebro. Los dos son exactamente lo mismo bajo el criterio: agregados de células que se autoproducen. De modo que si la auto-producción individuara al sujeto, no habría absolutamente nada en ella que dijera por qué el sujeto es el cerebro y no el hígado. Y esto no es un chiste retórico: un criterio del sujeto que no distingue entre dos órganos del mismo cuerpo no es todavía un criterio del sujeto. Aquí reaparece la lección de Bennett y Hacker, invertida: el argumento del sustrato elige un criterio que sólo se satisface en las partes —las células— y pretende que decida sobre el todo. Discute de qué está hecho el sujeto sin haber fijado cuál es.",
  },
  {
    title: "Quién hace el trabajo",
    subtitle: "Tercera consecuencia: lo añadido es lo que decide",
    bullets: [
      "Para escoger la escala hay que añadir integración causal.",
      "La integración es organización, no material.",
      "Es justo lo que el funcionalista concede sin pestañear.",
      "La auto-producción queda como epiciclo.",
    ],
    speakerNotes:
      "Tercera consecuencia, y es la decisiva. Para escapar de las escalas anidadas —célula, tejido, órgano, organismo— hay que añadir algo que seleccione una: integración causal, clausura operacional. Pero fíjense en lo que pasa entonces: eso añadido hace todo el trabajo. La integración causal es una propiedad de la organización, no del material, y es exactamente lo que ofrecen las teorías neurobiológicas de la conciencia que revisó el seminario. Es también lo que el funcionalista concede sin pestañear, porque es su tesis. Con lo cual la auto-producción queda como un epiciclo: no explica ningún caso que la integración causal no explique ya, y sola no explica ninguno. Y que la frontera del sujeto no sea un dato lo enseña el propio seminario: el grillo robot de Webb delega el cómputo de la fonotaxis a un tubo de desfase —materia no viva, y sin embargo cognitivamente constitutiva—.",
  },
  {
    title: "La tradición ya lo sabía",
    subtitle: "Varela 1979: de la autopoiesis a la autonomía — y el dilema",
    bullets: [
      "Varela generalizó a autonomía y clausura operacional.",
      "Motivo: la autopoiesis estricta es celular; no llega al organismo.",
      "Pero la clausura es organizacional: realizable en más de un medio.",
      "O individúa, o excluye sustratos. No ambas.",
    ],
    speakerNotes:
      "Y esto no es un descubrimiento mío: es la razón por la que Varela abandonó el marco estrecho. En Principles of Biological Autonomy, del 79, generaliza la autopoiesis hasta la noción más amplia de autonomía, articulada por la clausura operacional, precisamente porque la autopoiesis en sentido estricto es celular y no llega ni al organismo ni al sistema nervioso. La autonomía sí llega, porque ya no exige producción material de componentes, sino que los procesos formen una red que se sostiene recíprocamente. Ahí está el filo. La clausura operacional se define por cómo se encadenan los procesos, no por de qué están hechos; y una propiedad definida por la forma de la red es, por definición, el tipo de cosa realizable en más de un medio. El camino que el enactivismo recorrió para poder individuar al sujeto es el mismo que le quita el argumento contra el silicio. O autopoiesis estricta —objetiva, material, celular, y no individúa—, o autonomía —individúa, y no excluye sustratos—. No hay tercera posición.",
  },
  {
    title: "La advertencia de la casa",
    subtitle: "Beer (2004): nítido en el caso paradigmático, indeterminado donde hace falta",
    bullets: [
      "Homenaje a Varela, no refutación: la individuación queda abierta.",
      "«¿Merecen realmente llamarse componentes?»",
      "La identidad «depende crucialmente de cómo elegimos definir».",
      "«Ningún sistema es autopoiético» en un intervalo largo.",
    ],
    speakerNotes:
      "La advertencia se la hace la teoría a sí misma. Beer, en 2004, analiza un glider del juego de la vida como sistema autopoiético —y quiero ser justo: es un homenaje explícito a Varela, no una refutación, y plantea la individuación como problema abierto—. Se detiene en las preguntas previas: si los estados de las celdas «merecen realmente llamarse componentes», si encender o apagar una celda «cuenta realmente como producción de componentes», si el glider «posee realmente una frontera que lo genera y lo constriñe». Y observa dos cosas que uso: que la continuidad de su identidad «depende crucialmente de cómo elegimos definir» su organización, y que «estrictamente hablando, ningún sistema es autopoiético si se lo observa durante un intervalo suficientemente largo». Su conclusión —que la caracterización formal de la organización sigue abierta— es la mía: el criterio es nítido en el caso paradigmático y se vuelve indeterminado justo en los disputados, los únicos donde el argumento lo necesita.",
  },
  {
    title: "Mi experimento me refutó",
    subtitle: "Mismo hardware, otro corte: κ de 0,00 a 0,70",
    bullets: [
      "Recurso propio: κ = 0,88 ± 0,00.",
      "Frontera estrecha (chip solo): κ = 0,00 ± 0,00.",
      "Frontera ampliada (chip + fuente): κ = 0,70 ± 0,01.",
      "No cambió el sustrato: cambió el corte.",
    ],
    image: "/graficos/exp10_acoplamiento.png",
    imageAlt:
      "Experimento 10: la misma máquina, con la frontera estrecha, es inmune a la lesión (κ=0,00); ampliada para incluir su fuente de alimentación, se degrada (κ=0,70).",
    speakerNotes:
      "Debo lo anterior a un fracaso propio, y exhibirlo es más útil que taparlo. Construí un coeficiente κ de acoplamiento entre cómputo y auto-mantenimiento y lo presenté como la firma operacional de la autopoiesis. La auditoría lo desarmó. κ igual a cero no era un resultado: era una identidad aritmética. κ de 0,88 tampoco era un descubrimiento: tiene forma cerrada. Y lo que κ mide, cuando mide algo, es compartición de un presupuesto de recursos —eso lo tiene un portátil cuyo cómputo compite con su refrigeración por el mismo presupuesto eléctrico—. Si κ fuera la firma de la autopoiesis, mi computador estaría vivo. La comprobación que lo cierra la corrí con 24 semillas: dejo intacta la máquina y muevo sólo la frontera —cuento la fuente de alimentación como parte del sistema y no como un exterior inagotable— y el mismo silicio, bajo la misma perturbación, pasa de 0,00 a 0,70. No cambió el sustrato; cambió el corte. Y ninguna de las dos ramas es autopoiética: la bomba es exógena, no hay clausura de producción ni adaptividad, que es lo que Di Paolo exige. La medida no descubre unidades: las presupone.",
  },
  {
    title: "Qué NO se sigue",
    subtitle: "El alcance, dicho antes de que me lo pregunten",
    bullets: [
      "No se sigue que el silicio sienta.",
      "No refuto a Seth: su argumento no usa la premisa que ataco.",
      "No explico los qualia: soy neutral ante el problema difícil.",
      "La objeción fuerte —«caricaturizas»— es mi argumento.",
    ],
    speakerNotes:
      "El alcance, y lo digo yo antes de que me lo pregunten. No he mostrado que una máquina sienta, ni que la vida sea irrelevante para la mente. El argumento de Seth no depende de la premisa que ataco, así que no lo refuto. Tampoco explico los qualia: mi argumento es neutral ante el problema difícil, y la neutralidad es deliberada, porque vale sea el funcionalismo verdadero o falso. Y la réplica seria es que caricaturizo: Thompson y Di Paolo nunca dijeron que la célula sea el sujeto; hablan de autonomía del organismo. Concedo el hecho y niego que me perjudique, porque es mi argumento: en cuanto la tradición pasa a la autonomía para individuar al organismo, deja de tener un argumento material contra el silicio y pasa a tener una teoría organizacional de la unidad, compatible con la realizabilidad múltiple. Y no finjo prioridad: la distinción entre identidad propia y prestada —la del artefacto, cuya identidad «le es acordada» por otro— es de Jonas, del 68; y que el problema de la individualidad sea «el de justificar cuál separación elegimos entre el gran conjunto de distinciones posibles y arbitrarias» está dicho, con esas palabras, en Barandiaran, Di Paolo y Rohde. No descubro la condición de individualidad: la aplico donde no se la habían cobrado.",
  },
  {
    title: "La unidad que falta",
    subtitle: "Un recorte a la espera de un argumento",
    bullets: [
      "Parecía tener criterio objetivo y sujeto: tiene uno a la vez.",
      "Lo que queda: automantenimiento delegado vs. constitutivo.",
      "Pero esa diferencia es relativa al corte.",
      "Decidir el corte es la tarea que el debate se salta.",
    ],
    speakerNotes:
      "Cierro. El argumento del sustrato parecía fuerte porque parecía tener dos cosas: un criterio objetivo y material —la auto-producción— y un sujeto al cual aplicarlo. Tiene sólo una a la vez. En sentido estricto, la autopoiesis es objetiva y señala células: diez billones de unidades en un cuerpo, ninguna de ellas yo, y un cerebro que no clasifica. En el sentido amplio al que la tradición se vio obligada a migrar, individúa organismos, pero se ha vuelto una propiedad de la organización; y las propiedades de la organización no excluyen sustratos: son la tesis del adversario. Queda algo, y es lo que me llevo: la diferencia real no es carbono contra silicio, sino automantenimiento delegado contra constitutivo —entre un sistema cuyas condiciones de persistencia son internas a la unidad y uno que las tiene fuera, en técnicos y redes eléctricas cuya normatividad es previa y ajena—. Pero esa diferencia, como me enseñó mi propio experimento, es relativa al corte; y decidir el corte es la tarea que el debate ha estado saltándose. Mientras la respuesta la ponga quien pregunta, «¿puede el silicio ser consciente?» no es todavía una pregunta: es un recorte a la espera de un argumento. Gracias.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

// Por debajo de este factor el cuerpo de la diapositiva deja de ser legible a
// distancia de proyección. Es un SUELO: si una diapositiva lo necesita, su
// contenido es demasiado largo y hay que recortarlo (se avisa por consola).
const MIN_SCALE = 0.72;

// TECHO. Sin esto el panel se quedaba clavado en sus 1040 px de ancho maquetado:
// en un 1080p ocupaba el 54 % de la pantalla, con márgenes muertos enormes y el
// texto innecesariamente pequeño al proyectar. La diapositiva debe CRECER hasta
// llenar el espacio disponible, no sólo encogerse para caber (patrón reveal.js).
// El límite evita que una diapositiva muy corta se infle de forma grotesca.
const MAX_SCALE = 1.8;

export default function SlideClient({ slideIndex }: { slideIndex: number }) {
  const [picker, setPicker] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const total = slidesData.length;

  // Ajuste a la pantalla: cada diapositiva se escala para caber ENTERA en el
  // viewport (16:9 1080p incluido), sin scroll ni desborde, a cualquier
  // resolución. Se recalcula al cambiar de slide y al redimensionar.
  // OJO: se mide SÓLO el contenido proyectable. Las notas del orador viven
  // fuera del panel (cajón conmutable), así que no encogen la diapositiva.
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
        const raw = Math.min(MAX_SCALE, availW / nW, availH / nH);
        if (raw < MIN_SCALE) {
          console.warn(
            `[deck] Diapositiva ${slideIndex + 1} necesita scale ${raw.toFixed(
              3
            )} < ${MIN_SCALE}: el contenido es demasiado largo para el viewport actual.`
          );
        }
        setScale(Math.max(MIN_SCALE, raw));
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
      if (e.key === "Escape") {
        setPicker(false);
        setNotesOpen(false);
      } else if (e.key === "n" || e.key === "N") {
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        setNotesOpen((v) => !v);
      } else if (e.key === "ArrowRight" && slideIndex < total - 1)
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
    : `Diapositiva ${pad(slideIndex + 1)} · La unidad que falta`;

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
              La unidad que falta
            </span>
            <span className="sd-counter">
              {pad(slideIndex + 1)} <i>/</i> {pad(total)}
            </span>
          </header>

          <p className="sd-eyebrow">{kicker}</p>
          <h1 className={`sd-title${isTitle ? " sd-title-hero" : ""}`}>{slide.title}</h1>
          <p className="sd-subtitle">{slide.subtitle}</p>

          {slide.argmap && (
            <div className="sd-argmap">
              {/* Variante de proyección: el mapa de lectura (940×716) topa en
                  altura y se queda en scale ~1,01 — ilegible a 10 m. */}
              <ArgMap compact />
            </div>
          )}

          <div
            className="sd-body"
            data-media={Explainer || slide.image ? "1" : "0"}
            style={slide.argmap ? { display: "none" } : undefined}
          >
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
        </article>
      </div>

      {/* Notas del orador: FUERA del panel medido — no afectan al escalado ni
          se proyectan. Se conmutan con la tecla «N» o el botón de la barra. */}
      {notesOpen && (
        <aside className="sd-notes sd-notes-drawer" aria-label="Notas del orador">
          <strong>
            <Mic size={13} /> Notas del orador · {pad(slideIndex + 1)}/{pad(total)}
            <button
              className="sd-notes-close"
              onClick={() => setNotesOpen(false)}
              aria-label="Cerrar notas del orador"
            >
              <X size={14} />
            </button>
          </strong>
          {slide.speakerNotes}
        </aside>
      )}

      {/* Barra flotante */}
      <nav className="sd-navbar" aria-label="Navegación de diapositivas">
        <span
          className="sd-navprogress"
          style={{ width: `${((slideIndex + 1) / total) * 100}%` }}
        />
        <span className="sd-navbrand">LUQF</span>
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
        <button
          className={`sd-arrow sd-notes-toggle${notesOpen ? " active" : ""}`}
          onClick={() => setNotesOpen((v) => !v)}
          aria-pressed={notesOpen}
          title="Notas del orador (N)"
          aria-label="Notas del orador"
        >
          <Mic size={15} />
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
