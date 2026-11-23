import type { Metadata } from "next";
import { EligibilityForm } from "@/components/eligibility/eligibility-form";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Tell Us What You Need | Finkuby",
  description:
    "Let us know what you're looking for. Share a few simple details about your loan requirements, and we'll help you find the right loan that suits your needs.",
  alternates: { canonical: "/eligibility" },
  openGraph: { url: "/eligibility" },
};

export default function EligibilityPage() {
  return (
    <>
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
        <EligibilityForm />
      </main>
      <SiteFooter />
    </>
  );
}
