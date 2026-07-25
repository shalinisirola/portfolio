"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useRevealInView } from "@/components/motion/reveal";

interface CountUpProps {
  /** Target value as shown in the design, e.g. "9.5", "200+", "3". */
  value: string;
  className?: string;
  durationMs?: number;
}

/** Split "200+" into { target: 200, decimals: 0, suffix: "+" }. */
function parseValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, decimals: 0, suffix: value };
  const numeric = match[1];
  const dot = numeric.indexOf(".");
  return {
    target: parseFloat(numeric),
    decimals: dot === -1 ? 0 : numeric.length - dot - 1,
    suffix: match[2] ?? "",
  };
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({ value, className, durationMs = 1400 }: CountUpProps) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useRevealInView<HTMLDivElement>();
  const { target, decimals, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(target * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, target, durationMs]);

  return (
    <div ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </div>
  );
}
