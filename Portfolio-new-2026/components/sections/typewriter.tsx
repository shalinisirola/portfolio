"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({ phrase }: { phrase: string }) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduceMotion) {
      setTyped(phrase);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const step = (i: number) => {
      if (i <= phrase.length) {
        setTyped(phrase.slice(0, i));
        const delay = i === 0 ? 260 : Math.max(48, 235 - i * 15);
        timer = setTimeout(() => step(i + 1), delay);
      } else {
        timer = setTimeout(() => {
          setTyped("");
          timer = setTimeout(() => step(0), 360);
        }, 2000);
      }
    };

    timer = setTimeout(() => step(0), 700);
    return () => clearTimeout(timer);
  }, [phrase, reduceMotion]);

  return (
    <div className="flex min-h-[22px] w-[min(480px,100%)] items-center gap-[9px] font-mono text-[15px] tracking-[0.01em] text-text">
      <span className="font-semibold text-accent">&gt;_</span>
      <span>{typed}</span>
      <span className="inline-block h-[18px] w-[9px] animate-blink bg-accent" />
    </div>
  );
}
