"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GooeyNav from "@/components/ui/reactbits/GooeyNav";import { ApplyButton } from "@/components/apply-button";
import { CalculatorLink } from "@/components/calculator-link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { selectCalculatorProduct } from "@/lib/calculator-selection";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { LOGIN_URL, calculatorMenu, productMenu, products } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui";

type Variant = "hero" | "solid";

// The gooey blob (GooeyNav) provides the hover/selected background; text flips to navy on it.
const linkTone: Record<Variant, string> = {
  hero: "text-[#0b2347] data-[goo-on]:text-[#0b2347]",
  solid: "text-[#0b2347]",
};

const blob: Record<Variant, { color: string; particles: string[] }> = {
  hero: { color: "#eaf6ff", particles: ["#3ab6fc", "#eaf6ff", "#9ed6ff"] },
  solid: { color: "#c6e6ff", particles: ["#3ab6fc", "#9ed6ff", "#16529c"] },
};

type NavKey = "about" | "products" | "calculator" | "partners" | "testimonials";

function navLink(variant: Variant) {
  return `relative items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ab6fc] ${linkTone[variant]}`;
}

function Dropdown({
  label,
  variant,
  dataNav,
  columns = 1,
  current,
  children,
}: {
  label: string;
  variant: Variant;
  dataNav?: string;
  columns?: number;
  current?: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusFirst = useRef(false);
  const close = () => setOpen(false);

  const items = () =>
    Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );

  // Opened from the keyboard: move focus into the menu once it has rendered.
  useEffect(() => {
    if (open && focusFirst.current) items()[0]?.focus();
    focusFirst.current = false;
  }, [open]);

  function onKeyDown(event: React.KeyboardEvent) {
    const { key } = event;
    if (key === "Escape") {
      if (open) {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
      return;
    }
    const step =
      key === "ArrowDown" || key === "ArrowRight"
        ? 1
        : key === "ArrowUp" || key === "ArrowLeft"
          ? -1
          : key === "Home"
            ? "start"
            : key === "End"
              ? "end"
              : 0;
    if (!step) return;
    if (!open) {
      if (key !== "ArrowDown") return;
      event.preventDefault();
      focusFirst.current = true;
      setOpen(true);
      return;
    }
    event.preventDefault();
    const list = items();
    const at = list.indexOf(document.activeElement as HTMLElement);
    // Products is a two-column grid: Up/Down move by a row, Left/Right by one item.
    const by = columns > 1 && (key === "ArrowDown" || key === "ArrowUp") ? columns : 1;
    const next =
      step === "start" ? 0 : step === "end" ? list.length - 1 : at + step * by;
    if (next < 0) triggerRef.current?.focus();
    else list[Math.min(next, list.length - 1)]?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={onKeyDown}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setOpen(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        data-nav={dataNav}
        data-goo=""
        aria-current={current ? "location" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex ${navLink(variant)}`}
      >
        {label}
        <Icon
          name="chevron"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div className="absolute top-full left-0 z-30 pt-2">
          <div
            role="menu"
            aria-label={label}
            className={`nav-panel rounded-2xl bg-white p-2 text-[#0b2347] shadow-[0_24px_60px_rgba(6,22,51,0.22)] ring-1 ring-[#e3eaf4] ${columns > 1 ? "grid w-[32rem] grid-cols-2 gap-1" : "min-w-64"}`}
          >
            {children(close)}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const menuItem =
  "block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-[#24364f] transition-colors hover:bg-[#eef5fd] hover:text-[#01357c]";

const itemFocus =
  "outline-none focus-visible:bg-[#eef5fd] focus-visible:text-[#01357c] focus-visible:ring-2 focus-visible:ring-[#3ab6fc]";

const blurb: Record<string, string> = {
  "personal-loan": "Quick funds, no end-use limit",
  "home-loan": "Buy or build your home",
  "business-loan": "Working capital to grow",
  "used-car-loan": "Drive home a pre-owned car",
  "loan-against-property": "Unlock your property's value",
  "credit-cards": "Premium rewards and perks",
};

const productIcon = Object.fromEntries(products.map((p) => [p.slug, p.icon]));

function ProductsMenu({ close, desktop = false }: { close: () => void; desktop?: boolean }) {
  return productMenu.map((item, i) =>
    desktop ? (
      <Link
        key={item.slug}
        href={`/#product-${item.slug}`}
        role="menuitem"
        tabIndex={-1}
        onClick={close}
        style={{ "--i": i } as React.CSSProperties}
        className={`nav-item group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#eef5fd] ${itemFocus}`}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#eaf6ff] text-[#16529c] transition-colors group-hover:bg-[#3ab6fc] group-hover:text-white group-focus-visible:bg-[#3ab6fc] group-focus-visible:text-white">
          <Icon name={productIcon[item.slug]} className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-[#0b2347]">
            {item.label}
          </span>
          <span className="block text-xs text-[#5b6b82]">{blurb[item.slug]}</span>
        </span>
      </Link>
    ) : (
      <Link
        key={item.slug}
        href={`/#product-${item.slug}`}
        onClick={close}
        className={menuItem}
      >
        {item.label}
      </Link>
    ),
  );
}

const calcCard: Record<string, { title: string; icon: IconName }> = {
  personal: { title: "Personal Loan", icon: "user" },
  business: { title: "Business Loan", icon: "briefcase" },
  "debt-consolidation": { title: "Debt Consolidation", icon: "coins" },
  lap: { title: "Home / Property Loan", icon: "home" },
};

function CalculatorMenu({ close, desktop = false }: { close: () => void; desktop?: boolean }) {
  return calculatorMenu.map((item, i) => {
    const onClick = () => {
      selectCalculatorProduct(item.key);
      close();
    };
    if (!desktop)
      return (
        <Link key={item.key} href="/#calculator" onClick={onClick} className={menuItem}>
          {item.label}
        </Link>
      );
    const card = calcCard[item.key];
    return (
      <Link
        key={item.key}
        href="/#calculator"
        role="menuitem"
        tabIndex={-1}
        aria-label={item.label}
        onClick={onClick}
        style={{ "--i": i } as React.CSSProperties}
        className={`nav-item group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#eef5fd] ${itemFocus}`}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#eaf6ff] text-[#16529c] transition-colors group-hover:bg-[#3ab6fc] group-hover:text-white group-focus-visible:bg-[#3ab6fc] group-focus-visible:text-white">
          <Icon name={card.icon} className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-[#0b2347]">{card.title}</span>
          <span className="block text-xs text-[#5b6b82]">EMI calculator</span>
        </span>
      </Link>
    );
  });
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-x-3 top-full z-30 mt-1 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-3xl bg-white p-3 text-[#0b2347] shadow-[0_30px_70px_rgba(6,22,51,0.28)] ring-1 ring-[#e3eaf4] 2xl:hidden">
      <nav aria-label="Mobile" className="grid gap-1">
        <Link href={LOGIN_URL} onClick={onClose} className={`${menuItem} sm:hidden`}>
          Login
        </Link>
        <Link href="/about" onClick={onClose} className={menuItem}>
          About us
        </Link>
        <Link href="/partners" onClick={onClose} className={menuItem}>
          Become a Partner
        </Link>
        <Link href="/#testimonials" onClick={onClose} className={menuItem}>
          Testimonials
        </Link>
        <p className="px-3.5 pt-3 pb-1 text-[11px] font-semibold tracking-[0.16em] text-[#8b95a6] uppercase">
          Products
        </p>
        <ProductsMenu close={onClose} />
        <p className="px-3.5 pt-3 pb-1 text-[11px] font-semibold tracking-[0.16em] text-[#8b95a6] uppercase">
          EMI Calculator
        </p>
        <CalculatorMenu close={onClose} />
      </nav>
    </div>
  );
}

// logo11/LOGO7 are square canvases with the wordmark in a ~3.5:1 band across the middle, so
// the box is that shape and object-cover crops the empty top and bottom away.
const LOGO_BOX = "block h-8 w-[112px] shrink-0 sm:h-10 sm:w-[140px]";

/**
 * The header logo, fixed in the header's top-left spot so it stays on screen on every page
 * while scrolling. Over the dark footer it swaps to the white wordmark. Clicking it goes
 * back to the top of the home page: a glide when already there, otherwise a navigation.
 */
function FixedLogo({ preload, logoSrc }: { preload: boolean; logoSrc: string }) {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const [onDark, setOnDark] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const logo = ref.current?.getBoundingClientRect();
        const footer = document.querySelector("footer")?.getBoundingClientRect();
        if (!logo || !footer) return;
        const mid = logo.top + logo.height / 2;
        setOnDark(mid > footer.top && mid < footer.bottom);
      });
    };
    check();
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
  }, [pathname]);

  const image = (src: string, visible: boolean) => (
    <Image
      src={src}
      alt={visible ? "Finkuby Technologies" : ""}
      fill
      sizes="140px"
      preload={preload && src === logoSrc}
      draggable={false}
      className={`object-cover object-center transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    />
  );

  const logo = (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center px-5 sm:h-[88px] sm:px-8 lg:px-12">
        <Link
          ref={ref}
          href="/"
          aria-label="Finkuby Technologies home"
          className={`${LOGO_BOX} pointer-events-auto relative overflow-hidden`}
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            history.replaceState(history.state, "", "/");
            smoothScrollTo(document.documentElement);
          }}
        >
          {image(logoSrc, !onDark)}
          {image("/LOGO7.png", onDark)}
        </Link>
      </div>
    </div>
  );
  // Once hydrated, render into <body>: the header sits inside the hero's own stacking
  // context, where later sections would paint over a fixed logo. The server render stays
  // in place (same position), so there is no flash before hydration.
  return mounted ? createPortal(logo, document.body) : logo;
}

const noopSubscribe = () => () => {};

/**
 * Site header.
 * - `hero`: transparent over the home hero. Render it only once per page.
 * - `solid`: white bar for inner pages.
 */
export function SiteHeader({
  variant,
  logoSrc = "/logo11.png",
}: {
  variant: Variant;
  /** Header wordmark shown over the page (a 3.5:1 wordmark canvas like logo11). Over the footer it is always LOGO7. */
  logoSrc?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hero = variant === "hero";
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [section, setSection] = useState<NavKey | null>(null);

  // On the home page the current link follows the section in the middle of the screen.
  useEffect(() => {
    if (pathname !== "/") return;
    const map: Record<string, NavKey> = {
      products: "products",
      calculator: "calculator",
      testimonials: "testimonials",
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const key = map[entry.target.id];
          if (entry.isIntersecting) setSection(key);
          else setSection((now) => (now === key ? null : now));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const active: NavKey | null =
    pathname === "/about" ? "about" : pathname === "/partners" ? "partners" : pathname === "/" ? section : null;
  const page = pathname === "/about" || pathname === "/partners" ? "page" : "location";
  const cur = (key: NavKey) => (active === key ? page : undefined);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto flex h-[76px] max-w-[1480px] items-center px-5 sm:h-[88px] sm:px-8 lg:px-12"
    >
      <GooeyNav
        rootRef={rootRef}
        color={blob[variant].color}
        particleColors={blob[variant].particles}
        activeKey={active}
      />
      {/* Keeps the logo's spot in the bar; the logo itself is fixed (see FixedLogo). */}
      <span aria-hidden className={`${LOGO_BOX} self-center`} />
      <FixedLogo preload={hero} logoSrc={logoSrc} />

      <nav
        aria-label="Primary"
        className="ml-6 hidden min-w-0 flex-1 items-center justify-evenly md:flex lg:ml-10"
      >
        <Link
          href="/about"
          data-nav="about"
          data-goo=""
          aria-current={cur("about")}
          className={`inline-flex ${navLink(variant)}`}
        >
          About us
        </Link>
        <Dropdown
          label="Products"
          variant={variant}
          dataNav={hero ? "products" : undefined}
          columns={2}
          current={active === "products"}
        >
          {(close) => <ProductsMenu close={close} desktop />}
        </Dropdown>
        <div className="hidden xl:block">
          <Dropdown
            label="EMI Calculator"
            variant={variant}
            columns={2}
            current={active === "calculator"}
          >
            {(close) => <CalculatorMenu close={close} desktop />}
          </Dropdown>
        </div>
        <Link
          href="/partners"
          data-goo=""
          aria-current={cur("partners")}
          className={`${navLink(variant)} hidden 2xl:inline-flex`}
        >
          Become a Partner
        </Link>
        <Link
          href="/#testimonials"
          data-goo=""
          aria-current={cur("testimonials")}
          className={`${navLink(variant)} hidden md:inline-flex`}
        >
          Testimonials
        </Link>
      </nav>

      <div className="ml-4 flex items-center gap-2 sm:gap-3 lg:ml-6 lg:gap-4">
        {/* Hidden on phones, where it lives in the menu instead, so the bar doesn't crowd. */}
        <Link
          href={LOGIN_URL}
          className="hidden px-1 py-2 text-sm font-semibold whitespace-nowrap text-[#16529c] transition-colors hover:text-[#3ab6fc] sm:inline-flex"
        >
          Login
        </Link>
        {hero ? (
          <CalculatorLink className="rounded-full bg-[#3ab6fc] px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#67c8ff] sm:px-5 sm:py-2.5">
            Get started
          </CalculatorLink>
        ) : (
          <ApplyButton fallbackClassName="rounded-full bg-[#3ab6fc] px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#67c8ff] sm:px-5 sm:py-2.5">
            Get started
          </ApplyButton>
        )}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className={`flex h-10 w-10 items-center justify-center rounded-full 2xl:hidden ${
            hero
              ? "text-[#0b2347] ring-1 ring-[#0b2347]/30 hover:bg-[#0b2347]/10"
              : "text-[#01357c] ring-1 ring-[#d6e0ee] hover:bg-[#eef5fd]"
          }`}
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
    </div>
  );
}
