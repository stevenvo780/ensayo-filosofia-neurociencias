# Ensayo Final — Filosofía de las Neurociencias (2026-1)

> **Entrega: 15 de julio de 2026 · Prof. Santiago Arango-Muñoz · Instituto de Filosofía, UdeA**  
> **Ensayo: 1.984 palabras de prosa** (tope de la consigna: 2.000) · 8 pp. → [`ensayo/00_ensayo.md`](ensayo/00_ensayo.md) · [PDF](ensayo/00_ensayo.pdf)  
> **Tesis extendida: 11.381 palabras** · 33 pp. → [`ensayo/tesis.md`](ensayo/tesis.md) · [PDF](ensayo/tesis.pdf)  
> **Sustentación: 15 diapositivas** → [`ensayo/guion_presentacion.md`](ensayo/guion_presentacion.md)  
> **Web: https://neurocarbon.stevenvallejo.com**

**Gobierna [`ensayo/00_ensayo.md`](ensayo/00_ensayo.md).** Ningún otro documento de este repositorio
sostiene una tesis distinta; los que sostenían la anterior están marcados como históricos.

## Estado (15 de julio de 2026) — refactor filosófico

El trabajo fue **reescrito de raíz** tras una auditoría adversarial. La tesis anterior («el
sustrato no es neutral», en dos niveles: práctico y ontológico) se **abandonó**: su nivel
ontológico no estaba argumentado y era, sin residuo, el de Searle/Thompson/Damasio/Seth; y el
laboratorio —por admisión del propio texto— no hacía trabajo para él.

**Tesis actual — «La unidad que falta».** Un solo problema: *¿puede la autopoiesis decidir qué
sistemas pueden ser conscientes?* Respuesta: no. El argumento «el silicio no se autoproduce, luego
no siente» necesita que la auto-producción **individúe al sujeto**, y no lo hace: individúa
**células**. En un cuerpo hay ~10¹³ unidades autopoiéticas y ninguna es el sujeto; el cerebro no es
una unidad autopoiética; el hígado lo es tanto como él. Para elegir una escala entre las anidadas hay
que añadir **integración causal**, que es sustrato-neutral —la tesis del adversario—. Y la propia
tradición lo supo: Varela generalizó de la autopoiesis a la **autonomía** (1979), que es
organizacional y por tanto no excluye sustratos. De ahí la tenaza: o autopoiesis estricta, que no
individúa al sujeto, o autonomía, que lo individúa pero no excluye al silicio.

**Qué se ataca exactamente, y qué no.** El ensayo **no niega que la vida sea condición necesaria** de
la conciencia: niega que la auto-producción sea el **criterio que individúa al sujeto**. Una condición
no es un criterio, y el argumento del sustrato necesita las dos cosas. Ante la réplica «pero la
autopoiesis sigue siendo necesaria»: ¿necesaria *de qué*? Si del sujeto, ningún sujeto es
autopoiético —somos sistemas de segundo orden—; si de los componentes, es una tesis sobre el material
que la autopoiesis no puede fundar, porque no habla de sujetos: habla de células.

**La clínica ya separó las variables.** Laureys (2007), lectura del curso: en el estado vegetativo la
auto-producción está completa (ciclos de sueño-vigilia, respiración sin asistencia, organismo vivo) y
el sujeto no está; y lo que covaría con el sujeto es la conectividad frontoparietal y
córtico-talámica, no la magnitud material —«medir los niveles globales de consumo de energía en el
cerebro no puede indicar la presencia de consciencia»—. *Cautela, explícita también en el ensayo:* la
afirmación es sobre la **categoría clínica**, no sobre pacientes individuales (Laureys documenta
conciencia encubierta y diagnóstico errado en más de un tercio de los casos), y la inferencia hacia la
autopoiesis es del autor: Laureys no discute autopoiesis ni silicio.

**De nada de esto se sigue que el silicio sienta.** Se sigue que la autopoiesis no es el instrumento
que puede decidirlo.

## El laboratorio, auditado

El laboratorio quedó **subordinado y auditado**, y su auditoría es parte del aporte
(`docs/refactor/experiment-audit.md`). Lo que la auditoría encontró, y que este repositorio
declara en vez de esconder:

- **No hay carbono en el laboratorio.** Los diez experimentos corren en silicio y comparan *pares de
  modelos*, bautizando a uno de cada par «carbono». La etiqueta hacía el trabajo.
- **8 de 11 cifras publicadas eran analíticas**: consecuencias de constantes elegidas. El «90 %» del
  Exp 1 *es* `1 − P_CONEXION`; el crosstalk del Exp 2 es `E[·] = p` para vectores Bernoulli(p).
- **El Exp 1 publicaba tiempo y energía fabricados** (literales escritos a mano, comentados como
  «tiempo medio empírico», con el cronómetro declarado y nunca leído). **Corregido**: esas columnas
  se eliminaron.
- **El coeficiente κ (Exp 10) no medía autopoiesis.** κ=0 era una identidad aritmética (el parámetro
  lesionado era código muerto: 720 configuraciones dan 0). κ mide **compartición de un presupuesto de
  recursos** —un portátil con *throttling* térmico tiene κ>0—.
- **κ se conserva reformado, como contraejemplo construido**: en la misma máquina, moviendo sólo la
  frontera del sistema para incluir su fuente de alimentación, κ pasa de **0,00 a 0,70** (24
  semillas). El sustrato no cambió: cambió el corte. Es el único punto donde el laboratorio hace
  trabajo filosófico, y lo hace **refutando la tesis anterior del autor**.
- El **benchmark escalonado** (4 tiers, hasta 16 M neuronas) es la única medición empírica genuina, y
  es una cota superior de una comparación deliberadamente desfavorable al silicio: vale como
  ilustración de la arquitectura von Neumann, **no** como constante de sustrato.

## 🔓 Ciencia abierta y reproducibilidad

Este repositorio es **completamente abierto**: todo el proceso, los datos y el código de cómo se construyó el trabajo están aquí, para que cualquiera pueda inspeccionarlo, verificarlo y reproducirlo.

- **Textos** (`ensayo/`): ensayo y tesis en Markdown y **PDF**, más el guion de sustentación.
- **Código** (`simulaciones/`): los modelos biofísicos y los 10 experimentos, sin ofuscación.
- **Datos crudos** (`simulaciones/datos/`): los CSV/JSON exactos que producen las cifras citadas en el ensayo — cada número del texto es rastreable a un archivo.
- **Gráficos** (`simulaciones/graficos/`): generados por scripts versionados, no editados a mano.
- **Web** (`web/`): el código fuente de las cuatro superficies interactivas (ensayo, tesis, laboratorio, presentación).

**Método.** El laboratorio **no demuestra** la tesis filosófica —que se sostiene sin él— y su auditoría (`docs/refactor/experiment-audit.md`) dice exactamente qué clase de objeto epistémico es cada experimento: cálculo analítico, benchmark dependiente de implementación o contraejemplo construido. Publicar esa auditoría, incluidos los errores encontrados en el propio trabajo, es parte del método. Reproducir todo: `./ejecutar_laboratorio.sh`.

> **Limitaciones conocidas, declaradas en vez de escondidas:**
> - **Rutas absolutas.** Los scripts de `simulaciones/` escriben y leen con la ruta absoluta
>   `/workspace/ensayo-filosofia-neurociencias/…` hardcodeada. Reproducir el laboratorio desde otra
>   ubicación exige ajustarlas (o clonar en esa ruta). Es deuda técnica real; se declara porque un
>   repositorio que promete reproducibilidad debe decir dónde no la alcanza.
> - **Hardware.** El benchmark escalonado asume GPU NVIDIA con CUDA; sin ella sólo corre el tier CPU,
>   y las cifras publicadas no se reproducen tal cual.
> - **`next build` local.** Falla por incompatibilidad de Node 22 con Next 14.2 (artefacto del
>   entorno, no del código): Vercel compila y despliega sin problema. La verificación local se hace
>   con `npx tsc --noEmit`.
> - **Material de terceros.** `fuentes/` y `notas/` están en `.gitignore`: son insumos de estudio con
>   copyright y no se redistribuyen. La bibliografía del curso se lista en `fuentes/BIBLIOGRAFIA.md`.

**Licencia:** [MIT](LICENSE) para el código; los textos e imágenes son del autor. El registro de
autocrítica está en [`docs/refactor/`](docs/refactor/) (auditoría del laboratorio, verificación de
fuentes, matriz de consistencia y decisiones); las críticas de la versión anterior del trabajo se
conservan en [`docs/historico/`](docs/historico/), marcadas como históricas.

## Estructura del Proyecto

* **Textos finales (`ensayo/`):**
  * **[00_ensayo.md](ensayo/00_ensayo.md)** · **[00_ensayo.pdf](ensayo/00_ensayo.pdf):** El entregable. 1.984 palabras de prosa (tope: 2.000), 8 pp.
  * **[tesis.md](ensayo/tesis.md)** · **[tesis.pdf](ensayo/tesis.pdf):** Tesis extendida (11.381 palabras, 33 pp.): el mismo argumento con el desarrollo que el ensayo no puede llevar.
  * **[guion_presentacion.md](ensayo/guion_presentacion.md):** Guion de sustentación (15 diapositivas, tiempos y defensa de preguntas).

* **[ejecutar_laboratorio.sh](ejecutar_laboratorio.sh):** Script ejecutable que activa el venv, corre los 4 tiers + los 10 experimentos, genera todos los gráficos y el dashboard.

* **`simulaciones/`:**
  * **[modelos.py](simulaciones/modelos.py):** Modelos biofísicos (HH, LIF multicompartimental, STDP) con homeostasis sináptica y propagación chunked para evitar OOM.
  * **[ejecutar.py](simulaciones/ejecutar.py):** Orquestador del benchmark escalonado (CPU → 4 tiers GPU → Híbrido).
  * **[ejecutar_experimentos.py](simulaciones/ejecutar_experimentos.py):** Experimentos 1-6 (jerarquía visual, células de concepto, diversidad química, oscilaciones, plasticidad, cómputo morfológico).
  * **[experimentos_variabilidad.py](simulaciones/experimentos_variabilidad.py):** Experimentos 7-9 (variabilidad sináptica, fan-out I/O, intercambio energético).
  * **[experimento_autopoiesis.py](simulaciones/experimento_autopoiesis.py):** Experimento 10 (coeficiente κ de acoplamiento cómputo↔auto-mantenimiento; 24 semillas). Se construyó como «firma operacional de la autopoiesis» y **la auditoría mostró que no lo es**: κ mide compartición de un presupuesto de recursos, y sobre todo mide **dónde se traza la frontera** — la misma máquina, bajo la misma perturbación, pasa de κ = 0,00 a κ = 0,70 con sólo contar la fuente de alimentación dentro del sistema. Es el contraejemplo construido del ensayo. **No mide conciencia ni autopoiesis.**
  * **[graficar.py](simulaciones/graficar.py):** Genera los gráficos del benchmark con anotaciones explícitas del cuello de botella por tier.
  * **[graficar_resultados.py](simulaciones/graficar_resultados.py):** Genera los 6 gráficos de los experimentos 1-6 y el dashboard HTML.
  * **[graficar_variabilidad.py](simulaciones/graficar_variabilidad.py):** Genera los 3 gráficos de los experimentos 7-9 (variabilidad, I/O, intercambio).
  * **`datos/`:** CSVs, JSONs y resultados crudos. [analisis_cientifico.md](simulaciones/analisis_cientifico.md) sintetiza todo.
  * **`graficos/`:** PNGs de alta resolución incrustados en el ensayo, tesis y web.
  * **[dashboard.html](simulaciones/dashboard.html):** Dashboard estático de soporte (alternativa offline al Next.js).

* **`web/`:** Aplicación Next.js 14 desplegada en Vercel (https://neurocarbon.stevenvallejo.com):
  * **`src/app/page.tsx`:** El ensayo completo en formato web.
  * **`src/app/tesis/page.tsx`:** La tesis extendida.
  * **`src/app/laboratorio/page.tsx`:** Dashboard interactivo con los 10 experimentos.
  * **`src/app/slides/[id]/`:** Diapositivas con notas del orador.

## 🔬 El laboratorio: 10 experimentos y un benchmark

**Experimentos 1–9 — y qué mostró la auditoría**

> Se construyó un experimento por lectura del seminario, buscando en cada hallazgo la **diferencia
> de sustrato**. Ninguno la encontró. La auditoría (`docs/refactor/experiment-audit.md`) recomputó
> las once cifras publicadas contra el código: **ocho son consecuencias analíticas de constantes
> elegidas por el autor**, y dos experimentos no sostienen lo que se les hacía decir. Se listan
> aquí con su origen real, porque ése es justamente el punto del ensayo: cada operacionalización
> devuelve el corte que el operacionalizador metió a mano. **El laboratorio no es premisa del
> argumento**; el argumento lo llevan las secciones conceptuales del ensayo.

1. **Jerarquía Visual (Zeki, 1992)** — 22.154.880 → 2.218.827 FLOPs («90%»). El 90% **es** `1 − P_CONEXION`, con `P_CONEXION = 0.10` (`ejecutar_experimentos.py:66`): el parámetro leído en voz alta, no un hallazgo.
2. **Células de Concepto (Quian Quiroga et al., 2013)** — crosstalk «80,0% → 1,03%». Es `E[solapamiento] = p` para vectores Bernoulli(*p*): un teorema recorrido por Monte Carlo, no una medición.
3. **Diversidad Neuroquímica (LeDoux, 1994)** — **retirado**. No simula ningún canal: la neurona es idéntica en las 15 condiciones y la energía del «carbono» era un literal escrito a mano.
4. **Oscilaciones y Sincronía** — **retirada la afirmación de emergencia**. El pico real del espectro está en 0,5 Hz y la densidad cae monotónicamente; el «58% beta–gamma» era un artefacto del ancho de banda analizado.
5. **Plasticidad (Hinton, 1992)** — 39 KB vs. 20.000 KB («512×»). El 512 **es** `batch × n_capas` = 128 × 4; el tamaño de la red se cancela. Además la STDP es la base del hardware neuromórfico, que es silicio: la partición carbono/silicio estaba en el nombre de la variable.
6. **Computación Morfológica (Webb, 1996)** — 757.760 vs. 2 FLOPs. Ambos lados son **conteos estipulados** a cada lado de una frontera que eligió el autor. Se eliminaron `tiempo_ms` y `energia_J`: eran literales, no medidas.
7. **Variabilidad Sináptica (Bartol et al. 2015)** — el «extra» del carbono se sigue de `BITS_SYN_SILICIO = 1.0` (`experimentos_variabilidad.py:27`), una constante **estipulada y sin fuente**: es la que produce la conclusión.
8. **Fan-Out I/O y geometría** — estimaciones de orden de magnitud derivadas de funciones elegidas (p. ej. `N^(1/6)`), no mediciones.
9. **Intercambio vs. Cómputo (Horowitz 2014)** — constantes de literatura, útiles como contexto de ingeniería; no dicen nada sobre *cuál* es el sujeto.
10. **κ y el acoplamiento (Exp 10)** — el único que trabaja, y como **contraejemplo construido**: misma máquina y misma perturbación, contar la fuente de alimentación dentro del sistema lleva κ de **0,00 a 0,70** (24 semillas). No mide un sustrato: mide dónde se trazó la frontera.

**Benchmark escalonado** — la única medición empírica genuina. Su resultado es autocrítico: la brecha se mueve dos órdenes de magnitud **con el carbono constante en las 19 filas**, luego mide la implementación, no el sustrato.

## 🚀 Cómo Reproducir

```bash
./ejecutar_laboratorio.sh
```

Tiempo total de ejecución: ~45-60 minutos (limitado por los tiers multi-GPU, híbrido y experimentos 7-9). El script:

1. Activa el venv Python con dependencias (NumPy, pandas, PyTorch, Matplotlib, SciPy).
2. Ejecuta el benchmark escalonado (CPU + RTX 5070 Ti + multi-GPU + híbrido).
3. Ejecuta los 6 experimentos biofísicos (jerarquía visual, células de concepto, diversidad química, oscilaciones, plasticidad, cómputo morfológico).
4. Ejecuta los 3 experimentos de variabilidad (sináptica, fan-out I/O, intercambio energético).
5. Genera todos los gráficos (8 PNG de alta resolución) y el dashboard HTML.
6. Todos los datos (CSV, JSON, métricas) se guardan en `simulaciones/datos/`.

## Fuentes Primarias Integradas

| Referencia | Tema | Datos clave |
|---|---|---|
| **Laureys (2007)** | Clínica y conciencia | Estado vegetativo: auto-producción completa vs. sujeto ausente; correlato es integración (conectividad frontoparietal), no metabolismo basal |
| **Zeki (1992)** | Jerarquía visual | V1→IT: campos receptivos progresivamente amplios |
| **Quian Quiroga et al. (2013)** | Células de concepto | 1% WTA esparcida → crosstalk 80% → 1,03% |
| **LeDoux (1994), Marder (2012)** | Diversidad química | decenas de neuromoduladores, 15+ canales iónicos/neurona |
| **Oscilaciones (Exp 4)** | — | **Retirado por la auditoría**: el pico real está en 0,5 Hz y la densidad espectral cae monotónicamente; la «banda beta–gamma emergente» era un artefacto del ancho de banda |
| **Hinton (1992)** | Plasticidad local | STDP local vs. backprop centralizado. La cifra publicada (512×) es `batch × n_capas`, una constante del autor — no un dato de Hinton |
| **Webb (1996)** | Cómputo morfológico | El tubo de desfase —materia no viva— es cognitivamente constitutivo: la frontera del sujeto cognitivo no coincide con la de lo vivo. (Los FLOPs del Exp 6 son conteos estipulados a ambos lados) |
| **Bartol et al. (2015)** | Variabilidad sináptica | 4,7 bits/sinapsis (26 estados); +100 moduladores ≈ +332 bits |
| **Attwell & Laughlin (2001)** | Metabolismo cerebral | ~211 pJ por potencial de acción (~3,29·10⁹ ATP) |
| **Horowitz (2014)** | Física del silicio | Mover datos ~650× computarlos; 99,8% de la energía es intercambio |

## Notas Técnicas

- **Reproducibilidad:** Todos los CSVs, JSONs y gráficos generados se almacenan en `simulaciones/datos/` y `simulaciones/graficos/`. Los PNGs se sincronizan automáticamente a `web/public/graficos/` para la web.
- **Hardware mínimo:** GPU NVIDIA con CUDA 12.x. Para CPU-only: ejecutar solo el tier 1 (descomentar en `ejecutar.py`).
- **Dependencias:** NumPy, pandas, PyTorch, Matplotlib, SciPy (simulaciones) · Next.js 14 (web). Ver [`requirements.txt`](requirements.txt).
- **Entorno web:** Desplegado en Vercel. URL: https://neurocarbon.stevenvallejo.com
- **Datos de muestra:** Los 10 experimentos generan los CSVs de `simulaciones/datos/` + los PNG de `simulaciones/graficos/` (~90–100 KB cada uno).

## Checklist de Entrega

- [x] Confirmar tema y consigna (`CONSIGNA.md`): un solo problema, 2.000 palabras, fuentes primarias y secundarias, conclusión.
- [x] Implementar el laboratorio: 10 experimentos y el benchmark escalonado.
- [x] **Auditar el laboratorio contra su propio código** ([`docs/refactor/experiment-audit.md`](docs/refactor/experiment-audit.md)): 8 de las 11 cifras publicadas resultaron consecuencias analíticas de constantes elegidas por el autor. Retirados el Exp 3 y la afirmación de emergencia del Exp 4; eliminados los literales fabricados del Exp 1 y del Exp 6.
- [x] Reescribir la tesis tras la auditoría ([`docs/refactor/decisions.md`](docs/refactor/decisions.md)).
- [x] Verificar toda fuente contra el original ([`docs/refactor/source-verification.md`](docs/refactor/source-verification.md)): cada cita entrecomillada del ensayo está comprobada verbatim contra el PDF.
- [x] Reanclar el ensayo en la filosofía de las neurociencias: las 11 lecturas del curso citadas en el cuerpo, con Laureys (2007) como evidencia clínica.
- [x] Redactar el ensayo: **1.984 palabras** de prosa (tope 2.000), 0 referencias fantasma, 0 colgantes.
- [x] Redactar la tesis extendida (11.381 palabras).
- [x] Verificar la consistencia entre entregables ([`docs/refactor/consistency-matrix.md`](docs/refactor/consistency-matrix.md)).
- [x] Desplegar la web en Vercel y verificar en producción.
- [x] Presentación final: 15 diapositivas + guion con defensa de preguntas.