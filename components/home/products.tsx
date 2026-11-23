import { DotGridLazy } from "@/components/ui/reactbits/lazy";
import { WebglOnView } from "@/components/webgl-slots";
import { ProductGallery } from "@/components/home/product-gallery";

/** Same value for pad + background-position so the 15px dot grid stays continuous. */
const OFFERINGS_PAD = "clamp(5.5rem, 16vh, 10rem)";

export function Products() {
  return (
    <section
      id="products"
      className="relative bg-white"
      style={{ paddingTop: OFFERINGS_PAD }}
    >
      {/* Fade-in dots only in the spacer — ends exactly where the gallery grid begins. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ height: OFFERINGS_PAD }}
      >
        <div
          className="stage-dots absolute inset-0 opacity-60"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 100%)",
          }}
        />
      </div>
      <div className="relative z-[1]">
        <ProductGallery
          background={
            <WebglOnView
              className="pointer-events-none absolute inset-0"
              fallback={
                <div
                  className="stage-dots absolute inset-0 opacity-60"
                  style={{ backgroundPosition: `0 calc(-1 * ${OFFERINGS_PAD})` }}
                />
              }
            >
              <DotGridLazy
                dotSize={3}
                gap={15}
                baseColor="#b9c6d8"
                activeColor="#40B5FF"
                proximity={120}
              />
            </WebglOnView>
          }
          heading={
            <h2 className="font-agrandir text-center text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.03em] text-[#1A2B56]">
              Our Offerings
            </h2>
          }
        />
      </div>
    </section>
  );
}
