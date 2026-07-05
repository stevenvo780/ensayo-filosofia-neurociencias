#!/bin/bash
# Script maestro para reproducir todos los experimentos y gráficos del laboratorio científico-filosófico.

set -e

echo "=========================================================="
echo "LABORATORIO COMPUTACIONAL DE FILOSOFÍA DE LAS NEUROCIENCIAS"
echo "=========================================================="

# Activar entorno virtual
if [ -d "/workspace/ensayo-filosofia-neurociencias/venv" ]; then
    echo "[+] Activando entorno virtual de Python..."
    source /workspace/ensayo-filosofia-neurociencias/venv/bin/activate
else
    echo "[-] Error: No se encontró el entorno virtual venv en /workspace/ensayo-filosofia-neurociencias/venv"
    exit 1
fi

echo "[+] 1. Ejecutando simulación de escalamiento sistemático (N=100 a 8000)..."
python3 /workspace/ensayo-filosofia-neurociencias/simulaciones/ejecutar.py

echo "[+] 2. Ejecutando los 6 experimentos biofísicos basados en autores..."
python3 /workspace/ensayo-filosofia-neurociencias/simulaciones/ejecutar_experimentos.py

echo "[+] 3. Generando curvas y gráficos científicos en simulaciones/graficos/..."
python3 /workspace/ensayo-filosofia-neurociencias/simulaciones/graficar.py
python3 /workspace/ensayo-filosofia-neurociencias/simulaciones/graficar_resultados.py

echo "=========================================================="
echo "[+] ¡PROCESO COMPLETADO EXITOSAMENTE!"
echo "[+] Dashboard interactivo creado en: file:///workspace/ensayo-filosofia-neurociencias/simulaciones/dashboard.html"
echo "=========================================================="
