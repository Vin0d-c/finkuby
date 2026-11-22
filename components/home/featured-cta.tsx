"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";
import StarBorder from "@/components/ui/reactbits/StarBorder";
import { selectCalculatorProduct } from "@/lib/calculator-selection";
import type { CalculatorProductKey } from "@/lib/site";

/** "Apply & Check Eligibility" pill with an orbiting star border, for the featured product card. */
export function FeaturedCta({ product }: { product?: CalculatorProductKey }) {
  return (
    <StarBorder
      as={Link}
      href="/#calculator"
      onClick={() => {
        if (product) selectCalculatorProduct(product);
      }}
      theme="light"
      color="#0b2347"
      backgroundColor="#eef5fd"
      borderColor="#cfe0f4"
      textColor="#0b2347"
      radius={999}
      className="mt-6 self-start px-5 py-2.5 text-sm font-semibold"
    >
      Apply &amp; Check Eligibility
      <Icon name="arrowRight" className="h-4 w-4" />
    </StarBorder>
  );
}
