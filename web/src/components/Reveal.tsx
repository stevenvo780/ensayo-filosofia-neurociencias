"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";
import { enrichBlock } from "@/lib/enrich";

export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  style,
  enrich = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  /** Enriquece el texto con tooltips de referencia (solo el ensayo). */
  enrich?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {enrich ? enrichBlock(children) : children}
    </motion.div>
  );
}
