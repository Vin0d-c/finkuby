import type { Metadata } from "next";
import { OtpForm } from "@/components/login/otp-form";
import { LoginShell } from "@/components/login/login-shell";

export const metadata: Metadata = {
  title: "Verify OTP | Finkuby",
  description:
    "Enter the 6-digit OTP sent to your mobile number to access your Finkuby dashboard.",
  alternates: { canonical: "/login/otp" },
  openGraph: { url: "/login/otp" },
};

export default function LoginOtpPage() {
  return (
    <LoginShell>
      <OtpForm />
    </LoginShell>
  );
}
