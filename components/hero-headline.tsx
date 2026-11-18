"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/** Hero title: words blur and rise in. */
export function HeroHeadline() {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const words = el.querySelectorAll("[data-hw]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, yPercent: 70, filter: "blur(14px)" },
        {
          opacity: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          delay: 0.15,
          clearProps: "transform,filter",
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <span ref={ref}>
      <span className="block text-[#0b2347]">
        <span data-hw className="inline-block">
          Loans
        </span>{" "}
        <span data-hw className="inline-block">
          Made
        </span>
      </span>
      <span className="block">
        <span
          data-hw
          className="inline-block text-white"
        >
          Simple.
        </span>
      </span>
    </span>
  );
}
