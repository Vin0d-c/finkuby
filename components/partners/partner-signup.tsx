"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Field, FormSuccess, Modal, fieldInput } from "@/components/modal";
import { submitLead } from "@/lib/leads";
import { contact } from "@/lib/site";

function PartnerForm({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    setStatus("sending");
    try {
      await submitLead({
        formType: "partner",
        name: text("name"),
        mobile: text("mobile"),
        email: text("email"),
        pan: text("pan").toUpperCase(),
        creditScore: text("creditScore"),
        city: text("city"),
        state: text("state"),
        note: text("note"),
      });
      setStatus("sent");
      window.setTimeout(onDone, 2800);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <FormSuccess
        title="Application Received!"
        body="Application submitted successfully. Our partner support team will connect with you shortly."
      />
    );
  }

  return (
    <div>
      <h3
        id="partner-form-title"
        className="pr-10 text-2xl font-black tracking-tight text-[#1A2B56]"
      >
        Become a Finkuby Partner
      </h3>
      <p className="mt-1 text-sm text-[#5b6b82]">
        Submit your details to start your registration audit.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name as per Aadhaar" required>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Aditya Sharma"
              className={fieldInput}
            />
          </Field>
          <Field label="Mobile Number" required>
            <input
              name="mobile"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel-national"
              pattern="[6-9][0-9]{9}"
              maxLength={10}
              title="10-digit mobile number starting with 6, 7, 8 or 9"
              placeholder="e.g. 9876543210"
              onInput={(event) => {
                event.currentTarget.value = event.currentTarget.value.replace(
                  /\D/g,
                  "",
                );
              }}
              className={fieldInput}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email ID">
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="aditya@example.com"
              className={fieldInput}
            />
          </Field>
          <Field label="PAN Number">
            <input
              name="pan"
              maxLength={10}
              pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]"
              title="PAN format: ABCDE1234F"
              placeholder="ABCDE1234F"
              className={`${fieldInput} uppercase placeholder:normal-case`}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="CIBIL Score">
            <input
              name="creditScore"
              type="number"
              min="300"
              max="900"
              inputMode="numeric"
              placeholder="750"
              className={fieldInput}
            />
          </Field>
          <Field label="City">
            <input
              name="city"
              autoComplete="address-level2"
              placeholder="Hyderabad"
              className={fieldInput}
            />
          </Field>
          <Field label="State">
            <input
              name="state"
              autoComplete="address-level1"
              placeholder="Telangana"
              className={fieldInput}
            />
          </Field>
        </div>
        <Field label="Note">
          <textarea
            name="note"
            rows={2}
            placeholder="Any additional details or comments..."
            className={`${fieldInput} resize-none`}
          />
        </Field>

        {status === "error" ? (
          <p
            role="alert"
            className="rounded-xl bg-[#fdecec] px-4 py-3 text-sm text-[#b42318]"
          >
            We couldn&apos;t submit your details. Please try again, or call us
            on{" "}
            <a href={contact.phoneHref} className="font-semibold underline">
              {contact.phone}
            </a>
            .
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-1 rounded-full bg-[#1A2B56] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(26,43,86,0.28)] transition-colors hover:bg-[#1A2B56] disabled:cursor-not-allowed disabled:bg-[#8b95a6]"
        >
          {status === "sending" ? "Submitting…" : "Submit Details"}
        </button>
      </form>
    </div>
  );
}

/** Button that opens the partner registration form in a modal. */
export function PartnerSignupButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="partner-form-title"
      >
        <PartnerForm onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}
