import Image from "next/image";

export default function Home() {
  return (
    <article style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px 0",
      color: "var(--text-color)",
      lineHeight: "1.8",
      fontSize: "1.1rem"
    }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "15px", lineHeight: "1.2" }}>
          ¿Silicio o Tejido?
        </h1>
        <p style={{ fontSize: "1.4rem", color: "var(--primary-light)", fontWeight: 500, marginBottom: "20px" }}>
          Límites del sustrato en la emulación de la mente
        </p>
        <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          <p><strong>Autor:</strong> Steven Vallejo Ortiz</p>
          <p>Curso: Filosofía de las Neurociencias (2026-1)</p>
          <p>Profesor: Santiago Arango-Muñoz</p>
          <p>Instituto de Filosofía, Universidad de Antioquia</p>
        </div>
      </header>

      <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "40px 0" }} />

      <section>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          Introducción
        </h2>
        <p style={{ marginBottom: "20px" }}>
          El problema de la mente y su relación con el sustrato físico es uno de los debates epistemológicos más densos de la ciencia contemporánea. A mediados del siglo XX, el funcionalismo clásico formuló la <em>tesis de la realizabilidad múltiple</em> (Putnam, 1967; Fodor, 1974), sosteniendo que los estados mentales son esencialmente estados funcionales y organizacionales. Según esta postura, la mente es realizable en múltiples soportes físicos (carbono, silicio o cualquier medio capaz de sostener las transiciones de estado adecuadas), lo que impulsó la <em>metáfora del cerebro como computadora</em> (Daugman, 2001) y la convicción de que los modelos conexionistas (Hinton, 1992) implementados en microchips digitales eventualmente producirían procesos cognitivos conscientes.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Sin embargo, este ensayo propone una crítica rigurosa a la neutralidad del sustrato defendida por el funcionalismo computacional, delineando los límites materiales e instrumentales del silicio frente al carbono orgánico. A diferencia de las críticas cognitivas tradicionales, estructuramos este análisis sobre tres dimensiones físico-conceptuales, validadas empíricamente mediante nuestro laboratorio computacional:
        </p>
        <ol style={{ marginLeft: "30px", marginBottom: "25px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <li><strong>La divergencia en la economía de la codificación:</strong> el contraste entre el procesamiento densamente distribuido de los modelos de silicio tradicionales y la codificación esparcida basada en "células de concepto" (Quian Quiroga, Fried y Koch, 2013) y la jerarquía retinotópica (Zeki, 1992).</li>
          <li><strong>El límite termodinámico y de señalización:</strong> la diferencia cualitativa entre la conmutación binaria de canal único en el silicio y la física molecular pasiva de la señalización química húmeda (neurotransmisores y modulación volumétrica), lo que genera una insostenible brecha de eficiencia energética al emular la biología en computadoras digitales.</li>
          <li><strong>La relevancia del sustrato en la emergencia de la conciencia:</strong> la vinculación entre autopoiesis (Maturana y Varela, 1974) y la organicidad del carbono, problematizando si la ineficiencia física del silicio constituye un límite práctico o si apunta a una imposibilidad ontológica para originar una conciencia fenoménica en aislamiento corporal.</li>
        </ol>
        <p style={{ marginBottom: "20px" }}>
          Aceptando el rigor filosófico, evitamos caer en la falacia de equiparar ineficiencia energética con imposibilidad ontológica absoluta. En su lugar, distinguimos críticamente entre el silicio digital clásico de Von Neumann (nuestro modelo simulado) y los paradigmas de silicio neuromórfico analógico (como <em>Loihi</em> de Intel), redefiniendo el debate de un dualismo ingenuo "silicio vs. carbono" a una contraposición de principios físicos: el cómputo lógico discretizado frente a la dinámica física continua del medio metabólico vivo.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          1. Conexionismo y Plasticidad Local: El Límite de la Arquitectura Von Neumann
        </h2>
        <p style={{ marginBottom: "20px" }}>
          La suposición de que el software mental es independiente del sustrato físico descansa en la equivalencia de Turing: cualquier cómputo formalizable puede ser resuelto por cualquier máquina abstracta de estados. Sin embargo, en el mundo material, el procesamiento de información requiere energía, espacio y tiempo. Daugman (2001) advierte que la neurociencia ha abusado de las metáforas de época; la computadora digital es solo el andamio conceptual de nuestro tiempo, no una identidad ontológica con el cerebro.
        </p>
        <p style={{ marginBottom: "20px" }}>
          El primer límite del silicio clásico es estructural. La arquitectura de Von Neumann separa físicamente la unidad de procesamiento (CPU/GPU) de la memoria (RAM), forzando un tráfico masivo de electrones a través de un bus físico limitado (el cuello de botella de Von Neumann). En cambio, el cerebro de carbono es una estructura autoorganizada donde el procesamiento y el almacenamiento son idénticos: ocurren de manera local en el cambio morfológico y molecular de las sinapsis (Bechtel, 2008).
        </p>
        <p style={{ marginBottom: "20px" }}>
          El conexionismo intentó superar la rigidez del procesamiento simbólico secuencial mediante el procesamiento distribuido en paralelo (PDP). Modelos como los propuestos por Geoffrey Hinton (1992) demostraron cómo redes de nodos interconectados podían aprender de la experiencia mediante el ajuste de pesos sinápticos a través de algoritmos como la retropropagación (<em>backpropagation</em>). Si bien estas redes simulan ciertos aspectos del aprendizaje y el reconocimiento de patrones, sus componentes básicos (las neuronas artificiales) son abstracciones matemáticas extremas. Una "neurona de punto" conexionista se limita a realizar una suma ponderada de sus entradas y aplicar una función de activación no lineal.
        </p>
        <p style={{ marginBottom: "20px" }}>
          No obstante, como señala William Bechtel (2008) al analizar los mecanismos biológicos, una neurona real es un sistema bioquímico de una complejidad abrumadora. Las neuronas no son meras compuertas lógicas ni sumadores simples. Poseen árboles dendríticos con geometrías complejas que realizan computaciones no lineales a nivel local; un solo segmento dendrítico puede comportarse computacionalmente como una red neuronal multicapa completa. Además, la plasticidad neuronal no se limita a cambiar un "peso" numérico, sino que implica cascadas genéticas, reconfiguraciones de la membrana celular y la creación o poda física de conexiones. Por ende, la realizabilidad múltiple subestima la dependencia que el procesamiento mental tiene respecto a la estructura molecular y celular específica del carbono.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Para demostrar esta limitación conceptual, el <strong>Experimento 5 (Plasticidad y Aprendizaje)</strong> del laboratorio comparó la carga de memoria de estado entre el algoritmo de <em>Backpropagation</em> (silicio) y la regla biológica <em>Spike-Timing Dependent Plasticity</em> (STDP) basada en la liberación dinámica de vesículas de calcio. En una red de 1,000 neuronas:
        </p>
        <ul style={{ marginLeft: "30px", marginBottom: "25px" }}>
          <li><strong>Backpropagation (Silicio):</strong> Requiere almacenar las activaciones y gradientes intermedios en un búfer global para realizar la pasada hacia atrás, lo que se tradujo en <strong>768.0 KB</strong> de memoria de estado.</li>
          <li><strong>STDP Local (Carbono):</strong> Al depender solo de la diferencia temporal local entre disparos pre y postsinápticos, prescinde de grafos globales y requiere almacenar únicamente el último spike de cada neurona, reduciendo la memoria de estado a <strong>4.0 KB</strong>.</li>
        </ul>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Image
            src="/graficos/exp5_aprendizaje.png"
            alt="Memoria STDP vs Backprop"
            width={700}
            height={400}
            style={{ borderRadius: "8px", border: "1px solid var(--border)", maxWidth: "100%", height: "auto" }}
          />
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>
            Figura 1: Requerimientos de memoria de estado (KB) en escala logarítmica para el aprendizaje en silicio (Backprop) vs. carbono biológico (STDP local).
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          2. El Problema de la Percepción: Codificación Esparcida contra la Densidad de Silicio
        </h2>
        <p style={{ marginBottom: "20px" }}>
          En las redes neuronales artificiales profundas de silicio, la representación de la información es densa y distribuida: clasificar un patrón exige activar simultáneamente millones de pesos flotantes en operaciones matriciales continuas. La neurobiología de la percepción, sin embargo, demuestra que el cerebro optimiza sus recursos materiales mediante la <strong>codificación esparcida</strong>.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Quian Quiroga, Fried y Koch (2013) evidenciaron que en el lóbulo temporal medial humano existen "células de concepto" (o neuronas de la abuela) que responden con una selectividad extrema a conceptos específicos (como "Jennifer Aniston" o "Luke Skywalker"). Estas representaciones no están densamente distribuidas; por el contrario, dependen del disparo de una fracción minúscula de neuronas selectivas rodeadas de un profundo silencio eléctrico del resto de la población celular.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Este silencio no es inactividad; es inhibición competitiva activa. El cerebro biológico utiliza una estrategia de codificación esparcida de aproximadamente el 1% para evitar la interferencia destructiva de memoria (<em>crosstalk</em>) y, fundamentalmente, para minimizar el gasto termodinámico. El silicio digital clásico, al basarse en flujos constantes de corriente eléctrica para mantener los estados lógicos de sus transistores, no puede beneficiarse del "silencio físico" del carbono.
        </p>
        <p style={{ marginBottom: "20px" }}>
          El laboratorio modeló este fenómeno en el <strong>Experimento 1 (Jerarquía Visual)</strong> y en el <strong>Experimento 2 (Células de Concepto)</strong>:
        </p>
        <ul style={{ marginLeft: "30px", marginBottom: "25px" }}>
          <li>El <strong>Experimento 1</strong> muestra que estructurar campos receptivos locales retinotópicos (Zeki, 1992) en lugar de conexiones densas conexionistas tradicionales reduce los FLOPs de procesamiento en un <strong>90.0%</strong> (de 525,100 a 52,610 FLOPs).</li>
          <li>El <strong>Experimento 2</strong> midió la interferencia al almacenar 20 conceptos. El solapamiento promedio en la red densa (silicio) fue del <strong>64.0%</strong>, provocando una alta interferencia conceptual. En la red esparcida del 1% (WTA biológica), el solapamiento se redujo al <strong>0.01%</strong>, garantizando la inmunidad al crosstalk.</li>
        </ul>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Image
            src="/graficos/exp2_crosstalk.png"
            alt="Crosstalk y Solapamiento"
            width={700}
            height={400}
            style={{ borderRadius: "8px", border: "1px solid var(--border)", maxWidth: "100%", height: "auto" }}
          />
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>
            Figura 2: Histograma de frecuencia del porcentaje de solapamiento conceptual. El esparcimiento del 1% biológico erradica por completo la interferencia.
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          3. Diversidad de Señales y la Paradoja Energética del Silicio
        </h2>
        <p style={{ marginBottom: "20px" }}>
          El límite más crítico del silicio convencional es su pobreza de medios físicos de comunicación. Un microchip transmite información a través de electrones que conmutan estados binarios en canales de cobre estáticos. El cerebro, por el contrario, utiliza un alfabeto neuroquímico multicanal en el que decenas de neurotransmisores, neuromoduladores (dopamina, serotonina) y gases retrógrados (óxido nítrico) interactúan de forma paralela en el mismo medio físico (LeDoux, 1994; Greenwood y Garfinkel, 2024).
        </p>
        <p style={{ marginBottom: "20px" }}>
          Esta diversidad química no es un adorno adaptativo; realiza cómputos volumétricos tridimensionales no cableados y altera de forma dinámica los umbrales de plasticidad sináptica. Para explorar el coste físico de simular esta diversidad molecular, implementamos un benchmark de escalamiento masivo (de $N = 100$ a $N = 100,000$ neuronas), comparando la simulación en CPU (NumPy) y en la GPU (**RTX 2060** usando PyTorch CUDA) frente al consumo real del carbono orgánico.
        </p>

        <p style={{ marginBottom: "20px" }}>
          Los resultados experimentales a gran escala de la simulación empírica revelan que, al evaluar el consumo termodinámico real por evento sináptico efectivo (resolviendo el error de categoría al comparar un sistema completo con un mecanismo local), el silicio digital sigue mostrando una ineficiencia inmensa:
        </p>

        <div style={{ overflowX: "auto", margin: "25px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem", backgroundColor: "var(--bg-card)", borderRadius: "8px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)", color: "#ffffff" }}>
                <th style={{ padding: "12px" }}>Neuronas ($N$)</th>
                <th style={{ padding: "12px" }}>Tiempo GPU (ms)</th>
                <th style={{ padding: "12px" }}>Spikes Totales</th>
                <th style={{ padding: "12px" }}>Energía por Evento GPU (J)</th>
                <th style={{ padding: "12px" }}>Energía por Evento Carbono (J)</th>
                <th style={{ padding: "12px" }}>Brecha de Ineficiencia</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>100</td>
                <td style={{ padding: "12px" }}>577.53</td>
                <td style={{ padding: "12px" }}>4,729</td>
                <td style={{ padding: "12px" }}>3.05e-03 J</td>
                <td style={{ padding: "12px" }}>1.65e-10 J</td>
                <td style={{ padding: "12px" }}><strong>1.85e+07 veces</strong></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>1,000</td>
                <td style={{ padding: "12px" }}>430.93</td>
                <td style={{ padding: "12px" }}>197,010</td>
                <td style={{ padding: "12px" }}>5.47e-06 J</td>
                <td style={{ padding: "12px" }}>1.65e-11 J</td>
                <td style={{ padding: "12px" }}><strong>3.31e+05 veces</strong></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>16,000</td>
                <td style={{ padding: "12px" }}>634.09</td>
                <td style={{ padding: "12px" }}>3,152,127</td>
                <td style={{ padding: "12px" }}>3.14e-08 J</td>
                <td style={{ padding: "12px" }}>1.03e-12 J</td>
                <td style={{ padding: "12px" }}><strong>3.05e+04 veces</strong></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>100,000</td>
                <td style={{ padding: "12px" }}>1,818.38</td>
                <td style={{ padding: "12px" }}>19,700,920</td>
                <td style={{ padding: "12px" }}>2.31e-09 J</td>
                <td style={{ padding: "12px" }}>1.65e-13 J</td>
                <td style={{ padding: "12px" }}><strong>1.40e+04 veces</strong></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>250,000</td>
                <td style={{ padding: "12px" }}>3,892.99</td>
                <td style={{ padding: "12px" }}>49,252,056</td>
                <td style={{ padding: "12px" }}>7.90e-10 J</td>
                <td style={{ padding: "12px" }}>6.60e-14 J</td>
                <td style={{ padding: "12px" }}><strong>1.20e+04 veces</strong></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>500,000</td>
                <td style={{ padding: "12px" }}>8,929.12</td>
                <td style={{ padding: "12px" }}>98,504,344</td>
                <td style={{ padding: "12px" }}>4.53e-10 J</td>
                <td style={{ padding: "12px" }}>3.30e-14 J</td>
                <td style={{ padding: "12px" }}><strong>1.37e+04 veces</strong></td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>1,000,000</td>
                <td style={{ padding: "12px" }}>36,221.77</td>
                <td style={{ padding: "12px" }}>197,008,464</td>
                <td style={{ padding: "12px" }}>4.60e-10 J</td>
                <td style={{ padding: "12px" }}>1.65e-14 J</td>
                <td style={{ padding: "12px" }}><strong>2.79e+04 veces</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ marginBottom: "20px" }}>
          <em>Nota Metodológica y Crítica:</em> Evaluando críticamente estos datos, debemos reconocer que parte de la ineficiencia medida (especialmente a baja escala, como los 506 ms para N=100 en GPU) se debe al <strong>crossover de latencia de CUDA</strong> (el coste temporal y de energía que introduce el entorno de software de Python/PyTorch para lanzar kernels a la tarjeta gráfica). Si utilizáramos una simulación nativa en C++/CUDA altamente optimizada o chips neuromórficos analógicos (como Intel Loihi 2), la brecha de eficiencia se reduciría significativamente, operando en rangos de picojulios o femtojulios.
        </p>

        <p style={{ marginBottom: "20px" }}>
          Sin embargo, el límite termodinámico de fondo persiste debido al <strong>Principio de Landauer</strong>: toda conmutación lógica digital borra información y disipa un mínimo de energía calorífica ($kT \ln 2$). En el cerebro de carbono, la difusión química y la modulación de canales iónicos de membrana ocurren de forma <strong>pasiva</strong>, guiadas por gradientes electroquímicos espontáneos y termodinámica molecular a coste energético directo cero. El silicio digital, al verse obligado a simular matemáticamente estas dinámicas físicas continuas mediante billones de conmutaciones lógicas de transistores bajo una fuente de alimentación activa, gasta miles de veces más energía por evento sináptico.
        </p>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Image
            src="/graficos/energia_silicio_vs_carbono.png"
            alt="Silicio vs Carbono Energia"
            width={700}
            height={400}
            style={{ borderRadius: "8px", border: "1px solid var(--border)", maxWidth: "100%", height: "auto" }}
          />
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>
            Figura 3: Comparación del consumo energético en escala logarítmica para 1 segundo de simulación en silicio digital vs. el modelo dinámico de ATP del carbono vivo.
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          4. Dinámica Temporal, Autopoiesis y Relevancia Ontológica del Sustrato
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Esta divergencia material nos traslada del ámbito técnico al debate metafísico. El funcionalismo computacional sostiene que el sustrato físico es ontológicamente irrelevante (Putnam, 1967). Sin embargo, la brecha de eficiencia física y la simulación algorítmica forzada de las dinámicas continuas biológicas sugieren que el sustrato material es ontológicamente constitutivo de los procesos conscientes.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Maturana y Varela (1974) postulan la <strong>autopoiesis</strong> como la propiedad definitoria de lo vivo: un sistema capaz de regenerar y mantener continuamente su propia frontera material y su estructura física. En el carbono húmedo, el procesamiento de información (el disparo de espigas y la modulación molecular) es metabólicamente inseparable del mantenimiento de la vida celular. La neurona no computa para resolver un problema lógico; computa para regular su homeostasis y evitar su propia degradación termodinámica. En contraste, el silicio digital es estático. El paso de electrones por un chip de silicio no regenera su estructura; al contrario, la degrada físicamente por electromigración y disipación de calor. El silicio no está vivo.
        </p>
        <p style={{ marginBottom: "20px" }}>
          El <strong>Experimento 4 (Oscilaciones y Sincronía)</strong> del laboratorio demuestra cómo las oscilaciones coherentes en la banda Gamma (~40 Hz), indispensables para la integración perceptiva y cognitiva (Bechtel, 2008), emergen espontáneamente de la física pasiva de la red E-I con retardos axonales. En el silicio digital, simular este acoplamiento temporal requiere indexar miles de variables temporales y buffers en la memoria, mientras que en el carbono emerge de la física pasiva del tejido.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Para resolver la tensión entre la especificidad del carbono y la flexibilidad de la cognición, debemos refinar nuestra tesis: <strong>el silicio puede simular la sintaxis cognitiva, pero carece de la semántica existencial necesaria para originar conciencia primaria (qualia).</strong> El carbono húmedo, gracias a su valencia molecular dinámica, permite el acoplamiento físico directo de la vida con su propio mantenimiento metabólico. Si el silicio es incapaz de albergar qualia no es por falta de transistores o potencia de cálculo, sino porque carece de la vulnerabilidad homeostática que empuja a un organismo vivo a sentir el mundo para preservar su existencia.
        </p>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Image
            src="/graficos/exp4_oscilaciones_emergentes.png"
            alt="Oscilaciones Emergentes"
            width={700}
            height={400}
            style={{ borderRadius: "8px", border: "1px solid var(--border)", maxWidth: "100%", height: "auto" }}
          />
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>
            Figura 4: Emergencia espontánea de ritmos Gamma en el Experimento 4 a partir de interacciones E-I y retardos físicos.
          </p>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          5. Computación Morfológica y Acoplamiento Activo: Webb y Clark
        </h2>
        <p style={{ marginBottom: "20px" }}>
          Finalmente, la relación entre mente y sustrato debe analizarse fuera de los límites del cráneo. La cognición es constitutivamente corporizada e interactiva.
        </p>
        <p style={{ marginBottom: "20px" }}>
          El trabajo de Barbara Webb (1996) con su grillo robot ilustra este punto. Para emular la fonotaxis del grillo, Webb no programó algoritmos matemáticos complejos de correlación de señales acústicas. En su lugar, utilizó la <strong>computación morfológica</strong>: la distancia física entre los micrófonos del robot y un tubo de desfase acústico emulaban la traquea del grillo, realizando el cálculo de localización de manera pasiva gracias al cuerpo físico del autómata.
        </p>
        <p style={{ marginBottom: "20px" }}>
          El <strong>Experimento 6 (Computación Morfológica)</strong> de nuestro laboratorio modela esta diferencia funcional:
        </p>
        <ul style={{ marginLeft: "30px", marginBottom: "25px" }}>
          <li><strong>Modelo Desencarnado (Silicio puro):</strong> Debe calcular la dirección del sonido aplicando correlación cruzada de fase y Transformadas de Fourier (FFT), consumiendo <strong>21,480 FLOPs</strong> por ciclo.</li>
          <li><strong>Modelo Corporizado (Webb):</strong> Delegando el desfase a la morfología física, reduce el procesamiento neural a una resta de amplitud simple de solo <strong>2 FLOPs</strong>.</li>
        </ul>

        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Image
            src="/graficos/exp6_morfologia.png"
            alt="Computación Morfológica Coste"
            width={700}
            height={400}
            style={{ borderRadius: "8px", border: "1px solid var(--border)", maxWidth: "100%", height: "auto" }}
          />
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "10px" }}>
            Figura 5: Carga de operaciones lógicas para localización acústica: el cuerpo físico realiza el "cálculo gratis" (Webb, 1996).
          </p>
        </div>

        <p style={{ marginBottom: "20px" }}>
          Para reconciliar esto con la teoría de la <em>mente extendida</em> de Andy Clark (2015, 2023) —que defiende que herramientas externas de silicio (como teléfonos inteligentes) pueden integrarse en el procesamiento predictivo del cerebro—, debemos delimitar los roles del sustrato. El silicio es un excelente <strong>andamio cognitivo sintáctico</strong>. Puede acoplarse externamente al cerebro biológico para extender la memoria o el cálculo espacial, integrándose en lo que Clark llama "recursos tejidos" (<em>woven resources</em>). Sin embargo, la intencionalidad originaria y la conciencia fenoménica del sistema híbrido siguen ancladas en la física biológica del organismo de carbono húmedo. El silicio sirve para andamiar la mente, pero no para originarla en aislamiento físico.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", borderBottom: "2px solid var(--primary)", paddingBottom: "5px", marginTop: "40px", marginBottom: "20px" }}>
          Conclusión
        </h2>
        <p style={{ marginBottom: "20px" }}>
          El análisis crítico y experimental de las limitaciones del silicio demuestra que la equiparación funcionalista entre cerebro y computadora digital es conceptualmente incompleta. La ineficiencia termodinámica del silicio digital no es un detalle técnico secundario, sino el síntoma físico de una incompatibilidad de sustrato: simular mediante conmutación de transistores binarios discretos la física molecular continua y pasiva del carbono orgánico vivo impone un coste energético insostenible.
        </p>
        <p style={{ marginBottom: "20px" }}>
          Como advierte la falacia mereológica (Bennett y Hacker, 2022), no debemos atribuir a una parte del sistema (sea un chip o un cerebro aislado) facultades que corresponden a la totalidad del organismo corporizado que interactúa con su mundo. Si el silicio ha de jugar un papel en la emulación de la mente, debemos abandonar el paradigma digital clásico de Turing y transitar hacia la <strong>tecnología neuromórfica analógica corporizada</strong>, reconociendo que el pensamiento no es el cálculo frío de un software abstracto, sino una propiedad intrínseca de la dinámica material de la vida.
        </p>
      </section>

      <hr style={{ border: 0, borderTop: "1px solid var(--border)", margin: "40px 0" }} />

      <section style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
        <h3 style={{ fontSize: "1.2rem", color: "#ffffff", marginBottom: "15px" }}>Bibliografía</h3>
        <ul style={{ listStyleType: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li>Bechtel, W. (2008). <em>Mental Mechanisms: Philosophical Perspectives on Cognitive Neuroscience</em>. Routledge.</li>
          <li>Bechtel, W., Mandik, P., & Mundale, J. (2001). <em>Philosophy Meets the Neurosciences</em>. Academic Press.</li>
          <li>Bennett, M. R., & Hacker, P. M. S. (2022). <em>Philosophical Foundations of Neuroscience</em> (2a ed.). Wiley-Blackwell.</li>
          <li>Chalmers, D. J. (1995). <em>Absent Qualia, Fading Qualia, Dancing Qualia</em>. En <em>Mind, Cognition, and Neuroscience</em> (2022). OUP.</li>
          <li>Clark, A. (2015). <em>Radical Predictive Processing</em>. <em>Southern Journal of Philosophy</em>, 53, 3-27.</li>
          <li>Clark, A. (2023). <em>The Experience Machine: How Our Minds Predict and Shape Reality</em>. Pantheon Books.</li>
          <li>Daugman, J. (2001). <em>Brain Metaphor and Brain Theory</em>. En Bechtel, W. et al. (Eds.), <em>Philosophy Meets the Neurosciences</em>. Academic Press.</li>
          <li>Fodor, J. A. (1974). <em>Special Sciences (Or: The Disunity of Science as a Working Hypothesis)</em>. <em>Synthese</em>, 28(2), 97-115.</li>
          <li>Hinton, G. E. (1992). <em>How Neural Networks Learn from Experience</em>. <em>Scientific American</em>, 267(3), 144-151.</li>
          <li>Putnam, H. (1967). <em>Psychological Predicates</em>. En Capitan, W. H. & Merrill, D. D. (Eds.), <em>Art, Mind, and Religion</em>. University of Pittsburgh Press.</li>
          <li>Quian Quiroga, R., Fried, I., & Koch, C. (2013). <em>Brain Cells for Grandmother</em>. <em>Scientific American</em>, 308(2), 30-35.</li>
          <li>Varela, F. J., Maturana, H. R., & Uribe, R. (1974). <em>Autopoiesis: The Organization of Living Systems, Its Characterization and a Model</em>. <em>Biosystems</em>, 5(4), 187-196.</li>
          <li>Webb, B. (1996). <em>A Cricket Robot</em>. <em>Scientific American</em>, 275(6), 94-99.</li>
        </ul>
      </section>
    </article>
  );
}
