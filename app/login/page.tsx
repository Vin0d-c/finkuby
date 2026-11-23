import type { Metadata } from "next";
import { LoginForm } from "@/components/login/login-form";
import { LoginShell } from "@/components/login/login-shell";

export const metadata: Metadata = {
  title: "Login | Finkuby",
  description:
    "Log in to your Finkuby dashboard with secure OTP-based mobile verification.",
  alternates: { canonical: "/login" },
  openGraph: { url: "/login" },
};

export default function LoginPage() {
  return (
    <LoginShell>
      <LoginForm />
    </LoginShell>
  );
}
