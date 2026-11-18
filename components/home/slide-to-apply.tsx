"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ShinyText from "@/components/ui/reactbits/ShinyText";
import WakeSlider from "@/components/ui/reactbits/WakeSlider";

/**
 * "Slide to apply" – an extra, playful path to the calculator. The normal
 * button next to it remains the primary and keyboard-friendly way in.
 */
export function SlideToApply() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const fired = useRef(false);

  useEffect(() => {
    if (value < 100 || fired.current) return;
    fired.current = true;
    router.push("/#calculator");
    const t = setTimeout(() => {
      setValue(0);
      fired.current = false;
    }, 900);
    return () => clearTimeout(t);
  }, [value, router]);

  // Letting go before the end springs the handle back.
  const release = () => setValue((v) => (v >= 100 ? v : 0));

  return (
    <div
      className="mx-auto mt-6 w-full max-w-[18rem]"
      onPointerUp={release}
      onPointerCancel={release}
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[#2f7fe8] uppercase">
        <ShinyText
          text="or slide to apply"
          color="#2f7fe8"
          shineColor="#ffffff"
          speed={3}
        />
      </p>
      <WakeSlider
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={5}
        showValue={false}
        ariaLabel="Slide to apply. Or use the Get Started Now button."
        fillColor="#3ab6fc"
        trackColor="rgba(22,82,156,0.16)"
        crestColor="#16529c"
      />
    </div>
  );
}
