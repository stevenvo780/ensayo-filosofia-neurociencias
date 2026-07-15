"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Presentation, FlaskConical, FileText } from "lucide-react";
import Emblem from "./Emblem";

const SI = "#6ea8e0";
const CARBON = "#e6a860";

/** Fondo animado: retícula rígida de silicio (izq, bus de datos) ⇄ red neuronal orgánica (der, disparos esparcidos). */
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1, raf = 0, t = 0;
    type Node = { x: number; y: number; bx: number; by: number; si: boolean; ph: number; fire: number };
    let nodes: Node[] = [];
    let edges: [number, number][] = [];

    const build = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      // Silicio: rejilla izquierda
      const cols = 5, rows = 4;
      const gx0 = W * 0.06, gx1 = W * 0.42, gy0 = H * 0.16, gy1 = H * 0.86;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const x = gx0 + (c / (cols - 1)) * (gx1 - gx0);
          const y = gy0 + (r / (rows - 1)) * (gy1 - gy0);
          nodes.push({ x, y, bx: x, by: y, si: true, ph: Math.random() * 6, fire: 0 });
        }
      // Carbono: red orgánica derecha
      const nC = 22;
      for (let i = 0; i < nC; i++) {
        const x = W * (0.58 + Math.random() * 0.38);
        const y = H * (0.12 + Math.random() * 0.78);
        nodes.push({ x, y, bx: x, by: y, si: false, ph: Math.random() * 6, fire: 0 });
      }
      // Aristas
      edges = [];
      const siN = cols * rows;
      // rejilla ortogonal (bus)
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c < cols - 1) edges.push([i, i + 1]);
          if (r < rows - 1) edges.push([i, i + cols]);
        }
      // carbono: vecinos cercanos
      for (let i = siN; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < W * 0.14) edges.push([i, j]);
        }
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, W, H);
      // aristas
      for (const [a, b] of edges) {
        const na = nodes[a], nb = nodes[b];
        const isSi = na.si && nb.si;
        ctx.strokeStyle = isSi ? "rgba(110,168,224,0.18)" : "rgba(230,168,96,0.16)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
        // paquete viajando (silicio = flujo constante; carbono = esparcido)
        const speed = isSi ? 0.5 : 0.22;
        const prog = ((t * speed + (a * 0.13 + b * 0.07)) % 1);
        if (isSi || Math.sin(t * 0.6 + a) > 0.6) {
          const px = na.x + (nb.x - na.x) * prog;
          const py = na.y + (nb.y - na.y) * prog;
          ctx.fillStyle = isSi ? SI : CARBON;
          ctx.globalAlpha = isSi ? 0.7 : 0.5;
          ctx.beginPath();
          ctx.arc(px, py, isSi ? 1.6 : 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
      // nodos
      for (const n of nodes) {
        if (!n.si) {
          // disparo esparcido orgánico
          if (Math.random() < 0.004) n.fire = 1;
          n.fire = Math.max(0, n.fire - 0.02);
        }
        const pulse = n.si ? 0.6 + 0.4 * Math.sin(t * 2 + n.ph) : 0.4 + n.fire * 0.6;
        ctx.fillStyle = n.si ? SI : CARBON;
        ctx.globalAlpha = 0.35 + pulse * 0.45;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.si ? 2.4 : 3 + n.fire * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    if (reduce) draw();
    else raf = requestAnimationFrame(draw);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.9 }}
      aria-hidden
    />
  );
}

export default function Hero() {
  return (
    <header
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--hero-bg)",
        color: "var(--hero-text)",
        padding: "clamp(56px, 10vh, 110px) 24px clamp(52px, 9vh, 96px)",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <HeroCanvas />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, var(--hero-bg) 88%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <Emblem size={76} />
        </div>
        <div className="eyebrow" style={{ color: "var(--hero-muted)", marginBottom: 18 }}>
          Filosofía de las Neurociencias · La falacia mereológica y el argumento del sustrato
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(2.6rem, 8vw, 5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            margin: "0 0 0.35em",
            color: "#fff",
          }}
        >
          La unidad que&nbsp;falta
        </h1>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(1.1rem, 3vw, 1.55rem)",
            color: "var(--hero-muted)",
            margin: "0 auto 30px",
            maxWidth: 560,
            lineHeight: 1.4,
          }}
        >
          Antes de preguntar de qué está hecho un sujeto, hay que poder decir cuál es
        </p>
        <div
          className="mono"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.04em",
            color: "var(--hero-muted)",
            marginBottom: 30,
          }}
        >
          Steven Vallejo Ortiz · Universidad de Antioquia · 2026
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/slides/0"
            className="btn"
            style={{ background: "#fff", color: "#111", borderColor: "#fff" }}
          >
            <Presentation size={15} /> Ver presentación
          </Link>
          <Link
            href="/laboratorio"
            className="btn"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}
          >
            <FlaskConical size={15} /> Laboratorio
          </Link>
          <a
            href="/ensayo-la-unidad-que-falta.pdf"
            download
            className="btn"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,0.25)", background: "transparent" }}
          >
            <FileText size={15} /> Ensayo en PDF
          </a>
        </div>
      </motion.div>
    </header>
  );
}
