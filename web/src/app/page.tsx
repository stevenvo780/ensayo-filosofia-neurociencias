import Image from "next/image";
import Hero from "@/components/Hero";
import TOC from "@/components/TOC";
import Reveal from "@/components/Reveal";
import ArgMap from "@/components/ArgMap";

const TOC_ITEMS = [
  { id: "intro", label: "Introducción" },
  { id: "s1", label: "1 · El problema" },
  { id: "s2", label: "2 · La unidad" },
  { id: "s3", label: "3 · La clínica" },
  { id: "s4", label: "4 · La tradición" },
  { id: "s5", label: "5 · κ y el corte" },
  { id: "s6", label: "6 · Objeción" },
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
              La unidad que falta
            </h2>
            <p className="dropcap">
              Bennett y Hacker (2022) le enseñaron a la filosofía de las neurociencias a desconfiar de un
              error preciso: atribuir a una parte lo que sólo se predica del todo. El cerebro no ve, no
              decide ni cree; ve, decide y cree la persona. Llaman a esto la <em>falacia mereológica</em>, y
              su lección es que ciertas disputas no se resuelven con más datos, porque el problema está en
              el sujeto de la oración.
            </p>
            <p>
              Este ensayo aplica esa lección a un solo problema: si una máquina de{" "}
              <span className="si">silicio</span> podría ser consciente. Frente al funcionalismo, que
              responde que sí en principio, se ha consolidado una réplica atractiva —la conciencia pertenece
              a los seres vivos, y lo que hace vivo a un ser es que se produce a sí mismo; el silicio no se
              autoproduce, luego no siente—. La llamaré <strong>el argumento del sustrato</strong>.
            </p>
            <p>
              Sostendré que comete un primo de esa falacia: discute <strong>de qué está hecho</strong> el
              sujeto sin haber fijado <strong>cuál</strong> es. Su criterio —la autopoiesis— no puede
              fijarlo, y no por vago, sino porque es nítido y señala la unidad equivocada: individúa{" "}
              <span className="carbon">células</span>, no personas. La clínica ya separó esas dos
              variables: en el estado vegetativo la auto-producción está completa y el sujeto no está. La
              propia tradición lo advirtió y se movió de la autopoiesis a la autonomía, sin notar que ese
              movimiento le retira el argumento que quería fundar. Cierro con un laboratorio: un
              experimento por cada lectura del seminario, y ninguno encontró diferencia de sustrato. De
              nada de esto se sigue que el silicio sienta; se sigue que la autopoiesis no es el instrumento
              que puede decidirlo.
            </p>
          </Reveal>

          <ArgMap />

          {/* 1 */}
          <Reveal enrich>
            <H2 num="1" id="s1">
              El problema y su reconstrucción
            </H2>
            <p>
              La metáfora del cerebro como computadora tiene una historia y un precio que Daugman (2001)
              documentó: cada época piensa el cerebro con su tecnología dominante, y la metáfora acaba
              dictando la teoría. Su versión filosófica es la realizabilidad múltiple (Putnam, 1967; Fodor,
              1974): los estados mentales son estados funcionales, definidos por su rol causal y no por su
              composición, y por tanto realizables en cualquier medio que sostenga las transiciones
              adecuadas. Su corolario polémico: el sustrato sería ontológicamente irrelevante.
            </p>
            <p>
              Contra ese corolario convergen dos tradiciones. Searle (1980) sostiene, con la habitación
              china, que la sintaxis no basta para la semántica, y su naturalismo biológico (1992) afirma
              que la conciencia es un fenómeno biológico causado por procesos neurofisiológicos. La segunda
              viene de la biología teórica: Maturana y Varela definen lo vivo por la <strong>autopoiesis</strong>,
              un sistema que produce y regenera continuamente los componentes y la frontera que lo
              constituyen como unidad (Varela, Maturana y Uribe, 1974). Thompson (2007) extrae de ahí la
              continuidad vida-mente; Di Paolo (2005) la corrige desde dentro: la autopoiesis{" "}
              <em>desnuda</em> no basta para que algo le <em>importe</em> a un sistema —hace falta{" "}
              <strong>adaptividad</strong>, la regulación activa de la propia precariedad—.
            </p>
            <p>
              Del lado neurocientífico la convergencia es real: la interocepción muestra hasta qué punto la
              experiencia se organiza alrededor de la regulación del estado corporal (Chen et al., 2021;
              Greenwood y Garfinkel, 2025). Seth (2025) la lleva a su conclusión filosófica: la conciencia
              sería «una propiedad únicamente de los sistemas vivos (aunque no necesariamente de todos)», y
              simular algo no es realizarlo —«nada se moja dentro de una computadora que predice el clima»—.
              Conviene ser exacto con el defensor más cuidadoso de esta posición: sus argumentos, dice, «no
              refutan» el funcionalismo computacional, «pero lo vuelven menos plausible y menos atractivo»;
              y rechaza «la afirmación de que sólo la vida basada en carbono puede ser consciente». Su eje es
              vivo/no-vivo, no carbono/silicio.
            </p>
            <blockquote>
              <p>
                <strong>El argumento del sustrato, en forma canónica.</strong> La conciencia requiere un
                sujeto, un sistema que sea <em>uno</em> y para el cual sus estados tengan valencia; un
                sistema tiene valencia propia sólo si se produce a sí mismo y puede dejar de existir; ningún
                sistema de silicio digital se produce a sí mismo; luego ninguno es sujeto de conciencia.
              </p>
            </blockquote>
            <p>
              Nótese lo que las dos primeras premisas le exigen a la autopoiesis: no sólo distinguir lo vivo
              de lo no vivo, sino <strong>individuar al portador de la experiencia</strong>. No dicen que los
              seres vivos tengan una propiedad interesante; dicen que <em>el sujeto está donde está la
              auto-producción</em>. Ahí, y no en la premisa sobre el silicio, se rompe.
            </p>
          </Reveal>

          {/* 2 */}
          <Reveal enrich>
            <H2 num="2" id="s2">
              La unidad equivocada
            </H2>
            <p>
              Preguntemos por la extensión de «sistema autopoiético». La unidad canónica es{" "}
              <strong>la célula</strong>: el caso que Varela, Maturana y Uribe (1974) modelan y el paradigma
              de la tradición entera. Y es objetiva: hay un hecho, independiente de nosotros, sobre si una
              red metabólica produce la membrana que la encierra. No acuso a la autopoiesis de vaguedad;
              fijada una granularidad, es decidible.
            </p>
            <p>
              El problema es de aritmética. En mi cuerpo hay del orden de 10<sup>13</sup> unidades
              autopoiéticas, y <strong>ninguna soy yo</strong>. Si el sujeto está donde está la
              auto-producción, hay diez billones de sujetos aquí y ninguno escribe este ensayo. El argumento
              que debía excluir al silicio termina multiplicando sujetos dentro del carbono.
            </p>
            <p>
              De ahí tres consecuencias, cada una peor. Primera: <strong>el cerebro no es una unidad
              autopoiética</strong>. No produce sus componentes; los producen sus células, cada una por su
              cuenta. Es un sistema de <em>segundo orden</em>: una unidad compuesta de unidades
              autopoiéticas que no es ella misma autopoiética en sentido estricto. La teoría localiza al
              sujeto, entonces, donde la neurociencia que estos autores invocan no localiza los correlatos.
            </p>
            <p>
              Segunda: <strong>el hígado es tan autopoiético como el cerebro</strong>. Ambos son agregados de
              células que se autoproducen. Si la auto-producción individuara al sujeto, nada diría por qué
              éste es el cerebro y no el hígado. Un criterio del sujeto que no distingue entre órganos no es
              todavía un criterio.
            </p>
            <p>
              Tercera, y decisiva: para escapar hay que añadir algo —integración causal, clausura
              operacional— que seleccione una escala entre las anidadas. Pero <strong>eso añadido hace todo
              el trabajo</strong>, y es lo que el funcionalista concede sin pestañear: la integración causal
              es una propiedad de la organización, no del material, y es la que ofrecen las teorías
              neurobiológicas de la conciencia (Mylopoulos, 2022). La auto-producción queda como un epiciclo:
              no explica ningún caso que la integración causal no explique ya, y sola no explica ninguno.
            </p>
            <p>
              La neurociencia del curso enseña, además, dónde sí está el correlato, y no es donde está la
              auto-producción. Quian Quiroga, Fried y Koch (2013) hallaron neuronas que responden
              selectivamente a una persona, pero su lectura es esparcida y distribuida: cada concepto
              tendría «un conjunto de neuronas correspondientes asignadas a él», y asociar dos conceptos
              exige «crear unos pocos enlaces entre los grupos de células» que representan cada uno. Cada
              una de esas células se autoproduce igual que las demás; lo que varía —y lo que explica— es
              con quién está conectada. La auto-producción es constante en todo el cuerpo; el correlato no.
            </p>
            <p>
              La falacia mereológica reaparece invertida: el argumento del sustrato elige un criterio que
              sólo se satisface en las partes —las células— y pretende que decida sobre el todo. Y que la
              frontera del sujeto no sea un dato lo enseña el propio seminario: el grillo robot de Webb
              (1996) delega el cómputo de la fonotaxis a un tubo de desfase, materia no viva y sin embargo
              cognitivamente constitutiva.
            </p>
          </Reveal>

          {/* 3 */}
          <Reveal enrich>
            <H2 num="3" id="s3">
              La clínica ya separó las variables
            </H2>
            <p>
              El argumento no necesita esperar una máquina consciente para ponerse a prueba: la
              neurología ya disoció en pacientes las dos variables que importan. Laureys (2007) describe
              el estado vegetativo como la disociación de los dos componentes de la conciencia: «la
              vigilia permanece intacta, pero la consciencia —que abarca todos los pensamientos y
              sentimientos— queda abolida». Estos pacientes conservan ciclos de sueño-vigilia, respiran sin
              asistencia y hacen movimientos espontáneos. La auto-producción está <strong>completa</strong>:
              el organismo se automantiene, está vivo. Y el sujeto no está.
            </p>
            <p>
              Laureys añade algo más incómodo: algunos «voluntarios sanos y plenamente conscientes tienen
              valores de metabolismo cerebral global comparables a los de algunos pacientes en estado
              vegetativo». Concluye: «medir los niveles globales de consumo de energía en el cerebro no
              puede indicar la presencia de consciencia». Lo que sí covaría con el sujeto es la
              «conectividad funcional dentro de esta red frontoparietal y con centros más profundos del
              cerebro, en particular el tálamo». En sus pacientes el estímulo llegaba a la corteza
              somatosensorial primaria y allí moría: la región activa «estaba aislada y desconectada del
              resto del cerebro».
            </p>
            <p>
              El tejido está vivo, se autoproduce y responde. Lo que falta es <strong>integración</strong>.
              Laureys documenta conciencia encubierta detectada por neuroimagen y diagnóstico errado en más
              de un tercio de los casos; la cautela obliga a hablar de la categoría clínica, y la
              inferencia es mía —Laureys no discute autopoiesis ni silicio—. Pero basta: la clínica
              mantiene constante la auto-producción y mueve al sujeto. El factor diferencial{" "}
              <strong>no es la auto-producción</strong> —es organizacional—.
            </p>
          </Reveal>

          {/* 4 */}
          <Reveal enrich>
            <H2 num="4" id="s4">
              La tradición ya lo sabía
            </H2>
            <p>
              Esto no es un descubrimiento mío: es la razón por la que Varela abandonó el marco estrecho. En{" "}
              <em>Principles of Biological Autonomy</em> (1979) generaliza la autopoiesis hasta la noción más
              amplia de <strong>autonomía</strong>, articulada por la <strong>clausura operacional</strong>,
              porque la autopoiesis en sentido estricto es celular y no llega ni al organismo ni al sistema
              nervioso; la autonomía sí, pues ya no exige producción material de componentes, sino que los
              procesos formen una red que se sostiene recíprocamente.
            </p>
            <p>
              Y ahí está el filo. La clausura operacional es una propiedad <strong>organizacional</strong>:
              se define por cómo se encadenan los procesos, no por de qué están hechos. Pero una propiedad
              definida por la forma de la red es, por definición, el tipo de cosa realizable en más de un
              medio. <strong>El camino que el enactivismo recorrió para poder individuar al sujeto es el
              mismo que le quita el argumento contra el silicio.</strong> O se queda en la autopoiesis
              estricta —objetiva, material, de extensión celular, que no individúa al sujeto—, o asciende a
              la autonomía —que lo individúa, y es organizacional, y no excluye en principio ningún
              sustrato—. No hay tercera posición donde tenga a la vez las dos cosas que necesita.
            </p>
            <p>
              Añádase la advertencia que la teoría se hace a sí misma. Beer (2004), analizando un{" "}
              <em>glider</em> del juego de la vida como sistema autopoiético —homenaje explícito a Varela, no
              refutación—, se detiene en las preguntas previas: si los estados de las celdas «merecen
              realmente llamarse componentes», si el <em>glider</em> «posee realmente una frontera que lo
              genera y lo constriñe». Observa que la continuidad de su identidad «depende crucialmente de
              cómo elegimos definir» su organización, y que «estrictamente hablando, ningún sistema es
              autopoiético si se lo observa durante un intervalo suficientemente largo». Su conclusión —que
              la caracterización formal de la organización sigue abierta— es la mía: el criterio es nítido en
              el caso paradigmático y se vuelve indeterminado justo en los disputados, los únicos donde el
              argumento lo necesita.
            </p>
          </Reveal>

          {/* 5 */}
          <Reveal enrich>
            <H2 num="5" id="s5">
              Lo que construí, y lo que obtuve en su lugar
            </H2>
            <p>
              Construí un experimento por cada lectura del seminario: la jerarquía visual de Zeki (1992),
              las células de concepto de Quian Quiroga, la neuroquímica de LeDoux (1994), la plasticidad de
              Hinton (1992), el grillo de Webb. Ninguno encontró diferencia de sustrato. El que más rindió
              fue un modelo de dos sistemas que computan bajo una «lesión metabólica» para medir un
              coeficiente κ de acoplamiento entre cómputo y auto-mantenimiento, presentado en su momento
              como la <em>firma operacional</em> de la autopoiesis: κ≈0,88 para el acoplado, κ=0,00 para el
              desacoplado.
            </p>
            <p>
              La auditoría del código muestra tres cosas. κ=0 no es un resultado: en esa rama el recurso se
              repone por estipulación en cada paso y el parámetro lesionado no aparece en la ecuación
              —envenenarlo con valores absurdos sigue devolviendo cero—; es una identidad aritmética. κ≈0,88
              tampoco es un descubrimiento: tiene forma cerrada y recorre todo el rango [0,1] al mover un
              solo parámetro. Y lo que κ mide, cuando mide algo, es{" "}
              <strong>compartición de un presupuesto de recursos</strong> —eso lo tiene un portátil cuyo
              cómputo compite con su refrigeración por el mismo presupuesto eléctrico—. Si κ fuera la firma
              de la autopoiesis, mi computador estaría vivo. Peor:{" "}
              <strong>ninguna de mis dos ramas es autopoiética</strong>, pues en ambas la bomba homeostática
              es un parámetro exógeno que yo lesiono desde fuera; no hay clausura de producción ni
              adaptividad, que es lo que Di Paolo (2005) exige.
            </p>

            <figure className="tesis-figure">
              <Image
                src="/graficos/exp10_acoplamiento.png"
                alt="Experimento 10: κ pasa de 0,00 a 0,70 en la misma máquina al mover sólo la frontera del sistema."
                width={1704}
                height={663}
                className="tesis-figure__img"
                sizes="(max-width: 820px) 100vw, 760px"
              />
              <figcaption className="tesis-figure__cap">
                <strong>Experimento 10 (reformado).</strong> La misma máquina, bajo la misma perturbación,
                con dos fronteras distintas: contando sólo el chip, κ = 0,00 (inmune); contando también su
                fuente de alimentación, κ = 0,70 (24 semillas). El sustrato no cambió: cambió el corte. κ
                mide compartición de presupuesto de recursos, no autopoiesis.
              </figcaption>
            </figure>

            <p>
              Y hay una comprobación que lo cierra. Si dejo intacta la máquina y muevo sólo la{" "}
              <strong>frontera</strong> —si cuento la fuente de alimentación como parte del sistema en vez de
              como un exterior inagotable—, el mismo <span className="si">silicio</span>, bajo la misma
              perturbación, pasa de κ=0,00 a <strong>κ=0,70</strong>, del orden del 0,88 del{" "}
              <span className="carbon">carbono</span>. No cambió el sustrato; cambió el corte. Construí la
              operacionalización que debía dar al argumento su base objetiva y la vi fallar, y el diagnóstico
              de por qué <em>tenía</em> que fallar es el de las secciones anteriores: κ no mide una propiedad
              del sustrato, mide <strong>dónde tracé la frontera</strong>. La medida no descubre unidades:
              las presupone.
            </p>
          </Reveal>

          {/* 6 */}
          <Reveal enrich>
            <H2 num="6" id="s6">
              La objeción más fuerte, y los límites
            </H2>
            <p>
              La réplica seria es: «de acuerdo, la auto-producción no individúa al sujeto; pero sigue
              siendo <strong>necesaria</strong>. El silicio no se autoproduce, luego le falta una condición
              sin la cual no hay conciencia». Concedo la premisa y niego la inferencia. ¿De qué es necesaria
              la autopoiesis? Si del sujeto, el sujeto tendría que ser una unidad autopoiética, y ninguno lo
              es: somos sistemas de segundo orden. Si de los componentes, es una tesis sobre el material, y
              hace falta un argumento que diga por qué ese material y no otro; argumento que la autopoiesis
              no puede dar: habla de células, no de sujetos. Una condición de fondo no es un criterio de
              exclusión: que todo lo consciente conocido sea vivo no implica que sólo lo vivo pueda serlo.
            </p>
            <p>
              La réplica que sigue es que caricaturizo: Thompson y Di Paolo nunca dijeron que la célula sea
              el sujeto; hablan de autonomía del organismo. Concedo el hecho y niego que me perjudique: es
              mi argumento. En cuanto la tradición pasa a la autonomía para individuar al organismo, deja de
              tener un argumento <em>material</em> contra el silicio y pasa a tener una teoría{" "}
              <em>organizacional</em> de la unidad, compatible con la realizabilidad múltiple. No sostengo
              que se equivoquen sobre la vida; sostengo que su mejor teoría de la individuación no puede
              hacer el trabajo anti-funcionalista que se le encarga.
            </p>
            <p>
              Debo reconocer de quién es lo que sobrevive. La distinción entre identidad <em>propia</em> y{" "}
              <em>prestada</em> —la del artefacto, cuya identidad «le es acordada» por otro— es de Jonas
              (1968); y que el problema de la individualidad sea «el de justificar cuál separación elegimos
              entre el gran conjunto de distinciones posibles y arbitrarias» está dicho, con esas palabras,
              en Barandiaran, Di Paolo y Rohde (2009); y el segundo cuerno de mi dilema lo demostraron antes
              Villalobos y Dewhurst (2018), que muestran que una máquina de Turing físicamente
              implementada satisface la clausura operacional y la determinación estructural del
              enactivismo clásico. No descubro la condición de individualidad, ni ese cuerno: mío es el
              primero —que la autopoiesis estricta individúa células— y la forma de tenaza.
            </p>
            <p>
              No he mostrado que una máquina sienta, ni que la vida sea irrelevante para la mente: el
              argumento de Seth (2025) no depende de la premisa que ataco. Tampoco he explicado los qualia;
              mi argumento es neutral ante el problema difícil, y la neutralidad es deliberada, porque vale
              sea el funcionalismo verdadero o falso. Lo mostrado es más modesto y más firme: una de las dos
              grandes objeciones al funcionalismo se apoya en una unidad que no tiene.
            </p>
          </Reveal>

          {/* Conclusión */}
          <Reveal enrich>
            <h2 id="conclusion">
              <span className="sec-num">Conclusión</span>
              Un recorte a la espera de un argumento
            </h2>
            <p>
              El argumento del sustrato parecía fuerte porque parecía tener dos cosas: un criterio objetivo y
              material —la auto-producción— y un sujeto al cual aplicarlo. Tiene sólo una a la vez. En
              sentido estricto, la autopoiesis es objetiva y señala células: diez billones de unidades en un
              cuerpo, ninguna de ellas yo, y un cerebro que no clasifica. En el sentido amplio al que la
              tradición se vio obligada a migrar —autonomía, clausura operacional—, individúa organismos,
              pero se ha vuelto una propiedad de la organización; y las propiedades de la organización no
              excluyen sustratos: son la tesis del adversario.
            </p>
            <p>
              Bennett y Hacker enseñaron que atribuir a la parte lo que es del todo no es un desliz de
              estilo, sino un error que fabrica pseudoproblemas. El argumento del sustrato es un caso:
              discute de qué está hecho el sujeto antes de poder decir cuál es. Queda algo, y es lo que me
              llevo: la diferencia real no es carbono contra silicio, sino automantenimiento{" "}
              <strong>delegado</strong> contra <strong>constitutivo</strong> —la hay, y es genuina, entre un
              sistema cuyas condiciones de persistencia son internas a la unidad y uno que las tiene fuera,
              en técnicos y redes eléctricas cuya normatividad es previa y ajena—. Pero esa diferencia, como
              enseñó mi propio experimento, es relativa al corte; y decidir el corte es la tarea que el
              debate ha estado saltándose. Mientras la respuesta la ponga quien pregunta, «¿puede el silicio
              ser consciente?» no es todavía una pregunta: es un recorte a la espera de un argumento.
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
                "Barandiaran, X. E., Di Paolo, E., y Rohde, M. (2009). Defining Agency: Individuality, Normativity, Asymmetry, and Spatio-temporality in Action. Adaptive Behavior, 17(5), 367-386.",
                "Beer, R. D. (2004). Autopoiesis and Cognition in the Game of Life. Artificial Life, 10(3), 309-326.",
                "Bennett, M. R., y Hacker, P. M. S. (2022). The Mereological Fallacy in Neuroscience. En Philosophical Foundations of Neuroscience (2ª ed.). Wiley-Blackwell.",
                "Chen, W. G., y cols. (2021). The emerging science of interoception: Sensing, integrating, interpreting, and regulating signals within the self. Trends in Neurosciences, 44(1), 3-16.",
                "Daugman, J. (2001). Brain Metaphor and Brain Theory. En Philosophy and the Neurosciences: A Reader. Blackwell.",
                "Di Paolo, E. A. (2005). Autopoiesis, Adaptivity, Teleology, Agency. Phenomenology and the Cognitive Sciences, 4(4), 429-452.",
                "Fodor, J. A. (1974). Special Sciences. Synthese, 28(2), 97-115.",
                "Greenwood, B. M., y Garfinkel, S. N. (2025). Interoceptive mechanisms and emotional processing. Annual Review of Psychology, 76(1), 59-86.",
                "Hinton, G. E. (1992). How Neural Networks Learn from Experience. Scientific American, 267(3), 144-151.",
                "Jonas, H. (1968). Biological Foundations of Individuality. International Philosophical Quarterly, 8(2), 231-251.",
                "Laureys, S. (2007). Eyes Open, Brain Shut. Scientific American, 296(5), 84-89.",
                "LeDoux, J. E. (1994). Emotion, Memory and the Brain. Scientific American, 270(6), 50-57.",
                "Maturana, H. R., y Varela, F. J. (1980). Autopoiesis and Cognition: The Realization of the Living. D. Reidel.",
                "Mylopoulos, M. (2022). Neurobiological theories of consciousness. En B. D. Young y C. D. Jennings (Eds.), Mind, Cognition, and Neuroscience: A Philosophical Introduction (pp. 280-293). Routledge.",
                "Putnam, H. (1967). Psychological Predicates. En Art, Mind, and Religion. Univ. of Pittsburgh Press.",
                "Quian Quiroga, R., Fried, I., y Koch, C. (2013). Brain Cells for Grandmother. Scientific American, 308(2), 30-35.",
                "Searle, J. R. (1980). Minds, Brains, and Programs. Behavioral and Brain Sciences, 3(3), 417-457.",
                "Searle, J. R. (1992). The Rediscovery of the Mind. MIT Press.",
                "Seth, A. K. (2025). Conscious artificial intelligence and biological naturalism. Behavioral and Brain Sciences, publicación anticipada en línea, 1-42. doi:10.1017/S0140525X25000032",
                "Thompson, E. (2007). Mind in Life. Harvard University Press.",
                "Varela, F. J. (1979). Principles of Biological Autonomy. North-Holland. [Ed. anotada: Di Paolo y Thompson (Eds.), MIT Press, 2024.]",
                "Varela, F. J., Maturana, H. R., y Uribe, R. (1974). Autopoiesis: The Organization of Living Systems. BioSystems, 5(4), 187-196.",
                "Villalobos, M., y Dewhurst, J. (2018). Enactive autonomy in computational systems. Synthese, 195(5), 1891-1908.",
                "Webb, B. (1996). A Cricket Robot. Scientific American, 275(6), 94-99.",
                "Zeki, S. (1992). The Visual Image in Mind and Brain. Scientific American, 267(3), 68-76.",
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
