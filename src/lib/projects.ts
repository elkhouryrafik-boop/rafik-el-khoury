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
    tagline: "Rhino-integrated urban-regulation checker",
    summary:
      "Rhino-integrated tool that checks building geometry against urban planning regulations using vector-store retrieval and LLM-generated explanations.",
    highlights: [
      "Pipeline — Rhino building geometry → Chroma vector-store rule retrieval (zone, metric, operator, threshold, source) → per-rule pass/fail table with article-cited LLM explanations.",
      "Tested against Mumbai and Barcelona regulation corpora.",
      "Consistent rule-schema so the engine is regulation-agnostic.",
    ],
    stack: ["Python", "ChromaDB", "GPT-4o-mini", "Pandas", "n8n", "Rhino"],
    scene: "archai",
    sizzleSrc: "/videos/sizzle-archai.mp4",
    demoSrc: "/videos/archai-demo.mp4",
    demoCaption: "Live demo · Begues, Catalonia · OSM buildings + compliance overlay · click any footprint for plantas, altura, área huella, superficie construida.",
    images: [],
    status: "Shipped",
    links: [
      { label: "GitHub", href: "https://github.com/elkhouryrafik-boop" },
    ],
  },
];
