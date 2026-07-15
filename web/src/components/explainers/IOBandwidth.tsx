"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { IO } from "@/lib/data";

export default function IOBandwidth() {
  const [substrate, setSubstrate] = useState<"carbon" | "silicon">("carbon");
  const [logN, setLogN] = useState(6); // log10(unidades) → 1e6 por defecto
  const reduced = useReducedMotion();

  const n = Math.pow(10, logN);
  // Cableado 2D vs 3D: ratio crece como N^(1/6)
  // A N=1e11, ratio = (1e11)^(1/6) ≈ 68
  const wireRatio = Math.pow(n, 1 / 6);

  // SVG dinámico: carbono 3D con ~50 líneas (representan 7000 en abstracción),
  // silicio 2D con ~6 líneas
  const renderConnections = (isCarbonMode: boolean) => {
    const cx = 150;
    const cy = 150;
    const radius = 80;
    const nodeRadius = 8;

    if (isCarbonMode) {
      // Carbono 3D: neurona central con ~50 conexiones radiadas
      // Simulamos 3D con ángulos, escala y opacidad
      const connections: JSX.Element[] = [];
      const numConnections = 50;

      for (let i = 0; i < numConnections; i++) {
        const angle = (i / numConnections) * Math.PI * 2;
        // Distribución 3D simulada: algunos en primer plano (opacidad alta),
        // otros en fondo (opacidad baja)
        const isBackground = i % 3 === 0;
        const scale = isBackground ? 0.7 : 1;
        const opacity = isBackground ? 0.3 : 0.7;

        const x = cx + Math.cos(angle) * radius * scale;
        const y = cy + Math.sin(angle) * radius * scale;

        connections.push(
          <line
            key={`conn-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--carbon)"
            strokeWidth={2}
            opacity={opacity}
            style={{ transition: reduced ? "none" : "opacity 0.35s var(--ease)" }}
          />
        );

        // Nodo en el extremo
        connections.push(
          <circle
            key={`node-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill="var(--carbon)"
            opacity={opacity}
            style={{ transition: reduced ? "none" : "opacity 0.35s var(--ease)" }}
          />
        );
      }

      // Neurona central
      connections.push(
        <circle
          key="center"
          cx={cx}
          cy={cy}
          r={nodeRadius}
          fill="var(--carbon)"
        />
      );

      return connections;
    } else {
      // Silicio 2D: rejilla con ~6 conexiones (fan-out típico CMOS)
      const connections: JSX.Element[] = [];
      const fanout = 6;

      for (let i = 0; i < fanout; i++) {
        const angle = (i / fanout) * Math.PI * 2;
        const x = cx + Math.cos(angle) * radius * 0.6;
        const y = cy + Math.sin(angle) * radius * 0.6;

        connections.push(
          <line
            key={`conn-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="var(--si)"
            strokeWidth={2}
            opacity={1}
            style={{ transition: reduced ? "none" : "opacity 0.35s var(--ease)" }}
          />
        );

        connections.push(
          <circle
            key={`node-${i}`}
            cx={x}
            cy={y}
            r={4}
            fill="var(--si)"
            opacity={1}
            style={{ transition: reduced ? "none" : "opacity 0.35s var(--ease)" }}
          />
        );
      }

      // Neurona central
      connections.push(
        <circle
          key="center"
          cx={cx}
          cy={cy}
          r={nodeRadius}
          fill="var(--si)"
        />
      );

      return connections;
    }
  };

  const preset = (s: "carbon" | "silicon") => setSubstrate(s);

  return (
    <figure className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">Exp 8 · I/O y ancho de banda</span>
        <div className="seg">
          <button
            className={substrate === "carbon" ? "active" : ""}
            onClick={() => preset("carbon")}
          >
            Carbono (3D)
          </button>
          <button
            className={substrate === "silicon" ? "active" : ""}
            onClick={() => preset("silicon")}
          >
            Silicio (2D)
          </button>
        </div>
      </div>

      <svg
        viewBox="0 0 300 300"
        style={{
          maxWidth: 340,
          margin: "16px auto",
          display: "block",
          background: "var(--surface-2)",
          borderRadius: 8,
          transition: reduced ? "none" : "background 0.35s var(--ease)",
        }}
        aria-label={`Neurona ${substrate === "carbon" ? "carbono" : "silicio"} con conexiones`}
      >
        {renderConnections(substrate === "carbon")}
      </svg>

      <div className="control">
        <span style={{ minWidth: 160 }}>
          Unidades: 10<sup>{logN}</sup>
        </span>
        <input
          type="range"
          min={3}
          max={11}
          step={0.5}
          value={logN}
          onChange={(e) => setLogN(Number(e.target.value))}
          aria-label="Escala logarítmica de unidades"
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
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            {IO.fanoutRatio.toLocaleString("es")}×
          </div>
          <div className="stat-label">Fan-out (carbono/silicio)</div>
        </div>

        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--si)" }}>
            <CountUp
              to={wireRatio}
              decimals={1}
              suffix="×"
            />
          </div>
          <div className="stat-label">Ratio cableado 2D/3D</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        <strong>Densidad de acoplamiento: un parámetro organizacional.</strong> Una neurona emite
        ~{IO.fanoutCarbon.toLocaleString("es")} sinapsis embebidas en 3D; una celda CMOS en rejilla
        planar, ~{IO.fanoutSilicon}. Arrastra el rango de escala: el cableado requerido crece como
        N<sup>1/6</sup>. <strong>La restricción es del empaquetado planar, no del silicio</strong> —el
        apilamiento 3D existe (TSV, litografía multicapa) y avanza—, así que esto no es una frontera
        de sustrato sino un estado de la técnica. Lo que sí ilustra es la magnitud que la Parte II
        señala como el motor real del argumento: la <strong>integración causal</strong>, que se define
        por cómo se enlazan los procesos y no por de qué están hechos. Y una advertencia contra la
        lectura fácil: <strong>más acoplamiento no es más sujeto</strong>. Un cuenco de neuronas en
        placa tiene el fan-out y no es nadie. La topología puede seleccionar una escala; ninguna
        cantidad de fan-out entrega experiencia.
      </figcaption>
    </figure>
  );
}
