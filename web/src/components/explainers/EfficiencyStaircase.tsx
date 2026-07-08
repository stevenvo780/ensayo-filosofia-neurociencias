"use client";
import { useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BENCH, TIER_META, fmtGap, fmtInt, fmtTime } from "@/lib/data";
import CountUp from "@/components/CountUp";
type Point = {
  row: (typeof BENCH)[number];
  x: number;
  y: number;
};
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const xMinLog = Math.log10(100);
const xMaxLog = Math.log10(16e6);
const yMinLog = Math.log10(1e3);
const yMaxLog = Math.log10(1e6);
function xScale(n: number): number {
  return 80 + (Math.log10(n) - xMinLog) * (880 / (xMaxLog - xMinLog));
}
function yScale(gap: number): number {
  return 460 - (Math.log10(gap) - yMinLog) * (440 / (yMaxLog - yMinLog));
}
export default function EfficiencyStaircase() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const { points, segments, xTicks, yTicks, minGapIndex } = useMemo(() => {
    const points: Point[] = BENCH.map((row) => ({
      row,
      x: xScale(row.n),
      y: yScale(row.gap),
    }));
    const segments = points.slice(1).map((point, i) => {
      const prev = points[i]!;
      return {
        id: `${prev.row.n}-${point.row.n}`,
        d: `M ${prev.x.toFixed(2)} ${prev.y.toFixed(2)} L ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
        color: TIER_META[point.row.tier].color,
      };
    });
    const xTicks = [
      { log: 2, label: "100" },
      { log: 3, label: "1K" },
      { log: 4, label: "10K" },
      { log: 5, label: "100K" },
      { log: 6, label: "1M" },
      { log: 7, label: "10M" },
    ].map((tick) => ({
      ...tick,
      x: xScale(Math.pow(10, tick.log)),
    }));
    const yTicks = [
      { log: 3, label: "1×10³" },
      { log: 4, label: "1×10⁴" },
      { log: 5, label: "1×10⁵" },
      { log: 6, label: "1×10⁶" },
    ].map((tick) => ({
      ...tick,
      y: yScale(Math.pow(10, tick.log)),
    }));
    const minGapIndex = BENCH.reduce(
      (best, row, i) => (row.gap < BENCH[best]!.gap ? i : best),
      0,
    );
    return { points, segments, xTicks, yTicks, minGapIndex };
  }, []);
  const lastIndex = BENCH.length - 1;
  const active = BENCH[index] ?? BENCH[0]!;
  const activePoint = points[index] ?? points[0]!;
  const activeMeta = TIER_META[active.tier];
  const shouldDraw = Boolean(reduced) || inView;
  return (
    <figure ref={ref} className="explainer">
      <div className="explainer-head">
        <span className="explainer-title">Exp 3 · Escalera log-log de eficiencia</span>
        <div className="seg">
          <button type="button" className={index === 0 ? "active" : ""} onClick={() => setIndex(0)}>
            Inicio
          </button>
          <button
            type="button"
            className={index === minGapIndex ? "active" : ""}
            onClick={() => setIndex(minGapIndex)}
          >
            Mínima
          </button>
          <button
            type="button"
            className={index === lastIndex ? "active" : ""}
            onClick={() => setIndex(lastIndex)}
          >
            Rebote
          </button>
        </div>
      </div>
      <svg
        viewBox="-80 0 960 500"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Brecha de eficiencia en escala log-log"
        style={{ display: "block", height: "auto", overflow: "visible", margin: "10px 0 4px" }}
      >
        {xTicks.map((tick) => (
          <g key={`x-${tick.label}`}>
            <line
              x1={tick.x}
              y1={20}
              x2={tick.x}
              y2={460}
              stroke="var(--border)"
              strokeWidth={0.5}
              opacity={0.4}
            />
            <text
              x={tick.x}
              y={486}
              textAnchor="middle"
              fill="var(--muted)"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
            >
              {tick.label}
            </text>
          </g>
        ))}
        {yTicks.map((tick) => (
          <g key={`y-${tick.label}`}>
            <line
              x1={80}
              y1={tick.y}
              x2={960}
              y2={tick.y}
              stroke="var(--border)"
              strokeWidth={0.5}
              opacity={0.4}
            />
            <text
              x={60}
              y={tick.y + 4}
              textAnchor="end"
              fill="var(--muted)"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
            >
              {tick.label}
            </text>
          </g>
        ))}
        <line x1={80} y1={460} x2={960} y2={460} stroke="var(--border-strong)" strokeWidth={1} />
        <line x1={80} y1={20} x2={80} y2={460} stroke="var(--border-strong)" strokeWidth={1} />
        {segments.map((segment, i) => (
          <motion.path
            key={segment.id}
            d={segment.d}
            fill="none"
            stroke={segment.color}
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: shouldDraw ? 1 : 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1.2, delay: i * 0.035, ease: EASE }
            }
          />
        ))}
        {points.map((point, i) => {
          const meta = TIER_META[point.row.tier];
          const isActive = i === index;
          return (
            <motion.circle
              key={point.row.n}
              cx={point.x}
              cy={point.y}
              fill={meta.color}
              stroke={isActive ? "var(--text)" : "var(--surface)"}
              strokeWidth={isActive ? 2 : 1.4}
              filter={isActive ? `drop-shadow(0 0 4px ${meta.color})` : undefined}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label={`${fmtInt(point.row.n)} neuronas · brecha ${fmtGap(point.row.gap)}`}
              initial={false}
              animate={{ r: isActive ? 6 : 3.8, opacity: isActive ? 1 : 0.72 }}
              transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE }}
              onClick={() => setIndex(i)}
            />
          );
        })}
        <motion.line
          x1={activePoint.x}
          y1={activePoint.y}
          x2={activePoint.x}
          y2={460}
          stroke={activeMeta.color}
          strokeWidth={1}
          opacity={0.45}
          vectorEffect="non-scaling-stroke"
          initial={false}
          animate={{ opacity: 0.45 }}
        />
      </svg>
      <div className="control">
        <span style={{ minWidth: 150 }}>
          Punto {index + 1}/{BENCH.length} · N={fmtInt(active.n)}
        </span>
        <input
          type="range"
          min={0}
          max={lastIndex}
          step={1}
          value={index}
          onChange={(event) => setIndex(Number(event.currentTarget.value))}
          aria-label="Índice del benchmark"
        />
      </div>
      <motion.div
        key={active.n}
        initial={reduced ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.25, ease: EASE }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))",
          gap: 10,
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.76rem",
          color: "var(--text-soft)",
        }}
      >
        <div>
          <span style={{ display: "block", color: "var(--muted)" }}>N</span>
          <strong style={{ color: "var(--text)", fontStyle: "normal" }}>{fmtInt(active.n)}</strong>
        </div>
        <div>
          <span style={{ display: "block", color: "var(--muted)" }}>Tier</span>
          <strong style={{ color: activeMeta.color, fontStyle: "normal" }}>{activeMeta.label}</strong>
        </div>
        <div>
          <span style={{ display: "block", color: "var(--muted)" }}>Tiempo</span>
          <strong style={{ color: "var(--text)", fontStyle: "normal" }}>
            {fmtTime(active.timeMs)}
          </strong>
        </div>
        <div>
          <span style={{ display: "block", color: "var(--muted)" }}>Brecha</span>
          <strong style={{ color: activeMeta.color, fontStyle: "normal" }}>
            {fmtGap(active.gap)}
          </strong>
        </div>
      </motion.div>
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        <div className="stat" style={{ textAlign: "center" }}>
          <div className="stat-num" style={{ color: activeMeta.color }}>
            <CountUp key={active.n} from={0} to={active.gap} duration={1.1} format={fmtGap} />
          </div>
          <div className="stat-label">Brecha de eficiencia (×)</div>
        </div>
      </div>
      <figcaption className="explainer-cap">
        La escalera no es monotónica: la brecha baja hasta ~3.000× en single-GPU 1M, donde mejor se
        usa la VRAM, pero rebota a 104.450× en el híbrido 16M cuando aparecen PCIe, DDR y GIL. No es una
        ley suave de escala, sino un patrón emergente de arquitectura y de sus cuellos sucesivos.
      </figcaption>
    </figure>
  );
}
