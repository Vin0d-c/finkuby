"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui";
import { ApplicationProgress } from "@/components/dashboard/application-progress";
import { CibilScore } from "@/components/dashboard/cibil-score";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LenderOffers } from "@/components/dashboard/lender-offers";
import {
  formatInr,
  peekEligibilityResult,
} from "@/lib/eligibility-result";

const cardClass =
  "rounded-[1.35rem] bg-white p-5 shadow-[0_16px_40px_rgba(26,43,86,0.08)] ring-1 ring-[#d5e3f2] sm:p-6";

export function DashboardView() {
  const [amountLabel, setAmountLabel] = useState<string | null>(null);
  const greetingName = "Madhu";

  useEffect(() => {
    const result = peekEligibilityResult();
    if (result) setAmountLabel(formatInr(result.finkubyAmount));
  }, []);

  return (
    <>
      <DashboardHeader />

      <div className="relative mx-auto max-w-[1280px] px-5 pt-8 pb-12 sm:px-8 lg:px-12 lg:pt-10">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,22rem)] lg:gap-8">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1A2B56]/8 px-3 py-1.5 text-xs font-semibold text-[#1A2B56] ring-1 ring-[#1A2B56]/12">
              <Icon name="check" className="h-3.5 w-3.5 text-[#40B5FF]" />
              Account created
            </span>
            <h1 className="font-agrandir mt-4 text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.03em] text-[#1A2B56]">
              Welcome {greetingName}!
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#5b6b82]">
              Your Finkuby account is ready. Track applications, offers, and
              next steps from this dashboard.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <article className={cardClass}>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8b95a6] uppercase">
                  Application status
                </p>
                <p className="mt-3 text-xl font-bold text-[#1A2B56]">In review</p>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6b82]">
                  We&apos;re matching you with partner banks.
                </p>
              </article>

              <article className={cardClass}>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8b95a6] uppercase">
                  Estimated eligibility
                </p>
                <p className="font-agrandir mt-3 text-xl font-bold text-[#1A2B56]">
                  {amountLabel ?? "—"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6b82]">
                  Based on the details you shared.
                </p>
              </article>

              <article className={`${cardClass} sm:col-span-2 xl:col-span-1`}>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8b95a6] uppercase">
                  Next step
                </p>
                <p className="mt-3 text-xl font-bold text-[#1A2B56]">
                  RM follow-up
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6b82]">
                  A relationship manager will reach out shortly.
                </p>
              </article>
            </div>
          </div>

          <ApplicationProgress />
        </div>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,22rem)] lg:gap-5">
          <LenderOffers />
          <CibilScore />
        </div>
      </div>
    </>
  );
}
