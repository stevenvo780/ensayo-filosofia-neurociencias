import Hero from "@/components/Hero";
import TOC from "@/components/TOC";
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

const TOC_ITEMS = [
  { id: "intro", label: "Introducción" },
  { id: "s1", label: "1 · Von Neumann" },
  { id: "s2", label: "2 · Esparcida" },
  { id: "s3", label: "3 · Termodinámica" },
  { id: "s4", label: "4 · Autopoiesis" },
  { id: "s5", label: "5 · Morfología" },
  { id: "s6", label: "6 · Variabilidad" },
  { id: "conclusion", label: "Conclusión" },
  { id: "biblio", label: "Bibliografía" },
];

const H2 = ({ num, children, id }: { num: string; children: React.ReactNode; id: string }) => (
  <h2 id={id}>
    <span className="sec-num">§{num}</span>
    {children}
  </h2>
);

export default function Home() {
  return (
    <>
      <Hero />

      <div className="essay-grid">
        <aside className="essay-aside hidden-md">
          <TOC items={TOC_ITEMS} />
        </aside>

        <article className="prose">
          {/* Introducción */}
          <Reveal enrich>
            <h2 id="intro" style={{ marginTop: "0.4em" }}>
              <span className="sec-num">Introducción</span>
              El sustrato importa
            </h2>
            <p className="dropcap">
              El problema de la relación mente–sustrato es uno de los más densos de la filosofía de la
              ciencia contemporánea. A mediados del siglo XX, el funcionalismo formuló la{" "}
              <em>tesis de la realizabilidad múltiple</em> (Putnam, 1967; Fodor, 1974): los estados
              mentales son esencialmente estados funcionales y, por tanto, realizables en cualquier
              medio capaz de sostener las transiciones adecuadas. De ahí nació la{" "}
              <em>metáfora del cerebro como computadora</em> (Daugman, 2001) y la convicción de que los
              modelos conexionistas (Hinton, 1992) producirían, con suficiente escala, procesos
              cognitivos.
            </p>
            <p>
              Este ensayo defiende una tesis con dos niveles que conviene no confundir. En el nivel{" "}
              <strong>práctico</strong>, emular la física continua del <span className="carbon">carbono</span>{" "}
              vivo sobre <span className="si">silicio</span> digital impone costos que no son un detalle de
              ingeniería, sino el síntoma de una profunda incompatibilidad material. En el nivel{" "}
              <strong>ontológico</strong> —más especulativo— exploro si el sustrato vivo es constitutivo
              de la conciencia; <em>esta segunda afirmación no se sigue de la primera</em>: no la fundo en
              el costo energético, sino en la autopoiesis.
            </p>
            <p>
              Distingo desde el inicio el silicio digital clásico de Von Neumann —lo que el laboratorio
              simula— de los paradigmas neuromórficos analógicos (<em>Loihi</em>, memristores): el debate
              no es “silicio vs. carbono”, sino cómputo lógico discretizado frente a dinámica física
              continua. Cada afirmación se apoya en un laboratorio computacional cuyos experimentos
              puedes manipular a lo largo del texto.
            </p>
          </Reveal>

          {/* 1 */}
          <Reveal enrich>
            <H2 num="1" id="s1">
              Plasticidad local y el cuello de botella de Von Neumann
            </H2>
            <p>
              La independencia del “software mental” respecto de su sustrato se apoya en la equivalencia
              de Turing (1936). Pero en el mundo material el procesamiento cuesta energía, espacio y
              tiempo. La arquitectura de Von Neumann (1945) separa físicamente el procesador de la
              memoria y fuerza un tráfico constante por un bus limitado; el cerebro, en cambio, es una
              estructura donde procesamiento y almacenamiento coinciden en la sinapsis (Bechtel, 2008).
            </p>
            <p>
              El <strong>Experimento 5</strong> contrasta una regla local (STDP) con la retropropagación
              global: <span className="si">20.000 KB</span> de estado frente a{" "}
              <span className="carbon">39 KB</span>, una reducción de <strong>512×</strong>. La
              plasticidad en silicio es una costosa simulación de representaciones globales; en el
              carbono, una reconfiguración física local y pasiva.
            </p>
            <VonNeumannBus />
          </Reveal>

          {/* 2 */}
          <Reveal enrich>
            <H2 num="2" id="s2">
              Percepción: codificación esparcida frente a densidad de silicio
            </H2>
            <p>
              En las redes profundas de silicio la representación es densa. La neurobiología muestra otra
              estrategia: Quian Quiroga, Fried y Koch (2013) hallaron “células de concepto” de
              selectividad extrema —una fracción minúscula de neuronas dispara, rodeada de silencio
              eléctrico—. Esa codificación esparcida (~1 %) evita la interferencia de memoria
              (<em>crosstalk</em>) y minimiza el gasto termodinámico.
            </p>
            <p>
              El laboratorio lo cuantifica: al almacenar 200 conceptos, el solapamiento medio en la red
              densa fue del <span className="si">80,0 %</span>; en la red esparcida al 1 % cayó al{" "}
              <span className="carbon">1,03 %</span>. Y el <strong>Experimento 1</strong> muestra que los
              campos receptivos locales retinotópicos (Zeki, 1992) recortan un <strong>90 %</strong> de
              los FLOPs.
            </p>
            <SparseCoding />
          </Reveal>

          {/* 3 */}
          <Reveal enrich>
            <H2 num="3" id="s3">
              Diversidad de señales, termodinámica y la paradoja energética
            </H2>
            <p>
              El límite más profundo del silicio es la pobreza de su medio físico. El cerebro usa un
              alfabeto neuroquímico multicanal (LeDoux, 1994; Marder, 2012). Para medir el costo de
              escalar, el benchmark se ejecuta <em>sin optimizar</em>, como correría una red de silicio
              típica, en cuatro tiers de hardware:
            </p>
            <EfficiencyStaircase />
            <p className="explainer-cap" style={{ marginTop: "-1.2em", marginBottom: "1.8em" }}>
              Cautela: la columna del silicio mide la potencia total de un hardware genérico no
              optimizado; la del carbono, la señalización idealizada por spike. La “brecha” es una cota
              superior de una comparación deliberadamente desfavorable al silicio clásico, no una
              constante de sustrato.
            </p>
            <p>
              Esa brecha es <strong>arquitectónica</strong>, no fundamental. El límite verdaderamente
              fundamental es común a ambos sustratos: el <strong>principio de Landauer (1961)</strong>.
              Ni el silicio ni el carbono se acercan a ese piso; lo que distingue al carbono no es
              acercarse a él, sino <em>cómo</em> computa: de forma pasiva, guiada por gradientes
              espontáneos.
            </p>
            <LandauerFloor />
            <blockquote className="pullquote">
              Añadir más silicio no resuelve el problema de fondo: lo desplaza a otro cuello de botella.
            </blockquote>
          </Reveal>

          {/* 4 */}
          <Reveal enrich>
            <H2 num="4" id="s4">
              Dinámica temporal, autopoiesis y la objeción funcionalista
            </H2>
            <p>
              Aquí debo evitar un salto ilícito: <strong>una brecha de eficiencia, por enorme que sea, no
              implica por sí sola ausencia de conciencia</strong>. Eficiencia y fenomenología son
              ortogonales. La objeción más aguda es la de Chalmers (1995): si sustituyéramos las neuronas
              por chips funcionalmente idénticos, los qualia no deberían “danzar” sin que el sujeto lo
              notara.
            </p>
            <p>
              Mi respuesta distingue dos cosas que el funcionalista suele fundir: ser <em>discreto</em> y
              estar <em>desacoplado de la vida</em>. Maturana y Varela (1974) definen lo vivo por la{" "}
              <strong>autopoiesis</strong>: la neurona no computa para resolver un problema lógico, sino
              para regular su homeostasis. Del <strong>Experimento 4</strong>, de la física pasiva de una
              red excitatoria-inhibitoria con retardos, emerge actividad oscilatoria beta–gamma sin reloj
              externo.
            </p>
            <GammaOscillation />
            <blockquote className="pullquote">
              El silicio digital puede replicar la organización funcional de la cognición, pero es dudoso
              que con ello origine su carácter fenoménico —los qualia—.
            </blockquote>
            <p>
              No por falta de transistores, sino porque carece de la vulnerabilidad homeostática que,
              según la tradición enactivista (Varela; Thompson, 2007), empuja a un organismo vivo a{" "}
              <em>sentir</em> el mundo para preservarse. Es una conjetura señalada, no un teorema.
            </p>
          </Reveal>

          {/* 5 */}
          <Reveal enrich>
            <H2 num="5" id="s5">
              Cómputo morfológico y acoplamiento activo: Webb y Clark
            </H2>
            <p>
              La cognición es corporizada. El grillo robot de Webb (1996) resuelve la fonotaxis con{" "}
              <strong>cómputo morfológico</strong>: la física del cuerpo hace el cálculo. El modelo
              desencarnado gasta <span className="si">757.760 FLOPs</span>; el corporizado, solo{" "}
              <span className="carbon">2 FLOPs</span>.
            </p>
            <MorphologyFlops />
            <p>
              El cómputo no desaparece: se <strong>reubica</strong> en la física del cuerpo. Y el ejemplo
              tiene un filo incómodo: el tubo del grillo robot es materia <em>no viva</em> y, sin embargo,
              cognitivamente constitutiva. Lo decisivo no es el <span className="carbon">carbono</span>,
              sino la <strong>autopoiesis</strong>. Por eso tomo la fenomenología de la mente extendida
              de Clark (2015, 2023) sin su funcionalismo: el silicio andamia la mente; no la origina en
              aislamiento.
            </p>
          </Reveal>

          {/* 6 — hilos nuevos */}
          <Reveal enrich>
            <H2 num="6" id="s6">
              Variabilidad, intercambio y ancho de banda
            </H2>
            <p>
              La brecha de eficiencia mide un <em>síntoma</em>; su causa se ramifica en tres ejes donde
              la física del realizador —no solo su función— diverge. Estos tres experimentos convierten
              esa divergencia en argumento: no es que el silicio «no pueda computar la función», sino que
              su <strong>variabilidad</strong>, su <strong>modo de intercambio</strong> y su{" "}
              <strong>ancho de banda de I/O</strong> son de otra clase.
            </p>
            <p>
              <strong>Variabilidad.</strong> El silicio conmuta <span className="si">1 bit</span> por
              señal; una sinapsis de carbono porta <span className="carbon">4,7 bits</span> (26 estados
              graduados; Bartol et al., 2015), y la modulación química añade una dimensión combinatoria.
              El espacio de estados del carbono no es más grande: es de otro tipo.
            </p>
            <StateSpaceVariability />
            <p>
              <strong>Modo de intercambio.</strong> Lo que fija el piso energético no es cuánto se
              computa, sino <em>cómo se intercambia</em> la señal. En silicio, mover un dato cuesta{" "}
              <span className="si">~650×</span> computarlo —el 99,8 % de la energía es tráfico, no
              cómputo (Horowitz, 2014)—; el carbono difunde química de forma <span className="carbon">pasiva</span>,
              a favor del gradiente, y solo restaura el gradiente de forma amortizada (Attwell y Laughlin, 2001).
            </p>
            <ExchangeMode />
            <p>
              <strong>Ancho de banda de I/O.</strong> Una neurona irradia <span className="carbon">~7.000</span>{" "}
              sinapsis en 3D; una compuerta CMOS, ~6. Y el cerebro entrega energía y química
              volumétricamente por ~600 km de capilares —cada neurona a ~20 µm de uno—: los cables
              difícilmente superarán a los sistemas circulatorios.
            </p>
            <IOBandwidth />
            <p style={{ fontSize: "0.98rem", color: "var(--muted)", fontStyle: "italic" }}>
              El desarrollo completo de estos tres ejes —y de por qué presionan la realizabilidad
              múltiple sin refutarla— está en la{" "}
              <a href="https://github.com/stevenvo780/ensayo-filosofia-neurociencias/blob/main/ensayo/tesis.md">
                versión extendida (tesis)
              </a>
              .
            </p>
          </Reveal>

          {/* Conclusión */}
          <Reveal enrich>
            <h2 id="conclusion">
              <span className="sec-num">Conclusión</span>
              Del costo material a la conjetura ontológica
            </h2>
            <p>
              La ineficiencia termodinámica del silicio clásico prueba una incompatibilidad{" "}
              <em>material</em> concreta. De ahí <em>no</em> se sigue la tesis ontológica; esta descansa
              en un argumento independiente —la autopoiesis—, que vuelve <em>plausible</em>, sin
              demostrarlo, que aquello que convierte un proceso físico en experiencia sea la
              vulnerabilidad de un sistema que se auto-produce. Como advierte la falacia mereológica
              (Bennett y Hacker, 2022), no debemos atribuir a una parte —un chip, o un cerebro aislado—
              facultades del organismo corporizado entero. Habrá que transitar del paradigma digital de
              Turing hacia una tecnología neuromórfica analógica corporizada, aceptando que el pensamiento
              acaso no sea el cálculo frío de un software, sino una propiedad de la dinámica material de
              la vida.
            </p>
          </Reveal>

          {/* Bibliografía */}
          <Reveal enrich>
            <h2 id="biblio">
              <span className="sec-num">Referencias</span>
              Bibliografía
            </h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                fontSize: "0.92rem",
                color: "var(--muted)",
                lineHeight: 1.5,
              }}
            >
              {[
                "Bechtel, W. (2008). Mental Mechanisms. Routledge.",
                "Bennett, M. R., y Hacker, P. M. S. (2022). Philosophical Foundations of Neuroscience (2ª ed.). Wiley-Blackwell.",
                "Chalmers, D. J. (1995). Absent Qualia, Fading Qualia, Dancing Qualia. En T. Metzinger (Ed.), Conscious Experience. Schöningh.",
                "Clark, A. (2015). Radical Predictive Processing. Southern Journal of Philosophy, 53, 3-27.",
                "Clark, A. (2023). The Experience Machine. Pantheon Books.",
                "Daugman, J. (2001). Brain Metaphor and Brain Theory. En Philosophy and the Neurosciences. Blackwell.",
                "Fodor, J. A. (1974). Special Sciences. Synthese, 28(2), 97-115.",
                "Hinton, G. E. (1992). How Neural Networks Learn from Experience. Scientific American, 267(3).",
                "Landauer, R. (1961). Irreversibility and Heat Generation in the Computing Process. IBM J. Res. Dev., 5(3).",
                "LeDoux, J. E. (1994). Emotion, Memory and the Brain. Scientific American, 270(6).",
                "Marder, E. (2012). Neuromodulation of Neuronal Circuits. Neuron, 76(1), 1-11.",
                "Putnam, H. (1967). Psychological Predicates. En Art, Mind, and Religion. Univ. of Pittsburgh Press.",
                "Quian Quiroga, R., Fried, I., y Koch, C. (2013). Brain Cells for Grandmother. Scientific American, 308(2).",
                "Thompson, E. (2007). Mind in Life. Harvard University Press.",
                "Turing, A. M. (1936). On Computable Numbers. Proc. London Math. Soc., s2-42.",
                "Varela, F. J., Maturana, H. R., y Uribe, R. (1974). Autopoiesis. BioSystems, 5(4), 187-196.",
                "von Neumann, J. (1945). First Draft of a Report on the EDVAC. Univ. of Pennsylvania.",
                "Webb, B. (1996). A Cricket Robot. Scientific American, 275(6), 94-99.",
                "Zeki, S. (1992). The Visual Image in Mind and Brain. Scientific American, 267(3).",
              ].map((r, i) => (
                <li key={i} style={{ marginBottom: 8, paddingLeft: 14, borderLeft: "2px solid var(--border)" }}>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </article>
      </div>
    </>
  );
}
