"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** Fades/slides its direct children in (staggered) when scrolled into view. */
export function Reveal({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const items = Array.from(el.children);
    gsap.set(items, { opacity: 0, y: 36 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          clearProps: "transform",
        });
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      gsap.killTweensOf(items);
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
