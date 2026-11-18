"use client";

import { useRef, useState, type FormEvent } from "react";
import { Field, FormSuccess, fieldInput } from "@/components/modal";
import Stepper, { Step } from "@/components/ui/reactbits/Stepper";
import { submitLead } from "@/lib/leads";
import { contact } from "@/lib/site";

type Employment = "Salaried" | "Self-Employed";

export type LoanRequest = {
  productLabel: string;
  sheetType: string;
  amount: number;
  tenureYears: number;
  rate: number;
};

const formatLakhs = (amount: number) => `₹${(amount / 1e5).toFixed(1)}L`;

const emptyValues = {
  customerName: "",
  email: "",
  phone: "",
  monthlyIncome: "",
  creditScore: "",
  businessName: "",
  gstin: "",
  city: "",
  state: "",
  note: "",
};
type Values = typeof emptyValues;

const STEPS = 3;
const secondaryButton =
  "rounded-full border border-[#d6e0ee] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#3d4f69] transition-colors hover:border-[#3ab6fc] hover:text-[#01357c]";
const primaryButton =
  "flex-1 rounded-full bg-[#01357c] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_28px_rgba(1,53,124,0.24)] transition-colors hover:bg-[#01458f] disabled:cursor-not-allowed disabled:bg-[#8b95a6]";

export function LoanApplicationForm({
  request,
  onDone,
}: {
  request: LoanRequest;
  onDone: () => void;
}) {
  const [employment, setEmployment] = useState<Employment>("Salaried");
  const [values, setValues] = useState<Values>(emptyValues);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Only the current step's fields are mounted, so the values live in state
  // and the payload below is built from it rather than from FormData.
  const bind = (name: keyof Values) => ({
    name,
    value: values[name],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setValues((current) => ({ ...current, [name]: event.target.value })),
  });

  async function send() {
    const text = (key: keyof Values) => values[key].trim();
    const salaried = employment === "Salaried";

    setStatus("sending");
    try {
      // Same field names as the live site, so the Google Sheet columns keep working.
      await submitLead({
        formType: "loan",
        customerName: text("customerName"),
        email: text("email"),
        phone: text("phone"),
        amount: request.amount,
        tenureYears: request.tenureYears,
        interestRate: request.rate,
        loanType: request.sheetType,
        loanProduct: request.productLabel,
        creditScore: text("creditScore"),
        monthlyIncome: salaried ? text("monthlyIncome") : "",
        employmentType: employment,
        companyName: "",
        profession: "",
        businessName: salaried ? "" : text("businessName"),
        gstin: salaried ? "" : text("gstin").toUpperCase(),
        city: text("city"),
        state: text("state"),
        note: text("note"),
      });
      setStatus("sent");
      window.setTimeout(onDone, 2600);
    } catch {
      setStatus("error");
    }
  }

  /** Steps 1 and 2 validate their own visible fields; step 3 sends. Enter behaves like Continue. */
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < STEPS) {
      if (formRef.current?.reportValidity()) setStep(step + 1);
      return;
    }
    void send();
  }

  if (status === "sent") {
    return (
      <FormSuccess
        title="Application Received!"
        body="Our team will contact you shortly."
      />
    );
  }

  const salaried = employment === "Salaried";
  const review: [string, string][] = [
    ["Loan", `${formatLakhs(request.amount)} ${request.productLabel}`],
    [
      "Tenure",
      `${request.tenureYears} ${request.tenureYears === 1 ? "year" : "years"}`,
    ],
    ["Employment", employment],
    ["Name", values.customerName.trim()],
    ["Phone", values.phone.trim()],
    ["Email", values.email.trim()],
    salaried
      ? ["Monthly salary", values.monthlyIncome.trim()]
      : ["Business", values.businessName.trim()],
    ["Location", [values.city, values.state].map((v) => v.trim()).filter(Boolean).join(", ")],
  ];

  return (
    <div>
      <h3
        id="loan-form-title"
        className="pr-10 text-2xl font-black tracking-tight text-[#0b2347]"
      >
        Submit Loan Request
      </h3>
      <p className="mt-1 text-sm text-[#5b6b82]">
        Applying for:{" "}
        <span className="font-semibold text-[#16529c]">
          {formatLakhs(request.amount)} {request.productLabel}
        </span>{" "}
        · {request.tenureYears} {request.tenureYears === 1 ? "year" : "years"}
      </p>

      <form ref={formRef} onSubmit={onSubmit} className="mt-6">
        <Stepper
          step={step}
          onStepChange={setStep}
          showFooter={false}
          linear
          disableStepIndicators
          theme="light"
          accentColor="#16529c"
          frame={false}
          width="100%"
          transition="fade"
        >
          <Step title="Loan & work">
            <div className="grid gap-4">
              <fieldset>
                <legend className="mb-1.5 text-xs font-semibold tracking-wide text-[#3d4f69]">
                  Employment Status
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["Salaried", "Self-Employed"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={employment === option}
                      onClick={() => setEmployment(option)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                        employment === option
                          ? "border-[#16529c] bg-[#16529c] text-white"
                          : "border-[#d6e0ee] bg-white text-[#3d4f69] hover:border-[#3ab6fc]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>

              {salaried ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Monthly Salary (₹)" required>
                    <input
                      {...bind("monthlyIncome")}
                      type="number"
                      min="0"
                      required
                      inputMode="numeric"
                      placeholder="85000"
                      className={fieldInput}
                    />
                  </Field>
                  <Field label="CIBIL Score">
                    <input
                      {...bind("creditScore")}
                      type="number"
                      min="300"
                      max="900"
                      inputMode="numeric"
                      placeholder="750"
                      className={fieldInput}
                    />
                  </Field>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Business Name" required>
                      <input
                        {...bind("businessName")}
                        required
                        autoComplete="organization"
                        placeholder="e.g. Acme Enterprises"
                        className={fieldInput}
                      />
                    </Field>
                    <Field label="GST Number">
                      <input
                        {...bind("gstin")}
                        maxLength={15}
                        pattern="^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z][0-9A-Za-z]{3}$"
                        title="15-character GSTIN, e.g. 36AAAAA1111A1Z1"
                        placeholder="e.g. 36AAAAA1111A1Z1"
                        className={`${fieldInput} uppercase placeholder:normal-case`}
                      />
                    </Field>
                  </div>
                  <Field label="CIBIL Score">
                    <input
                      {...bind("creditScore")}
                      type="number"
                      min="300"
                      max="900"
                      inputMode="numeric"
                      placeholder="750"
                      className={fieldInput}
                    />
                  </Field>
                </>
              )}
            </div>
          </Step>

          <Step title="Your details">
            <div className="grid gap-4">
              <Field label="Name as per Aadhaar" required>
                <input
                  {...bind("customerName")}
                  required
                  autoComplete="name"
                  placeholder="Aditya Sharma"
                  className={fieldInput}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email ID">
                  <input
                    {...bind("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="aditya@example.com"
                    className={fieldInput}
                  />
                </Field>
                <Field label="Phone Number" required>
                  <input
                    {...bind("phone")}
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="^(\+91[\s\-]?)?[6-9]\d{4}[\s\-]?\d{5}$"
                    title="10-digit Indian mobile number"
                    placeholder="+91 98765 43210"
                    className={fieldInput}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City">
                  <input
                    {...bind("city")}
                    autoComplete="address-level2"
                    placeholder="Hyderabad"
                    className={fieldInput}
                  />
                </Field>
                <Field label="State">
                  <input
                    {...bind("state")}
                    autoComplete="address-level1"
                    placeholder="Telangana"
                    className={fieldInput}
                  />
                </Field>
              </div>

              <Field label="Note">
                <textarea
                  {...bind("note")}
                  rows={2}
                  placeholder="Add any additional details, requirements, or questions..."
                  className={`${fieldInput} resize-none`}
                />
              </Field>
            </div>
          </Step>

          <Step title="Review">
            <dl className="grid gap-2 rounded-2xl bg-[#f3f7fc] p-4 text-sm">
              {review.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-[#5b6b82]">{label}</dt>
                  <dd className="text-right font-semibold break-words text-[#0b2347]">
                    {value || "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </Step>
        </Stepper>

        {status === "error" ? (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-[#fdecec] px-4 py-3 text-sm text-[#b42318]"
          >
            We couldn&apos;t submit your request. Please try again, or call us
            on{" "}
            <a href={contact.phoneHref} className="font-semibold underline">
              {contact.phone}
            </a>
            .
          </p>
        ) : null}

        <div className="mt-5 flex gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={status === "sending"}
              className={secondaryButton}
            >
              Back
            </button>
          ) : null}
          <button
            type="submit"
            disabled={status === "sending"}
            className={primaryButton}
          >
            {step < STEPS
              ? "Continue"
              : status === "sending"
                ? "Submitting…"
                : "Confirm"}
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-[#8b95a6]">
          By submitting, you agree to be contacted by Finkuby about your loan
          request.
        </p>
      </form>
    </div>
  );
}
