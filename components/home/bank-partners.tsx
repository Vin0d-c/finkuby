import { BankCarousel } from "@/components/home/bank-carousel";

export function BankPartners() {
  return (
    <section
      id="partners"
      className="relative flex min-h-svh flex-col overflow-x-clip bg-white pt-24 pb-28"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-agrandir whitespace-nowrap text-[clamp(1.5rem,3.4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.03em] text-[#1A2B56]">
            Our Associated Banking Partners
          </h2>
        </div>
      </div>

      <div className="relative my-auto h-[260px] w-full sm:h-[clamp(280px,42svh,440px)]">
        {/*
          Glow sits outside the carousel mask and can spill into section padding,
          so it isn’t chopped by overflow-hidden / mask edges.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[22%] -bottom-24 z-0"
        >
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side ellipse at 50% 40%, rgba(100,224,225,0.9) 0%, rgba(100,224,225,0.5) 38%, rgba(100,224,225,0.18) 68%, rgba(100,224,225,0) 100%)",
            }}
          />
          <div
            className="absolute inset-x-[10%] top-[46%] h-[55%] blur-2xl"
            style={{
              background:
                "radial-gradient(closest-side ellipse at 50% 0%, rgba(100,224,225,0.7) 0%, rgba(100,224,225,0.3) 55%, transparent 100%)",
            }}
          />
        </div>

        <div
          className="relative z-[1] h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 6%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 4%, #000 96%, transparent), linear-gradient(to bottom, transparent, #000 6%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <BankCarousel />
        </div>
      </div>
    </section>
  );
}
