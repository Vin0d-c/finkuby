"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/ui";
import GlassSurface from "@/components/ui/reactbits/GlassSurface";

/**
 * Accessible modal on top of the native <dialog>: focus is trapped, Escape
 * closes it, and the page behind is inert. Clicking the backdrop closes it too.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="finkuby-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl glass-host overflow-y-auto rounded-3xl bg-white/90 p-0 text-[#2c3b50] shadow-[0_30px_80px_rgba(1,25,64,0.35)] backdrop:bg-[#061633]/70 backdrop:backdrop-blur-sm"
    >
      {open ? (
        <div className="relative isolate p-6 sm:p-8">
          <GlassSurface
            aria-hidden
            width="100%"
            height="100%"
            borderRadius={24}
            refraction={false}
            backgroundOpacity={0.8}
            className="glass-layer pointer-events-none !absolute inset-0 -z-10"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-[#5b6b82] ring-1 ring-[#dbe4f0] transition-colors hover:bg-[#f1f5fb] hover:text-[#01357c]"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
          {children}
        </div>
      ) : null}
    </dialog>
  );
}

export const fieldLabel =
  "mb-1.5 block text-xs font-semibold tracking-wide text-[#3d4f69]";
export const fieldInput =
  "w-full rounded-xl border border-[#d6e0ee] bg-[#f8fafd] px-3.5 py-2.5 text-[15px] text-[#0b2347] placeholder:text-[#9aa7ba] transition-colors outline-none focus:border-[#3ab6fc] focus:bg-white focus:ring-3 focus:ring-[#3ab6fc]/20";

export function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={fieldLabel}>
        {label}
        {required ? <span className="ml-0.5 text-[#e5484d]">*</span> : null}
      </span>
      {children}
    </label>
  );
}

export function FormSuccess({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="flex flex-col items-center py-10 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f7ee] text-[#16a34a] ring-1 ring-[#16a34a]/20">
        <Icon name="check" className="h-8 w-8" />
      </span>
      <h3 className="mt-5 text-2xl font-black tracking-tight text-[#0b2347]">
        {title}
      </h3>
      <p className="mt-2 max-w-xs text-sm text-[#5b6b82]">{body}</p>
    </div>
  );
}
