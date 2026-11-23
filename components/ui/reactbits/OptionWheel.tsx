'use client';

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  type CSSProperties
} from 'react';

type Side = 'left' | 'right';

export type OptionWheelHandle = {
  /** Animate the wheel by `delta` steps (positive = next / down). */
  step: (delta?: number) => void;
};

export interface OptionWheelProps {
  items?: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  textColor?: string;
  activeColor?: string;
  side?: Side;
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  minOpacity?: number;
  smoothing?: number;
  inset?: number;
  loop?: boolean;
  draggable?: boolean;
  soundUrl?: string;
  soundVolume?: number;
  /** Advance one option every N ms while the wheel is on screen and not hovered. 0 turns it off. */
  autoAdvance?: number;
  className?: string;
}

interface WheelConfig {
  count: number;
  items: string[];
  rowH: number;
  curve: number;
  tilt: number;
  blur: number;
  fade: number;
  minOpacity: number;
  side: Side;
  loop: boolean;
  smoothing: number;
  draggable: boolean;
  soundUrl: string;
  soundVolume: number;
}

const DEFAULT_ITEMS = [
  'Ambient',
  'House',
  'Techno',
  'Jazz',
  'Lo-Fi',
  'Synthwave',
  'Trance',
  'Funk',
  'Disco',
  'Hip-Hop',
  'Chillwave',
  'Drum & Bass'
];

const OptionWheel = forwardRef<OptionWheelHandle, OptionWheelProps>(function OptionWheel(
  {
    items = DEFAULT_ITEMS,
    defaultSelected = 3,
    onChange,
    textColor = '#a6a6a6',
    activeColor = '#ffffff',
    side = 'left',
    fontSize = 3,
    spacing = 1.4,
    curve = 1,
    tilt = 6,
    blur = 2,
    fade = 0.25,
    minOpacity = 0.05,
    smoothing = 200,
    inset = 80,
    loop = false,
    draggable = true,
    soundUrl = '',
    soundVolume = 0.5,
    autoAdvance = 0,
    className = ''
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef(defaultSelected);
  const targetRef = useRef(defaultSelected);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const cfgRef = useRef<WheelConfig>({} as WheelConfig);
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef(defaultSelected);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef<{
    y: number;
    start: number;
    id: number;
    type: string;
    lastY: number;
    lastT: number;
    velocity: number;
  } | null>(null);
  const dragMovedRef = useRef(false);
  const dragFollowRef = useRef(false);
  const committedRef = useRef(defaultSelected);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef('');
  const lastTickRef = useRef(0);
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  const [isDragging, setIsDragging] = useState(false);

  const remPx = typeof window !== 'undefined' ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 : 16;

  onChangeRef.current = onChange;
  cfgRef.current = {
    count: items.length,
    items,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    draggable,
    soundUrl,
    soundVolume
  };

  // Single rAF loop that eases the wheel position toward its target with
  // frame-rate independent exponential smoothing, then lays every option out
  // along the curve based on its distance from the current position.
  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const cfg = cfgRef.current;
    const tau = Math.max(cfg.smoothing, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    const target = targetRef.current;
    const cur = posRef.current;
    let next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    posRef.current = next;

    const els = itemRefs.current;
    const n = cfg.count;
    const mirror = cfg.side === 'right' ? -1 : 1;
    // Options sit on a circle whose radius keeps the arc length between two
    // neighbors equal to one row height, so tilt controls how tightly it curls.
    const tiltRad = (cfg.tilt * Math.PI) / 180;
    const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0;
    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - next;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      const dist = Math.abs(d);
      let x = 0;
      let y = d * cfg.rowH;
      let rot = 0;
      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
        y = R * Math.sin(ang);
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%), 0) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      const blurPx = cfg.blur > 0 ? Math.round(dist * cfg.blur * 2) / 2 : 0;
      if (el.dataset.blur !== String(blurPx)) {
        el.dataset.blur = String(blurPx);
        el.style.filter = blurPx > 0 ? `blur(${blurPx}px)` : 'none';
      }
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }

    rafRef.current = settled ? null : requestAnimationFrame(runFrame);
  }, []);

  const startLoop = useCallback(() => {
    // Leave a running frame alone. Restarting it on every touch move
    // zeroes the timestep, so the wheel freezes and then jumps.
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  // Optional tick on selection change, throttled so fast scrolling can't spam
  // it, and with playback failures (e.g. autoplay policies) silently ignored.
  const playTick = useCallback(() => {
    const { soundUrl, soundVolume } = cfgRef.current;
    if (!soundUrl) return;
    const now = performance.now();
    if (now - lastTickRef.current < 70) return;
    lastTickRef.current = now;
    if (!audioRef.current || audioUrlRef.current !== soundUrl) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.preload = 'auto';
      audioUrlRef.current = soundUrl;
    }
    const audio = audioRef.current;
    audio.volume = Math.min(Math.max(soundVolume, 0), 1);
    audio.currentTime = 0;
    audio.play()?.catch(() => {});
  }, []);

  const paintSelected = useCallback((idx: number) => {
    const els = itemRefs.current;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      el.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    }
  }, []);

  const applyTarget = useCallback(
    (value: number, snap: boolean) => {
      const cfg = cfgRef.current;
      let v = value;
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
      if (snap) v = Math.round(v);
      targetRef.current = v;
      const idx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
      if (idx !== selectedRef.current) {
        selectedRef.current = idx;
        paintSelected(idx);
      }
      // Parent updates re-render the whole calculator. On a finger drag that
      // happens every row, so commit only when the wheel settles.
      if (snap && idx !== committedRef.current) {
        committedRef.current = idx;
        setSelectedIndex(idx);
        onChangeRef.current?.(idx, cfg.items[idx]);
        playTick();
      }
      startLoop();
    },
    [startLoop, playTick, paintSelected]
  );

  useImperativeHandle(
    ref,
    () => ({
      step: (delta = 1) => {
        applyTarget(Math.round(targetRef.current) + delta, true);
      }
    }),
    [applyTarget]
  );

  // Wheel / touchpad scrolling, registered manually so it can be non-passive.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cfg = cfgRef.current;
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      // Cap each event at one step so notchy mouse wheels move exactly one
      // option per click, while touchpads still scroll continuously.
      const step = Math.max(-1, Math.min(1, delta / cfg.rowH));
      applyTarget(targetRef.current + step, false);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 140);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [applyTarget]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cfgRef.current.draggable) return;
    if (e.pointerType === 'touch') e.preventDefault();
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    dragRef.current = {
      y: e.clientY,
      start: posRef.current,
      id: e.pointerId,
      type: e.pointerType,
      lastY: e.clientY,
      lastT: performance.now(),
      velocity: 0
    };
    dragMovedRef.current = false;
    dragFollowRef.current = false;
    setIsDragging(true);
    // Capture a touch immediately so the page scroll doesn't steal the gesture.
    if (e.pointerType === 'touch') rootRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || e.pointerId !== drag.id) return;
      const dy = e.clientY - drag.y;
      const now = performance.now();
      const dt = now - drag.lastT;
      if (dt > 0 && dt < 80) {
        const instant = -(e.clientY - drag.lastY) / cfgRef.current.rowH / (dt / 1000);
        drag.velocity = drag.velocity * 0.65 + instant * 0.35;
      } else if (dt >= 80) {
        drag.velocity = 0;
      }
      drag.lastY = e.clientY;
      drag.lastT = now;
      if (!dragMovedRef.current && Math.abs(dy) > 3) {
        dragMovedRef.current = true;
        dragFollowRef.current = true;
        if (drag.type !== 'touch') rootRef.current?.setPointerCapture(drag.id);
      }
      if (dragMovedRef.current) applyTarget(drag.start - dy / cfgRef.current.rowH, false);
    },
    [applyTarget]
  );

  const handlePointerEnd = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || e.pointerId !== drag.id) return;
      dragRef.current = null;
      dragFollowRef.current = false;
      setIsDragging(false);
      if (!dragMovedRef.current) {
        const node = (e.target as HTMLElement).closest?.('[role="option"]');
        if (node) {
          const idx = itemRefs.current.indexOf(node as HTMLDivElement);
          if (idx >= 0) {
            const cfg = cfgRef.current;
            const cur = targetRef.current;
            let d = idx - (((cur % cfg.count) + cfg.count) % cfg.count);
            if (cfg.loop && cfg.count > 1) {
              if (d > cfg.count / 2) d -= cfg.count;
              else if (d < -cfg.count / 2) d += cfg.count;
            }
            applyTarget(cur + d, true);
          }
        }
        return;
      }
      // A flick coasts about one row, then eases onto the nearest loan.
      const glide =
        drag.type === 'touch' && Math.abs(drag.velocity) > 1.2
          ? Math.max(-1.15, Math.min(1.15, drag.velocity * 0.14))
          : 0;
      applyTarget(posRef.current + glide, true);
    },
    [applyTarget]
  );

  const handleItemClick = useCallback(
    (index: number) => {
      if (dragMovedRef.current) return;
      const cfg = cfgRef.current;
      const cur = targetRef.current;
      let d = index - (((cur % cfg.count) + cfg.count) % cfg.count);
      if (cfg.loop && cfg.count > 1) {
        if (d > cfg.count / 2) d -= cfg.count;
        else if (d < -cfg.count / 2) d += cfg.count;
      }
      applyTarget(cur + d, true);
    },
    [applyTarget]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let delta: number | null = null;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1;
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1;
      if (delta == null) return;
      e.preventDefault();
      applyTarget(Math.round(targetRef.current) + delta, true);
    },
    [applyTarget]
  );

  // Auto-roll: step to the next option on a timer, but only while the wheel is on screen,
  // the tab is visible, and nobody is hovering or dragging it.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !(autoAdvance > 0)) return;
    let visible = false;
    let hovered = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0 });
    io.observe(el);
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    const timer = setInterval(() => {
      if (!visible || hovered || dragRef.current || document.hidden) return;
      applyTarget(Math.round(targetRef.current) + 1, true);
    }, autoAdvance);
    return () => {
      clearInterval(timer);
      io.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [autoAdvance, applyTarget]);

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, loop, smoothing, applyTarget]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      audioRef.current?.pause();
    },
    []
  );

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Option wheel"
      className={`relative h-full w-full select-none overflow-hidden outline-none [touch-action:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}${className ? ` ${className}` : ''}`}
      style={
        {
          '--ow-text-color': textColor,
          '--ow-active-color': activeColor,
          '--ow-font-size': `${fontSize}rem`,
          '--ow-inset': `${inset}px`
        } as CSSProperties
      }
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={el => {
            itemRefs.current[index] = el;
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`absolute top-1/2 cursor-pointer whitespace-nowrap leading-none will-change-transform [font-size:var(--ow-font-size)] [color:color-mix(in_srgb,var(--ow-active-color)_calc(var(--ow-p,0)*100%),var(--ow-text-color))] ${
            side === 'right' ? 'right-[var(--ow-inset)] origin-right' : 'left-[var(--ow-inset)] origin-left'
          } ${selectedIndex === index ? 'font-medium' : 'font-extralight'}`}
          onClick={() => handleItemClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  );
});

export default OptionWheel;
