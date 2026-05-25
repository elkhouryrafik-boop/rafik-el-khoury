export function Monogram({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-label="REK monogram"
      className={`inline-flex items-center font-mono ${className}`}
      style={{ fontSize: size * 0.5, letterSpacing: "0.04em" }}
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center"
        style={{
          width: size,
          height: size,
          border: "1px solid var(--ink)",
          marginRight: 8,
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: size * 0.55 }}>
          R
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-mono)" }}>EL KHOURY</span>
    </span>
  );
}
