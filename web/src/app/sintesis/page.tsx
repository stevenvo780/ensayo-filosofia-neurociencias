import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Síntesis — para leer en clase",
  description:
    "El argumento entero en voz alta: la neutralidad de sustrato en duda, cinco ejes medibles y la autopoiesis como puente hacia lo ontológico. Guión de lectura (~5 min).",
};

// Guión de lectura: cada «beat» es una unidad de habla con su tiempo estimado.
// Los tiempos suman ~5 min a ritmo de exposición oral (~150 palabras/min).
const BEATS: { n: string; t: string; title: string; body: React.ReactNode }[] = [
  {
    n: "01",
    t: "~45 s",
    title: "La pregunta",
    body: (
      <>
        Durante casi sesenta años, una idea ha organizado buena parte de la filosofía de la mente: el{" "}
        <strong>funcionalismo</strong>. Sostiene que la mente es <em>sustrato-neutral</em> —que si un
        sistema reproduce la organización funcional correcta, da igual que esté hecho de{" "}
        <span className="carbon">neuronas</span> o de <span className="si">silicio</span>: pensaría, y
        quizá sentiría, lo mismo—. Es la promesa de la mente en una máquina. Mi trabajo la pone en
        duda. Pero con cuidado: hay <strong>dos afirmaciones</strong> aquí, y confundirlas arruina el
        argumento.
      </>
    ),
  },
  {
    n: "02",
    t: "~70 s",
    title: "Las dos tesis que me niego a fundir",
    body: (
      <>
        La primera es <strong>práctica</strong>, y la demuestro: emular la física del{" "}
        <span className="carbon">carbono vivo</span> sobre <span className="si">silicio digital</span>{" "}
        cuesta —energía, tiempo, memoria, cableado— y ese costo no es un detalle que una mejor GPU vaya
        a borrar. Es <strong>estructural</strong>, y crece con la escala.
        <br />
        <br />
        La segunda es <strong>ontológica</strong>, y la ofrezco como conjetura, no como teorema: el
        sustrato vivo sería <em>constitutivo</em> de la conciencia. Y lo digo con todas las letras:{" "}
        <strong>la segunda no se deduce de la primera</strong>. La ineficiencia y la experiencia son
        ortogonales; ningún número de julios por evento prueba, por sí solo, que haya —o no haya—
        alguien ahí dentro.
      </>
    ),
  },
  {
    n: "03",
    t: "~80 s",
    title: "El método: volver contable la diferencia",
    body: (
      <>
        ¿Para qué sirve, entonces, el laboratorio? Construí <strong>diez experimentos reproducibles</strong>{" "}
        que hacen algo que el argumento puramente conceptual no hace igual de bien: vuelven{" "}
        <em>contable</em> la divergencia de sustrato. La miden en cinco ejes —arquitectura, codificación,
        variabilidad, modo de intercambio y ancho de banda—.
        <br />
        <br />
        El más decisivo, para mí, es el <strong>modo de intercambio</strong>. El{" "}
        <span className="carbon">cerebro</span> mueve señales con iones que se difunden solos, a favor
        del gradiente; el <span className="si">silicio</span> mueve cada bit cargando y descargando un
        cable, y ese costo se paga entero, cada vez. Por eso mover un dato cuesta unas{" "}
        <strong>650 veces</strong> más que computarlo. No es una esencia mística del carbono: es haber
        elegido <em>iones que se difunden</em> en lugar de <em>electrones que hay que empujar</em>.
      </>
    ),
  },
  {
    n: "04",
    t: "~80 s",
    title: "El giro: autopoiesis",
    body: (
      <>
        Y aquí está el corazón: el puente hacia lo ontológico <strong>no lo tiende la energía</strong>.
        Lo tiende la <strong>autopoiesis</strong> —la idea de Varela y Maturana de que lo vivo se define
        por producir y regenerar sin cesar los componentes que lo constituyen—. En el cerebro,{" "}
        <em>computar y mantenerse vivo son el mismo proceso</em>.
        <br />
        <br />
        El <strong>Experimento 10</strong> le da a esto una medida. Dos sistemas resuelven la misma
        tarea; les aplico la misma «lesión metabólica». El sistema <span className="carbon">acoplado</span>{" "}
        —donde lo que computa es lo mismo que hay que regenerar— se desploma: coeficiente de acoplamiento{" "}
        <strong>κ ≈ 0,88</strong>. El <span className="si">desacoplado</span> —el silicio, alimentado
        desde afuera— ni se inmuta: <strong>κ = 0,00</strong>. Eso mide la firma operacional de la vida.{" "}
        <strong>No mide la conciencia.</strong> Y esa frontera la respeto.
      </>
    ),
  },
  {
    n: "05",
    t: "~55 s",
    title: "Dónde me detengo",
    body: (
      <>
        Porque lo honesto es decir dónde para el argumento. <strong>No pruebo</strong> que el silicio
        digital no pueda albergar conciencia. Pruebo dos cosas: que la neutralidad <em>ingenua</em> del
        sustrato es falsa —el costo de realizar una mente tiene cinco caras y no se deja borrar—; y que
        existe una hipótesis material y articulada —la autopoiesis— sobre <em>qué</em> del sustrato
        podría ser constitutivo de la experiencia.
        <br />
        <br />
        Entre «el sustrato importa» y «no hay qualia en silicio» queda un abismo. Este trabajo no lo
        cruza: lo señala, para no fingir haberlo cruzado. Y sostengo que decir exactamente hasta dónde
        llega la evidencia es, también, <strong>hacer filosofía</strong>.
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
          Para leer en clase · ~5 min
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
          Síntesis de ¿Silicio o Tejido? — cinco beats para exponer la tesis sin leer las 5.500 palabras
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <ArrowLeft size={15} /> Ensayo
          </Link>
          <Link href="/tesis" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <BookOpen size={15} /> Tesis extendida
          </Link>
          <a
            href="/ensayo-silicio-o-tejido.pdf"
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
            El sustrato no es neutral. Pero <em>por qué</em> importa no lo dice la factura energética: lo
            dice la vida que se juega existir.
          </blockquote>
        </Reveal>
      </div>
    </>
  );
}
