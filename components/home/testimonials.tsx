"use client";

import { useState } from "react";
import { Eyebrow, Icon } from "@/components/ui";
import { ReflectiveCardLazy } from "@/components/ui/reactbits/lazy";
import { WebglSwap } from "@/components/webgl-slots";
import { testimonials } from "@/lib/site";

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
        <figure
          className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-[#e3eaf4] shadow-[0_20px_50px_rgba(11,35,71,0.06)]"
        >
          <Icon name="quote" className="h-8 w-8 text-[#3ab6fc]" />
          <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#3d4f69]">
            “{item.quote}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-[#eef2f8] pt-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16529c] text-sm font-bold text-white">
              {item.initials}
            </span>
            <span>
              <span className="block font-bold text-[#0b2347]">
                {item.name}
              </span>
              <span className="block text-xs text-[#5b6b82]">
                {item.role} • {item.company}
              </span>
            </span>
          </figcaption>
        </figure>
  );
}

/** Metallic ReflectiveCard (WebGL, no camera) laid over the plain card while a slot is free. */
function ReflectiveOverlay({ item }: { item: Testimonial }) {
  return (
    <WebglSwap className="absolute inset-0" fallback={null}>
      <ReflectiveCardLazy width="100%" height="100%" theme="light" shade={0.55}>
        <Icon name="quote" className="h-8 w-8" />
        <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">
          “{item.quote}”
        </blockquote>
        <p className="mt-6 text-lg font-medium">{item.name}</p>
        <p className="text-xs opacity-70">
          {item.role} • {item.company}
        </p>
      </ReflectiveCardLazy>
    </WebglSwap>
  );
}

export function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? 0;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <Eyebrow>Customer Reviews</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.1] font-medium tracking-[-0.025em] md:whitespace-nowrap">
            <span className="metal-blue-text">Loved by Thousands of Indian Borrowers</span>
          </h2>
        </div>

        <div
          className="mt-14 grid gap-5 lg:grid-cols-3"
          onPointerLeave={() => setHovered(null)}
        >
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHovered(index);
              }}
            >
              <TestimonialCard item={item} />
              {index === active && <ReflectiveOverlay item={item} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
