// Emblema "Silicio ⇄ Tejido": retícula hexagonal de silicio (frío) fundida con
// una neurona de carbono (cálido). SVG + animación CSS/SMIL (server-safe).

export default function Emblem({
  size = 40,
  animated = true,
}: {
  size?: number;
  animated?: boolean;
}) {
  const a = animated ? "on" : "off";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="Emblema silicio y tejido"
      style={{ display: "block", flexShrink: 0 }}
    >
      <style>{`
        .em-hex { stroke: var(--si); stroke-width: 2.4; fill: none; }
        .em-node { fill: var(--si); }
        .em-neuron { stroke: var(--carbon); stroke-width: 2.4; fill: none; stroke-linecap: round; }
        .em-soma { fill: var(--carbon); }
        .em-bouton { fill: var(--carbon); }
        .em-bridge { stroke: var(--muted); stroke-width: 1.6; stroke-dasharray: 2 3; }
        .em-ring { stroke: var(--border-strong); stroke-width: 1.5; fill: none; }
        .em-${a} .em-bouton { animation: pulse-node 2.4s var(--ease) infinite; transform-origin: center; }
        .em-${a} .b1 { animation-delay: 0s; } .em-${a} .b2 { animation-delay: .5s; } .em-${a} .b3 { animation-delay: 1s; }
        .em-${a} .em-signal { animation: pulse-node 2.2s linear infinite; }
      `}</style>
      <g className={`em-${a}`}>
        <circle className="em-ring" cx="60" cy="60" r="55" />

        {/* Silicio — hexágono + nodos */}
        <polygon className="em-hex" points="68,60 56,39.2 32,39.2 20,60 32,80.8 56,80.8" />
        <circle className="em-node" cx="68" cy="60" r="3" />
        <circle className="em-node" cx="56" cy="39.2" r="3" />
        <circle className="em-node" cx="32" cy="39.2" r="3" />
        <circle className="em-node" cx="20" cy="60" r="3" />
        <circle className="em-node" cx="32" cy="80.8" r="3" />
        <circle className="em-node" cx="56" cy="80.8" r="3" />
        <line className="em-hex" x1="32" y1="39.2" x2="56" y2="80.8" opacity="0.4" />
        {animated && (
          <circle className="em-signal em-node" r="2.6">
            <animateMotion dur="3.2s" repeatCount="indefinite"
              path="M68,60 L56,39.2 L32,39.2 L20,60 L32,80.8 L56,80.8 Z" />
          </circle>
        )}

        {/* Puente silicio → carbono */}
        <line className="em-bridge" x1="68" y1="60" x2="76" y2="60" />

        {/* Carbono — neurona */}
        <circle className="em-soma" cx="84" cy="60" r="7.5" />
        <path className="em-neuron" d="M84,60 Q96,49 104,43" />
        <path className="em-neuron" d="M84,60 Q99,60 107,62" />
        <path className="em-neuron" d="M84,60 Q95,72 101,80" />
        <circle className="em-bouton b1" cx="104" cy="43" r="3" />
        <circle className="em-bouton b2" cx="107" cy="62" r="3" />
        <circle className="em-bouton b3" cx="101" cy="80" r="3" />
      </g>
    </svg>
  );
}
