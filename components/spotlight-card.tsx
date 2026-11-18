"use client";

import type { ReactNode } from "react";

/** Card with a cursor-following glow (React Bits "Spotlight Card" style). */
export function SpotlightCard({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={`spotlight-card ${className ?? ""}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </article>
  );
}
