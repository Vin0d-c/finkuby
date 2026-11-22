"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, useSpring } from "motion/react";
import { LoanApplicationForm } from "@/components/loan-application-form";
import { Modal } from "@/components/modal";
import CometDial from "@/components/ui/reactbits/CometDial";
import Counter from "@/components/ui/reactbits/Counter";
import OptionWheel from "@/components/ui/reactbits/OptionWheel";
import { SectionHeading } from "@/components/ui";
import {
  CALCULATOR_EVENT,
  takePendingCalculatorProduct,
} from "@/lib/calculator-selection";
import {
  CALC_AMOUNT_STEP,
  CALC_MAX_AMOUNT,
  CALC_MAX_RATE,
  CALC_MIN_AMOUNT,
  calculatorProducts,
  getCalculatorProduct,
  type CalculatorProduct,
} from "@/lib/site";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const rupees = (value: number) => `₹${inr.format(Math.round(value))}`;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function emiFor(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  const growth = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * growth) / (growth - 1);
}

function compactAmount(value: number) {
  if (value >= 1e7)
    return `₹${(value / 1e7).toFixed(value % 1e7 === 0 ? 0 : 1)} Cr`;
  if (value >= 1e5)
    return `₹${(value / 1e5).toFixed(value % 1e5 === 0 ? 0 : 1)} Lakhs`;
  return `₹${value / 1e3}K`;
}

/**
 * Ring segment between two angles (radians, clockwise from 3 o'clock) with flat
 * ends. Ends are cut parallel to the radius so the gap between segments has an
 * even width.
 */
function ringSegment(
  start: number,
  end: number,
  outer: number,
  inner: number,
  gap: number,
  c = 90,
) {
  const half = gap / 2;
  const point = (r: number, a: number, side: 1 | -1) => {
    const shift = side * Math.asin(Math.min(1, half / r));
    return [c + r * Math.cos(a + shift), c + r * Math.sin(a + shift)] as const;
  };
  const [ox0, oy0] = point(outer, start, 1);
  const [ox1, oy1] = point(outer, end, -1);
  const [ix1, iy1] = point(inner, end, -1);
  const [ix0, iy0] = point(inner, start, 1);
  const large = end - start > Math.PI ? 1 : 0;
  return `M${ox0} ${oy0}A${outer} ${outer} 0 ${large} 1 ${ox1} ${oy1}L${ix1} ${iy1}A${inner} ${inner} 0 ${large} 0 ${ix0} ${iy0}Z`;
}

// A small stroke with round joins softens the corners. The fill is inset by
// the same amount so the stroke brings it back to full size.
const RING_CORNER = 3;
const RING_OUTER = 84 - RING_CORNER;
const RING_INNER = 56 + RING_CORNER;
const RING_GAP = 6 + RING_CORNER * 2;
const MIN_SWEEP = 0.12;

/** Ring midline radius as a share of the 180-unit viewBox, in percent. */
const RING_MID_PCT = (70 / 180) * 100;

function DonutChip({
  angle,
  label,
  value,
  dot,
  alt = false,
}: {
  angle: number;
  label: string;
  value: string;
  dot: string;
  alt?: boolean;
}) {
  // The svg is turned -90deg, so a segment angle of 0 points straight up.
  const a = angle - Math.PI / 2;
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${50 + RING_MID_PCT * Math.cos(a)}%`,
        top: `${50 + RING_MID_PCT * Math.sin(a)}%`,
      }}
    >
      <div
        className={`donut-chip ${alt ? "donut-chip-alt" : ""} rounded-xl bg-white/90 px-2.5 py-1.5 text-left whitespace-nowrap shadow-[0_10px_24px_rgba(11,35,71,0.14)] ring-1 ring-[#0b2347]/8 backdrop-blur-sm will-change-transform`}
      >
        <p className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.14em] text-[#5b6b82] uppercase">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
          {label}
        </p>
        <p className="mt-0.5 text-xs font-bold text-[#0b2347]">{value}</p>
      </div>
    </div>
  );
}

/** Principal vs. interest ring. The split eases to each new value. */
function EmiDonut({
  interestShare,
  principal,
  interest,
}: {
  interestShare: number;
  principal: number;
  interest: number;
}) {
  const spring = useSpring(interestShare, { stiffness: 90, damping: 20, mass: 1 });
  const [shown, setShown] = useState(interestShare);

  useEffect(() => {
    spring.set(interestShare);
  }, [interestShare, spring]);
  useMotionValueEvent(spring, "change", setShown);

  const split = clamp(shown, 0, 1) * 2 * Math.PI;
  const segment = (start: number, end: number, color: string) => (
    <path
      d={ringSegment(start, end, RING_OUTER, RING_INNER, RING_GAP)}
      fill={color}
      stroke={color}
      strokeWidth={RING_CORNER * 2}
      strokeLinejoin="round"
    />
  );

  return (
    <div className="relative h-48 w-48 shrink-0">
      <svg
        viewBox="0 0 180 180"
        // Soft halo that follows the ring's shape (not a box shadow).
        className="h-full w-full -rotate-90 [filter:drop-shadow(0_0_6px_rgba(58,182,252,0.45))_drop-shadow(0_0_16px_rgba(59,142,248,0.25))]"
        aria-hidden
      >
        {split < MIN_SWEEP ? (
          <circle cx="90" cy="90" r="70" fill="none" stroke="#3ab6fc" strokeWidth="28" />
        ) : 2 * Math.PI - split < MIN_SWEEP ? (
          <circle cx="90" cy="90" r="70" fill="none" stroke="#16529c" strokeWidth="28" />
        ) : (
          <>
            {segment(split, 2 * Math.PI, "#3ab6fc")}
            {segment(0, split, "#16529c")}
          </>
        )}
      </svg>
      {/* Midpoints of two arcs that fill the circle are always opposite, so the chips never collide. */}
      <DonutChip
        angle={split + (2 * Math.PI - split) / 2}
        label="Principal"
        value={rupees(principal)}
        dot="#3ab6fc"
      />
      <DonutChip
        angle={split / 2}
        label="Interest"
        value={rupees(interest)}
        dot="#16529c"
        alt
      />
    </div>
  );
}

/**
 * Concentric arcs spreading from the left edge. Each ring is a translucent disc, so overlaps
 * step the blue darker toward the centre; a faint rim just outside each disc gives the soft
 * raised edge. Radii are in `cqh` of the backdrop container, so the outermost ring always
 * closes inside the section.
 */
const RING_RADII_CQH = [7.5, 12.5, 18, 24, 30.5, 38, 46];
const CALC_RINGS = [
  "radial-gradient(circle at 0% 51%, rgba(37,128,240,0.5) 0, rgba(37,128,240,0) 11cqh)",
  ...RING_RADII_CQH.map(
    (r) =>
      `radial-gradient(circle at 0% 51%, rgba(74,155,242,0.13) ${r}cqh, rgba(20,85,190,0.07) ${r}cqh, transparent calc(${r}cqh + 12px))`,
  ),
].join(", ");
const CALC_WASH =
  "linear-gradient(to right, #b4d6fb 0%, #cfe5fc 30%, #e3effd 55%, #f2f8fe 78%, #ffffff 96%)";
const CALC_WASH_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)";

/** Digits only, grouped the Indian way while typing: "1000000" → "10,00,000". */
function groupDigits(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 9);
  return digits ? Number(digits).toLocaleString("en-IN") : "";
}

/** Slider with a typed value box, matching the live calculator's behaviour. */
function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  parse,
  onChange,
  ticks,
  boxed = false,
}: {
  /** Show a border around the value on hover/focus so it reads as typeable. */
  boxed?: boolean;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: (value: number) => string;
  parse: (raw: string) => number;
  onChange: (value: number) => void;
  ticks: string[];
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // How many digits sit left of the caret, so it can be put back after commas are re-inserted.
  const caretDigits = useRef<number | null>(null);
  const percent = ((value - min) / (max - min)) * 100;

  useLayoutEffect(() => {
    const input = inputRef.current;
    const digits = caretDigits.current;
    if (!input || digits == null || draft == null) return;
    caretDigits.current = null;
    let pos = 0;
    for (let seen = 0; pos < draft.length && seen < digits; pos++) {
      if (/\d/.test(draft[pos])) seen++;
    }
    input.setSelectionRange(pos, pos);
  }, [draft]);
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={`${id}-input`}
          className="text-[13px] font-semibold text-[#0b2347]"
        >
          {label}
        </label>
        <input
          id={`${id}-input`}
          type="text"
          inputMode="decimal"
          ref={inputRef}
          value={draft ?? display(value)}
          onFocus={() => setDraft(boxed ? groupDigits(String(value)) : String(value))}
          onChange={(event) => {
            const raw = event.target.value;
            if (!boxed) return setDraft(raw);
            const caret = event.target.selectionStart ?? raw.length;
            caretDigits.current = raw.slice(0, caret).replace(/\D/g, "").length;
            setDraft(groupDigits(raw));
          }}
          onBlur={() => {
            // An emptied field keeps the old value instead of snapping to the minimum.
            const parsed = draft?.trim() ? parse(draft) : NaN;
            if (!Number.isNaN(parsed)) onChange(clamp(parsed, min, max));
            setDraft(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.currentTarget.blur();
          }}
          title={boxed ? `Type an amount between ${display(min)} and ${display(max)}` : undefined}
          className={
            boxed
              ? "w-[9.5rem] cursor-text rounded-lg border border-transparent bg-transparent px-2.5 py-1.5 text-right text-[15px] font-bold text-[#0b2347] outline-none transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#3ab6fc] hover:bg-white/70 focus:border-[#3ab6fc] focus:bg-white focus:shadow-[0_0_0_3px_rgba(58,182,252,0.18)]"
              : "w-[9.5rem] bg-transparent px-1 py-2 text-right text-[15px] font-bold text-[#0b2347] outline-none"
          }
        />
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="finkuby-range mt-4 w-full"
        style={{ ["--fill" as string]: `${percent}%` }}
      />
      <div className="mt-2.5 flex justify-between text-[11px] font-medium text-[#5b6b82]">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}

export function EmiCalculator() {
  const [product, setProduct] = useState<CalculatorProduct>(
    calculatorProducts[0],
  );
  const [amount, setAmount] = useState(product.defaultAmount);
  const [rate, setRate] = useState(product.minRate);
  const [tenure, setTenure] = useState(product.defaultTenure);
  const [applying, setApplying] = useState(false);
  // A pick made outside the wheel (the <select>, an Apply Now link) remounts the wheel at
  // that product. Picks made by the wheel itself, including its auto-roll, never remount
  // it, so its slide animation plays uninterrupted. `anchor` is the externally picked
  // product, kept in the wheel's list even if it isn't normally a picker item.
  const [wheel, setWheel] = useState({ epoch: 0, anchor: calculatorProducts[0].key });

  // The wheel rolls on its own until the visitor hovers it or touches any control; then it
  // stops for the rest of the visit (state resets only on a page reload).
  const [autoRoll, setAutoRoll] = useState(true);
  const stopAutoRoll = () => setAutoRoll(false);

  const choose = (key: string | null) => {
    const next = getCalculatorProduct(key);
    setProduct(next);
    setAmount(next.defaultAmount);
    setRate(next.minRate);
    setTenure(next.defaultTenure);
    return next;
  };
  const chooseExternal = (key: string | null) => {
    const next = choose(key);
    setWheel((w) => ({ epoch: w.epoch + 1, anchor: next.key }));
  };

  useEffect(() => {
    const pending = takePendingCalculatorProduct();
    // Syncing with a selection made on another page before navigating here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pending) chooseExternal(pending);
    const onSelect = (event: Event) => {
      takePendingCalculatorProduct();
      chooseExternal((event as CustomEvent<string>).detail);
    };
    window.addEventListener(CALCULATOR_EVENT, onSelect);
    return () => window.removeEventListener(CALCULATOR_EVENT, onSelect);
    // Mount-only subscription; the handlers only call state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickerProducts = calculatorProducts.filter(
    (item) => item.inPicker || item.key === wheel.anchor,
  );

  const emi = emiFor(amount, rate, tenure);
  const months = tenure * 12;
  const total = emi * months;
  const interest = total - amount;
  const interestShare = total > 0 ? interest / total : 0;

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-white pt-14 pb-32 text-[#0b2347] sm:pt-16 sm:pb-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [container-type:size]"
      >
        <div
          className="absolute inset-0"
          style={{
            background: CALC_WASH,
            maskImage: CALC_WASH_MASK,
            WebkitMaskImage: CALC_WASH_MASK,
          }}
        />
        <div className="absolute inset-0" style={{ background: CALC_RINGS }} />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="[&_h2]:mt-0 [&_h2]:font-light [&_h2]:tracking-[-0.02em] [&>div]:max-w-none md:[&_h2]:whitespace-nowrap">
          <SectionHeading
            title="Choose Your Loan. Plan Your EMI."
            accent="Apply"
          />
        </div>

        <div
          className="relative mt-20"
          onPointerDownCapture={stopAutoRoll}
          onKeyDownCapture={stopAutoRoll}
          onInputCapture={stopAutoRoll}
        >
          <div
            onPointerEnter={stopAutoRoll}
            onWheel={stopAutoRoll}
            className="relative z-20 h-[22rem] sm:h-[26rem] lg:absolute lg:-inset-y-24 lg:-left-10 lg:h-auto lg:w-[calc((100%-8rem)/3+2.5rem)] lg:py-24 lg:pl-10"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            }}
          >
            <OptionWheel
              key={wheel.epoch}
              // Listed twice so the looping wheel has enough rows to show three faded
              // neighbours on both sides of the selection.
              items={[...pickerProducts, ...pickerProducts].map((item) => item.label)}
              defaultSelected={Math.max(
                0,
                pickerProducts.findIndex((item) => item.key === product.key),
              )}
              onChange={(index) => {
                const picked = pickerProducts[index % pickerProducts.length];
                if (!picked || picked.key === product.key) return;
                choose(picked.key);
              }}
              fontSize={1.75}
              spacing={1.42}
              curve={1}
              tilt={8}
              blur={1.6}
              fade={0.25}
              minOpacity={0}
              inset={28}
              loop
              autoAdvance={autoRoll ? 1000 : 0}
              textColor="rgba(255,255,255,0.8)"
              activeColor="#ffffff"
              className="font-sans !overflow-visible [&_[role=option][aria-selected=true]]:[text-shadow:0_2px_14px_rgba(11,47,99,0.28)] [&_[role=option]]:!font-normal [&_[role=option]]:uppercase [&_[role=option]]:tracking-[0.01em] [&_[role=option][aria-selected=true]]:!font-semibold"
            />
          </div>
          <div className="relative z-10 grid items-stretch gap-y-12 lg:grid-cols-3 lg:gap-x-16">
            <div className="hidden lg:block" aria-hidden />

            <div className="flex flex-col justify-center py-2 lg:translate-y-20">
              <label className="sr-only">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-[#8b95a6] uppercase">
                  Loan product
                </span>
                <select
                  value={product.key}
                  onChange={(event) => chooseExternal(event.target.value)}
                  className="mt-2 w-full cursor-pointer appearance-none rounded-2xl border border-[#d5e3f2] bg-white bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2316529c%22><path d=%22M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat px-4 py-3 text-[15px] font-semibold text-[#0b2347] shadow-[0_1px_2px_rgba(11,35,71,0.04)] outline-none focus:border-[#3ab6fc] focus:ring-3 focus:ring-[#3ab6fc]/20"
                >
                  {pickerProducts.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-8">
                <SliderRow
                  label="Loan Amount"
                  boxed
                  value={amount}
                  min={CALC_MIN_AMOUNT}
                  max={CALC_MAX_AMOUNT}
                  step={CALC_AMOUNT_STEP}
                  display={rupees}
                  parse={(raw) => Number(raw.replace(/[^0-9]/g, ""))}
                  onChange={setAmount}
                  ticks={[
                    compactAmount(CALC_MIN_AMOUNT),
                    compactAmount(CALC_MAX_AMOUNT),
                  ]}
                />
                <SliderRow
                  label="Interest Rate (% p.a.)"
                  value={rate}
                  min={product.minRate}
                  max={CALC_MAX_RATE}
                  step={0.01}
                  display={(value) => `${value.toFixed(2)}%`}
                  parse={(raw) =>
                    Math.round(parseFloat(raw.replace(/[^0-9.]/g, "")) * 100) /
                    100
                  }
                  onChange={setRate}
                  ticks={[`${product.minRate}%`, `${CALC_MAX_RATE}%`]}
                />
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
                  <div>
                    <p className="text-[13px] font-semibold text-[#0b2347]">
                      Loan Tenure
                    </p>
                    <p className="mt-2 text-[15px] font-bold text-[#0b2347]">
                      {tenure} {tenure === 1 ? "Year" : "Years"}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-[#5b6b82]">
                      1 – {product.maxTenure} Years
                    </p>
                  </div>
                  <div className="flex shrink-0 justify-center">
                    <CometDial
                      value={tenure}
                      min={1}
                      max={product.maxTenure}
                      step={1}
                      unit="yr"
                      label="Tenure"
                      accent="#3ab6fc"
                      ink="#0b2347"
                      size={108}
                      onChange={setTenure}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col items-center justify-start pt-[18px] pb-2 text-center lg:translate-y-20"
              aria-live="polite"
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#5b6b82] uppercase">
                Estimated Instalment
              </p>
              <p className="mt-3 flex items-baseline justify-center gap-1.5 text-[#0b2347]">
                <span className="text-[clamp(2.1rem,2.9vw,2.65rem)] leading-none font-black tracking-[-0.04em]">
                  <Counter
                    value={Math.round(emi)}
                    locale="en-IN"
                    decimals={0}
                    prefix="₹"
                    fontSize="1em"
                    fontWeight="inherit"
                    textColor="inherit"
                    duration={0.5}
                    intro={false}
                  />
                </span>
                <span className="text-sm font-semibold text-[#5b6b82]">/mo</span>
              </p>

              <div className="mt-8 flex items-end justify-center gap-7">
                <EmiDonut
                  interestShare={interestShare}
                  principal={amount}
                  interest={interest}
                />

                <dl className="grid gap-4 text-left">
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.14em] text-[#5b6b82] uppercase">
                      Total Payable
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-[#0b2347]">
                      {rupees(total)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold tracking-[0.14em] text-[#5b6b82] uppercase">
                      Repayment Period
                    </dt>
                    <dd className="mt-1 text-sm font-bold whitespace-nowrap text-[#0b2347]">
                      {months} Installments
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-2 lg:col-start-2 lg:mt-16 lg:translate-y-10 lg:pl-20">
              <button
                type="button"
                onClick={() => setApplying(true)}
                className="w-56 rounded-full bg-[#0b2347] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#163a6b]"
              >
                Apply for this Loan
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={applying}
        onClose={() => setApplying(false)}
        labelledBy="loan-form-title"
      >
        <LoanApplicationForm
          request={{
            productLabel: product.label,
            sheetType: product.sheetType,
            amount,
            tenureYears: tenure,
            rate,
          }}
          onDone={() => setApplying(false)}
        />
      </Modal>
    </section>
  );
}
