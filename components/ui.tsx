import type { ReactNode, SVGProps } from "react";
import { SplitHeading } from "@/components/split-heading";

/** Gradient used for the highlighted word in headings, matching "Simple." in the hero. */
export const highlight =
  "bg-[linear-gradient(180deg,#5aa8ff_0%,#2f7fe8_55%,#16529c_100%)] bg-clip-text text-transparent";
export const highlightOnDark =
  "bg-[linear-gradient(180deg,#9ed6ff_0%,#5aa8ff_46%,#3b86f2_100%)] bg-clip-text text-transparent";

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase ${
        tone === "dark"
          ? "bg-white/10 text-[#9ed6ff] ring-1 ring-white/15"
          : "bg-[#3ab6fc]/10 text-[#16529c] ring-1 ring-[#3ab6fc]/25"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${tone === "dark" ? "bg-[#3ab6fc]" : "bg-[#3ab6fc]"}`}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  tone = "light",
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  accent: string;
  body?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={`mt-5 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-black tracking-[-0.03em] ${
          tone === "dark" ? "text-white" : "text-[#0b2347]"
        }`}
      >
        <SplitHeading
          title={title}
          accent={accent}
          accentClass={tone === "dark" ? highlightOnDark : highlight}
        />
      </Tag>
      {body ? (
        <p
          className={`mt-5 text-base leading-relaxed ${
            center ? "mx-auto max-w-xl" : "max-w-xl"
          } ${tone === "dark" ? "text-[#c5d3e8]" : "text-[#5b6b82]"}`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

const paths: Record<string, ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  car: (
    <>
      <path d="M5 16V11l2-5h10l2 5v5" />
      <path d="M3 16h18v3H3z" />
      <circle cx="7.5" cy="16" r="1.5" />
      <circle cx="16.5" cy="16" r="1.5" />
      <path d="M5 11h14" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  card: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6.5 15h4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  shield: (
    <>
      <path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7" />
      <path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.6-2.4-2.9-5.5-3" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m6.3 6.3 2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="m7 15 4-4 3 3 5-6" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
      <path d="M19 20a3 3 0 0 1-3 2h-3" />
    </>
  ),
  send: (
    <>
      <path d="m21 3-9.5 9.5" />
      <path d="M21 3 14.5 21l-3-8.5L3 9.5z" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M4 12h16" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14.5-1.5 7L12 19l4.5 2.5-1.5-7" />
    </>
  ),
  bank: (
    <>
      <path d="m3 9 9-5 9 5" />
      <path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9" />
      <path d="M3 20h18" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="15" r="1.2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  quote: <path d="M9 7H5v6h4l-2 4M19 7h-4v6h4l-2 4" />,
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export function LinkedInIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** Primary pill button styling, shared by links and buttons. */
export const primaryButton =
  "group inline-flex items-center gap-3 rounded-full bg-[#0b2347] py-2 pr-2 pl-6 text-[15px] font-semibold whitespace-nowrap text-white shadow-[0_14px_28px_rgba(11,35,71,0.28)] transition-colors hover:bg-[#163a6b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b2347]";
export const primaryButtonIcon =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2347] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
