import { SectionHeading } from "@/components/ui";
import { BankCarousel } from "@/components/home/bank-carousel";

export function BankPartners() {
  return (
    <section
      id="partners"
      className="relative flex min-h-svh flex-col overflow-hidden bg-white pt-24 pb-4"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <SectionHeading title="Our Associated" accent="Banking Partners" />
      </div>
      <div
        className="relative my-auto h-[260px] w-full sm:h-[clamp(280px,42svh,440px)]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 6%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 6%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] top-[38%] bottom-0 blur-xl"
          style={{
            background:
              "radial-gradient(closest-side ellipse at 50% 55%, rgba(59,142,248,0.55) 0%, rgba(58,182,252,0.28) 45%, rgba(58,182,252,0.08) 75%, rgba(58,182,252,0) 100%)",
          }}
        />
        <BankCarousel />
      </div>
    </section>
  );
}
