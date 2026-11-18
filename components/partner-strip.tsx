import type { ReactNode } from "react";

export function PartnerStrip({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .partner-strip { left: 28%; }
        @supports (anchor-name: --nav-gap) {
          .partner-strip { left: anchor(--nav-gap center); }
        }
      `}</style>
      <div className="partner-strip absolute right-[14%] bottom-[7%] z-10 sm:right-[20%] sm:bottom-[9%]">
        {children}
      </div>
    </>
  );
}
