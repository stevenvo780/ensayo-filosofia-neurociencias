"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { RefEntry } from "@/data/refs";

const KIND_LABEL: Record<RefEntry["kind"], string> = {
  concepto: "Concepto",
  experimento: "Experimento",
  seccion: "Sección",
};

/** «/#s4» → «ir a §4 →», «/#intro» → «ir a la introducción →», etc. */
function linkLabel(href: string): string {
  const id = href.replace(/^\/?#/, "");
  if (/^s\d+$/.test(id)) return `ir a §${id.slice(1)} →`;
  if (id === "intro") return "ir a la introducción →";
  if (id === "conclusion") return "ir a la conclusión →";
  return "ver en el ensayo →";
}

/**
 * Término enriquecido: subrayado punteado ámbar. Hover/focus (o tap en móvil)
 * abre un popover animado con la clase de referencia, una explicación llana y un
 * enlace a la sección/explicador donde el concepto se desarrolla. El popover se
 * reposiciona para no salirse de la pantalla. Accesible: botón focusable,
 * `aria-expanded`, `Esc` cierra. Portado del patrón de autopoesis (RefTooltip).
 */
export default function RefTooltip({
  entry,
  children,
}: {
  entry: RefEntry;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);
  const coarse = useRef(false);
  const popId = useId();
  const [pos, setPos] = useState<{ left: number; up: boolean; arrowLeft: number } | null>(null);

  // Reposiciona el popover para que nunca se salga de la pantalla.
  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    const term = wrapRef.current;
    const pop = popRef.current;
    if (!term || !pop) return;
    const M = 10;
    const r = term.getBoundingClientRect();
    const popW = pop.offsetWidth;
    const popH = pop.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const leftVp = Math.min(Math.max(r.left, M), Math.max(M, vw - popW - M));
    const arrowLeft = Math.min(Math.max(r.left + r.width / 2 - leftVp, 14), popW - 14);
    const up = r.bottom + M + popH > vh && r.top - M - popH > M;
    setPos({ left: leftVp - r.left, up, arrowLeft });
  }, [open]);

  useEffect(() => {
    coarse.current =
      typeof window !== "undefined" && !!window.matchMedia?.("(hover: none)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onBlur = useCallback((e: React.FocusEvent<HTMLSpanElement>) => {
    if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  }, []);

  return (
    <span
      ref={wrapRef}
      className="refwrap"
      onMouseEnter={() => {
        if (!coarse.current) setOpen(true);
      }}
      onMouseLeave={() => {
        if (!coarse.current) setOpen(false);
      }}
      onBlur={onBlur}
    >
      <button
        type="button"
        className={`refterm refterm--${entry.kind}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={open ? popId : undefined}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            ref={popRef}
            id={popId}
            role="dialog"
            aria-label={entry.label}
            className="refpop"
            data-up={pos?.up ? "" : undefined}
            style={
              (pos
                ? {
                    left: pos.left,
                    ...(pos.up ? { top: "auto", bottom: "calc(100% + 8px)" } : {}),
                    "--arrow-left": `${pos.arrowLeft}px`,
                  }
                : { visibility: "hidden" }) as CSSProperties
            }
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
              if (!coarse.current) setOpen(false);
            }}
          >
            <span className="refpop__kind">{KIND_LABEL[entry.kind]}</span>
            <span className="refpop__title">{entry.label}</span>
            <span className="refpop__body">{entry.tooltip}</span>
            <a className="refpop__link" href={entry.href} onClick={() => setOpen(false)}>
              {linkLabel(entry.href)}
            </a>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
