/**
 * Registro de referencialidad viva del ENSAYO de neurociencias.
 *
 * Mapa `token → { id, label, kind, tooltip, href }` que enriquece el render web
 * del ensayo (nunca el markdown/JSX fuente). El enriquecedor de `lib/enrich.tsx`
 * reemplaza el primer token coincidente de cada bloque por un `<RefTooltip>`:
 * subrayado punteado ámbar → popover con explicación llana + enlace a la sección
 * (o al explicador interactivo) donde el concepto se desarrolla.
 *
 * Portado del patrón de autopoesis.stevenvallejo.com (RefTooltip), adaptado a
 * Next App Router + los términos propios de «¿Silicio o Tejido?».
 */

export type RefKind = "concepto" | "experimento" | "seccion";

export interface RefEntry {
  /** id estable de la entrada. */
  id: string;
  /** título humano de la tarjeta del popover. */
  label: string;
  kind: RefKind;
  /** explicación en lenguaje llano (1–3 frases). */
  tooltip: string;
  /** destino del enlace «ver» (ancla de sección del ensayo o /tesis). */
  href: string;
  /** variantes de texto que disparan la marca (se comparan en minúsculas). */
  tokens: string[];
}

export const REFS: RefEntry[] = [
  // ── Conceptos filosóficos ────────────────────────────────────────────────
  {
    id: "realizabilidad-multiple",
    label: "Realizabilidad múltiple",
    kind: "concepto",
    tooltip:
      "Tesis funcionalista (Putnam, Fodor): como los estados mentales se definen por su rol funcional y no por su composición, podrían realizarse en cualquier sustrato —carbono, silicio o cualquier medio— que sostenga las mismas transiciones. Es el blanco del ensayo.",
    href: "#intro",
    tokens: ["realizabilidad múltiple"],
  },
  {
    id: "funcionalismo",
    label: "Funcionalismo",
    kind: "concepto",
    tooltip:
      "Postura según la cual lo mental es cuestión de organización funcional (qué hace un estado, no de qué está hecho). Si es correcto, el sustrato sería ontológicamente irrelevante.",
    href: "#s4",
    tokens: ["funcionalismo", "funcionalista"],
  },
  {
    id: "autopoiesis",
    label: "Autopoiesis",
    kind: "concepto",
    tooltip:
      "Definición de lo vivo (Maturana y Varela, 1974): un sistema que produce y regenera continuamente los componentes y la frontera que lo constituyen. Es el puente —conjetural— hacia la tesis ontológica: procesar información sería inseparable de mantenerse existiendo.",
    href: "#s4",
    tokens: ["autopoiesis", "autopoiético", "autopoiética", "auto-producción"],
  },
  {
    id: "qualia",
    label: "Qualia",
    kind: "concepto",
    tooltip:
      "El carácter cualitativo y subjetivo de la experiencia consciente: el «cómo se siente» ver rojo o sentir dolor. El ensayo conjetura que su origen podría requerir la vulnerabilidad de un sistema vivo.",
    href: "#s4",
    tokens: ["qualia", "fenoménico", "carácter fenoménico"],
  },
  {
    id: "chalmers",
    label: "Chalmers — qualia danzantes",
    kind: "concepto",
    tooltip:
      "Argumento de Chalmers (1995): si sustituyéramos las neuronas por chips funcionalmente idénticos, los qualia no deberían «danzar» ni desvanecerse sin que el sujeto lo notara; luego la experiencia la fijaría la organización, no el material. Es la objeción más fuerte contra la tesis.",
    href: "#s4",
    tokens: ["Chalmers"],
  },
  {
    id: "enactivismo",
    label: "Enactivismo",
    kind: "concepto",
    tooltip:
      "Tradición (Varela, Thompson) según la cual el sentido —que algo importe a un sistema— emerge de la precariedad de un ser vivo que debe producirse activamente para no disolverse.",
    href: "#s4",
    tokens: ["enactivista", "enactivismo"],
  },
  {
    id: "falacia-mereologica",
    label: "Falacia mereológica",
    kind: "concepto",
    tooltip:
      "Error (Bennett y Hacker) de atribuir a una parte —un chip, o el cerebro aislado— facultades que corresponden al organismo entero corporizado en su mundo.",
    href: "#conclusion",
    tokens: ["falacia mereológica"],
  },

  // ── Arquitectura y cómputo ───────────────────────────────────────────────
  {
    id: "von-neumann",
    label: "Cuello de botella de Von Neumann",
    kind: "concepto",
    tooltip:
      "La arquitectura de Von Neumann (1945) separa físicamente el procesador de la memoria; el tráfico constante de datos entre ambos por un bus limitado es el cuello de botella. El cerebro, en cambio, procesa y almacena en el mismo lugar: la sinapsis.",
    href: "#s1",
    tokens: ["cuello de botella de Von Neumann", "Von Neumann", "arquitectura de Von Neumann"],
  },
  {
    id: "stdp",
    label: "STDP — plasticidad local",
    kind: "experimento",
    tooltip:
      "Spike-Timing-Dependent Plasticity: regla de aprendizaje local que ajusta la sinapsis según la diferencia temporal entre disparos pre y postsinápticos. Solo guarda el último spike de cada neurona (39 KB), frente a los 20.000 KB de la retropropagación (Exp 5).",
    href: "#s1",
    tokens: ["STDP"],
  },
  {
    id: "retropropagacion",
    label: "Retropropagación (backprop)",
    kind: "concepto",
    tooltip:
      "Algoritmo de aprendizaje global de las redes de silicio: para la pasada hacia atrás debe almacenar activaciones y gradientes en un búfer global, con un coste de memoria enorme frente a la regla local biológica.",
    href: "#s1",
    tokens: ["retropropagación", "backpropagation", "backprop"],
  },
  {
    id: "neuromorfico",
    label: "Silicio neuromórfico",
    kind: "concepto",
    tooltip:
      "Hardware analógico (Loihi, memristores) que imita la dinámica física continua del cerebro. El ensayo distingue este paradigma del silicio digital clásico de Von Neumann —que es su verdadero blanco—.",
    href: "#intro",
    tokens: ["neuromórfico", "neuromórficos", "neuromórfica", "Loihi", "memristores"],
  },

  // ── Percepción y codificación ────────────────────────────────────────────
  {
    id: "codificacion-esparcida",
    label: "Codificación esparcida",
    kind: "experimento",
    tooltip:
      "Estrategia neuronal donde solo una fracción minúscula (~1 %) de neuronas dispara, rodeada de silencio eléctrico. Ese silencio (inhibición competitiva) evita la interferencia de memoria y minimiza el gasto termodinámico (Exp 1–2).",
    href: "#s2",
    tokens: ["codificación esparcida", "esparcida", "esparsidad"],
  },
  {
    id: "celulas-concepto",
    label: "Células de concepto",
    kind: "concepto",
    tooltip:
      "Neuronas del lóbulo temporal medial de selectividad extrema (Quian Quiroga, Fried y Koch): responden a «Jennifer Aniston» con una fracción minúscula de disparos. No son neuronas-abuela únicas: el código es esparcido pero distribuido.",
    href: "#s2",
    tokens: ["células de concepto", "concept cells", "neurona de la abuela"],
  },
  {
    id: "crosstalk",
    label: "Crosstalk (interferencia)",
    kind: "concepto",
    tooltip:
      "Solapamiento entre representaciones almacenadas en la misma red. En la red densa el solapamiento medio fue del 80,0 %; con esparsidad al 1 % cayó al 1,03 % (Exp 2).",
    href: "#s2",
    tokens: ["crosstalk", "interferencia de memoria"],
  },

  // ── Termodinámica ────────────────────────────────────────────────────────
  {
    id: "landauer",
    label: "Principio de Landauer",
    kind: "concepto",
    tooltip:
      "Límite físico universal (1961): toda conmutación lógica irreversible disipa al menos kT·ln2 (~2,8·10⁻²¹ J/bit a 300 K). Es común a silicio y carbono —ninguno se le acerca—, así que no favorece a ninguno: la brecha real es arquitectónica, no fundamental.",
    href: "#s3",
    tokens: ["principio de Landauer", "Landauer"],
  },

  // ── Cuerpo y variabilidad ────────────────────────────────────────────────
  {
    id: "computo-morfologico",
    label: "Cómputo morfológico",
    kind: "experimento",
    tooltip:
      "Delegar parte del cómputo a la física del cuerpo. El grillo robot de Webb (1996) resuelve la localización del sonido con la morfología de su «tráquea» (2 FLOPs) en vez de correlación cruzada y Fourier (757.760 FLOPs) (Exp 6).",
    href: "#s5",
    tokens: ["cómputo morfológico", "computación morfológica"],
  },
  {
    id: "transmision-volumen",
    label: "Transmisión de volumen",
    kind: "concepto",
    tooltip:
      "Difusión de neurotransmisores y neuromoduladores en el medio extracelular, en paralelo y en el mismo volumen (Agnati y Fuxe), frente a la transmisión punto a punto por «cableado» sináptico. Es intercambio químico pasivo.",
    href: "#s6",
    tokens: ["transmisión de volumen", "gases retrógrados", "neuromoduladores"],
  },
];

/** token (en minúsculas) → entrada. */
export const REF_BY_TOKEN: Map<string, RefEntry> = (() => {
  const m = new Map<string, RefEntry>();
  for (const e of REFS) for (const t of e.tokens) m.set(t.toLowerCase(), e);
  return m;
})();

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Regex global que casa cualquier token del registro. Los tokens se ordenan por
 * longitud descendente para que las variantes multi-palabra ganen a las cortas
 * («cuello de botella de Von Neumann» antes que «Von Neumann»). Bordes de palabra
 * con `\p{L}` para respetar acentos/unicode y no cortar dentro de otra palabra.
 */
export function createRefMatcher(): RegExp {
  const toks = Array.from(new Set(REFS.flatMap((e) => e.tokens))).sort(
    (a, b) => b.length - a.length,
  );
  const pattern = toks.map(escapeRe).join("|");
  return new RegExp(`(?<!\\p{L})(?:${pattern})(?!\\p{L})`, "giu");
}
