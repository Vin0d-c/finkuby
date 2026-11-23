"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import CircularCarousel from "@/components/CircularCarousel";
import { banks } from "@/lib/site";
import { smoothScrollTo } from "@/lib/smooth-scroll";

function BankCard({ bank }: { bank: (typeof banks)[number] }) {
  return (
    <div className="flex h-full w-full items-center gap-5 rounded-2xl bg-white px-5 shadow-[0_18px_36px_-10px_rgba(100,224,225,0.55)] ring-1 ring-[#d4e5fb]">
      <span className="flex h-24 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#f6f9fd] px-3">
        <Image
          src={bank.logo}
          alt={`${bank.name} logo`}
          width={104}
          height={56}
          className="h-13 w-auto max-w-full object-contain"
        />
      </span>
      <div className="min-w-0">
        <p className="truncate text-lg font-bold text-[#1A2B56]">{bank.name}</p>
        <p className="mt-2 flex gap-3 text-sm whitespace-nowrap text-[#5b6b82]">
          <span>
            Rate{" "}
            <span className="font-semibold text-[#1A2B56]">{bank.rate}</span>
          </span>
          <span>
            Approval{" "}
            <span className="font-semibold text-[#16a34a]">
              {bank.approval}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}

const items = [...banks, ...banks].map((bank) => ({
  node: <BankCard bank={bank} />,
  title: bank.name,
  alt: bank.name,
}));

/** Movement (px) that turns a press into a drag, matching the carousel's own threshold. */
const DRAG_PX = 6;

/**
 * The bank wheel. It keeps rotating, hover included, until the visitor grabs it and rolls
 * it themselves; from then on it stays where they leave it (until the page is reloaded).
 * Clicking a card (without dragging) glides down to the EMI calculator.
 */
export function BankCarousel() {
  const [autoplay, setAutoplay] = useState<"drift" | "off">("drift");
  const press = useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      className="contents"
      onPointerDown={(event) => {
        press.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerMove={(event) => {
        const start = press.current;
        if (!start || autoplay === "off") return;
        if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > DRAG_PX) setAutoplay("off");
      }}
      onPointerUp={() => {
        press.current = null;
      }}
      onPointerCancel={() => {
        press.current = null;
      }}
    >
      <CircularCarousel
        items={items}
        preset="cylinder"
        intro="rise"
        cardWidth={370}
        aspectRatio={2}
        speed={22}
        captions={false}
        gap={25}
        tilt={-5}
        curve={1}
        perspective={2500}
        autoplay={autoplay}
        interval={3}
        direction="left"
        momentum={0.6}
        snap
        pauseOnHover={false}
        focusOnClick={false}
        onItemClick={() => {
          // A drag never reaches here (the carousel swallows the click after a drag).
          const calculator = document.getElementById("calculator");
          if (!calculator) return;
          smoothScrollTo(calculator);
          history.replaceState(history.state, "", "#calculator");
        }}
        draggable
        parallax={0.3}
        stretch={0.5}
        fadeColor="#ffffff"
        depthFade={0.55}
        innerShade={0.6}
        cornerRadius={12}
        innerColor="#1A2B56"
        backBlur={3}
        cardShadow="none"
        className="!overflow-visible cursor-pointer"
      />
    </div>
  );
}
