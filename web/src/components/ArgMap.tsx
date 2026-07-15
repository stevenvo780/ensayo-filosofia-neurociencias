/**
 * ArgMap — mapa conceptual del argumento completo (no un data-viz, un mapa
 * mental de apoyo a la comprensión). Muestra la columna vertebral: la afirmación
 * central se desdobla en dos tesis (práctica / ontológica), cada una sostenida
 * por su evidencia (cinco ejes / autopoiesis), con el puente honesto «no se
 * deduce» entre ambas y el aporte metodológico como base. Theme-aware (usa las
 * variables CSS del sitio); se rasteriza a PNG para los PDF.
 */
export default function ArgMap() {
  const box = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    height: "100%",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    boxSizing: "border-box" as const,
  };
  const kicker = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    marginBottom: 4,
    fontWeight: 700,
  };
  const body = { fontFamily: "var(--font-display)", fontSize: 15, lineHeight: 1.32, color: "var(--text-soft)" };
  const badge = {
    fontFamily: "var(--font-mono)",
    fontSize: 9.5,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
    fontWeight: 600,
  };
  const label = { fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--muted)", letterSpacing: "0.04em" } as const;

  return (
    <figure className="argmap">
      <svg viewBox="0 0 940 664" role="img" aria-label="Mapa conceptual del argumento" style={{ width: "100%", height: "auto" }}>
        <defs>
          <marker id="am-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--border-strong)" />
          </marker>
          <marker id="am-arrow-c" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--carbon)" />
          </marker>
        </defs>

        {/* conectores */}
        <g fill="none" stroke="var(--border-strong)" strokeWidth="1.6">
          {/* claim → dos tesis */}
          <path d="M470,92 C470,130 250,120 235,172" markerEnd="url(#am-arrow)" />
          <path d="M470,92 C470,130 690,120 705,172" markerEnd="url(#am-arrow)" />
          {/* evidencia → tesis (hacia arriba) */}
          <path d="M235,368 L235,294" markerEnd="url(#am-arrow)" />
          <path d="M705,368 L705,294" markerEnd="url(#am-arrow)" />
          {/* aporte → evidencia (base metodológica) */}
          <path d="M400,600 C300,590 235,560 235,516" markerEnd="url(#am-arrow)" />
          <path d="M540,600 C640,590 705,560 705,516" markerEnd="url(#am-arrow)" />
        </g>
        {/* «no se deduce»: puente punteado entre las dos tesis */}
        <path d="M405,232 L535,232" fill="none" stroke="var(--carbon)" strokeWidth="1.8" strokeDasharray="4 5" markerEnd="url(#am-arrow-c)" />

        {/* etiquetas de conectores */}
        <text x="470" y="223" textAnchor="middle" style={label} fill="var(--carbon)" fontWeight={700}>no se deduce</text>
        <text x="252" y="336" style={label}>lo mide el laboratorio</text>
        <text x="722" y="336" style={label}>lo funda</text>

        {/* CLAIM */}
        <foreignObject x="320" y="20" width="300" height="72">
          <div style={{ ...box, borderColor: "var(--carbon)", borderWidth: 2, textAlign: "center", background: "var(--carbon-soft)" }}>
            <div style={{ ...kicker, color: "var(--carbon)", marginBottom: 0 }}>Afirmación central</div>
            <div style={{ ...body, color: "var(--text)", fontWeight: 600, fontSize: 17 }}>El sustrato no es neutral</div>
          </div>
        </foreignObject>

        {/* TESIS PRÁCTICA */}
        <foreignObject x="70" y="172" width="330" height="122">
          <div style={{ ...box, borderLeft: "4px solid var(--si)" }}>
            <div style={{ ...kicker, color: "var(--si)" }}>Tesis práctica · <span style={badge}>demostrable</span></div>
            <div style={body}>Emular carbono vivo sobre silicio digital cuesta; el residuo de realización es <strong style={{ color: "var(--text)" }}>estructural</strong>, no un detalle de ingeniería.</div>
          </div>
        </foreignObject>

        {/* TESIS ONTOLÓGICA */}
        <foreignObject x="540" y="172" width="330" height="122">
          <div style={{ ...box, borderLeft: "4px solid var(--carbon)" }}>
            <div style={{ ...kicker, color: "var(--carbon)" }}>Tesis ontológica · <span style={badge}>conjetura</span></div>
            <div style={body}>La conciencia fenoménica requiere la <strong style={{ color: "var(--text)" }}>vulnerabilidad</strong> de un sistema que debe producirse para existir.</div>
          </div>
        </foreignObject>

        {/* 5 EJES */}
        <foreignObject x="70" y="368" width="330" height="148">
          <div style={box}>
            <div style={{ ...kicker, color: "var(--si)" }}>5 ejes de divergencia</div>
            <div style={{ ...body, fontSize: 13.5 }}>arquitectura · codificación · <strong style={{ color: "var(--text)" }}>variabilidad</strong> · <strong style={{ color: "var(--text)" }}>modo de intercambio</strong> · <strong style={{ color: "var(--text)" }}>ancho de banda</strong> — medidos, no intuidos.</div>
          </div>
        </foreignObject>

        {/* AUTOPOIESIS */}
        <foreignObject x="540" y="368" width="330" height="148">
          <div style={box}>
            <div style={{ ...kicker, color: "var(--carbon)" }}>Autopoiesis</div>
            <div style={{ ...body, fontSize: 13.5 }}>Precariedad homeostática: en el carbono, computar y mantenerse vivo son el mismo proceso. El silicio estático no tiene nada que perder.</div>
          </div>
        </foreignObject>

        {/* APORTE */}
        <foreignObject x="250" y="596" width="440" height="64">
          <div style={{ ...box, borderStyle: "dashed", padding: "8px 16px" }}>
            <div style={{ ...body, fontSize: 13.5, textAlign: "center" }}>
              <strong style={{ color: "var(--text)" }}>Aporte metodológico:</strong> laboratorio reproducible que hace <em>contable</em> la divergencia + κ (Exp 10), firma operacional de la autopoiesis.
            </div>
          </div>
        </foreignObject>
      </svg>
      <figcaption className="argmap__cap">
        Mapa del argumento. La ineficiencia (5 ejes) sostiene la tesis <em>práctica</em>; la autopoiesis funda la <em>ontológica</em>; y la segunda <strong>no se deduce</strong> de la primera.
      </figcaption>
    </figure>
  );
}
