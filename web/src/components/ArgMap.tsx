/**
 * ArgMap — mapa conceptual del argumento (mapa mental de apoyo, no un data-viz).
 * Muestra la estructura de DILEMA: el argumento del sustrato necesita que la
 * auto-producción individúe al sujeto; la autopoiesis estricta es objetiva pero
 * individúa células, y la autonomía sí individúa pero es organizacional (y por
 * tanto no excluye sustratos). Ninguna de las dos ramas le sirve al argumento.
 * Theme-aware (usa las variables CSS del sitio); se rasteriza a PNG para los PDF.
 *
 * DOS VARIANTES, porque son dos artefactos distintos:
 *
 *  - por defecto (940×716): el mapa de LECTURA de /tesis y /sintesis. Se lee a
 *    50 cm, en web y en PDF; cada caja lleva su párrafo y puede argumentar.
 *
 *  - `compact` (940×426): el mapa de PROYECCIÓN de la diapositiva 02. Misma
 *    estructura —problema → «necesita» → argumento del sustrato → bifurcación →
 *    las dos consecuencias → el dilema— pero con TEXTO TELEGRÁFICO: un titular
 *    por caja. El orador desarrolla; la diapositiva no se lee en voz alta.
 *
 * Por qué una variante y no un ajuste de escala: la diapositiva se escala para
 * caber ENTERA en el viewport, así que el factor lo fija la dimensión más
 * apretada. Con ratio 1,31 contra un viewport de 1,91 el mapa de lectura topa
 * en ALTURA y se queda en scale ~1,01 —etiquetas a ~10 px proyectados—. La
 * variante compacta es apaisada (ratio 2,21), de modo que el límite lo vuelve a
 * poner el ancho y la diapositiva puede crecer. La densidad de información, no
 * la escala, era el problema.
 */
export default function ArgMap({ compact = false }: { compact?: boolean }) {
  if (compact) return <ArgMapCompact />;
  return <ArgMapFull />;
}

/* ── Variante de proyección (diapositiva 02) ─────────────────────────────
   Canvas 940×426. Los tamaños de fuente están en unidades de viewBox y el
   svg se maqueta a 940 px de ancho, así que 1 unidad ≈ 1 px de maquetado:
   con la diapositiva a scale ~1,31 el mínimo (16) proyecta a ~21 px. Nada
   por debajo de 16. */
function ArgMapCompact() {
  const box = {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    height: "100%",
    // Métricas ajustadas: con 66 px de caja, el interior útil es 52. Un titular
    // (≈19) + una línea de cuerpo (25) + margen (2) = 46 y entra sin recorte.
    // `.argmap foreignObject > div` tiene overflow:hidden, así que pasarse no
    // desborda: CERCENA el texto en silencio. Si se toca algo de aquí, hay que
    // volver a comprobar que scrollHeight <= clientHeight en las siete cajas.
    padding: "6px 14px",
    borderRadius: 12,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    boxSizing: "border-box" as const,
  };
  const kicker = {
    fontFamily: "var(--font-mono)",
    fontSize: 16,
    // Explícito a propósito: la mono del sitio trae un line-height normal de
    // ~1,75em, así que un titular de 16 ocupaba 28 y se comía 10 px de cada
    // caja (las recortaba por arriba y por abajo). No quitar.
    lineHeight: 1.15,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    marginBottom: 2,
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
  };
  const body = {
    fontFamily: "var(--font-display)",
    fontSize: 20,
    lineHeight: 1.25,
    color: "var(--text-soft)",
  };
  const lead = { fontFamily: "var(--font-display)", fontSize: 19, lineHeight: 1.28, color: "var(--text)", fontWeight: 600 };
  const under = { fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.28, color: "var(--text-soft)" };
  const label = { fontFamily: "var(--font-mono)", fontSize: 16, fill: "var(--muted)", letterSpacing: "0.04em" } as const;

  return (
    <figure className="argmap argmap--compact">
      <svg
        viewBox="0 0 940 426"
        role="img"
        aria-label="Mapa del argumento: el argumento del sustrato necesita que la autopoiesis individúe al sujeto; en sentido estricto individúa células y en sentido amplio es organizacional, luego no puede decidir el problema del sustrato."
        style={{ width: "100%", height: "auto" }}
      >
        <defs>
          <marker id="amc-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--border-strong)" />
          </marker>
          <marker id="amc-arrow-d" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--carbon)" />
          </marker>
        </defs>

        {/* conectores */}
        <g fill="none" stroke="var(--border-strong)" strokeWidth="1.8">
          <path d="M470,66 L470,86" markerEnd="url(#amc-arrow)" />
          <path d="M330,152 C330,170 250,168 226,186" markerEnd="url(#amc-arrow)" />
          <path d="M610,152 C610,170 690,168 714,186" markerEnd="url(#amc-arrow)" />
          <path d="M226,252 L226,270" markerEnd="url(#amc-arrow)" />
          <path d="M714,252 L714,270" markerEnd="url(#amc-arrow)" />
        </g>
        <g fill="none" stroke="var(--carbon)" strokeWidth="2">
          <path d="M226,336 C226,352 380,346 410,360" markerEnd="url(#amc-arrow-d)" />
          <path d="M714,336 C714,352 560,346 530,360" markerEnd="url(#amc-arrow-d)" />
        </g>

        {/* etiquetas de arista */}
        <text x="486" y="81" style={label}>necesita</text>
        <text x="252" y="176" style={label}>o bien…</text>
        <text x="618" y="176" style={label}>…o bien</text>

        {/* El problema */}
        <foreignObject x="250" y="0" width="440" height="66">
          <div style={{ ...box, borderColor: "var(--border-strong)", alignItems: "center", textAlign: "center" }}>
            <div style={{ ...kicker, color: "var(--muted)", marginBottom: 2 }}>El problema</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, lineHeight: 1.15 }}>
              ¿Puede el silicio ser consciente?
            </div>
          </div>
        </foreignObject>

        {/* El argumento del sustrato */}
        <foreignObject x="170" y="86" width="600" height="66">
          <div style={{ ...box, borderColor: "var(--carbon)" }}>
            <div style={{ ...kicker, color: "var(--carbon)" }}>El argumento del sustrato</div>
            <div style={body}>
              Necesita que la auto-producción <strong>individúe al sujeto</strong>
            </div>
          </div>
        </foreignObject>

        {/* Rama izquierda */}
        <foreignObject x="0" y="186" width="452" height="66">
          <div style={box}>
            <div style={{ ...kicker, color: "var(--si)" }}>Autopoiesis estricta</div>
            <div style={body}>Objetiva — pero su unidad es la célula</div>
          </div>
        </foreignObject>

        {/* Rama derecha */}
        <foreignObject x="488" y="186" width="452" height="66">
          <div style={box}>
            <div style={{ ...kicker, color: "var(--si)" }}>Autonomía · clausura</div>
            <div style={body}>Sí individúa al organismo (Varela, 1979)</div>
          </div>
        </foreignObject>

        {/* Consecuencia izquierda */}
        <foreignObject x="0" y="270" width="452" height="66">
          <div style={{ ...box, borderStyle: "dashed" }}>
            <div style={lead}>No individúa al sujeto</div>
            <div style={under}>10¹³ células; ninguna soy yo</div>
          </div>
        </foreignObject>

        {/* Consecuencia derecha */}
        <foreignObject x="488" y="270" width="452" height="66">
          <div style={{ ...box, borderStyle: "dashed" }}>
            <div style={lead}>No excluye sustratos</div>
            <div style={under}>Organizacional: la define la forma de la red</div>
          </div>
        </foreignObject>

        {/* El dilema */}
        <foreignObject x="140" y="360" width="660" height="66">
          <div style={{ ...box, borderColor: "var(--carbon)", borderWidth: 2 }}>
            <div style={{ ...kicker, color: "var(--carbon)" }}>El dilema</div>
            <div style={body}>
              Ninguna rama sirve: <strong>no puede decidir el sustrato</strong>
            </div>
          </div>
        </foreignObject>
      </svg>
    </figure>
  );
}

/* ── Variante de lectura (/tesis, /sintesis, PDF) ────────────────────────
   No tocar sin volver a medir esas dos páginas: aquí el lector está a 50 cm
   y cada caja puede permitirse su párrafo. */
function ArgMapFull() {
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
