"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Resolve a motion-wrapped component for a given tag once and cache it.
 * Creating motion components inline during render produces a new component
 * identity on every render, which remounts (and resets) the animation —
 * fatal here because the hero typewriter re-renders many times per second.
 */
const motionCache = new Map<ElementType, ComponentType<Record<string, unknown>>>();

function getMotionTag(as: ElementType) {
  let cached = motionCache.get(as);
  if (!cached) {
    cached = motion.create(
      as as ElementType,
    ) as unknown as ComponentType<Record<string, unknown>>;
    motionCache.set(as, cached);
  }
  return cached;
}

/**
 * Reveal-on-scroll using a geometry check on scroll/resize rather than
 * IntersectionObserver or Framer's `whileInView`. Both of those can silently
 * fail to fire in some environments, which would leave content stuck at
 * opacity 0 — unacceptable for content. getBoundingClientRect is universally
 * reliable, runs on mount (so above-the-fold content reveals immediately), and
 * degrades to "visible" where there's no window (SSR) or reduced motion.
 */
export function useRevealInView<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") {
      setInView(true);
      return;
    }

    let frame = 0;
    let done = false;

    const check = () => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Trigger once the element's top crosses 88% of the viewport height.
      if (rect.top < vh * 0.88 && rect.bottom > 0) {
        done = true;
        setInView(true);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        check();
      });
    };

    check();
    if (!done) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, inView };
}

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  direction?: Direction;
  delay?: number;
  duration?: number;
}

export function Reveal({
  children,
  className,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useRevealInView();
  const MotionTag = getMotionTag(as);
  const { x, y } = reduceMotion ? offset.none : offset[direction];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * A plain layout wrapper. Stagger is driven per-item (see RevealItem).
 */
export function RevealGroup({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = As;
  return <Tag className={className}>{children}</Tag>;
}

export function RevealItem({
  children,
  className,
  as = "div",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Position within the group; drives the stagger delay. */
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useRevealInView();
  const MotionTag = getMotionTag(as);
  const y = reduceMotion ? 0 : 24;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : Math.min(index, 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
