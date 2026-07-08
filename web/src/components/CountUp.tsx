"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  format,
  prefix = "",
  suffix = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  format?: (v: number) => string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration > 0 ? Math.min(1, (now - start) / (duration * 1000)) : 1;
      const eased = 1 - Math.pow(1 - t, 3);
      setV(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from, duration]);

  const shown = format
    ? format(v)
    : v.toLocaleString("es", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
