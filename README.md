# Ensayo Final — Filosofía de las Neurociencias (2026-1)

> **Entrega: 15 de julio de 2026 · Prof. Santiago Arango**  
> **Extensión: 2.000 palabras (ensayo) + 4.500 palabras (tesis extendida)**  
> **Web: https://neurocarbon.stevenvallejo.com**

## Estado (julio 2026)

Ensayo completo + **laboratorio computacional escalonado en 4 tiers de hardware** (CPU → Single GPU → Multi-GPU → Híbrido) + **10 experimentos biofísicos específicos**, diseñados para hacer **visible** el cuello de botella de Von Neumann en cada nivel de escala. Cada tier expone un límite físico distinto del silicio digital:

| Tier | Hardware | Hasta | Cuello de botella |
|---|---|---|---|
| 1 | CPU (NumPy) | 8K | loop Python |
| 2 | Single GPU (RTX 5070 Ti) | 6M | VRAM 16 GB |
| 3 | Multi-GPU (PCIe Gen3) | 12M | bus PCIe (×10 penalty) |
| 4 | Híbrido (DDR + PCIe + GIL) | 16M | todo a la vez (×100 penalty) |

**Hallazgo central**: la brecha silicio/carbono es **emergente de la arquitectura**, no monotónica con N. Va de **3.000×** (single GPU 1M neuronas) hasta **104.450×** (híbrido 16M neuronas). Simular 1 segundo biológico tarda 11 minutos en el híbrido.

## 🔓 Ciencia abierta y reproducibilidad

Este repositorio es **completamente abierto**: todo el proceso, los datos y el código de cómo se construyó el trabajo están aquí, para que cualquiera pueda inspeccionarlo, verificarlo y reproducirlo.

- **Textos** (`ensayo/`): ensayo y tesis en Markdown y **PDF**, más el guion de sustentación.
- **Código** (`simulaciones/`): los modelos biofísicos y los 10 experimentos, sin ofuscación.
- **Datos crudos** (`simulaciones/datos/`): los CSV/JSON exactos que producen las cifras citadas en el ensayo — cada número del texto es rastreable a un archivo.
- **Gráficos** (`simulaciones/graficos/`): generados por scripts versionados, no editados a mano.
- **Web** (`web/`): el código fuente de las cuatro superficies interactivas (ensayo, tesis, laboratorio, presentación).

**Método.** El laboratorio no *demuestra* la tesis filosófica: la hace *visible y cuantificable*. Cada experimento aísla un límite físico distinto del silicio digital frente al carbono vivo, y cada cifra está fundamentada en fuentes primarias verificadas (Bartol et al. 2015; Attwell & Laughlin 2001; Horowitz 2014; entre otras). El benchmark se ejecuta **deliberadamente sin optimizar**, tal como correría una red de silicio típica, para que cada cuello de botella sea una observación reproducible y no un detalle de implementación. Reproducir todo: `./ejecutar_laboratorio.sh`.

**Licencia:** [MIT](LICENSE) para el código; los textos e imágenes son del autor. Ver [`CRITICA_ENSAYO.md`](CRITICA_ENSAYO.md) para el registro de autocrítica y correcciones.

## Estructura del Proyecto

* **Textos finales (`ensayo/`):**
  * **[00_ensayo.md](ensayo/00_ensayo.md)** · **[00_ensayo.pdf](ensayo/00_ensayo.pdf):** Ensayo final (~2.000 palabras) con datos del benchmark escalonado.
  * **[tesis.md](ensayo/tesis.md)** · **[tesis.pdf](ensayo/tesis.pdf):** Tesis extendida (~4.500 palabras) con los 3 ejes nuevos (variabilidad, I/O, intercambio) y fuentes primarias.
  * **[guion_presentacion.md](ensayo/guion_presentacion.md):** Guion de sustentación (13 diapositivas, tiempos, defensa de preguntas).

* **[ejecutar_laboratorio.sh](ejecutar_laboratorio.sh):** Script ejecutable que activa el venv, corre los 4 tiers + los 10 experimentos, genera todos los gráficos y el dashboard.

* **`simulaciones/`:**
  * **[modelos.py](simulaciones/modelos.py):** Modelos biofísicos (HH, LIF multicompartimental, STDP) con homeostasis sináptica y propagación chunked para evitar OOM.
  * **[ejecutar.py](simulaciones/ejecutar.py):** Orquestador del benchmark escalonado (CPU → 4 tiers GPU → Híbrido).
  * **[ejecutar_experimentos.py](simulaciones/ejecutar_experimentos.py):** Experimentos 1-6 (jerarquía visual, células de concepto, diversidad química, oscilaciones, plasticidad, cómputo morfológico).
  * **[experimentos_variabilidad.py](simulaciones/experimentos_variabilidad.py):** Experimentos 7-9 (variabilidad sináptica, fan-out I/O, intercambio energético).
  * **[experimento_autopoiesis.py](simulaciones/experimento_autopoiesis.py):** Experimento 10 (acoplamiento homeostático cómputo↔auto-mantenimiento: firma operacional de la autopoiesis, κ≈0,88 carbono vs 0,00 silicio; simulación dinámica con 24 semillas y barras de error). **No mide conciencia**, sino el eje de auto-producción que faltaba.
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

## 🔬 Los 9 Experimentos Biofísicos

**Experimentos 1–6 (Benchmark visual + cuello de botella):**

1. **Jerarquía Visual (Zeki, 1992)** — Campos receptivos locales en 5 capas corticales (V1→IT). FLOPs: 22.154.880 → 2.218.827 = **90% reducción**.
2. **Células de Concepto (Quian Quiroga et al., 2013)** — 200 conceptos × 500 trials; WTA esparcida del 1% elimina crosstalk: **80,0% → 1,03%**.
3. **Diversidad Neuroquímica (LeDoux, 1994 / Marder, 2012)** — Hodgkin-Huxley con 1–15 canales iónicos; coste: 120.000 → 428.000 FLOPs. Lineal en silicio, marginal en carbono.
4. **Oscilaciones y Sincronía (Bechtel, 2008)** — Red cortical de 5.000 neuronas, 2 s simulado; emergencia de banda **BETA–GAMMA (13–80 Hz)** (~58% de potencia).
5. **Plasticidad y Aprendizaje (Hinton, 1992)** — STDP local: 39 KB vs. backprop centralizado: 20.000 KB = **512× reducción de memoria**.
6. **Computación Morfológica (Webb, 1996 / Clark, 2015)** — Localización sonora: 757.760 FLOPs (FFT digital) vs. 2 FLOPs (cuerpo resonante del grillo) = **378.880× más ineficiente**.

**Experimentos 7–9 (Nuevos ejes: variabilidad, I/O, intercambio):**

7. **Variabilidad Sináptica (Bartol et al. 2015, eLife)** — Reconstrucción nanoconectómica. Sinapsis carbono: **4,7 bits/sinapsis** (26 estados; +100 neuromoduladores ≈ +332 bits combinatorios) vs. silicio: ~1 bit/sinapsis.
8. **Fan-Out I/O y entrega circulatoria** — Carbono: ~7.000 sinapsis/neurona vs. silicio: ~6 = **1.167×**. Cableado 2D vs 3D: ~68× a escala cerebral (N^(1/6)); 600 km de capilares, cada neurona a ~20 µm, ratio 1:1 volumétrico.
9. **Intercambio vs. Cómputo (Horowitz 2014, ISSCC / Attwell-Laughlin 2001)** — Mover datos cuesta ~650× computarlos; en silicio **99,8% de la energía es intercambio**, no cómputo. Potencial de acción del carbono: ~211 pJ/evento.

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
| **Zeki (1992)** | Jerarquía visual | V1→IT: campos receptivos progresivamente amplios |
| **Quian Quiroga et al. (2013)** | Células de concepto | 1% WTA esparcida → crosstalk 80% → 1,03% |
| **LeDoux (1994), Marder (2012)** | Diversidad química | decenas de neuromoduladores, 15+ canales iónicos/neurona |
| **Bechtel (2008)** | Oscilaciones | Banda beta–gamma emergente (13–80 Hz) |
| **Hinton (1992)** | Plasticidad local | STDP: 39 KB vs backprop: 20.000 KB (512×) |
| **Webb (1996), Clark (2015)** | Cómputo morfológico | Resonancia acústica 2 FLOPs vs FFT 757.760 |
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

- [x] Confirmar tema/consigna.
- [x] Extraer bibliografía y cronograma.
- [x] Redactar ensayo completo (~2.000 palabras).
- [x] Redactar tesis extendida (~4.500 palabras con 3 ejes nuevos).
- [x] Refactorizar simulaciones para escalado a 16M neuronas con homeostasis.
- [x] Generar benchmark escalonado en 4 tiers de hardware.
- [x] Actualizar gráficos con anotaciones de cuello de botella por tier.
- [x] Implementar 10 experimentos biofísicos (1–6 benchmark + 7–9 variabilidad/I/O/intercambio + 10 acoplamiento homeostático/autopoiesis).
- [x] Integrar fuentes primarias nuevas (Bartol 2015, Attwell-Laughlin 2001, Horowitz 2014).
- [x] Desplegar web en Vercel (https://neurocarbon.stevenvallejo.com) con 4 secciones.
- [x] Actualizar README con estado final.
- [ ] Presentación final en diapositivas (entrega: 15 de julio 2026).