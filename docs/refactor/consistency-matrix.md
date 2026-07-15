# Matriz de consistencia entre entregables

> El **ensayo gobierna**. Ningún entregable puede sostener una tesis distinta.
> Verificado el 15-jul-2026, tras el cierre de la entrega: §3 nueva del ensayo (la clínica, Laureys
> 2007), el blindaje necesidad/individuación, y el rescate del laboratorio como exhibición (no mea
> culpa). Comprobaciones hechas con `grep`/`wc` sobre el repo, con `pdfinfo` sobre los PDF, con
> `curl` contra el render en vivo (`next dev`) **y contra la producción**
> (`https://neurocarbon.stevenvallejo.com`), y con `tsc --noEmit`. No por inspección visual
> píxel a píxel (ver §5).

## 1. ¿Todos sostienen la misma tesis?

| Entregable | Archivo | Tesis nueva | Restos de la anterior | Verificado por |
|---|---|---|---|---|
| **Ensayo** (entregable obligatorio) | `ensayo/00_ensayo.md` | ✅ | 0 | lectura + conteo — 1.984 palabras de prosa (tope: 2.000), 11/11 lecturas del curso citadas en el cuerpo, 0 referencias fantasma, 0 colgantes |
| Ensayo en PDF | `ensayo/00_ensayo.pdf` · `web/public/ensayo-la-unidad-que-falta.pdf` | ✅ 8 pp. | 0 | `pdfinfo` |
| Ensayo en web | `web/src/app/page.tsx` | ✅ | 0 | `curl localhost/` + `curl` producción + grep |
| **Tesis extendida** | `ensayo/tesis.md` (11.381 pal., 6 partes) | ✅ | 0 | `grep -c` = 0 · Parte III (§III.1-III.4, la clínica) y §VI.1 (el blindaje) presentes y verificadas |
| Tesis en web | `web/src/content/tesis.md` (5 partes — **diverge a propósito de `ensayo/tesis.md`**, ver §6) + `app/tesis/page.tsx` | ✅ (mismo contenido, otra estructura) | 0 | `curl /tesis` + diff de contenido (§6) |
| Tesis en PDF | `ensayo/tesis.pdf` · `web/public/tesis-la-unidad-que-falta.pdf` | ✅ 33 pp. | 0 | `pdfinfo` |
| **Síntesis oral** | `web/src/app/sintesis/page.tsx` | ✅ | 0 | `curl /sintesis` |
| **Presentación** (15 diapositivas) | `web/src/app/slides/[id]/SlideClient.tsx` | ✅ | 0 (salvo notas que *critican* la tesis vieja) | `curl /slides/9`, `/slides/11`, `/slides/12`, `/slides/13` (local y producción) |
| Guion de sustentación | `ensayo/guion_presentacion.md` (renumerado 0-14, 1:1 con el deck; incluye sección de preguntas difíciles) | ✅ | 0 | reescrito |
| Portada/metadata | `web/src/app/layout.tsx` | ✅ | 0 | corregido |
| Tooltips | `web/src/data/refs.ts` | ✅ | 0 | corregidos 3 (κ, RM, neuromórfico) |
| README | `README.md` | ✅ | sólo para decir que se **abandonó** | reescrito |
| Laboratorio | `web/src/app/laboratorio/page.tsx` | ✅ (describe experimentos, no tesis) | — | revisado |
| Documentos históricos | `docs/historico/critica-ensayo-version-energetica.md` · `docs/historico/critica-brutal-version-energetica.md` | — (marcados HISTÓRICOS, no gobiernan) | Íntegros, es su función | movidos desde la raíz (`CRITICA_ENSAYO.md`, `CRITICA_BRUTAL.md`) y encabezados con la advertencia de que describen la versión «¿Silicio o Tejido?», abandonada |

> **Nota — cifras de la entrega.** Ensayo: 1.984 palabras de prosa (tope de la consigna: 2.000), 8
> páginas en PDF, 11/11 lecturas del curso citadas en el cuerpo, 0 referencias fantasma, 0
> colgantes. Tesis extendida: 11.381 palabras, 6 partes, 33 páginas en PDF, con la Parte III (la
> clínica) y el §VI.1 (el blindaje) que el ensayo no tenía antes del refactor del 15-jul-2026.

## 2. Coherencia de cifras (ensayo ↔ tesis ↔ slides ↔ código ↔ CSV)

| Cifra | Ensayo | Tesis | Slides | Fuente real | ¿Coincide? |
|---|---|---|---|---|---|
| κ recurso propio | 0,88 | 0,88 | 0,88 | `exp10_resumen.csv` = 0,8788 | ✅ |
| κ frontera estrecha | 0,00 | 0,00 | 0,00 | `exp10_resumen.csv` = 0,0 | ✅ |
| κ frontera ampliada | **0,70** | 0,70 | 0,70 | `exp10_resumen.csv` = 0,6982 | ✅ |
| Semillas | 24 | 24 | 24 | `SEMILLAS = list(range(24))` | ✅ |
| Unidades autopoiéticas | ~10¹³ | ~10¹³ | 10¹³ | orden de magnitud declarado como tal | ✅ |
| Brecha de eficiencia (benchmark, 19 configuraciones) | «de 2,9×10³ a 4,1×10⁵ —se mueve ciento cuarenta veces—» (sin cifra exacta) | «va de 2.855 a 409.761 (2,9×10³ a 4,1×10⁵) … se mueve ciento cuarenta veces (143×)» | «la brecha se mueve 143×, y no monótonamente» (subtítulo diapositiva 12) | `resultados_escalamiento.csv`: 19 filas, mín. 2.854,82 (SingleGPU, N=2.000.000), máx. 409.760,94 (CPU, N=100), razón = 143,53 | ✅* |

> **Nota sobre la fila de la brecha:** el número recomputado directamente del CSV es 143,53×; tesis
> y slides lo redondean a **143×**, el ensayo lo escribe en prosa como «ciento cuarenta veces» (sin
> el paréntesis numérico). Es un redondeo más grueso, no una cifra distinta — no hay contradicción
> de dato, sólo de granularidad de la prosa. Verificado también: el recorrido **no es monótono**
> (el mínimo cae en SingleGPU N=2.000.000, no en ningún extremo de la tabla de 19 filas) y
> **MultiGPU (mediana ≈1,4×10⁴) es peor que SingleGPU (≈2,9×10³-1,3×10⁴)**, es decir, repartir el
> cómputo entre las dos tarjetas empeora la brecha — ambas afirmaciones del ensayo/tesis se
> reproducen exactamente sobre `simulaciones/datos/resultados_escalamiento.csv`.
>
> **Nota general:** el ensayo ya **no** cita ninguna otra cifra del laboratorio salvo la del
> benchmark. Es deliberado: la auditoría mostró que 8/11 cifras eran consecuencias analíticas de
> constantes elegidas por el autor (`experiment-audit.md`). Las que sobreviven viven en la tesis
> Parte V, y allí van **etiquetadas** con su clase epistémica.

## 3. Cifras eliminadas del ensayo (y por qué)

| Cifra | Antes | Por qué se fue |
|---|---|---|
| 104.450× (brecha silicio/carbono) | Titular del ensayo y del README | Cota superior de una comparación deliberadamente desfavorable; el propio texto ya la descontaba. Y no sostenía la tesis |
| 512× (Exp 5, memoria) | §1 | Se sigue de la localidad de la regla; independiente de N. Compara **dos algoritmos**, ambos de silicio |
| 90 % FLOPs (Exp 1) | §2 | Es `1 − P_CONEXION`: el parámetro leído en voz alta |
| 80,0 % → 1,03 % (Exp 2) | §2 | `E[solapamiento] = p` para vectores Bernoulli(p) |
| tiempo/energía del Exp 1 | CSV publicado | **Fabricados** (literales escritos a mano). Eliminados del código |
| tiempo_ms / energia_J del Exp 6 (`exp6_morfologia.csv`) | CSV publicado | **Mismo defecto del Exp 1, sin corregir hasta esta ronda**: literales escritos a mano (`ejecutar_experimentos.py:283,286`), nunca ejecutados. Eliminados; el CSV ahora sólo publica `modelo,flops` (verificado: 2 columnas, no 4) |
| 4,7 bits / 32.900 bits / 332 bits (Exp 7) | Tesis Parte V | Cotas ilustrativas con falsa precisión |
| ~1.167× fan-out, ~68× cableado 2D/3D | Tesis Parte V | Estimaciones de orden de magnitud; no sostienen nada |

## 4. Enlaces y rutas

| Comprobación | Estado |
|---|---|
| Local (`next dev`): `/`, `/tesis`, `/sintesis`, `/laboratorio`, `/slides/0`, `/slides/14` | **200** (verificado con `curl`) |
| Producción (`https://neurocarbon.stevenvallejo.com`): `/`, `/sintesis`, `/tesis`, `/laboratorio`, `/slides/0`, `/slides/14` | **200** (verificado con `curl` el 15-jul-2026) |
| Ambos PDF servidos en producción: `/ensayo-la-unidad-que-falta.pdf`, `/tesis-la-unidad-que-falta.pdf` | **200** |
| PDFs renombrados y referenciados sin enlaces rotos | ✅ `grep -rn "\.pdf" web/src` → todas las refs a los nombres nuevos |
| PDFs viejos eliminados de `web/public/` | ✅ |
| `generateStaticParams` (`web/src/app/slides/[id]/page.tsx`) = **15** ↔ `slidesData.length` = **15** | ✅ (antes: 14) |
| Diapositivas 9 (Laureys/la clínica), 11 (Beer/la advertencia), 12 (el laboratorio, subtítulo con «143×»), 13 (el blindaje) | ✅ contenido revisado contra el ensayo/tesis |
| Figura del Exp 10 en `/`, `/tesis` §IV.4, slide 12 y ambos PDF | ✅ |
| `SECTION_VISUAL` (`web/src/app/tesis/page.tsx`) remapeado a la numeración de **`web/src/content/tesis.md`** (5 partes): claves `II.2`, `II.6`, `III.2`, `IV.2`, `IV.4` (caso especial fuera del diccionario, figura del Exp 10), `IV.5` | ✅ — ver §6 sobre por qué esa numeración no puede tocarse |
| `tsc --noEmit` | ✅ sin errores (re-verificado 15-jul-2026, sin tocar `web/src`) |

## 5. Lo que NO se verificó

- **`next build` local**: falla por Node 22 vs Next 14.2 (artefacto del entorno, no del código;
  documentado desde julio). Vercel compila bien, y la producción sirve 200 en todas las rutas
  auditadas (§4). Se verificó con `next dev` + `tsc` + `curl` a producción en su lugar.
- **Captura visual (CDP) pixel a pixel**: la verificación de esta ronda se hizo sobre el HTML
  servido (SSR/hidratado) y sobre los códigos de estado HTTP, no sobre píxeles. **El responsive y
  el ajuste de las 15 diapositivas a 16:9 no se re-verificaron visualmente en esta pasada**; no se
  tocó su CSS ni el escalado en `web/src`, sólo contenido de arrays y documentación.
- **Los experimentos 1-9 no se re-ejecutaron en su totalidad**; sí se auditó su código y sus CSV
  (`experiment-audit.md`), y el Exp 10 y el benchmark se reprodujeron cifra a cifra desde los CSV
  publicados.
- **El benchmark (`resultados_escalamiento.csv`) no se re-corrió**: se auditaron sus columnas
  derivadas y se recomputó min/max/razón sobre las 19 filas publicadas, pero no se reejecutó la
  medición de tiempo en la GPU (`experiment-audit.md`, "No pude verificar" §2).

## 6. Divergencia deliberada: `ensayo/tesis.md` vs `web/src/content/tesis.md`

`web/src/content/tesis.md` **no es una copia** de `ensayo/tesis.md`, y la diferencia no es un
descuido: es intencional y está documentada aquí para que no se lea como una inconsistencia.

| | `ensayo/tesis.md` (canónico, entregado, PDF) | `web/src/content/tesis.md` (vive en la web) |
|---|---|---|
| Partes | **6** (I-VI) | **5** (I-V) |
| La clínica (Laureys) | Parte III propia, 4 subsecciones (III.1-III.4) | Plegada dentro de la Parte II, como §II.7 (una sola subsección, condensada) |
| El blindaje necesidad/individuación | §VI.1, primera subsección de la Parte VI | §V.7, última subsección de la Parte V |
| Palabras (prosa, sin metadatos ni bibliografía) | 11.381 según conteo de la entrega | ≈10.100 — más condensada, es la misma prosa reescrita en menos subsecciones |
| Bibliografía | Incluye Laureys (2007), Quian Quiroga et al. (2013), Zeki (1992), LeDoux (1994) | Idéntica: mismas 4 fuentes presentes (`grep` confirma las 4 en ambos archivos) |

**Por qué no se renumeró `web/src/content/tesis.md` para que coincida con `ensayo/tesis.md`:**
`web/src/app/tesis/page.tsx` ancla figuras y componentes React a claves de sección literales —el
diccionario `SECTION_VISUAL` (`II.2`, `II.6`, `III.2`, `IV.2`, `IV.5`) más el caso especial `IV.4`
para la figura del Experimento 10 (líneas 191-212 del archivo)—. Esas claves están calculadas para
la numeración de **5 partes**. Renumerar el archivo de contenido a 6 partes (como el canónico)
movería `III.2` (el mapa del argumento, `ArgMap`), `IV.2` (`SparseCoding`), `IV.4` (la figura del
Exp 10) y `IV.5` (los cuatro explicadores restantes) a secciones que ya no son las que esas figuras
ilustran, rompiendo la relación figura↔argumento en toda la página. Renumerar `page.tsx` en vez del
contenido queda fuera del alcance de este cierre (es cambiar código, no documentación) y no hay
urgencia: se verificó que **el contenido es equivalente** — las mismas citas verbatim de Laureys
(2007), la misma conclusión clínica (auto-producción completa, sujeto ausente, covaría la
conectividad y no el metabolismo) y el mismo blindaje necesidad/individuación están presentes en
ambos archivos, sólo repartidos en distinta cantidad de partes.

**Regla de gobierno que esto no rompe:** «el ensayo gobierna» se refiere a la *tesis* — y ambas
versiones de la tesis extendida sostienen la misma. El archivo **canónico y citable** para la tesis
extendida es `ensayo/tesis.md` (y su PDF); `web/src/content/tesis.md` es una presentación web de la
misma tesis, reestructurada por una restricción de implementación (las claves de `SECTION_VISUAL`),
no por una revisión de contenido.
