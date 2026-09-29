"use client";

import { useEffect, useRef } from "react";
import { WorkWall } from "./WorkWall";

export function Hero() {
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = "URBANIST · AI STRATEGIST · SUSTAINABLE BUILT ENVIRONMENT · CIVIL ENG + SPATIAL PLANNING + URBAN DESIGN + AI · ";
    const el = labelRef.current;
    if (!el) return;
    el.textContent = text.repeat(6);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100dvh-4.3rem)] flex-col overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Full-bleed wall of project snippets — sits behind everything in the hero */}
      <WorkWall />

      {/* Top ruled meta strip */}
      <div
        className="border-b border-t"
        style={{ background: "var(--paper)", borderColor: "var(--ink)" }}
      >
        <div
          className="mx-auto flex max-w-[1440px] items-baseline justify-between gap-4 px-6 py-3 md:px-10 lg:px-14"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
          }}
        >
          <span>— Personal site / 2026</span>
          <span>Barcelona · Beirut · Athens · Abu Dhabi · Open to relocation</span>
        </div>
      </div>

      {/* Title block — a paper plate laid over the wall; the wall stays hoverable around it */}
      <div className="pointer-events-none mx-auto flex w-full max-w-[1440px] flex-1 items-end px-3 pb-3 pt-[30dvh] md:px-10 md:py-10 lg:items-center lg:px-14">
        <div
          className="pointer-events-auto w-full max-w-[38rem] border p-6 md:p-10"
          style={{ background: "var(--paper)", borderColor: "var(--ink)" }}
        >
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
            Urbanist · AI Strategist
          </div>

          <h1
            className="leading-[var(--lh-display)]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 5.2vw, 5.25rem)",
              letterSpacing: "-0.035em",
              textWrap: "balance" as React.CSSProperties["textWrap"],
              color: "var(--ink)",
            }}
          >
            Rafik El&nbsp;Khoury
          </h1>

          <p
            className="mt-5 max-w-[24ch]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Urbanist and AI strategist for a sustainable built environment.
            Engineer by training.
          </p>

          <p
            className="mt-5 max-w-[58ch]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
            }}
          >
            Civil engineer and urban planner, now building AI tools for
            architects at <em>RELK</em>. Authorised to work in the{" "}
            <strong>UK</strong>, <strong>EU</strong> and <strong>UAE</strong>.
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
      </div>

      {/* Bottom ruled marquee */}
      <div
        className="overflow-hidden border-t border-b py-2"
        style={{ background: "var(--paper)", borderColor: "var(--ink)" }}
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
          URBANIST · AI STRATEGIST · SUSTAINABLE BUILT ENVIRONMENT · CIVIL ENG + SPATIAL PLANNING + URBAN DESIGN + AI ·
        </span>
      </div>
    </section>
  );
}
