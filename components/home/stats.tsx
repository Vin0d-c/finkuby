import { CountUp } from "@/components/count-up";
import GlassSurface from "@/components/ui/reactbits/GlassSurface";

// Figures come from the site's own copy (lib/site.ts, CTA banner).
const stats = [
  { to: 25, suffix: "+", label: "Bank partners" },
  { to: 5, label: "Steps to disbursal" },
  { to: 2, suffix: " min", label: "To apply" },
  { to: 15, prefix: "₹", suffix: " Cr", label: "Max loan limit" },
];

export function Stats() {
  return (
    <section
      aria-label="Finkuby at a glance"
      className="bg-[linear-gradient(180deg,#fff,#eaf3fd_60%,#fff)] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:pt-36 lg:pb-48"
    >
      <div className="glass-host relative mx-auto max-w-[1280px] rounded-[2rem] shadow-[0_0_24px_rgba(64,181,255,0.45),0_0_72px_rgba(64,181,255,0.45),0_0_180px_rgba(64,181,255,0.35)] ring-1 ring-[#7ab8fa]">
        <GlassSurface
          aria-hidden
          width="100%"
          height="100%"
          borderRadius={32}
          refraction={false}
          backgroundOpacity={0.5}
          className="glass-layer pointer-events-none !absolute inset-0"
        />
      <dl className="relative grid grid-cols-2 gap-8 px-5 py-10 sm:px-8 lg:grid-cols-4 lg:px-12">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse text-center">
            <dt className="mt-2 text-xs font-semibold tracking-[0.14em] text-[#8b95a6] uppercase">
              {s.label}
            </dt>
            <dd
              className="text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none font-black tracking-tight text-[#1A2B56]"
            >
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
