export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-4 border-t pt-4"
      style={{
        borderColor: "var(--rule)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-micro)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--ink-2)",
      }}
    >
      <span style={{ color: "var(--ink-3)" }}>— {number}</span>
      <span>{children}</span>
      <span className="ml-auto" style={{ color: "var(--ink-3)" }}>
        ......................
      </span>
    </div>
  );
}
