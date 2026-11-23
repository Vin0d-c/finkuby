import type { CalculatorProductKey } from "@/lib/site";

const STORAGE_KEY = "finkuby:eligibility-loan";

/** Remember which loan type the eligibility form should open with. */
export function selectEligibilityLoan(key: CalculatorProductKey) {
  try {
    sessionStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* ignore */
  }
}

export function takePendingEligibilityLoan(): string | null {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return value;
  } catch {
    return null;
  }
}
