"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { Icon } from "@/components/ui";
import {
  estimateEligibility,
  formatInr,
  peekEligibilityResult,
} from "@/lib/eligibility-result";
import { saveLoginMobile, saveUserName } from "@/lib/login-session";
import { DASHBOARD_URL } from "@/lib/site";

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-[#d5e3f2] bg-[#f8fbfe] px-4 py-3 text-[15px] font-medium text-[#1A2B56] outline-none transition-[border-color,box-shadow] placeholder:font-normal placeholder:text-[#9aa8bc] focus:border-[#40B5FF] focus:ring-3 focus:ring-[#40B5FF]/20";

const OTP_LENGTH = 6;

export function EligibilityOptions() {
  const router = useRouter();
  const [amountLabel, setAmountLabel] = useState("₹ —");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const stored = peekEligibilityResult();
    const result =
      stored ??
      estimateEligibility({
        loanKey: "personal",
        income: 55_000,
        emi: 0,
      });
    setAmountLabel(formatInr(result.finkubyAmount));
  }, []);

  useEffect(() => {
    if (!otpOpen || otpVerified) return;
    const id = window.setTimeout(() => otpRefs.current[0]?.focus(), 40);
    return () => window.clearTimeout(id);
  }, [otpOpen, otpVerified]);

  const mobileReady = mobile.replace(/\D/g, "").length === 10;

  const startVerify = () => {
    if (!mobileReady || otpVerified) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setOtpOpen(true);
    setOtpVerified(false);
  };

  const completeOtp = (digits: string[]) => {
    if (digits.join("").length !== OTP_LENGTH) return;
    setOtpVerified(true);
    setOtpOpen(false);
  };

  const setOtpDigit = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = char;
    setOtp(next);
    if (char && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
    if (next.every((d) => d)) completeOtp(next);
  };

  const onOtpKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const onOtpPaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH)
      .fill("")
      .map((_, i) => pasted[i] ?? "");
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
    if (pasted.length === OTP_LENGTH) completeOtp(next);
  };

  const continueToDashboard = () => {
    const digits = mobile.replace(/\D/g, "").slice(0, 10);
    saveLoginMobile(digits.length === 10 ? digits : "9999999999");
    saveUserName(fullName.trim() || "there");
    router.push(DASHBOARD_URL);
  };

  return (
    <div className="relative mx-auto max-w-[1280px] px-5 pt-14 pb-8 sm:px-8 lg:px-12 lg:pt-16 lg:pb-12">
      <Link
        href="/"
        aria-label="Finkuby Technologies home"
        className="relative z-10 inline-flex items-center gap-3"
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

      <div className="relative z-10 mt-8 grid items-start gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-xl">
          <h1 className="font-agrandir text-[clamp(2.1rem,4.5vw,3.35rem)] leading-[1.08] font-bold tracking-[-0.03em] text-[#1A2B56]">
            Woohoo! You&apos;re eligible!
          </h1>
          <div className="mt-3 h-1 w-14 rounded-full bg-[#40B5FF]" />
          <p className="mt-4 max-w-md text-base leading-relaxed text-[#3d4f69] sm:text-lg">
            Your estimated loan amount looks eligible. Just share your details
            and let Finkuby handle the rest!
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-white px-5 py-6 shadow-[0_30px_70px_rgba(26,43,86,0.12)] ring-1 ring-[#d5e3f2] sm:px-7 sm:py-7">
          <p className="text-sm font-semibold tracking-[-0.01em] text-[#5b6b82]">
            Your Estimated Eligible Amount
          </p>
          <p className="font-agrandir mt-2 text-[clamp(1.85rem,3.5vw,2.35rem)] leading-none font-bold tracking-[-0.03em] text-[#1A2B56]">
            {amountLabel}
          </p>

          <p className="mt-6 text-sm font-semibold text-[#1A2B56]">
            A few details are all we need to take it forward.
          </p>

          <div className="mt-4 grid gap-4">
            <label className="grid">
              <span className="text-sm font-semibold text-[#1A2B56]">
                Full Name (as per PAN)
              </span>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className={fieldClass}
              />
            </label>

            <div className="grid">
              <span className="text-sm font-semibold text-[#1A2B56]">
                Mobile Number
              </span>
              <div className="mt-1.5 flex items-center gap-3">
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  disabled={otpVerified}
                  onChange={(event) => {
                    const next = event.target.value.replace(/\D/g, "").slice(0, 10);
                    setMobile(next);
                    if (otpOpen || otpVerified) {
                      setOtpOpen(false);
                      setOtpVerified(false);
                      setOtp(Array(OTP_LENGTH).fill(""));
                    }
                  }}
                  className={`${fieldClass} mt-0 min-w-0 flex-1 disabled:opacity-80`}
                />
                {otpVerified ? null : (
                  <button
                    type="button"
                    onClick={startVerify}
                    disabled={!mobileReady}
                    className="shrink-0 text-sm font-semibold text-[#40B5FF] transition-colors hover:text-[#1A2B56] disabled:cursor-not-allowed disabled:text-[#9aa8bc]"
                  >
                    Verify
                  </button>
                )}
              </div>

              {otpOpen && !otpVerified ? (
                <div className="mt-2.5">
                  <p className="text-sm font-semibold text-[#1A2B56]">Enter OTP</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5b6b82]">
                    We&apos;ve sent a 6-digit code to {mobile}.
                  </p>
                  <div
                    className="mt-2 flex flex-wrap gap-1.5"
                    onPaste={onOtpPaste}
                  >
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        aria-label={`OTP digit ${index + 1}`}
                        value={value}
                        onChange={(event) =>
                          setOtpDigit(index, event.target.value)
                        }
                        onKeyDown={(event) => onOtpKeyDown(index, event)}
                        className="h-10 w-8 rounded-lg border border-[#d5e3f2] bg-[#f8fbfe] text-center text-sm font-bold text-[#1A2B56] outline-none transition-[border-color,box-shadow] focus:border-[#40B5FF] focus:ring-2 focus:ring-[#40B5FF]/20 sm:h-11 sm:w-9"
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {otpVerified ? (
                <p className="mt-2.5 flex items-center gap-1.5 text-sm font-semibold text-[#16a34a]">
                  <Icon name="check" className="h-4 w-4" />
                  Phone number verified
                </p>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={continueToDashboard}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#40B5FF] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#64E0E1] hover:text-[#1A2B56]"
          >
            Continue with Finkuby
            <Icon name="arrowRight" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
