import type { Metric } from "@/lib/projects";

export function MetricChip({ metric }: { metric: Metric }) {
  return (
    <div
      className="flex flex-col gap-1 border px-3 py-3"
      style={{ borderColor: "var(--ink)", borderRadius: 0 }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          whiteSpace: "nowrap",
        }}
      >
        {metric.value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          lineHeight: 1.4,
          color: "var(--ink-2)",
        }}
      >
        {metric.label}
      </span>
    </div>
  );
}
