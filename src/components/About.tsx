import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <SectionLabel number="02">About</SectionLabel>

      <div className="mt-12 grid grid-cols-12 gap-6">
        <h2
          className="col-span-12 md:col-span-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h1)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Four disciplines, one job.
        </h2>

        <div
          className="col-span-12 md:col-span-6 md:col-start-7 space-y-5"
          style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--ink-2)" }}
        >
          <p>
            I&apos;m an urbanist, and mostly a problem solver. I studied civil
            engineering at <strong>Loughborough</strong> and spatial planning
            with urban design at <strong>Dundee</strong>. In July 2026 I
            finished a joint <strong>IAAC</strong> and <strong>EADA</strong>{" "}
            programme in Barcelona on AI for architecture and business
            innovation (two master&apos;s degrees).
          </p>
          <p>
            Since August 2026 I&apos;ve been AI Implementation Strategist and
            Urban Planner at <em>Rafik El-Khoury &amp; Partners</em>, a
            consulting engineering firm founded in 1967. I run site studies and
            build the tools our architects use. On Coliath Castle I walked the
            site on 18 August and had the first GIS figures out three days
            later.
          </p>
          <p>
            Most of my day is spent with clients, engineers and architects. I
            move fast and I care about getting the details right. I&apos;m
            looking for <strong>urban planning or urban design roles</strong>{" "}
            where GIS, data and AI are part of the job.
          </p>
        </div>
      </div>
    </section>
  );
}
