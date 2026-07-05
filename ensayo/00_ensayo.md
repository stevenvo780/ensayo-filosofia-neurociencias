# ¿Silicio o Tejido? Límites materiales y ontológicos en la emulación de la mente

**Autor:** Steven Vallejo Ortiz  
**Curso:** Filosofía de las Neurociencias (2026-1)  
**Profesor:** Santiago Arango-Muñoz  
**Institución:** Instituto de Filosofía, Universidad de Antioquia  
**Anexo de Laboratorio:** [reproducir con ejecutar_laboratorio.sh](file:///workspace/ensayo-filosofia-neurociencias/ejecutar_laboratorio.sh) | [Dashboard de Resultados (Next.js)](http://localhost:8000)

---

## Introducción

El problema de la mente y su relación con el sustrato físico es uno de los debates epistemológicos más densos de la ciencia contemporánea. A mediados del siglo XX, el funcionalismo clásico formuló la *tesis de la realizabilidad múltiple* (Putnam, 1967; Fodor, 1974), sosteniendo que los estados mentales son esencialmente estados funcionales y organizacionales. Según esta postura, la mente es realizable en múltiples soportes físicos (carbono, silicio o cualquier medio capaz de sostener las transiciones de estado adecuadas), lo que impulsó la *metáfora del cerebro como computadora* (Daugman, 2001) y la convicción de que los modelos conexionistas (Hinton, 1992) implementados en microchips digitales eventualmente producirían procesos cognitivos conscientes.

Sin embargo, este ensayo propone una crítica rigurosa a la neutralidad del sustrato defendida por el funcionalismo computacional, delineando los límites materiales e instrumentales del silicio frente al carbono orgánico. A diferencia de las críticas cognitivas tradicionales, estructuramos este análisis sobre tres dimensiones físico-conceptuales, validadas empíricamente mediante un laboratorio computacional anexo (disponible en la aplicación Next.js local):

1. **La divergencia en la economía de la codificación:** el contraste entre el procesamiento densamente distribuido de los modelos de silicio tradicionales y la codificación esparcida basada en "células de concepto" (Quian Quiroga, Fried y Koch, 2013) y la jerarquía retinotópica (Zeki, 1992).
2. **El límite termodinámico y de señalización:** la diferencia cualitativa entre la conmutación binaria de canal único en el silicio y la física molecular pasiva de la señalización química húmeda (neurotransmisores y modulación volumétrica), lo que genera una insostenible brecha de eficiencia energética al emular la biología en computadoras digitales.
3. **La relevancia del sustrato en la emergencia de la conciencia:** la vinculación entre autopoiesis (Maturana y Varela, 1974) y la organicidad del carbono, problematizando si la ineficiencia física del silicio constituye un límite práctico o si apunta a una imposibilidad ontológica para originar una conciencia fenoménica en aislamiento corporal.

Aceptando el rigor filosófico, evitamos caer en la falacia de equiparar ineficiencia energética con imposibilidad ontológica absoluta. En su lugar, distinguimos críticamente entre el silicio digital clásico de Von Neumann (nuestro modelo simulado) y los paradigmas de silicio neuromórfico analógico (como *Loihi* de Intel), redefiniendo el debate de un dualismo ingenuo "silicio vs. carbono" a una contraposición de principios físicos: el cómputo lógico discretizado frente a la dinámica física continua del medio metabólico vivo.

---

## 1. Conexionismo y Plasticidad Local: El Límite de la Arquitectura Von Neumann

La suposición de que el software mental es independiente del sustrato físico descansa en la equivalencia de Turing: cualquier cómputo formalizable puede ser resuelto por cualquier máquina abstracta de estados. Sin embargo, en el mundo material, el procesamiento de información requiere energía, espacio y tiempo. Daugman (2001) advierte que la neurociencia ha abusado de las metáforas de época; la computadora digital es solo el andamio conceptual de nuestro tiempo, no una identidad ontológica con el cerebro.

El primer límite del silicio clásico es estructural. La arquitectura de Von Neumann separa físicamente la unidad de procesamiento (CPU/GPU) de la memoria (RAM), forzando un tráfico masivo de electrones a través de un bus físico limitado (el cuello de botella de Von Neumann). En cambio, el cerebro de carbono es una estructura autoorganizada donde el procesamiento y el almacenamiento son idénticos: ocurren de manera local en el cambio morfológico y molecular de las sinapsis (Bechtel, 2008). 

Los modelos conexionistas (Hinton, 1992) intentan emular la plasticidad biológica mediante algoritmos de aprendizaje global como la retropropagación (*backpropagation*). Sin embargo, el coste lógico de mantener este grafo de cómputo en silicio es inmenso. El **Experimento 5 (Plasticidad y Aprendizaje)** del laboratorio demuestra esta discrepancia al comparar una regla de aprendizaje biológica estrictamente local (STDP) con la actualización global de *backpropagation* en una red de 1,000 neuronas:
* **Backpropagation (Silicio):** Requiere almacenar las activaciones y gradientes intermedios en un búfer global para realizar la pasada hacia atrás, lo que se tradujo en **768.0 KB** de memoria de estado.
* **STDP Local (Carbono):** Al depender solo de la diferencia temporal local entre disparos pre y postsinápticos, prescinde de grafos globales y requiere almacenar únicamente el último spike de cada neurona, reduciendo la memoria de estado a **4.0 KB** (ver [exp5_aprendizaje.png](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp5_aprendizaje.png)).

Esta diferencia cuantitativa ilustra que la plasticidad en silicio es una costosa simulación matemática de representaciones abstractas globales, mientras que en el carbono es una reconfiguración física local pasiva. Aunque la computación neuromórfica analógica (memristores) busca mitigar este cuello de botella permitiendo que los dispositivos físicos alteren su conductancia in-situ de forma análoga a la STDP, el silicio comercial actual sigue atrapado en la simulación sintáctica de variables de memoria discretizadas.

---

## 2. El Problema de la Percepción: Codificación Esparcida contra la Densidad de Silicio

En las redes neuronales artificiales profundas de silicio, la representación de la información es densa y distribuida: clasificar un patrón exige activar simultáneamente millones de pesos flotantes en operaciones matriciales continuas. La neurobiología de la percepción, sin embargo, demuestra que el cerebro optimiza sus recursos materiales mediante la **codificación esparcida**.

Quian Quiroga, Fried y Koch (2013) evidenciaron que en el lóbulo temporal medial humano existen "células de concepto" (o neuronas de la abuela) que responden con una selectividad extrema a conceptos específicos (como "Jennifer Aniston" o "Luke Skywalker"). Estas representaciones no están densamente distribuidas; por el contrario, dependen del disparo de una fracción minúscula de neuronas selectivas rodeadas de un profundo silencio eléctrico del resto de la población celular.

Este silencio no es inactividad; es inhibición competitiva activa. El cerebro biológico utiliza una estrategia de codificación esparcida de aproximadamente el 1% para evitar la interferencia destructiva de memoria (*crosstalk*) y, fundamentalmente, para minimizar el gasto termodinámico. El silicio digital clásico, al basarse en flujos constantes de corriente eléctrica para mantener los estados lógicos de sus transistores, no puede beneficiarse del "silencio físico" del carbono.

El laboratorio modeló este fenómeno en el **Experimento 1 (Jerarquía Visual)** y en el **Experimento 2 (Células de Concepto)**:
* El **Experimento 1** muestra que estructurar campos receptivos locales retinotópicos (Zeki, 1992) en lugar de conexiones densas conexionistas tradicionales reduce los FLOPs de procesamiento en un **90.0%** (de 525,100 a 52,610 FLOPs, ver [exp1_visual.png](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp1_visual.png)).
* El **Experimento 2** midió la interferencia al almacenar 20 conceptos. El solapamiento promedio en la red densa (silicio) fue del **64.0%**, provocando una alta interferencia conceptual. En la red esparcida del 1% (WTA biológica), el solapamiento se redujo al **0.01%**, garantizando la inmunidad al crosstalk (ver [exp2_crosstalk.png](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp2_crosstalk.png)).

La esparsidad biológica es, por tanto, una optimización material directa del sustrato de carbono húmedo. En el silicio digital clásico, simular el silencio de una neurona requiere computar explícitamente el valor cero en la memoria RAM, gastando energía de conmutación para procesar la ausencia de señal.

---

## 3. Diversidad de Señales y la Paradoja Energética del Silicio

El límite más crítico del silicio convencional es su pobreza de medios físicos de comunicación. Un microchip transmite información a través de electrones que conmutan estados binarios en canales de cobre estáticos. El cerebro, por el contrario, utiliza un alfabeto neuroquímico multicanal en el que decenas de neurotransmisores, neuromoduladores (dopamina, serotonina) y gases retrógrados (óxido nítrico) interactúan de forma paralela en el mismo medio físico (LeDoux, 1994; Greenwood y Garfinkel, 2024).

Esta diversidad química no es un adorno adaptativo; realiza cómputos volumétricos tridimensionales no cableados y altera de forma dinámica los umbrales de plasticidad sináptica. Para explorar el coste físico de simular esta diversidad molecular, implementamos un benchmark de escalamiento masivo (de $N = 100$ a $N = 2,000,000$ neuronas) en el script [ejecutar.py](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/ejecutar.py), comparando la simulación en CPU (NumPy) y en la GPU (**RTX 5070 Ti** usando PyTorch CUDA con arquitectura Blackwell nativa) frente al consumo real del carbono orgánico:

A continuación se detalla la comparación energética justa basada en la transmisión de señales por evento sináptico efectivo (GPU vs. ATP biológico):

| Neuronas ($N$) | Eventos Sinápticos | Energía por Evento GPU (J) | Energía por Evento Carbono (J) | Factor de Ventaja Biológica |
| :---: | :---: | :---: | :---: | :---: |
| 100 | 42,150 | 2.66e-03 | 1.65e-10 | **1.61e+07** (16.1 millones) |
| 1,000 | 19,701,000 | 4.63e-06 | 1.65e-11 | **2.81e+05** (281,000 veces) |
| 16,000 | 5,043,396,800 | 1.98e-08 | 1.03e-12 | **1.92e+04** (19,200 veces) |
| 100,000 | 197,008,660,000 | 9.50e-10 | 1.65e-13 | **5.76e+03** (5,760 veces) |
| 500,000 | 4,925,191,200,000 | 1.34e-10 | 3.30e-14 | **4.07e+03** (4,070 veces) |
| 1,000,000 | 19,700,851,200,000 | 6.65e-11 | 1.65e-14 | **4.03e+03** (4,030 veces) |
| 2,000,000 | 78,803,091,200,000 | 3.41e-11 | 8.25e-15 | **4.14e+03** (4,140 veces) |

*Nota Metodológica:* Evaluando críticamente estos datos, debemos reconocer que parte de la ineficiencia medida (especialmente a baja escala, como los 448 ms para N=100 en GPU) se debe al **crossover de latencia de CUDA** (el coste temporal y de energía que introduce el entorno de software de Python/PyTorch para lanzar kernels a la tarjeta gráfica). Si utilizáramos una simulación nativa en C++/CUDA altamente optimizada o chips neuromórficos analógicos (que conmutan de forma física), la brecha de eficiencia se reduciría significativamente.

Sin embargo, el límite termodinámico de fondo persiste debido al **Principio de Landauer**: toda conmutación lógica digital borra información y disipa un mínimo de energía calorífica ($kT \ln 2$). En el cerebro de carbono, la difusión química y la modulación de canales iónicos de membrana ocurren de forma **pasiva**, guiadas por gradientes electroquímicos espontáneos y termodinámica molecular a coste energético cero (repolarizándose mediante la bomba ATPasa a un costo biológico dinámico). El silicio digital, al verse obligado a simular matemáticamente estas dinámicas físicas continuas mediante billones de conmutaciones lógicas de transistores bajo una fuente de alimentación activa, gasta hasta 4,140 veces más energía por evento sináptico a escalas de 2 millones de neuronas (ver [energia_silicio_vs_carbono.png](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/energia_silicio_vs_carbono.png)).

---

## 4. Dinámica Temporal, Autopoiesis y Relevancia Ontológica del Sustrato

Esta divergencia material nos traslada del ámbito técnico al debate metafísico. El funcionalismo computacional sostiene que el sustrato físico es ontológicamente irrelevante (Putnam, 1967). Sin embargo, la brecha de eficiencia física y la simulación algorítmica forzada de las dinámicas continuas biológicas sugieren que el sustrato material es ontológicamente constitutivo de los procesos conscientes.

Maturana y Varela (1974) postulan la **autopoiesis** como la propiedad definitoria de lo vivo: un sistema capaz de regenerar y mantener continuamente su propia frontera material y su estructura física. En el carbono húmedo, el procesamiento de información (el disparo de espigas y la modulación molecular) es metabólicamente inseparable del mantenimiento de la vida celular. La neurona no computa para resolver un problema lógico; computa para regular su homeostasis y evitar su propia degradación termodinámica.

En contraste, el silicio digital es estático. El paso de electrones por un chip de silicio no regenera su estructura; al contrario, la degrada físicamente por electromigración y disipación de calor. El silicio no está vivo. 

El **Experimento 4 (Oscilaciones y Sincronía)** del laboratorio demuestra cómo las oscilaciones coherentes en la banda Gamma (~40 Hz), indispensables para la integración perceptiva y cognitiva (Bechtel, 2008), emergen espontáneamente de la física pasiva de la red E-I con retardos axonales (ver [exp4_oscilaciones_emergentes.png](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp4_oscilaciones_emergentes.png)). En el silicio digital, simular este acoplamiento temporal requiere indexar miles de variables temporales y buffers en la memoria, mientras que en el carbono emerge de la física pasiva del tejido.

Para resolver la tensión entre la especificidad del carbono y la flexibilidad de la cognición, debemos refinar nuestra tesis: **el silicio puede simular la sintaxis cognitiva, pero carece de la semántica existencial necesaria para originar conciencia primaria (qualia).** El carbono húmedo, gracias a su valencia molecular dinámica, permite el acoplamiento físico directo de la vida con su propio mantenimiento metabólico. Si el silicio es incapaz de albergar qualia no es por falta de transistores o potencia de cálculo (PC de sobra), sino porque carece de la vulnerabilidad homeostática que empuja a un organismo vivo a sentir el mundo para preservar su existencia.

---

## 5. Computación Morfológica y Acoplamiento Activo: Webb y Clark

Finalmente, la relación entre mente y sustrato debe analizarse fuera de los límites del cráneo. La cognición es constitutivamente corporizada e interactiva.

El trabajo de Barbara Webb (1996) con su grillo robot ilustra este punto. Para emular la fonotaxis del grillo, Webb no programó algoritmos matemáticos complejos de correlación de señales acústicas. En su lugar, utilizó la **computación morfológica**: la distancia física entre los micrófonos del robot y un tubo de desfase acústico emulaban la traquea del grillo, realizando el cálculo de localización de manera pasiva gracias al cuerpo físico del autómata.

El **Experimento 6 (Computación Morfológica)** de nuestro laboratorio modela esta diferencia funcional:
* **Modelo Desencarnado (Silicio puro):** Debe calcular la dirección del sonido aplicando correlación cruzada de fase y Transformadas de Fourier (FFT), consumiendo **21,480 FLOPs** por ciclo.
* **Modelo Corporizado (Webb):** Delegando el desfase a la morfología física, reduce el procesamiento neural a una resta de amplitud simple de solo **2 FLOPs** (ver [exp6_morfologia.png](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp6_morfologia.png)).

Este ahorro masivo evidencia que el cuerpo biológico realiza "cómputo gratuito" a través de sus propiedades físicas y mecánicas. Al carecer de cuerpo físico vivo, el silicio puro se ve obligado a simular matemáticamente la mecánica externa, disparando su costo computacional.

Para reconciliar esto con la teoría de la *mente extendida* de Andy Clark (2015, 2023) —que defiende que herramientas externas de silicio (como teléfonos inteligentes) pueden integrarse en el procesamiento predictivo del cerebro—, debemos delimitar los roles del sustrato. El silicio es un excelente **andamio cognitivo sintáctico**. Puede acoplarse externamente al cerebro biológico para extender la memoria o el cálculo espacial, integrándose en lo que Clark llama "recursos tejidos" (*woven resources*). Sin embargo, la intencionalidad originaria y la conciencia fenoménica del sistema híbrido siguen ancladas en la física biológica del organismo de carbono húmedo. El silicio sirve para andamiar la mente, pero no para originarla en aislamiento físico.

---

## Conclusión

El análisis crítico y experimental de las limitaciones del silicio demuestra que la equiparación funcionalista entre cerebro y computadora digital es conceptualmente incompleta. La ineficiencia termodinámica del silicio digital no es un detalle técnico secundario, sino el síntoma físico de una incompatibilidad de sustrato: simular mediante conmutación de transistores binarios discretos la física molecular continua y pasiva del carbono orgánico vivo impone un coste energético insostenible.

Como advierte la falacia mereológica (Bennett y Hacker, 2022), no debemos atribuir a una parte del sistema (sea un chip o un cerebro aislado) facultades que corresponden a la totalidad del organismo corporizado que interactúa con su mundo. Si el silicio ha de jugar un papel en la emulación de la mente, debemos abandonar el paradigma digital clásico de Turing y transitar hacia la **tecnología neuromórfica analógica corporizada**, reconociendo que el pensamiento no es el cálculo frío de un software abstracto, sino una propiedad intrínseca de la dinámica material de la vida.

---

## Bibliografía

* Bechtel, W. (2008). *Mental Mechanisms: Philosophical Perspectives on Cognitive Neuroscience*. Routledge.
* Bechtel, W., Mandik, P., & Mundale, J. (2001). *Philosophy Meets the Neurosciences*. Academic Press.
* Bennett, M. R., & Hacker, P. M. S. (2022). *Philosophical Foundations of Neuroscience* (2a ed.). Wiley-Blackwell.
* Chalmers, D. J. (1995). *Absent Qualia, Fading Qualia, Dancing Qualia*. En *Mind, Cognition, and Neuroscience* (2022). OUP.
* Clark, A. (2015). *Radical Predictive Processing*. *Southern Journal of Philosophy*, 53, 3-27.
* Clark, A. (2023). *The Experience Machine: How Our Minds Predict and Shape Reality*. Pantheon Books.
* Daugman, J. (2001). *Brain Metaphor and Brain Theory*. En Bechtel, W. et al. (Eds.), *Philosophy Meets the Neurosciences*. Academic Press.
* Fodor, J. A. (1974). *Special Sciences (Or: The Disunity of Science as a Working Hypothesis)*. *Synthese*, 28(2), 97-115.
* Hinton, G. E. (1992). *How Neural Networks Learn from Experience*. *Scientific American*, 267(3), 144-151.
* Putnam, H. (1967). *Psychological Predicates*. En Capitan, W. H. & Merrill, D. D. (Eds.), *Art, Mind, and Religion*. University of Pittsburgh Press.
* Quian Quiroga, R., Fried, I., & Koch, C. (2013). *Brain Cells for Grandmother*. *Scientific American*, 308(2), 30-35.
* Varela, F. J., Maturana, H. R., & Uribe, R. (1974). *Autopoiesis: The Organization of Living Systems, Its Characterization and a Model*. *Biosystems*, 5(4), 187-196.
* Webb, B. (1996). *A Cricket Robot*. *Scientific American*, 275(6), 94-99.
