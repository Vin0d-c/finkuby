"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { isGliding } from "@/lib/smooth-scroll";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Digits drop down odometer-style onto `to` when scrolled into view. Server render shows the final value. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const digits = String(to).split("").map(Number);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const strips = el.querySelectorAll<HTMLElement>("[data-strip]");
    const affixes = el.querySelectorAll<HTMLElement>("[data-affix]");
    // One paused timeline: replayed from the start each time the number scrolls into view,
    // and rewound to its start state once it is fully off screen, ready for the next pass.
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      strips,
      { yPercent: (_, s: HTMLElement) => -100 * (1 - 1 / s.children.length) },
      { yPercent: 0, duration: (i) => 4 + i * 0.6, ease: "power2.out", immediateRender: true },
      0,
    );
    tl.fromTo(
      affixes,
      { yPercent: -60, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.4, ease: "back.out(2)", immediateRender: true },
      1.6,
    );

    const io = new IntersectionObserver(([e]) => {
      // While a button-triggered glide passes through, just show the final figure.
      if (e.isIntersecting) {
        if (isGliding()) tl.pause(tl.duration());
        else tl.restart();
      }
      else tl.pause(0);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      tl.kill();
    };
  }, [to]);

  return (
    <span ref={ref} aria-label={`${prefix}${to}${suffix}`} className="inline-flex whitespace-pre">
      {prefix && (
        <span aria-hidden data-affix className="inline-block">
          {prefix}
        </span>
      )}
      {digits.map((d, i) => {
        // Top of the strip is the final digit; it slides down from the bottom, counting up as it falls.
        const spins = 1 + i;
        const reel = Array.from({ length: spins * 10 + 1 }, (_, k) => (d - k + 100) % 10);
        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-block [clip-path:inset(0_-50%)]"
          >
            <span className="invisible">{d}</span>
            <span data-strip className="absolute inset-x-0 top-0 flex flex-col items-center">
              {reel.map((n, k) => (
                <span key={k} className="block h-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix && (
        <span aria-hidden data-affix className="inline-block">
          {suffix}
        </span>
      )}
    </span>
  );
}
