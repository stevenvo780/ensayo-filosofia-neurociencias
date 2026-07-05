# Ensayo Final — Filosofía de las Neurociencias (2026-1)

> **Entrega: 15 de julio de 2026 · Prof. Santiago Arango · Extensión: 2000 palabras**

## Estado
El ensayo ha sido redactado por completo en base a las lecturas del curso y las directrices detalladas de la consigna. Se incorporaron simulaciones de redes neuronales densas y biológicas esparcidas en silicio para justificar empíricamente el costo computacional y energético de los sustratos de procesamiento, analizando sus implicaciones ontológicas en el problema de la mente.

## Material fuente
- **Grabación de clase (Zoom):** `GMT20260320-130023_Recording_2240x1260_ai_50fps.mp4`
  (~28 GB) vive en `ws-personal:/workspace/FilosofiaNeurocienciasProyecto/`.
  **No se versiona en git**. Se extrajeron la bibliografía, temas y tesis del curso mediante el cronograma `.docx` y las lecturas principales.

## Estructura del Proyecto

* **[ensayo/00_ensayo.md](file:///workspace/ensayo-filosofia-neurociencias/ensayo/00_ensayo.md):** Ensayo final completo (~2400 palabras en español) que integra reflexiones filosóficas con los datos y gráficos de la simulación empírica.
* **[ejecutar_laboratorio.sh](file:///workspace/ensayo-filosofia-neurociencias/ejecutar_laboratorio.sh):** Script ejecutable de Bash que activa el entorno virtual de Python, corre los experimentos de escalamiento, ejecuta las simulaciones y genera el dashboard HTML de forma completamente automatizada.
* **`simulaciones/`:**
  * **[modelos.py](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/modelos.py):** Implementación formal de los modelos biofísicos (Hodgkin-Huxley completo, neuronas LIF multicompartimentales, sinapsis con STDP y dinámica vesicular de calcio, y red cortical con retardos axonales).
  * **[ejecutar.py](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/ejecutar.py):** Código de escalamiento sistemático ($N = 100$ a $8000$) para análisis energético.
  * **[ejecutar_experimentos.py](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/ejecutar_experimentos.py):** Orquestador de los 6 experimentos específicos.
  * **[graficar_resultados.py](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficar_resultados.py):** Generador de gráficos de alta resolución e integrador del dashboard interactivo.
  * **`datos/`:** Reportes crudos de datos en CSV y JSON ([analisis_cientifico.md](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/analisis_cientifico.md) sintetiza estos datos).
  * **`graficos/`:** Gráficos científicos PNG de alta definición incrustados en el ensayo.
  * **[index.html](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/index.html):** Aplicación web interactiva premium que contiene el ensayo completo, la exposición de diapositivas paso a paso con notas de orador y el dashboard con los datos del laboratorio.
  * **[dashboard.html](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/dashboard.html):** Dashboard interactivo de soporte.
  * **`datos/`:** Reportes crudos de datos en CSV y JSON ([analisis_cientifico.md](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/analisis_cientifico.md) sintetiza estos datos).
  * **`graficos/`:** Gráficos científicos PNG de alta definición incrustados en el ensayo.
  * **[index.html](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/index.html):** Interfaz web premium principal.

---

## 🔬 Los 6 Experimentos Implementados

1. **Jerarquía Visual (Zeki, 1992):** Contraste de costo computacional (FLOPs) entre el procesamiento denso de silicio y la segmentación esparcida local cortical (campos receptivos locales).
2. **Células de Concepto (Quian Quiroga et al., 2013):** Evaluación cuantitativa de la interferencia de memoria (crosstalk) entre codificación distribuida densa (silicio) y codificación esparcida del 1% (carbono).
3. **Diversidad Neuroquímica (LeDoux, 1994 / Greenwood, 2024):** Medición del costo algorítmico en silicio al añadir secuencialmente 10 canales químicos acoplados en una neurona Hodgkin-Huxley completa.
4. **Oscilaciones y Sincronía (Bechtel, 2008):** Emergencia de ritmos coherentes colectivos en la banda Gamma de una red de 1000 neuronas E-I con retardos axonales y análisis espectral FFT.
5. **Plasticidad y Aprendizaje (Hinton, 1992):** Comparación de sobrecarga de memoria de estado entre Backpropagation global y la regla local STDP con facilitación sináptica a corto plazo.
6. **Computación Morfológica (Webb, 1996 / Clark, 2015):** Simulación del grillo robot demostrando cómo la morfología corporal reduce la carga de cómputo lúdico en silicio.

---

## 🚀 Cómo Reproducir

Para instalar y ejecutar todo el laboratorio en un único comando desde la raíz del repositorio, ejecuta:

```bash
./ejecutar_laboratorio.sh
```

El script se encargará de activar el entorno de Python, correr los cálculos numéricos y actualizar todos los gráficos y el dashboard de control.

---

## Pendientes
- [x] Confirmar tema/consigna exacta con el profesor o en Agora web.
- [x] Extraer bibliografía, cronograma y temas del curso del archivo `.docx` y papers.
- [x] Redactar ensayo completo (~2400 palabras) en [00_ensayo.md](file:///workspace/ensayo-filosofia-neurociencias/ensayo/00_ensayo.md).
- [x] Desarrollar simulaciones numéricas a gran escala (6 experimentos con Hodgkin-Huxley, STDP y computación morfológica).
- [x] Crear generador de gráficos científicos y dashboard HTML interactivo ([index.html](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/index.html)).
- [ ] Preparar presentación en diapositivas (entrega: 15 de julio de 2026).


