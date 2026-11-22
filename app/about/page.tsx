import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TeamBounce } from "@/components/about/team-bounce";
import FoldText from "@/components/ui/reactbits/FoldText";
import { InnerHero, PageShell } from "@/components/page-shell";
import {
  ArrowUpRight,
  Eyebrow,
  Icon,
  LinkedInIcon,
  SectionHeading,
  highlight,
  highlightOnDark,
  primaryButtonIcon,
} from "@/components/ui";
import { aboutValues, leaders, mission, vision } from "@/lib/site";
import ScrollReveal from "@/components/ui/reactbits/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us | Finkuby - Pioneering Digital Credit in India",
  description:
    "Learn about Finkuby's mission, vision, and co-founders Ravindra Kumar Rangala and Raji KLR. We build modern digital architectures that solve real-world lending challenges in India.",
  keywords: [
    "finkuby founders",
    "ravindra kumar rangala",
    "raji klr",
    "about finkuby",
    "digital credit platforms india",
    "fintech mission statement",
    "paperless finance leadership",
  ],
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <InnerHero>
        <div>
          <Eyebrow tone="dark">About Finkuby</Eyebrow>
          <h1 className="mt-5 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-black tracking-[-0.035em]">
            <FoldText
              text="Empowering Your"
              splitBy="word"
              trigger="mount"
              fontSize="inherit"
              fontWeight="inherit"
              className="!leading-[0.98] !tracking-[-0.035em]"
            />
            <FoldText
              text="Financial Future"
              splitBy="word"
              trigger="mount"
              fontSize="inherit"
              fontWeight="inherit"
              color="#5aa8ff"
              className="block !leading-[0.98] !tracking-[-0.035em]"
            />
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#c5d3e8] sm:text-lg">
            At Finkuby, we are bridging the gap between individuals and the
            capital they need to grow. By combining state-of-the-art AI-driven
            matching engines with India&apos;s most trusted banks, we make
            borrowing simple, transparent, and completely paperless.
          </p>
          <Link
            href="/#calculator"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#0b2347] py-2 pr-2 pl-7 text-base font-semibold text-white transition-colors hover:bg-[#163a6b]"
          >
            Get Started
            <span className={primaryButtonIcon}>
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
            <Image
              src="/about/hero.jpg"
              alt="Illustration of digital finance growth charts and rising coin stacks"
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </InnerHero>

      <section id="who-we-are" className="relative scroll-mt-24 overflow-hidden bg-white py-24">
        <div
          aria-hidden
          className="stage-dots pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
        />
        <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] font-black tracking-[-0.03em] text-[#0b2347]">
              Who <span className={highlight}>We Are</span>
            </h2>
            <ScrollReveal
              containerClassName="mt-6"
              textClassName="text-lg leading-relaxed text-[#3d4f69]"
              baseOpacity={0.15}
              blurStrength={3}
            >
              We are a bold fintech pioneer, crafting digital powerhouses that
              conquer real-world money challenges — from borrower onboarding and
              identity verification to intelligent credit decision engines that
              serve the segments traditional finance has left behind.
            </ScrollReveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {aboutValues.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl bg-white p-7 ring-1 ring-[#e3eaf4] shadow-[0_20px_50px_rgba(11,35,71,0.06)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16529c] text-white">
                  <Icon name={value.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-black tracking-tight text-[#0b2347]">
                  {value.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#5b6b82]">
                  {value.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fd] py-24">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-5 sm:px-8 md:grid-cols-2 lg:px-12">
          {[
            {
              title: "Our Mission",
              body: mission,
              icon: "target" as const,
              dark: true,
            },
            {
              title: "Our Vision",
              body: vision,
              icon: "eye" as const,
              dark: false,
            },
          ].map((item) => (
            <article
              key={item.title}
              className={`relative overflow-hidden rounded-3xl p-8 sm:p-10 ${
                item.dark
                  ? "bg-[#16529c] text-white"
                  : "bg-white text-[#0b2347] ring-1 ring-[#e3eaf4]"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.dark ? "bg-white/15 text-white" : "bg-[#16529c] text-white"}`}
              >
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-black tracking-tight">
                {item.title}
              </h3>
              <p
                className={`mt-3 text-base leading-relaxed ${item.dark ? "text-[#d5e3f5]" : "text-[#3d4f69]"}`}
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="leadership" className="scroll-mt-24 bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            title="Meet Our"
            accent="Leadership Team"
            body="The visionaries driving Finkuby's growth, technology integration, and customer advocacy."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            {leaders.map((leader) => (
              <article
                key={leader.name}
                className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#e3eaf4] shadow-[0_20px_50px_rgba(11,35,71,0.06)]"
              >
                <div className="relative aspect-[4/3] bg-[#e8eef7]">
                  <Image
                    src={leader.photo}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-[#0b2347]">
                        {leader.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#16529c]">
                        {leader.title}
                      </p>
                    </div>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${leader.name} on LinkedIn`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef5fd] text-[#16529c] transition-colors hover:bg-[#16529c] hover:text-white"
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#5b6b82]">
                    {leader.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fd] py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            title="Employee"
            accent="Corner"
            body="Celebrating our team milestones, festive office decorations, and the strong cultural bond that drives our innovation."
          />
          <div className="mt-12">
            <TeamBounce />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
