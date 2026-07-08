"""
modelos.py — Modelos biofísicos y de cómputo en silicio.

Versión 2026-07: añade homeostasis sináptica (regulación homeostática del
tipo de disparo biológica) y un contador de FLOPs riguroso para
RedQuimicaLIF*. El objetivo NO es optimizar el cómputo, sino
representar honestamente el coste biofísico de la emulación digital.

NOTA FILOSÓFICA: La arquitectura multi-tier (CPU + 2 GPU + Hybrid) es
DELIBERADA. El usuario/programador quiere demostrar empíricamente que
agregar más silicio (más GPUs, más CPUs, más buses PCIe y DDR) NO reduce
sino AMPLIFICA el coste termodinámico de la emulación, lo cual se
utiliza como evidencia de la tesis del ensayo.
"""
import numpy as np
import warnings

warnings.filterwarnings("ignore", category=UserWarning)


# ==========================================
# 1. MODELO HODGKIN-HUXLEY COMPLETO (single neuron)
# ==========================================
class ModeloHodgkinHuxley:
    """
    Simula una neurona biofísica con el formalismo de Hodgkin-Huxley.
    Modela compuertas de activacion e inactivacion de sodio y potasio.
    """
    def __init__(self, dt=0.01):
        self.dt = dt
        self.C_m = 1.0       # uF/cm2
        self.g_Na = 120.0    # mS/cm2
        self.g_K = 36.0
        self.g_L = 0.3
        self.E_Na = 50.0
        self.E_K = -77.0
        self.E_L = -54.387
        self.V = -65.0
        self.m = 0.05
        self.h = 0.6
        self.n = 0.32

    def alpha_m(self, V): return 0.1 * (V + 40.0) / (1.0 - np.exp(-(V + 40.0) / 10.0)) if V != -40.0 else 1.0
    def beta_m(self, V):  return 4.0 * np.exp(-(V + 65.0) / 18.0)
    def alpha_h(self, V): return 0.07 * np.exp(-(V + 65.0) / 20.0)
    def beta_h(self, V):  return 1.0 / (1.0 + np.exp(-(V + 35.0) / 10.0))
    def alpha_n(self, V): return 0.01 * (V + 55.0) / (1.0 - np.exp(-(V + 55.0) / 10.0)) if V != -55.0 else 0.1
    def beta_n(self, V):  return 0.125 * np.exp(-(V + 65.0) / 80.0)

    def paso(self, I_ext):
        a_m, b_m = self.alpha_m(self.V), self.beta_m(self.V)
        a_h, b_h = self.alpha_h(self.V), self.beta_h(self.V)
        a_n, b_n = self.alpha_n(self.V), self.beta_n(self.V)
        self.m += self.dt * (a_m * (1.0 - self.m) - b_m * self.m)
        self.h += self.dt * (a_h * (1.0 - self.h) - b_h * self.h)
        self.n += self.dt * (a_n * (1.0 - self.n) - b_n * self.n)
        I_Na = self.g_Na * (self.m**3) * self.h * (self.V - self.E_Na)
        I_K = self.g_K * (self.n**4) * (self.V - self.E_K)
        I_L = self.g_L * (self.V - self.E_L)
        self.V += self.dt * ((I_ext - I_Na - I_K - I_L) / self.C_m)
        return self.V, 120  # ~120 FLOPs por paso


# ==========================================
# 2. NEURONA LIF MULTICOMPARTIMENTAL
# ==========================================
class NeuronaLIFMulticompartimental:
    """Modelo de neurona LIF de 2 compartimentos (dendrita y soma)."""
    def __init__(self, dt=0.001):
        self.dt = dt
        self.C_soma = 0.2
        self.C_dend = 0.5
        self.g_leak = 0.05
        self.V_rest = -70.0
        self.V_thresh = -50.0
        self.V_reset = -75.0
        self.g_acople = 0.1
        self.V_soma = self.V_rest
        self.V_dend = self.V_rest
        self.refractario = 0.0

    def paso(self, I_ext, I_syn):
        self.refractario = max(0.0, self.refractario - self.dt)
        dV_d = (self.dt / self.C_dend) * (
            -(self.V_dend - self.V_rest) * self.g_leak +
            self.g_acople * (self.V_soma - self.V_dend) +
            I_syn
        )
        self.V_dend += dV_d
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
                self.refractario = 0.005
        else:
            self.V_soma = self.V_reset
        return spike, self.V_soma, self.V_dend, 30


# ==========================================
# 3. PLASTICIDAD STDP
# ==========================================
class SinapsisSTDP:
    """Sinapsis con STDP y plasticidad a corto plazo (Tsodyks-Markram)."""
    def __init__(self, w_inicial=0.5):
        self.w = w_inicial
        self.w_max = 2.0
        self.w_min = 0.05
        self.tau_stdp = 0.020
        self.A_plus = 0.02
        self.A_minus = 0.022
        self.x = 1.0
        self.u = 0.2
        self.U = 0.2
        self.tau_D = 0.200
        self.tau_F = 0.100

    def aplicar_stp(self, dt):
        self.x += dt * ((1.0 - self.x) / self.tau_D)
        self.u += dt * ((self.U - self.u) / self.tau_F)
        return 10

    def procesar_spike_pre(self):
        efecto = self.u * self.x
        self.x -= self.u * self.x
        self.u += self.U * (1.0 - self.u)
        return efecto * self.w, 8

    def aplicar_stdp(self, t_pre, t_post):
        delta_t = t_post - t_pre
        if delta_t > 0:
            dw = self.A_plus * np.exp(-delta_t / self.tau_stdp)
        else:
            dw = -self.A_minus * np.exp(delta_t / self.tau_stdp)
        self.w = np.clip(self.w + dw, self.w_min, self.w_max)
        return self.w, 15


# ==========================================
# 4. RED CORTICAL DIVERSA
# ==========================================
class RedCortical:
    """
    Red E-I realista con retardos axonales y conectividad esparcida (10%).
    Proporciona una medida de oscilaciones gamma y FFT.
    """
    def __init__(self, N, dt=0.001):
        self.N = N
        self.dt = dt
        self.N_exc = int(N * 0.8)
        self.N_inh = N - self.N_exc
        self.tipo = np.ones(N)
        self.tipo[self.N_exc:] = -1
        self.p_conexion = 0.1
        self.pesos = np.random.uniform(0.1, 1.0, (N, N)).astype(np.float32)
        self.mascara = (np.random.rand(N, N) < self.p_conexion).astype(np.float32)
        np.fill_diagonal(self.mascara, 0)
        self.pesos *= self.mascara
        self.V = np.full(N, -70.0, dtype=np.float32)
        self.V_rest = -70.0
        self.V_thresh = -50.0
        self.V_reset = -75.0
        self.tau_m = 0.020
        self.refractario = np.zeros(N, dtype=np.float32)
        self.g_exc = np.zeros(N, dtype=np.float32)
        self.g_inh = np.zeros(N, dtype=np.float32)
        self.tau_exc = 0.005
        self.tau_inh = 0.010
        self.buffer_spikes = []
        self.max_retardo_pasos = 5
        for _ in range(self.max_retardo_pasos):
            self.buffer_spikes.append(np.zeros(N, dtype=bool))

    def paso(self, I_ext):
        self.g_exc *= np.exp(-self.dt / self.tau_exc)
        self.g_inh *= np.exp(-self.dt / self.tau_inh)
        I_syn = self.g_exc * (self.V - 0.0) + self.g_inh * (self.V - (-80.0))
        self.refractario = np.maximum(0.0, self.refractario - self.dt)
        no_ref = self.refractario <= 0
        dV = (self.dt / self.tau_m) * (-(self.V[no_ref] - self.V_rest) + I_ext[no_ref] - I_syn[no_ref])
        self.V[no_ref] += dV
        spikes = self.V >= self.V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        self.buffer_spikes.pop(0)
        self.buffer_spikes.append(spikes)
        spikes_retrasados = self.buffer_spikes[0]
        indices_disparo = np.where(spikes_retrasados)[0]
        for idx in indices_disparo:
            destinos = np.where(self.mascara[idx] > 0)[0]
            w = self.pesos[idx, destinos]
            if self.tipo[idx] > 0:
                self.g_exc[destinos] += w
            else:
                self.g_inh[destinos] += w
        num_spikes = np.sum(spikes_retrasados)
        flops = (8 * self.N) + (6 * np.sum(no_ref)) + (2 * num_spikes * int(self.N * self.p_conexion))
        return spikes, self.V, flops


# ==========================================
# 5. MODELOS AUXILIARES (CPU baseline)
# ==========================================
class RedDensa:
    """Red neuronal artificial densa (clásica ANN)."""
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
    """Red neuronal de disparo LIF esparcida (CPU)."""
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
        self.num_conexiones = min(int(tamano * self.p_conexion), 64)
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


# ==========================================
# 6. RED QUIMICA LIF (CPU NumPy) con homeostasis
# ==========================================
class RedQuimicaLIF:
    """
    Red spiking LIF con canales neuroquimicos. CPU NumPy baseline.

    Incremento 2026-07: homeostasis sinaptica multiplicativa (regulacion
    del tipo de disparo) que mantiene la tasa global cerca de un objetivo
    biologicamente realista (~2% por step = 20 Hz).
    """
    def __init__(self, tamano, dt=0.001, target_rate=0.005):
        # target_rate por step. 0.005 = 5 Hz (realismo cortical, ~1-10 Hz)
        self.N = tamano
        self.dt = dt
        self.tau_m = 0.020
        self.V_rest = -70.0
        self.V_reset = -80.0
        self.V_thresh_base = -50.0
        self.target_rate = target_rate  # fraccion de neuronas que disparan por step
        self.V = np.full(tamano, self.V_rest, dtype=np.float32)
        self.refractario = np.zeros(tamano, dtype=np.float32)
        self.E_glu = 0.0
        self.E_gaba = -90.0
        self.g_glu = np.zeros(tamano, dtype=np.float32)
        self.g_gaba = np.zeros(tamano, dtype=np.float32)
        self.tau_glu = 0.005
        self.tau_gaba = 0.010
        self.p_conexion = 0.1
        self.num_conexiones = min(int(tamano * self.p_conexion), 64)
        self.W_esparcido = np.random.normal(0.2, 0.05, (tamano, self.num_conexiones)).astype(np.float32)
        self.conexiones = np.random.randint(0, tamano, size=(tamano, self.num_conexiones))
        self.es_excitatoria = np.random.rand(tamano) < 0.8
        self.dopamina = 0.5
        # EMA de tasa de disparo para homeostasis
        self.ema_rate = 0.0
        self.tau_homeostasis = 0.5  # segundos
        # Factor de escala homeostatica
        self.scale_factor = 1.0

    def paso(self, I_ext):
        # 1. Decaimiento conductancias
        self.g_glu *= np.exp(-self.dt / self.tau_glu)
        self.g_gaba *= np.exp(-self.dt / self.tau_gaba)
        # 2. Umbral modulado por dopamina
        V_thresh = self.V_thresh_base - (5.0 * (self.dopamina - 0.5))
        # 3. Corriente sinaptica
        I_syn = self.g_glu * (self.V - self.E_glu) + self.g_gaba * (self.V - self.E_gaba)
        # 4. Update V
        self.refractario = np.maximum(0, self.refractario - self.dt)
        no_ref = self.refractario <= 0
        dV = (self.dt / self.tau_m) * (
            -(self.V[no_ref] - self.V_rest) + I_ext[no_ref] - I_syn[no_ref]
        )
        self.V[no_ref] += dV
        # 5. Spikes
        spikes = self.V >= V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        # 6. Propagacion
        indices_disparo = np.where(spikes)[0]
        for idx in indices_disparo:
            destinos = self.conexiones[idx]
            pesos = self.W_esparcido[idx]
            if self.es_excitatoria[idx]:
                self.g_glu[destinos] += pesos
            else:
                self.g_gaba[destinos] += pesos
        # 7. Dopamina
        tasa = float(np.mean(spikes))
        self.dopamina += self.dt * (tasa * 10.0 - (self.dopamina - 0.5))
        self.dopamina = float(np.clip(self.dopamina, 0.0, 1.0))
        # 8. Homeostasis multiplicativa (agresiva para evitar runaway)
        self.ema_rate += self.dt * (tasa - self.ema_rate) / self.tau_homeostasis
        if self.ema_rate > self.target_rate * 1.2:
            self.scale_factor *= 0.99  # baja excitacion
            self.W_esparcido *= 0.99
            self.g_glu *= 0.99
        elif self.ema_rate < self.target_rate * 0.8 and self.ema_rate > 1e-6:
            self.scale_factor *= 1.01
            self.W_esparcido *= 1.01
        # FLOPs rigurosos por step:
        # - Operaciones vectorizadas por neurona (decay, syn, V, dopamina): ~15N
        # - Scatter: por spike por destino (mask, lookup, add): ~4 ops
        num_no_ref = int(np.sum(no_ref))
        num_spikes = int(np.sum(spikes))
        flops = 15 * self.N + 4 * num_spikes * self.num_conexiones + 20
        return spikes, self.dopamina, flops


# ==========================================
# 7. RED QUIMICA LIF — Single-GPU (PyTorch CUDA) con homeostasis
# ==========================================
class RedQuimicaLIFPyTorch:
    """
    Red spiking LIF neuroquimica acelerada por CUDA sobre un unico device.

    Incremento 2026-07: anade homeostasis multiplicativa para evitar el
    runaway excitation (que producia FLOPs inflados y biologicamente
    irreales) y un contador de FLOPs riguroso y monotono.
    """
    def __init__(self, tamano, device='cuda:0', dt=0.001, target_rate=0.005):
        import torch
        self.N = tamano
        self.device = torch.device(device)
        self.dt = dt
        # Biophysics
        self.tau_m = 0.020
        self.V_rest = -70.0
        self.V_reset = -80.0
        self.V_thresh_base = -50.0
        self.E_glu = 0.0
        self.E_gaba = -90.0
        self.tau_glu = 0.005
        self.tau_gaba = 0.010
        self.target_rate = target_rate
        # Estado VRAM
        self.V = torch.full((tamano,), self.V_rest, device=self.device, dtype=torch.float32)
        self.refractario = torch.zeros((tamano,), device=self.device, dtype=torch.float32)
        self.g_glu = torch.zeros((tamano,), device=self.device, dtype=torch.float32)
        self.g_gaba = torch.zeros((tamano,), device=self.device, dtype=torch.float32)
        # Topologia esparcida (capped a 32 conexiones salientes por neurona para
# N grandes; 64 para N pequenas para mejor realismo biol.)
        # Biologicamente: ~10K sinapsis totales pero ~10-100 conexiones salientes
        # en un slice de milisegundo. El cap reduce memoria y previene OOM.
        self.p_conexion = 0.1
        self.num_conexiones = min(int(tamano * self.p_conexion), 64 if tamano < 1_000_000 else 32)
        self.W_esparcido = (
            torch.randn((tamano, self.num_conexiones), device=self.device, dtype=torch.float32) * 0.05 + 0.2
        )
        self.conexiones = torch.randint(
            0, tamano, (tamano, self.num_conexiones), device=self.device, dtype=torch.int32
        )
        self.es_excitatoria = torch.rand((tamano,), device=self.device) < 0.8
        self.dopamina = torch.tensor(0.5, device=self.device, dtype=torch.float32)
        # Constantes precomputadas
        self.decay_glu = float(np.exp(-self.dt / self.tau_glu))
        self.decay_gaba = float(np.exp(-self.dt / self.tau_gaba))
        # Homeostasis
        self.ema_rate = 0.0
        self.tau_homeostasis = 0.2
        self._init_step = 0  # warm-up

    def paso(self, I_ext):
        import torch
        # 1. Decaimiento conductancias
        self.g_glu *= self.decay_glu
        self.g_gaba *= self.decay_gaba
        # 2. Umbral modulado por dopamina
        V_thresh = self.V_thresh_base - (5.0 * (self.dopamina - 0.5))
        # 3. Corriente sinaptica
        I_syn = self.g_glu * (self.V - self.E_glu) + self.g_gaba * (self.V - self.E_gaba)
        # 4. Integracion V
        self.refractario = torch.clamp(self.refractario - self.dt, min=0.0)
        no_ref = self.refractario <= 0
        dV = (self.dt / self.tau_m) * (
            -(self.V[no_ref] - self.V_rest) + I_ext[no_ref] - I_syn[no_ref]
        )
        self.V[no_ref] += dV
        # 5. Spikes
        spikes = self.V >= V_thresh
        self.V[spikes] = self.V_reset
        self.refractario[spikes] = 0.005
        # 6. Propagacion esparcida paralela (index_add_) POR CHUNKS
        # Evita OOM transitorio: para N grande, scatter todos los spikes a la
        # vez genera buffers intermedios >1 GB.
        indices = torch.where(spikes)[0]
        if indices.numel() > 0:
            CHUNK = 50_000
            for start in range(0, indices.numel(), CHUNK):
                idx_chunk = indices[start:start + CHUNK]
                destinos = self.conexiones[idx_chunk].view(-1).long()
                pesos = self.W_esparcido[idx_chunk].view(-1)
                mask = self.es_excitatoria[idx_chunk].repeat_interleave(self.num_conexiones)
                self.g_glu.index_add_(0, destinos[mask], pesos[mask])
                self.g_gaba.index_add_(0, destinos[~mask], pesos[~mask])
        # 7. Dopamina
        tasa = spikes.float().mean()
        self.dopamina = torch.clamp(
            self.dopamina + self.dt * (tasa * 10.0 - (self.dopamina - 0.5)),
            min=0.0, max=1.0
        )
# 8. Homeostasis multiplicativa solo en GPU (cuesta O(N) por step)
        tasa_item = float(tasa.item())
        if self._init_step < 30:
            # Warm-up: deja a la red estabilizarse sin homeostasis agresiva
            self._init_step += 1
        else:
            self.ema_rate += self.dt * (tasa_item - self.ema_rate) / self.tau_homeostasis
            if self.ema_rate > self.target_rate * 1.2:
                # Down-regulation: baja excitacion sinaptica y pesos
                self.W_esparcido.mul_(0.99)
                self.g_glu.mul_(0.99)
            elif self.ema_rate < self.target_rate * 0.8 and self.ema_rate > 0:
                # Up-regulation: aumenta pesos (g_glu ya se decae solo)
                self.W_esparcido.mul_(1.01)
        # 9. FLOPs rigurosos por step
        num_spikes = int(spikes.sum().item())
        flops = 15 * self.N + 4 * num_spikes * self.num_conexiones + 20
        return spikes, self.dopamina, flops


# ==========================================
# 8. RED QUIMICA LIF — Multi-GPU (cuda:0 + cuda:1)
# ==========================================
class RedQuimicaLIFMultiGPU:
    """
    Distribuye la red entre dos GPUs (cuda:0 y cuda:1). En cada step
    los spikes cruzan el bus PCIe para propagacion cruzada.

    NOTA: se mantiene INTENCIONALMENTE este modo ineficiente porque la
    latencia PCIe es EXACTAMENTE el fenomeno fisico que el ensayo
    quiere evidenciar (Von Neumann bottleneck hecho visible).
    """
    def __init__(self, tamano, device0='cuda:0', device1='cuda:1', dt=0.001, target_rate=0.02):
        import torch
        self.N = tamano
        self.dt = dt
        self.device0 = torch.device(device0)
        self.device1 = torch.device(device1)
        self.target_rate = target_rate
        # Split 70/30 por capacidad relativa de VRAM
        self.N0 = int(tamano * 0.7)
        self.N1 = tamano - self.N0
        self.subred0 = RedQuimicaLIFPyTorch(self.N0, device=device0, dt=dt, target_rate=target_rate)
        self.subred1 = RedQuimicaLIFPyTorch(self.N1, device=device1, dt=dt, target_rate=target_rate)
        # Streams paralelos
        self.stream0 = torch.cuda.Stream(device=self.device0)
        self.stream1 = torch.cuda.Stream(device=self.device1)
        # Conectividad cruzada (15 conecciones por neurona por direccion)
        self.num_cx = 15
        self.cx_01 = torch.randint(
            0, self.N1, (self.N0, self.num_cx), device=self.device0, dtype=torch.int32
        )
        self.W_01 = (
            torch.randn((self.N0, self.num_cx), device=self.device0, dtype=torch.float32) * 0.05 + 0.1
        )
        self.cx_10 = torch.randint(
            0, self.N0, (self.N1, self.num_cx), device=self.device1, dtype=torch.int32
        )
        self.W_10 = (
            torch.randn((self.N1, self.num_cx), device=self.device1, dtype=torch.float32) * 0.05 + 0.1
        )

    def paso(self, I_ext):
        import torch
        I0 = I_ext[:self.N0].to(self.device0, non_blocking=True)
        I1 = I_ext[self.N0:].to(self.device1, non_blocking=True)
        # Paso local en streams paralelos
        with torch.cuda.stream(self.stream0):
            spikes0, dopa0, flops0 = self.subred0.paso(I0)
        with torch.cuda.stream(self.stream1):
            spikes1, dopa1, flops1 = self.subred1.paso(I1)
        torch.cuda.synchronize(self.device0)
        torch.cuda.synchronize(self.device1)
        # Propagacion cruzada 0->1 (chunked para evitar OOM)
        idx0 = torch.where(spikes0)[0]
        flops_com = 0
        CHUNK = 50_000
        if idx0.numel() > 0:
            for start in range(0, idx0.numel(), CHUNK):
                ic = idx0[start:start + CHUNK]
                dest = self.cx_01[ic].view(-1).long().to(self.device1)
                w = self.W_01[ic].view(-1).to(self.device1)
                m = self.subred0.es_excitatoria[ic].repeat_interleave(self.num_cx).to(self.device1)
                self.subred1.g_glu.index_add_(0, dest[m], w[m])
                self.subred1.g_gaba.index_add_(0, dest[~m], w[~m])
                flops_com += 4 * ic.numel() * self.num_cx
        # Propagacion cruzada 1->0
        idx1 = torch.where(spikes1)[0]
        if idx1.numel() > 0:
            for start in range(0, idx1.numel(), CHUNK):
                ic = idx1[start:start + CHUNK]
                dest = self.cx_10[ic].view(-1).long().to(self.device0)
                w = self.W_10[ic].view(-1).to(self.device0)
                m = self.subred1.es_excitatoria[ic].repeat_interleave(self.num_cx).to(self.device0)
                self.subred0.g_glu.index_add_(0, dest[m], w[m])
                self.subred0.g_gaba.index_add_(0, dest[~m], w[~m])
                flops_com += 4 * ic.numel() * self.num_cx
        # Unificacion
        spikes_totales = torch.cat([spikes0.to(self.device0), spikes1.to(self.device0)], dim=0)
        flops_total = int(flops0 + flops1) + flops_com
        return spikes_totales, dopa0, flops_total


# ==========================================
# 9. RED QUIMICA LIF — HIBRIDA (cuda:0 + cuda:1 + CPU subred)
# ==========================================
class RedQuimicaLIFHibrida:
    """
    Distribuye la red entre TRES dispositivos heterogeneos:
      cuda:0 (RTX 5070 Ti, 16GB) -> N0 neuronas
      cuda:1 (RTX 2060, 6GB)    -> N1 neuronas
      cpu (DDR5 del host)       -> N_cpu neuronas

    Esta arquitectura es DELIBERADAMENTE ineficiente: introduce la
    latencia de PCIe + DDR + sincronizacion GIL de Python. Pero es
    exactamente la demostracion fisica de que "agregar mas silicio" no
    resuelve el problema fundamental: la red sigue siendo obligadamente
    discreta y el cuello de botella de Von Neumann se manifiesta de
    forma nueva en cada nivel de escala.
    """
    def __init__(self, tamano, device0='cuda:0', device1='cuda:1', dt=0.001, target_rate=0.02):
        import torch
        self.N = tamano
        self.dt = dt
        self.target_rate = target_rate
        self.device0 = torch.device(device0)
        self.device1 = torch.device(device1)
        self.device_cpu = torch.device('cpu')
        # Split por capacidad: cuda:0=2M, cuda:1=1M, cpu=resto
        self.N0 = min(2_000_000, tamano)
        self.N1 = min(1_000_000, tamano - self.N0)
        self.N_cpu = tamano - self.N0 - self.N1
        print(
            f"       [Hibrido: cuda:0={self.N0:,} | cuda:1={self.N1:,} | cpu={self.N_cpu:,} | total={tamano:,}]"
        )
        self.subred0 = RedQuimicaLIFPyTorch(self.N0, device=device0, dt=dt, target_rate=target_rate)
        self.subred1 = RedQuimicaLIFPyTorch(self.N1, device=device1, dt=dt, target_rate=target_rate)
        self.subred_cpu = RedQuimicaLIFPyTorch(self.N_cpu, device='cpu', dt=dt, target_rate=target_rate)
        self.stream0 = torch.cuda.Stream(device=self.device0)
        self.stream1 = torch.cuda.Stream(device=self.device1)
        self.num_cx = 10
        # gpu0 <-> gpu1
        self.cx_01 = torch.randint(0, self.N1, (self.N0, self.num_cx), device=self.device0, dtype=torch.int32)
        self.W_01 = torch.randn((self.N0, self.num_cx), device=self.device0, dtype=torch.float32) * 0.05 + 0.1
        self.cx_10 = torch.randint(0, self.N0, (self.N1, self.num_cx), device=self.device1, dtype=torch.int32)
        self.W_10 = torch.randn((self.N1, self.num_cx), device=self.device1, dtype=torch.float32) * 0.05 + 0.1
        # gpu0 <-> cpu
        self.cx_0c = torch.randint(0, self.N_cpu, (self.N0, self.num_cx), device=self.device0, dtype=torch.int32)
        self.W_0c = torch.randn((self.N0, self.num_cx), device=self.device0, dtype=torch.float32) * 0.05 + 0.1
        self.cx_c0 = torch.randint(0, self.N0, (self.N_cpu, self.num_cx), dtype=torch.int32)
        self.W_c0 = torch.randn((self.N_cpu, self.num_cx), dtype=torch.float32) * 0.05 + 0.1
        # gpu1 <-> cpu
        self.cx_1c = torch.randint(0, self.N_cpu, (self.N1, self.num_cx), device=self.device1, dtype=torch.int32)
        self.W_1c = torch.randn((self.N1, self.num_cx), device=self.device1, dtype=torch.float32) * 0.05 + 0.1
        self.cx_c1 = torch.randint(0, self.N1, (self.N_cpu, self.num_cx), dtype=torch.int32)
        self.W_c1 = torch.randn((self.N_cpu, self.num_cx), dtype=torch.float32) * 0.05 + 0.1

    def _propagar(self, spikes_src, conexiones, pesos, es_exc_src, subred_dst, device_dst, num_cx):
        import torch
        idx = torch.where(spikes_src)[0]
        if idx.numel() == 0:
            return 0
        dest = conexiones[idx].view(-1).long().to(device_dst)
        w = pesos[idx].view(-1).to(device_dst)
        m = es_exc_src[idx].repeat_interleave(num_cx).to(device_dst)
        subred_dst.g_glu.index_add_(0, dest[m], w[m])
        subred_dst.g_gaba.index_add_(0, dest[~m], w[~m])
        return 4 * idx.numel() * num_cx

    def paso(self, I_ext):
        import torch
        I0 = I_ext[:self.N0].to(self.device0, non_blocking=True)
        I1 = I_ext[self.N0:self.N0 + self.N1].to(self.device1, non_blocking=True)
        Ic = I_ext[self.N0 + self.N1:].to(self.device_cpu)
        # Pasos locales: GPUs en paralelo, CPU secuencial (libera GIL)
        with torch.cuda.stream(self.stream0):
            spikes0, dopa0, flops0 = self.subred0.paso(I0)
        with torch.cuda.stream(self.stream1):
            spikes1, dopa1, flops1 = self.subred1.paso(I1)
        spikes_cpu, dopa_cpu, flops_cpu = self.subred_cpu.paso(Ic)
        # Sincronizacion GPUs
        torch.cuda.synchronize(self.device0)
        torch.cuda.synchronize(self.device1)
        # 6 vias de propagacion cruzada
        flops_com = 0
        flops_com += self._propagar(spikes0,    self.cx_01, self.W_01, self.subred0.es_excitatoria, self.subred1,     self.device1,  self.num_cx)
        flops_com += self._propagar(spikes1,    self.cx_10, self.W_10, self.subred1.es_excitatoria, self.subred0,     self.device0,  self.num_cx)
        flops_com += self._propagar(spikes0,    self.cx_0c, self.W_0c, self.subred0.es_excitatoria, self.subred_cpu,  self.device_cpu, self.num_cx)
        flops_com += self._propagar(spikes_cpu, self.cx_c0, self.W_c0, self.subred_cpu.es_excitatoria, self.subred0, self.device0, self.num_cx)
        flops_com += self._propagar(spikes1,    self.cx_1c, self.W_1c, self.subred1.es_excitatoria, self.subred_cpu,  self.device_cpu, self.num_cx)
        flops_com += self._propagar(spikes_cpu, self.cx_c1, self.W_c1, self.subred_cpu.es_excitatoria, self.subred1, self.device1, self.num_cx)
        # Unificacion (movemos a cuda:0 por consistencia)
        spikes_totales = torch.cat(
            [spikes0.to(self.device0), spikes1.to(self.device0), spikes_cpu.to(self.device0)],
            dim=0
        )
        flops_total = int(flops0 + flops1) + int(flops_cpu) + flops_com
        return spikes_totales, dopa0, flops_total
