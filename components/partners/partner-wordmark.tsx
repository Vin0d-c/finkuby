"use client";

import dynamic from "next/dynamic";

const wordmark = "text-[clamp(3rem,9vw,6rem)] leading-none font-black tracking-[-0.04em]";

/** Real text for SEO / no-JS / while the canvas chunk loads. ParticleText adds its own sr-only copy. */
const Fallback = () => (
  <span className={`${wordmark} block text-center text-white`}>Finkuby</span>
);

const ParticleText = dynamic(
  () => import("@/components/ui/reactbits/ParticleText"),
  { ssr: false, loading: Fallback },
);

/** Particle-text "Finkuby" wordmark for the partners CTA. Canvas 2D, no WebGL. */
export function PartnerWordmark() {
  return (
    <div className="mx-auto mb-10 h-[clamp(5rem,14vw,9rem)] w-full max-w-3xl">
      <ParticleText
        text="Finkuby"
        color="#ffffff"
        highlightColor="#3ab6fc"
        fontSize="clamp(3rem,9vw,6rem)"
        fontWeight={900}
        intro="gather"
        trigger="mount"
        particleSize={2}
        density={5}
      />
    </div>
  );
}
