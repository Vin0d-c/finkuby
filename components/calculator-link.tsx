"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { selectCalculatorProduct } from "@/lib/calculator-selection";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import type { CalculatorProductKey } from "@/lib/site";

/** Link to the EMI calculator that also switches it to the given product. */
export function CalculatorLink({
  product,
  className,
  children,
}: {
  product?: CalculatorProductKey;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/#calculator"
      className={className}
      onClick={(event) => {
        if (product) selectCalculatorProduct(product);
        // On the home page, scroll to the section directly. A plain hash link is unreliable
        // here: it does nothing when the URL already ends in #calculator, and the pinned
        // sections above it can throw off the browser's own jump.
        const target = pathname === "/" ? document.getElementById("calculator") : null;
        if (!target) return;
        event.preventDefault();
        smoothScrollTo(target);
        history.replaceState(null, "", "#calculator");
      }}
    >
      {children}
    </Link>
  );
}
