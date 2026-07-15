import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FlaskConical, FileText } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import GithubSlugger from "github-slugger";
import "katex/dist/katex.min.css";
import TOC from "@/components/TOC";
import Reveal from "@/components/Reveal";
import { enrichBlock } from "@/lib/enrich";
import VonNeumannBus from "@/components/explainers/VonNeumannBus";
import SparseCoding from "@/components/explainers/SparseCoding";
import StateSpaceVariability from "@/components/explainers/StateSpaceVariability";
import ExchangeMode from "@/components/explainers/ExchangeMode";
import IOBandwidth from "@/components/explainers/IOBandwidth";
import EfficiencyStaircase from "@/components/explainers/EfficiencyStaircase";
import GammaOscillation from "@/components/explainers/GammaOscillation";
import MorphologyFlops from "@/components/explainers/MorphologyFlops";
import ArgMap from "@/components/ArgMap";

// Enriquece la prosa de la tesis con los mismos tooltips de referencia del
// ensayo (marca el primer token por párrafo/ítem). No toca headings, tablas ni
// las fórmulas renderizadas por KaTeX.
const mdComponents: Components = {
  p: ({ children }) => <p>{enrichBlock(children, "tp")}</p>,
  li: ({ children }) => <li>{enrichBlock(children, "tl")}</li>,
  // En web el mapa del argumento es el componente <ArgMap> (theme-aware); la
  // imagen del markdown existe solo para el PDF, así que aquí no se renderiza.
  img: () => null,
};

// Los explicadores pertenecen al laboratorio, que en esta versión está subordinado
// y auditado: viven en §IV.5 («qué se conserva de los cinco ejes»), donde se los
// reencuadra como comparaciones entre ESQUEMAS ORGANIZACIONALES —no entre
// sustratos—. La clave es el número de sección (p. ej. «IV.5»).
const SECTION_VISUAL: Record<string, ReactNode> = {
  "IV.5": (
    <>
      <VonNeumannBus />
      <SparseCoding />
      <StateSpaceVariability />
      <ExchangeMode />
      <IOBandwidth />
      <EfficiencyStaircase />
      <GammaOscillation />
      <MorphologyFlops />
    </>
  ),
};

export const metadata: Metadata = {
  title: "Tesis — El argumento del sustrato",
  description:
    "Versión extendida: por qué la autopoiesis no puede decidir el problema del sustrato, con la auditoría completa del laboratorio.",
};

function getTesis(): string {
  return fs.readFileSync(path.join(process.cwd(), "src/content/tesis.md"), "utf8");
}

type Segment = { text: string; key: string | null };

// Parte la tesis en segmentos por encabezado (##/###) para poder intercalar
// los explicadores justo tras la sección que ilustran. La clave sale del número
// romano del título (II.1, III.3…); el resto de segmentos no lleva visual.
function splitSegments(md: string): Segment[] {
  const lines = md.split("\n");
  const segs: Segment[] = [];
  let buf: string[] = [];
  let key: string | null = null;
  const flush = () => {
    if (buf.length) segs.push({ text: buf.join("\n"), key });
  };
  for (const line of lines) {
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      buf = [line];
      const km = /^([IVX]+\.\d+)/.exec(h[2].trim());
      key = km ? km[1] : null;
    } else {
      buf.push(line);
    }
  }
  flush();
  return segs;
}

export default function TesisPage() {
  const md = getTesis();
  const slugger = new GithubSlugger();
  const toc = md
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => {
      const label = l.replace(/^##\s+/, "").trim();
      return { id: slugger.slug(label), label: label.length > 26 ? label.slice(0, 24) + "…" : label };
    });

  const segments = splitSegments(md);

  return (
    <>
      <header
        style={{
          background: "var(--hero-bg)",
          color: "var(--hero-text)",
          padding: "clamp(44px, 8vh, 76px) 24px clamp(36px, 6vh, 56px)",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="eyebrow" style={{ color: "var(--hero-muted)", marginBottom: 14 }}>
          Versión extendida · Tesis
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(1.9rem, 5vw, 3.1rem)",
            lineHeight: 1.1,
            maxWidth: 780,
            margin: "0 auto 0.4em",
            color: "#fff",
          }}
        >
          El argumento del sustrato
        </h1>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            color: "var(--hero-muted)",
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            maxWidth: 620,
            margin: "0 auto 24px",
          }}
        >
          …y la unidad que le falta
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <ArrowLeft size={15} /> Ensayo (2000 palabras)
          </Link>
          <Link href="/laboratorio" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <FlaskConical size={15} /> Experimentos interactivos
          </Link>
          <a
            href="/tesis-la-unidad-que-falta.pdf"
            className="btn"
            download
            style={{ color: "#0b1220", borderColor: "transparent", background: "#fff" }}
          >
            <FileText size={15} /> Descargar PDF
          </a>
        </div>
      </header>

      <div className="essay-grid">
        <aside className="essay-aside hidden-md">
          <TOC items={toc} />
        </aside>
        <Reveal className="prose tesis-prose">
          {segments.map((seg, i) => {
            const visual =
              seg.key === "IV.4" ? (
                <figure className="tesis-figure">
                  <Image
                    src="/graficos/exp10_acoplamiento.png"
                    alt="Experimento 10: κ pasa de 0,00 a 0,70 en la misma máquina al mover sólo la frontera del sistema."
                    width={1704}
                    height={663}
                    className="tesis-figure__img"
                    sizes="(max-width: 820px) 100vw, 760px"
                  />
                  <figcaption className="tesis-figure__cap">
                    <strong>Experimento 10 (reformado).</strong> La misma máquina, bajo la misma
                    perturbación, con dos fronteras distintas: contando sólo el chip, κ = 0,00
                    (inmune); contando también su fuente de alimentación, κ = 0,70 (24 semillas). El
                    sustrato no cambió: cambió el corte. κ mide compartición de presupuesto de
                    recursos, no autopoiesis.
                  </figcaption>
                </figure>
              ) : seg.key ? (
                SECTION_VISUAL[seg.key] ?? null
              ) : null;

            // El mapa conceptual del argumento va tras la hoja de ruta (§0),
            // como brújula de todo el texto.
            const showMap = seg.text.includes("Introducción y hoja de ruta");

            return (
              <div key={i} className="tesis-seg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeSlug, rehypeKatex]}
                  components={mdComponents}
                >
                  {seg.text.replace(/^!\[.*$/gm, "").trimEnd()}
                </ReactMarkdown>
                {showMap && <ArgMap />}
                {visual}
              </div>
            );
          })}
        </Reveal>
      </div>
    </>
  );
}
