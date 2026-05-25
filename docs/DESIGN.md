# DESIGN.md

Register: **industrial brutalist** — Swiss print typography fused with tactical telemetry. Diagram-as-hero. Rigid grids. Oversized monolithic type. Monospace meta-data. Anchored in AEC / blueprints / declassified manuals, not consumer SaaS.

## 1. Atmosphere

- Off-white substrate with one (and only one) accent. Cards float on a paper-like ground.
- Heavy structural lines, ruled like an engineering drawing. Visible grid divisions are decorative *and* informational.
- Numbers and meta-data render in monospace. Headers render in heavy neo-grotesque sans. Body in a refined serif or a humanist sans — never the same family as the headers.
- Asymmetric layouts. Oversized numerals bleeding off the edge of cards (`01`, `02`, `03`). Project meta in column headers like a spec sheet.
- Calm. Loud only in scale, never in colour.

## 2. Colour system

Hex codes are CSS-ready.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F4F1EA` | Page background. Warm off-white, like aged blueprint paper. |
| `--ink` | `#111111` | Primary text, ruled lines, heavy type. Never pure `#000`. |
| `--ink-2` | `#2F3437` | Secondary text. |
| `--ink-3` | `#787774` | Tertiary text, monospace meta, footnotes. |
| `--rule` | `#1110` *(20% ink alpha)* | Hairlines between cards, table borders. `rgba(17,17,17,0.20)`. |
| `--accent` | `#C8362D` | The one accent — heritage red, used sparingly: live indicators, project numerals on hover, the "Book a call" CTA fill. |
| `--accent-ink` | `#F4F1EA` | Text on `--accent`. |
| `--alert` | `#C8362D` | Same as accent — reserve for stateful warnings only. |

Dark mode: optional, deferred to v2. Brutalism reads stronger in light mode. If toggled later, invert to `--ink #F4F1EA`, `--paper #0F0F10`, `--accent` unchanged.

**Banned colours:** any blue used as a primary or hero background, neon greens / cyans / purples, gradients (linear, radial, mesh), iOS-blur on cards.

## 3. Typography

**Three families, three jobs.** No more.

### Primary stack (locked for v1)

| Role | Family | Fallback stack | Use |
|---|---|---|---|
| Display | `Monument Extended` (paid) — fallback `Archivo Black` (free, Google Fonts) | `'Archivo Black', 'Helvetica Neue', system-ui, sans-serif` | Hero, project numerals, viewport-bleeding letterforms. |
| Body | `Newsreader` (free, Google Fonts) | `'Newsreader', Georgia, serif` | Paragraphs, card body, About story. Editorial serif against the brutalist display. |
| Mono | `Geist Mono` (free, Vercel) | `'Geist Mono', 'JetBrains Mono', 'SF Mono', monospace` | Meta-data, dates, stack chips, ruled labels, colophon, CLI snippets, the REK mark. |

### Secondary stack (alternate — keep in code as a CSS variable swap)

For lighter / more editorial moments, or as the v2 A/B option:

| Role | Family | Note |
|---|---|---|
| Display | `Instrument Serif` (free, Google Fonts) | High-contrast editorial serif, dramatic curves. Reads less industrial, more literary. |
| Body | `Inter Tight` (free, Google Fonts) | Distinct from the banned plain `Inter` — tighter widths, cleaner numerals. Use *only* in the alt stack, never alongside the banned Inter. |
| Mono | `Geist Mono` | Shared with primary stack — mono never swaps. |

Both stacks ship in `tokens.css` as named font-family lists; swap is one variable change. v1 default is the primary stack.

**Banned:** Inter, Roboto, Open Sans, Helvetica (the round one), Arial.

**Scale.** Fluid, with `clamp()`.

```css
--fs-display:  clamp(4rem,   10vw, 11rem);   /* hero, oversized numerals */
--fs-h1:       clamp(2.5rem, 5vw,  4.5rem);  /* section opens */
--fs-h2:       clamp(1.75rem,3vw,  2.5rem);  /* project names */
--fs-h3:       clamp(1.25rem,2vw,  1.5rem);  /* card titles */
--fs-body:     1.0625rem;                    /* 17px, body */
--fs-meta:     0.8125rem;                    /* 13px, mono meta */
--fs-micro:    0.6875rem;                    /* 11px, mono labels */
```

**Tracking.** Negative on large display (`letter-spacing: -0.03em`). Positive on mono micro labels (`letter-spacing: 0.08em`, uppercase).

**Line-height.** Headers `1.05`. Body `1.6`. Mono `1.4`.

**Numbers.** Always tabular figures — `font-variant-numeric: tabular-nums`. Project years (2026, 2025, 2024) and any metric must align across rows.

## 4. Layout

- Outer container: `max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14`.
- Base grid: 12 columns, `gap-6`. Side rules every section visible as 1px hairline at `--rule`.
- Section vertical rhythm: `py-32 md:py-48`. Sections feel like distinct chapters, never cramped.
- Hero: `min-h-[100dvh]` (never `h-screen` — iOS Safari jump). Single screen, content vertically centred between the top nav and a fixed-bottom monospace ribbon.
- Project cards: asymmetric bento. Numeral column (2 cols) + title/summary column (6 cols) + meta column (4 cols). On click, the card expands in place to reveal pipeline diagram, R3F scene, sizzle video, stack chips, GitHub link.
- Visible ruled lines between cards, top and bottom — like a parts catalogue.
- No edge-to-edge sticky navbar. Top bar is part of the page grid, sits at the top of the container.

## 5. Components

| Component | Spec |
|---|---|
| **Nav** | `<header>` at top of grid, three slots: REK monogram (left), section index (centre, monospace, small caps with leader dots like a TOC), `book a call` CTA (right). Becomes a thin floating pill on scroll. |
| **Hero** | Massive display name, eyebrow `AI Engineer for the Built Environment` in mono micro, two CTAs (`github ↗` ghost + `book a call ↗` filled accent), Remotion intro reel pinned bottom-left as a 16:9 muted loop in a thin-ruled frame. |
| **Project card** | Numeral (display, `--accent` on hover), title (h2), one-line summary (body), stack chips (mono micro, ruled border, no fill). Click → expand in-place. Expanded state reveals 3-column block: pipeline diagram (left), R3F canvas (centre), sizzle video + GitHub button (right). |
| **Stack chips** | Mono micro, uppercase, 1px `--rule` border, `padding: 4px 8px`, no fill, no rounding — square corners. |
| **Buttons** | Two variants only. Ghost: 1px `--ink` border, no fill, `--ink` text. Filled: `--accent` fill, `--accent-ink` text. Square corners. No shadow. Hover: invert. |
| **Cards** | Square corners. 1px `--rule` border on the inside edges only. No drop shadow. No background fill — paper shows through. |
| **Ruled labels** | Mono micro, uppercase, with a leading `—` and trailing leader-dot rule that fills the remaining width. Used for section openers (`— 01 / WORK ......................`). |
| **Footer / Colophon** | Monospace dominant. Two columns: agent name / role. Single ruled line above. |

## 6. Motion

**Engine:** GSAP + ScrollTrigger for scroll choreography. Framer Motion for in-component micro-interactions. R3F + drei for 3D, scrubbed by GSAP timelines.

**Easings.** Default for everything: `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo-like). Spring-physical motion is fine for hover micro-interactions only. No `linear`, no default `ease-in-out`.

**Patterns.**

1. **Hero intro.** REK monogram strokes in via SVG `stroke-dashoffset`, name fades up with `text-wrap: balance`, eyebrow types in via mono caret, CTAs fade in last. Total 1.2s. Never replays.
2. **Section opener reveal.** Ruled label draws its leader-dot rule left-to-right on enter (`gsap.from(rule, { scaleX: 0, transformOrigin: 'left' })`).
3. **Project card scrub.** As card enters viewport, oversized numeral slides up 40px → 0, summary fades in with 60ms stagger across child elements.
4. **R3F scene scrub.** Each project's 3D scene is pinned for `100vh`. Scroll progress drives the scene state: camera orbit + parameter sweep (ARCHAI rule violations highlight red as scroll progresses; NatureGooddest Pareto points emerge along the front; GigAI nodes light up sequentially along the pipeline). Pin release smoothly.
5. **Card expand.** Click → in-place expand via FLIP. 280ms, custom easing. Content inside fades in with 40ms stagger after expand completes.
6. **Hover micro.** Numerals shift colour to `--accent` on hover with a 120ms transition. Buttons invert on hover. Stack chips lift 2px on hover with no shadow change.
7. **Cursor.** Custom cursor: a small mono crosshair (`+`) that grows to a circle over interactive elements. Hidden on touch.

**Banned motion.** Parallax of full-bleed images. Spring-bouncing logos. Looping idle animations on static content. Auto-rotating 3D models with no scroll input. Slow CSS keyframes ≥ 4s on background elements.

## 7. Imagery

| Source | Use |
|---|---|
| **fal.ai flux-pro** | Ambient texture plates per project — concrete macro, wireframe linework, topographic contours, mesh closeups. Generated to fit `--paper` palette, used at low opacity behind cards. |
| **fal.ai flux-pro** | Three project hero plates: NatureGooddest (urban+green wireframe), GigAI (architectural node graph in plan), ARCHAI (rule-checked building wireframe). Brutalist prompts, monochrome, paper-toned. |
| **fal.ai (live regen)** | Hero background plate. User clicks "regen". Edge function calls flux-schnell, swaps the plate, caches first 10. Demo of agentic creativity. |
| **User-supplied** | Real project screenshots and diagrams (PM dashboard, ARCHAI rule table, Pareto plot, masterplan boards). Treated as evidence — framed in 1px `--rule` borders, mono caption underneath. |
| **Remotion-rendered** | Site intro reel (REK monogram → tagline, ~5s loop). Three project sizzles (25–45s each). Colophon meta-video (~60s). |

**Image treatment.** All raster assets desaturate to between 0% and 30% saturation by default. Project screenshots remain in full colour to read as primary evidence. Never use stock photography. Never use unsplash architecture stock.

## 8. Iconography

- **Phosphor Light** at `1px` stroke for any UI icon need. Or hand-rolled SVG primitives.
- Arrows: `↗` glyph for external links. `→` glyph for internal nav.
- No Lucide. No FontAwesome. No Material Icons. No emojis — anywhere — in code, copy, or alt text.

## 9. Accessibility

- All text meets WCAG AA contrast at minimum. The `--accent` on `--paper` passes AA for large text only; never use accent as body-text colour on paper.
- Focus rings: 2px outline at `--ink`, 2px offset. Never `outline: none` without a visible replacement.
- `prefers-reduced-motion`: disable GSAP scrubs, disable R3F autorotate, disable scroll-pin sections. Replace with static states.
- Skip-to-content link, visible on focus, above the nav.
- All R3F canvases have a text-equivalent fallback below the canvas (`<noscript>` plus screen-reader-only paragraph) describing what the visualisation shows.
- Semantic landmarks: `<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`.

## 10. Performance budget

- Initial JS payload: ≤ 180kb gzipped (excluding the lazy-loaded R3F bundles).
- Each R3F scene: lazy-imported, mounted only when its section is within `200vh` of the viewport, unmounted when ≥ `200vh` past.
- Hero plate image: ≤ 80kb (AVIF), with a CSS-only fallback gradient pattern.
- LCP target: ≤ 1.8s on a throttled 4G profile.
- CLS target: 0 (every image has `aspect-ratio`, every dynamic block reserves height).
- Lighthouse perf score target: ≥ 90 on mobile.

## 11. Anti-patterns (explicit ban list)

- Inter / Roboto / Open Sans / Arial / Helvetica anywhere.
- Lucide / FontAwesome / Material icons anywhere.
- Emojis anywhere — markup, alt text, code comments, copy.
- `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`. Any drop shadow darker than `rgba(0,0,0,0.05)`.
- Gradients of any kind.
- Glassmorphism beyond an optional 6px nav-pill blur.
- `rounded-full` on buttons or large containers. Square corners are the default; max radius `2px`.
- "Elevate", "seamless", "unleash", "next-gen", "game-changer", "delve", "passionate about".
- Lorem ipsum.
- Generic placeholder names ("John Doe", "Acme Corp").
- Sticky edge-to-edge navbars glued to viewport top.
- Symmetrical 3-up Bootstrap feature grids.
- Left-text / right-image as the default hero composition.
- Bouncy spring physics on anything other than micro-interactions.
- Auto-playing audio. Auto-playing un-muted video.
- Pop-up modals on first visit.

## 12. Tokens — export

These ship as a single `tokens.css` file consumed by Tailwind (`@theme` block) and by R3F scenes (read via CSS custom property → Three.js material).

```css
:root {
  --paper:      #F4F1EA;
  --ink:        #111111;
  --ink-2:      #2F3437;
  --ink-3:      #787774;
  --rule:       rgba(17, 17, 17, 0.20);
  --accent:     #C8362D;
  --accent-ink: #F4F1EA;

  --fs-display: clamp(4rem,   10vw, 11rem);
  --fs-h1:      clamp(2.5rem, 5vw,  4.5rem);
  --fs-h2:      clamp(1.75rem,3vw,  2.5rem);
  --fs-h3:      clamp(1.25rem,2vw,  1.5rem);
  --fs-body:    1.0625rem;
  --fs-meta:    0.8125rem;
  --fs-micro:   0.6875rem;

  --lh-display: 1.05;
  --lh-body:    1.6;
  --lh-mono:    1.4;

  --container:  1440px;
  --grid-gap:   1.5rem;

  --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast:   120ms;
  --dur-base:   280ms;
  --dur-slow:   600ms;
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast: 0ms; --dur-base: 0ms; --dur-slow: 0ms; }
}
```
