"use client";

import { useMemo, useState } from "react";
import { VAR } from "@/lib/data";
import CountUp from "@/components/CountUp";

/**
 * Exp 7 — Variabilidad / espacio de estados.
 * Contraste analógico (carbono: 4.7 bits/sinapsis) vs binario (silicio: 1 bit/sinapsis).
 * La combinatoria neuromoduladora escala el espacio de estados exponencialmente.
 */
export default function StateSpaceVariability() {
  const [modulators, setModulators] = useState(50); // 0..100

  const { carbonBits, siliconBits, stateSpaceRatio, carbonLevels } = useMemo(() => {
    const M = modulators;
    const synCarb = VAR.synPerNeuron * VAR.bitsSynCarbon;
    const synSil = VAR.synPerNeuron * VAR.bitsSynSilicon;
    const modBits = M > 0 ? M * Math.log2(VAR.modulatorLevels) : 0;
    const carbTotal = synCarb + modBits;
    const ratio = Math.pow(2, carbTotal - synSil); // estados carbono / estados silicio

    return {
      carbonBits: carbTotal,
      siliconBits: synSil,
      stateSpaceRatio: ratio,
      carbonLevels: Math.pow(2, VAR.bitsSynCarbon), // ≈ 26 niveles
    };
  }, [modulators]);

  // Visualización: fila de 12 "sinapsis"
  // Silicio: 2 estados (off/on)
  // Carbono: ~26 estados graduados
  const synapseCount = 12;
  const siliconState = 2;
  const carbonState = Math.round(carbonLevels);

  const preset = (v: number) => setModulators(v);

  return (
    <figure className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">Exp 7 · Variabilidad del espacio de estados</span>
        <div className="seg">
          <button className={modulators <= 10 ? "active" : ""} onClick={() => preset(0)}>
            Sin moduladores
          </button>
          <button className={modulators >= 90 ? "active" : ""} onClick={() => preset(100)}>
            Máxima modulación
          </button>
        </div>
      </div>

      {/* Visualización: dos filas de sinapsis */}
      <div style={{ margin: "20px 0" }}>
        {/* Silicio: binario */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            Silicio · {siliconState} estados/sinapsis (binario)
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              maxWidth: 340,
              marginInline: "auto",
            }}
          >
            {Array.from({ length: synapseCount }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  aspectRatio: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  background: "var(--si-soft)",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                    background: "var(--si)",
                    transition: "height 0.6s var(--ease)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carbono: analógico con gradación */}
        <div>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            Carbono · {carbonState} estados/sinapsis (analógico + moduladores)
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
              maxWidth: 340,
              marginInline: "auto",
            }}
          >
            {Array.from({ length: synapseCount }).map((_, i) => {
              // Alturas pseudoaleatorias pero estables por índice
              const pseudoRand = (Math.sin(i * 0.7) + 1) / 2; // [0, 1]
              const heightFrac = 0.2 + pseudoRand * (modulators / 100) * 0.8; // escala con moduladores
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    aspectRatio: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    background: "var(--carbon-soft)",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${heightFrac * 100}%`,
                      background: `linear-gradient(to top, var(--carbon), var(--carbon-2))`,
                      transition: "height 0.6s var(--ease)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control: deslizador de neuromoduladores */}
      <div className="control">
        <span style={{ minWidth: 120 }}>Neuromoduladores: {modulators}</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={modulators}
          onChange={(e) => setModulators(Number(e.target.value))}
          aria-label="Número de neuromoduladores"
        />
      </div>

      {/* Estadísticas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 20,
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--si)" }}>
            {VAR.bitsSynSilicon}
          </div>
          <div className="stat-label">bits/sinapsis (silicio)</div>
        </div>

        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            {VAR.bitsSynCarbon.toFixed(1)}
          </div>
          <div className="stat-label">bits/sinapsis (carbono)</div>
        </div>

        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            <CountUp
              to={Math.log10(stateSpaceRatio)}
              decimals={1}
              suffix=""
            />
          </div>
          <div className="stat-label">log₁₀(razón de estados)</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        El silicio conmuta entre dos estados por sinapsis. El carbono codifica ~26 potenciales
        graduados (4,7 bits) y, con moduladores químicos, multiplica el espacio de estados
        exponencialmente. En 7000 sinapsis por neurona + 50–100 moléculas señalizadoras, el
        carbono alcanza espacios de estado que el silicio requeriría miles de bits para emular.
      </figcaption>
    </figure>
  );
}
