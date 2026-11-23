import BlurText from "@/components/ui/reactbits/BlurText";
import Magnet from "@/components/ui/reactbits/Magnet";
import { ApplyButton } from "@/components/apply-button";
import { CtaAura } from "@/components/home/cta-aura";
import { ArrowUpRight, Icon } from "@/components/ui";
import { ELIGIBILITY_URL } from "@/lib/site";

const badges = [
  { label: "RBI Regulated", icon: "shield" as const },
  { label: "256-bit Encryption", icon: "lock" as const },
  { label: "No Hidden Charges", icon: "check" as const },
];

export function CtaBanner() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#1A2B56] px-6 py-16 text-center shadow-[0_30px_70px_rgba(26,43,86,0.35)] ring-1 ring-[#40B5FF]/25 sm:px-12 sm:py-20">
        {/* Aura: light blue + cyan lifts on the navy field. */}
        <CtaAura />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(circle,rgba(64,181,255,0.55)_1px,transparent_1.2px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,#000_80%)]"
        />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#40B5FF] uppercase">
            Apply in under 2 minutes • 100% Secure
          </p>
          <h2 className="font-agrandir mx-auto mt-5 max-w-3xl text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.03em] text-white">
            Empower Your Financial Future{" "}
            <span className="text-[#40B5FF]">With Finkuby</span>
          </h2>
          <BlurText
            text="Don’t let paperwork hold your dreams back. Get matched with top Indian lenders offering optimized interest rates, and secure disbursals in record time."
            className="mx-auto mt-5 max-w-2xl justify-center gap-x-[0.28em] text-base leading-relaxed text-[#64E0E1]"
            delay={40}
            stepDuration={0.4}
          />
          {/* Equal 90px gaps centre the button between the copy and the badges; same total height as before. */}
          <div className="mt-[90px] flex justify-center">
            <Magnet padding={60} magnetStrength={3} disabled={false}>
              <ApplyButton
                href={ELIGIBILITY_URL}
                size="lg"
                tint="#40B5FF"
                textColor="#ffffff"
                fallbackClassName="group inline-flex items-center gap-3 rounded-full bg-[#40B5FF] py-2 pr-2 pl-9 text-base font-semibold text-white shadow-[0_14px_28px_rgba(64,181,255,0.35)] transition-colors hover:bg-[#64E0E1]"
              >
                Get Started Now
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1A2B56] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </ApplyButton>
            </Magnet>
          </div>
          <ul className="mt-[90px] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[#64E0E1]">
            {badges.map((badge) => (
              <li key={badge.label} className="flex items-center gap-2">
                <Icon name={badge.icon} className="h-4 w-4 text-[#64E0E1]" />
                {badge.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
