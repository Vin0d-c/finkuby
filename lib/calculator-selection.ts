import type { CalculatorProductKey } from "@/lib/site";

const STORAGE_KEY = "finkuby:calculator-product";
export const CALCULATOR_EVENT = "finkuby:calculator-product";

/**
 * Asks the EMI calculator to switch product. Works on the home page (event)
 * and across a navigation to "/#calculator" (sessionStorage, read on mount).
 */
export function selectCalculatorProduct(key: CalculatorProductKey) {
  try {
    sessionStorage.setItem(STORAGE_KEY, key);
  } catch {
    // Storage can be unavailable (private mode); the event still covers same-page use.
  }
  window.dispatchEvent(new CustomEvent(CALCULATOR_EVENT, { detail: key }));
}

export function takePendingCalculatorProduct(): string | null {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    return value;
  } catch {
    return null;
  }
}
