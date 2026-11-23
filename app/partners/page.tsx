import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero, PageShell } from "@/components/page-shell";
import { PartnerSignupButton } from "@/components/partners/partner-signup";
import { PartnerWordmark } from "@/components/partners/partner-wordmark";
import { MagnetLinesLazy } from "@/components/ui/reactbits/lazy";
import { WebglOnView } from "@/components/webgl-slots";
import {
  ArrowUpRight,
  Eyebrow,
  Icon,
  SectionHeading,
  highlightOnDark,
  primaryButtonIcon,
} from "@/components/ui";
import { partnerBenefits, partnerSteps, partnerTypes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner Program | Finkuby - Multi-Agent Referral Network",
  description:
    "Join the Finkuby Partner Network. Become a registered referral agent (DSA, CA, Financial Advisor) to unlock automated multi-lender credit matches and top payouts.",
  keywords: [
    "finkuby partner",
    "loan referral agent dsa",
    "ca loan referral payouts",
    "financial advisor credit matching",
    "multi-lender agent console",
    "dsa agent onboarding",
  ],
  alternates: { canonical: "/partners" },
  openGraph: { url: "/partners" },
};

export default function PartnersPage() {
  return (
    <PageShell>
      <InnerHero>
        <div>
          <Eyebrow tone="dark">Finkuby Partner Network</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-black tracking-[-0.035em]">
            Join the Multi-Agent{" "}
            <span className={`block ${highlightOnDark}`}>
              Financial Revolution
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c5d3e8] sm:text-lg">
            Connect your customer base to India&apos;s premier multi-lender
            network. Become a registered Finkuby partner to unlock automated
            bank matches, instant document assessments, and industry-leading
            commission payouts.
          </p>
          <PartnerSignupButton className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#1A2B56] py-2 pr-2 pl-7 text-base font-semibold text-white transition-colors hover:bg-[#1A2B56]">
            Become Partner
            <span className={primaryButtonIcon}>
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </PartnerSignupButton>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
          <Image
            src="/partners/hero.jpg"
            alt="Two professionals shaking hands in an office"
            fill
            preload
            sizes="(min-width: 1024px) 45vw, 95vw"
            className="object-cover"
          />
        </div>
      </InnerHero>

      <section className="relative overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="stage-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
        />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            title="Why Partner"
            accent="With Us?"
            body="Finkuby integrates multi-lending networks and digital workflows directly, letting you maximize your commission conversion rate with no paperwork friction."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl bg-white p-7 ring-1 ring-[#e3eaf4] shadow-[0_20px_50px_rgba(26,43,86,0.06)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A2B56] text-white">
                  <Icon name={benefit.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-black tracking-tight text-[#1A2B56]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#5b6b82]">
                  {benefit.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fd] py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            title="Who Can Become"
            accent="Partner to Finkuby"
            body="Our partner console is optimized to serve all financial intermediaries, tax professionals, and loan referral networks across India."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnerTypes.map((type) => (
              <li
                key={type.title}
                className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-[#e3eaf4]"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#40B5FF]/15 text-[#1A2B56]">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-bold text-[#1A2B56]">{type.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#5b6b82]">
                    {type.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1A2B56] py-24 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -bottom-1/2 h-[900px] w-[900px] rounded-full bg-[#1A2B56]"
        />
        <WebglOnView className="pointer-events-none absolute inset-0 opacity-60">
          <MagnetLinesLazy
            spacing={44}
            lineColor="#40B5FF"
            accentColor="#64E0E1"
            lineWidth={2}
            lineHeight={16}
            radius={180}
          />
        </WebglOnView>
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            tone="dark"
            title="Start Your Journey in"
            accent="4 Easy Steps"
            body="Follow these simple milestones to activate your console and start processing borrower folders."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerSteps.map((step) => (
              <li
                key={step.step}
                className="rounded-3xl bg-white/[0.07] p-7 ring-1 ring-white/12 backdrop-blur-sm"
              >
                <span className="text-xs font-semibold tracking-[0.16em] text-[#40B5FF] uppercase">
                  {step.step}
                </span>
                <h3 className="mt-3 text-xl font-black tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c5d3e8]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <PartnerWordmark />
          </div>
          <div className="flex justify-center">
            <PartnerSignupButton className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 text-[15px] font-semibold text-[#1A2B56] shadow-[0_14px_28px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#e7f3ff]">
              Register as a Partner
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2B56] text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </PartnerSignupButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
