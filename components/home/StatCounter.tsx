"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  tone = "dark",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  tone?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <div
        className={`font-display text-4xl font-bold sm:text-5xl ${
          tone === "light" ? "text-white" : "text-brand"
        }`}
      >
        {prefix}
        {n.toLocaleString()}
        {suffix}
      </div>
      <div
        className={`mt-2 text-sm ${tone === "light" ? "text-white/60" : "text-ash"}`}
      >
        {label}
      </div>
    </div>
  );
}
