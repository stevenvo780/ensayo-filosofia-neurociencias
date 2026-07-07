"use client";

import { useMemo, useState } from "react";

/**
 * Exp 2 — Codificación densa vs. esparcida (crosstalk).
 * Rejilla de neuronas: dos conceptos (A azul, B ámbar) se almacenan activando
 * una fracción `density` de la red. El solapamiento (rojo) es la interferencia de
 * memoria: crece con la densidad. Datos reales: densa 80,0% → esparcida 1,03%.
 */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const N = 20; // 20×20 = 400 neuronas
const TOTAL = N * N;

export default function SparseCoding() {
  const [density, setDensity] = useState(1); // %

  // Umbrales fijos por neurona para dos conceptos → solapamiento emergente y estable
  const thresholds = useMemo(() => {
    const rng = mulberry32(42);
    return Array.from({ length: TOTAL }, () => [rng(), rng()] as [number, number]);
  }, []);

  const { cells, activePct, crosstalk } = useMemo(() => {
    const d = density / 100;
    let inA = 0, inBoth = 0, active = 0;
    const cells = thresholds.map(([ra, rb]) => {
      const a = ra < d, b = rb < d;
      if (a) inA++;
      if (a && b) inBoth++;
      if (a || b) active++;
      return a && b ? 3 : a ? 1 : b ? 2 : 0;
    });
    return {
      cells,
      activePct: (active / TOTAL) * 100,
      crosstalk: inA ? (inBoth / inA) * 100 : 0,
    };
  }, [density, thresholds]);

  const color = ["var(--border)", "var(--si)", "var(--carbon)", "#d94f4f"];

  const preset = (v: number) => setDensity(v);

  return (
    <figure className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">Exp 2 · Codificación esparcida</span>
        <div className="seg">
          <button className={density <= 2 ? "active" : ""} onClick={() => preset(1)}>
            Esparcida 1%
          </button>
          <button className={density >= 79 ? "active" : ""} onClick={() => preset(80)}>
            Densa 80%
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${N}, 1fr)`,
          gap: 3,
          margin: "16px 0",
          aspectRatio: "1",
          maxWidth: 340,
          marginInline: "auto",
        }}
      >
        {cells.map((s, i) => (
          <div
            key={i}
            style={{
              background: color[s],
              opacity: s === 0 ? 0.3 : 1,
              borderRadius: 2,
              transition: "background 0.35s var(--ease), opacity 0.35s var(--ease)",
              boxShadow: s === 3 ? "0 0 6px #d94f4f" : "none",
            }}
          />
        ))}
      </div>

      <div className="control">
        <span style={{ minWidth: 96 }}>Activación: {activePct.toFixed(activePct < 10 ? 1 : 0)}%</span>
        <input
          type="range"
          min={1}
          max={80}
          step={1}
          value={density}
          onChange={(e) => setDensity(Number(e.target.value))}
          aria-label="Densidad de activación"
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
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: crosstalk > 20 ? "#d94f4f" : "var(--carbon)" }}>
            {crosstalk.toFixed(crosstalk < 10 ? 2 : 0)}%
          </div>
          <div className="stat-label">Crosstalk (interferencia)</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        Cada punto es una neurona; azul y ámbar son dos conceptos almacenados, y el{" "}
        <span style={{ color: "#d94f4f", fontStyle: "normal", fontWeight: 600 }}>rojo</span> es su
        solapamiento. Arrastra: en régimen denso (80%) la interferencia es masiva; la esparsidad
        biológica del 1% la reduce a ~1%, garantizando inmunidad al crosstalk.
      </figcaption>
    </figure>
  );
}
