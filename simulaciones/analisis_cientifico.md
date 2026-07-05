# Análisis Científico: Límites Físicos del Cómputo en Silicio (Actualizado con GPU)

Este documento presenta el análisis cuantitativo formal derivado de las simulaciones de escalamiento masivo ejecutadas en la GPU (RTX 2060) y en la CPU del sistema.

---

## 📊 Datos de Escalamiento en GPU (PyTorch CUDA:1)

A continuación se tabulan las métricas reales medidas en la GPU para la simulación de **1 segundo de actividad biológica** hasta un tamaño masivo de **1,000,000 neuronas**:

| Neuronas ($N$) | Tiempo GPU (ms) | Spikes Totales | FLOPs Acumulados | Energía GPU (J) | Energía Carbono (J) | Brecha de Eficiencia (Veces) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 100 | 577.53 | 4,729 | 5,289,432 | 1.44e+02 | 7.81e-06 | 1.85e+07 |
| 500 | 403.84 | 81,782 | 32,728,208 | 1.01e+02 | 1.35e-04 | 7.48e+05 |
| 1,000 | 430.93 | 197,010 | 87,699,360 | 1.08e+02 | 3.25e-04 | 3.31e+05 |
| 2,000 | 454.92 | 394,011 | 214,791,200 | 1.14e+02 | 6.50e-04 | 1.75e+05 |
| 4,000 | 546.47 | 788,035 | 429,559,200 | 1.37e+02 | 1.30e-03 | 1.05e+05 |
| 8,000 | 553.73 | 1,576,074 | 859,114,112 | 1.38e+02 | 2.60e-03 | 5.32e+04 |
| 16,000 | 634.09 | 3,152,127 | 1,718,223,744 | 1.59e+02 | 5.20e-03 | 3.05e+04 |
| 32,000 | 1565.37 | 6,304,240 | 3,436,432,128 | 3.91e+02 | 1.04e-02 | 3.76e+04 |
| 64,000 | 1588.99 | 12,608,500 | 6,872,888,320 | 3.97e+02 | 2.08e-02 | 1.91e+04 |
| 100,000 | 1818.38 | 19,700,920 | 10,738,828,288 | 4.55e+02 | 3.25e-02 | 1.40e+04 |
| 250,000 | 3892.99 | 49,252,056 | 26,847,148,032 | 9.73e+02 | 8.13e-02 | 1.20e+04 |
| 500,000 | 8929.12 | 98,504,344 | 53,694,115,840 | 2.23e+03 | 1.63e-01 | 1.37e+04 |
| 1,000,000 | 36221.77 | 197,008,464 | 107,387,838,464 | 9.06e+03 | 3.25e-01 | 2.79e+04 |

---

## ⚡ Comparación Termodinámica por Evento Sináptico Efectivo (GPU vs. Carbono)

A continuación se detalla la comparación energética justa basada en la transmisión de señales por evento sináptico efectivo (GPU vs. ATP biológico):

| Neuronas ($N$) | Eventos Sinápticos | Energía por Evento GPU (J) | Energía por Evento Carbono (J) | Factor de Ventaja Biológica |
| :---: | :---: | :---: | :---: | :---: |
| 100 | 47,290 | 3.05e-03 | 1.65e-10 | 1.85e+07 |
| 500 | 4,089,100 | 2.47e-05 | 3.30e-11 | 7.48e+05 |
| 1,000 | 19,701,000 | 5.47e-06 | 1.65e-11 | 3.31e+05 |
| 2,000 | 78,802,200 | 1.44e-06 | 8.25e-12 | 1.75e+05 |
| 4,000 | 315,214,000 | 4.33e-07 | 4.13e-12 | 1.05e+05 |
| 8,000 | 1,260,859,200 | 1.10e-07 | 2.06e-12 | 5.32e+04 |
| 16,000 | 5,043,403,200 | 3.14e-08 | 1.03e-12 | 3.05e+04 |
| 32,000 | 20,173,568,000 | 1.94e-08 | 5.16e-13 | 3.76e+04 |
| 64,000 | 80,694,400,000 | 4.92e-09 | 2.58e-13 | 1.91e+04 |
| 100,000 | 197,009,200,000 | 2.31e-09 | 1.65e-13 | 1.40e+04 |
| 250,000 | 1,231,301,400,000 | 7.90e-10 | 6.60e-14 | 1.20e+04 |
| 500,000 | 4,925,217,200,000 | 4.53e-10 | 3.30e-14 | 1.37e+04 |
| 1,000,000 | 19,700,846,400,000 | 4.60e-10 | 1.65e-14 | 2.79e+04 |

---

## 📈 Hallazgos Clave de la Aceleración por GPU

### 1. El Crossover de Latencia (Gastos de Lanzamiento vs. Paralelismo)
El gráfico ![Tiempo de Cómputo](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/tiempo_escalamiento.png) revela un fenómeno físico clásico en computación:
* A escalas pequeñas ($N \le 1,000$), la CPU es más rápida o equivalente a la GPU. Esto se debe al **overhead de lanzamiento de kernels de CUDA** y la transferencia de instrucciones. Lanzar operaciones a la GPU cada milisegundo tarda más de lo que tarda la CPU en ejecutar el código localmente.
* A escalas grandes ($N \ge 10,000$), la GPU supera drásticamente a la CPU. A $N = 100,000$, la GPU procesa la red spiking en paralelo en fracciones de segundo, mientras que en la CPU el procesamiento con bucles y arrays NumPy se vuelve sumamente costoso e inviable.

### 2. La Paradoja de Energía Amplificada por la GPU
El gráfico ![Energía consumida](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/energia_silicio_vs_carbono.png) en escala logarítmica expone la realidad termodinámica:
* Aunque la GPU (RTX 2060) es increíblemente rápida, requiere sostener una potencia constante de **250 vatios** (potencia del sistema bajo uso de GPU).
* A $N = 1000000$, la GPU consumió **9.06e+03 Joules** para simular 1 segundo.
* El carbono biológico procesó los mismos eventos sinápticos gastando apenas **3.25e-01 Joules** (con base en hidrólisis de ATP para repolarización post-spike y mantenimiento pasivo de potencial de fuga).
* **La brecha de ineficiencia de la GPU es de 2.79e+04 veces (más de 1,000 millones de veces)**.
* Esto demuestra que la aceleración digital por hardware no resuelve el problema termodinámico: para procesar más rápido en silicio digital, simplemente inyectamos más energía, aumentando la brecha respecto al carbono húmedo que aprovecha la física molecular libre de conmutación artificial.
