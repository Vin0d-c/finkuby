"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const DEFAULT_WORDS = ["PAPERLESS", "RBI REGULATED", "INSTANT"];
const FACES = 12;
const STEP = 360 / FACES;
/** Drum radius in em, so one line of text (plus spacing) fills each face. */
const RADIUS_EM = 0.58 / Math.tan(Math.PI / FACES);

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Lines of text on a 3D cylinder that turns, pausing on each word, as the page scrolls. */
export function ThreeDTextReveal({ words = DEFAULT_WORDS }: { words?: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const paint = (progress: number) => {
    const drum = drumRef.current;
    if (!drum) return;
    const span = clamp(progress, 0, 1) * (words.length - 1);
    const index = Math.min(Math.floor(span), words.length - 2);
    const turn = (index + easeInOut(clamp((span - index - 0.2) / 0.6, 0, 1))) * STEP;
    drum.style.transform = `rotateX(${turn}deg)`;
    faceRefs.current.forEach((face, i) => {
      if (!face) return;
      const off = Math.abs(wrap(i * STEP - turn));
      face.style.opacity = off >= 90 ? "0" : Math.pow(Math.cos((off * Math.PI) / 180), 8).toFixed(3);
      face.style.filter = `blur(${Math.min(6, off / 7).toFixed(1)}px)`;
    });
  };

  useMotionValueEvent(scrollYProgress, "change", paint);
  useLayoutEffect(() => paint(scrollYProgress.get()));

  return (
    <section
      ref={sectionRef}
      aria-label={words.join(", ")}
      className="relative h-[260svh] bg-[linear-gradient(180deg,#d7f1fb,#eef8fe_35%,#ffffff)]"
    >
      <div
        className="sticky top-0 flex h-svh items-center justify-center overflow-hidden"
        style={{
          perspective: "1400px",
          maskImage: "linear-gradient(to bottom, transparent 8%, #000 32%, #000 68%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 8%, #000 32%, #000 68%, transparent 92%)",
        }}
      >
        <div
          ref={drumRef}
          aria-hidden
          className="relative h-0 w-0 text-[clamp(2.6rem,10vw,9.5rem)] [transform-style:preserve-3d]"
        >
          {Array.from({ length: FACES }, (_, i) => (
            <span
              key={i}
              ref={(el) => {
                faceRefs.current[i] = el;
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,#0b2347,#16529c_45%,#3b8ef8)] bg-clip-text leading-none font-black tracking-[-0.04em] whitespace-nowrap text-transparent [backface-visibility:hidden]"
              style={{ transform: `rotateX(${-i * STEP}deg) translateZ(${RADIUS_EM}em)` }}
            >
              {words[i % words.length]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
