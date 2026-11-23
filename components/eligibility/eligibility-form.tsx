"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui";
import { takePendingEligibilityLoan } from "@/lib/eligibility-selection";
import {
  estimateEligibility,
  saveEligibilityResult,
} from "@/lib/eligibility-result";
import { ELIGIBILITY_OPTIONS_URL, calculatorProducts } from "@/lib/site";

const loanOptions = calculatorProducts.filter((p) => p.inPicker);

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-[#d5e3f2] bg-[#f8fbfe] px-4 py-3 text-[15px] font-medium text-[#1A2B56] outline-none transition-[border-color,box-shadow] placeholder:font-normal placeholder:text-[#9aa8bc] focus:border-[#40B5FF] focus:ring-3 focus:ring-[#40B5FF]/20";

const darkFieldClass =
  "mt-1.5 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-[15px] font-medium text-white outline-none transition-[border-color,box-shadow] placeholder:font-normal placeholder:text-white/45 focus:border-[#40B5FF] focus:ring-3 focus:ring-[#40B5FF]/25";

export function EligibilityForm() {
  const router = useRouter();
  const [loanType, setLoanType] = useState("");
  const [loanMenuOpen, setLoanMenuOpen] = useState(false);
  const loanMenuRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState("");
  const [stepTwoOpen, setStepTwoOpen] = useState(false);
  const [income, setIncome] = useState("");
  const [existingEmiAmount, setExistingEmiAmount] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [pincode, setPincode] = useState("");
  const [hasCcObligations, setHasCcObligations] = useState(false);
  const [ccObligationAmount, setCcObligationAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedLoan = loanOptions.find((item) => item.key === loanType);

  useEffect(() => {
    const pending = takePendingEligibilityLoan();
    if (!pending) return;
    if (loanOptions.some((item) => item.key === pending)) {
      setLoanType(pending);
    }
  }, []);

  useEffect(() => {
    if (!loanMenuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!loanMenuRef.current?.contains(event.target as Node)) {
        setLoanMenuOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLoanMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [loanMenuOpen]);

  const toggleStepTwo = () => setStepTwoOpen((open) => !open);

  const checkEligibility = () => {
    setSubmitting(true);
    const incomeN = Number(income.replace(/[^0-9]/g, "")) || 55_000;
    const emiN = Number(existingEmiAmount.replace(/[^0-9]/g, "")) || 0;
    const result = estimateEligibility({
      loanKey: loanType || "personal",
      income: incomeN,
      emi: emiN,
    });
    saveEligibilityResult(result);
    window.setTimeout(() => {
      router.push(ELIGIBILITY_OPTIONS_URL);
    }, 250);
  };

  return (
    <div className="relative mx-auto grid max-w-[1280px] items-start gap-8 px-5 pt-24 pb-8 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:pt-28 lg:pb-12">
      <div className="relative z-10 max-w-xl">
        <Link
          href="/"
          aria-label="Finkuby Technologies home"
          className="inline-flex items-center gap-3"
        >
          <span className="relative block h-10 w-[140px] overflow-hidden sm:h-11 sm:w-[154px]">
            <Image
              src="/logo11.png"
              alt="Finkuby Technologies"
              fill
              sizes="154px"
              priority
              className="object-cover object-center"
            />
          </span>
        </Link>

        <h1 className="font-agrandir mt-8 text-[clamp(2.1rem,4.5vw,3.35rem)] leading-[1.08] font-bold tracking-[-0.03em] text-[#1A2B56] sm:mt-10">
          Tell Us What You Need
        </h1>
        <div className="mt-3 h-1 w-14 rounded-full bg-[#40B5FF]" />
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#3d4f69] sm:text-lg">
          Let us know what you&apos;re looking for. Share a few simple details
          about your loan requirements, and we&apos;ll help you find the right
          loan that suits your needs.
        </p>
      </div>

      <div className="relative z-10">
        <div
          className={`rounded-[2rem] bg-[#1A2B56] shadow-[0_30px_70px_rgba(26,43,86,0.18)] ${
            stepTwoOpen ? "overflow-hidden" : "pb-3"
          }`}
        >
          <div className="relative z-10 rounded-[2rem] bg-white px-5 pt-5 pb-3 ring-1 ring-[#d5e3f2]/80 sm:px-7 sm:pt-6 sm:pb-4">
            <div className="grid gap-4">
              <label className="grid">
                <span className="text-sm font-semibold text-[#1A2B56]">
                  Required loan amount.
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="₹ Enter amount"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value.replace(/[^\d,]/g, ""))
                  }
                  className={fieldClass}
                />
              </label>

              <div ref={loanMenuRef} className="relative grid">
                <span className="text-sm font-semibold text-[#1A2B56]">
                  Type of loan are you looking for?
                </span>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={loanMenuOpen}
                  onClick={() => setLoanMenuOpen((open) => !open)}
                  className={`${fieldClass} flex cursor-pointer items-center justify-between gap-3 text-left ${
                    loanMenuOpen
                      ? "border-[#40B5FF] bg-white shadow-[0_0_0_3px_rgba(64,181,255,0.18)]"
                      : ""
                  }`}
                >
                  <span
                    className={
                      selectedLoan
                        ? "text-[#1A2B56]"
                        : "font-normal text-[#9aa8bc]"
                    }
                  >
                    {selectedLoan?.label ??
                      "Choose the loan category that best matches your requirement."}
                  </span>
                  <Icon
                    name="chevron"
                    className={`h-4 w-4 shrink-0 text-[#1A2B56] transition-transform ${
                      loanMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {loanMenuOpen ? (
                  <ul
                    role="listbox"
                    aria-label="Loan types"
                    className="absolute top-[calc(100%+0.4rem)] right-0 left-0 z-30 max-h-56 overflow-auto rounded-2xl border border-[#d5e3f2] bg-white py-1.5 shadow-[0_16px_40px_rgba(26,43,86,0.14)]"
                  >
                    {loanOptions.map((item) => {
                      const selected = item.key === loanType;
                      return (
                        <li
                          key={item.key}
                          role="option"
                          aria-selected={selected}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setLoanType(item.key);
                              setLoanMenuOpen(false);
                            }}
                            className={`flex w-full px-4 py-2.5 text-left text-[15px] transition-colors hover:bg-[#e8f6fd] ${
                              selected
                                ? "font-semibold text-[#1A2B56]"
                                : "font-medium text-[#3d4f69]"
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label={stepTwoOpen ? "Collapse" : "Continue"}
                  aria-expanded={stepTwoOpen}
                  onClick={toggleStepTwo}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#40B5FF] text-white shadow-[0_10px_24px_rgba(64,181,255,0.35)] transition-colors hover:bg-[#64E0E1] hover:text-[#1A2B56]"
                >
                  <Icon
                    name="arrowRight"
                    className={`h-5 w-5 transition-transform duration-300 ease-out ${
                      stepTwoOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out ${
              stepTwoOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="px-5 pt-5 pb-5 sm:px-7 sm:pt-5 sm:pb-6">
                <h2 className="font-agrandir text-center text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
                  Just one quick check!
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                  <label className="grid content-start">
                    <span className="flex min-h-10 items-end text-sm font-semibold text-white">
                      Net Monthly Income{" "}
                      <span className="text-[#64E0E1]">&nbsp;*</span>
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="e.g. 55,000"
                      value={income}
                      onChange={(event) =>
                        setIncome(event.target.value.replace(/[^\d,]/g, ""))
                      }
                      className={darkFieldClass}
                    />
                  </label>

                  <div className="relative grid content-start">
                    <label className="grid">
                      <span className="flex min-h-10 items-end text-sm font-semibold text-white">
                        Existing EMI Obligations{" "}
                        <span className="text-[#64E0E1]">&nbsp;*</span>
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 12,000"
                        value={existingEmiAmount}
                        onChange={(event) =>
                          setExistingEmiAmount(
                            event.target.value.replace(/[^\d,]/g, ""),
                          )
                        }
                        className={darkFieldClass}
                      />
                    </label>
                    <span className="pointer-events-none absolute top-full left-0 mt-1 text-xs text-white/55">
                      Enter 0 if you have none
                    </span>
                  </div>

                  <label className="grid content-start">
                    <span className="flex min-h-10 items-end text-sm font-semibold text-white">
                      Your Company Name{" "}
                      <span className="text-[#64E0E1]">&nbsp;*</span>
                    </span>
                    <input
                      type="text"
                      autoComplete="organization"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      className={darkFieldClass}
                    />
                  </label>

                  <label className="grid content-start">
                    <span className="flex min-h-10 items-end text-sm font-semibold text-white">
                      Current Residence Pincode{" "}
                      <span className="text-[#64E0E1]">&nbsp;*</span>
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="e.g. 560001"
                      value={pincode}
                      onChange={(event) =>
                        setPincode(
                          event.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      className={darkFieldClass}
                    />
                  </label>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-dashed border-white/20 bg-white/5 px-3.5 py-3">
                  <input
                    type="checkbox"
                    checked={hasCcObligations}
                    onChange={(event) => {
                      setHasCcObligations(event.target.checked);
                      if (!event.target.checked) setCcObligationAmount("");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-[#40B5FF]"
                  />
                  <span className="text-sm font-semibold text-white">
                    I have credit card obligations{" "}
                    <span className="font-normal text-white/55">(optional)</span>
                  </span>
                </label>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    hasCcObligations ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <label className="mt-3 grid sm:max-w-[calc(50%-0.5rem)]">
                      <span className="text-sm font-semibold text-white">
                        Monthly CC Obligation{" "}
                        <span className="text-[#64E0E1]">*</span>
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 5,000"
                        value={ccObligationAmount}
                        onChange={(event) =>
                          setCcObligationAmount(
                            event.target.value.replace(/[^\d,]/g, ""),
                          )
                        }
                        className={darkFieldClass}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={checkEligibility}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#40B5FF] px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#64E0E1] hover:text-[#1A2B56] disabled:opacity-70 sm:text-base"
                  >
                    {submitting ? "Checking…" : "Check My Eligibility"}
                    <Icon name="arrowRight" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
