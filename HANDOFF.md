# Handoff — Brutalist portfolio site v1 (Next.js + R3F + Remotion + fal.ai)

**Created:** 2026-05-25 — Claude Code session (Opus 4.7)
**Branch:** `master`
**Last commit:** `53f6138` — Initial commit from Create Next App
*(All work below is uncommitted — the repo only has the create-next-app scaffold committed so far.)*

## Goal

Build Rafik El Khoury's personal marketing/portfolio site to ship to AEC tech hiring managers — three flagship projects (NatureGooddest / GigAI / ARCHAI) presented in an industrial-brutalist register, with the site itself demonstrating orchestrated AI craft (R3F scenes, Remotion video, fal.ai-generated imagery). v1 hosts on Cloudflare Pages at a `.pages.dev` subdomain; custom domain deferred.

## Current state

Local v1 is fully working. Last verified in this session:

- `npx tsc --noEmit` — clean (no diagnostics).
- `npm run dev` — `Next.js 16.2.6 (Turbopack), Ready in ~800 ms`.
- `GET http://localhost:3000/` → 200, 94 KB HTML, all sections present.
- All four Remotion videos rendered to `public/videos/` (intro-reel.mp4 plus three sizzles); they stream at 200 from the dev server.
- fal.ai hero plate + REK monogram concept generated and stored in `public/assets/`.
- Real project screenshots from the GigAI and NatureGooddest source repos copied into `public/assets/{gigai,naturegooddest}/`; ARCHAI has none (its source repo has no images, only data + PDFs).
- Dev server stopped at end of session.
- Cloudflare Pages deploy NOT done — config only.
- No GitHub remote yet — `master` only exists locally.

## Files in flight

Everything below `portfolio/` is uncommitted. Notable directories:

- `src/app/` — `layout.tsx` (fonts + smooth scroll + metadata), `page.tsx` (Nav + Hero + HeroPlate + IntroReelVideo + Work + About + EarlierWork + Contact + Colophon), `globals.css` (design tokens + Tailwind v4 `@theme inline` bridge).
- `src/components/` — 14 components. Key ones:
  - `Nav.tsx`, `Hero.tsx`, `HeroPlate.tsx` (static fal.ai plate — the live regen button was deliberately removed at user request).
  - `Work.tsx`, `ProjectCard.tsx` (expand-in-place pattern; expanded panel shows R3F scene + ImageStrip + SizzleVideo).
  - `scenes/SceneFor.tsx` plus `NatureGooddestScene.tsx`, `GigAIScene.tsx`, `ArchaiScene.tsx` (dynamic-imported, ssr:false).
  - `ImageStrip.tsx`, `SizzleVideo.tsx`, `IntroReelVideo.tsx`.
  - `Colophon.tsx`, `Contact.tsx`, `Cursor.tsx`, `SmoothScroll.tsx`, `Monogram.tsx`, `StackChip.tsx`, `SectionLabel.tsx`, `EarlierWork.tsx`, `About.tsx`.
- `src/lib/projects.ts` — single source of truth for the 3 projects (now includes `images[]` and `sizzleSrc`).
- `remotion/` — standalone Remotion entry. `index.tsx` → `Root.tsx` registers 4 compositions: `intro-reel`, `sizzle-naturegooddest`, `sizzle-gigai`, `sizzle-archai`. Sizzles share `SizzleShell.tsx`.
- `public/assets/` — `hero-plate.jpg`, `monogram.jpg`, `hero-fallback.svg`, plus `naturegooddest/` (5 PNGs) and `gigai/` (5 PNGs).
- `public/videos/` — all 4 rendered MP4s.
- `public/cv/rafik_el_khoury_cv.pdf` — copied from `../rendercv_output/`.
- `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/AUDIT.md` — locked context documents. The first two are loaded by the `impeccable` skill.
- `wrangler.toml`, `.env.example`, `.eslintrc.json`, `remotion.config.ts` — top-level config.
- `CLAUDE.md` + `AGENTS.md` — auto-generated, warn that Next.js 16 has breaking changes vs training data.

Stray dev logs at repo root (`.dev*.log`, `.remotion*.log`) — safe to delete.

## What changed this session

This was a from-scratch build session. Roughly:

1. Wrote `docs/PRODUCT.md` (audience, voice, owned vocabulary, anti-references) and `docs/DESIGN.md` (industrial-brutalist tokens, type stack, motion, ban list).
2. Scaffolded Next.js 16 + React 19 + Tailwind v4 via `create-next-app`. Installed R3F + drei + three + gsap + @gsap/react + lenis + remotion (+ @remotion/cli, @remotion/player).
3. Built all 14 components above. Wired fonts (Newsreader / Archivo Black / Geist Mono) via `next/font/google`.
4. Wrote three R3F scenes — Pareto scatter, pipeline node graph, wireframe building.
5. Wrote 4 Remotion compositions, rendered all to MP4 via `npm run remotion:render`.
6. Generated REK monogram + brutalist hero plate via the `mcp__fal__generate_image` tool (Flux Pro v1.1). Downloaded to `public/assets/`.
7. Pulled 5 NatureGooddest + 5 GigAI screenshots from the source repos at `C:\Users\Rafik\OneDrive\Python Resources\NatureGooddest` and `C:\Users\Rafik\Documents\GitHub\Research-studio_GigAI`. Wired into `ImageStrip` inside `ProjectCard`.
8. Major sizzle rewrite at user request: the NatureGooddest sizzle originally showed an NSGA-II Pareto front and was deemed "too technical." Rewrote it as a Barcelona heatmap → target-lock → shelter-generation narrative ending in `-12 °C Tmrt / +38 % shade`. Re-rendered.
9. Renamed "Fireflies" → "Audio capture" in both the GigAI sizzle and the GigAI highlight bullet in `projects.ts`, then re-rendered the GigAI sizzle. (User wanted the brand-name dependency removed.)
10. The original plan included a live `fal.ai` regen button on the hero plate (route at `src/app/api/regen-hero/`). User rejected this — deleted the entire `src/app/api/` tree and rewrote `HeroPlate.tsx` to be a static `<img>`. The Colophon page still lists fal.ai but only in the build-time role.

## What we tried that didn't work

- **`eslint` key in `next.config.ts`** — Next 16 dropped support; logged `Unrecognized key(s) in object: 'eslint'` on boot. Moved exclusions to `.eslintrc.json` instead. Do not re-add the key.
- **Initial GigAI sizzle render** failed at frame 6 with `TypeError: Cannot read properties of undefined (reading 'x')`. Root cause: `interpolate(frame, [120, 540], ...)` with only `extrapolateRight: "clamp"` left `extrapolateLeft` at its default of `"extend"`, so `flow` went negative for frames < 120 and `NODES[-1]` was undefined. Fix: always set both `extrapolateLeft` and `extrapolateRight` to `"clamp"`, and additionally clamp the computed indices with `Math.max(0, …)`. Already applied — do not undo.
- **Live fal.ai regen button on the hero plate** — fully implemented (edge route + UI button + SVG fallback), then deleted because the user said "Why would I do that?" Do not re-introduce unless the user explicitly asks. The fallback SVG at `public/assets/hero-fallback.svg` is still in place but no longer referenced.
- **`React.FC` in remotion files** without `import * as React from "react"` — caused the JSX namespace to be missing because tsconfig is `jsx: react-jsx`. Fix already applied to all 6 remotion .tsx files.
- **Stale `.next/dev/types/validator.ts` referencing the deleted `api/regen-hero/route.js`** — fixed by `rm -rf .next` once. Will re-occur if the API route is recreated and then deleted again.
- **OneDrive sync** is mildly hostile to `node_modules` churn. Tolerable for now. Moving the repo to `C:\src\portfolio\` is a future cleanup, not a v1 blocker.

## Open questions / decisions pending

1. **GitHub repo.** No remote yet. Need a `portfolio` repo on `github.com/elkhouryrafik-boop` before CF Pages can connect.
2. **Custom domain.** `.pages.dev` for v1 is fine, but the contact section already prints `cal.com/rafik-el-khoury` and the colophon prints `github.com/elkhouryrafik-boop/portfolio`. If the GitHub username or domain ever changes, both files need updating.
3. **Cal.com URL** — the URL in `src/components/Contact.tsx` is currently the placeholder `https://cal.com/rafik-el-khoury`. Replace with the real one once the account exists.
4. **ARCHAI has no screenshots.** Its source repo (`C:\Users\Rafik\Documents\GitHub\The_Real_Product_ARKAI`) contains only `.py`, `.csv`, `.json`, `.sqlite3`, `.pickle`, `.ttl`, `.yaml`, and one small regulations PDF — no PNG/JPG. The card currently shows only the R3F scene + sizzle. Either add screenshots when available, or accept that ARCHAI stays sparser than the other two.
5. **`prefers-reduced-motion`** — Lenis is disabled and CSS durations are zeroed, but the R3F scenes still auto-orbit via `OrbitControls autoRotate`. Worth gating behind a `useReducedMotion()` hook in v2.

## Next steps

In order. The first item is small enough to execute immediately in a fresh session.

1. **Make a real commit.** `git add` everything except the stray `.dev*.log` and `.remotion*.log` files; commit as `feat: v1 portfolio — brutalist register, R3F scenes, Remotion videos, fal.ai imagery`. Use `.gitignore` to keep those logs out permanently.
2. **Create the GitHub repo.** `gh repo create elkhouryrafik-boop/portfolio --public --source . --remote origin`, then `git push -u origin master`. (Confirm `gh auth status` first.)
3. **Connect Cloudflare Pages.** Use the dashboard. Build command: `npx @cloudflare/next-on-pages`. Output directory: `.vercel/output/static`. Env var: `FAL_KEY` (unused at runtime now, but reserved). First deployment goes to `portfolio-XXXX.pages.dev`. See `wrangler.toml` for the full one-time setup notes.
4. **Replace Cal.com placeholder.** Once the account exists, update the URL in `src/components/Contact.tsx` and the `value` label below it. Redeploy.
5. **Visual QA pass on a fresh laptop.** Especially the hero — confirm the IntroReelVideo autoplays muted, the HeroPlate JPG isn't oversaturated next to the paper background, and the 5-up image strip in NatureGooddest doesn't crush the tall slides.
6. **(Optional)** Add a `useReducedMotion` hook and gate `OrbitControls.autoRotate` behind it across all three R3F scenes.
7. **(Optional)** Render a 4th Remotion composition — a 60-second colophon meta-video that walks through the agent stack. The Colophon section already implies one exists; building it would close that loop.

## How to resume

Paste into the new Claude Code session:

> Read `HANDOFF.md` at the project root and continue from "Next steps" item 1. Do not re-explore territory listed under "What we tried that didn't work" unless the listed condition is met.
