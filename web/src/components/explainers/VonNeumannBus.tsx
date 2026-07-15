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
            Memoria separada (bus)
          </button>
          <button
            className={scene === "carbon" ? "active" : ""}
            onClick={() => setScene("carbon")}
          >
            Memoria local (sin bus)
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
          <div className="stat-label">Backprop · regla no local</div>
        </div>
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            <CountUp to={EXP.learning.stdpKB} decimals={0} suffix=" KB" />
          </div>
          <div className="stat-label">STDP · regla local</div>
        </div>
        <div className="stat" style={{ textAlign: "center" }}>
          {/* Sin CountUp: animar esta cifra la presentaría como un hallazgo. Es una
              consecuencia analítica de la localidad de la regla (§IV.2). */}
          <div className="stat-num" style={{ color: "var(--muted)" }}>
            {EXP.learning.factor}×
          </div>
          <div className="stat-label">◐ cálculo cerrado, no medición</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        En arquitectura Von Neumann, procesador y memoria están separados por un bus que se
        convierte en cuello de botella: cada operación exige tráfico repetido de datos. Una regla de
        aprendizaje <em>local</em> (tipo STDP) no lo necesita, porque sólo depende de lo que pasa en
        cada sinapsis. <strong>Cautela:</strong> el cociente de 512× que este trabajo publicaba{" "}
        <em>no es un hallazgo empírico</em>: se sigue analíticamente de la localidad de la regla y no
        depende del tamaño de la red (ver §IV.2). Y el contraste es entre dos <em>algoritmos</em>
        —regla local frente a retropropagación—, ambos ejecutables en silicio: no es una medida del
        carbono.
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

/** Sinapsis química detallada: botón presináptico con vesículas, hendidura con
 *  neurotransmisores cruzando y espina dendrítica postsináptica. La transmisión
 *  ocurre a lo largo del eje local +x; se orienta con `angle`. Un halo cálido
 *  pulsa localmente: cómputo y memoria en el mismo punto, sin bus. */
function SynapseGlyph({
  x,
  y,
  angle,
  t,
  reduced,
}: {
  x: number;
  y: number;
  angle: number;
  t: number; // 0..1, fase local de actividad
  reduced: boolean;
}) {
  // Ventana de actividad en la primera mitad del ciclo.
  const firing = reduced ? 0.5 : t < 0.5 ? t / 0.5 : 0; // 0..1 mientras dispara
  const glow = reduced ? 0.5 : Math.sin(Math.max(0, firing) * Math.PI) * 0.9;
  // 3 neurotransmisores cruzando la hendidura (x: 7 → 12) escalonados.
  const nt = [0, 0.33, 0.66].map((off) => {
    const p = reduced ? 0.5 : (firing + off) % 1;
    return { p, x: 7 + p * 5, y: (off - 0.33) * 4 };
  });
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      {/* Halo local: almacenamiento + procesamiento in situ */}
      <circle r={17} fill="url(#synGlow)" opacity={glow} />
      {/* Botón axónico presináptico */}
      <circle r={7.5} fill="url(#bouton)" stroke="var(--carbon)" strokeWidth={0.6} />
      {/* Vesículas dentro del botón */}
      {[
        [-3, -2.5],
        [1.5, -3],
        [-1, 2.5],
        [3, 1.5],
      ].map(([vx, vy], i) => (
        <circle key={i} cx={vx} cy={vy} r={1.3} fill="var(--carbon-soft)" opacity={0.9} />
      ))}
      {/* Espina dendrítica postsináptica (cuello + cabeza en champiñón) */}
      <line x1={13.5} y1={0} x2={16.5} y2={0} stroke="var(--carbon)" strokeWidth={2} strokeLinecap="round" opacity={0.55} />
      <circle cx={19.5} cy={0} r={4.4} fill="var(--carbon)" opacity={0.22} stroke="var(--carbon)" strokeWidth={0.9} />
      {/* Hendidura sináptica: membrana presináptica (zona activa) + postsináptica */}
      <path d="M 6.5 -4.5 A 4.5 4.5 0 0 1 6.5 4.5" fill="none" stroke="var(--carbon)" strokeWidth={1.5} />
      <path d="M 13 -4 A 4 4 0 0 0 13 4" fill="none" stroke="var(--carbon)" strokeWidth={1.3} opacity={0.7} />
      {/* Receptores en la densidad postsináptica */}
      {[-2.4, 0, 2.4].map((ry, i) => (
        <rect key={i} x={13} y={ry - 0.7} width={1.7} height={1.4} rx={0.4} fill="var(--carbon)" opacity={0.55} />
      ))}
      {/* Neurotransmisores cruzando la hendidura (encima de las membranas) */}
      {nt.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={1.35} fill="var(--carbon-2)" opacity={0.95} />
      ))}
    </g>
  );
}

function CarbonScene({ prefersReduced }: SceneProps) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    let frame = 0;
    const id = setInterval(() => {
      frame = (frame + 1) % 100;
      setT(frame / 100);
    }, 40);
    return () => clearInterval(id);
  }, [prefersReduced]);

  // Sinapsis distribuidas (sin bus central): posición, orientación y fase.
  const synapses = [
    { x: 104, y: 68, angle: 18, phase: 0 },
    { x: 256, y: 54, angle: 156, phase: 0.34 },
    { x: 176, y: 146, angle: -58, phase: 0.62 },
  ];

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
      <defs>
        <radialGradient id="synGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--carbon)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--carbon)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bouton" cx="36%" cy="32%" r="70%">
          <stop offset="0%" stopColor="var(--carbon-2)" />
          <stop offset="100%" stopColor="var(--carbon)" />
        </radialGradient>
        <radialGradient id="soma" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="var(--carbon-2)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--carbon)" stopOpacity="0.22" />
        </radialGradient>
      </defs>

      {/* Tejido: axones y dendritas orgánicas que alimentan cada sinapsis (sin bus) */}
      <g fill="none" stroke="var(--carbon)" strokeWidth={1.3} strokeLinecap="round" opacity={0.42}>
        <path d="M 18 44 Q 62 40 96 63" />
        <path d="M 40 116 Q 110 150 168 143" />
        <path d="M 384 34 Q 312 42 264 51" />
        <path d="M 190 30 Q 150 48 122 62" />
        <path d="M 300 158 Q 250 156 190 150" />
      </g>

      {/* Somas de fondo (cuerpos neuronales) con dendritas cortas */}
      {[
        { x: 26, y: 40 },
        { x: 372, y: 30 },
        { x: 32, y: 120 },
      ].map((s, i) => (
        <g key={i}>
          <g fill="none" stroke="var(--carbon)" strokeWidth={1} strokeLinecap="round" opacity={0.35}>
            <path d={`M ${s.x} ${s.y} q -10 -8 -16 -4`} />
            <path d={`M ${s.x} ${s.y} q -12 4 -18 2`} />
            <path d={`M ${s.x} ${s.y} q -4 12 -10 15`} />
          </g>
          <circle cx={s.x} cy={s.y} r={7} fill="url(#soma)" stroke="var(--carbon)" strokeWidth={0.7} opacity={0.9} />
        </g>
      ))}

      {/* Sinapsis detalladas */}
      {synapses.map((s, i) => (
        <SynapseGlyph
          key={i}
          x={s.x}
          y={s.y}
          angle={s.angle}
          t={(t + s.phase) % 1}
          reduced={prefersReduced}
        />
      ))}
    </svg>
  );
}
