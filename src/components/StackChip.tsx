export function StackChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-micro)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--ink-2)",
        border: "1px solid var(--rule)",
        padding: "3px 8px",
        borderRadius: 0,
      }}
    >
      {children}
    </span>
  );
}
