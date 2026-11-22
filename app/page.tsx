import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalculatorLink } from "@/components/calculator-link";
import { HeroHeadline } from "@/components/hero-headline";
import { SiteHeader } from "@/components/site-header";
import { Stats } from "@/components/home/stats";
import CurvedLoop from "@/components/ui/reactbits/CurvedLoop";
import { TrainIn } from "@/components/train-in";
import { Products } from "@/components/home/products";
import { Process } from "@/components/home/process";
import { EmiCalculator } from "@/components/home/emi-calculator";
import { BankPartners } from "@/components/home/bank-partners";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Finkuby | Smart Loans & Paperless Credit Solutions for India",
  description:
    "Finkuby connects businesses and salaried professionals with RBI-regulated bank partners instantly. Get zero collateral loans, automated matching, and fast disbursals.",
  keywords: [
    "paperless credit solutions",
    "smart loans india",
    "instant business loans",
    "bank matchmaking fintech",
    "finkuby personal loans",
    "digital finance india",
  ],
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <main>
        <section
          id="top"
          aria-label="Loans made simple"
          className="relative z-10 h-svh min-h-[600px] overflow-x-clip overflow-y-visible bg-[linear-gradient(to_bottom,#d7f1fb_0%,#d7f1fb_55%,#e9f7fd_80%,#ffffff_100%)] text-[#0b2347]"
        >
          {/* z-40: above the orbit (z-30) so the nav dropdowns open over its bubbles. */}
          <header className="absolute inset-x-0 top-0 z-40">
            <SiteHeader variant="hero" />
          </header>
          <div aria-hidden className="neon-header-spill" />
          <div aria-hidden className="neon-header-tube" />

          <div className="absolute top-[54%] left-[66%] z-30 w-[clamp(12rem,18.4vw,17.6rem)] -translate-x-[14.6%] -translate-y-1/2">
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2">
              <div
                className="orbit-spin-outer pointer-events-none absolute inset-0"
                style={{ transformOrigin: "center", animation: "hero-orbit-spin 28s linear infinite" }}
              >
                <svg aria-hidden viewBox="0 0 240 240" className="h-full w-full overflow-visible">
                  <circle cx="120" cy="120" r="104" fill="none" stroke="#3b8ef8" strokeWidth="0.7" />
                  <circle cx="120" cy="16" r="6" fill="#5aa6ff" />
                </svg>
                <Link
                  href="/#product-home-loan"
                  aria-label="Home Loan"
                  className="orbit-bubble group pointer-events-auto absolute aspect-square w-[12.5%]"
                  style={{ left: "93.333%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <span
                    className="orbit-face-outer block h-full w-full"
                    style={{ transformOrigin: "center", animation: "hero-orbit-spin 28s linear infinite reverse" }}
                  >
                    <span className="orbit-bubble-scale flex h-full w-full items-center justify-center rounded-full bg-[#3b8ef8] transition-transform duration-300 group-hover:scale-110">
                      <Image src="/orbit-home.png" alt="" width={1350} height={1350} unoptimized draggable={false} className="h-auto w-[59%]" />
                    </span>
                  </span>
                </Link>
                <Link
                  href="/#product-used-car-loan"
                  aria-label="Used Car Loan"
                  className="orbit-bubble group pointer-events-auto absolute aspect-square w-[10%]"
                  style={{ left: "6.667%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                  <span
                    className="orbit-face-outer block h-full w-full"
                    style={{ transformOrigin: "center", animation: "hero-orbit-spin 28s linear infinite reverse" }}
                  >
                    <span className="orbit-bubble-scale flex h-full w-full items-center justify-center rounded-full bg-[#3b8ef8] transition-transform duration-300 group-hover:scale-110">
                      <Image src="/orbit-car.png" alt="" width={1437} height={1437} unoptimized draggable={false} className="h-auto w-[74%]" />
                    </span>
                  </span>
                </Link>
              </div>
              <div
                className="orbit-spin-inner pointer-events-none absolute inset-0"
                style={{ transformOrigin: "center", animation: "hero-orbit-spin 9s linear infinite reverse" }}
              >
                <svg aria-hidden viewBox="0 0 240 240" className="h-full w-full overflow-visible">
                  <circle cx="120" cy="120" r="68" fill="none" stroke="#3b8ef8" strokeWidth="0.55" />
                </svg>
                <Link
                  href="/#product-personal-loan"
                  aria-label="Personal Loan"
                  className="orbit-bubble group pointer-events-auto absolute aspect-square w-[7.92%]"
                  style={{ left: "68.75%", top: "28.75%", transform: "translate(-50%, -50%)" }}
                >
                  <span
                    className="orbit-face-inner block h-full w-full"
                    style={{ transformOrigin: "center", animation: "hero-orbit-spin 9s linear infinite" }}
                  >
                    <span className="orbit-bubble-scale flex h-full w-full items-center justify-center rounded-full bg-[#3b8ef8] transition-transform duration-300 group-hover:scale-110">
                      <Image src="/orbit-per.png" alt="" width={1245} height={1245} unoptimized draggable={false} className="h-auto w-[40%]" />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square rounded-full">
              <div aria-hidden className="hero-ring hero-ring-a" />
              <div aria-hidden className="hero-ring hero-ring-b" />
              <div aria-hidden className="hero-ring hero-ring-c" />
              {/* Clip to the rings' inner hole; scale so logo10's dark disk fills it (no light-blue gap). */}
              {/* Exactly the ring hole (52%) so it doesn't eat the first band or leave a light gap. */}
              <div className="absolute top-1/2 left-1/2 z-[1] aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#0b2347]">
                <Image
                  src="/logo10.png"
                  alt="Finkuby"
                  data-hero-mark
                  width={2000}
                  height={2000}
                  preload
                  draggable={false}
                  className="absolute top-1/2 left-1/2 h-[180%] w-[180%] max-w-none -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-[5%] top-[22%] z-10 lg:inset-x-[7%] lg:top-[24%]">
            <h1 className="max-w-[min(40rem,46vw)] text-[clamp(2.65rem,5.1vw,4.85rem)] leading-[0.94] font-black tracking-[-0.035em]">
              <HeroHeadline />
            </h1>
            <div className="relative mt-40 flex w-fit flex-col items-center lg:mt-56">
              <p className="absolute bottom-full left-0 mb-4 w-[54vw] text-[11.5px] leading-snug font-medium text-[#0b2347] md:mb-5 md:w-[min(27rem,39vw)] md:text-[13px] lg:mb-6 lg:w-[min(27rem,42vw)] lg:text-[15px] lg:leading-relaxed">
                <span className="block font-bold">The right loan, without the legwork.</span>
                <span className="text-[#0b2347]/80">
                  Finkuby finds financing options that fit your needs, connects you with the right banking partners, and
                  takes care of the process. You apply. We handle the rest.
                </span>
              </p>
              <CalculatorLink
                className="group inline-flex items-center gap-4 rounded-full bg-[#0b2347] py-2 pr-2 pl-7 text-base font-semibold whitespace-nowrap text-white shadow-[0_14px_28px_rgba(11,35,71,0.28)] transition-colors hover:bg-[#163a6b]"
              >
                Apply instantly
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0b2347] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M9 7h8v8" />
                  </svg>
                </span>
              </CalculatorLink>
              <a
                href="#how-it-works"
                className="mt-3 text-[15px] font-medium text-[#0b2347]/75 underline decoration-dotted decoration-2 underline-offset-[6px] transition-colors hover:text-[#0b2347]"
              >
                How it works?
              </a>
            </div>
          </div>
        </section>
        <div className="overflow-hidden bg-white pt-36 pb-10 [&>div>div]:min-h-0">
          {/* Arrives like a train the first time it comes into view. */}
          <TrainIn>
            <CurvedLoop
              marqueeText="Paperless · Instant · RBI regulated ·"
              color="#16529c"
              fontSize={48}
              curveAmount={80}
              speed={1}
              edgeFade={0.1}
            />
          </TrainIn>
        </div>
        <Stats />
        <Products />
        <Process />
        <EmiCalculator />
        <BankPartners />
        <Testimonials />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
