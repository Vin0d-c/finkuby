export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(720px 420px at 96% -8%, rgba(56, 150, 255, 0.38), transparent 62%), #071433",
      }}
    >
      <div className="relative w-full max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3.5">
          <span className="h-[2px] w-11 shrink-0 bg-[#4c92ff] sm:w-14" />
          <p className="text-[13px] font-semibold tracking-[0.2em] text-[#4c92ff] sm:text-sm">
            BRIDGING BANKS & PEOPLE
          </p>
        </div>

        <h1 className="mt-7 max-w-[11ch] text-[clamp(3.5rem,6.6vw,6.75rem)] leading-[0.94] font-extrabold tracking-[-0.035em] text-white">
          Loans Made
          <br />
          <span className="inline-block bg-gradient-to-b from-[#9ad4ff] to-[#1d62f6] bg-clip-text text-transparent">
            Simple.
          </span>
        </h1>

        <p className="mt-8 max-w-[36rem] text-[17px] leading-relaxed text-[#c5cedd] sm:mt-10 sm:text-xl sm:leading-relaxed">
          <span className="block">
            A smarter way to connect banks and borrowers.
          </span>
          <span className="block">Faster approvals, transparent process,</span>
          <span className="block">and financial growth for everyone.</span>
        </p>
      </div>
    </section>
  );
}
