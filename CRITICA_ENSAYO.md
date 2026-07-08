# Crítica profunda — Ensayo Final «¿Silicio o Tejido?»

> Documento de evaluación interna del ensayo `ensayo/00_ensayo.md` frente a la consigna
> (`CONSIGNA.md`), los datos crudos del laboratorio (`simulaciones/datos/`) y los estándares
> del seminario de Filosofía de las Neurociencias.
> Fecha: 6 de julio de 2026 · Entrega: 15 de julio de 2026.

---

## ✅ RESOLUCIÓN (aplicada el 6-jul-2026)

Todos los defectos de esta crítica se **corrigieron** sobre `ensayo/00_ensayo.md` y se validaron con una verificación adversarial multi-agente (6 lentes independientes). Estado final:

| Defecto original | Corrección aplicada | Verificado |
|---|---|---|
| Longitud (2553 prosa) | Reescrito a **2000 palabras** de prosa (~1989 legibles) | ✅ conteo |
| 4/6 experimentos con cifras obsoletas | Exp1/2/4/5/6 **sincronizados con los CSV** (además: Exp4 corregido de «gamma 40 Hz» falso a «beta–gamma 13–80 Hz») | ✅ lente cifras: OK |
| Bibliografía rota (5 faltantes + 2 fantasma) | +von Neumann, Turing, Landauer, Zeki, Marder, Thompson; refs fantasma resueltas | ✅ lente citas: OK |
| 12 enlaces `file:///`/`localhost` | **0 enlaces dev**; 7 figuras incrustadas y numeradas en orden de lectura | ✅ |
| Salto energía→ontología | Tesis separada en dos niveles (práctico vs. ontológico); ontología funda solo en autopoiesis | ✅ lente filosofía |
| Landauer mal usado | Reencuadrado: piso universal substrato-**independiente**; la brecha es arquitectónica | ✅ (finding M1) |
| Réplica a Chalmers / tensión con Clark / «coste cero» / Webb | Moderadas y precisadas; peso ontológico desplazado a autopoiesis (Thompson 2007) | ✅ (M3, M4, m2, m3) |
| Cautela E_carbono vs E_silicio | Añadida nota: la «brecha» es cota superior de una comparación desfavorable, no constante de sustrato | ✅ (M5) |

La verificación adversarial confirmó **3 lentes en OK** (cifras, bibliografía, longitud) y sus 7 majors filosóficos/de consigna quedaron incorporados como mejoras de precisión. El único «falso positivo» (separadores numéricos) se revisó y descartó: `.`=miles y `,`=decimales es la convención española correcta.

> El resto de este documento conserva el **diagnóstico original** como registro de lo hallado.

---

## 0. Veredicto ejecutivo

El ensayo es **ambicioso, bien escrito y conceptualmente sofisticado**, con un anexo experimental
que ningún compañero de curso tendrá. Pero **hoy no está en condiciones de entregarse** por tres
defectos objetivos y verificables que un profesor detectará de inmediato:

| # | Defecto | Severidad | Estado |
|---|---------|-----------|--------|
| 1 | **Excede la longitud máxima** (≈2553 palabras de prosa vs. 2000 exigidas; ~3207 con tabla y bibliografía) | 🔴 P0 | Incumple consigna |
| 2 | **4 de 6 experimentos citan cifras que contradicen los datos crudos del propio laboratorio** | 🔴 P0 | Rompe la credibilidad de la tesis |
| 3 | **Bibliografía rota en ambos sentidos**: 5 autores citados sin entrada + 2 referencias nunca citadas | 🔴 P0 | Incumple «citar fuentes» |
| 4 | 12 enlaces `file:///…` y `localhost:8000` incrustados en el texto | 🟠 P1 | Artefacto de desarrollo |
| 5 | El puente lógico **ineficiencia energética → imposibilidad ontológica** se afirma, no se argumenta | 🟠 P1 | Debilidad filosófica de fondo |
| 6 | El tema se dispersa en 5 mini-ensayos (uno por experimento) en vez de **un solo problema** sostenido | 🟠 P1 | Tensión con la consigna |

Ninguno es fatal: los tres P0 se arreglan en una tarde. Pero **el #1 y el #2 son los que bajan la
nota**, y el usuario pidió explícitamente que la longitud quede cubierta. Empiezo por ahí.

---

## 1. Cumplimiento de la consigna

La consigna (`CONSIGNA.md`) fija cinco requisitos verificables. Este es el mapeo real:

| Requisito de la consigna | ¿Cumple? | Evidencia |
|---|---|---|
| **Extensión: 2000 palabras (ensayo CORTO)** | ❌ **No** | 2553 palabras solo de prosa; 3207 con tabla + bibliografía |
| Un solo tema/problema | ⚠️ Parcial | El hilo existe, pero se ramifica en 5 sub-tesis casi autónomas |
| Descripción del problema + reconstrucción **citando autores** | ✅ Sí | Intro + §1 reconstruyen funcionalismo (Putnam, Fodor, Daugman) |
| Apoyo en **fuentes primarias y secundarias** | ⚠️ Parcial | Buena selección, pero aparato de citas roto (ver §3) y varias fuentes son de divulgación |
| **Análisis / crítica personal** | ✅ Sí | La distinción sintaxis/semántica existencial (§4) es tesis propia |
| **Conclusión** (obligatoria) | ✅ Sí | Presente, aunque introduce material nuevo (ver §5.7) |

### 1.1 Longitud — el criterio que pediste destacar 🔴

Este es el incumplimiento más limpio y menos discutible. Medición sobre `ensayo/00_ensayo.md`:

| Fragmento | Palabras |
|---|---:|
| **Prosa del cuerpo** (Introducción → Conclusión, sin tabla ni encabezados ni metadatos) | **2553** |
| Bibliografía | 225 |
| Tabla de benchmark + metadatos de cabecera + títulos | ~430 |
| **Archivo completo** | **3207** |

**El límite es 2000 palabras. La prosa sola ya lo excede en ~28 % (≈550 palabras de más).**
Aun bajo el criterio más benévolo (contar solo prosa, excluir tabla y bibliografía), el texto
está claramente por encima. Bajo el criterio estricto habitual (todo el cuerpo, tabla incluida,
sin bibliografía) ronda las ~2900 y el exceso es de casi 45 %.

Nota: el `README.md` afirma «~2400 palabras» — esa cifra también es optimista y ya de por sí
estaría por encima del tope. La medición real es peor.

**Distribución por sección (prosa) y presupuesto sugerido para aterrizar en 2000:**

| Sección | Actual | Objetivo | Recorte |
|---|---:|---:|---:|
| Introducción | 382 | 250 | −132 |
| §1 Conexionismo / Von Neumann | 363 | 280 | −83 |
| §2 Codificación esparcida | 332 | 250 | −82 |
| **§3 Diversidad / paradoja energética** | **672** | **360** | **−312** |
| §4 Autopoiesis / ontología | 340 | 300 | −40 |
| §5 Computación morfológica | 306 | 220 | −86 |
| Conclusión | 158 | 150 | −8 |
| **Total prosa** | **2553** | **~1810** | **−743** |

Con ~1810 de prosa + la tabla condensada, el ensayo queda holgadamente dentro de 2000.
**El 60 % del recorte debe salir de §3**, que es donde está la grasa: la narración tier-por-tier
del benchmark (tiempos de 8 s, 64 s, 11 min, penalización PCIe ×10, GIL, DDR…) es fascinante para
el `README` técnico pero, en un ensayo *filosófico* de 2000 palabras, es un lujo. **La tabla ya
comunica el escalamiento; el párrafo que la narra línea por línea (l. 79) sobra casi entero.**
Basta conservar la conclusión conceptual (la brecha es emergente de la arquitectura, no monotónica)
y remitir el detalle de ingeniería al anexo.

### 1.2 «Un solo tema» — dispersión temática

La consigna insiste: **un solo problema**. El título promete uno (los límites del silicio), pero el
cuerpo se organiza como un **portafolio de los 6 experimentos del laboratorio**: §1 = Exp 5, §2 =
Exp 1+2, §3 = Exp 3 + benchmark, §4 = Exp 4, §5 = Exp 6. El resultado es que el ensayo tiene cinco
centros de gravedad (economía de la codificación, termodinámica/Landauer, autopoiesis/ontología,
oscilaciones, computación morfológica/mente extendida), cada uno con su propio autor de cabecera.

El hilo conductor existe —«el sustrato importa»— pero es delgado, y la sensación de lectura es la de
un *tour* por el laboratorio más que la de un argumento único sostenido. Esto **infla la longitud**
(cada experimento pide su párrafo de contexto) y **diluye el requisito de tema único**. Recortar para
llegar a 2000 palabras es, a la vez, la oportunidad de elegir *una* espina dorsal (recomiendo el eje
termodinámico-ontológico) y subordinar el resto a ella en vez de darle a cada experimento igual peso.

---

## 2. Integridad de los datos — el defecto más peligroso 🔴

El ensayo apuesta toda su autoridad retórica a estar **«validado empíricamente mediante un
laboratorio computacional anexo»** (l. 15). Esa apuesta se vuelve en contra si las cifras del texto
no coinciden con las que el laboratorio realmente produce. **Y en 4 de los 6 experimentos, no
coinciden.** Comparación entre lo que dice el ensayo, lo que dicen los CSV crudos
(`simulaciones/datos/`) y lo que dice el propio `README.md`:

| Exp | Cifra en el ensayo | Dato crudo (CSV) | README | ¿Coincide? |
|---|---|---|---|---|
| 1 (visual) | 525.100 → 52.610 FLOPs (90 %) | **22.154.880 → 2.218.827** FLOPs | 90 % | ❌ magnitudes ×42 distintas (el % sí) |
| 2 (crosstalk) | 64,0 % → **0,01 %** | ~80 % → ~1,4 % | 80 % → 1,03 % | ❌ ambos extremos mal |
| 5 (memoria) | 768 KB vs **4 KB** (192×) | **20.000 KB vs 39 KB** (512×) | 20.000 vs 39 (512×) | ❌ completamente distinto |
| 6 (morfología) | **21.480** vs 2 FLOPs | **757.760** vs 2 FLOPs | 757.760 vs 2 | ❌ el silicio mal por ×35 |

Solo el Exp 3 (benchmark escalonado, la tabla grande) y el Exp 4 (oscilaciones, cualitativo) están
alineados con los datos vigentes.

**Diagnóstico:** el cuerpo del ensayo quedó congelado en cifras de una corrida *anterior* del
laboratorio. El `README` se actualizó tras re-ejecutar los experimentos; el ensayo no. El resultado
es que el documento que se va a entregar **se contradice con su propio anexo de evidencia**. Si el
profesor abre un solo CSV —o simplemente compara ensayo y README— la afirmación de rigor empírico
se desmorona, y con ella el argumento entero.

Esto es **P0 y es de una hora de trabajo**: re-leer los 4 CSV y sincronizar las cuatro frases.
Sugerencia adicional: en vez de teclear las cifras a mano, que el script que genera los gráficos
emita también un pequeño `.md`/`.json` de «cifras citables» y copiar de ahí, para que esto no vuelva
a desincronizarse.

---

## 3. Aparato de citas y bibliografía 🔴

La consigna evalúa explícitamente «citar/referenciar textos que soporten las ideas». La bibliografía
actual está **rota en las dos direcciones**:

### 3.1 Autores citados en el cuerpo que **faltan** en la bibliografía (5)

| Autor citado | Dónde | Peso en el argumento |
|---|---|---|
| **von Neumann (1945)** | l. 29, 81 (4 menciones) | El «cuello de botella de Von Neumann» es concepto estructural de todo §1 y §3 |
| **Turing** | l. 27, 123 (2×) | «Equivalencia de Turing» y «paradigma de Turing» sostienen la premisa de partida |
| **Landauer** | l. 83 | El «Principio de Landauer» es el **único** argumento físico de sustrato genuino del ensayo |
| **Zeki (1992)** | l. 17, 48 (2×) | Base del Experimento 1 (jerarquía retinotópica) |
| **Greenwood y Garfinkel (2024)** | l. 57 | Fuente de la diversidad neuroquímica en §3 |

Que falten von Neumann, Turing y Landauer es especialmente grave: son los tres nombres sobre los que
descansa la parte *físicamente* seria del argumento, y ninguno tiene entrada.

### 3.2 Referencias en la bibliografía que **nunca se citan** en el cuerpo (2)

- **Chalmers (1995)**, *Absent Qualia, Fading Qualia, Dancing Qualia* — entrada fantasma.
- **Bechtel, Mandik & Mundale (2001)**, *Philosophy Meets the Neurosciences* — entrada fantasma
  (además duplica a Daugman 2001, que sí se cita y pertenece a ese mismo volumen).

Referencias no citadas leen como «relleno bibliográfico» y restan, no suman. Chalmers, encima, es una
pérdida: su argumento de los *dancing/fading qualia* es **precisamente** la objeción funcionalista más
fuerte contra la tesis del ensayo (si sustituyes neuronas por chips funcionalmente idénticos, los
qualia no deberían «desvanecerse»). Está citado en la bibliografía pero **el ensayo nunca lo enfrenta**
—debería, en el cuerpo, y sería la mejor forma de blindar §4 (ver §4.4 abajo).

### 3.3 Calidad de las fuentes

Tres de las citas empíricas centrales —Hinton (1992), Quian Quiroga et al. (2013), Webb (1996)— son
artículos de ***Scientific American***, es decir divulgación, no fuente primaria de investigación.
Para un seminario de filosofía de las neurociencias conviene anclar al menos una de ellas en el paper
técnico original (p. ej., Quian Quiroga et al. 2005 en *Nature* para las «concept cells»; Webb 1995
en *Nature* para el grillo robótico). No es descalificador, pero un lector exigente lo notará.

---

## 4. Crítica filosófica de fondo 🟠

Más allá del cumplimiento formal, hay tensiones argumentales que un profesor de filosofía —no de
ingeniería— va a presionar. Son las que separan un ensayo notable de uno sobresaliente.

### 4.1 El salto energía → ontología es el eslabón débil (y el ensayo lo sabe)

El texto declara con lucidez que **evita** «equiparar ineficiencia energética con imposibilidad
ontológica absoluta» (l. 21). Pero en §4 hace exactamente ese movimiento por la puerta de atrás: de
la brecha de 10⁴× concluye que el sustrato es «ontológicamente constitutivo» de la conciencia (l. 91)
y que el silicio «carece de la semántica existencial» (l. 99). **El benchmark mide eficiencia; la
conclusión es sobre qualia. Son magnitudes ortogonales.** Ninguna cantidad de julios por spike
implica, por sí sola, presencia o ausencia de experiencia. El ensayo necesita o bien (a) un puente
argumental explícito entre eficiencia y fenomenología, o bien (b) rebajar la conclusión de §4 a un
límite *práctico/de ingeniería* y dejar la tesis ontológica como conjetura señalada, no demostrada.
Tal como está, la sección más fuerte en datos sostiene la conclusión más débil en lógica.

### 4.2 El benchmark peticiona parcialmente la conclusión

La nota metodológica es honesta hasta el riesgo: «el programa **no** optimiza la simulación para ser
rápida… se ejecuta exactamente como una red de silicio típica correría» (l. 79). Un crítico
responderá: medir una simulación de Von Neumann *deliberadamente no optimizada* y concluir que «el
silicio» es ineficiente roza la **petición de principio**. Las penalizaciones ×10 (PCIe) y ×100
(GIL/DDR) del multi-GPU e híbrido no son leyes físicas: son consecuencias de decisiones de
implementación (bus, intérprete, topología). El único límite verdaderamente *de sustrato* —invariante
a la implementación— es **Landauer**, y está despachado en una sola frase (l. 83). Paradoja del
ensayo: **entierra su argumento físico más sólido y deja que las cifras auto-infligidas del benchmark
lleven el peso retórico.** Recomendación: subir Landauer a primer plano y presentar el benchmark como
*ilustración* del cuello de botella de Von Neumann, no como *prueba* de un límite del silicio *qua*
materia. La distinción clásico/neuromórfico (Loihi, memristores) que el ensayo ya hace (l. 21, 35)
mitiga esto, pero conviene reforzarla justo donde el benchmark es más agresivo.

### 4.3 «Coste energético cero» es físicamente falso

En l. 83 el carbono computa «a coste energético cero» y acto seguido, entre paréntesis, se admite que
la bomba ATPasa tiene «un costo biológico dinámico». Es una contradicción en la misma oración, y la
propia tabla del ensayo asigna E carbono > 0 en cada fila (y el `meta.json` fija 1,65·10⁻⁹ J/spike).
El cerebro es célebre por consumir ~20 W: no es gratis, es *eficiente*. Sustituir «coste cero» por
«coste órdenes de magnitud menor y aproximadamente invariante a la escala» conserva la fuerza del
argumento sin la falsedad física que un evaluador subrayará.

### 4.4 El funcionalismo se combate en su versión débil

Putnam y Fodor se plantean como el rival (l. 13), pero el ensayo nunca confronta la réplica
funcionalista obvia: la realizabilidad múltiple **predice** que las propiedades de implementación
(energía, velocidad, calor) varíen entre sustratos —eso es justamente lo que significa que solo
importe la organización funcional—. Mostrar que el silicio es más lento y más caliente **no toca** la
tesis de Putnam; él respondería «claro, la realización física difiere, ese es el punto». Para que la
crítica muerda hay que atacar la *organización funcional* misma (¿puede el silicio digital replicar la
dinámica continua, no la I/O?), y ahí es donde entran Chalmers (§3.2) y el argumento de los qualia
danzantes. **El ensayo tiene la munición en la bibliografía y no la dispara.**

### 4.5 Andy Clark está usado a contrapelo

§5 invoca la mente extendida de Clark para conceder que el silicio «andamia» pero no «origina»
(l. 115). Pero Clark (con Chalmers, en *The Extended Mind*) es un **funcionalista de manual**: su
principio de paridad dice que si un proceso externo cumple el rol funcional, es parte de la mente
—sustrato indiferente—. Apoyarse en Clark para defender un **esencialismo del carbono** es usarlo
contra sus propios compromisos. No es un error fatal (se puede tomar la fenomenología de Clark y
resistir su funcionalismo), pero el ensayo debería **reconocer esa tensión** explícitamente en lugar
de presentar a Clark como aliado natural.

### 4.6 La autopoiesis carga demasiado peso sobre muy pocas líneas

El núcleo ontológico —«la vulnerabilidad homeostática que empuja a un organismo vivo a sentir el
mundo» (l. 99)— es la idea más original del ensayo (linaje Varela/Thompson, enactivismo). Pero se
enuncia en dos frases y sostiene toda la conclusión metafísica. O se desarrolla (aunque sea con una
cita a la neurofenomenología de Varela posterior a 1974), o se marca con más humildad epistémica como
la conjetura que es. Ahora mismo la afirmación más fuerte del ensayo es también la menos apoyada.

### 4.7 «Neurona de la abuela»: matiz aplanado

Quian Quiroga es explícito en que las *concept cells* **no** son literalmente neuronas-abuela únicas;
la codificación es esparcida *pero distribuida*. El ensayo (l. 43) se apoya en la lectura fuerte
(«disparo de una fracción minúscula»), que es la que el propio autor citado matiza. Una cláusula de
media línea evita que un lector informado lo señale.

---

## 5. Estructura, estilo y presentación 🟠

- **5.1 Enlaces de desarrollo incrustados (P1).** El cuerpo contiene **12** enlaces `file:///workspace/…`
  y uno a `http://localhost:8000` (l. 7, 33, 48, 49, 59, 79, 81, 83, 85, 97, 111…). No resuelven para
  nadie que no sea tú en esta máquina. En un PDF/Word entregable son ruido; hay que sustituirlos por
  «(ver Figura N, anexo)» con figuras numeradas, o por un URL público único si se despliega el Next.js.
- **5.2 Conclusión que introduce material nuevo.** La **falacia mereológica** de Bennett y Hacker
  (l. 123) aparece por primera vez en la conclusión. Es un cierre elegante, pero metodológicamente una
  conclusión debe *sintetizar*, no abrir un frente nuevo. O se siembra antes (encaja natural en §4,
  junto a la crítica al «cerebro aislado»), o se convierte en una frase de síntesis sin presentarla
  como argumento inédito.
- **5.3 Densidad tipográfica.** Abundan negritas, cursivas y mayúsculas enfáticas («DELIBERADA»,
  «NO escala», «PC de sobra»). En dosis altas restan seriedad académica y delatan registro de
  divulgación/marketing. Recomiendo reducir el énfasis tipográfico ~a la mitad.
- **5.4 Cabecera con metadatos de anexo.** El bloque «Anexo de Laboratorio: [reproducir…] |
  [Dashboard…]» (l. 7) es apropiado para el `README`, no para la primera línea del ensayo.

---

## 6. Lo que está bien (para no perderlo al recortar)

Un recorte agresivo puede dañar las fortalezas reales. Conservar:

- La **tesis personal** sintaxis-cognitiva / semántica-existencial (l. 99) — es genuina y defendible.
- El **hallazgo de no-monotonicidad** de la brecha (l. 85) — es el resultado más interesante del
  laboratorio y el más original filosóficamente; merece sobrevivir al recorte de §3.
- La **distinción clásico vs. neuromórfico** (l. 21) — es lo que salva al ensayo de la caricatura
  «silicio malo, carbono bueno» y demuestra madurez.
- El **anexo computacional** en sí — ningún compañero lo tendrá; es el diferencial de la nota.

---

## 7. Plan de acción priorizado

**P0 — imprescindible antes de entregar (bloquean la nota):**
1. **Recortar a ≤2000 palabras.** Objetivo ~1810 de prosa. El 60 % del recorte sale de §3
   (eliminar la narración tier-por-tier de l. 79; la tabla ya lo dice). Ver presupuesto en §1.1.
2. **Sincronizar las 4 cifras erróneas** (Exp 1, 2, 5, 6) con los CSV vigentes. Ver tabla en §2.
3. **Reparar la bibliografía:** añadir von Neumann (1945), Turing, Landauer, Zeki (1992),
   Greenwood & Garfinkel (2024); eliminar o citar en el cuerpo a Chalmers y a Bechtel/Mandik/Mundale.

**P1 — sube la nota de notable a sobresaliente:**
4. Quitar los 12 enlaces `file:///`/`localhost`; numerar figuras.
5. Reformular §4: o construir el puente energía→ontología, o rebajar la tesis ontológica a conjetura
   señalada. Subir **Landauer** a primer plano como el argumento físico de sustrato.
6. Enfrentar a **Chalmers** (qualia danzantes) y reconocer la tensión con el funcionalismo de **Clark**.
7. Corregir «coste energético cero» → «coste órdenes de magnitud menor e invariante a la escala».

**P2 — pulido:**
8. Elegir una sola espina dorsal y subordinar los 6 experimentos a ella (mitiga la dispersión temática).
9. Anclar 1–2 citas de *Scientific American* en su paper primario.
10. Reducir énfasis tipográfico; mover la falacia mereológica desde la conclusión hacia §4.

---

*Síntesis: el contenido y el anexo son de alto nivel; lo que falla es la disciplina de entrega —longitud,
sincronía de datos y aparato de citas—. Los tres P0 son mecánicos y caben en una tarde. Hechos esos,
el ensayo pasa de «no entregable» a «competitivo»; los P1 filosóficos son los que lo llevarían a la
franja alta.*
