import { Icon } from "@/components/ui";

/** Locked CIBIL score card with unlock CTA. */
export function CibilScore() {
  return (
    <aside className="flex flex-col rounded-[1.35rem] bg-white p-5 shadow-[0_16px_40px_rgba(26,43,86,0.08)] ring-1 ring-[#d5e3f2] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eaf6ff] text-[#40B5FF]">
            <Icon name="chart" className="h-5 w-5" />
          </span>
          <h2 className="text-base font-bold text-[#1A2B56]">CIBIL Score</h2>
        </div>
        <span className="rounded-full bg-[#f0f4fa] px-2.5 py-1 text-[11px] font-semibold text-[#5b6b82]">
          Credit Health
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <div className="relative h-28 w-52">
          <svg viewBox="0 0 200 110" className="h-full w-full" aria-hidden>
            <path
              d="M16 100 A84 84 0 0 1 184 100"
              fill="none"
              stroke="#e8edf5"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M16 100 A84 84 0 0 1 70 28"
              fill="none"
              stroke="#f07167"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M70 28 A84 84 0 0 1 130 28"
              fill="none"
              stroke="#f0b429"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M130 28 A84 84 0 0 1 184 100"
              fill="none"
              stroke="#3dbf8a"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute top-[58%] left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#eef3f9] text-[#1A2B56] ring-1 ring-[#d5e3f2]">
            <Icon name="lock" className="h-5 w-5" />
          </span>
        </div>

        <p className="mt-2 text-base font-bold text-[#1A2B56]">
          Your CIBIL Score
        </p>
        <p className="mt-1 text-sm text-[#5b6b82]">Unlock to see your score</p>
      </div>

      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#40B5FF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1A2B56]"
      >
        Check Score
        <Icon name="arrowRight" className="h-4 w-4" />
      </button>
    </aside>
  );
}
