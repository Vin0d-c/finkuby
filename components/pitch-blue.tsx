/** Solid pitch-blue disc. The edge meets the right side a little below the top, passes through the middle of the stage, and lands 64% down the left side. */
export function PitchBlue() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ containerType: "size" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          background: "#16529c",
          ["--pitch-w" as string]: "100cqw",
          ["--pitch-h" as string]: "100cqh",
          ["--pitch-cx" as string]:
            "calc(35 / 188 * var(--pitch-w) - 9381 / 235000 * var(--pitch-h) * var(--pitch-h) / var(--pitch-w))",
          ["--pitch-cy" as string]:
            "calc(2607 / 9400 * var(--pitch-h) - 25 / 47 * var(--pitch-w) * var(--pitch-w) / var(--pitch-h))",
          ["--pitch-r" as string]:
            "hypot(var(--pitch-cx), var(--pitch-cy) - 16 / 25 * var(--pitch-h))",
          width: "calc(var(--pitch-r) * 2)",
          height: "calc(var(--pitch-r) * 2)",
          left: "calc(var(--pitch-cx) - var(--pitch-r))",
          top: "calc(var(--pitch-cy) - var(--pitch-r))",
        }}
      />
    </div>
  );
}
