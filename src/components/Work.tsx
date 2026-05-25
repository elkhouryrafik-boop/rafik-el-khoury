import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./SectionLabel";

export function Work() {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <SectionLabel number="01">Work</SectionLabel>
      <h2
        className="mt-6 mb-12 max-w-[18ch]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        Three platforms, one thesis: AI orchestrated, not in the loop.
      </h2>

      <div>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
