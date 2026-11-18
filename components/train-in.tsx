"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./train-in.css";

/**
 * Brings its content in like an arriving train the first time it scrolls into view: from
 * far off on the right it rushes in, brakes past its stop, rocks back and settles. Plays
 * once per page load. Styles: train-in.css.
 */
export function TrainIn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [arrived, setArrived] = useState(false);
  // Drop the layer promotion once it has landed, so the ribbon isn't kept as a separate
  // GPU layer (and rasterised at the wrong scale) for the rest of the visit.
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setArrived(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={landed ? undefined : arrived ? "train-in-arrive" : "train-in-waiting"}
      onAnimationEnd={(event) => {
        if (event.animationName === "train-in-move") setLanded(true);
      }}
    >
      {children}
    </div>
  );
}
