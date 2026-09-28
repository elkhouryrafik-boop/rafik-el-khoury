export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  number: string;
  group: "relk" | "iaac";
  name: string;
  shortName: string;
  date: string;
  tagline: string;
  /** One-line problem statement. */
  problem: string;
  /** Exactly three verified metrics. */
  metrics: [Metric, Metric, Metric];
  stack: string[];
  status: string;
  scene?: "gigai" | "archai";
  sizzleSrc?: string;
  /** Inline SVG diagram used when no safe screenshot exists. */
  diagram?: "revit" | "cgate" | "timesheet";
  demoSrc?: string;
  demoCaption?: string;
  /** Show images as an even grid instead of one lead image + grid. */
  gridOnly?: boolean;
  /** Up to three proof images. */
  images: { src: string; caption: string }[];
  links: { label: string; href: string }[];
};

const GITHUB = "https://github.com/elkhouryrafik-boop";

export const projects: Project[] = [
  // ─── At RELK, 2026 ──────────────────────────────────────────────
  {
    id: "coliath",
    number: "01",
    group: "relk",
    name: "Coliath Castle: site strategy",
    shortName: "Coliath",
    date: "2026",
    tagline: "Heritage planning · Akkar, Lebanon",
    problem:
      "A 12th-century castle sits in the middle of a growing village. Before anyone designs, what can the site actually hold?",
    metrics: [
      { value: "162", label: "buildings mapped within 200 m" },
      { value: "87,672", label: "hourly climate records analysed" },
      { value: "~52,000", label: "words of source-tagged research" },
    ],
    stack: ["QGIS", "OpenStreetMap", "SRTM DEM", "ERA5", "Python", "Blender", "Multi-agent research"],
    status: "Live commission",
    images: [
      { src: "/assets/coliath/site-ring-buildings.webp", caption: "Buildings in 50/100/200 m rings" },
      { src: "/assets/coliath/terrain-knoll.webp", caption: "Terrain section through the knoll" },
      { src: "/assets/coliath/view-from-tower.webp", caption: "Site visit: view from the tower" },
    ],
    links: [],
  },
  {
    id: "revit-mcp",
    number: "02",
    group: "relk",
    name: "Revit MCP, hardened",
    shortName: "Revit MCP",
    date: "2026",
    tagline: "AI agents inside Revit, safely · used by the office's architects",
    problem:
      "Architects wanted AI agents to work in live Revit models. The open-source bridge had no authentication.",
    metrics: [
      { value: "1,240", label: "passing tests, up from 64" },
      { value: "5 / 5", label: "security findings fixed same day" },
      { value: "9", label: "new tools added" },
    ],
    stack: ["Python", "pyRevit Routes", "MCP", "Revit API", "pytest + CI"],
    status: "In use",
    diagram: "revit",
    images: [],
    links: [{ label: "GitHub", href: GITHUB }],
  },
  {
    id: "render-app",
    number: "03",
    group: "relk",
    name: "Render App",
    shortName: "Render App",
    date: "2026",
    tagline: "AI rendering studio for the office's architects",
    problem:
      "Architects need client-ready renders from sketches, massing and plans, without losing the building they drew.",
    metrics: [
      { value: "18", label: "render tasks, sketch to masterplan" },
      { value: "302", label: "tests passing" },
      { value: "27 MB", label: "real SketchUp site model tested" },
    ],
    stack: ["Python", "fal.ai FLUX", "ControlNet (depth)", "React", "Docker"],
    status: "In use",
    gridOnly: true,
    images: [
      { src: "/assets/render-app/massing-render.webp", caption: "Massing model to render" },
      { src: "/assets/render-app/aerial-render.webp", caption: "Aerial view task" },
      { src: "/assets/render-app/interior-render.webp", caption: "Interior task" },
    ],
    links: [],
  },
  {
    id: "cgate",
    number: "04",
    group: "relk",
    name: "C-Gate",
    shortName: "C-Gate",
    date: "2026",
    tagline: "Tender compliance checking",
    problem:
      "Integrity clauses in procurement tenders are easy to miss and costly to get wrong.",
    metrics: [
      { value: "381", label: "automated tests" },
      { value: "15", label: "checklist items, quotes grounded verbatim" },
      { value: "0", label: "LLM calls in the review path" },
    ],
    stack: ["Python", "PyMuPDF", "python-docx", "SQLite ledger", "FastAPI", "Local LLM (drafting only)"],
    status: "Built · internal",
    diagram: "cgate",
    images: [],
    links: [],
  },
  {
    id: "timesheets",
    number: "05",
    group: "relk",
    name: "Timesheet bot",
    shortName: "Timesheets",
    date: "2026",
    tagline: "Hours by chat, into Excel",
    problem:
      "Hundreds of staff log hours in separate Excel workbooks, and someone chases them every month.",
    metrics: [
      { value: "703", label: "tests passing" },
      { value: "329", label: "workbooks generated in ~79 s" },
      { value: "418", label: "project codes matched" },
    ],
    stack: ["TypeScript", "Microsoft Teams SDK", "Telegram", "Claude", "xlsx-populate", "SQLite"],
    status: "Piloting in the ERP",
    diagram: "timesheet",
    images: [],
    links: [],
  },

  // ─── At IAAC, 2025–2026 ─────────────────────────────────────────
  {
    id: "coolspend",
    number: "06",
    group: "iaac",
    name: "CoolSpend",
    shortName: "CoolSpend",
    date: "2026",
    tagline: "3rd place, Infrared.city Buildathon 2026 · solo",
    problem:
      "Barcelona has a fixed tree budget. Which streets should get trees first to cut heat where people live?",
    metrics: [
      { value: "90 trees", label: "placed on a €1M citywide plan" },
      { value: "20,609 m²", label: "cooled, measured on live UTCI" },
      { value: "26,745", label: "residents served" },
    ],
    stack: ["Python", "FastAPI", "shapely", "Infrared.city SDK", "React", "deck.gl"],
    status: "Shipped",
    sizzleSrc: "/videos/coolspend-30s.mp4",
    images: [
      { src: "/assets/coolspend/citywide-plan.png", caption: "Citywide plan: six hottest sites funded first" },
    ],
    links: [{ label: "GitHub", href: `${GITHUB}/InFraRed-Hackathon-2026` }],
  },
  {
    id: "festcool",
    number: "07",
    group: "iaac",
    name: "FestCOOL / U-Shade",
    shortName: "U-Shade",
    date: "2026",
    tagline: "Shade placement for festivals",
    problem:
      "Festival crowds stand on bare concrete in peak heat. Where should a limited amount of shade go?",
    metrics: [
      { value: "6 m", label: "grid of heat × crowd density" },
      { value: "~1,080 m²", label: "shade from 30 reclaimed sails" },
      { value: "4", label: "person team; I led the code" },
    ],
    stack: ["Python", "infrared.city UTCI", "JuPedSim", "Integer programming", "Mapbox GL", "Claude"],
    status: "Active",
    sizzleSrc: "/videos/ushade-marketing-30s.mp4",
    images: [
      { src: "/assets/festcool/slide-why-it-matters.png", caption: "The heat risk at Barcelona festivals" },
      { src: "/assets/festcool/slide-jupedsim.png", caption: "Crowd model feeding shade placement" },
      { src: "/assets/festcool/slide-design1.png", caption: "Design 1: 30 reclaimed sails" },
    ],
    links: [{ label: "GitHub", href: GITHUB }],
  },
  {
    id: "archai",
    number: "08",
    group: "iaac",
    name: "ARCHAI",
    shortName: "ARCHAI",
    date: "2025–2026",
    tagline: "Zoning checks inside Rhino",
    problem:
      "Checking a massing model against zoning rules is slow, manual, and hard to audit.",
    metrics: [
      { value: "41", label: "checks on a 10,880 m² test site" },
      { value: "19 / 22", label: "pass / fail, each citing its rule" },
      { value: "0", label: "missing or unsupported metrics" },
    ],
    stack: ["C# / RhinoCommon", "Python", "ChromaDB", "GPT-4o-mini", "OpenStreetMap"],
    status: "Shipped",
    scene: "archai",
    sizzleSrc: "/videos/sizzle-archai.mp4",
    demoSrc: "/videos/archai-demo.mp4",
    demoCaption: "Live demo · Begues, Catalonia · click a footprint for floors, height and area.",
    images: [
      { src: "/assets/archai/slide-results-rhino.png", caption: "PASS/FAIL panel inside Rhino" },
      { src: "/assets/archai/demo-osm-begues.jpg", caption: "OSM prototype, Begues" },
      { src: "/assets/archai/slide-geometry-graph.png", caption: "Model as a geometry graph" },
    ],
    links: [
      { label: "Sample report (PDF)", href: "/reports/archai-compliance-report.pdf" },
      { label: "GitHub", href: GITHUB },
    ],
  },
  {
    id: "gigai",
    number: "09",
    group: "iaac",
    name: "GigAI",
    shortName: "GigAI",
    date: "2026",
    tagline: "Construction change coordination",
    problem:
      "Material changes agreed in meetings get lost before they reach the project manager.",
    metrics: [
      { value: "~85%", label: "confidence on demo proposals" },
      { value: "3", label: "integrations: ACC, Calendar, Gmail" },
      { value: "4-factor", label: "confidence score; a PM approves" },
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL + pgvector", "Claude"],
    status: "Active",
    scene: "gigai",
    sizzleSrc: "/videos/sizzle-gigai.mp4",
    images: [
      { src: "/assets/gigai/process-rfi.png", caption: "An RFI turned into a costed proposal" },
      { src: "/assets/gigai/rfi-approval.png", caption: "PM approval card" },
    ],
    links: [{ label: "GitHub", href: GITHUB }],
  },
];

/** Compact credit lines: work in progress without public proof yet. */
export const inProgress: { name: string; line: string; status: string; image?: { src: string; caption: string } }[] = [
  {
    name: "AI layer for the office ERP",
    line: "A local, permission-scoped agent layer on ERPNext. The timesheet bot and Revit MCP already plug into it. No cloud LLM.",
    status: "Piloting",
  },
  {
    name: "rafikelkhoury.com rebuild",
    line: "New Astro site for the firm, with a 528-project archive and a new design system.",
    status: "Preview, not launched",
    image: { src: "/assets/relk/company-site-preview.webp", caption: "Homepage preview" },
  },
];
