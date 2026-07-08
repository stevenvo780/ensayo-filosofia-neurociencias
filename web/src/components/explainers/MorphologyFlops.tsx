"use client";

import { useState, useMemo } from "react";
import CountUp from "@/components/CountUp";
import { EXP, fmtInt } from "@/lib/data";

export default function MorphologyFlops() {
  const [mode, setMode] = useState<"disembodied" | "embodied">("disembodied");

  const disembodied = EXP.morphology.disembodied; // 757760
  const embodied = EXP.morphology.embodied; // 2
  const factor = Math.round(disembodied / embodied); // 378880

  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <figure className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">Exp 6 · Cómputo morfológico</span>
        <div className="seg">
          <button
            className={mode === "disembodied" ? "active" : ""}
            onClick={() => setMode("disembodied")}
          >
            Desencarnado (silicio)
          </button>
          <button
            className={mode === "embodied" ? "active" : ""}
            onClick={() => setMode("embodied")}
          >
            Corporizado (grillo de Webb)
          </button>
        </div>
      </div>

      {/* SVG visualization */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 220,
          margin: "16px 0",
        }}
      >
        {mode === "disembodied" ? (
          <SVGDisembodied animate={!prefersReduced} key="disembodied" />
        ) : (
          <SVGEmbodied key="embodied" />
        )}
      </div>

      {/* FLOPs counter */}
      <div className="control" style={{ justifyContent: "center" }}>
        <div className="stat">
          <div
            className="stat-num"
            style={{
              color: mode === "disembodied" ? "var(--si)" : "var(--carbon)",
            }}
          >
            <CountUp
              to={mode === "disembodied" ? disembodied : embodied}
              format={fmtInt}
              suffix=" FLOPs"
            />
          </div>
          <div className="stat-label">Operaciones de localización</div>
        </div>
      </div>

      {/* Factor (reduction ratio) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            <CountUp to={factor} format={fmtInt} suffix="×" />
          </div>
          <div className="stat-label">Factor de eficiencia</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        El cómputo no desaparece: se <strong>reubica</strong> en la física del cuerpo. Un circuito
        neuronal desencarnado (FFT + correlación cruzada) requiere {fmtInt(disembodied)} operaciones
        para localizar un sonido; un <em>grillo de Webb</em> (1996) lo resuelve con dos micrófonos
        y un tubo de desfase acústico: apenas {embodied} FLOPs. La autopoiesis —el acoplamiento
        estructural entre el sistema nervioso y el cuerpo— no depende del carbono ni del silicio,
        sino de la {" "}
        <strong>geometría viva</strong> que deslocaliza la cognición fuera del
        procesamiento simbólico.
      </figcaption>
    </figure>
  );
}

interface SVGDisembodiedProps {
  animate: boolean;
}

function SVGDisembodied({ animate }: SVGDisembodiedProps) {
  const dotAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const radius = 50;

  return (
    <svg
      viewBox="0 0 200 200"
      width={200}
      height={200}
      role="img"
      aria-label="Modelo desencarnado: FFT y correlación cruzada (757.760 FLOPs)"
      style={{
        maxWidth: "100%",
      }}
    >
      <defs>
        <style>{`
          @keyframes fftRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fftPulse {
            0%, 100% { r: 3; opacity: 0.9; }
            50% { r: 5; opacity: 0.5; }
          }
          .fft-group {
            transform-origin: 100px 100px;
            ${animate ? "animation: fftRotate 3.5s linear infinite;" : ""}
          }
          .fft-dot {
            ${animate ? "animation: fftPulse 1.2s ease-in-out infinite;" : ""}
          }
        `}</style>
      </defs>

      {/* Central core */}
      <circle cx="100" cy="100" r="6" fill="var(--si)" opacity="0.6" />

      {/* Rotating ring of dots (FFT nodes) */}
      <g className="fft-group">
        {dotAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + radius * Math.cos(rad);
          const y = 100 + radius * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="var(--si)"
              className="fft-dot"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          );
        })}
      </g>

      {/* Connecting arcs (correlations) */}
      <g className="fft-group" style={{ opacity: 0.4 }}>
        {[0, 90, 180, 270].map((angle, i) => {
          const rad1 = (angle * Math.PI) / 180;
          const rad2 = ((angle + 90) * Math.PI) / 180;
          const x1 = 100 + radius * Math.cos(rad1);
          const y1 = 100 + radius * Math.sin(rad1);
          const x2 = 100 + radius * Math.cos(rad2);
          const y2 = 100 + radius * Math.sin(rad2);
          return (
            <path
              key={`arc-${i}`}
              d={`M ${x1} ${y1} Q 100 100 ${x2} ${y2}`}
              stroke="var(--si)"
              strokeWidth="1.5"
              fill="none"
            />
          );
        })}
      </g>

      {/* Label */}
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fontSize="12"
        fill="var(--text-soft)"
        fontFamily="var(--font-mono)"
      >
        FFT + Correlación
      </text>
    </svg>
  );
}

function SVGEmbodied() {
  return (
    <svg
      viewBox="0 0 200 200"
      width={200}
      height={200}
      role="img"
      aria-label="Modelo corporizado: micrófonos y tubo de desfase acústico (2 FLOPs)"
      style={{
        maxWidth: "100%",
      }}
    >
      {/* Left microphone */}
      <g>
        <circle cx="55" cy="70" r="7" fill="var(--carbon)" opacity="0.85" />
        <path d="M 55 77 L 55 100" stroke="var(--carbon)" strokeWidth="2.5" opacity="0.7" />
      </g>

      {/* Right microphone */}
      <g>
        <circle cx="145" cy="70" r="7" fill="var(--carbon)" opacity="0.85" />
        <path d="M 145 77 L 145 100" stroke="var(--carbon)" strokeWidth="2.5" opacity="0.7" />
      </g>

      {/* Phase delay tube (acoustic path) */}
      <g>
        <path
          d="M 62 100 Q 100 115 138 100"
          stroke="var(--carbon)"
          strokeWidth="3.5"
          fill="none"
          opacity="0.6"
        />
        {/* Time-delay markers */}
        <circle cx="75" cy="105" r="1.5" fill="var(--carbon)" opacity="0.5" />
        <circle cx="100" cy="113" r="1.5" fill="var(--carbon)" opacity="0.5" />
        <circle cx="125" cy="105" r="1.5" fill="var(--carbon)" opacity="0.5" />
      </g>

      {/* Incoming sound waves */}
      <g opacity="0.4">
        <circle cx="35" cy="65" r="3" fill="var(--si)" />
        <circle cx="165" cy="65" r="3" fill="var(--si)" />
        <path
          d="M 35 60 L 35 50 M 42 58 L 42 48 M 165 60 L 165 50 M 158 58 L 158 48"
          stroke="var(--si)"
          strokeWidth="1"
        />
      </g>

      {/* Label */}
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fontSize="12"
        fill="var(--text-soft)"
        fontFamily="var(--font-mono)"
      >
        Tubo de desfase
      </text>
    </svg>
  );
}
