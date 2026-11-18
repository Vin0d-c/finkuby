"use client";

import { useEffect, useId, useRef, type RefObject } from "react";

/**
 * Gooey Nav highlight, adapted from React Bits' Gooey Nav without WebGL: a blob that glides
 * to the hovered / focused / current nav item, with a small particle burst. The goo SVG
 * filter sits on the blob layer only (never on the links) and is applied just while the blob
 * is moving. Reduced motion: a plain highlight that fades and slides, no stretch or particles.
 *
 * Mark nav items with `data-goo`; the current one with `aria-current`. Place this as the first
 * child of a positioned `root`; items need to be positioned themselves so their text sits above.
 */
type Props = {
  rootRef: RefObject<HTMLElement | null>;
  color: string;
  particleColors: string[];
  /** Changes when the current item changes, so the resting blob follows it. */
  activeKey?: string | null;
};

const EASE = "cubic-bezier(0.34, 1.45, 0.5, 1)";
const blobStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  borderRadius: "9999px",
  opacity: 0,
} as const;

export default function GooeyNav({ rootRef, color, particleColors, activeKey }: Props) {
  const id = "goo" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const layerRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLSpanElement>(null);
  const tailRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    const lead = leadRef.current;
    const tail = tailRef.current;
    const burst = burstRef.current;
    if (!root || !layer || !lead || !tail || !burst) return;

    const motion = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current: HTMLElement | null = null;
    let shown = false;
    let restTimer = 0;
    let busyTimer = 0;

    const items = () => root.querySelectorAll<HTMLElement>("[data-goo]");
    const mark = (el: HTMLElement | null) =>
      items().forEach((item) =>
        item === el ? item.setAttribute("data-goo-on", "") : item.removeAttribute("data-goo-on"),
      );

    const place = (el: HTMLElement, animate: boolean) => {
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      if (b.width === 0) return;
      const fancy = motion();
      const t = (s: number, delay = 0) =>
        animate
          ? `transform ${s}s ${fancy ? EASE : "ease"} ${delay}s, width ${s}s ${fancy ? EASE : "ease"} ${delay}s, height ${s}s ease ${delay}s, opacity 0.2s`
          : "opacity 0.2s";
      const set = (node: HTMLElement, s: number, delay: number, opacity: number) => {
        node.style.transition = t(s, delay);
        node.style.width = `${b.width}px`;
        node.style.height = `${b.height}px`;
        node.style.transform = `translate(${b.left - r.left}px, ${b.top - r.top}px)`;
        node.style.opacity = String(opacity);
      };
      set(lead, fancy ? 0.38 : 0.15, 0, 1);
      // The lagging twin is what stretches the blob under the goo filter.
      set(tail, 0.6, 0.04, fancy ? 1 : 0);
    };

    const spray = (el: HTMLElement) => {
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      const cx = b.left - r.left + b.width / 2;
      const cy = b.top - r.top + b.height / 2;
      for (let i = 0; i < 6; i++) {
        const dot = document.createElement("span");
        const size = 5 + Math.random() * 5;
        Object.assign(dot.style, {
          position: "absolute",
          left: `${cx}px`,
          top: `${cy}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: particleColors[i % particleColors.length],
        });
        const angle = (i / 6) * Math.PI * 2 + Math.random();
        const dx = Math.cos(angle) * (b.width / 2 + 6 + Math.random() * 14);
        const dy = Math.sin(angle) * (b.height / 2 + 6 + Math.random() * 12);
        const at = (k: number, s: number) =>
          `translate(calc(-50% + ${dx * k}px), calc(-50% + ${dy * k}px)) scale(${s})`;
        const anim = dot.animate(
          [
            { transform: at(0, 0), opacity: 1 },
            { transform: at(1, 1), opacity: 1, offset: 0.45 },
            { transform: at(1.25, 0), opacity: 0 },
          ],
          { duration: 600 + Math.random() * 300, easing: "ease-out" },
        );
        anim.onfinish = () => dot.remove();
        burst.appendChild(dot);
      }
    };

    const moveTo = (el: HTMLElement) => {
      if (el === current) return;
      const animate = shown;
      place(el, animate);
      if (animate && motion()) {
        layer.style.filter = `url(#${id})`;
        window.clearTimeout(busyTimer);
        busyTimer = window.setTimeout(() => (layer.style.filter = ""), 1000);
        spray(el);
      }
      current = el;
      shown = true;
      mark(el);
    };

    const rest = () => {
      const active = root.querySelector<HTMLElement>("[data-goo][aria-current]");
      if (active) return moveTo(active);
      lead.style.opacity = tail.style.opacity = "0";
      current = null;
      shown = false;
      mark(null);
    };

    const queueRest = () => {
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(rest, 120);
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target as Element;
      const goo = target.closest<HTMLElement>("[data-goo]");
      window.clearTimeout(restTimer);
      if (goo && root.contains(goo)) moveTo(goo);
      // Inside an open dropdown the blob stays on its trigger.
      else if (!target.closest('[role="menu"]')) queueRest();
    };
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const goo = target.closest<HTMLElement>("[data-goo]");
      if (goo && target.matches(":focus-visible")) {
        window.clearTimeout(restTimer);
        moveTo(goo);
      }
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!(event.relatedTarget as Element | null)?.closest?.("[data-goo]")) queueRest();
    };

    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", queueRest);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    const resize = new ResizeObserver(() => current && place(current, false));
    resize.observe(root);
    items().forEach((item) => resize.observe(item));

    rest();

    return () => {
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", queueRest);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      resize.disconnect();
      window.clearTimeout(restTimer);
      window.clearTimeout(busyTimer);
      burst.replaceChildren();
      mark(null);
    };
  }, [rootRef, particleColors, activeKey, id]);

  return (
    <>
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <filter
            id={id}
            filterUnits="userSpaceOnUse"
            x="-2000"
            y="-2000"
            width="6000"
            height="6000"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            />
          </filter>
        </defs>
      </svg>
      <div
        ref={layerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-0 h-0 w-0"
      >
        <span ref={tailRef} style={{ ...blobStyle, background: color }} />
        <span ref={leadRef} style={{ ...blobStyle, background: color }} />
        <span ref={burstRef} className="absolute top-0 left-0" />
      </div>
    </>
  );
}
