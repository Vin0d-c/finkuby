import { CountUp } from "@/components/count-up";
import GlassSurface from "@/components/ui/reactbits/GlassSurface";

// Figures come from the site's own copy (lib/site.ts, CTA banner).
// Each figure takes its own colour: royal blue, sky and violet from the site palette, then light green.
// Sky is a shade deeper than the brand #3ab6fc so the big digits stay readable on white.
const stats = [
  { to: 25, suffix: "+", label: "Bank partners", color: "#3b8ef8" },
  { to: 5, label: "Steps to disbursal", color: "#1fa3ea" },
  { to: 2, suffix: " min", label: "To apply", color: "#7c5cff" },
  { to: 15, prefix: "₹", suffix: " Cr", label: "Max loan limit", color: "#2fbf71" },
];

export function Stats() {
  return (
    <section
      aria-label="Finkuby at a glance"
      className="bg-[linear-gradient(180deg,#fff,#eaf3fd_60%,#fff)] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:pt-72 lg:pb-88"
    >
      <div className="glass-host relative mx-auto max-w-[1280px] rounded-[2rem] shadow-[0_0_24px_rgba(59,142,248,0.45),0_0_72px_rgba(59,142,248,0.45),0_0_180px_rgba(58,182,252,0.35)] ring-1 ring-[#7ab8fa]">
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
              className="text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none font-black tracking-tight"
              style={{
                // Softened tint of the colour, with a halo of the same hue. drop-shadow (not
                // text-shadow) so the glow isn't cut off by the rolling digits' clipping.
                color: `color-mix(in srgb, ${s.color} 72%, white)`,
                filter: `drop-shadow(0 0 8px color-mix(in srgb, ${s.color} 30%, transparent)) drop-shadow(0 0 18px color-mix(in srgb, ${s.color} 14%, transparent))`,
              }}
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
