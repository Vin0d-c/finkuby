import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Layout for inner pages: sticky solid header, content, footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#e3eaf4] bg-white/90 backdrop-blur-md">
        <SiteHeader variant="solid" />
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

/** Navy hero band used by the inner pages, echoing the home hero's blue disc. */
export function InnerHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#0b2f63] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[40%] -left-[20%] h-[1100px] w-[1100px] rounded-full bg-[#16529c]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(255,255,255,0.7)_1px,transparent_1.2px)] [background-size:15px_15px]"
      />
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:px-12">
        {children}
      </div>
    </section>
  );
}
