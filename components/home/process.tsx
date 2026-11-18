"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/reactbits/ScrollStack";
import GradientText from "@/components/ui/reactbits/GradientText";
import { Eyebrow, Icon, type IconName } from "@/components/ui";
import { processSteps } from "@/lib/site";

const stepIcons: IconName[] = ["send", "scan", "badge", "bank", "wallet"];

// Page palette: hero sky, stats blue, offerings purple, brand deep blue, offerings lavender.
const glows = ["58,182,252", "59,142,248", "138,104,224", "22,82,156", "169,140,235"];

export function Process() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-clip bg-[linear-gradient(180deg,#ffffff,#f3f8fe_50%,#ffffff)] py-24 text-[#0b2347] sm:py-28"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <Eyebrow>Process Flow</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.08] font-black tracking-[-0.03em] sm:whitespace-nowrap">
            {/* One left-to-right sweep across the whole title, easing gently back and forth. */}
            <GradientText
              colors={["#3b8ef8", "#7c5cff", "#c58cf0"]}
              animationSpeed={10}
              variant="linear"
              angle={90}
              scale={1.4}
            >
              How Finkuby Accelerates Capital
            </GradientText>
          </h2>
        </div>

        <div className="mt-14">
          <ScrollStack
            useWindowScroll
            smoothScroll={false}
            snap={false}
            stackPosition="7.5rem"
            itemDistance={56}
            itemStackDistance={16}
            baseScale={0.9}
            itemScale={0.02}
            dimAmount={0.03}
            holdDistance={80}
            advanceOnClick
          >
            {processSteps.map((item, index) => {
              const glow = glows[index % glows.length];
              return (
              <ScrollStackItem
                key={item.num}
                itemClassName="cursor-pointer !h-auto !rounded-[3rem] !px-8 !py-7 sm:!px-12 sm:!py-9 md:!rounded-full md:!px-24 md:!py-10"
                style={{
                  background: "#ffffff",
                  color: "#0b2347",
                  boxShadow: `0 0 24px rgba(${glow},0.35), 0 0 64px rgba(${glow},0.28), inset 0 0 0 2px rgb(${glow})`,
                  ["--glow" as string]: glow,
                }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(var(--glow),0.12)] text-[rgb(var(--glow))]">
                        <Icon name={stepIcons[index]} className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.16em] text-[rgb(var(--glow))] uppercase">
                          Stage {item.num}
                        </p>
                        <p className="text-xs text-[#8b95a6]">{item.subtitle}</p>
                      </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#5b6b82]">
                      {item.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap md:shrink-0 md:text-right">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-[#8b95a6] uppercase">
                      Automation rating
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[rgb(var(--glow))]">
                      {item.rating}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
