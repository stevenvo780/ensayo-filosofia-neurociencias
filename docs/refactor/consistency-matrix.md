# Matriz de consistencia entre entregables

> El **ensayo gobierna**. Ningún entregable puede sostener una tesis distinta.
> Verificado el 15-jul-2026 tras el refactor. Comprobaciones hechas con `grep` sobre el repo y con
> `curl` contra el render en vivo (`next dev`), no por inspección visual.

## 1. ¿Todos sostienen la misma tesis?

| Entregable | Archivo | Tesis nueva | Restos de la anterior | Verificado por |
|---|---|---|---|---|
| **Ensayo** (entregable obligatorio) | `ensayo/00_ensayo.md` | ✅ | 0 | lectura + conteo |
| Ensayo en PDF | `ensayo/00_ensayo.pdf` · `web/public/ensayo-la-unidad-que-falta.pdf` | ✅ 8 pp. | 0 | `pdftotext` |
| Ensayo en web | `web/src/app/page.tsx` | ✅ | 0 | `curl localhost/` + grep |
| **Tesis extendida** | `ensayo/tesis.md` (9.259 pal.) | ✅ | 0 | `grep -c` = 0 |
| Tesis en web | `web/src/content/tesis.md` + `app/tesis/page.tsx` | ✅ | 0 | `curl /tesis` |
| Tesis en PDF | `ensayo/tesis.pdf` · `web/public/tesis-la-unidad-que-falta.pdf` | ✅ 28 pp. | 0 | `pdftotext` |
| **Síntesis oral** | `web/src/app/sintesis/page.tsx` | ✅ | 0 | `curl /sintesis` |
| **Presentación** (14 diapositivas) | `web/src/app/slides/[id]/SlideClient.tsx` | ✅ | 0 (salvo en notas que *critican* la tesis vieja) | `curl /slides/11` |
| Guion de sustentación | `ensayo/guion_presentacion.md` | ✅ | 0 | reescrito |
| Portada/metadata | `web/src/app/layout.tsx` | ✅ | 0 | corregido |
| Tooltips | `web/src/data/refs.ts` | ✅ | 0 | corregidos 3 (κ, RM, neuromórfico) |
| README | `README.md` | ✅ | sólo para decir que se **abandonó** | reescrito |
| Laboratorio | `web/src/app/laboratorio/page.tsx` | ✅ (describe experimentos, no tesis) | — | revisado |

## 2. Coherencia de cifras (ensayo ↔ tesis ↔ slides ↔ código ↔ CSV)

| Cifra | Ensayo | Tesis | Slides | Fuente real | ¿Coincide? |
|---|---|---|---|---|---|
| κ recurso propio | 0,88 | 0,88 | 0,88 | `exp10_resumen.csv` = 0,8788 | ✅ |
| κ frontera estrecha | 0,00 | 0,00 | 0,00 | `exp10_resumen.csv` = 0,0 | ✅ |
| κ frontera ampliada | **0,70** | 0,70 | 0,70 | `exp10_resumen.csv` = 0,6982 | ✅ |
| Semillas | 24 | 24 | 24 | `SEMILLAS = list(range(24))` | ✅ |
| Unidades autopoiéticas | ~10¹³ | ~10¹³ | 10¹³ | orden de magnitud declarado como tal | ✅ |

> **Nota:** el ensayo ya **no** cita ninguna otra cifra del laboratorio. Es deliberado: la auditoría
> mostró que 8/11 eran consecuencias analíticas de constantes elegidas por el autor
> (`experiment-audit.md`). Las que sobreviven viven en la tesis §IV, y allí van **etiquetadas** con su
> clase epistémica.

## 3. Cifras eliminadas del ensayo (y por qué)

| Cifra | Antes | Por qué se fue |
|---|---|---|
| 104.450× (brecha silicio/carbono) | Titular del ensayo y del README | Cota superior de una comparación deliberadamente desfavorable; el propio texto ya la descontaba. Y no sostenía la tesis |
| 512× (Exp 5, memoria) | §1 | Se sigue de la localidad de la regla; independiente de N. Compara **dos algoritmos**, ambos de silicio |
| 90 % FLOPs (Exp 1) | §2 | Es `1 − P_CONEXION`: el parámetro leído en voz alta |
| 80,0 % → 1,03 % (Exp 2) | §2 | `E[solapamiento] = p` para vectores Bernoulli(p) |
| tiempo/energía del Exp 1 | CSV publicado | **Fabricados** (literales escritos a mano). Eliminados del código |
| 4,7 bits / 32.900 bits / 332 bits (Exp 7) | Tesis §II.3 | Cotas ilustrativas con falsa precisión |
| ~1.167× fan-out, ~68× cableado 2D/3D | Tesis §II.5 | Estimaciones de orden de magnitud; no sostienen nada |

## 4. Enlaces y rutas

| Comprobación | Estado |
|---|---|
| `/`, `/tesis`, `/sintesis`, `/laboratorio`, `/slides/0`, `/slides/11` | **200** (verificado con `curl`) |
| PDFs renombrados y referenciados sin enlaces rotos | ✅ `grep -rn "\.pdf" web/src` → 4 refs, todas a los nombres nuevos |
| PDFs viejos eliminados de `web/public/` | ✅ |
| `generateStaticParams` = 14 ↔ `slidesData.length` = 14 | ✅ |
| Figura del Exp 10 en `/`, `/tesis` §IV.4, slide 11 y ambos PDF | ✅ |
| `SECTION_VISUAL` remapeado a la numeración nueva (IV.4 figura, IV.5 explicadores) | ✅ |
| `tsc --noEmit` | ✅ sin errores |

## 5. Lo que NO se verificó

- **`next build` local**: falla por Node 22 vs Next 14.2 (artefacto del entorno, no del código;
  documentado desde julio). Vercel compila bien. Se verificó con `next dev` + `tsc` en su lugar.
- **Captura visual (CDP)**: Chrome headless no arrancó en esta sesión. La verificación de render se
  hizo sobre el HTML servido (SSR), no sobre píxeles. **El responsive y el ajuste de las
  diapositivas a 16:9 no se re-verificaron visualmente**; no se tocó su CSS ni el escalado, sólo el
  contenido de los arrays.
- **Los experimentos 1-9 no se re-ejecutaron en su totalidad**; sí el Exp 1 (corregido) y el Exp 10
  (reformado).
