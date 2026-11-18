/**
 * Scrolls the window to an element with a visible, eased glide. The browser's own smooth
 * scroll is capped at a short duration, so over the long home page it looks like a jump.
 * This one lasts longer for longer trips, re-measures the target every frame (so late layout
 * shifts don't make it miss), and stops as soon as the visitor scrolls themselves.
 *
 * Pinned sections are skipped: an element marked `data-glide-skip` is a tall scroll track
 * whose sticky child stays put on screen while the page scrolls through it. Gliding through
 * that range would look like the page froze, so the glide hops straight across it. The hop
 * is invisible, because the pinned frame looks the same at both ends of the range.
 */
let cancelCurrent: (() => void) | null = null;

/** Window event fired when a glide finishes or is cancelled. */
export const GLIDE_END_EVENT = "finkuby:glide-end";

/**
 * True while a smoothScrollTo glide is running. Sections the glide only passes through use
 * it (and the `html[data-gliding]` attribute in CSS) to skip costly effects so it stays smooth.
 */
export function isGliding() {
  return typeof document !== "undefined" && document.documentElement.hasAttribute("data-gliding");
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Span = { from: number; length: number };

/** Pinned scroll ranges lying between `lo` and `hi`, clipped to them, in page order. */
function pinnedSpans(lo: number, hi: number): Span[] {
  const spans: Span[] = [];
  document.querySelectorAll("[data-glide-skip]").forEach((el) => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const from = Math.max(lo, top);
    const to = Math.min(hi, top + (el as HTMLElement).offsetHeight - window.innerHeight);
    if (to > from) spans.push({ from, length: to - from });
  });
  return spans.sort((a, b) => a.from - b.from);
}

/** Page position → position with the pinned ranges squeezed out. */
const toVisual = (y: number, spans: Span[]) =>
  spans.reduce((v, s) => v - Math.min(Math.max(y - s.from, 0), s.length), y);

/** Inverse of toVisual: a point exactly at a span's start stays there, past it hops over. */
const toPage = (v: number, spans: Span[]) => {
  let y = v;
  for (const s of spans) if (y > s.from) y += s.length;
  return y;
};

export function smoothScrollTo(target: Element, { offset = 0 }: { offset?: number } = {}) {
  cancelCurrent?.();

  const destination = () =>
    Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  const start = window.scrollY;
  const spansFor = (end: number) => pinnedSpans(Math.min(start, end), Math.max(start, end));

  const firstEnd = destination();
  const firstSpans = spansFor(firstEnd);
  const distance = Math.abs(toVisual(firstEnd, firstSpans) - toVisual(start, firstSpans));
  // ~0.9s for a short hop, growing with the distance actually seen, capped at 2.4s.
  const duration = Math.min(2400, 900 + distance * 0.12);
  const startedAt = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    removeEventListener("wheel", stop);
    removeEventListener("touchstart", stop);
    removeEventListener("keydown", stop);
    if (cancelCurrent === stop) {
      cancelCurrent = null;
      document.documentElement.removeAttribute("data-gliding");
      window.dispatchEvent(new Event(GLIDE_END_EVENT));
    }
  };
  cancelCurrent = stop;
  document.documentElement.setAttribute("data-gliding", "");
  addEventListener("wheel", stop, { passive: true });
  addEventListener("touchstart", stop, { passive: true });
  addEventListener("keydown", stop);

  const step = (now: number) => {
    const t = Math.min(1, (now - startedAt) / duration);
    const end = destination();
    const spans = spansFor(end);
    const from = toVisual(start, spans);
    const v = from + (toVisual(end, spans) - from) * easeInOutCubic(t);
    const y = t < 1 ? toPage(v, spans) : end;
    // "instant" bypasses the page's CSS scroll-behavior: smooth, which would fight each frame.
    window.scrollTo({ top: y, behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };
  frame = requestAnimationFrame(step);
}
