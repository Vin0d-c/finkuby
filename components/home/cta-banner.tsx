import BlurText from "@/components/ui/reactbits/BlurText";
import Magnet from "@/components/ui/reactbits/Magnet";
import { ApplyButton } from "@/components/apply-button";
import { CtaAura } from "@/components/home/cta-aura";
import {
  ArrowUpRight,
  Icon,
  highlight,
  primaryButtonIcon,
} from "@/components/ui";

const badges = [
  { label: "RBI Regulated", icon: "shield" as const },
  { label: "256-bit Encryption", icon: "lock" as const },
  { label: "No Hidden Charges", icon: "check" as const },
];

export function CtaBanner() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#eaf7fd_0%,#f6fbff_45%,#eef4ff_100%)] px-6 py-16 text-center text-[#0b2347] ring-1 ring-[#dcebf8] shadow-[0_30px_70px_rgba(22,82,156,0.10)] sm:px-12 sm:py-20">
        {/* Aura: sky, royal blue and a touch of violet from the site palette, drifting softly. */}
        <CtaAura />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,rgba(22,82,156,0.35)_1px,transparent_1.2px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,#000_80%)]"
        />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#2f7fe8] uppercase">
            Apply in under 2 minutes • 100% Secure
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] font-black tracking-[-0.03em]">
            Empower Your Financial Future{" "}
            <span className={highlight}>With Finkuby</span>
          </h2>
          <BlurText
            text="Don’t let paperwork hold your dreams back. Get matched with top Indian lenders offering optimized interest rates, and secure disbursals in record time."
            className="mx-auto mt-5 max-w-2xl justify-center gap-x-[0.28em] text-base leading-relaxed text-[#3d4f69]"
            delay={40}
            stepDuration={0.4}
          />
          {/* Equal 90px gaps centre the button between the copy and the badges; same total height as before. */}
          <div className="mt-[90px] flex justify-center">
            <Magnet padding={60} magnetStrength={3} disabled={false}>
              <ApplyButton
                size="lg"
                fallbackClassName="group inline-flex items-center gap-3 rounded-full bg-[#3ab6fc] py-2 pr-2 pl-7 text-base font-semibold text-white transition-colors hover:bg-[#67c8ff]"
              >
                Get Started Now
                <span className={primaryButtonIcon}>
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </ApplyButton>
            </Magnet>
          </div>
          <ul className="mt-[90px] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[#3d4f69]">
            {badges.map((badge) => (
              <li key={badge.label} className="flex items-center gap-2">
                <Icon name={badge.icon} className="h-4 w-4 text-[#3ab6fc]" />
                {badge.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
