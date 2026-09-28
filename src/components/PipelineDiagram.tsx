type Step = { title: string; detail?: string };

const DIAGRAMS: Record<"revit" | "cgate" | "timesheet", { label: string; steps: Step[]; note: string }> = {
  revit: {
    label: "Architecture",
    steps: [
      { title: "AI agent", detail: "Claude / Codex" },
      { title: "MCP server", detail: "token auth · capability profiles" },
      { title: "pyRevit bridge", detail: "fail-closed · strict errors" },
      { title: "Live Revit model" },
    ],
    note: "Writes need human sign-off. Classification profile: the AI drafts, a person approves each write.",
  },
  cgate: {
    label: "Review pipeline",
    steps: [
      { title: "Ingest", detail: "PDF / DOCX" },
      { title: "Segment", detail: "clauses" },
      { title: "Extract", detail: "requirements" },
      { title: "Ground", detail: "verbatim or deleted" },
      { title: "Resolve", detail: "referenced docs" },
      { title: "Adjudicate", detail: "15 items" },
    ],
    note: "No LLM in the review path. Output is evidence or a flag, never “compliant”. A person decides.",
  },
  timesheet: {
    label: "Flow",
    steps: [
      { title: "Chat message", detail: "Teams / Telegram" },
      { title: "Parse hours", detail: "typed output" },
      { title: "Match", detail: "staff + project registry" },
      { title: "Write", detail: "the real Excel workbook" },
    ],
    note: "Diagram only. Screenshots with test data to follow.",
  },
};

export function PipelineDiagram({ id, number }: { id: keyof typeof DIAGRAMS; number: string }) {
  const d = DIAGRAMS[id];
  const wide = d.steps.length > 4;
  return (
    <figure
      className="flex w-full flex-col justify-between border p-4 md:p-6"
      style={{ borderColor: "var(--ink)", minHeight: "16rem", background: "var(--paper)" }}
    >
      <div
        className="flex items-baseline justify-between"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}
      >
        <span>fig. {number} · {d.label}</span>
        <span>diagram</span>
      </div>

      <ol
        className={
          wide
            ? "my-6 grid grid-cols-1 gap-2 md:grid-cols-3"
            : "my-6 flex flex-col gap-2 md:flex-row md:items-stretch md:gap-0"
        }
      >
        {d.steps.map((s, i) => (
          <li key={s.title} className={wide ? "flex" : "flex flex-col md:flex-1 md:flex-row md:items-stretch"}>
            <div
              className="flex flex-1 flex-col justify-center gap-1 border px-3 py-3"
              style={{ borderColor: "var(--ink)", borderRadius: 0 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-micro)",
                  color: "var(--accent)",
                  letterSpacing: "0.12em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", lineHeight: 1.1 }}>
                {s.title}
              </span>
              {s.detail && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-micro)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                    lineHeight: 1.35,
                  }}
                >
                  {s.detail}
                </span>
              )}
            </div>
            {!wide && i < d.steps.length - 1 && (
              <span
                aria-hidden
                className="self-center px-2 py-1 md:py-0"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      <figcaption
        className="border-t pt-3"
        style={{
          borderColor: "var(--rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          lineHeight: 1.5,
          color: "var(--ink-2)",
        }}
      >
        {d.note}
      </figcaption>
    </figure>
  );
}
