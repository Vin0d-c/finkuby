import { Icon, type IconName } from "@/components/ui";

const ITEMS: { word: string; icon: IconName }[] = [
  { word: "Paperless", icon: "scan" },
  { word: "Instant", icon: "spark" },
  { word: "RBI regulated", icon: "shield" },
];

function Segment() {
  return (
    <span className="inline-flex items-center gap-x-3 pr-3">
      {ITEMS.map((item, i) => (
        <span key={item.word} className="inline-flex items-center gap-x-3">
          {i > 0 ? (
            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#1A2B56]/45" />
          ) : null}
          <span className="inline-flex items-center gap-1.5">
            <Icon name={item.icon} className="h-3.5 w-3.5 shrink-0 text-[#1A2B56]/70" />
            <span>{item.word}</span>
          </span>
        </span>
      ))}
      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#1A2B56]/45" />
    </span>
  );
}

/** Compact left-rolling trust line for the hero CTA column. */
export function HeroTrustMarquee() {
  return (
    <div
      aria-label="Paperless, Instant, RBI regulated"
      className="hero-trust-marquee mt-5 max-w-[16rem] overflow-hidden text-[13px] leading-snug font-medium text-[#1A2B56]/80 uppercase sm:max-w-[18rem] sm:text-[15px] sm:leading-relaxed"
    >
      <div className="hero-trust-marquee-track">
        <Segment />
        <span aria-hidden className="inline-flex">
          <Segment />
        </span>
      </div>
    </div>
  );
}
