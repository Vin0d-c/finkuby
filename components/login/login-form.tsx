"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui";
import { saveLoginMobile } from "@/lib/login-session";
import { LOGIN_OTP_URL } from "@/lib/site";

export function LoginForm() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  const digits = mobile.replace(/\D/g, "").slice(0, 10);

  const sendOtp = (event: FormEvent) => {
    event.preventDefault();
    saveLoginMobile(digits.length === 10 ? digits : "9999999999");
    router.push(LOGIN_OTP_URL);
  };

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
          onSubmit={sendOtp}
          className="rounded-[1.75rem] bg-white p-6 shadow-[0_30px_70px_rgba(26,43,86,0.12)] ring-1 ring-[#d5e3f2] sm:p-8"
        >
          <div className="grid gap-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1A2B56] sm:text-2xl">
                Enter your mobile number
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6b82]">
                We&apos;ll send a 6-digit OTP to verify it&apos;s you.
              </p>
            </div>

            <label className="grid gap-2">
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#8b95a6] uppercase">
                Mobile number
              </span>
              <div className="flex overflow-hidden rounded-2xl border border-[#d5e3f2] bg-[#f8fbfe] focus-within:border-[#40B5FF] focus-within:ring-3 focus-within:ring-[#40B5FF]/20">
                <span className="flex items-center border-r border-[#d5e3f2] px-4 text-sm font-semibold text-[#1A2B56]">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={digits}
                  onChange={(event) =>
                    setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[15px] font-semibold text-[#1A2B56] outline-none placeholder:font-medium placeholder:text-[#9aa8bc]"
                />
              </div>
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#40B5FF] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#64E0E1] hover:text-[#1A2B56]"
            >
              Send OTP
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
