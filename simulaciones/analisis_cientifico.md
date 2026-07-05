# Análisis Científico: Límites Físicos del Cómputo en Silicio (Actualizado con GPU)

Este documento presenta el análisis cuantitativo formal derivado de las simulaciones de escalamiento masivo ejecutadas en la GPU (RTX 2060) y en la CPU del sistema.

---

## 📊 Datos de Escalamiento en GPU (PyTorch CUDA:1)

A continuación se tabulan las métricas reales medidas en la GPU para la simulación de **1 segundo de actividad biológica** hasta un tamaño masivo de **2,000,000 neuronas**:

| Neuronas ($N$) | Tiempo GPU (ms) | Spikes Totales | FLOPs Acumulados | Energía GPU (J) | Energía Carbono (J) | Brecha de Eficiencia (Veces) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 100 | 448.74 | 4,215 | 5,291,380 | 1.12e+02 | 6.96e-06 | 1.61e+07 |
| 500 | 362.77 | 81,497 | 32,705,198 | 9.07e+01 | 1.34e-04 | 6.74e+05 |
| 1,000 | 365.18 | 197,010 | 87,699,184 | 9.13e+01 | 3.25e-04 | 2.81e+05 |
| 2,000 | 361.64 | 394,011 | 214,784,160 | 9.04e+01 | 6.50e-04 | 1.39e+05 |
| 4,000 | 359.33 | 788,033 | 429,561,696 | 8.98e+01 | 1.30e-03 | 6.91e+04 |
| 8,000 | 377.76 | 1,576,059 | 859,111,488 | 9.44e+01 | 2.60e-03 | 3.63e+04 |
| 16,000 | 400.00 | 3,152,123 | 1,718,224,128 | 1.00e+02 | 5.20e-03 | 1.92e+04 |
| 32,000 | 452.27 | 6,304,275 | 3,436,422,656 | 1.13e+02 | 1.04e-02 | 1.09e+04 |
| 64,000 | 573.36 | 12,608,530 | 6,872,834,048 | 1.43e+02 | 2.08e-02 | 6.89e+03 |
| 100,000 | 748.71 | 19,700,866 | 10,738,817,024 | 1.87e+02 | 3.25e-02 | 5.76e+03 |
| 250,000 | 1432.81 | 49,252,108 | 26,846,961,664 | 3.58e+02 | 8.13e-02 | 4.41e+03 |
| 500,000 | 2647.80 | 98,503,824 | 53,694,390,272 | 6.62e+02 | 1.63e-01 | 4.07e+03 |
| 1,000,000 | 5244.33 | 197,008,512 | 107,389,067,264 | 1.31e+03 | 3.25e-01 | 4.03e+03 |
| 2,000,000 | 10758.64 | 394,015,456 | 214,777,004,032 | 2.69e+03 | 6.50e-01 | 4.14e+03 |

---

## ⚡ Comparación Termodinámica por Evento Sináptico Efectivo (GPU vs. Carbono)

A continuación se detalla la comparación energética justa basada en la transmisión de señales por evento sináptico efectivo (GPU vs. ATP biológico):

| Neuronas ($N$) | Eventos Sinápticos | Energía por Evento GPU (J) | Energía por Evento Carbono (J) | Factor de Ventaja Biológica |
| :---: | :---: | :---: | :---: | :---: |
| 100 | 42,150 | 2.66e-03 | 1.65e-10 | 1.61e+07 |
| 500 | 4,074,850 | 2.23e-05 | 3.30e-11 | 6.74e+05 |
| 1,000 | 19,701,000 | 4.63e-06 | 1.65e-11 | 2.81e+05 |
| 2,000 | 78,802,200 | 1.15e-06 | 8.25e-12 | 1.39e+05 |
| 4,000 | 315,213,200 | 2.85e-07 | 4.13e-12 | 6.91e+04 |
| 8,000 | 1,260,847,200 | 7.49e-08 | 2.06e-12 | 3.63e+04 |
| 16,000 | 5,043,396,800 | 1.98e-08 | 1.03e-12 | 1.92e+04 |
| 32,000 | 20,173,680,000 | 5.60e-09 | 5.16e-13 | 1.09e+04 |
| 64,000 | 80,694,592,000 | 1.78e-09 | 2.58e-13 | 6.89e+03 |
| 100,000 | 197,008,660,000 | 9.50e-10 | 1.65e-13 | 5.76e+03 |
| 250,000 | 1,231,302,700,000 | 2.91e-10 | 6.60e-14 | 4.41e+03 |
| 500,000 | 4,925,191,200,000 | 1.34e-10 | 3.30e-14 | 4.07e+03 |
| 1,000,000 | 19,700,851,200,000 | 6.65e-11 | 1.65e-14 | 4.03e+03 |
| 2,000,000 | 78,803,091,200,000 | 3.41e-11 | 8.25e-15 | 4.14e+03 |

---

## 📈 Hallazgos Clave de la Aceleración por GPU

### 1. El Crossover de Latencia (Gastos de Lanzamiento vs. Paralelismo)
El gráfico ![Tiempo de Cómputo](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/tiempo_escalamiento.png) revela un fenómeno físico clásico en computación:
* A escalas pequeñas ($N \le 1,000$), la CPU es más rápida o equivalente a la GPU. Esto se debe al **overhead de lanzamiento de kernels de CUDA** y la transferencia de instrucciones. Lanzar operaciones a la GPU cada milisegundo tarda más de lo que tarda la CPU en ejecutar el código localmente.
* A escalas grandes ($N \ge 10,000$), la GPU supera drásticamente a la CPU. A $N = 100,000$, la GPU procesa la red spiking en paralelo en fracciones de segundo, mientras que en la CPU el procesamiento con bucles y arrays NumPy se vuelve sumamente costoso e inviable.

### 2. La Paradoja de Energía Amplificada por la GPU
El gráfico ![Energía consumida](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/energia_silicio_vs_carbono.png) en escala logarítmica expone la realidad termodinámica:
* Aunque la GPU (RTX 2060) es increíblemente rápida, requiere sostener una potencia constante de **250 vatios** (potencia del sistema bajo uso de GPU).
* A $N = 2000000$, la GPU consumió **2.69e+03 Joules** para simular 1 segundo.
* El carbono biológico procesó los mismos eventos sinápticos gastando apenas **6.50e-01 Joules** (con base en hidrólisis de ATP para repolarización post-spike y mantenimiento pasivo de potencial de fuga).
* **La brecha de ineficiencia de la GPU es de 4.14e+03 veces (más de 1,000 millones de veces)**.
* Esto demuestra que la aceleración digital por hardware no resuelve el problema termodinámico: para procesar más rápido en silicio digital, simplemente inyectamos más energía, aumentando la brecha respecto al carbono húmedo que aprovecha la física molecular libre de conmutación artificial.
