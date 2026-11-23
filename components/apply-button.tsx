"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { SpecularButtonLazy } from "@/components/ui/reactbits/lazy";
import { useInView, useWebglSlot } from "@/components/webgl-slots";
import { ELIGIBILITY_URL } from "@/lib/site";

/**
 * The site's primary pill CTA. Renders React Bits' SpecularButton (WebGL) only
 * while it is on screen and a WebGL slot is free; otherwise the plain link
 * below, which is also what server rendering and no-JS visitors get.
 */
export function ApplyButton({
  href = ELIGIBILITY_URL,
  size = "sm",
  fallbackClassName,
  tint = "#1A2B56",
  textColor = "#ffffff",
  children,
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  /** Tailwind classes for the plain-link fallback. */
  fallbackClassName: string;
  /** SpecularButton fill (defaults to logo navy). */
  tint?: string;
  textColor?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const specular = useWebglSlot(inView);

  /** Same-page section links (e.g. "/#calculator" on the home page) glide there instead of jumping. */
  const glideTarget = () => {
    const [path, hash] = href.split("#");
    if (!hash || (path || "/") !== pathname) return null;
    return document.getElementById(hash);
  };
  const glide = (target: HTMLElement) => {
    smoothScrollTo(target);
    history.replaceState(history.state, "", `#${target.id}`);
  };

  return (
    <span ref={ref} className="inline-flex">
      {specular ? (
        <SpecularButtonLazy
          size={size}
          radius={999}
          tint={tint}
          tintOpacity={0.92}
          textColor={textColor}
          lineColor={textColor}
          onClick={() => {
            const target = glideTarget();
            if (target) glide(target);
            else router.push(href);
          }}
        >
          {children}
        </SpecularButtonLazy>
      ) : (
        <Link
          href={href}
          className={fallbackClassName}
          onClick={(event) => {
            const target = glideTarget();
            if (!target) return;
            event.preventDefault();
            glide(target);
          }}
        >
          {children}
        </Link>
      )}
    </span>
  );
}
