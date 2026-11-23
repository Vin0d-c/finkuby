import { Icon } from "@/components/ui";

const steps = [
  {
    title: "Application Submitted",
    detail: "Complete your application to submit",
    done: true,
  },
  { title: "Documents Verified", detail: "Pending", done: false },
  { title: "Under Review", detail: "Pending", done: false },
  { title: "Approved", detail: "Pending", done: false },
  { title: "Disbursed", detail: "Pending", done: false },
] as const;

/** Vertical application tracker shown on the dashboard. */
export function ApplicationProgress() {
  return (
    <aside className="flex h-full flex-col rounded-[1.35rem] bg-white p-5 shadow-[0_16px_40px_rgba(26,43,86,0.08)] ring-1 ring-[#d5e3f2] sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf6ff] text-[#40B5FF]">
          <Icon name="file" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-[#1A2B56]">
            Application Progress
          </h2>
          <p className="mt-0.5 text-sm text-[#5b6b82]">
            Finkuby expert · Personal Loan
          </p>
        </div>
      </div>

      <ol className="relative mt-6 flex-1 space-y-0">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li key={step.title} className="relative flex gap-3 pb-5 last:pb-0">
              {!last ? (
                <span
                  aria-hidden
                  className="absolute top-5 left-[11px] h-[calc(100%-8px)] w-px bg-[#d5e3f2]"
                />
              ) : null}
              <span
                className={`relative z-[1] mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  step.done
                    ? "bg-[#40B5FF] ring-[3px] ring-[#40B5FF]/25"
                    : "border-2 border-[#d5e3f2] bg-white"
                }`}
              >
                {step.done ? (
                  <span className="h-2 w-2 rounded-full bg-white" />
                ) : null}
              </span>
              <div className="min-w-0 pt-0.5">
                <p
                  className={`text-sm font-semibold ${
                    step.done ? "text-[#40B5FF]" : "text-[#5b6b82]"
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs text-[#8b95a6]">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3eaf4] pt-4">
        <p className="text-xs text-[#5b6b82]">
          ID: <span className="font-semibold text-[#1A2B56]">FNK-420356</span>{" "}
          <button
            type="button"
            className="font-medium text-[#8b95a6] transition-colors hover:text-[#40B5FF]"
          >
            View all
          </button>
        </p>
        <button
          type="button"
          className="text-sm font-semibold text-[#40B5FF] transition-colors hover:text-[#1A2B56]"
        >
          Continue Application
        </button>
      </div>
    </aside>
  );
}
