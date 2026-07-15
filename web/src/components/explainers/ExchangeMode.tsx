"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { EXCHANGE } from "@/lib/data";
import CountUp from "@/components/CountUp";

/**
 * Exp 9 — Intercambio químico-pasivo vs eléctrico-activo.
 * Comparación visual de energía por evento: computar (3 pJ) vs mover datos (1950 pJ).
 * El silicio: 99,8% energía es movimiento (intercambio eléctrico ACTIVO).
 * El carbono: transporte es difusión PASIVA (gradiente), solo se paga restauración.
 * Fuentes: Horowitz 2014, Attwell-Laughlin 2001.
 */

export default function ExchangeMode() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  // Barras de energía: cada una ocupa espacio proporcional a su valor en escala log
  const items = [
    { label: "Computar (32-bit)", value: EXCHANGE.eFlopPj, unit: "pJ", color: "var(--si)" },
    { label: "Mover 64 bits (DRAM)", value: EXCHANGE.eDram64Pj, unit: "pJ", color: "#d94f4f" },
    { label: "Potencial de acción", value: EXCHANGE.eApPj, unit: "pJ", color: "var(--carbon)" },
  ];

  // Para escala logarítmica, normalizamos por log
  const maxVal = Math.max(...items.map((i) => i.value));
  const maxLog = maxVal > 0 ? Math.log10(maxVal) : 1;
  const normalizeLog = (val: number) => (val > 0 ? Math.log10(val) : 0) / maxLog;

  // Desglose del silicio: 99,8% movimiento, 0,2% cómputo
  const computeFraction = 1 - EXCHANGE.interchangeFraction; // 0.002
  const moveFraction = EXCHANGE.interchangeFraction; // 0.998

  return (
    <figure className="explainer" ref={ref}>
      <div className="explainer-head">
        <span className="explainer-title">Exp 9 · Intercambio químico vs eléctrico</span>
      </div>

      {/* Barras de energía por evento (escala logarítmica) */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18, margin: "20px 0" }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: "0.82rem",
                fontFamily: "var(--font-mono)",
                color: "var(--text-soft)",
                minWidth: 160,
              }}
            >
              {item.label}
            </span>
            <div
              style={{
                flex: 1,
                height: 28,
                background: "var(--surface-2)",
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: item.color,
                  width: inView ? `${normalizeLog(item.value) * 100}%` : "0%",
                  transition: inView && !reduced ? "width 0.8s var(--ease)" : "none",
                  display: "flex",
                  alignItems: "center",
                  paddingRight: 8,
                  justifyContent: "flex-end",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: item.color === "#d94f4f" ? "#fff" : "inherit",
                    opacity:
                      normalizeLog(item.value) > 0.15 ? 1 : 0,
                    transition: reduced ? "none" : "opacity 0.8s var(--ease) 0.4s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.value.toLocaleString("es")} {item.unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desglose del silicio: barra apilada */}
      <div style={{ margin: "24px 0 16px" }}>
        <span
          style={{
            fontSize: "0.82rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-soft)",
            display: "block",
            marginBottom: 8,
          }}
        >
          Desglose de energía en silicio
        </span>
        <div
          style={{
            display: "flex",
            height: 32,
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          {/* Fracción cómputo (0.2%) */}
          <div
            style={{
              flex: computeFraction,
              background: "var(--si)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              fontFamily: "var(--font-mono)",
              color: "#fff",
              fontWeight: 600,
              opacity: inView ? 1 : 0.3,
              transition: reduced ? "none" : "opacity 0.8s var(--ease)",
            }}
          >
            {computeFraction > 0.05 && `${(computeFraction * 100).toFixed(1)}%`}
          </div>
          {/* Fracción movimiento (99.8%) */}
          <div
            style={{
              flex: moveFraction,
              background: "#d94f4f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "#fff",
              fontWeight: 600,
              opacity: inView ? 1 : 0.3,
              transition: reduced ? "none" : "opacity 0.8s var(--ease)",
            }}
          >
            {inView && <span>{(moveFraction * 100).toFixed(1)}%</span>}
          </div>
        </div>
      </div>

      {/* Estadística: ratio movimiento/cómputo */}
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 20,
          flexWrap: "wrap",
        }}
      >
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: "var(--carbon)" }}>
            {inView && <CountUp to={EXCHANGE.moveVsComputeRatio} decimals={0} suffix="×" />}
          </div>
          <div className="stat-label">Energía mover / computar</div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        Mover un bit a DRAM cuesta ~{EXCHANGE.moveVsComputeRatio}× computarlo; en la hendidura
        sináptica el transporte es difusión química por gradiente.{" "}
        <strong>Cautela — este experimento tiene tres defectos y por eso salió de la tesis:</strong>{" "}
        (i) es <em>física de materiales</em>, no organización: dos mecanismos de transporte, sin
        topología ni clausura — y «de qué está hecho» es el eje que §IV.1 declaró muerto; (ii) la
        comparación está sesgada por construcción, porque enfrenta el <em>peor caso</em> del silicio
        (atravesar toda la jerarquía hasta DRAM, 1.950 pJ) contra el <em>mejor caso</em> del tejido
        (restauración amortizada del potencial, 210,85 pJ), omitiendo que un acceso a SRAM local
        cuesta ~1–2 pJ: el ratio sale de haber elegido los dos extremos convenientes; (iii) llamar
        «pasivo» al tejido era un error de biología — el potencial de acción <em>es</em> transporte
        activo, con bombas Na⁺/K⁺ que consumen ATP hasta ~el 50 % del presupuesto energético
        cerebral. Pieza de archivo; su contenido honesto está mejor medido en el benchmark escalonado
        y mejor dicho en el piso de Landauer.
      </figcaption>
    </figure>
  );
}
