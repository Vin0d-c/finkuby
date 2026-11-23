"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui";

type Offer = {
  name: string;
  logo?: string;
  mark?: string;
  markColor?: string;
  badge?: string;
  loanType: string;
  amount: string;
  roi: string;
  tenure: string;
};

const offers: Offer[] = [
  {
    name: "HDFC Bank",
    logo: "/banks/hdfc.svg",
    badge: "Best Rate",
    loanType: "Personal Loan",
    amount: "Up to ₹23,72,479",
    roi: "10.49% p.a.",
    tenure: "12 – 84 Months",
  },
  {
    name: "State Bank of India",
    logo: "/banks/sbi.svg",
    badge: "High Eligibility",
    loanType: "Personal Loan",
    amount: "Up to ₹15,00,000",
    roi: "10.75% p.a.",
    tenure: "12 – 60 Months",
  },
  {
    name: "ICICI Bank",
    logo: "/banks/icici.svg",
    badge: "Popular",
    loanType: "Personal Loan",
    amount: "Up to ₹6,00,000",
    roi: "10.85% p.a.",
    tenure: "12 – 72 Months",
  },
  {
    name: "Bajaj Finserv",
    mark: "B",
    markColor: "#0056a4",
    loanType: "Personal Loan",
    amount: "Up to ₹5,00,000",
    roi: "11.25% p.a.",
    tenure: "12 – 60 Months",
  },
  {
    name: "Kotak Mahindra Bank",
    logo: "/banks/kotak.svg",
    loanType: "Personal Loan",
    amount: "Up to ₹4,00,000",
    roi: "11.75% p.a.",
    tenure: "12 – 60 Months",
  },
  {
    name: "Axis Bank",
    logo: "/banks/axis.svg",
    loanType: "Personal Loan",
    amount: "Up to ₹3,50,000",
    roi: "12.25% p.a.",
    tenure: "12 – 60 Months",
  },
  {
    name: "Bank of Baroda",
    mark: "B",
    markColor: "#f57c00",
    loanType: "Personal Loan",
    amount: "Up to ₹5,50,000",
    roi: "11.10% p.a.",
    tenure: "12 – 60 Months",
  },
];

/** Compare lender offers table for the dashboard. */
export function LenderOffers() {
  const [loanFilter, setLoanFilter] = useState("Personal Loan");

  return (
    <section className="rounded-[1.35rem] bg-white p-5 shadow-[0_16px_40px_rgba(26,43,86,0.08)] ring-1 ring-[#d5e3f2] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#1A2B56] sm:text-xl">
            Offers from Lenders
          </h2>
          <p className="mt-1 text-sm text-[#5b6b82]">
            Compare and choose the best loan offer for you
          </p>
        </div>
        <label className="sr-only" htmlFor="offer-loan-filter">
          Loan type
        </label>
        <select
          id="offer-loan-filter"
          value={loanFilter}
          onChange={(event) => setLoanFilter(event.target.value)}
          className="rounded-full border border-[#d5e3f2] bg-[#f8fbfe] px-4 py-2 text-sm font-semibold text-[#1A2B56] outline-none focus:border-[#40B5FF] focus:ring-3 focus:ring-[#40B5FF]/20"
        >
          <option>Personal Loan</option>
          <option>Home Loan</option>
          <option>Business Loan</option>
        </select>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#e3eaf4] text-[11px] font-semibold tracking-[0.12em] text-[#8b95a6] uppercase">
              <th className="pb-3 pr-4 font-semibold">Lender</th>
              <th className="pb-3 pr-4 font-semibold">Loan type</th>
              <th className="pb-3 pr-4 font-semibold">Loan amount</th>
              <th className="pb-3 pr-4 font-semibold">ROI (starting at)</th>
              <th className="pb-3 pr-4 font-semibold">Tenure</th>
              <th className="pb-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer.name}
                className="border-b border-[#eef3f9] last:border-b-0"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f9fd] ring-1 ring-[#e3eaf4]">
                      {offer.logo ? (
                        <Image
                          src={offer.logo}
                          alt=""
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: offer.markColor ?? "#1A2B56" }}
                        >
                          {offer.mark}
                        </span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#1A2B56]">
                        {offer.name}
                      </p>
                      {offer.badge ? (
                        <span className="mt-1 inline-flex rounded-full bg-[#e8f8ef] px-2 py-0.5 text-[10px] font-semibold text-[#1f7a45]">
                          {offer.badge}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-sm text-[#5b6b82]">
                  {offer.loanType}
                </td>
                <td className="py-4 pr-4 text-sm font-semibold text-[#1A2B56]">
                  {offer.amount}
                </td>
                <td className="py-4 pr-4 text-sm font-bold text-[#1A2B56]">
                  {offer.roi}
                </td>
                <td className="py-4 pr-4 text-sm text-[#5b6b82]">
                  {offer.tenure}
                </td>
                <td className="py-4">
                  <button
                    type="button"
                    className="rounded-full border border-[#1A2B56]/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-[#1A2B56] transition-colors hover:border-[#40B5FF] hover:text-[#40B5FF]"
                  >
                    View Offer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 border-t border-[#eef3f9] pt-4 text-center">
        <Link
          href="/#calculator"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#40B5FF] transition-colors hover:text-[#1A2B56]"
        >
          Not what you expected? Fine-tune your eligibility in the calculator
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
