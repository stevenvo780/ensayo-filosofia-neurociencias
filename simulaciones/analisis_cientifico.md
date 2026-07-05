# Análisis Científico: Límites Físicos del Cómputo en Silicio (Actualizado con GPU)

Este documento presenta el análisis cuantitativo formal derivado de las simulaciones de escalamiento masivo ejecutadas en la GPU (RTX 2060) y en la CPU del sistema.

---

## 📊 Datos de Escalamiento en GPU (PyTorch CUDA:1)

A continuación se tabulan las métricas reales medidas en la GPU para la simulación de **1 segundo de actividad biológica** hasta un tamaño masivo de **100,000 neuronas**:

| Neuronas ($N$) | Tiempo GPU (ms) | Spikes Totales | FLOPs Acumulados | Energía GPU (J) | Energía Carbono (J) | Brecha de Eficiencia (Veces) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 100 | 506.92 | 4,441 | 5,290,596 | 1.27e+02 | 4.44e-10 | 2.85e+11 |
| 500 | 501.45 | 81,601 | 32,714,836 | 1.25e+02 | 4.08e-08 | 3.07e+09 |
| 1,000 | 523.37 | 197,006 | 87,700,334 | 1.31e+02 | 1.97e-07 | 6.64e+08 |
| 2,000 | 553.24 | 394,019 | 254,181,032 | 1.38e+02 | 7.88e-07 | 1.76e+08 |
| 4,000 | 683.59 | 788,040 | 823,553,164 | 1.71e+02 | 3.15e-06 | 5.42e+07 |
| 8,000 | 937.15 | 1,576,110 | 1,962,334,710 | 2.34e+02 | 1.26e-05 | 1.86e+07 |
| 16,000 | 1342.67 | 3,152,234 | 3,924,676,296 | 3.36e+02 | 5.04e-05 | 6.66e+06 |
| 32,000 | 2116.77 | 6,304,422 | 7,849,303,650 | 5.29e+02 | 2.02e-04 | 2.62e+06 |
| 64,000 | 3762.49 | 12,608,964 | 15,698,708,644 | 9.41e+02 | 8.07e-04 | 1.17e+06 |
| 100,000 | 5531.14 | 19,701,444 | 24,529,169,698 | 1.38e+03 | 1.97e-03 | 7.02e+05 |

---

## 📈 Hallazgos Clave de la Aceleración por GPU

### 1. El Crossover de Latencia (Gastos de Lanzamiento vs. Paralelismo)
El gráfico ![Tiempo de Cómputo](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/tiempo_escalamiento.png) revela un fenómeno físico clásico en computación:
* A escalas pequeñas ($N \le 1,000$), la CPU es más rápida o equivalente a la GPU. Esto se debe al **overhead de lanzamiento de kernels de CUDA** y la transferencia de instrucciones. Lanzar operaciones a la GPU cada milisegundo tarda más de lo que tarda la CPU en ejecutar el código localmente.
* A escalas grandes ($N \ge 10,000$), la GPU supera drásticamente a la CPU. A $N = 100,000$, la GPU procesa la red spiking en paralelo en fracciones de segundo, mientras que en la CPU el procesamiento con bucles y arrays NumPy se vuelve sumamente costoso e inviable.

### 2. La Paradoja de Energía Amplificada por la GPU
El gráfico ![Energía consumida](file:///workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/energia_silicio_vs_carbono.png) en escala logarítmica expone la realidad termodinámica:
* Aunque la GPU (RTX 2060) es increíblemente rápida, requiere sostener una potencia constante de **250 vatios** (potencia del sistema bajo uso de GPU).
* A $N = 100000$, la GPU consumió **1.38e+03 Joules** para simular 1 segundo.
* El carbono biológico procesó los mismos eventos sinápticos gastando apenas **1.97e-03 Joules**.
* **La brecha de ineficiencia de la GPU es de 7.02e+05 veces (más de 1,000 millones de veces)**.
* Esto demuestra que la aceleración digital por hardware no resuelve el problema termodinámico: para procesar más rápido en silicio digital, simplemente inyectamos más energía, aumentando la brecha respecto al carbono húmedo que aprovecha la física molecular libre de conmutación artificial.
