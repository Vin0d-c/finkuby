"use client";

import { useSyncExternalStore } from "react";
import BounceCards from "@/components/ui/reactbits/BounceCards";
import { teamPhotos } from "@/lib/site";

const WIDE = "(min-width: 768px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const images = teamPhotos.map((photo, i) => ({
  src: photo.src,
  alt: `Finkuby team moment ${i + 1} of ${teamPhotos.length}`,
}));

/** Employee corner photos as a fanned stack. Sized per breakpoint so it never overflows a phone. */
export function TeamBounce() {
  const wide = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(WIDE).matches,
    () => false,
  );
  const size = wide
    ? { width: 1100, height: 360, card: 200, spread: 76, shown: images.length }
    : { width: 340, height: 220, card: 110, spread: 44, shown: 6 };

  return (
    <div
      role="group"
      aria-label="Employee corner photos"
      className="mx-auto flex justify-center overflow-hidden py-4"
    >
      <BounceCards
        key={size.shown}
        images={images.slice(0, size.shown)}
        containerWidth={size.width}
        containerHeight={size.height}
        cardSize={size.card}
        spread={size.spread}
        rotation={9}
        borderColor="#ffffff"
        radius={22}
        pushDistance={wide ? 70 : 0}
        enableHover={wide}
      />
    </div>
  );
}
