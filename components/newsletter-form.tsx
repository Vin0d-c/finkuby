"use client";

import { useRef, useState, type FormEvent } from "react";
import BellToggle from "@/components/ui/reactbits/BellToggle";
import { Icon } from "@/components/ui";
import { submitLead } from "@/lib/leads";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    setStatus("sending");
    try {
      await submitLead({ formType: "newsletter", email });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-4">
      <div className="flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10 focus-within:ring-[#3ab6fc]">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="email@company.com"
          className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label="Subscribe"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b2347] text-white transition-colors hover:bg-[#163a6b] disabled:opacity-60"
        >
          <Icon name="send" className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3">
        <BellToggle
          size="sm"
          offLabel="Notify me"
          onLabel="You're subscribed"
          color="#c5d3e8"
          background="rgba(255,255,255,0.06)"
          onColor="#ffffff"
          onBackground="#16529c"
          pressed={status === "sent"}
          disabled={status === "sending"}
          onChange={(next) => {
            if (next) formRef.current?.requestSubmit();
          }}
        />
      </div>
      <p role="status" className="mt-2 min-h-5 text-xs">
        {status === "sent" ? (
          <span className="text-[#7ee2a8]">Thanks for subscribing!</span>
        ) : null}
        {status === "error" ? (
          <span className="text-[#ffb4b4]">
            Couldn&apos;t subscribe. Please try again.
          </span>
        ) : null}
      </p>
    </form>
  );
}
