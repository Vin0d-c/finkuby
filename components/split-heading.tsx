"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/** Word-by-word rise-in headline (React Bits "Split Text" style). The accent animates as one unit so its gradient survives. */
export function SplitHeading({
  title,
  accent,
  accentClass,
}: {
  title: string;
  accent: string;
  accentClass: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const words = el.querySelectorAll("[data-w]");
    gsap.set(words, { opacity: 0, yPercent: 60 });
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        gsap.to(words, {
          opacity: 1,
          yPercent: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "transform",
        });
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      gsap.killTweensOf(words);
    };
  }, []);

  return (
    <span ref={ref}>
      {title.split(" ").map((w, i) => (
        <span key={i} data-w className="inline-block">
          {w}&nbsp;
        </span>
      ))}
      <span data-w className={`inline-block ${accentClass}`}>
        {accent}
      </span>
    </span>
  );
}
