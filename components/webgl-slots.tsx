"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { GLIDE_END_EVENT, isGliding } from "@/lib/smooth-scroll";

/**
 * Shared WebGL context budget. Every WebGL effect asks for a slot and renders
 * a static fallback until it gets one: 2 at a time on desktop, 1 on phones or
 * touch devices. Slots are released when the effect leaves the screen. A
 * higher `priority` evicts a lower one (the evicted effect shows its fallback
 * and gets a slot back when one frees up).
 */
const held = new Map<string, { priority: number; revoke: () => void }>();
const waiting = new Set<() => void>();

// No new WebGL effect starts while a button-triggered glide is passing through (creating a
// context mid-scroll stalls it); everything left waiting gets another try once it ends.
if (typeof window !== "undefined") {
  window.addEventListener(GLIDE_END_EVENT, () => waiting.forEach((retry) => retry()));
}

const limit = () =>
  window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ? 1 : 2;

export function useWebglSlot(want: boolean, priority = 0) {
  const id = useId();
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!want) return;
    const revoke = () => {
      held.delete(id);
      setGranted(false);
      waiting.add(tryAcquire);
    };
    function tryAcquire() {
      if (isGliding()) return;
      if (held.size >= limit()) {
        let victim: { priority: number; revoke: () => void } | undefined;
        for (const entry of held.values())
          if (entry.priority < priority && (!victim || entry.priority < victim.priority))
            victim = entry;
        if (!victim) return;
        victim.revoke();
      }
      held.set(id, { priority, revoke });
      waiting.delete(tryAcquire);
      setGranted(true);
    }
    tryAcquire();
    if (!held.has(id)) waiting.add(tryAcquire);

    return () => {
      waiting.delete(tryAcquire);
      if (held.delete(id)) {
        setGranted(false);
        waiting.forEach((retry) => retry());
      }
    };
  }, [want, id, priority]);

  return want && granted;
}

/** True while the referenced element intersects the viewport (expanded by `margin`). */
export function useInView(ref: RefObject<Element | null>, margin = "0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  return inView;
}

/**
 * Absolute-fill layer that mounts its (WebGL) children only while on screen and
 * while a WebGL slot is free, and shows `fallback` otherwise.
 */
export function WebglOnView({
  children,
  fallback = null,
  className = "pointer-events-none absolute inset-0",
  priority = 0,
  margin = "80px",
}: {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  priority?: number;
  /** IntersectionObserver rootMargin; negative values start the effect only once it is well on screen. */
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, margin);
  const granted = useWebglSlot(inView, priority);
  return (
    <div ref={ref} aria-hidden className={className}>
      {granted ? children : fallback}
    </div>
  );
}

/** In-flow variant of WebglOnView: renders `children` when a slot is free, otherwise `fallback`. */
export function WebglSwap({
  children,
  fallback,
  className,
}: {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "80px");
  const granted = useWebglSlot(inView);
  return (
    <div ref={ref} className={className}>
      {granted ? children : fallback}
    </div>
  );
}
