"use client";

import { useEffect, useRef } from "react";

/**
 * Soft cyan glow that follows the pointer across the page.
 * Fine pointers only; skipped for touch and reduced-motion.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let visible = false;

    const paint = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        glow.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      glow.style.opacity = "0";
    };

    raf = requestAnimationFrame(paint);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998] hidden [@media(hover:hover)_and_(pointer:fine)]:block motion-reduce:hidden!"
    >
      <div
        ref={glowRef}
        className="cursor-glow absolute top-0 left-0 opacity-0 will-change-transform"
      />
    </div>
  );
}
