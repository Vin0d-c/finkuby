import type { Metadata } from "next";
import { EligibilityOptions } from "@/components/eligibility/eligibility-options";

export const metadata: Metadata = {
  title: "Woohoo! You're eligible! | Finkuby",
  description:
    "Your estimated loan amount looks eligible. Just share your details and let Finkuby handle the rest!",
  alternates: { canonical: "/eligibility/continue" },
  openGraph: { url: "/eligibility/continue" },
};

export default function EligibilityContinuePage() {
  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[linear-gradient(160deg,#eaf7fd_0%,#f6fbff_42%,#ffffff_100%)] text-[#1A2B56]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,rgba(26,43,86,0.28)_1px,transparent_1.2px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,#000_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-[28rem] w-[28rem] rounded-full bg-[#64E0E1]/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[#64E0E1]/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[42%] left-[48%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#64E0E1]/30 blur-3xl"
      />
      <EligibilityOptions />
    </main>
  );
}
