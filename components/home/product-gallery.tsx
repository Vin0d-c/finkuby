"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import CircularGallery from "@/components/CircularGallery";
import { EligibilityLink } from "@/components/eligibility-link";
import { Icon } from "@/components/ui";
import { useInView, useWebglSlot } from "@/components/webgl-slots";
import { selectEligibilityLoan } from "@/lib/eligibility-selection";
import { ELIGIBILITY_URL, products, type Product } from "@/lib/site";
import { useRouter } from "next/navigation";

// Cards are drawn at W×H CSS px (matching the gallery's 0.78 aspect) and rasterised at SCALE for sharpness.
const W = 312;
const H = 400;
const SCALE = 2.5;
const RADIUS = 0.08;

// Muted, dusty tone per product (light → deep gradient), with a dark shade of the same hue for text.
const palette: Record<string, { from: string; to: string; ink: string }> = {
  "personal-loan": { from: "#f7e6da", to: "#e6c3ab", ink: "#4e2c1b" },
  "home-loan": { from: "#f1e5f4", to: "#d6bde1", ink: "#45284f" },
  "business-loan": { from: "#e8e7f8", to: "#c3c0e8", ink: "#2b2960" },
  "used-car-loan": { from: "#e7f1df", to: "#c2d9b1", ink: "#2a421e" },
  "loan-against-property": { from: "#e3eff6", to: "#bad3e4", ink: "#1c3f57" },
  "credit-cards": { from: "#f6eedb", to: "#e0cc9e", ink: "#4f3c13" },
};

type GalleryItem = { image: string; text: string; alt: string };

function svgImage(svg: SVGSVGElement, color: string) {
  const markup = svg.outerHTML
    .replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"')
    .replace('stroke-width="1.8"', 'stroke-width="1.3"')
    .replaceAll("currentColor", color);
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  });
}

function drawCard(product: Product, icon: HTMLImageElement, family: string) {
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);
  const font = (weight: number, size: number) => `${weight} ${size}px ${family}`;
  const { from, to, ink } = palette[product.slug] ?? palette["personal-loan"];
  const fit = (text: string, weight: number, size: number, maxWidth: number) => {
    ctx.font = font(weight, size);
    while (size > 10 && ctx.measureText(text).width > maxWidth) ctx.font = font(weight, --size);
  };
  const spacing = (value: string) => {
    if ("letterSpacing" in ctx) ctx.letterSpacing = value;
  };

  const base = ctx.createLinearGradient(0, 0, W, H);
  base.addColorStop(0, from);
  base.addColorStop(1, to);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);
  const sheen = ctx.createRadialGradient(W * 0.2, H * 0.08, 0, W * 0.2, H * 0.08, W * 0.9);
  sheen.addColorStop(0, "rgba(255, 255, 255, 0.55)");
  sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.fillStyle = ink;
  ctx.globalAlpha = 0.6;
  ctx.font = font(600, 9);
  spacing("2px");
  ctx.fillText("INTEREST RATE", W / 2, 40);
  spacing("0px");
  ctx.globalAlpha = 1;
  fit(product.rate, 600, 14, W - 64);
  ctx.fillText(product.rate, W / 2, 60);

  const cy = 150;
  ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
  ctx.beginPath();
  ctx.arc(W / 2, cy, 58, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = 1;
  ctx.stroke();
  const size = 60;
  ctx.drawImage(icon, (W - size) / 2, cy - size / 2, size, size);

  ctx.fillStyle = ink;
  spacing("-0.3px");
  fit(product.title, 700, 22, W - 48);
  ctx.fillText(product.title, W / 2, 262);
  spacing("0px");

  ctx.globalAlpha = 0.18;
  ctx.fillRect(W / 2 - 18, 282, 36, 1);
  ctx.globalAlpha = 0.6;
  ctx.font = font(600, 9);
  spacing("2px");
  ctx.fillText("UP TO", W / 2, 310);
  spacing("0px");
  ctx.globalAlpha = 1;
  const amount = product.maxLimit.replace(/^up to\s*/i, "");
  spacing("-0.4px");
  fit(amount, 800, 26, W - 48);
  ctx.fillText(amount, W / 2, 342);
  spacing("0px");

  return canvas.toDataURL("image/png");
}

// Page scroll (in svh) spent on each card while the section is pinned, and the share of the
// pinned range held still at each end so the first/last card settles before the page moves on.
const STEP_SVH = 130;
const DWELL = 0.06;
const RANGE_SVH = (products.length - 1) * STEP_SVH;
const progressFor = (index: number) => DWELL + (1 - 2 * DWELL) * (index / (products.length - 1));

/**
 * "Our Offerings": the section pins to the screen and the page scroll rolls the product cards
 * (a React Bits CircularGallery) from the first to the last; then the page continues.
 */
export function ProductGallery({ heading, background }: { heading: ReactNode; background: ReactNode }) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // The gallery is the section's content, so it outranks decorative WebGL backgrounds for a context slot.
  const granted = useWebglSlot(useInView(stageRef, "100% 0px"), 10);
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [active, setActive] = useState(0);

  const goEligibility = (product: Product) => {
    if (product.calculator) selectEligibilityLoan(product.calculator);
    router.push(ELIGIBILITY_URL);
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      const root = iconsRef.current;
      if (!root) return;
      const family = getComputedStyle(root).fontFamily;
      await Promise.all([600, 700, 800].map((weight) => document.fonts.load(`${weight} 16px ${family}`)));
      const svgs = Array.from(root.querySelectorAll("svg"));
      const icons = await Promise.all(
        products.map((product, i) => svgImage(svgs[i], (palette[product.slug] ?? palette["personal-loan"]).ink)),
      );
      if (!alive) return;
      setItems(
        products.map((product, i) => ({
          image: drawCard(product, icons[i], family),
          text: product.title,
          alt: `${product.title}, ${product.rate}, ${product.maxLimit}`,
        })),
      );
    })();
    return () => {
      alive = false;
    };
  }, []);

  const getProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const range = rect.height - window.innerHeight;
    const raw = range > 0 ? -rect.top / range : 0;
    return Math.min(1, Math.max(0, (raw - DWELL) / (1 - 2 * DWELL)));
  }, []);

  /** Page scroll position that shows card `index`. */
  const cardScrollY = (index: number) => {
    const track = trackRef.current;
    if (!track) return window.scrollY;
    const range = track.offsetHeight - window.innerHeight;
    return track.getBoundingClientRect().top + window.scrollY + progressFor(index) * range;
  };

  const scrollToCard = (index: number) => {
    window.scrollTo({ top: cardScrollY(index), behavior: "smooth" });
  };

  // Horizontal swipes and drags on the cards scroll the page by the same amount a card step
  // takes, so the page scroll stays the one source of truth. A swipe never carries the page
  // past the first or last card.
  const scrubBy = (cards: number) => {
    const first = cardScrollY(0);
    const last = cardScrollY(products.length - 1);
    const step = (last - first) / (products.length - 1);
    const y = window.scrollY;
    let next = y + cards * step;
    if (cards > 0) next = Math.min(next, Math.max(y, last));
    else next = Math.max(next, Math.min(y, first));
    window.scrollTo({ top: next, behavior: "instant" });
  };

  const settleScrub = (glideCards: number) => {
    const position = getProgress() * (products.length - 1) + glideCards;
    scrollToCard(Math.min(products.length - 1, Math.max(0, Math.round(position))));
  };

  // A remounted gallery starts back on the first card.
  const [wasGranted, setWasGranted] = useState(granted);
  if (granted !== wasGranted) {
    setWasGranted(granted);
    if (!granted) setActive(0);
  }

  const current = products[active] ?? products[0];

  return (
    // data-glide-skip: button-triggered glides hop over the pinned range (lib/smooth-scroll.ts).
    <div ref={trackRef} data-glide-skip className="relative" style={{ height: `calc(100svh + ${RANGE_SVH}svh)` }}>
      {/* Hash anchors for deep links that still scroll this section into view. */}
      {products.map((product, i) => (
        <span
          key={product.slug}
          id={`product-${product.slug}`}
          className="absolute left-0"
          style={{ top: `${progressFor(i) * RANGE_SVH}svh` }}
        />
      ))}
      <div ref={iconsRef} hidden>
        {products.map((product) => (
          <Icon key={product.slug} name={product.icon} />
        ))}
      </div>

      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_80%)]">
          {background}
        </div>
        <div className="relative px-5 pt-[clamp(1.5rem,8svh,5rem)] sm:px-8">{heading}</div>

        <div ref={stageRef} className="relative mt-[clamp(0rem,2svh,1.5rem)] min-h-0 flex-1">
          {items && granted ? (
            <CircularGallery
              items={items}
              bend={2.5}
              itemSize={1.25}
              itemAspect={W / H}
              gap={0.16}
              borderRadius={RADIUS}
              wave={0.6}
              fadeEdges={0.08}
              shadow={0.22}
              shadowColor="#7b8fc8"
              textColor="#1A2B56"
              font="bold 30px sans-serif"
              showTitles={false}
              scrollEase={0.05}
              loop={false}
              intro={false}
              getProgress={getProgress}
              onScrub={scrubBy}
              onScrubEnd={settleScrub}
              openOnClick={false}
              wheelScroll={false}
              selectedIndex={undefined}
              autoScroll={0}
              aria-label="Our loan products"
              onActiveChange={setActive}
              onItemClick={(_item: GalleryItem, index: number) => {
                goEligibility(products[index]);
              }}
            />
          ) : null}
        </div>

        <div className="relative flex flex-col items-center gap-3 px-5 pt-3 pb-[clamp(1rem,5svh,3rem)] text-center">
          <EligibilityLink
            product={current.calculator}
            className="group inline-flex items-center gap-3 rounded-full bg-[#1A2B56] py-2 pr-2 pl-6 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(26,43,86,0.28)] transition-colors hover:bg-[#40B5FF] sm:text-base"
          >
            Apply Now
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1A2B56] transition-transform group-hover:translate-x-0.5">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </EligibilityLink>
          <div className="flex items-center gap-1.5" aria-hidden>
            {products.map((product, i) => (
              <span
                key={product.slug}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-[#40B5FF]" : "w-1.5 bg-[#c9d8ec]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

