# Crítica brutal — «¿Silicio o Tejido?» (ensayo) y «El sustrato no es neutral» (tesis)

> ⚠️ **DOCUMENTO HISTÓRICO (14-jul-2026).** Lectura adversarial de una versión **anterior y
> abandonada** del trabajo («¿Silicio o Tejido?» / «El sustrato no es neutral»), de tesis
> energética. Sus referencias de línea apuntan a archivos que desde entonces se reescribieron por
> completo. **No describe el ensayo vigente.** Se conserva porque su diagnóstico es parte de la
> razón por la que la tesis cambió. Gobierna `ensayo/00_ensayo.md`; ver `docs/refactor/decisions.md`.


> Lectura adversarial, sin cortesía. El objetivo no es celebrar el trabajo —que es bueno— sino
> encontrar dónde se rompe. Escrita como la escribiría el evaluador más hostil y competente que
> podrías encontrar: un filósofo de la mente funcionalista que además sabe de hardware.
> Fecha: 14-jul-2026. Referencias de línea a `ensayo/00_ensayo.md` y `ensayo/tesis.md`.

---

## ✅ RESOLUCIÓN (aplicada el 14-jul-2026)

Esta crítica es adversarial *a propósito*: su función es encontrar dónde se rompe el argumento. Tras
escribirla, se aplicaron a la **tesis** (`ensayo/tesis.md`) las correcciones que sí eran corregibles
sin falsear la posición del autor:

| Hallazgo | Corrección aplicada |
|---|---|
| §10.1 — error de categoría de bits (Exp 7) | Reencuadrado: el punto no es «4,7 bits > 1 bit» (un `float32` tiene 24 bits de mantisa y ganaría), sino que el estado graduado se *mantiene pasivamente* vs. representarse y recomputarse. Se preempta la objeción del float. |
| §10.2 — «332 bits / 10¹⁰⁰» con falsa precisión | Marcado como *cota ilustrativa*, no medición. |
| §10.3 — Exp 9 mide von Neumann, no silicio | Añadido reconocimiento explícito: el muro de memoria es de la arquitectura von Neumann, no del silicio *qua* materia (coherente con el caveat neuromórfico). |
| §10.4 — «512×» independiente de N | Aclarado que es *estructural*, no hallazgo empírico. |
| §10.5 — «~68×» con falsa precisión | Rebajado a estimación de orden de magnitud. |
| §13.1 — sobrepeso retórico del «104.450×» | La cifra vale como *síntoma*, no como magnitud fundamental. |
| §13.2 — «instanciar vs. aproximar» sin criterio | Se ofrece un criterio *conjetural* explícito y se admite que no es neutral. |
| §13.5 — respuesta a Chalmers ambigua | Se elige el horn sin ambigüedad: se concede la computabilidad *en principio* y se localiza la tesis como conjetura sobre el chip desacoplado de la vida. |
| §13.4 — salto autopoiesis→qualia | Se distingue *sentido* (enactivismo) de *qualia* y se marca el último paso como la conjetura central, no como conclusión heredada de Varela/Thompson. |

**Lo que NO se «corrigió» (y no debía):** las críticas estructurales de fondo —§1 (la tesis de dos
niveles como estructura ininvalidable), §4 (el laboratorio es decorativo para lo ontológico), §7 (Webb
desplaza el criterio del carbono a la autopoiesis)— no son errores a tapar: son la *tensión real* del
proyecto. La tesis revisada las asume más explícitamente (marca la parte ontológica como conjetura
fundada, no demostrada) en vez de disimularlas. Publicar esta crítica es parte del método abierto: el
lector ve el argumento *y* su punto más débil.

> El resto del documento conserva el diagnóstico adversarial íntegro.

---

## Veredicto de una frase

Es un trabajo honesto, culto y técnicamente ambicioso que **demuestra con gran aparato algo que
nadie discute** (simular neuronas en silicio von Neumann es caro) y **afirma sin demostrar lo único
que estaba en disputa** (que la vida es constitutiva de la conciencia). La honestidad con que admite
esa brecha es su mayor virtud y, a la vez, la prueba de que la tesis fuerte se evapora.

---

## 1. El problema estructural: la tesis está diseñada para no poder perder

La arquitectura de "dos niveles" —**práctico** (demostrado) y **ontológico** (conjetura que *no se
sigue*)— se presenta como escrúpulo epistémico (tesis l. 22-26; ensayo l. 15). Léela de nuevo como
lo que operativamente es: **un cortafuegos retórico**. Toda objeción a la tesis ontológica se
desactiva con "ya dije que era solo una conjetura"; toda acusación de trivialidad contra la práctica
se desactiva con "pero lo interesante es la ontología". El texto **nunca puede ser refutado porque
siempre tiene el otro nivel donde replegarse**. Eso no es rigor: es un argumento construido para ser
*ininvalidable*, que es lo contrario de ser *verdadero*. Un teorema se arriesga; esta tesis se blinda.

La prueba está en la propia Parte IV ("Objeciones, límites y honestidad", tesis l. 126-138), la
sección más lúcida y más autodestructiva. Enumera cuatro objeciones —(1) aproximación digital,
(2) escapatoria neuromórfica, (3) ortogonalidad, (4) falacia mereológica— y "responde" a las cuatro
**retirándose** al mismo reducto: "mi blanco es solo el silicio digital de Von Neumann + la conjetura
autopoiética". Tras las cuatro retiradas, lo que queda en pie es: *"la simulación von Neumann no
optimizada de neuronas es ineficiente, y quizá la vida sea necesaria para la conciencia (sin probar)."*
El primer conjunto es incontestado y aburrido; el segundo es la pregunta entera, sin responder.

---

## 2. La distinción que carga todo el peso —"instanciar vs. aproximar"— nunca se define

Todo el paso de lo material a lo ontológico depende de una frase (tesis l. 102): la pregunta deja de
ser "¿puede el silicio computar la función?" y pasa a ser "¿puede *instanciar la misma organización*
o solo *aproximar su E/S desde afuera*?". **Esa distinción es el gozne de la tesis y jamás se define.**

¿Qué *es* "la organización" si no es la estructura causal/funcional? Si dos sistemas son
E/S-equivalentes a todo grano relevante, ¿en qué sentido no comparten la organización? El texto
nunca da un criterio: solo rebautiza "lo que al silicio le falta" como "la organización que no se
instancia". El funcionalista responde en una línea: *"acabas de renombrar aquello que te importa
como 'lo que el silicio no tiene' — eso es petición de principio."* Sin un criterio operativo de
"instanciar ≠ aproximar" que no presuponga la conclusión, la Parte III no tiene fundamento; tiene
vocabulario.

---

## 3. El desplazamiento de la carga de la prueba (Parte I) es un truco de manos

El movimiento más listo del trabajo (tesis l. 36-44): el laboratorio muestra que el "residuo" de la
realización no es cero ni arbitrario, luego **la carga se traslada** a quien afirme la neutralidad.
Suena fuerte; es circular. Mostrar que la *implementación* difiere (energía, calor, tiempo, memoria)
es **exactamente lo que la realizabilidad múltiple predice y autoriza** —ese es el sentido de que
"solo importe la organización"—. Todo el "residuo" que mide el laboratorio está del lado de la
implementación. Para trasladar la carga habría que mostrar que el residuo toca la *organización*, y
eso es justo lo que se asume sin argumento: los tres ejes nuevos (variabilidad, intercambio, I/O) se
declaran "candidatos a ser constitutivos" (tesis l. 102) y **un candidato no es una premisa**. La
carga no se ha movido; se ha reetiquetado.

---

## 4. El laboratorio es decorativo para lo que importa —y el autor lo confiesa

El texto repite, con mérito, que "eficiencia y fenomenología son ortogonales" y que "nada en la
Parte II demuestra la Parte III" (tesis l. 100, 134; ensayo l. 89). Tómalo en serio y mira lo que
implica: **el 80 % del proyecto —9 experimentos, 4 tiers, 104.450×, 128 MB de biofísica— está al
servicio de una tesis que, por admisión propia, no puede sostener.** O el laboratorio hace un trabajo
retórico que no debería (vestir una conjetura filosófica con autoridad cuantitativa —justo el
"benchmark disfrazado de metafísica" que el autor dice evitar, tesis l. 144—), o es honestamente
irrelevante a la conclusión ontológica, y entonces ¿por qué es el grueso del trabajo?

La fórmula "la ingeniería fija cotas, la filosofía hace inferencias" (tesis l. 44) suena a división
del trabajo pero es una coartada: **la cota que fija la ingeniería (silicio ineficiente) no es
premisa de ninguna inferencia filosófica del texto.** La inferencia ontológica corre por la
autopoiesis, que no necesita —ni usa— una sola cifra del laboratorio. Se podría borrar `simulaciones/`
entero y la Parte III quedaría idéntica. Eso debería alarmar al autor.

---

## 5. El benchmark está amañado, y la franqueza sobre ello no lo rescata

"Se ejecuta *deliberadamente sin optimizar*, como correría una red de silicio típica" (tesis l. 42,
90; ensayo l. 60). Esto es **petición de principio disfrazada de candor metodológico**. Las
penalizaciones ×10 (PCIe) y ×100 (GIL/DDR) del multi-GPU e híbrido **no son leyes físicas del
silicio**: son consecuencias de elegir Python (¡el GIL!), CUDA sobre PCIe Gen3 y una topología
concreta. La "no-monotonicidad" que se presenta como hallazgo filosóficamente profundo (tesis l. 42,
90-92; ensayo l. 73) es, sin adornos: *"cuando cruzo las fronteras de hardware que yo mismo elegí, mi
código no optimizado se ralentiza a saltos."* Llamar a eso "ineficiencia arquitectónica hecha
físicamente visible" es **reificar una contingencia de implementación** —exactamente el pecado que el
ensayo denuncia en Daugman (la metáfora de época tomada por ontología)—.

El autor concede que el número es "una cota superior de una comparación deliberadamente desfavorable
al silicio" (tesis l. 92). Traducción: **la cifra estrella (104.450×) es, por confesión propia, un
artefacto sin valor probatorio sobre el silicio *qua* materia.** Una implementación decente en CUDA,
o un chip in-memory, colapsaría esos órdenes de magnitud. El benchmark no mide el silicio; mide una
mala implementación del silicio, elegida para perder.

---

## 6. Landauer: la única carta física genuina resulta ser un empate —y eso hunde la tesis material

El texto identifica correctamente el principio de Landauer como el único límite *invariante al
sustrato* (tesis l. 76; ensayo l. 81) y admite que tanto el silicio (~10⁻¹⁵ J/op) como el carbono
(~10⁻⁹ J/spike) están 6-12 órdenes de magnitud por encima del piso —"Landauer no favorece a
ninguno"—. El autor lo presenta como matiz sofisticado. **Es un autogol.** Si el *único* principio
físico fundamental no distingue carbono de silicio, entonces toda la distinción vive en el nivel
*arquitectónico* —contingente, ingenierizable, optimizable—, que es precisamente el terreno del
funcionalista. La tesis se titula "el sustrato no es neutral" pero su propio análisis físico concluye
que, en lo fundamental, **el sustrato es neutral** y toda la acción está en la arquitectura. El título
contradice el argumento.

---

## 7. El grillo de Webb no es un matiz: es una bomba bajo la línea de flotación

El texto admite (tesis l. 122; ensayo l. 109) que el tubo de desfase del grillo robot es **materia no
viva y sin embargo cognitivamente constitutiva**, y pivota: "luego lo decisivo no es el carbono sino
la autopoiesis". Ese pivote es fatal para el laboratorio entero. **Ninguno de los 9 experimentos mide
autopoiesis.** Todos miden diferencias *materiales* carbono-vs-silicio (energía, variabilidad, ancho
de banda, oscilaciones). Si el criterio real es la auto-producción de la frontera, entonces:

- un sistema de carbono *no* autopoiético (el tubo del grillo, un organoide, una neurona muerta en
  cultivo) **falla** el criterio pese a ser carbono;
- un hipotético silicio autopoiético **lo pasa** pese a ser silicio.

Conclusión: **la tesis no trata del carbono, y los 128 MB de biofísica responden a la pregunta
equivocada.** El autor ha construido un laboratorio exquisito sobre el eje material y luego ha movido
la meta al eje organizacional, donde el laboratorio no mide nada. O el laboratorio es sobre el
carbono (y entonces Webb lo refuta), o la tesis es sobre la autopoiesis (y entonces el laboratorio
sobra). No puede ser ambas.

---

## 8. La respuesta a Chalmers cambia de tema y se contradice con una premisa que el autor renunció

La réplica a los *qualia danzantes* (tesis l. 106-108): el isomorfo de grano fino "tendría que
replicar la variabilidad graduada, el intercambio pasivo y la entrega volumétrica —y entonces ya no
es 'lo mismo en otro sustrato', es otro sistema físico—". Pero el experimento mental de Chalmers
**estipula** el isomorfismo funcional al grano relevante. La réplica equivale a *"niego que el
isomorfismo funcional sea posible sin replicar la física"*, lo que se bifurca:

- **(a)** si concedes que el isomorfismo *es* posible en principio (y el autor lo concede
  explícitamente: "no afirmo que esa organización sea no-computable en principio", tesis l. 108,
  130) → entonces los qualia danzantes **muerden** y no hay respuesta;
- **(b)** si niegas que sea posible → estás afirmando que la física relevante **no es funcionalmente
  caracterizable**, una tesis fuerte de no-computabilidad que el autor **renunció por escrito**.

No puedes renunciar a la premisa de no-computabilidad *y* usarla para contestar a Chalmers. Elige una.
Tal como está, la respuesta a la objeción más fuerte del ensayo se apoya en una premisa que el propio
ensayo declara no sostener.

---

## 9. La autopoiesis nunca gana su peso ontológico: es el salto explicativo, con bata de laboratorio

El núcleo (tesis l. 110-116; ensayo l. 91, 98): un sistema autopoiético es precario, debe
auto-producirse, luego "hay cosas buenas y malas *para él*", luego *sentir*, luego qualia. **Cada
"luego" de esa cadena es el problema difícil, no su solución.** Que un sistema tenga normatividad
biológica (valencia, self-concern) porque es precario es una tesis enactivista defendible sobre el
*sentido*/la *intencionalidad*. El salto de ahí a la *experiencia fenoménica* (qualia) es **exactamente
la brecha explicativa** que el trabajo dice respetar en todas partes menos aquí, donde la cruza al
amparo de la autoridad de Varela y Thompson. Y es tramposo invocarlos: **Thompson es escrupuloso en
*Mind in Life* sobre que la autopoiesis da cuenta del *sentido*, no del *qualia*;** el enactivismo
serio no cierra la brecha, la reencuadra. El ensayo toma la conclusión que le conviene y le pone
nombre propio de bibliografía. La afirmación más fuerte del trabajo es también la única sin un solo
argumento propio: es una cita con entonación de tesis.

---

## 10. Errores técnicos concretos que un evaluador con background cuantitativo va a cazar

**10.1 — La comparación de bits (Exp 7) se dispara en el pie.** La tesis (l. 64, 66) contrasta "1 bit
por señalización binaria del silicio" con "4,7 bits por sinapsis del carbono (Bartol 2015)". Esto
mezcla dos cosas incomparables: los **4,7 bits de Bartol** miden la *precisión del peso sináptico
almacenado* (26 estados de tamaño distinguibles), no la entropía de señalización por ciclo. El "1 bit"
del silicio es *spike/no-spike por ciclo*. Comparar precisión-de-peso-almacenado (carbono) con
conmutación-binaria-por-ciclo (silicio) es peras con manzanas —y **tomado al pie de la letra,
backfire**: un peso `float32` en silicio tiene 24 bits de mantisa, o sea que *por la propia métrica
del ensayo el silicio gana 24 a 4,7*. La analogía correcta de la precisión sináptica es la precisión
numérica del peso, donde el silicio no pierde. Usar la medición real de Bartol para lavar esta
confusión le presta credibilidad de dato a un error de categoría.

**10.2 — Los "332 bits / 10¹⁰⁰ configuraciones moduladoras" (Exp 7) son combinatoria inventada con
falsa precisión.** log₂(10¹⁰⁰)=332 es trivialmente cierto, pero "100 neuromoduladores en 10 niveles
graduados" es un escenario *fabricado*, no un hecho medido. Colocarlo junto al 4,7 de Bartol (real)
contamina la especulación con el prestigio de la medición. Un evaluador lo lee como cifra dura; no lo
es.

**10.3 — Exp 9 (el "más decisivo") mide von Neumann, no silicio.** El "mover un dato cuesta 650×
computarlo, 99,8 % de la energía es tráfico" (Horowitz 2014; tesis l. 76) es un hecho **de la
arquitectura digital de memoria separada (el 'muro de memoria')**, no del "silicio *qua*
electrones-que-empujar". El cómputo *in-memory* y el neuromórfico existen precisamente para matar el
muro de memoria. Es decir: el eje que la tesis declara "el más fuerte de los nuevos" (l. 70) vuelve a
medir la arquitectura que el propio autor excluyó de su blanco (l. 132). El caveat clásico/neuromórfico
desarma el experimento estrella.

**10.4 — Exp 5 y la memoria "512×": el resultado es independiente de N.** La memoria de backprop y de
STDP escalan *ambas* linealmente en N (`memoria = N·k`), así que el ratio 512× **no depende del tamaño
de la red**; la mención de "5.000 neuronas" es cosmética. Peor: los 20.000 KB de backprop asumen
`batch=128, 4 capas, act+grad`, parámetros elegidos a mano. El "512×" no es un descubrimiento, es una
razón entre dos fórmulas que el autor parametrizó. Presentarlo como medición empírica ("el laboratorio
muestra") infla su estatus.

**10.5 — La "brecha 3D/2D de ~68×" (Exp 8) descansa en N^(1/6).** El cociente de longitud de cable
2D/3D como N^(1/6) es una estimación de servilleta con supuestos ocultos (fan-out uniforme, sin regla
de Rent —que el propio texto admite ignorar, l. 84—). "~68×" tiene dos cifras significativas que el
método no soporta. Es orden-de-magnitud como mucho, presentado como medida.

---

## 11. Retórica: los remates aforísticos aterrizan justo donde falta la premisa

Ambos textos —la tesis menos que el ensayo— sustituyen argumento por cadencia en los momentos
críticos. "Los cables difícilmente superarán a los sistemas circulatorios" (tesis l. 80); "el silicio
no está vivo, y por eso no tiene nada que perder" (tesis l. 114); "el silicio andamia; no origina en
aislamiento" (l. 122); "una propiedad intrínseca de la dinámica material de la vida" (ensayo l. 117).
Son **eslóganes, no premisas**. El patrón es diagnóstico: cada floritura de cierre de sección cae
exactamente donde el argumento es más delgado. Cuando un texto es más bonito justo donde es más débil,
la belleza está tapando el hueco.

---

## 12. Lo que impide que esto sea un desastre (para que el recorte no lo destruya)

En justicia adversarial, hay que decir qué **sí** aguanta un ataque:

- **La honestidad estructural es real y rara.** Separar lo demostrado de lo conjeturado, y marcar
  dónde se detiene el argumento (tesis l. 138), es más de lo que hacen la mayoría de las tesis. El
  problema no es que mienta; es que la honestidad revela un centro vacío.
- **La observación de no-monotonicidad**, despojada de su sobreinterpretación filosófica, es un dato
  curioso de sistemas.
- **El marco enactivista** (precariedad → normatividad → sentido) es defendible *hasta* el qualia; el
  error es cruzar esa última frontera sin avisar.
- **La distinción clásico/neuromórfico** salva al trabajo de la caricatura "carbono bueno, silicio
  malo" —pero, usada en serio, también desarma medio laboratorio (§5, §10.3)—.

---

## 13. Qué haría con esto (si el objetivo fuera la nota máxima, no la comodidad)

1. **Deja de fingir que el laboratorio sostiene la ontología.** Recolócalo explícitamente como lo que
   es: una *ilustración* del muro de von Neumann y de la divergencia de implementación. Baja el
   tamaño de fuente del "104.450×" y sube el de la confesión de que es una cota amañada.
2. **Ataca de frente el flanco funcionalista** en vez de rodearlo: o das un criterio de "instanciar ≠
   aproximar" que no presuponga la conclusión, o admites que no lo tienes y reduces la tesis a
   "sospecha bien fundada". La segunda opción es más fuerte porque es defendible.
3. **Arregla los errores de categoría cuantitativos** (§10.1, §10.3) antes de que un lector técnico los
   use para desacreditar todo el aparato. Un solo error de bits float32 vs sináptico y el evaluador
   duda de las nueve cifras.
4. **Desarrolla la autopoiesis→qualia o recórtala a conjetura marcada.** Ahora mismo es la afirmación
   más fuerte y la menos argumentada. O le das tres párrafos propios (no citas), o la bajas de "núcleo
   de la tesis" a "dirección de investigación".
5. **Enfrenta a Chalmers de verdad:** decide si sostienes o no la no-computabilidad de la organización
   relevante, y vive con la consecuencia. La respuesta actual quiere las dos.

---

*Síntesis brutal: no es un mal trabajo —es un trabajo bueno cuya honestidad demuestra que su tesis
central no está probada, y cuyo espléndido laboratorio mide, con precisión de cinco cifras, algo que
no es lo que la tesis necesita. La distancia entre "el silicio von Neumann no optimizado es ineficiente"
y "la vida es constitutiva de la conciencia" es un abismo, y el puente que el autor tiende sobre él
—la autopoiesis— está dibujado, no construido. Lo mejor del trabajo es que lo dice. Lo peor es que,
habiéndolo dicho, sigue cobrando la entrada como si hubiera cruzado.*
