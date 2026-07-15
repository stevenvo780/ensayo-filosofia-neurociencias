/**
 * ArgMap — mapa conceptual del argumento (mapa mental de apoyo, no un data-viz).
 * Muestra la estructura de DILEMA: el argumento del sustrato necesita que la
 * auto-producción individúe al sujeto; la autopoiesis estricta es objetiva pero
 * individúa células, y la autonomía sí individúa pero es organizacional (y por
 * tanto no excluye sustratos). Ninguna de las dos ramas le sirve al argumento.
 * Theme-aware (usa las variables CSS del sitio); se rasteriza a PNG para los PDF.
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
  const small = { fontFamily: "var(--font-display)", fontSize: 13.5, lineHeight: 1.3, color: "var(--text-soft)" };
  const label = { fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--muted)", letterSpacing: "0.04em" } as const;

  return (
    <figure className="argmap">
      <svg
        viewBox="0 0 940 716"
        role="img"
        aria-label="Mapa del argumento: el argumento del sustrato necesita que la autopoiesis individúe al sujeto; en sentido estricto individúa células y en sentido amplio es organizacional, luego no puede decidir el problema del sustrato."
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <marker id="am-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--border-strong)" />
          </marker>
          <marker id="am-arrow-d" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--carbon)" />
          </marker>
        </defs>

        {/* conectores */}
        <g fill="none" stroke="var(--border-strong)" strokeWidth="1.6">
          <path d="M470,84 L470,116" markerEnd="url(#am-arrow)" />
          <path d="M380,216 C380,240 250,240 240,260" markerEnd="url(#am-arrow)" />
          <path d="M560,216 C560,240 690,240 700,260" markerEnd="url(#am-arrow)" />
          <path d="M240,414 L240,434" markerEnd="url(#am-arrow)" />
          <path d="M700,414 L700,434" markerEnd="url(#am-arrow)" />
        </g>
        <g fill="none" stroke="var(--carbon)" strokeWidth="1.8">
          <path d="M240,514 C240,536 400,528 420,544" markerEnd="url(#am-arrow-d)" />
          <path d="M700,514 C700,536 540,528 520,544" markerEnd="url(#am-arrow-d)" />
        </g>

        {/* etiquetas de arista */}
        <text x="484" y="106" style={label}>necesita</text>
        <text x="286" y="250" style={label}>o bien…</text>
        <text x="600" y="250" style={label}>…o bien</text>

        {/* La pregunta */}
        <foreignObject x="270" y="16" width="400" height="68">
          <div style={{ ...box, borderColor: "var(--border-strong)", alignItems: "center", textAlign: "center" }}>
            <div style={{ ...kicker, color: "var(--muted)", marginBottom: 2 }}>El problema</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600 }}>
              ¿Puede el silicio ser consciente?
            </div>
          </div>
        </foreignObject>

        {/* El argumento del sustrato */}
        <foreignObject x="210" y="116" width="520" height="100">
          <div style={{ ...box, borderColor: "var(--carbon)" }}>
            <div style={{ ...kicker, color: "var(--carbon)" }}>El argumento del sustrato</div>
            <div style={body}>
              «El silicio no se autoproduce, luego no siente». Para funcionar necesita que la
              auto-producción <strong>individúe al sujeto</strong> de la experiencia.
            </div>
          </div>
        </foreignObject>

        {/* Rama izquierda: autopoiesis estricta */}
        <foreignObject x="40" y="260" width="400" height="154">
          <div style={box}>
            <div style={{ ...kicker, color: "var(--si)" }}>Autopoiesis estricta</div>
            <div style={small}>
              Varela, Maturana y Uribe (1974). <strong>Objetiva</strong>: hay un hecho sobre si una red
              metabólica produce la membrana que la encierra. No es vaga.
              <br />
              Pero su unidad canónica es <strong>la célula</strong>.
            </div>
          </div>
        </foreignObject>

        {/* Rama derecha: autonomía */}
        <foreignObject x="500" y="260" width="400" height="154">
          <div style={box}>
            <div style={{ ...kicker, color: "var(--si)" }}>Autonomía · clausura operacional</div>
            <div style={small}>
              Varela (1979) generaliza la autopoiesis porque la estricta no llega al organismo ni al
              sistema nervioso. <strong>Sí individúa</strong> al organismo.
            </div>
          </div>
        </foreignObject>

        {/* Consecuencia izquierda */}
        <foreignObject x="40" y="434" width="400" height="80">
          <div style={{ ...box, borderStyle: "dashed" }}>
            <div style={small}>
              10¹³ unidades en un cuerpo y <strong>ninguna es el sujeto</strong>; el cerebro no es
              autopoiético; el hígado lo es tanto como él. <strong>No individúa al sujeto.</strong>
            </div>
          </div>
        </foreignObject>

        {/* Consecuencia derecha */}
        <foreignObject x="500" y="434" width="400" height="80">
          <div style={{ ...box, borderStyle: "dashed" }}>
            <div style={small}>
              Pero la clausura operacional es una propiedad <strong>organizacional</strong>: definida por
              la forma de la red. <strong>No excluye sustratos.</strong>
            </div>
          </div>
        </foreignObject>

        {/* Conclusión */}
        <foreignObject x="170" y="544" width="600" height="92">
          <div style={{ ...box, borderColor: "var(--carbon)", borderWidth: 2 }}>
            <div style={{ ...kicker, color: "var(--carbon)" }}>El dilema · conclusión</div>
            <div style={body}>
              Ninguna rama le sirve al argumento. La autopoiesis <strong>no puede decidir</strong> el
              problema del sustrato. <em>No se sigue que el silicio sienta</em>: se sigue que éste no es
              el instrumento que puede decidirlo.
            </div>
          </div>
        </foreignObject>

        {/* κ */}
        <foreignObject x="170" y="654" width="600" height="56">
          <div style={{ ...box, background: "transparent", borderStyle: "dashed" }}>
            <div style={{ ...small, fontSize: 12.5 }}>
              <strong>Comprobación construida:</strong> κ pasa de <strong>0,00</strong> a{" "}
              <strong>0,70</strong> en la misma máquina, moviendo sólo la frontera. Mide un corte, no un
              sustrato.
            </div>
          </div>
        </foreignObject>
      </svg>
      <figcaption className="argmap__cap">
        <strong>Mapa del argumento.</strong> El argumento del sustrato necesita que la auto-producción
        individúe al sujeto. En sentido estricto la autopoiesis es objetiva pero individúa células; en el
        sentido amplio al que la tradición migró, individúa organismos pero se ha vuelto organizacional —y
        las propiedades de la organización no excluyen sustratos.
      </figcaption>
    </figure>
  );
}
