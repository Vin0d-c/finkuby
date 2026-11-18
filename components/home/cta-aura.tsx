"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Drifting aura behind the CTA banner. While the pointer is over the banner (the parent
 * element), each glow leans toward it by its own amount, giving a soft parallax; they
 * ease back to rest when the pointer leaves.
 */
const blobs: {
  className: string;
  opacity: number;
  delay: string;
  /** Length of one drift loop; differing lengths and directions keep the glows from moving in step. */
  duration: string;
  reverse: boolean;
  /** How far the glow follows the pointer, in px at the banner's edge. Negative moves against it. */
  pull: number;
}[] = [
  { className: "-top-32 -left-24 h-[26rem] w-[26rem] bg-[#3ab6fc]", opacity: 0.38, delay: "0s", duration: "6.5s", reverse: false, pull: 300 },
  { className: "top-[10%] left-[38%] h-72 w-72 bg-[#8f7bff]", opacity: 0.22, delay: "-2.5s", duration: "5s", reverse: true, pull: -200 },
  { className: "-right-24 -bottom-28 h-[24rem] w-[24rem] bg-[#3b8ef8]", opacity: 0.32, delay: "-4.5s", duration: "7.5s", reverse: true, pull: 260 },
  { className: "right-[12%] top-[-4rem] h-56 w-56 bg-[#9ed6ff]", opacity: 0.5, delay: "-1s", duration: "4.5s", reverse: false, pull: -160 },
];

export function CtaAura() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = ref.current;
    const host = field?.parentElement;
    if (!field || !host) return;

    let frame = 0;
    const set = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        field.style.setProperty("--mx", x.toFixed(3));
        field.style.setProperty("--my", y.toFixed(3));
      });
    };
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      set((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => set(0, 0);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ "--mx": 0, "--my": 0 } as CSSProperties}
    >
      {blobs.map((blob) => (
        // The wrapper follows the pointer; the blob inside keeps its own slow drift animation.
        <span
          key={blob.className}
          className="absolute inset-0 transition-transform duration-[700ms] ease-out"
          style={{
            transform: `translate(calc(var(--mx) * ${blob.pull * 2}px), calc(var(--my) * ${blob.pull * 2}px))`,
          }}
        >
          <span
            className={`aurora-blob ${blob.className}`}
            style={{
              opacity: blob.opacity,
              animationDelay: blob.delay,
              animationDuration: blob.duration,
              animationDirection: blob.reverse ? "reverse" : "normal",
            }}
          />
        </span>
      ))}
    </div>
  );
}
