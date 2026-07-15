/**
 * UnidadEquivocada — diagrama conceptual (no es un data-viz: no mide nada).
 *
 * Muestra el cargo central de la Parte II: recorriendo las escalas anidadas del
 * cuerpo, la columna «es autopoiética» y la columna «es el sujeto» se marcan
 * exactamente una vez cada una — y NUNCA en la misma fila. Esa conjunción es el
 * argumento, y es una propiedad de la tabla completa: la prosa lineal sólo puede
 * afirmarla (§II.2 la aritmética, §II.3 el cerebro, §II.4 el hígado); la tabla la
 * exhibe de un vistazo. El cargo no es de vaguedad —la autopoiesis es objetiva—:
 * es de EXTENSIÓN.
 *
 * Convención de color (heredada de ArgMap, no de los explicadores viejos): --si y
 * --carbon NO codifican sustratos aquí, codifican ROL ARGUMENTAL. --si marca el
 * criterio que la teoría ofrece (autopoiesis); --carbon marca el explanandum que
 * el argumento necesita (el sujeto). Las filas de hígado y cerebro se renderizan
 * desde el MISMO dato y comparten color: que sean idénticas es la tesis; que lo
 * sean por construcción es la honestidad.
 *
 * Estático y sin JS: se lee entero en el PDF y a 360 px. Theme-aware por variables.
 * Estilos en globals.css (.ue-*), porque la reserva de las dos columnas que
 * argumentan en pantallas estrechas necesita una media query.
 */

type Mark = "si" | "no" | "parcial";

interface Escala {
  nombre: string;
  n: string;
  componentes: Mark;
  frontera: Mark;
  autopoietica: Mark;
  sujeto: Mark;
  nota: string;
  marcada?: boolean;
}

// El veredicto del órgano se define UNA vez y se instancia dos veces: hígado y
// cerebro difieren en el nombre y en por qué, jamás en una marca. §II.4.
const ORGANO = {
  n: "1",
  componentes: "no" as Mark,
  frontera: "no" as Mark,
  autopoietica: "no" as Mark,
  sujeto: "no" as Mark,
};

const ESCALAS: Escala[] = [
  {
    nombre: "Macromolécula",
    n: "~10¹⁷",
    componentes: "no",
    frontera: "no",
    autopoietica: "no",
    sujeto: "no",
    nota: "Es un componente; no produce ninguno.",
  },
  {
    nombre: "Orgánulo",
    n: "~10¹⁵",
    componentes: "no",
    frontera: "parcial",
    autopoietica: "no",
    sujeto: "no",
    nota: "Tiene membrana, pero no la produce: la produce la célula.",
  },
  {
    nombre: "Célula",
    n: "~10¹³",
    componentes: "si",
    frontera: "si",
    autopoietica: "si",
    sujeto: "no",
    nota: "El caso canónico (Varela, Maturana y Uribe, 1974): la red metabólica produce la membrana que la encierra. Diez billones en este cuerpo, y ninguna soy yo.",
    marcada: true,
  },
  {
    nombre: "Tejido",
    n: "~10⁴",
    componentes: "no",
    frontera: "no",
    autopoietica: "no",
    sujeto: "no",
    nota: "Agregado de células. La clausura la tiene cada célula, por separado.",
  },
  {
    ...ORGANO,
    nombre: "Hígado",
    nota: "Metabólicamente más activo que el cerebro: si midiéramos auto-producción por unidad de masa, ganaría el hígado.",
  },
  {
    ...ORGANO,
    nombre: "Cerebro",
    nota: "No sintetiza sus componentes: los sintetizan sus células, cada una por su cuenta — como un bosque no fotosintetiza. Autopoiético en la misma medida que el hígado: en ninguna.",
  },
  {
    nombre: "Organismo",
    n: "1",
    componentes: "no",
    frontera: "no",
    autopoietica: "no",
    sujeto: "si",
    nota: "Autopoiético sólo «de segundo orden»: una asociación de células autopoiéticas, no una unidad autopoiética. Y aquí está quien lee esto.",
    marcada: true,
  },
];

const GLYPH: Record<Mark, string> = { si: "✓", no: "·", parcial: "~" };

export default function UnidadEquivocada() {
  return (
    <figure
      className="argmap"
      style={{ background: "transparent", borderStyle: "dashed", borderColor: "var(--border-strong)" }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          fontWeight: 700,
          marginBottom: 14,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span>La unidad equivocada</span>
        <span>○ diagrama conceptual · no mide nada</span>
      </div>

      <table className="ue-table">
        <caption
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            overflow: "hidden",
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Escalas anidadas del cuerpo humano. Para cada escala se indica si es autopoiética y si es el
          sujeto de la experiencia. La única escala autopoiética es la célula, que no es el sujeto; la
          única escala que es el sujeto es el organismo, que no es autopoiético. Las dos columnas nunca
          coinciden en la misma fila.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="ue-th ue-th--escala">
              Escala
            </th>
            <th scope="col" className="ue-th ue-th--n">
              n
            </th>
            <th scope="col" className="ue-th ue-th--diag ue-diag">
              ¿produce sus componentes?
            </th>
            <th scope="col" className="ue-th ue-th--diag ue-diag">
              ¿produce su frontera?
            </th>
            <th scope="col" className="ue-th ue-th--si">
              ¿autopoiética?
            </th>
            <th scope="col" className="ue-th ue-th--carbon">
              ¿es el sujeto?
            </th>
          </tr>
        </thead>
        <tbody>
          {ESCALAS.map((e) => (
            <tr key={e.nombre}>
              <th
                scope="row"
                className={`ue-row-name${e.marcada ? " ue-row-name--marcada" : ""}`}
              >
                {e.nombre}
                <span className="ue-nota">{e.nota}</span>
              </th>
              <td className="ue-cell">{e.n}</td>
              <td className="ue-cell ue-diag">{GLYPH[e.componentes]}</td>
              <td className="ue-cell ue-diag">{GLYPH[e.frontera]}</td>
              <td className={`ue-cell${e.autopoietica === "si" ? " ue-cell--si" : ""}`}>
                {e.autopoietica === "si" ? "● SÍ" : GLYPH[e.autopoietica]}
              </td>
              <td className={`ue-cell${e.sujeto === "si" ? " ue-cell--carbon" : ""}`}>
                {e.sujeto === "si" ? "● SÍ" : GLYPH[e.sujeto]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ue-remate">
        Las dos columnas <strong>● se marcan una vez cada una, y nunca en la misma fila.</strong> El
        criterio y el explanandum no se tocan en ningún punto de la escala.
      </div>

      <figcaption className="argmap__cap">
        <strong>La unidad equivocada.</strong> Dos preguntas independientes en cada escala del cuerpo.
        La <span style={{ fontStyle: "normal", color: "var(--si)" }}>columna del criterio</span> es
        objetiva —hay un hecho sobre si una red produce la membrana que la encierra— y se marca en la
        célula. La <span style={{ fontStyle: "normal", color: "var(--carbon)" }}>columna del sujeto</span>{" "}
        <em>no es un resultado ni una medición</em>: es dónde todos —Thompson, Di Paolo, Seth, el autor,
        el lector— coinciden pre-teóricamente en poner al sujeto, y se marca en el organismo. El
        argumento del sustrato necesita que sean la misma fila. No lo son en ninguna. Por eso el cargo
        no es de vaguedad, sino de <strong>extensión</strong>: la auto-producción individúa, sí — pero
        individúa células.
      </figcaption>
    </figure>
  );
}
