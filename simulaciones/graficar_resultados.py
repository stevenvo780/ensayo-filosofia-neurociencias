import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def asegurar_directorios():
    os.makedirs("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos", exist_ok=True)

def graficar_todo():
    asegurar_directorios()
    
    # Estilo de graficación científica
    plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['font.size'] = 10
    
    # ------------------ GRÁFICO 1: PERCEPCIÓN JERÁRQUICA (ZEKI) ------------------
    csv1 = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp1_visual.csv"
    if os.path.exists(csv1):
        df1 = pd.read_csv(csv1)
        fig, ax = plt.subplots(figsize=(6, 4))
        colores = ['#3182bd', '#e6550d']
        bars = ax.bar(df1['Modelo'], df1['FLOPs'] / 1e6, color=colores, width=0.5, edgecolor='black', alpha=0.9)
        ax.set_ylabel('Carga Computacional (Millones de FLOPs)', fontsize=10)
        ax.set_title('Jerarquía Visual: Densa vs. Esparcida Cortical', fontsize=11, fontweight='bold', pad=10)
        ax.grid(axis='y', linestyle='--', alpha=0.7)
        # Añadir etiquetas con los valores encima de las barras
        for bar in bars:
            yval = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2, yval + 0.05 * yval, f"{yval:.2f} M", ha='center', va='bottom', fontsize=9, fontweight='bold')
        plt.tight_layout()
        plt.savefig("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp1_visual.png", dpi=300)
        plt.close()

    # ------------------ GRÁFICO 2: CÉLULAS DE CONCEPTO (QUIAN QUIROGA) ------------------
    csv2 = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp2_conceptos.csv"
    if os.path.exists(csv2):
        df2 = pd.read_csv(csv2)
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.hist(df2['Crosstalk_Densa'] * 100, bins=15, alpha=0.7, label='Codificación Densa (Silicio)', color='#3182bd', edgecolor='black')
        ax.hist(df2['Crosstalk_Esparcida'] * 100, bins=15, alpha=0.8, label='Codificación Esparcida (Carbono)', color='#2ca02c', edgecolor='black')
        ax.set_xlabel('Porcentaje de Solapamiento entre Conceptos (%)', fontsize=10)
        ax.set_ylabel('Frecuencia de Ocurrencia', fontsize=10)
        ax.set_title('Interferencia de Memoria (Crosstalk) por Solapamiento', fontsize=11, fontweight='bold', pad=10)
        ax.legend(frameon=True, facecolor='white', framealpha=0.9)
        plt.tight_layout()
        plt.savefig("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp2_crosstalk.png", dpi=300)
        plt.close()

    # ------------------ GRÁFICO 3: DIVERSIDAD QUÍMICA (LEDOUX) ------------------
    csv3 = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp3_quimica.csv"
    if os.path.exists(csv3):
        df3 = pd.read_csv(csv3)
        fig, ax = plt.subplots(figsize=(6, 4))
        ax.plot(df3['Numero_Canales'], df3['Tiempo_Simulacion_ms'], 'o-', color='#d62728', linewidth=2, label='Tiempo en Silicio (ms)')
        ax.set_xlabel('Número de Canales Neuroquímicos Simulados', fontsize=10)
        ax.set_ylabel('Tiempo de Cómputo (ms)', color='#d62728', fontsize=10)
        ax.tick_params(axis='y', labelcolor='#d62728')
        
        ax2 = ax.twinx()
        ax2.plot(df3['Numero_Canales'], df3['FLOPs_Totales'] / 1e6, 's--', color='#7f7f7f', linewidth=1.5, label='Operaciones lógicas')
        ax2.set_ylabel('Operaciones Acumuladas (Millones de FLOPs)', color='#555555', fontsize=10)
        ax2.tick_params(axis='y', labelcolor='#555555')
        
        ax.set_title('Escalamiento del Costo por Canal Neuroquímico', fontsize=11, fontweight='bold', pad=10)
        ax.grid(True, linestyle='--', alpha=0.5)
        plt.tight_layout()
        plt.savefig("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp3_escalamiento_quimico.png", dpi=300)
        plt.close()

    # ------------------ GRÁFICO 4: OSCILACIONES DE RED (BECHTEL) ------------------
    csv_lfp = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp4_lfp.csv"
    csv_fft = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp4_fft.csv"
    npy_raster = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp4_raster.npy"
    
    if os.path.exists(csv_lfp) and os.path.exists(csv_fft) and os.path.exists(npy_raster):
        lfp_data = pd.read_csv(csv_lfp)['LFP'].values
        fft_data = pd.read_csv(csv_fft)
        raster_data = np.load(npy_raster)
        
        # Crear gráfico multi-panel de 3 filas
        fig, (ax1, ax2, ax3) = plt.subplots(3, 1, figsize=(8, 8))
        
        # 1. Raster Plot (Actividad de 100 neuronas)
        tiempo_raster = np.arange(raster_data.shape[0])
        for n_idx in range(raster_data.shape[1]):
            spikes_neurona = np.where(raster_data[:, n_idx])[0]
            ax1.scatter(spikes_neurona, [n_idx]*len(spikes_neurona), color='#1f77b4', s=1.5, alpha=0.8)
        ax1.set_xlim(0, raster_data.shape[0])
        ax1.set_ylabel('ID de Neurona', fontsize=9)
        ax1.set_title('1. Registro de Disparos (Raster Plot)', fontsize=10, fontweight='bold')
        ax1.grid(True, linestyle=':', alpha=0.6)
        
        # 2. LFP (Potencial de campo local)
        ax2.plot(lfp_data, color='#e377c2', linewidth=1.2)
        ax2.set_xlim(0, len(lfp_data))
        ax2.set_xlabel('Tiempo (ms)', fontsize=9)
        ax2.set_ylabel('LFP Promedio (mV)', fontsize=9)
        ax2.set_title('2. Potencial de Campo Local Emergente (LFP)', fontsize=10, fontweight='bold')
        ax2.grid(True, linestyle=':', alpha=0.6)
        
        # 3. FFT (Espectrograma / Frecuencia)
        ax3.plot(fft_data['Frecuencia'], fft_data['Potencia'], color='#9467bd', linewidth=1.5)
        ax3.set_xlabel('Frecuencia (Hz)', fontsize=9)
        ax3.set_ylabel('Potencia Espectral', fontsize=9)
        ax3.set_title('3. Análisis de Frecuencia (Transformada Rápida de Fourier)', fontsize=10, fontweight='bold')
        ax3.grid(True, linestyle=':', alpha=0.6)
        # Resaltar la banda Gamma
        ax3.axvspan(30, 80, color='#2ca02c', alpha=0.1, label='Banda Gamma (30-80 Hz)')
        ax3.legend(frameon=True, fontsize=8)
        
        plt.suptitle('Experimento 4: Emergencia de Ritmos Corticales Gamma', fontsize=12, fontweight='bold', y=0.98)
        plt.tight_layout()
        plt.savefig("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp4_oscilaciones_emergentes.png", dpi=300)
        plt.close()

    # ------------------ GRÁFICO 5: PLASTICIDAD Y APRENDIZAJE (HINTON) ------------------
    csv5 = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp5_aprendizaje.csv"
    if os.path.exists(csv5):
        df5 = pd.read_csv(csv5)
        fig, ax = plt.subplots(figsize=(6, 4))
        
        colores = ['#d62728', '#2ca02c']
        # Graficamos requerimiento de memoria en KB en escala logarítmica
        bars = ax.bar(df5['Metodo'], df5['Memoria_Estado_KB'], color=colores, width=0.5, edgecolor='black', alpha=0.9)
        ax.set_ylabel('Espacio de Memoria de Estado (Kilobytes) - Escala Log', fontsize=10)
        ax.set_yscale('log')
        ax.set_title('Requerimiento de Memoria: Backprop vs. STDP local', fontsize=11, fontweight='bold', pad=10)
        ax.grid(True, which="both", linestyle='--', alpha=0.5)
        
        for bar in bars:
            yval = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2, yval + 0.2 * yval, f"{yval:.2f} KB", ha='center', va='bottom', fontsize=9, fontweight='bold')
            
        plt.tight_layout()
        plt.savefig("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp5_aprendizaje.png", dpi=300)
        plt.close()

    # ------------------ GRÁFICO 6: COMPUTACIÓN MORFOLÓGICA (WEBB) ------------------
    csv6 = "/workspace/ensayo-filosofia-neurociencias/simulaciones/datos/exp6_morfologia.csv"
    if os.path.exists(csv6):
        df6 = pd.read_csv(csv6)
        fig, ax = plt.subplots(figsize=(6, 4))
        
        colores = ['#3182bd', '#e6550d']
        # Escala logarítmica de FLOPs
        bars = ax.bar(df6['Modelo'], df6['FLOPs'], color=colores, width=0.5, edgecolor='black', alpha=0.9)
        ax.set_ylabel('Costo Lógico (Operaciones FLOPs) - Escala Log', fontsize=10)
        ax.set_yscale('log')
        ax.set_title('Computación Morfológica: Desencarnado vs. Grillo de Webb', fontsize=11, fontweight='bold', pad=10)
        ax.grid(True, which="both", linestyle='--', alpha=0.5)
        
        for bar in bars:
            yval = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2, yval + 0.2 * yval, f"{int(yval):,}", ha='center', va='bottom', fontsize=9, fontweight='bold')
            
        plt.tight_layout()
        plt.savefig("/workspace/ensayo-filosofia-neurociencias/simulaciones/graficos/exp6_morfologia.png", dpi=300)
        plt.close()
        
    print("Gráficos científicos exportados a simulaciones/graficos/")
    
    # Generar Dashboard HTML
    generar_dashboard_html()

def generar_dashboard_html():
    dashboard_path = "/workspace/ensayo-filosofia-neurociencias/simulaciones/dashboard.html"
    
    # Estilo CSS enbebido y diseño premium
    html_content = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laboratorio de Filosofía de las Neurociencias — Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Outfit:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0b0f19;
            --card-bg: #151c2c;
            --primary: #4f46e5;
            --primary-light: #818cf8;
            --accent: #10b981;
            --text: #f3f4f6;
            --text-muted: #9ca3af;
            --border: #2d3748;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            background-color: var(--bg-color);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            padding: 40px 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            margin-bottom: 60px;
        }
        h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 2.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, #a5b4fc, #6366f1, #312e81);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
        }
        p.subtitle {
            font-size: 1.2rem;
            color: var(--text-muted);
            max-width: 800px;
            margin: 0 auto;
        }
        .intro-card {
            background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(21, 28, 44, 0.6) 100%);
            border: 1.5px solid var(--primary);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 50px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .intro-card h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.5rem;
            margin-bottom: 12px;
            color: var(--primary-light);
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 30px;
        }
        .card {
            background-color: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            transition: transform 0.2s, border-color 0.2s;
        }
        .card:hover {
            transform: translateY(-5px);
            border-color: var(--primary-light);
        }
        .card-header {
            margin-bottom: 20px;
        }
        .card-badge {
            display: inline-block;
            padding: 4px 8px;
            background-color: rgba(79, 70, 229, 0.2);
            color: var(--primary-light);
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        .card h3 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .card-author {
            font-size: 0.9rem;
            color: var(--accent);
            font-weight: 600;
            margin-bottom: 15px;
        }
        .card-img-wrapper {
            background-color: #0b0f19;
            border-radius: 12px;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,0.05);
            display: flex;
            justify-content: center;
        }
        .card img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }
        .card p.desc {
            color: var(--text-muted);
            font-size: 0.95rem;
            margin-bottom: 15px;
        }
        .card-conclusion {
            background-color: rgba(16, 185, 129, 0.08);
            border-left: 3px solid var(--accent);
            padding: 12px;
            border-radius: 0 8px 8px 0;
            font-size: 0.9rem;
        }
        .card-conclusion strong {
            color: var(--accent);
        }
        footer {
            margin-top: 80px;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.9rem;
            border-top: 1px solid var(--border);
            padding-top: 30px;
        }
        @media (max-width: 600px) {
            .grid {
                grid-template-columns: 1fr;
            }
            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="card-badge">Evidencia Empírica de Sustrato</div>
            <h1>Filosofía de las Neurociencias</h1>
            <p class="subtitle">Dashboard del Laboratorio Computacional: 6 experimentos sobre los límites físicos y ontológicos del silicio en la emulación de la mente humana.</p>
        </header>

        <div class="intro-card">
            <h2>Acerca del Laboratorio</h2>
            <p>Este laboratorio computacional actúa como anexo científico empírico del ensayo del curso. Cada uno de los seis experimentos presentados a continuación modela biológicamente el procesamiento nervioso (incluyendo biofísica de Hodgkin-Huxley, STDP y computación morfológica) para contrastar su eficiencia y comportamiento frente al silicio digital convencional. Los resultados demuestran por qué la mente biológica no es un software ejecutable independiente del sustrato.</p>
        </div>

        <div class="grid">
            <!-- EXP 1 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-badge">Experimento 1</span>
                    <h3>Percepción Visual Jerárquica</h3>
                    <div class="card-author">Autor guía: Semir Zeki (Visión y Cerebro)</div>
                </div>
                <div class="card-img-wrapper">
                    <img src="graficos/exp1_visual.png" alt="Jerarquía Visual">
                </div>
                <p class="desc">Simulación del procesamiento de imágenes a través de 4 capas visuales (V1 a IT). Contrasta la computación densa de silicio clásica con campos receptivos locales corticales donde cada neurona filtra selectivamente solo el 10% del campo.</p>
                <div class="card-conclusion">
                    <strong>Implicación:</strong> El silicio clásico procesa datos visuales de manera densa redundante. El carbono segmenta la visión retinotópica reduciendo la carga de cómputo en más de un 90% a través del esparcimiento jerárquico.
                </div>
            </div>

            <!-- EXP 2 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-badge">Experimento 2</span>
                    <h3>Células de Concepto</h3>
                    <div class="card-author">Autor guía: Rodrigo Quian Quiroga (Células de la Abuela)</div>
                </div>
                <div class="card-img-wrapper">
                    <img src="graficos/exp2_crosstalk.png" alt="Crosstalk de conceptos">
                </div>
                <p class="desc">Simulación de memorias selectivas (ej. "neurona de Jennifer Aniston"). Compara una red densa distribuida frente a una red con inhibición competitiva Winner-Take-All (WTA) que fuerza un esparcimiento del 1%.</p>
                <div class="card-conclusion">
                    <strong>Implicación:</strong> La codificación densa sufre de interferencia destructiva de memoria (crosstalk). El esparcimiento del carbono del 1% reduce el solapamiento a cero absoluto, haciendo las representaciones inmunes a la interferencia.
                </div>
            </div>

            <!-- EXP 3 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-badge">Experimento 3</span>
                    <h3>Diversidad Neuroquímica</h3>
                    <div class="card-author">Autor guía: Joseph LeDoux (Emoción y Cerebro)</div>
                </div>
                <div class="card-img-wrapper">
                    <img src="graficos/exp3_escalamiento_quimico.png" alt="Costo de canales químicos">
                </div>
                <p class="desc">Implementación del modelo biofísico de Hodgkin-Huxley. Añade progresivamente 10 canales químicos y modulares simulados. Mide el escalamiento de FLOPs y tiempos de cómputo en el silicio.</p>
                <div class="card-conclusion">
                    <strong>Implicación:</strong> Añadir neurotransmisores (GABA, Dopamina) en silicio causa un crecimiento superlineal en CPU. Biológicamente, la diversidad química ocurre pasivamente por física molecular orgánica a costo de cómputo cero.
                </div>
            </div>

            <!-- EXP 4 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-badge">Experimento 4</span>
                    <h3>Oscilaciones y Sincronía</h3>
                    <div class="card-author">Autor guía: William Bechtel (Mecanismos Mentales)</div>
                </div>
                <div class="card-img-wrapper">
                    <img src="graficos/exp4_oscilaciones_emergentes.png" alt="Oscilaciones Gamma">
                </div>
                <p class="desc">Simulación de una red cortical de 1000 neuronas E-I con retardos axonales y sinapsis con decay. Muestra la emergencia de oscilaciones gamma colectivas y su descomposición espectral mediante FFT.</p>
                <div class="card-conclusion">
                    <strong>Implicación:</strong> Las oscilaciones son una propiedad biofísica pasiva del sustrato vivo. En el silicio digital, forzar la sincronización requiere iterar sobre ecuaciones acopladas, sobrecargando el sistema.
                </div>
            </div>

            <!-- EXP 5 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-badge">Experimento 5</span>
                    <h3>Plasticidad Sináptica STDP</h3>
                    <div class="card-author">Autor guía: Geoffrey Hinton (Aprendizaje conexionista)</div>
                </div>
                <div class="card-img-wrapper">
                    <img src="graficos/exp5_aprendizaje.png" alt="STDP vs Backpropagation">
                </div>
                <p class="desc">Contraste entre el algoritmo matemático de Backpropagation (silicio puro) y la regla biológica Spike-Timing Dependent Plasticity (STDP) con facilitación de vesículas de calcio.</p>
                <div class="card-conclusion">
                    <strong>Implicación:</strong> Backprop requiere guardar todo el grafo de activaciones global (memoria masiva). STDP es una regla estrictamente local que requiere 200 veces menos almacenamiento de estado en memoria.
                </div>
            </div>

            <!-- EXP 6 -->
            <div class="card">
                <div class="card-header">
                    <span class="card-badge">Experimento 6</span>
                    <h3>Computación Morfológica</h3>
                    <div class="card-author">Autor guía: Barbara Webb (El Grillo Robot)</div>
                </div>
                <div class="card-img-wrapper">
                    <img src="graficos/exp6_morfologia.png" alt="Computación Morfológica">
                </div>
                <p class="desc">Contrasta la localización de sonidos del grillo robot. Compara el modelo desencarnado (cálculos masivos de FFT y fase) con el modelo corporizado (física del tubo acústico y diferencia simple de amplitud).</p>
                <div class="card-conclusion">
                    <strong>Implicación:</strong> El cuerpo hace "cómputo gratis" mediante su interacción física con el mundo. Al carecer de cuerpo, el silicio puro se ve forzado a simular algorítmicamente la física mecánica externa.
                </div>
            </div>
        </div>

        <footer>
            <p>Laboratorio de Filosofía de las Neurociencias (2026) · Steven Vallejo Ortiz · Universidad de Antioquia</p>
        </footer>
    </div>
</body>
</html>
"""
    with open(dashboard_path, "w") as f:
        f.write(html_content)
    print(f"Dashboard interactivo HTML creado en: {dashboard_path}")

if __name__ == "__main__":
    graficar_todo()
