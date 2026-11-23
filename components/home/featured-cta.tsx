"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";
import StarBorder from "@/components/ui/reactbits/StarBorder";
import { selectEligibilityLoan } from "@/lib/eligibility-selection";
import { ELIGIBILITY_URL, type CalculatorProductKey } from "@/lib/site";

/** "Apply & Check Eligibility" pill with an orbiting star border, for the featured product card. */
export function FeaturedCta({ product }: { product?: CalculatorProductKey }) {
  return (
    <StarBorder
      as={Link}
      href={ELIGIBILITY_URL}
      onClick={() => {
        if (product) selectEligibilityLoan(product);
      }}
      theme="light"
      color="#1A2B56"
      backgroundColor="#eef5fd"
      borderColor="#cfe0f4"
      textColor="#1A2B56"
      radius={999}
      className="mt-6 self-start px-5 py-2.5 text-sm font-semibold"
    >
      Apply &amp; Check Eligibility
      <Icon name="arrowRight" className="h-4 w-4" />
    </StarBorder>
  );
}
