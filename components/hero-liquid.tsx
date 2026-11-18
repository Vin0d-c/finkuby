"use client";

import { LiquidEtherLazy } from "@/components/ui/reactbits/lazy";

/** True when the pointer is on the pitch-blue disc, using the same circle as PitchBlue. */
function onBlue(event: PointerEvent, rect: DOMRect) {
  const w = rect.width;
  const h = rect.height;
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const cx = (35 / 188) * w - (9381 / 235000) * ((h * h) / w);
  const cy = (2607 / 9400) * h - (25 / 47) * ((w * w) / h);
  const r = Math.hypot(cx, cy - (16 / 25) * h);
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

/** Liquid on the hero disc. It keeps swirling on its own, and follows the cursor only while the cursor is on the blue. */
export function HeroLiquid() {
  return (
    <LiquidEtherLazy
      colors={["#c4b5fd", "#a855f7", "#38bdf8"]}
      mouseForce={22}
      cursorSize={160}
      intensity={1.8}
      persistence={0.86}
      autoIntensity={1.8}
      autoSpeed={0.48}
      autoResumeDelay={0}
      hitTest={onBlue}
    />
  );
}
