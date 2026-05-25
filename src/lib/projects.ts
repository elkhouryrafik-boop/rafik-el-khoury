export type Project = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  date: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  scene: "naturegooddest" | "gigai" | "archai";
  sizzleSrc: string;
  demoSrc?: string;
  demoCaption?: string;
  images: { src: string; caption: string }[];
  status: "Active" | "Shipped" | "Active research";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "naturegooddest",
    number: "01",
    name: "NatureGooddest / COOLSTOCK",
    shortName: "NatureGooddest",
    date: "2026",
    tagline: "Regenerative-design platform",
    summary:
      "Pattern-language platform that turns a site polygon into a defensible urban-design brief — every recommendation traceable to a theory citation, a verified data source, and a field-validation record. v1 (COOLSTOCK) pitching Ajuntament Barcelona's Refugis Climàtics programme, June 2026.",
    highlights: [
      "v1 on Plaça dels Àngels, Barcelona — 3,800 m², Tmrt 58 °C, 27 patterns, NSGA-II Pareto-front shelter configs.",
      "5-regulation compliance card: EU Taxonomy, CSRD, TNFD, BNG.",
      "Co-authored the three-citation rule (theory DOI + data provenance + field record). Deterministic generation path; LLM is editor/search only, never in the design loop.",
      "Team of 4 at IAAC MaAI01, Dir. Emanuele Naboni.",
    ],
    stack: [
      "Python",
      "Flask",
      "Neo4j",
      "OWL/Turtle",
      "NSGA-II",
      "pymoo",
      "Infrared.city",
      "Open Data BCN",
      "pgvector",
    ],
    scene: "naturegooddest",
    sizzleSrc: "/videos/sizzle-naturegooddest.mp4",
    images: [
      {
        src: "/assets/naturegooddest/bcn-vulnerability-screen.jpg",
        caption:
          "COOLSTOCK Layer 2 (Spatial Engine) — Barcelona person-weighted heat-vulnerability screen from the official Atles de Resiliència · Calor. Plaça dels Àngels ranks #48 of 1061 census sections.",
      },
      {
        src: "/assets/naturegooddest/cool-allocation-placa.jpg",
        caption:
          "MAX_COOLING run on Plaça dels Àngels — €400k budget, 11 patches placed (evaporative + living + shade structure), ΔUTCI 1.22 °C, €288,331 per °C cooled, heat-aim 0.956. Sitte-veto cells (S05/S11) excluded from intervention.",
      },
      { src: "/assets/naturegooddest/hero.png", caption: "Design v1 — Plaça dels Àngels hero state" },
      { src: "/assets/naturegooddest/multipattern-kpis.png", caption: "Multipattern explorer with KPIs" },
      { src: "/assets/naturegooddest/speckle-best-cooling.png", caption: "Speckle render — best-cooling option, NSGA-II Pareto pick" },
      { src: "/assets/naturegooddest/kpi-panel.png", caption: "M5 KPI panel — field-verified outputs" },
      { src: "/assets/naturegooddest/metrics-utci.png", caption: "Real UTCI metrics — comfort gain map" },
    ],
    status: "Active",
    links: [
      { label: "GitHub", href: "https://github.com/elkhouryrafik-boop" },
    ],
  },
  {
    id: "gigai",
    number: "02",
    name: "GigAI — Material Change Coordinator",
    shortName: "GigAI",
    date: "2026",
    tagline: "PM workflow automation for AEC",
    summary:
      "Event-driven workflow automation that captures construction material changes from meetings and PM tools, then generates coordinated, PM-approvable actions with confidence scoring.",
    highlights: [
      "Pipeline — meeting audio capture → event normalisation (Claude Haiku) → context enrichment (pgvector RAG over floor plans, suppliers, history) → proposal generation (Claude Sonnet) → ranked actions for PM approval.",
      "Integrated Autodesk Construction Cloud, Google Calendar, Gmail. React+Vite dashboard with SSE for real-time decisions.",
      "4-factor confidence scoring lands demo proposals at ~85%.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "React+Vite",
      "PostgreSQL",
      "pgvector",
      "Docker",
      "GCP Pub/Sub",
      "Claude Haiku",
      "Claude Sonnet",
      "Voyage AI",
    ],
    scene: "gigai",
    sizzleSrc: "/videos/sizzle-gigai.mp4",
    images: [
      { src: "/assets/gigai/intro.png", caption: "GigAI — material change coordinator intro slide" },
      { src: "/assets/gigai/pipeline.png", caption: "Event-driven pipeline overview" },
      { src: "/assets/gigai/architecture.png", caption: "System architecture — services and data stores" },
      { src: "/assets/gigai/dashboard.png", caption: "React+Vite dashboard — ranked proposals, real-time SSE" },
      { src: "/assets/gigai/results.png", caption: "Confidence-scored proposals landing at ~85%" },
    ],
    status: "Active",
    links: [
      { label: "GitHub", href: "https://github.com/elkhouryrafik-boop" },
    ],
  },
  {
    id: "archai",
    number: "03",
    name: "ARCHAI — Automated Compliance Checking",
    shortName: "ARCHAI",
    date: "2025—2026",
    tagline: "Rhino plugin → vector-store RAG → cited PASS/FAIL",
    summary:
      "Native Rhino plugin (.rhp) that reads layered CAD geometry, extracts site + per-building metrics (height, footprint, total floor area, setback, FAR, coverage), ships them as JSON to a Python backend, and RAG-checks every applicable urban-regulation chunk against the model. Output: a per-building report with PASS / FAIL / MISSING_METRIC / CANNOT_CHECK rows, each row carrying the exact regulation chunk it cites.",
    highlights: [
      "C# RhinoCommon plugin (.rhp): scans an active document, parses layer convention (SITE::BOUNDARY, BLDG_X::FOOTPRINT, BLDG_X::FLOORS, BLDG_X::MASS), computes site area + per-building height, footprint, floor area, min setback, FAR, coverage in real metric units regardless of model unit system.",
      "Sample run on a 10,880 m² site with 2 buildings: 41 compliance checks → 19 PASS / 22 FAIL / 0 missing / 0 unsupported. Each row links to a specific regulation chunk (C1–C8) so the verdict is auditable, not opaque.",
      "Co-authored the three-citation rule for the team's regenerative-design platform — same provenance discipline applied here: every PASS or FAIL row carries the rule it cites. LLM is editor / search only, never the source of truth.",
      "Dual demo: (a) a live OSM-based prototype on Begues, Catalonia that surfaces per-building plantas, altura, área huella, and superficie construida from clickable footprints; (b) a Rhino-plugin pipeline that emits the same compliance_graph.json the prototype consumes.",
      "Compliance Engine + Python Runner + Compliance Panel host all live inside the Rhino UI so the architect never leaves the modelling environment.",
    ],
    stack: [
      "C# / .NET",
      "RhinoCommon SDK",
      "Newtonsoft.Json",
      "Python backend",
      "ChromaDB",
      "GPT-4o-mini",
      "Pandas",
      "n8n",
      "OpenStreetMap",
      "Folium",
    ],
    scene: "archai",
    sizzleSrc: "/videos/sizzle-archai.mp4",
    demoSrc: "/videos/archai-demo.mp4",
    demoCaption:
      "Live demo · Begues, Catalonia · OSM buildings + compliance overlay · click any footprint for plantas, altura, área huella, superficie construida.",
    images: [],
    status: "Shipped",
    links: [
      {
        label: "Sample report (PDF)",
        href: "/reports/archai-compliance-report.pdf",
      },
      { label: "GitHub", href: "https://github.com/elkhouryrafik-boop" },
    ],
  },
];
