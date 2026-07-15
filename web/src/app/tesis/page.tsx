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

// Enriquece la prosa de la tesis con los mismos tooltips de referencia del
// ensayo (marca el primer token por párrafo/ítem). No toca headings, tablas ni
// las fórmulas renderizadas por KaTeX.
const mdComponents: Components = {
  p: ({ children }) => <p>{enrichBlock(children, "tp")}</p>,
  li: ({ children }) => <li>{enrichBlock(children, "tl")}</li>,
};

// Cada eje de la Parte II (y §III.4) ancla a su explicador interactivo, igual
// que en el ensayo. La clave es el número de sección (p. ej. «II.4»).
const SECTION_VISUAL: Record<string, ReactNode> = {
  "II.1": <VonNeumannBus />,
  "II.2": <SparseCoding />,
  "II.3": <StateSpaceVariability />,
  "II.4": <ExchangeMode />,
  "II.5": <IOBandwidth />,
  "II.6": <EfficiencyStaircase />,
  "III.4": (
    <>
      <GammaOscillation />
      <MorphologyFlops />
    </>
  ),
};

export const metadata: Metadata = {
  title: "Tesis — El sustrato no es neutral",
  description:
    "Versión extendida: variabilidad, modo de intercambio y ancho de banda como límites de la realizabilidad múltiple.",
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
          El sustrato no es neutral
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
          Variabilidad, intercambio y ancho de banda como límites de la realizabilidad múltiple
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <ArrowLeft size={15} /> Ensayo (2000 palabras)
          </Link>
          <Link href="/laboratorio" className="btn" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}>
            <FlaskConical size={15} /> Experimentos interactivos
          </Link>
          <a
            href="/tesis-el-sustrato-no-es-neutral.pdf"
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
              seg.key === "III.3" ? (
                <figure className="tesis-figure">
                  <Image
                    src="/graficos/exp10_acoplamiento.png"
                    alt="Experimento 10: acoplamiento entre cómputo y auto-mantenimiento bajo lesión homeostática."
                    width={1629}
                    height={647}
                    className="tesis-figure__img"
                    sizes="(max-width: 820px) 100vw, 760px"
                  />
                  <figcaption className="tesis-figure__cap">
                    <strong>Experimento 10.</strong> Firma operacional de la autopoiesis: bajo una
                    lesión metabólica idéntica, el sistema acoplado (carbono) se desploma
                    (κ ≈ 0,88 ± 0,00, 24 semillas) mientras el desacoplado (silicio) no se inmuta
                    (κ = 0,00). Mide el acoplamiento cómputo↔auto-mantenimiento, no la conciencia.
                  </figcaption>
                </figure>
              ) : seg.key ? (
                SECTION_VISUAL[seg.key] ?? null
              ) : null;

            return (
              <div key={i} className="tesis-seg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeSlug, rehypeKatex]}
                  components={mdComponents}
                >
                  {seg.text}
                </ReactMarkdown>
                {visual}
              </div>
            );
          })}
        </Reveal>
      </div>
    </>
  );
}
