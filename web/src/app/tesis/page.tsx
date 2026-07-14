import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import TOC from "@/components/TOC";
import Reveal from "@/components/Reveal";
import { enrichBlock } from "@/lib/enrich";

// Enriquece la prosa de la tesis con los mismos tooltips de referencia del
// ensayo (marca el primer token por párrafo/ítem). No toca headings ni tablas.
const mdComponents: Components = {
  p: ({ children }) => <p>{enrichBlock(children, "tp")}</p>,
  li: ({ children }) => <li>{enrichBlock(children, "tl")}</li>,
};

export const metadata: Metadata = {
  title: "Tesis — El sustrato no es neutral",
  description:
    "Versión extendida: variabilidad, modo de intercambio y ancho de banda como límites de la realizabilidad múltiple.",
};

function getTesis(): string {
  return fs.readFileSync(path.join(process.cwd(), "src/content/tesis.md"), "utf8");
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
        </div>
      </header>

      <div className="essay-grid">
        <aside className="essay-aside hidden-md">
          <TOC items={toc} />
        </aside>
        <Reveal className="prose tesis-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={mdComponents}
          >
            {md}
          </ReactMarkdown>
        </Reveal>
      </div>
    </>
  );
}
