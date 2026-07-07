"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { EXP } from "@/lib/data";

const WIDTH = 320;
const HEIGHT = 120;
const SAMPLE_RATE = 1000;
const BETA_HZ = 30;
const GAMMA_HZ = 27.5;

type BandKey = "delta" | "theta" | "alpha" | "beta" | "gamma";

const bandLabels: Record<BandKey, string> = {
  delta: "Delta",
  theta: "Theta",
  alpha: "Alpha",
  beta: "Beta",
  gamma: "Gamma",
};

function noiseAt(sample: number) {
  const x = Math.sin(sample * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function reducedMotionEnabled() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function GammaOscillation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const couplingRef = useRef(0.72);
  const [eIcoupling, setEICoupling] = useState(0.72);

  const bands = useMemo(
    () =>
      (["delta", "theta", "alpha", "beta", "gamma"] as BandKey[]).map(
        (key) => ({
          key,
          label: bandLabels[key],
          value: EXP.bands[key],
          high: key === "beta" || key === "gamma",
        }),
      ),
    [],
  );

  const betaGammaPower = useMemo(
    () => EXP.bands.beta + EXP.bands.gamma,
    [],
  );

  const maxBand = useMemo(
    () => Math.max(...bands.map((band) => band.value)),
    [bands],
  );

  useEffect(() => {
    couplingRef.current = eIcoupling;
  }, [eIcoupling]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let running = true;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    canvas.style.width = "100%";
    canvas.style.maxWidth = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    // El canvas no entiende var(--…): resolvemos los tokens a color real.
    const cs = getComputedStyle(document.documentElement);
    const col = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;
    const cSurface2 = col("--surface-2", "#f3eee2");
    const cSurface = col("--surface", "#fdfbf6");
    const cBorder = col("--border", "#e2dccd");
    const cCarbon = col("--carbon", "#b25a24");

    const draw = (timeMs: number) => {
      const coupling = couplingRef.current;
      const amplitude = 0.1 + 0.9 * coupling;
      const noiseAmplitude = (1 - coupling) * 0.5;
      const time = reducedMotionEnabled() ? 0 : timeMs / 1000;

      context.clearRect(0, 0, WIDTH, HEIGHT);

      const gradient = context.createLinearGradient(0, 0, 0, HEIGHT);
      gradient.addColorStop(0, cSurface2);
      gradient.addColorStop(1, cSurface);
      context.fillStyle = gradient;
      context.fillRect(0, 0, WIDTH, HEIGHT);

      context.strokeStyle = cBorder;
      context.lineWidth = 1;
      context.globalAlpha = 0.75;
      for (let y = 24; y < HEIGHT; y += 24) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(WIDTH, y);
        context.stroke();
      }
      context.globalAlpha = 1;

      context.strokeStyle = cCarbon;
      context.lineWidth = 2;
      context.beginPath();

      for (let x = 0; x < WIDTH; x += 1) {
        const sampleTime = time + (x - WIDTH) / SAMPLE_RATE;
        const sampleIndex = Math.floor(sampleTime * SAMPLE_RATE);

        const beta = Math.sin(2 * Math.PI * BETA_HZ * sampleTime);
        const gamma = Math.sin(2 * Math.PI * GAMMA_HZ * sampleTime + 0.55);
        const white = noiseAt(sampleIndex) * noiseAmplitude;

        const signal = (beta * 0.58 + gamma * 0.42) * amplitude + white;
        const y = HEIGHT / 2 - signal * 34;

        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.stroke();

      if (!reducedMotionEnabled() && running) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    draw(0);

    if (!reducedMotionEnabled()) {
      frame = window.requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">
          Exp 4 · Oscilaciones beta–gamma emergentes
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 320px) minmax(220px, 1fr)",
          gap: 24,
          alignItems: "end",
        }}
      >
        <canvas
          ref={canvasRef}
          aria-label="Traza LFP beta-gamma en tiempo real"
          style={{
            width: "100%",
            maxWidth: WIDTH,
            height: HEIGHT,
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface)",
            transition: "border-color 180ms var(--ease)",
          }}
        />

        <div
          aria-label="Potencia por banda"
          style={{
            height: 142,
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(34px, 1fr))",
            gap: 10,
            alignItems: "end",
          }}
        >
          {bands.map((band) => (
            <div
              key={band.key}
              style={{
                display: "grid",
                gap: 7,
                justifyItems: "center",
                color: "var(--text-soft)",
                fontSize: 12,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 96,
                  display: "flex",
                  alignItems: "end",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${Math.max(8, (band.value / maxBand) * 96)}px`,
                    borderRadius: "6px 6px 0 0",
                    background: band.high ? "var(--carbon)" : "var(--muted)",
                    opacity: band.high ? 1 : 0.45,
                    transition: "height 220ms var(--ease)",
                  }}
                />
              </div>
              <span>{band.label}</span>
              <span style={{ color: "var(--text)" }}>
                {band.value.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="control">
        <span>Acoplamiento E-I: {eIcoupling.toFixed(2)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={eIcoupling}
          onChange={(event) => setEICoupling(Number(event.target.value))}
          aria-label="Acoplamiento E-I"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        <div className="stat">
          <div className="stat-num">{betaGammaPower.toFixed(1)}%</div>
          <div className="stat-label">Beta + Gamma</div>
        </div>
        <div className="stat">
          <div className="stat-num">{(eIcoupling * 100).toFixed(0)}%</div>
          <div className="stat-label">Coherencia</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        De la física pasiva de una red excitatoria-inhibitoria con retardos
        axonales emerge actividad beta–gamma (13–80 Hz) sin reloj externo. El
        acoplamiento E-I controla la coherencia: bajo = ruido; alto =
        oscilaciones rítmicas. En silicio, indexar miles de buffers de retardo
        es prohibitivo; en tejido, la morfología axonal lo regala.
      </figcaption>
    </figure>
  );
}
