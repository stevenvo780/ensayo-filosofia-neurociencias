/**
 * Registro de referencialidad viva del ENSAYO y la TESIS de neurociencias.
 *
 * Mapa `token → { id, label, kind, tooltip, href }` que enriquece el render web
 * (nunca el markdown/JSX fuente). El enriquecedor de `lib/enrich.tsx` reemplaza
 * el primer token coincidente de cada bloque por un `<RefTooltip>`: subrayado
 * punteado ámbar → popover con explicación llana + enlace a la sección del ensayo.
 *
 * Portado del patrón de autopoesis.stevenvallejo.com (RefTooltip), adaptado a
 * Next App Router y a los conceptos propios de «¿Silicio o Tejido?». Los `href`
 * son absolutos (`/#s4`) para funcionar tanto en `/` (ensayo) como en `/tesis`.
 */

export type RefKind = "concepto" | "experimento" | "seccion";

export interface RefEntry {
  id: string;
  label: string;
  kind: RefKind;
  /** explicación en lenguaje llano (1–3 frases). */
  tooltip: string;
  /** destino del enlace «ver» (sección del ensayo, absoluta). */
  href: string;
  /** variantes de texto que disparan la marca (se comparan en minúsculas). */
  tokens: string[];
}

export const REFS: RefEntry[] = [
  // ── Marco: funcionalismo y sustrato ──────────────────────────────────────
  {
    id: "realizabilidad-multiple",
    label: "Realizabilidad múltiple",
    kind: "concepto",
    tooltip:
      "Tesis funcionalista (Putnam, Fodor): como los estados mentales se definen por su rol funcional y no por su composición, podrían realizarse en cualquier sustrato —carbono, silicio o cualquier medio— que sostenga las mismas transiciones. Es el blanco del ensayo.",
    href: "/#intro",
    tokens: ["realizabilidad múltiple"],
  },
  {
    id: "funcionalismo",
    label: "Funcionalismo",
    kind: "concepto",
    tooltip:
      "Postura según la cual lo mental es cuestión de organización funcional (qué hace un estado, no de qué está hecho). Formulada por Putnam (1967) y Fodor (1974); si es correcta, el sustrato sería ontológicamente irrelevante.",
    href: "/#s4",
    tokens: ["funcionalismo", "funcionalista", "Putnam", "Fodor"],
  },
  {
    id: "turing",
    label: "Equivalencia de Turing",
    kind: "concepto",
    tooltip:
      "Turing (1936) probó que toda función computable puede resolverse en una máquina universal: la base formal de que el «software» mental sería independiente del hardware. Pero equivalencia formal no es equivalencia física —computar cuesta energía, espacio y tiempo—.",
    href: "/#s1",
    tokens: ["equivalencia de Turing", "máquina universal", "Turing"],
  },
  {
    id: "neuromorfico",
    label: "Silicio neuromórfico",
    kind: "concepto",
    tooltip:
      "Hardware analógico (Loihi, memristores) que imita la dinámica física continua del cerebro. El ensayo distingue este paradigma del silicio digital clásico de Von Neumann —que es su verdadero blanco—.",
    href: "/#intro",
    tokens: ["neuromórfico", "neuromórficos", "neuromórfica", "Loihi", "memristores"],
  },

  // ── Arquitectura y aprendizaje ───────────────────────────────────────────
  {
    id: "von-neumann",
    label: "Cuello de botella de Von Neumann",
    kind: "concepto",
    tooltip:
      "La arquitectura de Von Neumann (1945) separa físicamente el procesador de la memoria; el tráfico constante de datos entre ambos por un bus limitado es el cuello de botella. El cerebro, en cambio, procesa y almacena en el mismo lugar: la sinapsis.",
    href: "/#s1",
    tokens: ["cuello de botella de Von Neumann", "Von Neumann", "arquitectura de Von Neumann"],
  },
  {
    id: "stdp",
    label: "STDP — plasticidad local",
    kind: "experimento",
    tooltip:
      "Spike-Timing-Dependent Plasticity: regla de aprendizaje local que ajusta la sinapsis según la diferencia temporal entre disparos pre y postsinápticos. Solo guarda el último spike de cada neurona (39 KB), frente a los 20.000 KB de la retropropagación (Exp 5).",
    href: "/#s1",
    tokens: ["STDP", "plasticidad local"],
  },
  {
    id: "retropropagacion",
    label: "Retropropagación (backprop)",
    kind: "concepto",
    tooltip:
      "Algoritmo de aprendizaje global de las redes de silicio: para la pasada hacia atrás debe almacenar activaciones y gradientes en un búfer global, con un coste de memoria enorme frente a la regla local biológica.",
    href: "/#s1",
    tokens: ["retropropagación", "backpropagation", "backprop"],
  },

  // ── Percepción y codificación ────────────────────────────────────────────
  {
    id: "codificacion-esparcida",
    label: "Codificación esparcida",
    kind: "experimento",
    tooltip:
      "Estrategia neuronal donde solo una fracción minúscula (~1 %) de neuronas dispara, rodeada de silencio eléctrico. Ese silencio evita la interferencia de memoria y minimiza el gasto termodinámico (Exp 1–2).",
    href: "/#s2",
    tokens: ["codificación esparcida", "esparcida", "esparsidad"],
  },
  {
    id: "celulas-concepto",
    label: "Células de concepto",
    kind: "concepto",
    tooltip:
      "Neuronas del lóbulo temporal medial de selectividad extrema (Quian Quiroga, Fried y Koch): responden a «Jennifer Aniston» con una fracción minúscula de disparos. No son neuronas-abuela únicas: el código es esparcido pero distribuido.",
    href: "/#s2",
    tokens: ["células de concepto", "concept cells", "neurona de la abuela", "Quian Quiroga", "Jennifer Aniston"],
  },
  {
    id: "wta",
    label: "Winner-take-all",
    kind: "concepto",
    tooltip:
      "Inhibición competitiva: las neuronas más activas silencian a las demás, dejando disparar solo a unas pocas. Es el mecanismo que produce la codificación esparcida y evita el solapamiento (crosstalk).",
    href: "/#s2",
    tokens: ["winner-take-all", "WTA", "inhibición competitiva"],
  },
  {
    id: "crosstalk",
    label: "Crosstalk (interferencia)",
    kind: "concepto",
    tooltip:
      "Solapamiento entre representaciones almacenadas en la misma red. En la red densa el solapamiento medio fue del 80,0 %; con esparsidad al 1 % cayó al 1,03 % (Exp 2).",
    href: "/#s2",
    tokens: ["crosstalk", "interferencia de memoria"],
  },
  {
    id: "jerarquia-visual",
    label: "Jerarquía visual (Zeki)",
    kind: "concepto",
    tooltip:
      "Zeki (1992) describió el procesamiento visual como una jerarquía con campos receptivos locales retinotópicos. Estructurarlos así, en vez de conexiones densas, recorta ~90 % de los FLOPs (Exp 1).",
    href: "/#s2",
    tokens: ["jerarquía visual", "campos receptivos", "retinotópicos", "Zeki"],
  },

  // ── Termodinámica y energía ──────────────────────────────────────────────
  {
    id: "landauer",
    label: "Principio de Landauer",
    kind: "concepto",
    tooltip:
      "Límite físico universal (1961): toda conmutación lógica irreversible disipa al menos kT·ln2 (~2,8·10⁻²¹ J/bit a 300 K). Es común a silicio y carbono —ninguno se le acerca—, así que no favorece a ninguno: la brecha real es arquitectónica, no fundamental.",
    href: "/#s3",
    tokens: ["principio de Landauer", "Landauer", "kT·ln2"],
  },
  {
    id: "muro-memoria",
    label: "Muro de la memoria",
    kind: "concepto",
    tooltip:
      "En la arquitectura von Neumann, mover un dato desde la memoria cuesta ~650× computarlo (Horowitz 2014): ~99,8 % de la energía es tráfico, no cómputo. Es un límite de la arquitectura de memoria separada, no del silicio como materia (Exp 9).",
    href: "/#s3",
    tokens: ["muro de la memoria", "muro de memoria", "memory wall", "Horowitz"],
  },
  {
    id: "atpasa",
    label: "Bomba Na⁺/K⁺ (ATPasa)",
    kind: "concepto",
    tooltip:
      "Proteína que restaura los gradientes iónicos gastando ATP. El flujo de iones que señala es pasivo (a favor del gradiente); el costo metabólico es restaurar el gradiente después —amortizado y batcheable, no pagado en cada evento de señalización—.",
    href: "/#s3",
    tokens: ["ATPasa", "bomba Na⁺/K⁺", "bomba de sodio"],
  },
  {
    id: "potencial-accion",
    label: "Potencial de acción",
    kind: "concepto",
    tooltip:
      "El impulso eléctrico con que la neurona señala (spike). Cuesta ~3,29×10⁹ moléculas de ATP (~211 pJ; Attwell y Laughlin, 2001), pero repartido entre miles de eventos sinápticos y con transporte iónico pasivo.",
    href: "/#s3",
    tokens: ["potencial de acción", "spike"],
  },
  {
    id: "presupuesto-energetico",
    label: "Presupuesto energético (Attwell-Laughlin)",
    kind: "concepto",
    tooltip:
      "Attwell y Laughlin (2001) contabilizaron el costo energético de la señalización en la materia gris. Es la base empírica para comparar el gasto por evento del carbono con el del silicio, sin confundir señalización con metabolismo basal.",
    href: "/#s3",
    tokens: ["Attwell", "presupuesto energético", "Laughlin"],
  },

  // ── Variabilidad, intercambio, I/O ───────────────────────────────────────
  {
    id: "variabilidad-sinaptica",
    label: "Variabilidad sináptica (Bartol)",
    kind: "experimento",
    tooltip:
      "Bartol et al. (2015) midieron ~26 estados sinápticos distinguibles (≈4,7 bits de precisión) por reconstrucción nanoconectómica. El punto no es «más bits» que un float, sino que el carbono sostiene ese estado graduado como propiedad física pasiva, sin recomputarlo (Exp 7).",
    href: "/#s6",
    tokens: ["variabilidad sináptica", "Bartol", "4,7 bits", "26 estados sinápticos"],
  },
  {
    id: "transmision-volumen",
    label: "Transmisión de volumen",
    kind: "concepto",
    tooltip:
      "Difusión de neurotransmisores y neuromoduladores en el medio extracelular, en paralelo y en el mismo volumen (Agnati y Fuxe), frente a la transmisión punto a punto por «cableado» sináptico. Es intercambio químico pasivo.",
    href: "/#s6",
    tokens: ["transmisión de volumen", "gases retrógrados", "neuromoduladores", "Agnati"],
  },
  {
    id: "fan-out",
    label: "Fan-out",
    kind: "concepto",
    tooltip:
      "Número de conexiones que una unidad emite. Una neurona piramidal recibe/emite ~7.000 sinapsis; una compuerta lógica CMOS tiene un fan-out de ~6 antes de necesitar amplificación. Ratio ~1.167× por unidad (Exp 8).",
    href: "/#s6",
    tokens: ["fan-out"],
  },
  {
    id: "oscilaciones",
    label: "Oscilaciones beta-gamma",
    kind: "experimento",
    tooltip:
      "Ritmos sincronizados (13–80 Hz) que emergen de la interacción excitación-inhibición con retardos axonales, sin reloj externo. Bechtel (2008) los vincula a la integración perceptiva; surgen del propio tejido (Exp 4).",
    href: "/#s4",
    tokens: ["beta-gamma", "beta–gamma", "oscilaciones", "sincronía", "Bechtel"],
  },

  // ── Ontología: conciencia, vida, teorías rivales ─────────────────────────
  {
    id: "autopoiesis",
    label: "Autopoiesis",
    kind: "concepto",
    tooltip:
      "Definición de lo vivo (Maturana y Varela, 1974): un sistema que produce y regenera continuamente los componentes y la frontera que lo constituyen. Es el puente —conjetural— hacia la tesis ontológica: procesar información sería inseparable de mantenerse existiendo.",
    href: "/#s4",
    tokens: ["autopoiesis", "autopoiético", "autopoiética", "auto-producción", "Maturana", "Varela"],
  },
  {
    id: "qualia",
    label: "Qualia",
    kind: "concepto",
    tooltip:
      "El carácter cualitativo y subjetivo de la experiencia consciente: el «cómo se siente» ver rojo o sentir dolor. El ensayo conjetura que su origen podría requerir la vulnerabilidad de un sistema vivo.",
    href: "/#s4",
    tokens: ["qualia", "fenoménico", "carácter fenoménico"],
  },
  {
    id: "problema-dificil",
    label: "Problema difícil",
    kind: "concepto",
    tooltip:
      "El problema difícil de la conciencia (Chalmers): explicar por qué y cómo los procesos físicos dan lugar a experiencia subjetiva —el salto de la función al sentir—. Ninguna teoría lo cruza; el ensayo lo respeta y no finge resolverlo.",
    href: "/#s4",
    tokens: ["problema difícil", "brecha explicativa"],
  },
  {
    id: "chalmers",
    label: "Chalmers — qualia danzantes",
    kind: "concepto",
    tooltip:
      "Argumento de Chalmers (1995): si sustituyéramos las neuronas por chips funcionalmente idénticos, los qualia no deberían «danzar» ni desvanecerse sin que el sujeto lo notara; luego la experiencia la fijaría la organización, no el material. Es la objeción más fuerte contra la tesis.",
    href: "/#s4",
    tokens: ["Chalmers", "qualia danzantes", "dancing qualia"],
  },
  {
    id: "enactivismo",
    label: "Enactivismo",
    kind: "concepto",
    tooltip:
      "Tradición (Varela, Thompson) según la cual el sentido —que algo importe a un sistema— emerge de la precariedad de un ser vivo que debe producirse activamente para no disolverse. Da cuenta del sentido, no directamente de los qualia.",
    href: "/#s4",
    tokens: ["enactivista", "enactivismo", "Thompson", "Mind in Life"],
  },
  {
    id: "valencia-intrinseca",
    label: "Valencia intrínseca",
    kind: "concepto",
    tooltip:
      "Que los estados de un sistema valgan «para sí» —no para un observador externo— porque de ellos depende su continuación. El ensayo conjetura que el qualia es la cara interna de esa auto-concernencia (sin deducirlo del problema difícil).",
    href: "/#s4",
    tokens: ["valencia intrínseca", "auto-concernencia"],
  },
  {
    id: "iit",
    label: "Información Integrada (IIT)",
    kind: "concepto",
    tooltip:
      "Teoría de Tononi: la conciencia es la estructura de causa-efecto intrínseca de un sistema (Φ). A diferencia del funcionalismo, IIT niega la neutralidad de sustrato —dos sistemas con idéntica E/S pueden tener un Φ distinto—; es congenial a la tesis del ensayo.",
    href: "/#s4",
    tokens: ["Información Integrada", "IIT", "Tononi"],
  },
  {
    id: "global-workspace",
    label: "Espacio de Trabajo Global",
    kind: "concepto",
    tooltip:
      "Teoría de Baars y Dehaene: la conciencia es la difusión global de información a un «espacio de trabajo» compartido. Es funcionalista: si eso basta, el sustrato es indiferente —sería el rival de la tesis del ensayo—.",
    href: "/#s4",
    tokens: ["Espacio de Trabajo Global", "Global Workspace", "Dehaene", "Baars"],
  },
  {
    id: "panpsiquismo",
    label: "Panpsiquismo",
    kind: "concepto",
    tooltip:
      "Postura (Strawson) según la cual la experiencia es una propiedad ubicua de la materia. Amenaza la tesis por exceso: si todo siente, el criterio del sustrato vivo sobra —salvo por el problema de la combinación (cómo se unifica en un sujeto)—.",
    href: "/#s4",
    tokens: ["panpsiquismo", "panpsiquista", "Strawson"],
  },
  {
    id: "ilusionismo",
    label: "Ilusionismo",
    kind: "concepto",
    tooltip:
      "Postura (Dennett, Frankish) que niega que existan qualia que explicar: la «conciencia fenoménica» sería una representación de segundo orden. Si es cierta, el silicio la tendría igual —y se vacía toda tesis ontológica, incluida la del funcionalista realista—.",
    href: "/#s4",
    tokens: ["ilusionismo", "ilusionista", "Frankish", "Dennett"],
  },
  {
    id: "marr",
    label: "Niveles de Marr",
    kind: "concepto",
    tooltip:
      "Marr (1982) distingue tres niveles de explicación de un sistema que computa: computacional (qué función), algorítmico (con qué representación) e implementacional (en qué físico). La apuesta del ensayo: en un sistema vivo, ciertas propiedades ascienden de implementación a constitutivas.",
    href: "/#s4",
    tokens: ["niveles de Marr", "Marr"],
  },
  {
    id: "acoplamiento-homeostatico",
    label: "El coeficiente κ (Exp 10)",
    kind: "experimento",
    tooltip:
      "Experimento 10 (reformado): κ NO mide autopoiesis. Mide compartición de un presupuesto de recursos —un portátil con throttling térmico tiene κ>0—. Y es relativo al corte: la misma máquina pasa de κ=0,00 (contando sólo el chip) a κ=0,70 (contando también su fuente). Contraejemplo construido, no medida de sustrato.",
    href: "/#s4",
    tokens: ["coeficiente κ", "acoplamiento homeostático", "Experimento 10"],
  },

  // ── Cuerpo y mente extendida ─────────────────────────────────────────────
  {
    id: "computo-morfologico",
    label: "Cómputo morfológico",
    kind: "experimento",
    tooltip:
      "Delegar parte del cómputo a la física del cuerpo. El grillo robot de Webb (1996) resuelve la localización del sonido (fonotaxis) con la morfología de su «tráquea» (2 FLOPs) en vez de correlación cruzada y Fourier (757.760 FLOPs) (Exp 6).",
    href: "/#s5",
    tokens: ["cómputo morfológico", "computación morfológica", "Webb", "grillo robot", "fonotaxis"],
  },
  {
    id: "mente-extendida",
    label: "Mente extendida",
    kind: "concepto",
    tooltip:
      "Tesis de Clark (y Chalmers): una herramienta externa que cumple el rol funcional adecuado es parte de la mente (principio de paridad). El ensayo toma su fenomenología —el silicio como andamio— pero no su funcionalismo de fondo.",
    href: "/#s5",
    tokens: ["mente extendida", "Clark", "principio de paridad", "andamio cognitivo"],
  },

  // ── Cierre ───────────────────────────────────────────────────────────────
  {
    id: "falacia-mereologica",
    label: "Falacia mereológica",
    kind: "concepto",
    tooltip:
      "Error (Bennett y Hacker) de atribuir a una parte —un chip, o el cerebro aislado— facultades que corresponden al organismo entero corporizado en su mundo.",
    href: "/#conclusion",
    tokens: ["falacia mereológica", "Bennett", "Hacker"],
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
