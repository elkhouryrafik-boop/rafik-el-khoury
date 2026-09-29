import { projects, inProgress } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./SectionLabel";

const mono = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--fs-micro)",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
};

function GroupHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div
      className="mt-16 flex flex-wrap items-baseline justify-between gap-2 border-t-2 pt-3"
      style={{ borderColor: "var(--ink)", ...mono, color: "var(--ink)" }}
    >
      <span>{title}</span>
      <span style={{ color: "var(--ink-3)" }}>{meta}</span>
    </div>
  );
}

export function Work() {
  const relk = projects.filter((p) => p.group === "relk");
  const iaac = projects.filter((p) => p.group === "iaac");

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <SectionLabel number="01">Work</SectionLabel>
      <h2
        className="mt-6 max-w-[20ch]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        Selected projects
      </h2>

      <GroupHeader title="At RELK · Rafik El-Khoury & Partners" meta="Aug 2026 – now" />
      <div>
        {relk.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* Currently building strip */}
      <div className="border-t py-8" style={{ borderColor: "var(--rule)" }}>
        <div className="mb-4" style={{ ...mono, color: "var(--ink-3)" }}>
          Also in progress at RELK
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {inProgress.map((item) => (
            <div
              key={item.name}
              className="flex gap-4 border p-4"
              style={{ borderColor: "var(--rule)" }}
            >
              {item.image && (
                <a
                  href={item.image.src}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden w-32 shrink-0 sm:block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image.src}
                    alt={item.image.caption}
                    loading="lazy"
                    className="aspect-[16/10] w-full border object-cover"
                    style={{ borderColor: "var(--rule)" }}
                  />
                </a>
              )}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", lineHeight: 1.2 }}>
                    {item.name}
                  </span>
                  <span style={{ ...mono, letterSpacing: "0.12em", color: "var(--accent)" }}>{item.status}</span>
                </div>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.5, color: "var(--ink-2)" }}>{item.line}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GroupHeader title="At IAAC + EADA · AI for Architecture & Business Innovation" meta="2025 – 2026" />
      <div>
        {iaac.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
