// Datos reales del laboratorio (simulaciones/datos/*.csv). Fuente de verdad para los explicadores.

export type Tier = "CPU" | "SingleGPU" | "MultiGPU" | "Hibrido";

export interface BenchRow {
  tier: Tier;
  n: number;
  timeMs: number;
  powerW: number;
  eSi: number; // J
  eCarbon: number; // J
  gap: number; // brecha (×)
}

// resultados_escalamiento.csv (1 s biológico simulado)
export const BENCH: BenchRow[] = [
  { tier: "CPU", n: 100, timeMs: 19.1, powerW: 100, eSi: 1.91, eCarbon: 4.67e-6, gap: 4.1e5 },
  { tier: "CPU", n: 1000, timeMs: 78.7, powerW: 100, eSi: 7.87, eCarbon: 7.39e-5, gap: 1.07e5 },
  { tier: "CPU", n: 8000, timeMs: 397.8, powerW: 100, eSi: 39.78, eCarbon: 6.0e-4, gap: 6.63e4 },
  { tier: "SingleGPU", n: 50000, timeMs: 707.5, powerW: 66.8, eSi: 47.24, eCarbon: 3.65e-3, gap: 1.3e4 },
  { tier: "SingleGPU", n: 250000, timeMs: 849, powerW: 91.2, eSi: 77.42, eCarbon: 1.82e-2, gap: 4.25e3 },
  { tier: "SingleGPU", n: 1000000, timeMs: 1217, powerW: 139, eSi: 169.16, eCarbon: 5.44e-2, gap: 3.11e3 },
  { tier: "SingleGPU", n: 6000000, timeMs: 6231, powerW: 184, eSi: 1144, eCarbon: 0.326, gap: 3.51e3 },
  { tier: "MultiGPU", n: 8000000, timeMs: 64823, powerW: 154, eSi: 9974, eCarbon: 0.716, gap: 1.39e4 },
  { tier: "MultiGPU", n: 12000000, timeMs: 100158, powerW: 158, eSi: 15837, eCarbon: 1.07, gap: 1.47e4 },
  { tier: "Hibrido", n: 14000000, timeMs: 563735, powerW: 223, eSi: 125654, eCarbon: 1.29, gap: 9.72e4 },
  { tier: "Hibrido", n: 16000000, timeMs: 673732, powerW: 225, eSi: 151313, eCarbon: 1.45, gap: 1.04e5 },
];

export const TIER_META: Record<Tier, { label: string; bottleneck: string; color: string }> = {
  CPU: { label: "CPU · NumPy", bottleneck: "loop Python", color: "var(--si)" },
  SingleGPU: { label: "Single GPU · RTX 5070 Ti", bottleneck: "VRAM 16 GB", color: "var(--si-2)" },
  MultiGPU: { label: "Multi-GPU · PCIe", bottleneck: "bus PCIe (×10)", color: "var(--carbon-2)" },
  Hibrido: { label: "Híbrido · CPU+2GPU+DDR", bottleneck: "DDR+PCIe+GIL (×100)", color: "var(--carbon)" },
};

// Constantes biofísicas / termodinámicas
export const CONST = {
  atpPerSpikeJ: 1.65e-9, // J por spike (carbono, fijo)
  landauerJ: 2.8e-21, // kT·ln2 a 300 K, por bit
  cmosJ: 1e-15, // ~energía por operación CMOS
};

// Experimentos
export const EXP = {
  visual: { dense: 22154880, sparse: 2218827, reduction: 0.9 }, // Exp1 FLOPs
  crosstalk: { dense: 80.0, sparse: 1.03 }, // Exp2 %
  chem: { min: 120000, max: 428000, channels: [1, 15] }, // Exp3 FLOPs lineal
  bands: { delta: 8.3, theta: 9.3, alpha: 11.1, beta: 30.3, gamma: 27.5 }, // Exp4 % potencia
  learning: { backpropKB: 20000, stdpKB: 39, factor: 512 }, // Exp5
  morphology: { disembodied: 757760, embodied: 2 }, // Exp6 FLOPs
};

// Formateadores
export const fmtGap = (g: number) =>
  g >= 1e4 ? `${(g / 1e3).toFixed(0)} 000×` : `${g.toLocaleString("es")}×`;

export const fmtInt = (n: number) => n.toLocaleString("es");

export const fmtTime = (ms: number) => {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  const s = ms / 1000;
  if (s < 90) return `${s.toFixed(1)} s`;
  const m = Math.floor(s / 60);
  const rem = Math.round(s % 60);
  return `${m} min ${rem} s`;
};
