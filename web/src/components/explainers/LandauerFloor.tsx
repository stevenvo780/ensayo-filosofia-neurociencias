"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CONST } from "@/lib/data";

interface Bar {
  id: string;
  label: string;
  value: number;
  unit: string;
  color: string;
}

const LOG_MIN = -21;
const LOG_MAX = -8;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function toSuper(n: number): string {
  const map = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return String(n)
    .split("")
    .map((c) => (c === "-" ? "⁻" : (map[Number(c)] ?? c)))
    .join("");
}

function fmtSci(v: number): string {
  if (!(v > 0) || !Number.isFinite(v)) return "0";
  const exp = Math.floor(Math.log10(v));
  const mantissa = v / Math.pow(10, exp);
  const mantStr = mantissa.toLocaleString("es", { maximumFractionDigits: 2 });
  return `${mantStr}·10${toSuper(exp)}`;
}

function barPct(v: number): number {
  return ((Math.log10(v) + 21) / 13) * 100;
}

function fmtOrden(v: number): string {
  return v.toLocaleString("es", { maximumFractionDigits: 1 });
}

export default function LandauerFloor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const bars = useMemo<Bar[]>(
    () => [
      {
        id: "landauer",
        label: "Piso de Landauer (límite universal, kT·ln2 @ 300 K)",
        value: CONST.landauerJ,
        unit: "J/bit",
        color: "var(--muted)",
      },
      {
        id: "cmos",
        label: "Conmutación CMOS (silicio)",
        value: CONST.cmosJ,
        unit: "J/op",
        color: "var(--si)",
      },
      {
        id: "atp",
        label: "Spike de carbono (hidrólisis de ATP)",
        value: CONST.atpPerSpikeJ,
        unit: "J/spike",
        color: "var(--carbon)",
      },
    ],
    [],
  );

  const ratioSiC = useMemo(() => CONST.atpPerSpikeJ / CONST.cmosJ, []);
  const gapSi = useMemo(() => Math.log10(CONST.cmosJ / CONST.landauerJ), []);
  const gapC = useMemo(() => Math.log10(CONST.atpPerSpikeJ / CONST.landauerJ), []);

  return (
    <figure ref={ref} className="explainer">
      <header className="explainer-head">
        <span className="explainer-title">§3 · Piso de Landauer</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}
        >
          escala log₁₀ · 10⁻²¹ → 10⁻⁸ J
        </span>
      </header>

      <div className="bars" style={{ margin: "20px 0 4px" }}>
        {bars.map((b, idx) => {
          const pct = barPct(b.value);
          const fill = reduced || inView;
          return (
            <div key={b.id} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  marginBottom: 5,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "var(--text-soft)" }}>{b.label}</span>
                <span
                  style={{
                    color: b.color,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {fmtSci(b.value)} {b.unit}
                </span>
              </div>
              <div
                role="img"
                aria-label={`${b.label}: ${fmtSci(b.value)} ${b.unit}`}
                style={{
                  position: "relative",
                  height: 14,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: fill ? `${pct}%` : "0%" }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 1.2, ease: EASE, delay: 0.1 + idx * 0.15 }
                  }
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: b.color,
                    transformOrigin: "left center",
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "relative",
          height: 18,
          margin: "4px 0 14px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.66rem",
          color: "var(--muted)",
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ position: "absolute", left: "0%" }}>10⁻²¹</span>
        <span
          style={{
            position: "absolute",
            left: `${barPct(1e-15)}%`,
            transform: "translateX(-50%)",
          }}
        >
          10⁻¹⁵
        </span>
        <span
          style={{
            position: "absolute",
            left: `${barPct(1e-10)}%`,
            transform: "translateX(-50%)",
          }}
        >
          10⁻¹⁰
        </span>
        <span style={{ position: "absolute", right: "0%" }}>10⁻⁸</span>
      </div>

      <div
        className="stats"
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 12,
          flexWrap: "wrap",
          paddingTop: 12,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="stat" style={{ textAlign: "center" }}>
          <div
            className="stat-num"
            style={{
              color: "var(--carbon)",
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmtSci(ratioSiC)}×
          </div>
          <div
            className="stat-label"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              marginTop: 2,
            }}
          >
            brecha arquitectónica silicio / carbono
          </div>
        </div>

        <div className="stat" style={{ textAlign: "center" }}>
          <div
            className="stat-num"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmtOrden(gapSi)} · {fmtOrden(gapC)}
          </div>
          <div
            className="stat-label"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--muted)",
              letterSpacing: "0.06em",
              marginTop: 2,
            }}
          >
            órdenes sobre Landauer (Si · C)
          </div>
        </div>
      </div>

      <figcaption className="explainer-cap">
        Ni el silicio ni el carbono se acercan al piso de Landauer; es un límite universal que{" "}
        <strong style={{ color: "var(--text-soft)", fontStyle: "normal" }}>
          NO favorece a ninguno
        </strong>
        . La brecha es arquitectónica, no termodinámica fundamental: el silicio dista{" "}
        <strong style={{ color: "var(--si)", fontStyle: "normal" }}>
          {fmtOrden(gapSi)} órdenes
        </strong>{" "}
        del límite irreversible; el carbono{" "}
        <strong style={{ color: "var(--carbon)", fontStyle: "normal" }}>
          {fmtOrden(gapC)} órdenes
        </strong>
        . Ambos muy por encima del techo que la termodinámica prohíbe franquear — la pregunta del
        ensayo es cuál de los dos lo cierra primero.
      </figcaption>
    </figure>
  );
}