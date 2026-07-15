# Auditoría del laboratorio: los 10 experimentos y el benchmark

> **Estatus:** auditoría independiente ejecutada el 15-jul-2026 contra el código y los CSV del repo.
> Todas las cifras de este documento fueron **recomputadas por el auditor** desde
> `simulaciones/*.py` y `simulaciones/datos/*.csv`; no se aceptó ninguna cifra publicada sin
> reproducirla. Las referencias son `archivo:línea`.
>
> **Gobierna `ensayo/00_ensayo.md`.** El ensayo sólo usa el laboratorio en §4, y sólo como
> autocrítica. Esta auditoría existe para justificar esa decisión con el detalle que el texto no
> puede llevar.

---

## Tabla-resumen

| # | Qué se publicó | Clasificación epistémica | ¿Construido por definición? | ¿Coincide con el CSV? | Veredicto |
|---|---|---|---|---|---|
| **1** | Grafo local ahorra **90 %** de FLOPs | cálculo ilustrativo | **Sí** — el cociente *es* `1 − P_CONEXION` | Sí (89,98 %; 90,000008 % sin sesgos) | Conservar reencuadrado |
| **2** | Crosstalk **80,0 % → 1,03 %** | cálculo ilustrativo (Monte Carlo de una identidad) | **Sí** — E[solapamiento] = *p* para Bernoulli(*p*) | Sí (79,999 % / 1,0291 %) | Conservar reencuadrado |
| **3** | Coste por canal neuroquímico | **resultado no concluyente** | **Sí** (FLOPs); energía-carbono **fabricada** (literal `1e-11`) | Sí (los CSV reflejan el código) | **Retirar** o reescribir |
| **4** | Oscilaciones **beta–gamma emergentes (57,8 %)** | **resultado no concluyente** | Parcial: el % es artefacto del **ancho de banda** | Cifras sí; **interpretación no** | **Retirar** o rebajar |
| **5** | STDP usa **512×** menos memoria | cálculo ilustrativo | **Sí** — el ratio *es* `batch × n_capas` = 128×4 | Sí (20000/39,0625 = 512,0 exacto) | Conservar reencuadrado |
| **6** | Cuerpo de Webb ahorra **378.880×** FLOPs | cálculo ilustrativo | **Sí** (ambos lados son conteos a mano) | Sí — **pero `tiempo_ms` es literal** | **Corregir**: defecto Exp1 sin corregir |
| **7** | **25.900 bits extra** por neurona | cálculo ilustrativo | **Sí** — es `n × (4,7 − 1,0)` | Sí | Conservar como estipulación |
| **8** | Cableado 2D/3D: **68×** a escala cerebral | modelo conceptual / cálculo ilustrativo | **Sí** — es `N^(1/6)` | Sí (68,129) | Conservar como modelo |
| **9** | Mover datos cuesta **650×** computar | cálculo ilustrativo | **Sí** — es `1950/3` | Sí | Conservar (cifras de literatura) |
| **10** | κ = **0,88 / 0,00 / 0,70** | **experimento mental computacional / contraejemplo construido** | Rama «estrecha»: **sí, identidad aritmética** | **Sí — reproducido semilla a semilla** | **Conservar: es el único que trabaja** |
| **B** | Brecha silicio/carbono **3×10³ – 4×10⁵** | **benchmark dependiente de implementación** | No — única medición genuina | Sí (columnas derivadas verificadas) | Conservar con la cota que ya lleva |

**Recuento verificado por el auditor:** de las 11 cifras publicadas, **8 son consecuencias analíticas
de constantes elegidas por el autor** (Exp 1, 2, 5, 6, 7, 8, 9 y la rama «estrecha» del Exp 10).
Dos más (Exp 3, Exp 4) no sostienen lo que se les hace decir. **La única medición empírica genuina es
el benchmark escalonado** — y su resultado, auditado, es autodestructivo (ver §B).

**Hallazgos nuevos de esta auditoría** (no estaban en el encargo, los encontré verificando):

1. **Exp 6 conserva intacto el defecto por el que se corrigió el Exp 1**: `tiempo_ms` y `energia_J`
   son literales escritos a mano (`ejecutar_experimentos.py:283,286`). Nunca se corrigieron.
2. **Exp 4 no muestra ninguna oscilación**: el pico real del espectro está en **0,5 Hz** (el bin
   más bajo), y la densidad espectral **cae monotónicamente**. El «57,8 % beta+gamma» es un
   artefacto de que esas dos bandas cubren 67 de los 150 Hz analizados.
3. **Exp 3 no simula ningún canal químico**: la neurona es idéntica en las 15 condiciones; el bucle
   «por canal» sólo incrementa un contador. El `tiempo_ms` publicado mide un `+=` de Python.
4. **La brecha del benchmark se mueve 144× sin tocar el carbono**, sólo cambiando el tier de
   hardware. Es la refutación empírica, dentro del propio laboratorio, de que mida un sustrato.

---

## Exp 1 — Jerarquía visual (Zeki)

- **Qué afirma el texto.** `web/src/lib/data.ts:47` publica `reduction: 0.9`: la conectividad local
  del córtex ahorra un 90 % de las operaciones frente a un grafo denso.
- **Qué hace el código.** `ejecutar_experimentos.py:64-87`. No construye ni ejecuta ninguna red:
  suma `2·capas[i]·capas[i+1]` con `P_CONEXION = 0.10` fijado en `:66`. El cociente que reporta es,
  hasta el término de sesgo, **exactamente `1 − P_CONEXION`**.
- **Clasificación:** cálculo ilustrativo.
- **¿Construido por definición?** **Sí, en el sentido más fuerte.** Verificado: sin los términos de
  sesgo la reducción es 90,000008 %; con ellos, 89,98 %. Escribir `P_CONEXION = 0.10` y obtener
  «90 % de ahorro» es leer la constante en voz alta.
- **¿Coincide con el CSV?** Sí. `exp1_visual.csv` = 22.154.880 / 2.218.827, reproducido exactamente.
- **Nota de auditoría.** El docstring `:48-63` ya documenta con honestidad que las columnas
  `tiempo_ms` y `energia_J` eran literales fabricados y fueron eliminadas. **La corrección es real
  y está verificada**: el CSV actual no tiene esas columnas.
- **Qué se conserva y con qué reencuadre.** La ventaja de los campos receptivos locales es real, pero
  es **algorítmica, no del carbono**: se explota en silicio desde Fukushima (1980) y LeCun et al.
  (1998). El propio docstring lo dice. Sirve como ilustración pedagógica del principio de Zeki y
  **como ejemplo de cómo una etiqueta («carbono») hace pasar por hallazgo lo que es una constante**.

## Exp 2 — Células de concepto (Quian Quiroga)

- **Qué afirma el texto.** `data.ts:48`: `crosstalk: { dense: 80.0, sparse: 1.03 }`. El código
  esparcido reduce el solapamiento entre conceptos de 80 % a ~1 %.
- **Qué hace el código.** `ejecutar_experimentos.py:92-131`. Genera vectores Bernoulli independientes
  con `pct_densa = 0.80` (`:99`) y `pct_esparcida = 0.01` (`:101`), y mide su solapamiento medio.
  Para dos vectores Bernoulli(*p*) independientes, **E[|A∩B|] / E[|A|] = p**. El experimento
  recupera por Monte Carlo el parámetro que se le dio.
- **Clasificación:** cálculo ilustrativo (Monte Carlo de una identidad).
- **¿Construido por definición?** **Sí.** Verificado sobre las 500 filas del CSV: media densa
  **79,999 %** (estipulado 80,0) y media esparcida **1,0291 %** (estipulado 1,0). El «1,03» publicado
  es ruido muestral alrededor de la constante `pct_esparcida`.
- **¿Coincide con el CSV?** Sí, exactamente.
- **Defecto adicional (nuevo).** `n_conceptos = 200` (`:96`) **es una variable muerta**: no entra en
  ningún cálculo; sólo se imprime en `:128`. El bucle compara 20 conceptos (`:112`), no 200. La
  escala anunciada («200 conceptos») no existe.
- **Qué se conserva y con qué reencuadre.** El principio de que la esparcidad reduce interferencia es
  correcto y bien establecido — y también es **sustrato-neutral**: es la razón de ser de los
  *sparse distributed representations* en silicio. Conservable sólo como visualización pedagógica.

## Exp 3 — Diversidad neuroquímica (LeDoux)

- **Qué afirma el texto.** `data.ts:49`: `chem: { min: 120000, max: 428000, channels: [1,15] }` —
  el coste en silicio crece linealmente con el número de canales químicos, mientras que en carbono
  «el coste marginal de añadir neurotransmisores es ~0» (`ejecutar_experimentos.py:163-165`).
- **Qué hace el código.** `ejecutar_experimentos.py:145-157`. **Éste es el problema:**

  ```python
  neurona = ModeloHodgkinHuxley(dt=dt)
  for _ in range(pasos):
      _, f_base = neurona.paso(10.0)   # idéntico en las 15 condiciones
      flops_paso += f_base
      for _ in range(c - 1):
          flops_paso += 22             # <-- el "canal químico" es un contador
  ```

  **No se simula ningún canal químico.** La neurona es la misma en las 15 condiciones; `n_canales`
  nunca entra en la dinámica. El bucle interno sólo incrementa un contador con la constante `22`
  elegida a mano (`:154`).
- **Clasificación:** **resultado no concluyente.** No es siquiera un cálculo ilustrativo limpio: la
  columna `tiempo_ms` **finge ser una medición del coste de los canales y mide el coste de un `+=`
  de Python**.
- **¿Construido por definición?** **Sí, doblemente.** (a) Los FLOPs crecen 22.000 por canal porque
  `22 × 1000 pasos` se escribió así: verificado, `diff(flops_totales) ≡ 22000`. (b) La columna
  `energia_carbono_J` es **el literal `1.0e-11` repetido 15 veces** (`:165`), sin fuente. No es una
  medición ni una estimación citada: es una estipulación de la conclusión.
- **¿Coincide con el CSV?** Sí — el CSV refleja fielmente el código, que es el problema.
- **Evidencia contra la propia afirmación.** Verificado: los FLOPs *contados* crecen **3,6×** de 1 a
  15 canales, pero el tiempo *medido* crece **1,07×** (2,386 → 2,581 ms; 8,2 % de variación,
  ajuste `t ≈ 0,00975·c + 2,41`). Es decir: **los propios datos del experimento contradicen la
  linealidad del coste** que el experimento afirma haber encontrado. El «coste por canal» es ruido.
- **Qué se conserva y con qué reencuadre.** **Nada cuantitativo.** La tesis de LeDoux sobre la
  diversidad neuroquímica es del seminario y se sostiene por su literatura, no por esto.
  Recomendación: **retirar el experimento** o reescribirlo como declaración conceptual sin cifras.

## Exp 4 — Oscilaciones y sincronía (Bechtel)

- **Qué afirma el texto.** `data.ts:50` publica `bands: { delta: 8.3, theta: 9.3, alpha: 11.1,
  beta: 30.3, gamma: 27.5 }`; `GammaOscillation.tsx:158,268` afirma «Oscilaciones beta–gamma
  emergentes» y «emerge actividad beta–gamma (13–80 Hz) **sin reloj externo**»; el
  `betaGammaPower` (`:51-53`) suma **57,8 %**. `CRITICA_ENSAYO.md:17` registra que ya se corrigió una
  afirmación anterior más fuerte («gamma 40 Hz» falso) a esta versión.
- **Qué hace el código.** `ejecutar_experimentos.py:177-222`: red E-I de 5000 neuronas
  (`modelos.py:149-205`), LFP = media de V, FFT sobre 2 s.
- **Clasificación:** **resultado no concluyente.** La corrección de «40 Hz» → «13–80 Hz» fue en la
  dirección correcta pero **no llegó al fondo**.
- **Qué encontré yo (hallazgo nuevo, verificado sobre `exp4_fft.csv`).** Tres cosas:
  1. **El pico dominante del espectro está en 0,5 Hz** — el bin no-DC más bajo — y el propio script
     lo imprime (`:203`). Los 10 bins de mayor potencia son los 10 más bajos (0,5 … 5,0 Hz), en
     orden monotónico decreciente: 319,46 / 319,32 / 319,08 / 318,76 / … Es un espectro tipo 1/f, no
     un pico oscilatorio. **No hay banda preferida.**
  2. **El «57,8 % beta+gamma» es un artefacto del ancho de banda.** Al normalizar por Hz, la
     densidad espectral **cae monotónicamente**: delta 637/Hz · theta 626/Hz · alpha 600/Hz ·
     beta 480/Hz · **gamma 148/Hz**. Beta y gamma «dominan» sólo porque juntas cubren 67 de los
     150 Hz analizados. Corregido por anchura, gamma es **la banda más débil de todas**.
  3. **La red está saturada, no oscilando.** Tasa de disparo verificada sobre `exp4_raster.npy`:
     **196,2 Hz por neurona**. Con el periodo refractario de 5 ms (`modelos.py:191`) el techo
     absoluto es 200 Hz: **la red corre al 98 % de su techo refractario**. Las neuronas corticales
     disparan a 1–10 Hz. Lo que se está midiendo es el ritmo del refractario impuesto por
     `I_ext ~ N(28, 3)` (`:182`), es decir, **sí hay un reloj externo**: es la corriente de entrada
     y el refractario, no una dinámica E-I emergente. (Detalle coherente: la media del LFP es
     −74,84, pegada a `V_reset = −75`, porque V se lee tras el reset: el «LFP» es casi un contador
     de spikes.)
- **¿Construido por definición?** No en el sentido de los otros; es peor: **es un artefacto de
  parámetros y de agregación por bandas** presentado como emergencia.
- **¿Coincide con el CSV?** Las cifras de banda sí (recomputé 8,3 / 9,3 / 11,1 / 30,3 / 27,5 al
  decimal). **La interpretación no.**
- **Qué se conserva y con qué reencuadre.** El punto de Bechtel sobre mecanismos oscilatorios no
  depende de esto. Recomendación: **retirar la afirmación de emergencia**. Si se conserva algo, que
  sea como visualización pedagógica de qué es un espectro de LFP, **explícitamente etiquetada como
  ilustración y no como resultado**, y con la tasa de 196 Hz declarada.

## Exp 5 — Plasticidad y aprendizaje (Hinton)

- **Qué afirma el texto.** `data.ts:51`: `learning: { backpropKB: 20000, stdpKB: 39, factor: 512 }`.
  La STDP local usa **512×** menos memoria que backpropagation.
- **Qué hace el código.** `ejecutar_experimentos.py:236-246`. No entrena nada: escribe dos fórmulas.
  `memoria_backprop_KB = N·batch·4·n_capas·2/1024`; `memoria_stdp_KB = N·4·2/1024`.
- **Clasificación:** cálculo ilustrativo.
- **¿Construido por definición?** **Sí, y es demostrable en una línea.** El cociente es

  ```
  (N·batch·4·n_capas·2) / (N·4·2)  =  batch × n_capas  =  128 × 4  =  512
  ```

  **N se cancela.** El «512×» no depende del tamaño de la red: es el producto de dos constantes
  elegidas en `:234-235`. Con `batch = 64` el resultado sería 256×; con `batch = 256`, 1024×.
  Verificado numéricamente: 20000 / 39,0625 = **512,0 exacto** (no aproximado — es aritmética).
- **¿Coincide con el CSV?** Sí, exactamente.
- **Lo que el texto no reporta (hallazgo).** El mismo CSV publica los FLOPs: backprop 2,0×10⁸ vs
  STDP 1,875×10⁸. El cociente es **1,067×** — un empate. La comparación de cómputo, que está en el
  mismo experimento, **no muestra ninguna ventaja** y no se publica en la web. Se publica sólo el eje
  favorable.
- **Qué se conserva y con qué reencuadre.** El contraste local/global de la regla de aprendizaje es
  real y es el punto de Hinton (1992). Pero es **una diferencia entre dos algoritmos, ambos
  ejecutables en silicio** — la STDP es el fundamento del hardware neuromórfico (Loihi, SpiNNaker),
  que es silicio. Etiquetar STDP «carbono» y backprop «silicio» **es la etiqueta haciendo el
  trabajo**. Conservable como ilustración del coste de memoria de las reglas no-locales.

## Exp 6 — Computación morfológica (Webb)

- **Qué afirma el texto.** `data.ts:52`: `morphology: { disembodied: 757760, embodied: 2 }` — el
  tubo de desfase del grillo de Webb sustituye 757.760 FLOPs por 2 (**378.880×**).
- **Qué hace el código.** `ejecutar_experimentos.py:275-309`. Cuenta FLOPs de una FFT hipotética
  (`tam_fft = 4096`, `:278`) y **estipula** `flops_corporizado = 2` (`:285`). Ninguno de los dos
  modelos se ejecuta.
- **Clasificación:** cálculo ilustrativo.
- **¿Construido por definición?** **Sí, en ambos lados.** El numerador es una fórmula de coste de
  Cooley-Tukey con un factor `5` puesto a mano (`:279`); el denominador es el literal `2`. El
  «378.880×» es el cociente de dos números escritos por el autor.
- **¿Coincide con el CSV?** Los FLOPs sí (757.760 / 2, reproducido). **Pero:**
- **⚠ HALLAZGO NUEVO — el defecto del Exp 1 sigue vivo aquí, sin corregir.** `exp6_morfologia.csv`
  publica columnas `tiempo_ms` y `energia_J`:

  ```python
  tiempo_desencarnado_ms = 0.85     # ejecutar_experimentos.py:283  <-- literal a mano
  tiempo_corporizado_ms = 0.0001    # ejecutar_experimentos.py:286  <-- literal a mano
  ...
  "energia_J": (tiempo_desencarnado_ms / 1000.0) * POTENCIA_PC_W,   # derivada del literal
  ```

  **Es exactamente el defecto por el que se corrigió el Exp 1**: tiempos fabricados publicados como
  medición, con la energía derivada de ellos. La auditoría del 15-jul-2026 limpió el Exp 1 y **no
  tocó el Exp 6**. Las columnas `tiempo_ms` y `energia_J` de `exp6_morfologia.csv` **deben
  eliminarse igual que las del Exp 1**, y por la misma razón. Este experimento no ejecuta nada: no
  puede reportar tiempo ni energía.
- **Qué se conserva y con qué reencuadre.** **El contenido filosófico del Exp 6 es el más valioso del
  laboratorio, y no necesita ninguna de sus cifras.** El grillo de Webb (1996) es el ejemplo que el
  ensayo usa en §2 (`00_ensayo.md:40`): el tubo de desfase es **materia no viva y sin embargo
  cognitivamente constitutiva** — la frontera del sujeto no es un dato. Ese punto es cualitativo y
  se sostiene con la cita, no con «378.880×». Conservar la idea, **retirar las cifras**.

## Exp 7 — Variabilidad / espacio de estados

- **Qué afirma el texto.** `analisis_cientifico.md:79`: a 7.000 sinapsis la neurona de carbono
  codifica **25.900 bits extra** que el silicio «simplemente no puede representar», y haría falta
  «~25.900 transistores extra por neurona emulada».
- **Qué hace el código.** `experimentos_variabilidad.py:45-78`. Multiplica: `carb = n × 4.7`
  (`:54`), `sil = n × 1.0` (`:55`), `bits_extra = carb − sil`.
- **Clasificación:** cálculo ilustrativo.
- **¿Construido por definición?** **Sí.** `25900 = 7000 × (4.7 − 1.0)`. Toda la tabla del CSV es una
  tabla de multiplicar de las dos constantes `BITS_SYN_CARBONO = 4.7` y `BITS_SYN_SILICIO = 1.0`
  (`:26-27`). Verificado: reproduce las 7 filas exactamente.
- **¿Coincide con el CSV?** Sí.
- **Problema de fondo (no de aritmética).** El 4,7 es real y citado (Bartol et al. 2015). **El 1,0
  no lo es.** `BITS_SYN_SILICIO = 1.0` con el comentario «señalización binaria (spike/no-spike por
  ciclo)» compara una **sinapsis biológica** con un **bit de señal**, no con un peso sináptico de
  silicio — que en la práctica es un float32 (32 bits) o, en hardware neuromórfico, un entero de
  4–8 bits. La comparación honesta (4,7 vs 32) invertiría el signo del resultado. **La constante que
  produce la conclusión es la no citada.**
- **Qué se conserva y con qué reencuadre.** La cifra de Bartol es citable y valiosa por sí sola: la
  sinapsis biológica almacena ~4,7 bits, un dato empírico real de la literatura del seminario.
  Conservar **como estipulación declarada**, nunca como comparación con silicio, y jamás como
  «lo que el silicio no puede representar» — eso es precisamente lo que la tesis del ensayo declara
  indecidible por esta vía.

## Exp 8 — I/O y ancho de banda de conexión

- **Qué afirma el texto.** `analisis_cientifico.md:107`: a escala cerebral el silicio 2D necesita
  **66,4×–68,1× más cableado** que el carbono 3D; es «geométricamente ineludible» y produce el
  «thermal wall».
- **Qué hace el código.** `experimentos_variabilidad.py:92-102`: `wire_2d = N^(1/2)`,
  `wire_3d = N^(1/3)`, ratio `= N^(1/6)`. Y `ratio_fanout = 7000/6` (`:87`).
- **Clasificación:** modelo conceptual (con envoltorio de cálculo ilustrativo).
- **¿Construido por definición?** **Sí.** El comentario del propio código lo confiesa en `:101`:
  `# = N^(1/6)`. Verificado: `(1e11)^(1/6) = 68,129`. Las 8 filas del CSV son la función `N^(1/6)`
  tabulada. No hay ningún experimento: hay una función elevada a una potencia.
- **¿Coincide con el CSV?** Sí. También `7000/6 = 1166,67` (publicado como `fanoutRatio: 1167`).
- **Nota.** El argumento geométrico 2D-vs-3D es un **modelo conceptual legítimo y conocido** en la
  literatura VLSI, y como tal se puede citar. Lo que no puede hacerse es presentar la tabulación de
  `N^(1/6)` como si el laboratorio hubiera descubierto algo. Además, `FANOUT_SILICIO = 6` («fan-out
  eléctrico típico de una compuerta CMOS», `:34`) compara una **compuerta lógica** con una
  **neurona entera**: no son la misma unidad de análisis. Es el mismo error de granularidad que el
  ensayo denuncia en §2 — **elegir el nivel de descripción que da el resultado buscado**.
- **Qué se conserva y con qué reencuadre.** El punto geométrico, como cita a la literatura VLSI, y
  **sólo sobre implementaciones actuales** — no sobre el silicio *como sustrato*. Es una restricción
  de ingeniería contingente (el apilamiento 3D, la fotónica y el wafer-scale la atacan hoy), no una
  verdad sobre lo que el silicio puede ser.

## Exp 9 — Intercambio químico-pasivo vs eléctrico-activo

- **Qué afirma el texto.** `analisis_cientifico.md:124`: en silicio «mover / computar = 1.950 / 3,0 =
  **650×**»; y `:146` que esto «domina el presupuesto total de cualquier simulación biológica».
- **Qué hace el código.** `experimentos_variabilidad.py:128-142`. Divide dos constantes de
  literatura: `E_DRAM64_PJ = 1950.0` / `E_FLOP_PJ = 3.0` (`:29-30`).
- **Clasificación:** cálculo ilustrativo.
- **¿Construido por definición?** **Sí, trivialmente.** `1950/3 = 650`. Y la fracción del CSV
  (`0,9985` = 99,85 % de la energía es intercambio) es `1950/1953`: verificado. Es una división.
- **¿Coincide con el CSV?** Sí.
- **A favor del experimento.** Es el más honesto de los 1-9: **las dos constantes están citadas y son
  reales** (Horowitz 2014; Attwell & Laughlin 2001), y el documento las atribuye correctamente
  (`analisis_cientifico.md:134-136`). El problema no es la veracidad de las cifras, es que
  **presentar una división entre dos constantes citadas como «Experimento 9» infla su estatus**.
  Esto es una **cita**, no un experimento.
- **Qué se conserva y con qué reencuadre.** Las cifras, como lo que son: citas a Horowitz y a
  Attwell-Laughlin. El *memory wall* es real y bien documentado. Pero, otra vez, es una propiedad de
  **las arquitecturas von Neumann actuales**, no del silicio: el hardware near-memory y neuromórfico
  existe precisamente para esquivarlo. Renombrar de «Exp 9» a «datos de contexto».

## Exp 10 — κ y el acoplamiento cómputo/automantenimiento

> **Éste es el único experimento que hace trabajo filosófico en el ensayo** (§4,
> `00_ensayo.md:52-56`), y lo hace **porque fracasó**.

- **Qué afirma el texto (ahora).** `experimento_autopoiesis.py:1-49` es un docstring que documenta su
  propia refutación: κ no mide autopoiesis, mide dónde se traza la frontera. Tres cortes sobre la
  misma máquina: **0,88 / 0,00 / 0,70**.
- **Qué hace el código.** `experimento_autopoiesis.py:87-121`. Tres ramas:
  - `CORTE_ACOPLADO` (`:102-103`): `R = clip(R − CONSUMO·spike + P·(1−R))`.
  - `CORTE_ESTRECHO` (`:105-108`): **`R = np.ones(M)`**. P no se lee.
  - `CORTE_AMPLIADO` (`:110-118`): misma máquina, la fuente entra dentro del sistema.
- **Clasificación:** **experimento mental computacional / contraejemplo construido.** No es evidencia
  empírica de nada, y el código lo declara en `:45-46`.
- **¿Construido por definición?** **La rama «estrecha», sí — y ése es el punto.** Lo verifiqué
  envenenando `P0` con valores absurdos y ejecutando de nuevo:

  | `P0` | κ_estrecho |
  |---|---|
  | 0,0 | 0,0 |
  | 1.000.000 | 0,0 |
  | NaN | 0,0 |
  | inf | 0,0 |
  | −5,0 | 0,0 |

  **`P0` es código muerto en esa rama.** κ = 0 no es un resultado: es una función constante. El
  experimento no podía fallar. Confirmado independientemente.

  **La rama «acoplada» no es analítica, pero tampoco es un descubrimiento.** Verifiqué la forma
  cerrada de campo medio `desempeño(P) ≈ min(1, P(1−UMBRAL)/(CONSUMO·λ))`: predice **κ = 0,893**
  frente al empírico **0,879**. Y barriendo un solo parámetro (`P0`), κ recorre **todo [0,1]**:

  | `P0` | 0,01 | 0,02 | **0,05** | 0,1 | 0,2 | 0,5 |
  |---|---|---|---|---|---|---|
  | κ_acoplado | 0,994 | 0,985 | **0,877** | 0,395 | 0,001 | 0,000 |

  El baseline elegido (0,05) está sobre la parte más empinada de la curva. **El «0,88» es una
  elección de parámetro, no un hallazgo.**
- **¿Coincide con el CSV?** **Sí — reproducido exactamente, semilla a semilla, 24 semillas:**

  | corte | mi reproducción | `exp10_resumen.csv` |
  |---|---|---|
  | acoplado | 0,8788 ± 0,0024 | 0,878805 ± 0,002358 |
  | estrecho | 0,0000 ± 0,0000 | 0,000000 ± 0,000000 |
  | ampliado | 0,6982 ± 0,0051 | 0,698181 ± 0,005054 |

  Coincidencia a la sexta cifra. **El experimento es honesto sobre sus propios números.**
- **Ninguna rama es autopoiética — verificado en el código.** En las tres, `P` es un parámetro exógeno
  que el experimentador lesiona desde fuera (`:97`: `if t == T_PERT: P = P0 * FACTOR_LESION`). No hay
  clausura de producción: el sistema no produce los componentes que lo constituyen. No hay
  adaptividad: nada regula la propia precariedad — que es exactamente lo que Di Paolo (2005) exige.
  **El modelo «carbono» no modela la autopoiesis: modela un recurso que se agota.**
- **Qué se conserva y con qué reencuadre.** **Todo, tal como está.** El experimento ya está reformado
  y su docstring es una pieza de autocrítica ejemplar. Su valor es exactamente el que el ensayo le
  da: κ pasa de 0,00 a 0,70 **sin tocar el hardware**, sólo moviendo la frontera. Es un
  **contraejemplo construido** a la tesis de que una medida de auto-mantenimiento capture una
  propiedad del sustrato. Y refuerza la tesis principal por una vía indirecta: κ **presupone**
  unidades en vez de descubrirlas — es el problema de individuación de Beer (2004) reapareciendo,
  inevitablemente, en cuanto se intenta operacionalizar.

## Benchmark escalonado (CPU → SingleGPU → MultiGPU → Híbrido)

- **Qué afirma el texto.** `analisis_cientifico.md:60`: «El silicio digital clásico es entre 3.000 y
  100.000 veces más ineficiente que la transmisión biológica»; `:148`: está acotado por «tres walls
  independientes y ortogonales» que «sólo pueden relajarse cambiando la naturaleza del sustrato».
- **Qué hace el código.** `ejecutar.py`. **Aquí sí se mide.** `time.perf_counter()` real
  (`:106,111,140,150,174,184,207,217`), y la potencia de GPU se muestrea con `nvidia-smi`
  (`:62,148,182,215`). 19 configuraciones de N desde 100 hasta 16.000.000, en hardware real
  (RTX 5070 Ti + RTX 2060, `resultados_meta.json`).
- **Clasificación:** **benchmark dependiente de implementación.** Es la **única medición empírica
  genuina del laboratorio**.
- **¿Construido por definición?** **El tiempo no. La brecha, en parte sí.** Verifiqué las columnas
  derivadas:
  - `energia_silicio_J = t_quimica_ms/1000 × potencia_w` → desviación máx. **2,9×10⁻¹¹** (identidad).
  - `energia_carbono_J = spikes × 1,65e−9 + leak` → desviación máx. **8×10⁻⁴** (el término de leak).
  - `brecha_eficiencia = E_si/E_carb` por evento → desviación máx. **1,5×10⁻¹¹** (identidad).

  Es decir: **el silicio se mide; el carbono se calcula**. `energia_carbono_J` no mide ningún cerebro:
  aplica la constante de literatura `ATP_POR_SPIKE_J = 1.65e-9` (`ejecutar.py:53`) al tren de spikes
  **que produjo la simulación en silicio**. Es un contrafáctico («si este tren de spikes hubiera
  corrido en un cerebro»), no una comparación. Y en el tier CPU la potencia tampoco se mide:
  `POTENCIA_CPU_W = 100.0` es un literal (sólo la GPU se muestrea con `nvidia-smi`).
- **¿Coincide con el CSV?** Sí; todas las columnas derivadas reproducen.
- **⚠ HALLAZGO NUEVO — el benchmark se refuta a sí mismo.** Verificado sobre
  `resultados_escalamiento.csv`: manteniendo **fija la constante del carbono** y cambiando sólo el
  hardware de silicio y N, la «brecha» va de **2,85×10³ a 4,10×10⁵ — un factor de 144×**. Por tier:

  | tier | brecha (mediana) |
  |---|---|
  | SingleGPU | 3,8×10³ |
  | MultiGPU | 1,4×10⁴ |
  | CPU | 9,3×10⁴ |
  | Híbrido | 1,0×10⁵ |

  **La «brecha carbono/silicio» se mueve dos órdenes de magnitud sin que el carbono cambie en nada.**
  No es una constante de la naturaleza: es una propiedad de **qué implementación se eligió**. El
  propio dato que debía mostrar un abismo entre sustratos muestra que la cifra es un artefacto de
  ingeniería. (Nótese además que la brecha **mejora** al subir de CPU a GPU y **empeora** al añadir
  PCIe/GIL: no hay ninguna tendencia hacia un límite físico; hay cuellos de botella de software.)
- **Qué se conserva y con qué reencuadre.** El benchmark **ya lleva la cota correcta** — el texto lo
  descuenta como «cota superior de una comparación deliberadamente desfavorable», y el propio
  `analisis_cientifico.md:5` admite que «no se optimiza el código para hacerlo rápido». Esa honestidad
  se conserva. Lo que debe caer es la inferencia de `:148` («sólo pueden relajarse cambiando la
  naturaleza del sustrato»): **el propio CSV la contradice**, porque cambiar de tier —sin cambiar de
  sustrato— mueve la brecha 144×. Reencuadre correcto: **un benchmark de una implementación no
  optimizada en Python contra una constante de literatura**, útil para ilustrar el coste de simular,
  inútil para decidir nada ontológico.

---

## No pude verificar

Marco explícitamente lo que queda fuera del alcance de esta auditoría:

1. **La procedencia de las constantes de literatura.** Verifiqué que el código usa `4.7` (Bartol
   2015), `210.85 pJ` (Attwell & Laughlin 2001), `1950/3 pJ` (Horowitz 2014) y `1.65e-9 J/spike`, y
   que las cuentas que hace con ellas son correctas. **No verifiqué contra las fuentes primarias que
   esos números sean los que esos autores publican.** Requiere acceso a los papers.
2. **La reejecución del benchmark.** `resultados_escalamiento.csv` es del 6-jul-2026 y requiere las
   dos GPUs. Verifiqué la **consistencia interna** de todas sus columnas derivadas y la coherencia
   con `resultados_meta.json`, pero **no reejecuté las mediciones de tiempo**: no puedo certificar
   que los `t_quimica_ms` publicados provengan de la corrida que dicen. A diferencia del Exp 1 y el
   Exp 6, **no encontré literales fabricados** en `ejecutar.py`: los cronómetros se leen. Audité el
   camino del código, no la corrida.
3. **`resultados_escalamiento_gpu.csv`** (5-jul-2026) contiene un esquema de columnas distinto y
   cifras incompatibles con `resultados_escalamiento.csv` para las mismas N (p. ej. N=100:
   476 ms vs 19,1 ms). **No pude determinar cuál corrida es la vigente ni si el archivo antiguo está
   citado en algún sitio.** Debe resolverse antes de publicar.
4. **`ejecutar.py` vs `ejecutar_experimentos.py`**, y **`graficar.py` vs `graficar_resultados.py`**:
   hay pares de scripts solapados y `simular_redes.py` / `resultados_simulacion.md` (5-jul) parecen
   una generación anterior y abandonada. `resultados_simulacion.md:25` **todavía afirma la tesis
   vieja**, incompatible con el ensayo actual: «La vida y la conciencia dependen de la
   autoorganización y termodinámica **del carbono**». **No audité qué archivos están vivos**, pero
   este documento viola la regla de oro y debe retirarse o marcarse como histórico.
5. **Exp 4**: no reejecuté la simulación (5000 neuronas × 2000 pasos). Todo mi análisis del Exp 4 sale
   de los CSV publicados y de la lectura de `modelos.py:149-205`, que es suficiente para los tres
   hallazgos.

---

## Relación entre cada experimento y cada afirmación filosófica

Ésta es la sección que decide qué puede citarse en el ensayo. Las afirmaciones son las de
`00_ensayo.md`:

- **(A)** La autopoiesis individúa **células**, no sujetos (~10¹³ unidades, ninguna es yo).
- **(B)** El **cerebro no es una unidad autopoiética** (sistema de segundo orden).
- **(C)** El **hígado** es tan autopoiético como el cerebro.
- **(D)** Seleccionar al sujeto exige **integración causal**, que es sustrato-neutral.
- **(E)** Varela migró a **autonomía / clausura operacional** (1979) — y eso es autosocavante.
- **(F)** **κ no mide autopoiesis: mide dónde se traza la frontera.**
- **(G)** La tesis es **neutral** ante el problema difícil y compatible con la realizabilidad múltiple.

| | A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|---|
| **Exp 1** (Zeki) | — | — | — | — | — | — | — |
| **Exp 2** (Quian Q.) | — | — | — | — | — | — | — |
| **Exp 3** (LeDoux) | — | — | — | — | — | — | — |
| **Exp 4** (Bechtel) | — | — | — | — | — | — | — |
| **Exp 5** (Hinton) | — | — | — | — | — | — | — |
| **Exp 6** (Webb) | — | — | — | — | — | — | — |
| **Exp 7** (Bartol) | — | — | — | — | — | — | **⚠ en contra** |
| **Exp 8** (geometría) | — | — | — | — | — | — | **⚠ en contra** |
| **Exp 9** (Horowitz) | — | — | — | — | — | — | **⚠ en contra** |
| **Exp 10** (κ) | — | — | — | **indirecto** | — | **✔ sostiene** | — |
| **Benchmark** | — | — | — | — | — | indirecto | **⚠ en contra** |

**Ninguna celda de A, B, C ni E tiene contenido. Esto no es un defecto: es la tesis.**

### Por qué ninguno sostiene la tesis

**Las afirmaciones A, B, C y E son conceptuales y bibliográficas.** «El cerebro no produce sus
componentes: lo hacen sus células» es una verdad sobre la organización biológica, no un dato que se
mida en un portátil. «Varela generalizó a la autonomía en 1979» se verifica leyendo *Principles of
Biological Autonomy*, no ejecutando Python. **No hay experimento computacional que pueda tocarlas**,
y el ensayo lo dice: «El argumento no usa una sola cifra» (`decisions.md:100`). La respuesta a
«¿sobrevive sin los experimentos?» es *sí*, y esta tabla es su demostración.

**Los Exp 1-9 son estructuralmente incapaces de decir nada sobre A-G, por una razón única y
verificada: no hay carbono en el laboratorio.** Los diez experimentos corren en silicio y comparan
**pares de modelos**, bautizando a uno de cada par «carbono»:

| Exp | Lo que se etiqueta «carbono» | Lo que realmente es |
|---|---|---|
| 1 | grafo con conectividad local | una **arquitectura** (CNN; Fukushima 1980, LeCun 1998) — silicio |
| 2 | vector Bernoulli(0,01) | una **codificación esparcida** — silicio |
| 3 | el literal `1e-11` | **nada**: una constante escrita a mano |
| 4 | red E-I saturada a 196 Hz | un **modelo LIF** — silicio |
| 5 | STDP | un **algoritmo** (base de Loihi/SpiNNaker — silicio) |
| 6 | `flops = 2` | una **estipulación** |
| 7 | `4.7` (Bartol) | una **constante de literatura**, comparada con un `1.0` inventado |
| 8 | `N^(1/3)` | una **función** |
| 9 | `210.85 pJ` | una **constante de literatura** |
| 10 | `R = clip(R − CONSUMO·spike + P·(1−R))` | una **ecuación en diferencias** |

**La etiqueta hace todo el trabajo.** Cada Exp 1-9 **presupone** la distinción carbono/silicio que
debía establecer, y luego la «encuentra» en el nombre de una variable. Un experimento que asume su
conclusión no puede confirmarla ni refutarla: es una petición de principio con CSV.

Y hay un problema peor, que es el que hace ineludible el reencuadre: **A-G son afirmaciones sobre la
individuación del sujeto, y los Exp 1-9 son afirmaciones sobre la eficiencia de implementaciones.**
No se tocan. Ninguna cantidad de FLOPs, picojulios ni bits decide **cuál** es el sujeto — y ése es
exactamente el punto de Bennett y Hacker que abre el ensayo: hay disputas que no se resuelven con más
datos, porque el problema está en el sujeto de la oración. **El laboratorio es la ilustración
involuntaria de esa lección**: diez experimentos, once cifras, cero avance sobre quién es el sujeto.

### La marca ⚠ «en contra»: Exp 7, 8, 9 y el benchmark

Estos cuatro no son sólo inertes: **empujan hacia la posición que el ensayo declina ocupar.** Su
retórica publicada («el silicio no puede igualar», «geométricamente ineludible», «sólo pueden
relajarse cambiando la naturaleza del sustrato», `analisis_cientifico.md:148`) es una tesis
**carbono-céntrica** — precisamente la que Seth (2025) rechaza («*Neither do I endorse carbon
chauvinism*») y la que **(G)** prohíbe. Dejarlos con esa redacción **rompe la regla de oro**: el
ensayo gobierna, y ningún entregable puede sostener una tesis distinta.

Reencuadre obligatorio para los cuatro: son datos sobre **arquitecturas von Neumann actuales**, no
sobre el silicio como sustrato. Y su propio contenido lo confirma — el benchmark mueve la brecha
**144× sin tocar el carbono**. Un número que depende del tier de hardware no es una propiedad del
sustrato: es una propiedad del corte, igual que κ.

### El único que trabaja: Exp 10 como contraejemplo

**El Exp 10 sostiene (F) — y lo sostiene precisamente porque fracasó.** No aporta evidencia *a favor*
de la tesis: aporta un **contraejemplo construido** contra la posibilidad de operacionalizar el
argumento del sustrato. Su estructura lógica es:

> El autor construyó la medida que le daría al argumento del sustrato su base objetiva. La medida
> funciona. Y lo que mide es **dónde el autor trazó la frontera**: misma máquina, mismo hardware,
> misma perturbación, otro corte → **κ pasa de 0,00 a 0,70**. La medida no descubre unidades: las
> presupone.

Esto es lo único que un laboratorio podía aportar a esta tesis, y es de una clase distinta a los
demás: **no es evidencia empírica, es un experimento mental ejecutado.** Su fuerza es demostrativa,
no inductiva — como una construcción en geometría. Y es fuerte por dos razones que verifiqué:

1. **Es reproducible al sexto decimal** (24 semillas, tres cortes).
2. **Es autocrítico**: la rama que daba el resultado más limpio (κ = 0) resultó ser código muerto,
   y el autor lo publicó en el docstring en vez de taparlo.

**Sostiene (D) indirectamente**: si κ —una medida de acoplamiento entre cómputo y automantenimiento—
es relativo al corte, entonces seleccionar la escala del sujeto no lo hace la auto-producción; lo
hace algo que se añade desde fuera. Que es la tercera consecuencia de §2 del ensayo
(`00_ensayo.md:38`).

**Lo que el Exp 10 NO hace, y no debe insinuarse que haga:** no mide conciencia, no mide autopoiesis
(ninguna de sus ramas es autopoiética), no muestra que el silicio sienta, y no refuta a Varela, a
Thompson ni a Di Paolo. Su alcance es exacto y estrecho: **muestra que una operacionalización
plausible del argumento del sustrato mide una estipulación del experimentador.** Ni un milímetro más.

---

## Recomendaciones accionables

Ordenadas por urgencia de cara a la sustentación del 15-jul-2026:

1. **Bloqueante — `simulaciones/resultados_simulacion.md:25`** afirma la tesis vieja («la vida y la
   conciencia dependen de la autoorganización y termodinámica del carbono»). **Contradice el ensayo.**
   Retirar o marcar como histórico.
2. **Bloqueante — Exp 6**: eliminar `tiempo_ms` y `energia_J` de `exp6_morfologia.csv`
   (`ejecutar_experimentos.py:283,286`). Son literales fabricados, el mismo defecto ya corregido en
   el Exp 1. Si un evaluador encuentra en el Exp 6 lo que el Exp 1 confiesa haber tenido, el coste de
   credibilidad se paga sobre todo el trabajo — **incluida la autocrítica del Exp 10, que es lo
   valioso**.
3. **Alto — `analisis_cientifico.md:148`**: la frase «sólo pueden relajarse cambiando la naturaleza
   del sustrato» es carbono-centrismo y **el propio CSV la refuta** (brecha 144× a carbono
   constante). Reescribir.
4. **Alto — Exp 4**: retirar la afirmación de emergencia beta–gamma. El pico está en 0,5 Hz, la
   densidad cae monotónicamente y la red corre al 98 % de su techo refractario.
5. **Medio — Exp 3**: retirar. No simula canales; su `energia_carbono_J` es un literal sin fuente y
   sus propios datos contradicen la linealidad que afirma.
6. **Medio — Exp 7**: declarar que `BITS_SYN_SILICIO = 1.0` es una estipulación no citada, y que es
   la constante que produce la conclusión.
7. **Bajo — Exp 2**: `n_conceptos = 200` es una variable muerta; la escala anunciada no existe.
8. **Resolver**: cuál de `resultados_escalamiento.csv` / `resultados_escalamiento_gpu.csv` es la
   corrida vigente (cifras incompatibles para las mismas N).
9. **No tocar el Exp 10.** Está bien. Es lo mejor del laboratorio.

---

## Nota final del auditor

El ensayo dice, en §4: «Construí la operacionalización que debía dar al argumento su base objetiva y
la vi fallar». Esta auditoría confirma que la frase es literalmente cierta, y añade que el patrón se
repite hacia arriba: **el laboratorio entero fue construido para medir una diferencia de sustrato, y
lo que mide, cuando mide algo, es la elección del autor** — la constante `P_CONEXION` en el Exp 1, el
`batch` en el Exp 5, el `1.0` inventado del Exp 7, el tier de hardware en el benchmark, la frontera en
el Exp 10.

**Ésa es la tesis del ensayo, redescubierta por accidente en el código.** No es una coincidencia
afortunada: es lo que la tesis predice que tenía que pasar. Un criterio que individúa la unidad
equivocada no puede sino devolver, en cada operacionalización, la unidad que el operacionalizador
metió a mano.
