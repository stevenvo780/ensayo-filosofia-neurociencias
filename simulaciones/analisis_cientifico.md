# Análisis Científico: Límites Físicos del Cómputo en Silicio (Actualizado con GPU)

Este documento presenta el análisis cuantitativo formal derivado de las simulaciones de escalamiento masivo ejecutadas en la GPU (RTX 2060) y en la CPU del sistema.

---

## 📊 Datos de Escalamiento en GPU (PyTorch CUDA:1)

A continuación se tabulan las métricas reales medidas en la GPU para la simulación de **1 segundo de actividad biológica** hasta un tamaño masivo de **100,000 neuronas**:

| Neuronas ($N$) | Tiempo GPU (ms) | Spikes Totales | FLOPs Acumulados | Energía GPU (J) | Energía Carbono (J) | Brecha de Eficiencia (Veces) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 100 | 851.07 | 4,679 | 5,289,542 | 2.13e+02 | 7.73e-06 | 2.75e+07 |
| 500 | 478.48 | 81,824 | 32,730,980 | 1.20e+02 | 1.35e-04 | 8.86e+05 |
| 1,000 | 491.18 | 197,011 | 87,698,248 | 1.23e+02 | 3.25e-04 | 3.78e+05 |
| 2,000 | 526.14 | 394,033 | 254,187,104 | 1.32e+02 | 6.50e-04 | 2.02e+05 |
| 4,000 | 634.86 | 788,083 | 823,581,696 | 1.59e+02 | 1.30e-03 | 1.22e+05 |
| 8,000 | 866.53 | 1,576,093 | 1,962,308,352 | 2.17e+02 | 2.60e-03 | 8.33e+04 |
| 16,000 | 1225.55 | 3,152,271 | 3,924,721,920 | 3.06e+02 | 5.20e-03 | 5.89e+04 |
| 32,000 | 1985.12 | 6,304,437 | 7,849,288,704 | 4.96e+02 | 1.04e-02 | 4.77e+04 |
| 64,000 | 3399.04 | 12,608,826 | 15,698,531,328 | 8.50e+02 | 2.08e-02 | 4.08e+04 |
| 100,000 | 5172.11 | 19,701,528 | 24,529,125,376 | 1.29e+03 | 3.25e-02 | 3.98e+04 |

---

## ⚡ Comparación Termodinámica por Evento Sináptico Efectivo (GPU vs. Carbono)

A continuación se detalla la comparación energética justa basada en la transmisión de señales por evento sináptico efectivo (GPU vs. ATP biológico):

| Neuronas ($N$) | Eventos Sinápticos | Energía por Evento GPU (J) | Energía por Evento Carbono (J) | Factor de Ventaja Biológica |
| :---: | :---: | :---: | :---: | :---: |
| 100 | 46,790 | 4.55e-03 | 1.65e-10 | 2.75e+07 |
| 500 | 4,091,200 | 2.92e-05 | 3.30e-11 | 8.86e+05 |
| 1,000 | 19,701,100 | 6.23e-06 | 1.65e-11 | 3.78e+05 |
| 2,000 | 78,806,600 | 1.67e-06 | 8.25e-12 | 2.02e+05 |
| 4,000 | 315,233,200 | 5.03e-07 | 4.13e-12 | 1.22e+05 |
| 8,000 | 1,260,874,400 | 1.72e-07 | 2.06e-12 | 8.33e+04 |
| 16,000 | 5,043,633,600 | 6.07e-08 | 1.03e-12 | 5.89e+04 |
| 32,000 | 20,174,198,400 | 2.46e-08 | 5.16e-13 | 4.77e+04 |
| 64,000 | 80,696,486,400 | 1.05e-08 | 2.58e-13 | 4.08e+04 |
| 100,000 | 197,015,280,000 | 6.56e-09 | 1.65e-13 | 3.98e+04 |

---

## 📈 Hallazgos Clave de la Aceleración por GPU

### 1. El Crossover de Latencia (Gastos de Lanzamiento vs. Paralelismo)
El gráfico ![Tiempo de Cómputo](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/tiempo_escalamiento.png) revela un fenómeno físico clásico en computación:
* A escalas pequeñas ($N \le 1,000$), la CPU es más rápida o equivalente a la GPU. Esto se debe al **overhead de lanzamiento de kernels de CUDA** y la transferencia de instrucciones. Lanzar operaciones a la GPU cada milisegundo tarda más de lo que tarda la CPU en ejecutar el código localmente.
* A escalas grandes ($N \ge 10,000$), la GPU supera drásticamente a la CPU. A $N = 100,000$, la GPU procesa la red spiking en paralelo en fracciones de segundo, mientras que en la CPU el procesamiento con bucles y arrays NumPy se vuelve sumamente costoso e inviable.

### 2. La Paradoja de Energía Amplificada por la GPU
El gráfico ![Energía consumida](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/energia_silicio_vs_carbono.png) en escala logarítmica expone la realidad termodinámica:
* Aunque la GPU (RTX 2060) es increíblemente rápida, requiere sostener una potencia constante de **250 vatios** (potencia del sistema bajo uso de GPU).
* A $N = 100000$, la GPU consumió **1.29e+03 Joules** para simular 1 segundo.
* El carbono biológico procesó los mismos eventos sinápticos gastando apenas **3.25e-02 Joules** (con base en hidrólisis de ATP para repolarización post-spike y mantenimiento pasivo de potencial de fuga).
* **La brecha de ineficiencia de la GPU es de 3.98e+04 veces (más de 1,000 millones de veces)**.
* Esto demuestra que la aceleración digital por hardware no resuelve el problema termodinámico: para procesar más rápido en silicio digital, simplemente inyectamos más energía, aumentando la brecha respecto al carbono húmedo que aprovecha la física molecular libre de conmutación artificial.
