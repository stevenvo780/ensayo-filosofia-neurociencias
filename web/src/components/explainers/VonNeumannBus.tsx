"use client";

import { useEffect, useState } from "react";
import CountUp from "@/components/CountUp";
import { EXP } from "@/lib/data";

export default function VonNeumannBus() {
  const [scene, setScene] = useState<"silicon" | "carbon">("silicon");
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <figure className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">Von Neumann · Cuello de botella del bus</span>
        <div className="seg">
          <button
            className={scene === "silicon" ? "active" : ""}
            onClick={() => setScene("silicon")}
          >
            Silicio (Von Neumann)
          </button>
          <button
            className={scene === "carbon" ? "active" : ""}
            onClick={() => setScene("carbon")}
          >
            Carbono (local)
          </button>
        </div>
      </div>

      {scene === "silicon" ? (
        <SiliconScene prefersReduced={prefersReduced} />
      ) : (
        <CarbonScene prefersReduced={prefersReduced} />
      )}

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
          <div className="stat-num" style={{ color: "var(--si)" }}>
            <CountUp to={EXP.learning.backpropKB} decimals={0} suffix=" KB" />
          </div>
          <div className="stat-label">Backprop (silicio)</div>
        </div>
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            <CountUp to={EXP.learning.stdpKB} decimals={0} suffix=" KB" />
          </div>
          <div className="stat-label">STDP local (carbono)</div>
        </div>
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "#d94f4f" }}>
            <CountUp to={EXP.learning.factor} decimals={0} suffix="×" />
          </div>
          <div className="stat-label">Reducción de tráfico</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        En arquitectura Von Neumann, CPU y memoria están separadas por un bus único que se
        convierte en cuello de botella: cada operación requiere tráfico repetido de datos. En
        carbono, el almacenamiento y el procesamiento son locales a cada sinapsis, eliminando la
        congestión del bus central. Resultado: 512× menos tráfico de memoria en aprendizaje
        (Bechtel et al., 2008).
      </figcaption>
    </figure>
  );
}

interface SceneProps {
  prefersReduced: boolean;
}

function SiliconScene({ prefersReduced }: SceneProps) {
  const [packets, setPackets] = useState<Array<{ id: number; x: number }>>([]);

  useEffect(() => {
    if (prefersReduced) {
      setPackets([]);
      return;
    }

    const NUM_PACKETS = 6;
    let frame = 0;
    const packetStates = Array.from({ length: NUM_PACKETS }, (_, i) => ({
      id: i,
      offset: (i * 100) / NUM_PACKETS,
    }));

    const animate = () => {
      frame = (frame + 1) % 200;
      const newPackets = packetStates.map((p) => {
        const progress = (frame / 200 + p.offset / 100) % 1;
        const isForward = progress < 0.5;
        const localProgress = isForward ? progress * 2 : (1 - progress) * 2;
        return {
          id: p.id,
          x: isForward ? localProgress * 100 : 100 - localProgress * 100,
        };
      });
      setPackets(newPackets);
    };

    const raf = setInterval(animate, 40);
    return () => clearInterval(raf);
  }, [prefersReduced]);

  return (
    <svg
      viewBox="0 0 400 200"
      style={{
        maxWidth: 500,
        margin: "24px auto",
        display: "block",
        background: "var(--surface)",
        borderRadius: 8,
        border: "1px solid var(--border)",
        transition: "background 0.35s var(--ease), border-color 0.35s var(--ease)",
      }}
    >
      {/* CPU/GPU (izquierda) */}
      <rect
        x={20}
        y={70}
        width={80}
        height={60}
        rx={4}
        fill="var(--si)"
        opacity={0.15}
        stroke="var(--si)"
        strokeWidth="2"
      />
      <text
        x={60}
        y={110}
        textAnchor="middle"
        fill="var(--si)"
        fontSize="12"
        fontWeight="600"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        CPU / GPU
      </text>

      {/* Bus (conexión central) */}
      <line
        x1={100}
        y1={100}
        x2={300}
        y2={100}
        stroke="var(--muted)"
        strokeWidth="3"
        opacity={0.6}
      />

      {/* MEMORIA (derecha) */}
      <rect
        x={300}
        y={70}
        width={80}
        height={60}
        rx={4}
        fill="var(--carbon)"
        opacity={0.15}
        stroke="var(--carbon)"
        strokeWidth="2"
      />
      <text
        x={340}
        y={110}
        textAnchor="middle"
        fill="var(--carbon)"
        fontSize="12"
        fontWeight="600"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        MEMORIA
      </text>

      {/* Paquetes en tránsito por el bus */}
      {packets.map((p) => (
        <circle
          key={p.id}
          cx={100 + (p.x / 100) * 200}
          cy={100}
          r={3}
          fill="var(--si)"
          opacity={0.7}
        />
      ))}
    </svg>
  );
}

function CarbonScene({ prefersReduced }: SceneProps) {
  const nodes = [
    { x: 60, y: 50 },
    { x: 150, y: 30 },
    { x: 240, y: 60 },
    { x: 80, y: 130 },
    { x: 200, y: 150 },
    { x: 310, y: 110 },
  ];

  const [pulses, setPulses] = useState<Array<{ id: string; nodeIdx: number; r: number }>>([]);

  useEffect(() => {
    if (prefersReduced) {
      setPulses([]);
      return;
    }

    let frame = 0;
    const animate = () => {
      frame = (frame + 1) % 240;
      const newPulses: Array<{ id: string; nodeIdx: number; r: number }> = [];

      nodes.forEach((_, idx) => {
        const stagger = (idx * 40) % 120;
        const localFrame = (frame - stagger + 240) % 240;
        if (localFrame < 60) {
          const r = 8 + (localFrame / 60) * 8;
          newPulses.push({
            id: `${idx}-${Math.floor(frame / 60)}`,
            nodeIdx: idx,
            r,
          });
        }
      });

      setPulses(newPulses);
    };

    const raf = setInterval(animate, 40);
    return () => clearInterval(raf);
  }, [prefersReduced]);

  return (
    <svg
      viewBox="0 0 400 200"
      style={{
        maxWidth: 500,
        margin: "24px auto",
        display: "block",
        background: "var(--surface)",
        borderRadius: 8,
        border: "1px solid var(--border)",
        transition: "background 0.35s var(--ease), border-color 0.35s var(--ease)",
      }}
    >
      {/* Nodos (sinapsis distribuidas) */}
      {nodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r={5} fill="var(--carbon)" opacity={0.8} />
          {/* Halo que indica almacenamiento local */}
          <circle
            cx={node.x}
            cy={node.y}
            r={8}
            fill="none"
            stroke="var(--carbon)"
            strokeWidth="1"
            opacity={0.3}
          />
        </g>
      ))}

      {/* Pulsos propagándose localmente */}
      {pulses.map((p) => {
        const node = nodes[p.nodeIdx];
        return (
          <circle
            key={p.id}
            cx={node.x}
            cy={node.y}
            r={p.r}
            fill="var(--carbon)"
            opacity={Math.max(0, 1 - p.r / 16)}
          />
        );
      })}
    </svg>
  );
}
