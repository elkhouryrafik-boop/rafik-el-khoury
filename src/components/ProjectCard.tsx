"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { StackChip } from "./StackChip";
import { SceneFor } from "./scenes/SceneFor";
import { SizzleVideo } from "./SizzleVideo";
import { ImageStrip } from "./ImageStrip";

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="border-t py-12"
      style={{ borderColor: "var(--rule)" }}
    >
      {/* Sizzle — always visible, full card width, autoplay on scroll */}
      <SizzleVideo
        src={project.sizzleSrc}
        label={`Remotion sizzle for ${project.shortName}.`}
        autoPlay
        showControls
        numberLabel={project.number}
        shortName={project.shortName}
      />

      {/* Header row — title + summary, click to expand */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${project.id}-panel`}
        className="mt-6 grid w-full grid-cols-12 items-start gap-6 text-left transition-colors hover:bg-[color-mix(in_oklab,var(--ink)_3%,transparent)]"
      >
        {/* Numeral */}
        <div className="col-span-2">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              lineHeight: 1,
              color: open ? "var(--accent)" : "var(--ink)",
              letterSpacing: "-0.04em",
              transition: "color var(--dur-base) var(--ease-out)",
            }}
          >
            {project.number}
          </span>
        </div>

        {/* Title + summary */}
        <div className="col-span-7">
          <div
            className="mb-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            {project.tagline}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-h2)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            {project.name}
          </h3>
          <p
            className="mt-3 max-w-[60ch]"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--ink-2)",
            }}
          >
            {project.summary}
          </p>
        </div>

        {/* Meta column */}
        <div
          className="col-span-3 flex flex-col items-end gap-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-2)",
          }}
        >
          <span>{project.date}</span>
          <span style={{ color: "var(--ink-3)" }}>
            {open ? "Hide details" : "Read more"}
          </span>
          <span aria-hidden style={{ fontSize: "1.5rem", lineHeight: 1 }}>
            {open ? "—" : "+"}
          </span>
        </div>
      </button>

      {/* Expanded panel */}
      {open && (
        <div
          id={`${project.id}-panel`}
          className="mt-8 grid grid-cols-12 gap-6"
        >
          {/* Highlights — left 6 */}
          <div className="col-span-12 md:col-span-6">
            <div
              className="mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-micro)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              Highlights
            </div>
            <ul className="space-y-3">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-3 border-l-2 pl-3"
                  style={{ borderColor: "var(--ink)", color: "var(--ink-2)" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-micro)",
                      color: "var(--ink-3)",
                      paddingTop: 4,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <div
                className="mb-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-micro)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <StackChip key={s}>{s}</StackChip>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border px-3 py-2"
                  style={{
                    borderColor: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--fs-meta)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    borderRadius: 0,
                  }}
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* R3F scene + image strip — right 6 */}
          <div className="col-span-12 space-y-4 md:col-span-6">
            {project.demoSrc && (
              <>
                <SizzleVideo
                  src={project.demoSrc}
                  label={`Live demo for ${project.shortName}.`}
                  autoPlay
                  showControls
                  numberLabel={`${project.number}-demo`}
                  shortName={`${project.shortName} · LIVE DEMO`}
                />
                {project.demoCaption && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--fs-micro)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      lineHeight: 1.5,
                    }}
                  >
                    {project.demoCaption}
                  </p>
                )}
              </>
            )}

            <div
              className="aspect-[4/3] w-full border"
              style={{ borderColor: "var(--rule)" }}
            >
              <SceneFor id={project.scene} />
            </div>
            <div
              className="flex items-baseline justify-between"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-micro)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              <span>
                fig. {project.number} — {project.shortName} · R3F scene
              </span>
              <span>WebGL · auto-orbit</span>
            </div>

            {project.images.length > 0 && (
              <ImageStrip
                images={project.images}
                projectShortName={project.shortName}
              />
            )}
          </div>
        </div>
      )}
    </article>
  );
}
