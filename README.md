# Portfolio — Rafik El Khoury

Personal marketing site for an AI engineer for the built environment.

Stack:

- **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4**
- **R3F + drei + Three.js** for the per-project 3D scenes
- **GSAP + Lenis** for motion and smooth scroll
- **Remotion** for the intro reel and per-project sizzle videos
- **fal.ai (Flux Schnell)** for the live hero-plate regeneration demo
- **Cloudflare Pages** hosting (`.pages.dev` for v1)

Register: industrial brutalist — Swiss print typography fused with tactical telemetry. See [`docs/PRODUCT.md`](docs/PRODUCT.md) and [`docs/DESIGN.md`](docs/DESIGN.md) for the locked decisions.

---

## Development

```bash
npm install
cp .env.example .env.local         # add FAL_KEY here for the live hero regen
npm run dev                        # http://localhost:3000
```

### Remotion (videos)

```bash
npm run remotion:studio            # interactive preview at http://localhost:3001
npm run remotion:render            # render all 4 compositions to public/videos/*.mp4
```

Individual compositions:

| Script | Output |
|---|---|
| `npm run remotion:render:intro` | `public/videos/intro-reel.mp4` (5s loop) |
| `npm run remotion:render:ng` | `public/videos/sizzle-naturegooddest.mp4` (30s) |
| `npm run remotion:render:gigai` | `public/videos/sizzle-gigai.mp4` (25s) |
| `npm run remotion:render:archai` | `public/videos/sizzle-archai.mp4` (25s) |

### Deploy to Cloudflare Pages

See `wrangler.toml` for one-time setup. Once connected:

```bash
git push                           # CF Pages builds + deploys automatically
```

---

## Placeholders to fill in later

- `public/cv/rafik_el_khoury_cv.pdf` — copy the latest render from `../rendercv_output/`
- `public/assets/` — drop project screenshots, diagrams, masterplan boards here when ready
- `src/components/Contact.tsx` — replace Cal.com URL with the real one after the account is created
- `FAL_KEY` env var — needed for the live hero-regen demo to call fal.ai (falls back to a static SVG plate otherwise)

---

## Structure

```
portfolio/
├── docs/
│   ├── PRODUCT.md            # audience, voice, anti-references, CTAs
│   └── DESIGN.md             # tokens, type, motion, anti-pattern ban list
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts + smooth scroll provider + metadata
│   │   ├── page.tsx          # composes Nav + Hero + Work + About + Earlier + Contact + Colophon
│   │   ├── globals.css       # design tokens + Tailwind v4 @theme bridge
│   │   └── api/regen-hero/   # fal.ai live hero-plate generator (edge runtime)
│   ├── components/
│   │   ├── Nav.tsx           # sticky brutalist nav with section index
│   │   ├── Hero.tsx          # name, tagline, two CTAs, mono marquee
│   │   ├── HeroPlate.tsx     # fal.ai regen button + SVG fallback
│   │   ├── Work.tsx          # three expandable project cards
│   │   ├── ProjectCard.tsx   # expand-in-place pattern with R3F scene
│   │   ├── scenes/           # NatureGooddest Pareto, GigAI pipeline, ARCHAI wireframe
│   │   ├── About.tsx         # civil-eng → planning → IAAC → AI arc
│   │   ├── EarlierWork.tsx   # UAE / IMKAN / Lebanon / Dundee / Loughborough cards
│   │   ├── Contact.tsx       # GitHub + Cal.com + email + LinkedIn + CV
│   │   ├── Colophon.tsx      # agent-credits list, the meta-portfolio signal
│   │   ├── Cursor.tsx        # custom crosshair cursor with mix-blend-difference
│   │   ├── SmoothScroll.tsx  # Lenis wrapper, disabled under reduced-motion
│   │   └── Monogram.tsx      # REK monogram, used in Nav and Hero
│   └── lib/
│       └── projects.ts       # NatureGooddest / GigAI / ARCHAI source of truth
├── remotion/                 # standalone Remotion entry (not imported by Next)
│   ├── index.tsx
│   ├── Root.tsx              # registers the four compositions
│   ├── IntroReel.tsx
│   └── sizzles/              # NatureGooddest / GigAI / ARCHAI 30s reels
├── public/
│   ├── assets/               # hero-fallback.svg, future project screenshots
│   ├── cv/                   # rafik_el_khoury_cv.pdf
│   └── videos/               # rendered Remotion MP4s
├── wrangler.toml             # Cloudflare Pages config
├── next.config.ts
├── remotion.config.ts
└── package.json
```
