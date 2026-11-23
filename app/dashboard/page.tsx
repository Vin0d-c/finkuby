import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard | Finkuby",
  description: "Your Finkuby dashboard.",
  alternates: { canonical: "/dashboard" },
  openGraph: { url: "/dashboard" },
};

export default function DashboardPage() {
  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[linear-gradient(180deg,#dce7f4_0%,#e8eef6_28%,#f3f6fa_62%,#f7f9fc_100%)] text-[#1A2B56]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[linear-gradient(180deg,rgba(26,43,86,0.12)_0%,rgba(64,181,255,0.08)_42%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(26,43,86,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(26,43,86,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(180deg,#000_0%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-6rem] right-[-4rem] h-[22rem] w-[22rem] rounded-full bg-[#40B5FF]/18 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-5rem] left-[-3rem] h-[18rem] w-[18rem] rounded-full bg-[#1A2B56]/10 blur-3xl"
      />
      <DashboardView />
    </main>
  );
}
