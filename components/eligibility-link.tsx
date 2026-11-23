"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { selectEligibilityLoan } from "@/lib/eligibility-selection";
import { ELIGIBILITY_URL, type CalculatorProductKey } from "@/lib/site";

/** Link to the eligibility form, optionally pre-selecting a loan type. */
export function EligibilityLink({
  product,
  className,
  children,
  onClick,
  ...rest
}: {
  product?: CalculatorProductKey;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={ELIGIBILITY_URL}
      className={className}
      onClick={(event) => {
        if (product) selectEligibilityLoan(product);
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
