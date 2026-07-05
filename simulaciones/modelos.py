import numpy as np

# ==========================================
# 1. MODELO HODGKIN-HUXLEY COMPLETO
# ==========================================
class ModeloHodgkinHuxley:
    """
    Simula una neurona biofísica utilizando el formalismo de Hodgkin-Huxley.
    Modela compuertas de activación y desactivación de sodio y potasio.
    """
    def __init__(self, dt=0.01):
        self.dt = dt
        # Capacitancia y constantes físicas
        self.C_m = 1.0       # uF/cm2
        self.g_Na = 120.0    # mS/cm2 (Conductancia máx Sodio)
        self.g_K = 36.0      # mS/cm2 (Conductancia máx Potasio)
        self.g_L = 0.3       # mS/cm2 (Conductancia máx Fuga)
        self.E_Na = 50.0     # mV (Potencial de reversión Sodio)
        self.E_K = -77.0     # mV (Potencial de reversión Potasio)
        self.E_L = -54.387   # mV (Potencial de reversión Fuga)

        # Variables de estado
        self.V = -65.0       # Potencial de reposo inicial
        self.m = 0.05        # Activación de Sodio
        self.h = 0.6         # Inactivación de Sodio
        self.n = 0.32        # Activación de Potasio

    # Funciones de tasa alpha y beta para las compuertas de canal
    def alpha_m(self, V): return 0.1 * (V + 40.0) / (1.0 - np.exp(-(V + 40.0) / 10.0)) if V != -40.0 else 1.0
    def beta_m(self, V):  return 4.0 * np.exp(-(V + 65.0) / 18.0)
    
    def alpha_h(self, V): return 0.07 * np.exp(-(V + 65.0) / 20.0)
    def beta_h(self, V):  return 1.0 / (1.0 + np.exp(-(V + 35.0) / 10.0))
    
    def alpha_n(self, V): return 0.01 * (V + 55.0) / (1.0 - np.exp(-(V + 55.0) / 10.0)) if V != -55.0 else 0.1
    def beta_n(self, V):  return 0.125 * np.exp(-(V + 65.0) / 80.0)

    def paso(self, I_ext):
        # 1. Calcular constantes de tasa basadas en el potencial V actual
        a_m, b_m = self.alpha_m(self.V), self.beta_m(self.V)
        a_h, b_h = self.alpha_h(self.V), self.beta_h(self.V)
        a_n, b_n = self.alpha_n(self.V), self.beta_n(self.V)

        # 2. Actualizar variables de compuertas usando el método de Euler
        self.m += self.dt * (a_m * (1.0 - self.m) - b_m * self.m)
        self.h += self.dt * (a_h * (1.0 - self.h) - b_h * self.h)
        self.n += self.dt * (a_n * (1.0 - self.n) - b_n * self.n)

        # 3. Calcular corrientes iónicas
        I_Na = self.g_Na * (self.m**3) * self.h * (self.V - self.E_Na)
        I_K = self.g_K * (self.n**4) * (self.V - self.E_K)
        I_L = self.g_L * (self.V - self.E_L)

        # 4. Actualizar potencial de membrana
        self.V += self.dt * ((I_ext - I_Na - I_K - I_L) / self.C_m)
        
        # Conteo de FLOPs en silicio para resolver estas ecuaciones acopladas:
        # Aprox. 120 FLOPs por paso (incluyendo exponenciales y divisiones)
        return self.V, 120

# ==========================================
# 2. NEURONA LIF MULTICOMPARTIMENTAL (Dendrita-Soma)
# ==========================================
class NeuronaLIFMulticompartimental:
    """
    Modelo de neurona LIF de 2 compartimentos (dendrita y soma).
    El compartimento dendrítico recibe las entradas sinápticas y filtra de forma no lineal,
    el compartimento somático integra el flujo dendrítico y genera disparos (spikes).
    """
    def __init__(self, dt=0.001):
        self.dt = dt
        # Parámetros físicos
        self.C_soma = 0.2     # nF
        self.C_dend = 0.5     # nF
        self.g_leak = 0.05    # uS
        self.V_rest = -70.0   # mV
        self.V_thresh = -50.0 # mV
        self.V_reset = -75.0  # mV
        self.g_acople = 0.1   # uS (Conductancia de acoplamiento soma-dendrita)
        
        # Variables de estado
        self.V_soma = self.V_rest
        self.V_dend = self.V_rest
        self.refractario = 0.0
        
    def paso(self, I_ext, I_syn):
        self.refractario = max(0.0, self.refractario - self.dt)
        
        # 1. Dinámica dendrítica: dV_d/dt = ( -(V_d - V_rest)*g_l + g_c*(V_s - V_d) + I_syn ) / C_d
        dV_d = (self.dt / self.C_dend) * (
            -(self.V_dend - self.V_rest) * self.g_leak + 
            self.g_acople * (self.V_soma - self.V_dend) + 
            I_syn
        )
        self.V_dend += dV_d
        
        # 2. Dinámica somática: dV_s/dt = ( -(V_s - V_rest)*g_l + g_c*(V_d - V_s) + I_ext ) / C_s
        spike = False
        if self.refractario <= 0:
            dV_s = (self.dt / self.C_soma) * (
                -(self.V_soma - self.V_rest) * self.g_leak + 
                self.g_acople * (self.V_dend - self.V_soma) + 
                I_ext
            )
            self.V_soma += dV_s
            
            if self.V_soma >= self.V_thresh:
                spike = True
                self.V_soma = self.V_reset
                self.refractario = 0.005 # 5 ms de periodo refractario
        else:
            self.V_soma = self.V_reset
            
        # Conteo de FLOPs: ~30 FLOPs por paso
        return spike, self.V_soma, self.V_dend, 30

# ==========================================
# 3. PLASTICIDAD STDP Y DINÁMICA DE VESÍCULAS
# ==========================================
class SinapsisSTDP:
    """
    Modela una sinapsis con STDP (plasticidad dependiente del tiempo de disparo)
    y plasticidad a corto plazo (facilitación y depresión sináptica basada en vesículas).
    """
    def __init__(self, w_inicial=0.5):
        self.w = w_inicial
        self.w_max = 2.0
        self.w_min = 0.05
        
        # Parámetros STDP
        self.tau_stdp = 0.020      # 20 ms
        self.A_plus = 0.02         # Tasa de potenciación
        self.A_minus = 0.022       # Tasa de depresión
        
        # Parámetros de plasticidad a corto plazo (Short-Term Plasticity - STP)
        # Modelo Tsodyks-Markram
        self.x = 1.0               # Fracción de vesículas disponibles
        self.u = 0.2               # Fracción de probabilidad de liberación (calcio)
        self.U = 0.2               # Probabilidad de liberación base
        self.tau_D = 0.200         # Constante de tiempo de depresión (200 ms)
        self.tau_F = 0.100         # Constante de tiempo de facilitación (100 ms)
        
    def aplicar_stp(self, dt):
        # Actualización pasiva de STP en ausencia de disparo
        self.x += dt * ((1.0 - self.x) / self.tau_D)
        self.u += dt * ((self.U - self.u) / self.tau_F)
        # FLOPs: ~10 FLOPs
        return 10
        
    def procesar_spike_pre(self):
        # Evento presináptico: se libera neurotransmisor proporcional a u * x
        efecto = self.u * self.x
        # Actualizar variables de vesículas
        self.x -= self.u * self.x
        self.u += self.U * (1.0 - self.u)
        # Retorna la amplitud de la corriente postsináptica resultante y los FLOPs
        # FLOPs: ~8 FLOPs
        return efecto * self.w, 8
        
    def aplicar_stdp(self, t_pre, t_post):
        # Regla STDP: delta_t = t_post - t_pre
        delta_t = t_post - t_pre
        if delta_t > 0:
            # Potenciación (Spike pre antes que el post)
            dw = self.A_plus * np.exp(-delta_t / self.tau_stdp)
        else:
            # Depresión (Spike pre después que el post)
            dw = -self.A_minus * np.exp(delta_t / self.tau_stdp)
        
        self.w = np.clip(self.w + dw, self.w_min, self.w_max)
        # FLOPs: ~15 FLOPs
        return self.w, 15

# ==========================================
# 4. RED CORTICAL DIVERSA (Regla de Dale, Oscilaciones)
# ==========================================
class RedCortical:
    """
    Simula una red neuronal E-I realista de N neuronas.
    Mantiene la proporción 80% Excitatorias / 20% Inhibitorias.
    Modela retardos de conducción axonal y conectividad esparcida.
    """
    def __init__(self, N, dt=0.001):
        self.N = N
        self.dt = dt
        self.N_exc = int(N * 0.8)
        self.N_inh = N - self.N_exc
        
        # Clasificar neuronas
        self.tipo = np.ones(N) # 1 = Exc, -1 = Inh
        self.tipo[self.N_exc:] = -1
        
        # Conectividad esparcida (10%)
        self.p_conexion = 0.1
        self.pesos = np.random.uniform(0.1, 1.0, (N, N)).astype(np.float32)
        # Aplicar máscara de conectividad
        self.mascara = (np.random.rand(N, N) < self.p_conexion).astype(np.float32)
        np.fill_diagonal(self.mascara, 0)
        self.pesos *= self.mascara
        
        # Estados
        self.V = np.full(N, -70.0, dtype=np.float32)
        self.V_rest = -70.0
        self.V_thresh = -50.0
        self.V_reset = -75.0
        self.tau_m = 0.020
        self.refractario = np.zeros(N, dtype=np.float32)
        
        # Conductancias químicas de la sinapsis
        self.g_exc = np.zeros(N, dtype=np.float32)
        self.g_inh = np.zeros(N, dtype=np.float32)
        self.tau_exc = 0.005 # 5 ms
        self.tau_inh = 0.010 # 10 ms
        
        # Registro de retardos de conducción axonal
        # Retardos variables entre 1 y 5 ms (simulado con buffer circular de spikes históricos)
        self.buffer_spikes = []
        self.max_retardo_pasos = 5
        for _ in range(self.max_retardo_pasos):
            self.buffer_spikes.append(np.zeros(N, dtype=bool))
            
    def paso(self, I_ext):
        # 1. Decaimiento de conductancias
        self.g_exc *= np.exp(-self.dt / self.tau_exc)
        self.g_inh *= np.exp(-self.dt / self.tau_inh)
        
        # 2. Calcular corriente sináptica total: I_syn = g_exc*(V - 0) + g_inh*(V - (-80))
        I_syn = self.g_exc * (self.V - 0.0) + self.g_inh * (self.V - (-80.0))
        
        # 3. Integración de membrana
        self.refractario = np.maximum(0.0, self.refractario - self.dt)
        no_ref = self.refractario <= 0
        dV = (self.dt / self.tau_m) * (-(self.V[no_ref] - self.V_rest) + I_ext[no_ref] - I_syn[no_ref])
        self.V[no_ref] += dV
        
        # 4. Spikes
        spikes = self.V >= self.V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        
        # Guardar en buffer de retardos
        self.buffer_spikes.pop(0)
        self.buffer_spikes.append(spikes)
        
        # 5. Propagar spikes con retardo (usando los spikes de hace K pasos, ej. 3 pasos = 3 ms)
        spikes_retrasados = self.buffer_spikes[0]
        indices_disparo = np.where(spikes_retrasados)[0]
        
        for idx in indices_disparo:
            # Ver a quiénes está conectada la neurona emisora
            destinos = np.where(self.mascara[idx] > 0)[0]
            w = self.pesos[idx, destinos]
            if self.tipo[idx] > 0:
                # Excitatoria
                self.g_exc[destinos] += w
            else:
                # Inhibitoria
                self.g_inh[destinos] += w
                
        # FLOPs estimados:
        # Decaimiento: 4 FLOPs por neurona
        # Corriente sináptica: 4 FLOPs por neurona
        # Integración V: 6 FLOPs por no refractario
        # Conexiones: 2 FLOPs por spike por conexión
        num_spikes = np.sum(spikes_retrasados)
        flops = (8 * self.N) + (6 * np.sum(no_ref)) + (2 * num_spikes * int(self.N * self.p_conexion))
        
        return spikes, self.V, flops

# ==========================================
# 5. MODELOS AUXILIARES PARA BENCHMARK DE ESCALAMIENTO
# ==========================================
class RedDensa:
    """
    Simula una red neuronal artificial densa conexionista (clásica).
    """
    def __init__(self, tamano):
        self.N = tamano
        self.W = np.random.normal(0, 1.0 / np.sqrt(tamano), (tamano, tamano)).astype(np.float32)
        self.x = np.random.rand(1, tamano).astype(np.float32)
        
    def paso(self):
        z = np.dot(self.x, self.W)
        y = np.maximum(0, z)
        flops = 2 * (self.N ** 2) + self.N
        return y, flops

class RedLIF:
    """
    Simula una red neuronal de disparo tipo Leaky Integrate-and-Fire (SNN).
    """
    def __init__(self, tamano, dt=0.001):
        self.N = tamano
        self.dt = dt
        self.tau_m = 0.020
        self.V_rest = -70.0
        self.V_reset = -80.0
        self.V_thresh = -50.0
        self.R = 1.0
        self.V = np.full(tamano, self.V_rest, dtype=np.float32)
        self.refractario = np.zeros(tamano, dtype=np.float32)
        self.p_conexion = 0.1
        self.num_conexiones = min(int(tamano * self.p_conexion), 150)
        self.W_esparcido = np.random.normal(0.5, 0.1, (tamano, self.num_conexiones)).astype(np.float32)
        self.conexiones = np.random.randint(0, tamano, size=(tamano, self.num_conexiones))
        
    def paso(self, I_ext):
        self.refractario = np.maximum(0, self.refractario - self.dt)
        no_ref = self.refractario <= 0
        dV = (self.dt / self.tau_m) * (-(self.V[no_ref] - self.V_rest) + self.R * I_ext[no_ref])
        self.V[no_ref] += dV
        spikes = self.V >= self.V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        impulsos_recibidos = np.zeros(self.N, dtype=np.float32)
        indices_disparo = np.where(spikes)[0]
        for idx in indices_disparo:
            destinos = self.conexiones[idx]
            pesos = self.W_esparcido[idx]
            impulsos_recibidos[destinos] += pesos
        num_no_ref = np.sum(no_ref)
        num_spikes = np.sum(spikes)
        flops = (5 * num_no_ref) + self.N + (2 * num_spikes * self.num_conexiones)
        return spikes, impulsos_recibidos, flops

class RedQuimicaLIF:
    """
    Simula una red neuronal de disparo LIF con múltiples canales de neurotransmisores químicos.
    """
    def __init__(self, tamano, dt=0.001):
        self.N = tamano
        self.dt = dt
        self.tau_m = 0.020
        self.V_rest = -70.0
        self.V_reset = -80.0
        self.V_thresh_base = -50.0
        self.V = np.full(tamano, self.V_rest, dtype=np.float32)
        self.refractario = np.zeros(tamano, dtype=np.float32)
        self.E_glu = 0.0
        self.E_gaba = -90.0
        self.g_glu = np.zeros(tamano, dtype=np.float32)
        self.g_gaba = np.zeros(tamano, dtype=np.float32)
        self.tau_glu = 0.005
        self.tau_gaba = 0.010
        self.p_conexion = 0.1
        self.num_conexiones = min(int(tamano * self.p_conexion), 150)
        self.W_esparcido = np.random.normal(0.2, 0.05, (tamano, self.num_conexiones)).astype(np.float32)
        self.conexiones = np.random.randint(0, tamano, size=(tamano, self.num_conexiones))
        self.es_excitatoria = np.random.rand(tamano) < 0.8
        self.dopamina = 0.5
        
    def paso(self, I_ext):
        self.g_glu *= np.exp(-self.dt / self.tau_glu)
        self.g_gaba *= np.exp(-self.dt / self.tau_gaba)
        V_thresh = self.V_thresh_base - (5.0 * (self.dopamina - 0.5))
        I_syn = self.g_glu * (self.V - self.E_glu) + self.g_gaba * (self.V - self.E_gaba)
        self.refractario = np.maximum(0, self.refractario - self.dt)
        no_ref = self.refractario <= 0
        dV = (self.dt / self.tau_m) * (-(self.V[no_ref] - self.V_rest) + I_ext[no_ref] - I_syn[no_ref])
        self.V[no_ref] += dV
        spikes = self.V >= V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        indices_disparo = np.where(spikes)[0]
        for idx in indices_disparo:
            destinos = self.conexiones[idx]
            pesos = self.W_esparcido[idx]
            if self.es_excitatoria[idx]:
                self.g_glu[destinos] += pesos
            else:
                self.g_gaba[destinos] += pesos
        tasa_disparo_global = np.mean(spikes)
        self.dopamina += self.dt * (tasa_disparo_global * 10.0 - (self.dopamina - 0.5))
        self.dopamina = np.clip(self.dopamina, 0.0, 1.0)
        num_no_ref = np.sum(no_ref)
        num_spikes = np.sum(spikes)
        flops = (40 * self.N) + 3 + (5 * self.N) + (6 * num_no_ref) + (2 * self.N) + (2 * num_spikes * self.num_conexiones) + 5
        return spikes, self.dopamina, flops

# ==========================================
# 6. MODELO SPIKING A GRAN ESCALA ACELERADO POR GPU (CUDA)
# ==========================================
class RedQuimicaLIFPyTorch:
    """
    Simulación a gran escala en GPU (CUDA) de una red neuronal de disparo con modulación neuroquímica.
    Optimiza la propagación esparcida usando operaciones vectorizadas paralelas (index_add_).
    """
    def __init__(self, tamano, device='cuda:0', dt=0.001):
        import torch
        self.N = tamano
        self.device = torch.device(device)
        self.dt = dt
        
        # Parámetros biofísicos
        self.tau_m = 0.020
        self.V_rest = -70.0
        self.V_reset = -80.0
        self.V_thresh_base = -50.0
        
        # Inicialización de estado en memoria de GPU
        self.V = torch.full((tamano,), self.V_rest, device=self.device, dtype=torch.float32)
        self.refractario = torch.zeros((tamano,), device=self.device, dtype=torch.float32)
        
        self.E_glu = 0.0
        self.E_gaba = -90.0
        self.g_glu = torch.zeros((tamano,), device=self.device, dtype=torch.float32)
        self.g_gaba = torch.zeros((tamano,), device=self.device, dtype=torch.float32)
        
        self.tau_glu = 0.005
        self.tau_gaba = 0.010
        
        # Conectividad esparcida (10%)
        self.p_conexion = 0.1
        self.num_conexiones = min(int(tamano * self.p_conexion), 150)
        
        # Pesos y topología de red pre-cargados en la VRAM de la GPU
        self.W_esparcido = (torch.randn((tamano, self.num_conexiones), device=self.device, dtype=torch.float32) * 0.05 + 0.2)
        self.conexiones = torch.randint(0, tamano, (tamano, self.num_conexiones), device=self.device, dtype=torch.int32)
        self.es_excitatoria = torch.rand((tamano,), device=self.device) < 0.8
        
        self.dopamina = torch.tensor(0.5, device=self.device, dtype=torch.float32)
        self.decay_glu = np.exp(-self.dt / self.tau_glu)
        self.decay_gaba = np.exp(-self.dt / self.tau_gaba)
        
    def paso(self, I_ext):
        import torch
        # 1. Decaimiento de conductancias sinápticas (exponencial)
        self.g_glu *= self.decay_glu
        self.g_gaba *= self.decay_gaba
        
        # 2. Umbral dinámico modulado globalmente por Dopamina
        V_thresh = self.V_thresh_base - (5.0 * (self.dopamina - 0.5))
        
        # 3. Corrientes sinápticas químicas
        I_syn = self.g_glu * (self.V - self.E_glu) + self.g_gaba * (self.V - self.E_gaba)
        
        # 4. Integración del potencial de membrana para neuronas no refractarias
        self.refractario = torch.clamp(self.refractario - self.dt, min=0.0)
        no_ref = self.refractario <= 0
        
        dV = (self.dt / self.tau_m) * (-(self.V[no_ref] - self.V_rest) + I_ext[no_ref] - I_syn[no_ref])
        self.V[no_ref] += dV
        
        # 5. Generación de spikes y reseteo
        spikes = self.V >= V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        
        # 6. Propagación de spikes en paralelo usando index_add_ de CUDA
        indices_disparo = torch.where(spikes)[0]
        if len(indices_disparo) > 0:
            destinos_planos = self.conexiones[indices_disparo].view(-1).long()
            pesos_planos = self.W_esparcido[indices_disparo].view(-1)
            
            es_exc_disparo = self.es_excitatoria[indices_disparo]
            mask_exc_plana = es_exc_disparo.repeat_interleave(self.num_conexiones)
            
            # Sumar conductancias químicas en la VRAM de forma atómica y paralela
            self.g_glu.index_add_(0, destinos_planos[mask_exc_plana], pesos_planos[mask_exc_plana])
            self.g_gaba.index_add_(0, destinos_planos[~mask_exc_plana], pesos_planos[~mask_exc_plana])
            
        # 7. Regulación metabólica de dopamina
        tasa_disparo_global = spikes.float().mean()
        self.dopamina = self.dopamina + self.dt * (tasa_disparo_global * 10.0 - (self.dopamina - 0.5))
        self.dopamina = torch.clamp(self.dopamina, 0.0, 1.0)
        
        num_no_ref = no_ref.sum()
        num_spikes = spikes.sum()
        flops = (40 * self.N) + 3 + (5 * self.N) + (6 * num_no_ref) + (2 * self.N) + (2 * num_spikes * self.num_conexiones) + 5
        return spikes, self.dopamina, flops

class RedQuimicaLIFMultiGPU:
    """
    Simulación distribuida multi-GPU (Blackwell RTX 5070 Ti + Turing RTX 2060).
    Divide la red en dos subredes locales y realiza propagaciones inter-GPU cruzadas
    durante cada paso de tiempo, transmitiendo de forma asíncrona solo los impulsos sinápticos.
    """
    def __init__(self, tamano, device0='cuda:0', device1='cuda:1', dt=0.001):
        import torch
        import numpy as np
        self.N = tamano
        self.dt = dt
        self.device0 = torch.device(device0)
        self.device1 = torch.device(device1)
        
        # Repartir carga: 2/3 en la GPU potente (5070 Ti), 1/3 en la GPU secundaria (2060)
        self.N0 = int(tamano * 2 / 3)
        self.N1 = tamano - self.N0
        
        # Instanciar subredes locales
        self.subred0 = RedQuimicaLIFPyTorch(self.N0, device=device0, dt=dt)
        self.subred1 = RedQuimicaLIFPyTorch(self.N1, device=device1, dt=dt)
        
        # Inicializar streams CUDA paralelos
        self.stream0 = torch.cuda.Stream(device=self.device0)
        self.stream1 = torch.cuda.Stream(device=self.device1)
        
        # Conectividad inter-GPU esparcida (15 conexiones cruzadas por neurona)
        self.num_conexiones_cruzadas = 15
        
        # Conexiones 0 -> 1 (Guardadas en GPU 0, apuntan a neuronas en GPU 1)
        self.conexiones_0_1 = torch.randint(0, self.N1, (self.N0, self.num_conexiones_cruzadas), device=self.device0, dtype=torch.int32)
        self.W_0_1 = (torch.randn((self.N0, self.num_conexiones_cruzadas), device=self.device0, dtype=torch.float32) * 0.05 + 0.1)
        
        # Conexiones 1 -> 0 (Guardadas en GPU 1, apuntan a neuronas en GPU 0)
        self.conexiones_1_0 = torch.randint(0, self.N0, (self.N1, self.num_conexiones_cruzadas), device=self.device1, dtype=torch.int32)
        self.W_1_0 = (torch.randn((self.N1, self.num_conexiones_cruzadas), device=self.device1, dtype=torch.float32) * 0.05 + 0.1)
        
    def paso(self, I_ext):
        import torch
        # Dividir la corriente externa entre las dos GPUs
        I_ext0 = I_ext[:self.N0].to(self.device0)
        I_ext1 = I_ext[self.N0:].to(self.device1)
        
        # 1. Ejecutar el paso local de cada subred en streams paralelos
        with torch.cuda.stream(self.stream0):
            spikes0, dopa0, flops0 = self.subred0.paso(I_ext0)
        with torch.cuda.stream(self.stream1):
            spikes1, dopa1, flops1 = self.subred1.paso(I_ext1)
            
        # Esperar a que ambas GPUs terminen su paso local antes de propagar cruzado
        torch.cuda.synchronize(self.device0)
        torch.cuda.synchronize(self.device1)
        
        # 2. Propagación Cruzada 0 -> 1 (spikes de GPU 0 excitan/inhiben neuronas en GPU 1)
        indices_disparo0 = torch.where(spikes0)[0]
        flops_comunicacion = 0
        if len(indices_disparo0) > 0:
            destinos_1 = self.conexiones_0_1[indices_disparo0].view(-1).long().to(self.device1)
            pesos_1 = self.W_0_1[indices_disparo0].view(-1).to(self.device1)
            
            es_exc0 = self.subred0.es_excitatoria[indices_disparo0]
            mask_exc_plana = es_exc0.repeat_interleave(self.num_conexiones_cruzadas).to(self.device1)
            
            self.subred1.g_glu.index_add_(0, destinos_1[mask_exc_plana], pesos_1[mask_exc_plana])
            self.subred1.g_gaba.index_add_(0, destinos_1[~mask_exc_plana], pesos_1[~mask_exc_plana])
            flops_comunicacion += 2 * len(indices_disparo0) * self.num_conexiones_cruzadas
            
        # 3. Propagación Cruzada 1 -> 0 (spikes de GPU 1 excitan/inhiben neuronas en GPU 0)
        indices_disparo1 = torch.where(spikes1)[0]
        if len(indices_disparo1) > 0:
            destinos_0 = self.conexiones_1_0[indices_disparo1].view(-1).long().to(self.device0)
            pesos_0 = self.W_1_0[indices_disparo1].view(-1).to(self.device0)
            
            es_exc1 = self.subred1.es_excitatoria[indices_disparo1]
            mask_exc_plana = es_exc1.repeat_interleave(self.num_conexiones_cruzadas).to(self.device0)
            
            self.subred0.g_glu.index_add_(0, destinos_0[mask_exc_plana], pesos_0[mask_exc_plana])
            self.subred0.g_gaba.index_add_(0, destinos_0[~mask_exc_plana], pesos_0[~mask_exc_plana])
            flops_comunicacion += 2 * len(indices_disparo1) * self.num_conexiones_cruzadas
            
        # Unificar spikes y FLOPS para estadísticas
        spikes_totales = torch.cat([spikes0.to(self.device0), spikes1.to(self.device0)], dim=0)
        flops_totales = flops0 + flops1.to(self.device0) + flops_comunicacion
        
        return spikes_totales, dopa0, flops_totales

