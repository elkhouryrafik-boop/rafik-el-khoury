import { SectionLabel } from "./SectionLabel";

const items = [
  {
    org: "Rafik El-Khoury & Partners — Consulting Engineers",
    role: "Graduate Urban Planner",
    where: "Abu Dhabi, UAE",
    date: "2025 · 9 mo",
    bullets: [
      "Evaluated international masterplan proposals for a 19 km² island development; built a scoring framework weighting design merit, consultant expertise, and long-term vision alignment.",
      "SHA villa complex redesign in Al-Jurf — piling works and peer review, CAD refinement, sales brochure design.",
      "Programmed three community parks in Madinat Al-Riyadh through site analysis and public-space planning.",
      "Co-authored UNICEF-guided school rehabilitation proposals in southern Lebanon.",
      "Briefed the president of Aramoun municipality on the town's urban character and proposed interventions.",
    ],
  },
  {
    org: "IMKAN Properties",
    role: "Site Engineer",
    where: "UAE",
    date: "2023 · 3 mo",
    bullets: [
      "Villa inspections across multiple construction stages; weekly progress reports for all villas.",
      "Worked across construction sequences and methods — tiling techniques, waterproofing applications.",
    ],
  },
  {
    org: "Rafik El-Khoury & Partners — Consulting Engineers",
    role: "Engineering Intern",
    where: "Beirut, Lebanon",
    date: "2020 · 2 mo",
    bullets: [
      "Reviewed the Solid Waste Master Plan for Greater Beirut — waste generation, environmental impact, recycling strategies.",
      "Supervised on-site activities at the Burj Hammoud Landfill — leachate collection oversight, waste-load recording, worker-safety enforcement.",
    ],
  },
  {
    org: "University of Dundee — MSc Spatial Planning",
    role: "Research-by-design dissertation",
    where: "Dundee, Scotland",
    date: "2023—2024",
    bullets: [
      "Team-based masterplan for a new residential complex in Dundee's urban-rural fringe.",
    ],
  },
  {
    org: "Quinta do Vale",
    role: "Permaculture Design Certificate",
    where: "Portugal",
    date: "2022 · 6 wk",
    bullets: ["Full PDC under Geoff Lawton-lineage instruction."],
  },
  {
    org: "Loughborough University — BSc Civil Engineering",
    role: "Dissertation: Natural Flood Management",
    where: "Loughborough, UK",
    date: "2018—2022",
    bullets: [
      "Biodiversity and flood resilience in England; the case for ecology-led engineering tolerance.",
    ],
  },
];

export function EarlierWork() {
  return (
    <section
      id="earlier"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <SectionLabel number="03">Earlier work</SectionLabel>

      <h2
        className="mt-6 mb-12 max-w-[20ch]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
        }}
      >
        Before AI, the field: masterplans, sites, regulations, soil.
      </h2>

      <div className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3"
        style={{ background: "var(--rule)" }}
      >
        {items.map((it, i) => (
          <article
            key={i}
            className="flex flex-col p-6 md:p-8"
            style={{ background: "var(--paper)" }}
          >
            <div
              className="mb-4 flex items-baseline justify-between"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-micro)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              <span>{it.date}</span>
              <span>{it.where}</span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-h3)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              {it.org}
            </h3>
            <div
              className="mt-1 mb-3"
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                color: "var(--ink-2)",
              }}
            >
              {it.role}
            </div>
            <ul className="space-y-2"
              style={{ fontSize: "0.95rem", color: "var(--ink-2)", lineHeight: 1.5 }}
            >
              {it.bullets.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span style={{ color: "var(--ink-3)" }}>—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
