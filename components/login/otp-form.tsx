"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Icon } from "@/components/ui";
import { DASHBOARD_URL, LOGIN_URL } from "@/lib/site";
import { clearLoginMobile, readLoginMobile } from "@/lib/login-session";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

function maskMobile(digits: string) {
  if (digits.length < 4) return `+91 ${digits}`;
  return `+91 ${digits.slice(0, 2)}${"X".repeat(Math.max(0, digits.length - 5))}${digits.slice(-3)}`;
}

function PencilIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function OtpForm() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const digits = readLoginMobile().replace(/\D/g, "").slice(0, 10);
    if (digits.length !== 10) {
      router.replace(LOGIN_URL);
      return;
    }
    setMobile(digits);
    otpRefs.current[0]?.focus();
  }, [router]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const setOtpDigit = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = char;
    setOtp(next);
    setError("");
    if (char && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
  };

  const onOtpKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) otpRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const onOtpPaste = (event: ClipboardEvent<HTMLInputElement>) => {
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
    setError("");
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };

  const resendOtp = () => {
    if (secondsLeft > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setInfo("OTP resent. In development mode, use 123456.");
    setSecondsLeft(RESEND_SECONDS);
    otpRefs.current[0]?.focus();
  };

  const verifyOtp = (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setInfo("Verified. Redirecting…");
    window.setTimeout(() => {
      clearLoginMobile();
      setSubmitting(false);
      router.push(DASHBOARD_URL);
    }, 500);
  };

  if (!mobile) {
    return (
      <div className="relative mx-auto flex min-h-[calc(100svh-2rem)] max-w-[1280px] items-center justify-center px-5 py-10">
        <p className="text-sm text-[#5b6b82]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto grid min-h-[calc(100svh-2rem)] max-w-[1280px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
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

        <h1 className="font-agrandir mt-12 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.03em] text-[#1A2B56] sm:mt-16">
          Welcome Back
        </h1>
        <div className="mt-3 h-1 w-14 rounded-full bg-[#40B5FF]" />
        <p className="mt-5 max-w-md text-base leading-relaxed text-[#3d4f69] sm:text-lg">
          Log in with your mobile number to access your dashboard.
        </p>

        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#e8f6fd] px-4 py-3.5 text-sm leading-relaxed text-[#1A2B56] ring-1 ring-[#40B5FF]/25 sm:px-5">
          <Icon name="lock" className="mt-0.5 h-5 w-5 shrink-0 text-[#40B5FF]" />
          <p>
            <span className="font-semibold">Secure Login</span> — Your account is
            protected with OTP-based verification.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <form
          onSubmit={verifyOtp}
          className="rounded-[1.75rem] bg-white p-6 shadow-[0_30px_70px_rgba(26,43,86,0.12)] ring-1 ring-[#d5e3f2] sm:p-8"
        >
          <div className="grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8ef] px-3 py-1.5 text-xs font-semibold text-[#1f7a45] ring-1 ring-[#1f7a45]/15">
                <Icon name="check" className="h-3.5 w-3.5" />
                OTP sent to {maskMobile(mobile)}
              </span>
              <Link
                href={LOGIN_URL}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d5e3f2] bg-white px-3 py-1.5 text-sm font-semibold text-[#1A2B56] transition-colors hover:border-[#40B5FF] hover:text-[#40B5FF]"
              >
                <PencilIcon />
                Edit number
              </Link>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1A2B56] sm:text-2xl">
                Verify your mobile number
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6b82]">
                We&apos;ve sent a 6-digit OTP to your mobile number.
              </p>
            </div>

            <div
              className="flex justify-between gap-2 sm:gap-3"
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
                  onChange={(event) => setOtpDigit(index, event.target.value)}
                  onKeyDown={(event) => onOtpKeyDown(index, event)}
                  className="h-12 w-10 rounded-xl border border-[#d5e3f2] bg-[#f8fbfe] text-center text-lg font-bold text-[#1A2B56] outline-none transition-[border-color,box-shadow] focus:border-[#40B5FF] focus:ring-3 focus:ring-[#40B5FF]/20 sm:h-14 sm:w-12 sm:rounded-2xl sm:text-xl"
                />
              ))}
            </div>

            <p className="text-sm text-[#5b6b82]">
              Didn&apos;t receive the code?{" "}
              {secondsLeft > 0 ? (
                <span className="font-semibold text-[#1A2B56]">
                  Resend OTP in {secondsLeft}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="font-semibold text-[#40B5FF] transition-colors hover:text-[#1A2B56]"
                >
                  Resend OTP
                </button>
              )}
            </p>

            {error ? (
              <p className="text-sm font-medium text-[#c0392b]" role="alert">
                {error}
              </p>
            ) : null}
            {info && !error ? (
              <p className="text-sm font-medium text-[#1f7a45]" role="status">
                {info}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#40B5FF] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#64E0E1] hover:text-[#1A2B56] disabled:opacity-70"
            >
              Continue to Dashboard
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-end gap-1.5 text-xs text-[#8b95a6]">
              <Icon name="lock" className="h-3.5 w-3.5" />
              Secure &amp; encrypted
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
