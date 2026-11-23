import {
  getCalculatorProduct,
  type CalculatorProductKey,
} from "@/lib/site";

const STORAGE_KEY = "finkuby:eligibility-result";

export type EligibilityResult = {
  loanKey: CalculatorProductKey;
  loanLabel: string;
  income: number;
  emi: number;
  rate: number;
  tenureYears: number;
  selfAmount: number;
  finkubyAmount: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Rough pre-approval estimate from income / EMI for the options screen. */
export function estimateEligibility(input: {
  loanKey: string;
  income: number;
  emi: number;
}): EligibilityResult {
  const product = getCalculatorProduct(input.loanKey);
  const surplus = Math.max(0, input.income - input.emi);
  // ~36× monthly surplus for self-serve; Finkuby unlocks ~2.5× more headroom.
  const rawSelf = surplus * 36;
  const selfAmount = clamp(
    Math.round(rawSelf / 1000) * 1000,
    50_000,
    product.defaultAmount * 2,
  );
  const finkubyAmount = clamp(
    Math.round((selfAmount * 2.5) / 1000) * 1000,
    selfAmount,
    product.defaultAmount * 4,
  );

  return {
    loanKey: product.key,
    loanLabel: product.label,
    income: input.income,
    emi: input.emi,
    rate: product.minRate,
    tenureYears: product.defaultTenure,
    selfAmount,
    finkubyAmount,
  };
}

export function saveEligibilityResult(result: EligibilityResult) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    /* ignore */
  }
}

export function takeEligibilityResult(): EligibilityResult | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EligibilityResult;
  } catch {
    return null;
  }
}

export function peekEligibilityResult(): EligibilityResult | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EligibilityResult;
  } catch {
    return null;
  }
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
