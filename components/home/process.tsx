"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

const stages = [
  {
    image: "/step1.png",
    title: "Choose. Check. Connect.",
    subtitle: "Your journey starts here.",
    bullets: [
      "loan type.",
      "loan eligibility.",
      "Connect securely using your mobile number.",
    ],
  },
  {
    image: "/step2.png",
    title: "Let Finkuby Work Its Magic",
    subtitle: "We handle the heavy lifting.",
    bullets: ["connect banks.", "loan application.", "required documents."],
  },
  {
    image: "/step3.png",
    title: "Loan Disbursal",
    subtitle: "Your finances, back on track.",
    bullets: ["Approval", "loan disbursal"],
  },
] as const;

const easeOpen = [0.22, 1, 0.36, 1] as const;
const ARC_PX = 56;
const GAP_PX = 12;

function StageCard({ stage }: { stage: (typeof stages)[number] }) {
  return (
    <article className="relative z-0 flex h-[10.5rem] w-full min-w-0 items-stretch overflow-hidden rounded-full border-[3px] border-[#1A2B56] bg-[linear-gradient(165deg,#dff1ff_0%,#f3f9ff_42%,#ffffff_100%)] pr-5 shadow-[0_0_22px_rgba(100,224,225,0.7),0_0_56px_rgba(100,224,225,0.45)] sm:h-[11.5rem] sm:pr-6">
      <div className="relative aspect-square h-full w-auto shrink-0 overflow-hidden rounded-full bg-[#eaf6ff]">
        <Image
          src={stage.image}
          alt=""
          fill
          sizes="184px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-2 pl-3 sm:pl-4">
        <h3 className="text-[12px] leading-snug font-bold tracking-tight text-[#1A2B56] sm:text-[13px]">
          {stage.title}
        </h3>
        <p className="mt-0.5 text-[10px] font-normal text-[#8b95a6] sm:text-[11px]">
          {stage.subtitle}
        </p>
        <ul className="mt-1.5 space-y-0.5 text-[9px] leading-snug text-[#40B5FF] sm:text-[10px]">
          {stage.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-1.5">
              <span
                aria-hidden
                className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full bg-[#40B5FF]"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CrescentSvg() {
  return (
    <svg viewBox="0 0 56 120" className="h-full w-full text-[#64E0E1]" aria-hidden>
      <path
        fill="currentColor"
        d="M4 2c30 12 46 34 46 58S34 106 4 118c20-12 30-30 30-58S24 14 4 2z"
      />
    </svg>
  );
}

function DesktopFan({ reduce }: { reduce: boolean | null }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, amount: 0.35 });
  const [slot, setSlot] = useState(0);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      const width = el.clientWidth;
      setSlot(Math.max(0, (width - 2 * ARC_PX - 2 * GAP_PX) / 3));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const open = reduce || inView;
  const step = slot + ARC_PX + GAP_PX;
  const ready = slot > 0;

  return (
    <div
      ref={trackRef}
      className="relative mt-16 hidden h-[12rem] w-full lg:block xl:h-[13rem]"
    >
      {stages.map((stage, i) => (
        <motion.div
          key={stage.title}
          className="absolute inset-y-0 left-0 flex items-center"
          style={{
            width: ready ? slot : undefined,
            zIndex: stages.length - i,
          }}
          initial={false}
          animate={
            !ready
              ? { x: 0, opacity: i === 0 ? 1 : 0, scale: 1 }
              : open
                ? { x: i * step, opacity: 1, scale: 1 }
                : {
                    x: 0,
                    opacity: i === 0 ? 1 : 0.55,
                    scale: i === 0 ? 1 : 0.94,
                  }
          }
          transition={{
            duration: reduce ? 0 : 0.9,
            delay: reduce || !open ? 0 : 0.06 + i * 0.14,
            ease: easeOpen,
          }}
        >
          <StageCard stage={stage} />
        </motion.div>
      ))}

      {[0, 1].map((i) => (
        <motion.div
          key={`arc-${i}`}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 flex origin-left items-center"
          style={{ width: ARC_PX, zIndex: 1 }}
          initial={false}
          animate={
            !ready
              ? { x: 0, opacity: 0, scale: 0.35, rotate: -24 }
              : open
                ? {
                    x: (i + 1) * slot + i * (ARC_PX + GAP_PX) - 8,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }
                : { x: 0, opacity: 0, scale: 0.35, rotate: -24 }
          }
          transition={{
            duration: reduce ? 0 : 0.75,
            delay: reduce || !open ? 0 : 0.22 + i * 0.14,
            ease: easeOpen,
          }}
        >
          <div className="h-[11rem] w-full xl:h-[12rem]">
            <CrescentSvg />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative overflow-clip bg-white pt-14 pb-32 text-[#1A2B56] sm:pt-16 sm:pb-40"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-agrandir text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.03em] text-[#1A2B56]">
            Your Loan Journey, Simplified
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#40B5FF] sm:text-lg">
            Three simple stages, From finding the right loan to getting it
            disbursed.
          </p>
        </div>

        {/* Mobile: stack downward from the first capsule. */}
        <div className="mt-14 flex flex-col gap-10 lg:hidden">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={
                reduce ? false : { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: reduce ? 0 : 0.7,
                delay: reduce ? 0 : i * 0.12,
                ease: easeOpen,
              }}
            >
              <StageCard stage={stage} />
            </motion.div>
          ))}
        </div>

        {/* Desktop: stack on the first capsule, then fan open with arcs. */}
        <DesktopFan reduce={reduce} />
      </div>
    </section>
  );
}
