import { DotGridLazy } from "@/components/ui/reactbits/lazy";
import { WebglOnView } from "@/components/webgl-slots";
import { ProductGallery } from "@/components/home/product-gallery";

export function Products() {
  return (
    <section id="products" className="relative bg-white">
      <ProductGallery
        background={
          <WebglOnView
            className="pointer-events-none absolute inset-0"
            fallback={<div className="stage-dots absolute inset-0 opacity-60" />}
          >
            <DotGridLazy
              dotSize={3}
              gap={15}
              baseColor="#b9c6d8"
              activeColor="#3ab6fc"
              proximity={120}
            />
          </WebglOnView>
        }
        heading={
          <h2 className="text-center text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] font-black tracking-[-0.03em]">
            <span className="offerings-title">Our Offerings</span>
          </h2>
        }
      />
    </section>
  );
}
