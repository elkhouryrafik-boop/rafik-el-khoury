import { SectionLabel } from "./SectionLabel";

const primary = {
  label: "Book a call",
  value: "cal.com/rafik-el-khoury-6vwa4v",
  href: "https://cal.com/rafik-el-khoury-6vwa4v",
  note: "20 min · plain conversation · no slides",
};

const secondary = [
  {
    label: "Email",
    value: "elkhouryrafik@gmail.com",
    href: "mailto:elkhouryrafik@gmail.com",
    note: "Plain mailto, no contact form.",
  },
  {
    label: "GitHub",
    value: "github.com/elkhouryrafik-boop",
    href: "https://github.com/elkhouryrafik-boop",
    note: "Source for every project here.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rafik-el-khoury-7240b621a",
    href: "https://linkedin.com/in/rafik-el-khoury-7240b621a",
    note: "Long-form work history.",
  },
  {
    label: "CV (PDF)",
    value: "rafik_el_khoury_cv.pdf",
    href: "/cv/rafik_el_khoury_cv.pdf",
    note: "RenderCV · engineering-resumes theme.",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <SectionLabel number="04">Contact</SectionLabel>

      <h2
        className="mt-6 mb-12 max-w-[20ch]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        Pick a door.
      </h2>

      {/* Primary CTA — full width, vermilion */}
      <a
        href={primary.href}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col gap-4 border p-8 transition-colors md:flex-row md:items-baseline md:justify-between md:p-10"
        style={{
          borderColor: "var(--ink)",
          background: "var(--accent)",
          color: "var(--accent-ink)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent-ink)",
            }}
          >
            {primary.label}
          </div>
          <div
            className="mt-2 flex items-baseline gap-3 break-all"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              wordBreak: "break-word",
            }}
          >
            <span>{primary.value}</span>
            <span aria-hidden style={{ fontSize: "1.5rem" }}>
              ↗
            </span>
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            color: "var(--accent-ink)",
          }}
        >
          {primary.note}
        </div>
      </a>

      {/* Secondary channels — 2-col grid, 4 cards = perfect 2x2 */}
      <div
        className="mt-px grid grid-cols-1 gap-px md:grid-cols-2"
        style={{ background: "var(--rule)" }}
      >
        {secondary.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex flex-col justify-between p-6 transition-colors md:p-8"
            style={{
              background: "var(--paper)",
              color: "var(--ink)",
              minHeight: 180,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-micro)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              {c.label}
            </div>
            <div className="my-4 flex items-baseline gap-3 break-all">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  wordBreak: "break-word",
                }}
              >
                {c.value}
              </span>
              <span aria-hidden style={{ fontSize: "1.25rem" }}>
                ↗
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                color: "var(--ink-2)",
              }}
            >
              {c.note}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
