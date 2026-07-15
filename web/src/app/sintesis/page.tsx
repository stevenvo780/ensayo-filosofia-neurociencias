import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowRight, BookOpen, FileText } from "lucide-react";
import Reveal from "@/components/Reveal";
import ArgMap from "@/components/ArgMap";

export const metadata: Metadata = {
  title: "Síntesis — para leer en clase",
  description:
    "El argumento entero en voz alta: por qué la autopoiesis no puede decidir el problema del sustrato. Guión de lectura (~8 min).",
};

// Guión de lectura: cada «beat» es una unidad de habla con su tiempo estimado.
// Los tiempos suman ~7 min a ritmo de exposición oral (~150 palabras/min).
const BEATS: { n: string; t: string; title: string; body: React.ReactNode }[] = [
  {
    n: "01",
    t: "~50 s",
    title: "El problema, y por qué importa",
    body: (
      <>
        La pregunta que voy a atacar es una sola: <strong>¿puede la autopoiesis decidir qué sistemas
        pueden ser conscientes?</strong>
        <br />
        <br />
        Bennett y Hacker le enseñaron a la filosofía de las neurociencias a desconfiar de un error
        preciso: atribuirle a la parte lo que sólo se predica del todo. El cerebro no ve; ve la persona.
        Voy a mostrar que la objeción más atractiva contra el funcionalismo comete un primo de ese error:
        discute <em>de qué está hecho</em> el sujeto sin haber fijado <em>cuál</em> es. Y importa porque
        no se resuelve con más datos: el problema está en el sujeto de la oración.
      </>
    ),
  },
  {
    n: "02",
    t: "~60 s",
    title: "El argumento del sustrato, en su mejor forma",
    body: (
      <>
        Voy a reconstruirlo en su versión más fuerte, no en una caricatura. La conciencia requiere un
        sujeto: un sistema que sea <em>uno</em> y para el cual sus estados tengan valencia. Un sistema
        tiene valencia propia sólo si se produce a sí mismo y puede dejar de existir. Ningún sistema de{" "}
        <span className="si">silicio digital</span> se produce a sí mismo. Luego ninguno es sujeto de
        conciencia. Lo llamo <strong>el argumento del sustrato</strong>.
        <br />
        <br />
        Y quiero ser exacto con su defensor más cuidadoso: Seth dice que sus argumentos{" "}
        <em>no refutan</em> el funcionalismo computacional, sino que lo vuelven «menos plausible y menos
        atractivo». Y rechaza explícitamente el chovinismo del carbono: su eje es vivo contra no-vivo.
        <br />
        <br />
        Fíjense en lo que las dos primeras premisas le exigen a la autopoiesis: no sólo distinguir lo
        vivo de lo no vivo, sino <strong>individuar al portador de la experiencia</strong>. Ahí, y no en
        la premisa sobre el silicio, es donde se rompe.
      </>
    ),
  },
  {
    n: "03",
    t: "~80 s",
    title: "La unidad equivocada: 10¹³ células, el cerebro, el hígado",
    body: (
      <>
        No acuso a la autopoiesis de ser vaga ni relativa al observador. Es <strong>objetiva</strong>:
        hay un hecho, independiente de nosotros, sobre si una red metabólica produce la membrana que la
        encierra. Fijada una granularidad, es decidible.
        <br />
        <br />
        Mi objeción es de <strong>extensión</strong>, no de subjetividad. La unidad canónica de la
        autopoiesis es <span className="carbon">la célula</span>. Y en mi cuerpo hay del orden de diez
        billones de unidades autopoiéticas, y ninguna soy yo. Si el sujeto está donde está la
        auto-producción, hay diez billones de sujetos aquí y ninguno escribe este ensayo. El argumento
        que debía excluir al silicio termina multiplicando sujetos dentro del carbono.
        <br />
        <br />
        De ahí dos consecuencias peores. El <strong>cerebro no es una unidad autopoiética</strong>: no
        produce sus componentes, los producen sus células, cada una por su cuenta; es un sistema de
        segundo orden. Y el <strong>hígado es tan autopoiético como el cerebro</strong>: ambos son
        agregados de células que se autoproducen. Un criterio del sujeto que no distingue entre órganos
        no es todavía un criterio. Para escapar hay que añadir integración causal —y eso añadido hace
        todo el trabajo, y es una propiedad de la organización, no del material—.
      </>
    ),
  },
  {
    n: "04",
    t: "~60 s",
    title: "La clínica ya separó las variables",
    body: (
      <>
        El argumento no necesita esperar una máquina consciente para ponerse a prueba: la neurología ya
        disoció en pacientes las dos variables que importan. Laureys (2007) describe el estado vegetativo
        como la disociación de los dos componentes de la conciencia: «la vigilia permanece intacta, pero
        la consciencia —que abarca todos los pensamientos y sentimientos— queda abolida». Estos pacientes
        conservan ciclos de sueño-vigilia y respiran sin asistencia. La auto-producción está{" "}
        <strong>completa</strong>: el organismo se automantiene, está vivo. Y el sujeto no está.
        <br />
        <br />
        Laureys concluye algo más incómodo: «medir los niveles globales de consumo de energía en el
        cerebro no puede indicar la presencia de consciencia». Lo que sí covaría con el sujeto es la
        «conectividad funcional dentro de esta red frontoparietal y con centros más profundos del cerebro,
        en particular el tálamo». La cautela obliga a hablar de la categoría clínica, y la inferencia es
        mía —Laureys no discute autopoiesis ni silicio—. Pero basta: la clínica mantiene constante la
        auto-producción y mueve al sujeto. El factor diferencial <strong>no es la auto-producción</strong>{" "}
        —es organizacional—.
      </>
    ),
  },
  {
    n: "05",
    t: "~70 s",
    title: "La tradición ya lo sabía: Varela 1979 y el dilema",
    body: (
      <>
        Y esto no es un descubrimiento mío. Es exactamente la razón por la que Varela abandonó el marco
        estrecho. En <em>Principles of Biological Autonomy</em>, de 1979, generaliza la autopoiesis hasta
        la noción más amplia de <strong>autonomía</strong>, articulada por la clausura operacional,
        porque la autopoiesis en sentido estricto es celular y no llega ni al organismo ni al sistema
        nervioso.
        <br />
        <br />
        Pero ahí está el filo. La clausura operacional es una propiedad <strong>organizacional</strong>:
        se define por cómo se encadenan los procesos, no por de qué están hechos. Y una propiedad
        definida por la forma de la red es, por definición, realizable en más de un medio.
        <br />
        <br />
        El camino que el enactivismo recorrió para poder individuar al sujeto es el mismo que le quita el
        argumento contra el silicio. O autopoiesis estricta, que es objetiva y material pero individúa
        células; o autonomía, que individúa organismos pero no excluye ningún sustrato.{" "}
        <strong>No hay tercera posición.</strong>
      </>
    ),
  },
  {
    n: "06",
    t: "~130 s",
    title: "El laboratorio, el benchmark, y la objeción más fuerte",
    body: (
      <>
        Construí un experimento por cada lectura del seminario: la jerarquía visual de Zeki, las células
        de concepto de Quian Quiroga, la neuroquímica de LeDoux, la plasticidad de Hinton, el grillo de
        Webb. Ninguno encontró la diferencia de sustrato que yo buscaba.
        <br />
        <br />
        Mi única medición genuina fue otra cosa: un <strong>benchmark de diecinueve
        configuraciones</strong>, porque empecé buscando en él la prueba de que el silicio es
        energéticamente inviable. La brecha de eficiencia entre <span className="carbon">carbono</span> y{" "}
        <span className="si">silicio</span> va de 2,9×10³ a 4,1×10⁵ —se mueve <strong>143 veces</strong>—
        y no monotónicamente: el mínimo está en medio, no en los extremos, y repartir el mismo cómputo
        entre dos tarjetas lo <strong>empeora</strong>. Un número que cambia dos órdenes de magnitud según
        cómo distribuyo el trabajo no mide el silicio: mide mi ingeniería. Laureys ya lo había dicho desde
        la clínica: el consumo de energía no indica la presencia de consciencia. Mi intuición no era
        falsa; estaba mal dirigida.
        <br />
        <br />
        Y hay una comprobación que lo cierra. Si dejo intacta la máquina y muevo sólo la{" "}
        <strong>frontera</strong> —si cuento la fuente de alimentación como parte del sistema en vez de
        como un exterior inagotable—, el mismo <span className="si">silicio</span> pasa de κ = 0,00 a{" "}
        <strong>κ = 0,70</strong> (24 semillas). No cambió el sustrato: cambió el corte. Lo que queda, y
        no en el lugar donde lo buscaba, es que la diferencia real es automantenimiento{" "}
        <strong>delegado</strong> contra <strong>constitutivo</strong>: ahí sí importa la energía, no por
        cuánta se gasta, sino por quién responde de ella.
        <br />
        <br />
        Queda la réplica más fuerte: «de acuerdo, la auto-producción no individúa al sujeto, pero sigue
        siendo <strong>necesaria</strong>». Concedo la premisa y niego la inferencia. ¿Necesaria de qué?
        Si del sujeto, ninguno lo es —somos sistemas de segundo orden—. Si de los componentes, es una
        tesis sobre el material que la autopoiesis no puede fundar: habla de células, no de sujetos.
        <br />
        <br />
        Y quiero terminar con el alcance honesto. De nada de esto se sigue que el silicio sienta. No he
        explicado los qualia, y mi argumento es neutral ante el problema difícil. Lo mostrado es más
        modesto y más firme: una de las dos grandes objeciones al funcionalismo se apoya en una unidad
        que no tiene.
      </>
    ),
  },
];

export default function SintesisPage() {
  return (
    <>
      <header
        style={{
          background: "var(--hero-bg)",
          color: "var(--hero-text)",
          padding: "clamp(44px, 8vh, 76px) 24px clamp(36px, 6vh, 56px)",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="eyebrow" style={{ color: "var(--hero-muted)", marginBottom: 14 }}>
          Para leer en clase · ~8 min
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(1.9rem, 5vw, 3.1rem)",
            lineHeight: 1.1,
            maxWidth: 720,
            margin: "0 auto 0.4em",
            color: "#fff",
          }}
        >
          El argumento entero, en voz alta
        </h1>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--hero-muted)",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            maxWidth: 600,
            margin: "0 auto 24px",
          }}
        >
          Síntesis de <em>La unidad que falta</em> — seis beats para exponer la tesis sin leerla entera
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <ArrowLeft size={15} /> Ensayo
          </Link>
          <Link href="/tesis" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <BookOpen size={15} /> Tesis extendida
          </Link>
          <a
            href="/ensayo-la-unidad-que-falta.pdf"
            className="btn"
            download
            style={{ color: "#0b1220", borderColor: "transparent", background: "#fff" }}
          >
            <FileText size={15} /> PDF del ensayo
          </a>
        </div>
      </header>

      <div className="lectura">
        <Reveal>
          <section className="lectura__abstract" aria-label="Resumen de la tesis">
            <h2 className="lectura__abstract-h">Resumen</h2>
            <p>
              Este ensayo aplica la lección de Bennett y Hacker sobre la <strong>falacia mereológica</strong>{" "}
              a un problema único: ¿puede la autopoiesis decidir qué sistemas pueden ser conscientes? El{" "}
              <em>argumento del sustrato</em> —el <span className="si">silicio</span> no se autoproduce,
              luego no siente— necesita que la auto-producción material individúe al <em>sujeto</em> de la
              conciencia. No lo hace: individúa <span className="carbon">células</span>. El cargo no es de
              vaguedad —la autopoiesis es objetiva y, fijada una granularidad, decidible—: es de{" "}
              <strong>extensión</strong>. En un cuerpo hay del orden de 10¹³ unidades autopoiéticas y
              ninguna es el sujeto; el cerebro no es una unidad autopoiética, sino un sistema de segundo
              orden; y el hígado es tan autopoiético como él. Para seleccionar al sujeto entre escalas
              anidadas hay que añadir integración causal, que es sustrato-neutral. La clínica ya separó
              esas variables: en el estado vegetativo (Laureys, 2007) la auto-producción está completa y
              el sujeto no está. La propia tradición lo supo: Varela generalizó de la autopoiesis a la
              autonomía y la clausura operacional (1979) precisamente porque la autopoiesis estricta es
              celular. Pero lo organizacional es realizable en más de un medio. De ahí el dilema —o no
              individúa al sujeto, o no excluye sustratos—. No se sigue que el silicio sienta: se sigue que
              la autopoiesis no es el instrumento que puede decidirlo.
            </p>
          </section>

          <ArgMap />

          <p className="lectura__cue">
            Guión de lectura. Cada bloque es una unidad de habla con su tiempo aproximado a ritmo de
            exposición. Las palabras en <span className="si">azul</span> y{" "}
            <span className="carbon">ámbar</span> marcan los dos polos —silicio y carbono— por si querés
            apoyarlas con la voz.
          </p>

          {BEATS.map((b) => (
            <section key={b.n} className="beat">
              <div className="beat__meta">
                <span className="beat__num">{b.n}</span>
                <span className="beat__time">{b.t}</span>
              </div>
              <div className="beat__content">
                <h2 className="beat__title">{b.title}</h2>
                <p className="beat__body">{b.body}</p>
              </div>
            </section>
          ))}

          <blockquote className="lectura__close">
            Antes de preguntar de qué está hecho un sujeto hay que poder decir cuál es. Mientras la
            respuesta la ponga quien pregunta, «¿puede el silicio ser consciente?» no es todavía una
            pregunta: es un recorte a la espera de un argumento.
          </blockquote>

          <ArgFlow />
        </Reveal>
      </div>
    </>
  );
}

/**
 * ArgFlow — diagrama del RECORRIDO narrativo del argumento: pregunta → dos
 * respuestas en disputa → la distinción que ordena todo → desarrollo en cinco
 * eslabones (§2–§6) → conclusión. Es un artefacto distinto de <ArgMap />: ese
 * mapa expone la estructura lógica interna del argumento del sustrato (la
 * tenaza autopoiesis-estricta/autonomía); este traza la trayectoria completa
 * del ensayo, de un vistazo. Se lee de arriba abajo; sólo la cadena de
 * eslabones es ancha y scrollea en horizontal dentro de su propio contenedor.
 * Reutiliza los estilos ya definidos para .argmap / .argmap__cap / .eyebrow
 * (globals.css) y las variables de tema del sitio — sin CSS nuevo.
 */
function ArgFlow() {
  const steps: { n: string; title: string; body: string }[] = [
    {
      n: "§2",
      title: "La unidad equivocada",
      body:
        "La autopoiesis individúa células: ~10¹³ en un cuerpo, ninguna es el sujeto. El cerebro no es autopoiético (sistema de segundo orden); el hígado lo es tanto como él. Elegir la escala exige integración causal — sustrato-neutral.",
    },
    {
      n: "§3",
      title: "La clínica ya separó las variables",
      body:
        "En la categoría clínica del estado vegetativo (Laureys, 2007) la auto-producción está completa y el sujeto no está. Covaría la conectividad frontoparietal y córtico-talámica, no la magnitud material.",
    },
    {
      n: "§4",
      title: "La tradición ya lo sabía",
      body:
        "Varela (1979) generalizó de autopoiesis a autonomía / clausura operacional: organizacional, realizable en más de un medio. La tenaza: autopoiesis estricta (no individúa) o autonomía (individúa, pero no excluye sustratos).",
    },
    {
      n: "§5",
      title: "El laboratorio",
      body:
        "Un experimento por cada lectura del seminario; ninguno encontró la diferencia de sustrato. El benchmark: la brecha se mueve 143× y no monotónicamente — mide la ingeniería. κ pasa de 0,00 a 0,70 moviendo sólo la frontera.",
    },
    {
      n: "§6",
      title: "La objeción más fuerte",
      body:
        "«Pero sigue siendo necesaria» — ¿necesaria de qué? Del sujeto: ninguno es autopoiético. De los componentes: es una tesis sobre el material que la autopoiesis no funda.",
    },
  ];

  const connectorLabel: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--muted)",
    textAlign: "center",
  };

  return (
    <section
      aria-label="Diagrama: el recorrido del argumento, de la pregunta a la conclusión"
      style={{ marginTop: "3.2em" }}
    >
      <div className="eyebrow" style={{ marginBottom: 6 }}>
        Para verlo de un vistazo
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(1.25rem, 3.4vw, 1.6rem)",
          margin: "0 0 1em",
          color: "var(--text)",
        }}
      >
        El recorrido del argumento
      </h2>

      <figure className="argmap" style={{ margin: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FlowBox kicker="La pregunta" accent="neutral" center>
            <strong>¿Puede la autopoiesis decidir qué sistemas pueden ser conscientes?</strong>
            <br />
            <span style={{ color: "var(--muted)", fontSize: "0.9em" }}>
              (¿puede una máquina de silicio ser consciente?)
            </span>
          </FlowBox>

          <FlowDown />
          <div style={connectorLabel}>dos respuestas en disputa</div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <FlowBox kicker="Funcionalismo (Putnam, Fodor)" accent="si" grow>
              Sí, en principio: los estados mentales se definen por rol causal, no por composición.
            </FlowBox>
            <FlowBox kicker="El argumento del sustrato (Searle; enactivismo; Seth)" accent="carbon" grow>
              No: la conciencia pertenece a lo vivo; lo vivo se autoproduce; el silicio no.
            </FlowBox>
          </div>

          <FlowDown />

          <FlowBox kicker="La distinción que ordena todo" accent="key" center>
            Una <strong>condición necesaria</strong> no es un <strong>criterio de individuación</strong>. El
            ensayo no niega que la vida sea condición necesaria de la conciencia; niega que la
            auto-producción sea el criterio que individúa al sujeto.
          </FlowBox>

          <FlowDown />
          <div style={connectorLabel}>el desarrollo, en cinco eslabones</div>

          <div style={{ overflowX: "auto", padding: "2px 2px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: "max-content" }}>
              {steps.flatMap((s, i) => [
                <div key={`box-${s.n}`} style={{ width: 232 }}>
                  <FlowBox kicker={s.n} accent="neutral">
                    <strong style={{ color: "var(--text)" }}>{s.title}.</strong> {s.body}
                  </FlowBox>
                </div>,
                i < steps.length - 1 ? (
                  <ArrowRight
                    key={`arrow-${s.n}`}
                    size={16}
                    aria-hidden="true"
                    style={{ color: "var(--muted)", flexShrink: 0 }}
                  />
                ) : null,
              ])}
            </div>
          </div>

          <FlowDown />

          <FlowBox kicker="La conclusión" accent="key" center>
            El argumento del sustrato discute <em>de qué está hecho</em> el sujeto antes de poder decir{" "}
            <em>cuál</em> es. Lo que queda: automantenimiento <strong>delegado</strong> frente a{" "}
            <strong>constitutivo</strong> —«ahí sí importa la energía: no por cuánta se gasta, sino por
            quién responde de ella»—. Y esa diferencia es relativa al corte: mientras la respuesta la
            ponga quien pregunta, «¿puede el silicio ser consciente?» no es todavía una pregunta: es un
            recorte a la espera de un argumento.
          </FlowBox>
        </div>

        <figcaption className="argmap__cap">
          Lo que <strong>no</strong> se sigue: que el silicio sienta. Lo que se sigue: que la autopoiesis
          no es el instrumento que puede decidirlo.
        </figcaption>
      </figure>
    </section>
  );
}

function FlowDown() {
  return (
    <div aria-hidden="true" style={{ display: "flex", justifyContent: "center" }}>
      <ArrowDown size={18} style={{ color: "var(--border-strong)" }} />
    </div>
  );
}

function FlowBox({
  kicker,
  children,
  accent = "neutral",
  center = false,
  grow = false,
}: {
  kicker: string;
  children: React.ReactNode;
  accent?: "neutral" | "si" | "carbon" | "key";
  center?: boolean;
  grow?: boolean;
}) {
  const borderColor =
    accent === "si"
      ? "var(--si)"
      : accent === "carbon" || accent === "key"
        ? "var(--carbon)"
        : "var(--border)";
  const kickerColor =
    accent === "si" ? "var(--si)" : accent === "carbon" || accent === "key" ? "var(--carbon)" : "var(--muted)";
  return (
    <div
      style={{
        border: `${accent === "key" ? 2 : 1}px solid ${borderColor}`,
        borderRadius: 12,
        background: "var(--surface)",
        padding: "12px 16px",
        textAlign: center ? "center" : "left",
        flex: grow ? "1 1 260px" : undefined,
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontWeight: 700,
          color: kickerColor,
          marginBottom: 5,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.96rem",
          lineHeight: 1.5,
          color: "var(--text-soft)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
