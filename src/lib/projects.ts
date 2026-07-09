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
  scene: "gigai" | "archai" | undefined;
  sizzleSrc: string;
  demoSrc?: string;
  demoCaption?: string;
  images: { src: string; caption: string }[];
  status: "Active" | "Shipped" | "Active research";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "festcool",
    number: "01",
    name: "FestCOOL / U-Shade",
    shortName: "U-Shade",
    date: "2026",
    tagline: "Climate-aware festival shade placement",
    summary:
      "Decision-support system that places shade on the cells of a festival site that are simultaneously the hottest and the busiest. Crosses a real UTCI heat grid (infrared.city) with a pedestrian-dynamics crowd field (JuPedSim), solves shade placement as a Maximal Covering Location Problem, and clads each structure in the lowest-transport-carbon reclaimed material the surrounding city already contains. Demoed live on Primavera Sound 2026 at Parc del Fòrum, Barcelona.",
    highlights: [
      "Demand field = crowd density × thermal excess above a 26 °C UTCI comfort threshold, on a 6 m master lattice. Crowd migrates over a continuous daytime timeline driven by the real festival schedule and Spotify monthly-listener stage popularity.",
      "Placement solved twice — deterministic greedy heuristic as a permanent lower-bound witness, plus an exact integer program that emits a verifiable optimality certificate. Coverage measured against projected shadows, not footprints.",
      "Honesty as an engineered property: every reported number carries a provenance tier (grounded / derived / assumed / declared), and the cooling-acceptance gate is hash-locked — editing a threshold to make a run pass fails loudly at run time.",
      "LLM is a translator, never a designer — parses the free-text brief into typed fields via schema-constrained structured output, retry loop terminated on stop_reason. Every spatial decision is deterministic and auditable.",
      "Reclaimed materials from Barcelona waste streams selected by transport carbon (recycled cut-off basis); cooling effectiveness scaled by 1 − membrane solar transmissivity. Team of 4 at IAAC MaAI01: Juan, Dominika, Seid, Rafik.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "infrared.city UTCI",
      "JuPedSim",
      "MCLP / ILP",
      "Mapbox GL",
      "React + TanStack Start",
      "TypeScript",
      "Claude (structured output)",
      "Rhino.Compute",
      "Grasshopper",
    ],
    scene: undefined,
    sizzleSrc: "/videos/ushade-demo.mp4",
    images: [
      {
        src: "/assets/festcool/ushade-landing.jpg",
        caption:
          "U-Shade — cross a real heat grid with a real crowd field. Place shade where it protects the most people.",
      },
      {
        src: "/assets/festcool/console-workspace.jpg",
        caption:
          "HeatGuard parametric console — festival brief (capacity, budget, event date, theme prompt) over live satellite of Parc del Fòrum, Barcelona.",
      },
      {
        src: "/assets/festcool/ushade-site-setup.png",
        caption:
          "Guided setup on the real Primavera Sound 2026 site — 17 stages geolocated from the official festival map.",
      },
      {
        src: "/assets/festcool/materials-catalogue.png",
        caption:
          "Reclaimed-material catalogue near the site — datasheet-sourced specs, provenance-tagged, transport CO₂e per m² and solar transmissivity per membrane.",
      },
      {
        src: "/assets/festcool/final-dashboard.jpg",
        caption:
          "Final dashboard — Cooling Gate PASS (ΔUTCI 4.8 °C derived, coverage 100%), bill of materials, and provenance badge on every number.",
      },
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
    images: [
      {
        src: "/assets/archai/demo-osm-begues.jpg",
        caption:
          "Live OSM prototype on Begues, Catalonia — clickable building footprints surface plantas, altura aproximada, área huella, and superficie construida per edificio.",
      },
    ],
    status: "Shipped",
    links: [
      {
        label: "Sample report (PDF)",
        href: "/reports/archai-compliance-report.pdf",
      },
      { label: "GitHub", href: "https://github.com/elkhouryrafik-boop" },
    ],
  },
  {
    id: "coolspend",
    number: "04",
    name: "CoolSpend",
    shortName: "CoolSpend",
    date: "2026",
    tagline: "3rd Place, Infrared.city Buildathon 2026",
    summary: "Budget-constrained street-tree placement optimiser for Barcelona — solo build, 3rd place at the Infrared.city Buildathon 2026. Fuses four real datasets (satellite heat + imperviousness, OSM geometry, Barcelona's tree inventory, the population register) into a 494-cell vulnerability grid, treats planting as budgeted weighted maximum coverage over validated slots, and reports cooling measured on live Infrared.city UTCI — never a proxy.",
    highlights: [
      "Candidate slots generated on a 4 m lattice with building / street / furniture / 8 m-spacing exclusions from OSM; placed by a cost-benefit greedy carrying the classical (1 − 1/e) ≈ 63% optimality guarantee, with an ecology gate that drops invasive and over-represented species (8-species plantable palette, anti-monoculture cap).",
      "Measured before/after design: a baseline UTCI run (no trees) builds the demand field — a cell counts only where UTCI > 26 °C ∧ impervious ∧ not already shaded, weighted by UTCI − 26 — then a second live run with the trees reports ΔUTCI as the difference of two measured grids.",
      "Plaça dels Àngels: 28 trees cooled a measured 4,268 m² at €30/m². Citywide €1M portfolio: 90 trees across 6 separated sites, 20,609 m² cooled, 26,745 residents served, zero invasive species.",
      "Three-tier Infrared backend (mock / cached / live) chosen server-side so a synthetic preview can't be mistaken for a measured result; a SimBudget guard caps live calls at 3 per run; the greedy terminates on a real stop_reason, not an iteration cap.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "numpy",
      "shapely",
      "pyproj",
      "Infrared.city SDK",
      "React 18 + TypeScript",
      "deck.gl",
      "mapbox-gl",
      "Vite",
    ],
    scene: undefined,
    sizzleSrc: "",
    images: [
      {
        src: "/assets/coolspend/citywide-plan.png",
        caption:
          "Citywide €1M plan — 494 blocks scanned, 6 hottest funded first: 90 trees, 20,609 m² measured cooling, 26,745 residents served. 90/90 trees verified on valid ground by an independent OSM re-check.",
      },
    ],
    status: "Shipped",
    links: [
      { label: "GitHub", href: "https://github.com/elkhouryrafik-boop/InFraRed-Hackathon-2026" },
    ],
  },
];
