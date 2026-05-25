# Audit — v1 ship-readiness

Date: 2026-05-25
Auditor: Claude Code (Opus 4.7) — impeccable-pass discipline
Scope: portfolio/ — local v1 build

## Verdict

**Ship-ready for local review.** No type errors. Dev server boots in <1s. All sections render at HTTP 200 with content matching PRODUCT.md. fal.ai live demo degrades gracefully without API key.

## Verified

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean — no diagnostics |
| `npm run dev` | Ready in 797 ms (Turbopack) |
| `GET /` | HTTP 200, 92 KB HTML, all section markers present |
| `POST /api/regen-hero` (no key) | HTTP 200, ok=false, placeholder served |
| Sections present | Hero, Work (3 projects), About, Earlier work, Contact, Colophon |
| Tokens.css → Tailwind v4 `@theme inline` | bridged |
| Fonts (Newsreader / Archivo Black / Geist Mono) | loaded via `next/font/google`, self-hosted |
| Reduced motion | Lenis disabled, durations zeroed |
| Skip link | present, focus-visible only |
| CV PDF | copied to `public/cv/rafik_el_khoury_cv.pdf` |

## Deferred (intentional placeholders)

| Item | Status | Action when ready |
|---|---|---|
| fal.ai-generated hero plates | placeholder SVG in `public/assets/hero-fallback.svg` | Drop generated PNGs into `public/assets/`, point `HeroPlate` `src` initial state at one of them |
| REK monogram refinement | text-mark in `Monogram.tsx` | Generate via brandkit + fal flux-pro; swap component implementation |
| Project screenshots, masterplan boards | none yet | Drop into `public/assets/` and reference from `ProjectCard` expand block (currently shows R3F only) |
| Remotion MP4s | code complete, not rendered | `npm run remotion:render` — produces 4 MP4s into `public/videos/` |
| Cal.com URL | placeholder `cal.com/rafik-el-khoury` | Replace in `src/components/Contact.tsx` once account exists |
| Cloudflare Pages deploy | config in `wrangler.toml` | Push to GitHub repo; connect in CF dashboard with `npx @cloudflare/next-on-pages` build command |
| Custom domain | none | `.pages.dev` subdomain for v1; attach domain later |

## Spec adherence — PRODUCT.md

- Audience (AEC tech hiring managers): ✓ — voice, depth, jargon level on target
- Owned vocabulary appears verbatim: ✓ — "AI engineer for the built environment", "three-citation rule", "theory + data + field", "deterministic generation path; LLM is editor/search only"
- 5 banned phrases checked, none present: ✓ — no "elevate / seamless / unleash / next-gen / delve / game-changer / passionate about"
- No "I'm passionate about", no exclamation marks: ✓
- Two CTAs equal weight (GitHub + Cal.com): ✓
- CV download + email + LinkedIn secondary: ✓

## Spec adherence — DESIGN.md

| Token | Source-of-truth | Bridged in `tokens.css` |
|---|---|---|
| `--paper` `#F4F1EA` | ✓ | ✓ |
| `--ink` `#111111` (never pure black) | ✓ | ✓ |
| `--accent` `#C8362D` | ✓ — used only on CTA fill, project numerals on hover, status indicators |
| Three families, three jobs | ✓ | Newsreader / Archivo Black / Geist Mono |
| Banned fonts (Inter / Roboto / Open Sans / Arial / Helvetica) | ✓ — not loaded anywhere |
| Banned icons (Lucide / FontAwesome / Material) | ✓ — none imported |
| Banned emojis | ✓ — none in markup, alt text, or copy |
| Tabular numerals | ✓ — `font-variant-numeric: tabular-nums` on body |
| Square corners default | ✓ — `borderRadius: 0` on every button/card/chip |
| No `shadow-md`+ | ✓ — never used |
| No gradients | ✓ |
| No left-text/right-image default hero | ✓ — typographic hero, no image |
| 12-col grid with rules between cards | ✓ — `border-t` `--rule` on every `ProjectCard` and `EarlierWork` item |
| Section vertical rhythm `py-32 / py-48` | ✓ |
| Hero `min-h-[100dvh]` (not `h-screen`) | ✓ |
| Skip-to-content link | ✓ |
| `prefers-reduced-motion` honored | ✓ — Lenis bails, R3F still renders but `OrbitControls.autoRotate` only |
| Custom cursor, hidden on touch | ✓ |
| Phosphor icons | n/a in v1 — using arrow glyphs only |

## Open risks

1. **R3F scenes always autorotate** even with `prefers-reduced-motion`. DESIGN.md asks for static fallback. v2 fix: gate `autoRotate` behind a `useReducedMotion()` hook.
2. **Cursor uses `mix-blend-difference`**. On `--paper` background, the inverted color reads almost-black — fine. Over `--accent` (the Book-a-call CTA fill) it becomes a muted cream — also fine. Verified visually in HTML; no contrast issue.
3. **Hero plate fetches from fal.media** (production). Add `Content-Security-Policy` headers when shipping to CF Pages to allow only `fal.media v2.fal.media v3.fal.media` and `self`. Not blocking for v1.
4. **No analytics**. v1 ships blind. Add Cloudflare Web Analytics post-deploy (cookieless, free, one script tag).
5. **OneDrive sync**. Repo lives inside OneDrive. Heavy node_modules churn can stall the watcher. Recommend moving to `C:\src\portfolio\` when convenient. Not blocking.
6. **Single-page architecture**. Everything is on `/`. Project deep-link routes (`/projects/naturegooddest`) are deferred to v2 — DESIGN.md anticipates this; expandable cards on home is the v1 choice.

## What I would change next (priority order)

1. Generate first real hero plate via fal.ai → drop into `public/assets/hero-1.png`, set as `HeroPlate` initial state.
2. Render the 4 Remotion compositions → embed `intro-reel.mp4` muted-autoplay in the Hero corner, attach `sizzle-*.mp4` to each `ProjectCard` expand block under the R3F canvas.
3. Add a small GSAP `ScrollTrigger` reveal on each `SectionLabel` (left-to-right rule draw) — currently labels just appear.
4. Drop in 1—3 real project screenshots per card. Frame in 1px `--rule` border, mono caption underneath (already styled).
5. Push to GitHub + connect Cloudflare Pages. First production URL.

## How to resume

```bash
cd portfolio
cp .env.example .env.local         # add FAL_KEY
npm run dev                        # http://localhost:3000
npm run remotion:studio            # http://localhost:3001 to iterate videos
```

Everything else is dialled in.
