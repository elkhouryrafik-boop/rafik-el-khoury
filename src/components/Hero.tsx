"use client";

import { useEffect, useRef } from "react";
import { HeroPlate } from "./HeroPlate";
import { IntroReelVideo } from "./IntroReelVideo";

export function Hero() {
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = "AI ENGINEER · BUILT ENVIRONMENT · CIVIL ENG + URBAN PLANNER + AI RESEARCHER · ";
    const el = labelRef.current;
    if (!el) return;
    el.textContent = text.repeat(6);
  }, []);

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col px-6 pb-8 pt-6 md:px-10 md:pt-8 lg:px-14"
    >
      {/* Top ruled meta strip */}
      <div
        className="flex items-baseline justify-between border-t pt-3"
        style={{
          borderColor: "var(--rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}
      >
        <span>— Personal site / 2026</span>
        <span>Barcelona · Athens · Beirut · Open to relocation</span>
      </div>

      {/* Hero content — 12-col grid, left text, right media block */}
      <div className="grid flex-1 grid-cols-12 items-center gap-6 py-8 md:gap-10 md:py-10">
        <div className="col-span-12 lg:col-span-6">
          <div
            className="mb-6 inline-flex items-center gap-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            <span style={{ width: 24, height: 1, background: "var(--ink)" }} aria-hidden />
            AI Engineer for the Built Environment
          </div>

          <h1
            className="leading-[var(--lh-display)]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 8rem)",
              letterSpacing: "-0.035em",
              textWrap: "balance" as React.CSSProperties["textWrap"],
              color: "var(--ink)",
            }}
          >
            Rafik El&nbsp;Khoury
          </h1>

          <p
            className="mt-6 max-w-[58ch]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
            }}
          >
            Civil engineer, urban planner, AI researcher at <em>IAAC</em>.
            Building tools for automated compliance checking, project-manager
            communication pipelines, and augmented regenerative design.
            Authorised to work in the <strong>UK</strong>, <strong>EU</strong>,
            and <strong>UAE</strong>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/elkhouryrafik-boop"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border px-4 py-3"
              style={{
                borderColor: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-meta)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink)",
                background: "transparent",
                borderRadius: 0,
              }}
            >
              GitHub <span aria-hidden>↗</span>
            </a>
            <a
              href="https://cal.com/rafik-el-khoury-6vwa4v"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border px-4 py-3"
              style={{
                borderColor: "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-meta)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: "var(--accent)",
                color: "var(--accent-ink)",
                borderRadius: 0,
              }}
            >
              Book a call <span aria-hidden>↗</span>
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-2 py-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-meta)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
                borderRadius: 0,
              }}
            >
              See work <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        {/* Right column: hero plate stacked over intro reel — visible above the fold on lg+ */}
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-6">
          <HeroPlate />
          <div>
            <IntroReelVideo />
            <div
              className="mt-2 flex items-baseline justify-between"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-micro)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              <span>fig. ∞ — intro reel · remotion</span>
              <span>5 s · muted loop · autoplay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ruled marquee */}
      <div
        className="overflow-hidden border-t border-b py-2"
        style={{ borderColor: "var(--rule)" }}
      >
        <span
          ref={labelRef}
          className="block whitespace-nowrap"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "0.18em",
            color: "var(--ink-3)",
          }}
        >
          AI ENGINEER · BUILT ENVIRONMENT · CIVIL ENG + URBAN PLANNER + AI RESEARCHER ·
        </span>
      </div>
    </section>
  );
}
