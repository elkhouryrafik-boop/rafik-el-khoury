"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { MetricChip } from "./MetricChip";
import { PipelineDiagram } from "./PipelineDiagram";
import { SceneFor } from "./scenes/SceneFor";
import { SizzleVideo } from "./SizzleVideo";

const mono = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--fs-micro)",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

function ProofImage({
  img,
  index,
  total,
  large = false,
  compact = false,
}: {
  img: { src: string; caption: string };
  index: number;
  total: number;
  large?: boolean;
  compact?: boolean;
}) {
  return (
    <a href={img.src} target="_blank" rel="noreferrer" className="group block">
      <div
        className="relative w-full overflow-hidden border"
        style={{ borderColor: "var(--rule)", aspectRatio: "16 / 10", background: "var(--paper)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.caption}
          loading="lazy"
          className={`absolute inset-0 h-full w-full ${large ? "object-contain" : "object-cover"} transition-opacity group-hover:opacity-85`}
        />
      </div>
      <div className={compact ? "mt-1.5 hidden sm:block" : "mt-1.5"} style={{ ...mono, color: "var(--ink-3)", letterSpacing: "0.1em", lineHeight: 1.4 }}>
        fig. {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")} · {img.caption}
      </div>
    </a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const hasExtra = Boolean(project.demoSrc || project.scene);
  const hasLead = Boolean(project.sizzleSrc || project.diagram);
  const imgs = project.images.slice(0, 3);
  const leadImage = !hasLead && !project.gridOnly ? imgs[0] : undefined;
  const gridImages = leadImage ? imgs.slice(1) : imgs;
  const gridOffset = leadImage ? 1 : 0;

  return (
    <article className="grid grid-cols-12 gap-6 border-t py-12 lg:gap-10" style={{ borderColor: "var(--rule)" }}>
      {/* Text column */}
      <div className="col-span-12 flex flex-col lg:col-span-5">
        <div className="flex items-baseline justify-between gap-4" style={{ ...mono, color: "var(--ink-3)" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              textTransform: "none",
            }}
          >
            {project.number}
          </span>
          <span className="text-right">
            {project.date} · <span style={{ color: "var(--accent)" }}>{project.status}</span>
          </span>
        </div>

        <div className="mt-5" style={{ ...mono, color: "var(--ink-3)", letterSpacing: "0.18em" }}>
          {project.tagline}
        </div>
        <h3
          className="mt-2"
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
        <p className="mt-3 max-w-[48ch]" style={{ fontFamily: "var(--font-body)", color: "var(--ink-2)" }}>
          {project.problem}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {project.metrics.map((m) => (
            <MetricChip key={m.label} metric={m} />
          ))}
        </div>

        <p className="mt-5" style={{ ...mono, color: "var(--ink-2)", letterSpacing: "0.1em", lineHeight: 1.6 }}>
          <span style={{ color: "var(--ink-3)" }}>Stack: </span>
          {project.stack.join(" · ")}
        </p>

        {(project.links.length > 0 || hasExtra) && (
          <div className="mt-5 flex flex-wrap gap-2">
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
            {hasExtra && (
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={`${project.id}-extra`}
                className="inline-flex items-center gap-2 border px-3 py-2"
                style={{
                  borderColor: "var(--ink)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--fs-meta)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: open ? "var(--ink)" : "transparent",
                  color: open ? "var(--paper)" : "var(--ink)",
                  borderRadius: 0,
                }}
              >
                {project.demoSrc ? "Live demo" : "3D view"} <span aria-hidden>{open ? "−" : "+"}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Proof column */}
      <div className="col-span-12 flex flex-col gap-4 lg:col-span-7">
        {project.sizzleSrc && (
          <SizzleVideo
            src={project.sizzleSrc}
            label={`Video summary of ${project.shortName}.`}
            autoPlay
            showControls
            numberLabel={project.number}
            shortName={project.shortName}
          />
        )}
        {!project.sizzleSrc && project.diagram && (
          <PipelineDiagram id={project.diagram} number={project.number} />
        )}
        {leadImage && <ProofImage img={leadImage} index={0} total={imgs.length} large />}

        {gridImages.length > 0 && (
          <div className={`grid gap-3 ${gridImages.length === 1 ? "grid-cols-1" : gridImages.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {gridImages.map((img, i) => (
              <ProofImage key={img.src} img={img} index={i + gridOffset} total={imgs.length} large={gridImages.length === 1} compact={gridImages.length === 3} />
            ))}
          </div>
        )}

        {open && hasExtra && (
          <div id={`${project.id}-extra`} className="flex flex-col gap-4">
            {project.demoSrc && (
              <>
                <SizzleVideo
                  src={project.demoSrc}
                  label={`Live demo for ${project.shortName}.`}
                  autoPlay
                  showControls
                  numberLabel={`${project.number}-demo`}
                  shortName={`${project.shortName} · live demo`}
                />
                {project.demoCaption && (
                  <p style={{ ...mono, color: "var(--ink-3)", lineHeight: 1.5 }}>{project.demoCaption}</p>
                )}
              </>
            )}
            {project.scene && (
              <div className="aspect-[4/3] w-full border" style={{ borderColor: "var(--rule)" }}>
                <SceneFor id={project.scene} />
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
