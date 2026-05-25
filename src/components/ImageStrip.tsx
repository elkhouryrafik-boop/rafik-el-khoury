"use client";

import { useState } from "react";

export function ImageStrip({
  images,
  projectShortName,
}: {
  images: { src: string; caption: string }[];
  projectShortName: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const current = images[active];

  return (
    <div>
      <figure
        className="relative w-full border"
        style={{ borderColor: "var(--rule)", aspectRatio: "16 / 10", background: "var(--paper)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={`${projectShortName} — ${current.caption}`}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ background: "var(--paper)" }}
        />
        <figcaption
          className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-3"
          style={{
            background: "color-mix(in oklab, var(--paper) 80%, transparent)",
            borderTop: "1px solid var(--rule)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-micro)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-2)",
          }}
        >
          <span>
            fig. {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            {" — "}
            {current.caption}
          </span>
        </figcaption>
      </figure>

      <div className="mt-2 grid grid-cols-5 gap-1">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-label={`Show ${img.caption}`}
            aria-pressed={i === active}
            className="relative aspect-[16/10] overflow-hidden border"
            style={{
              borderColor: i === active ? "var(--ink)" : "var(--rule)",
              borderRadius: 0,
              padding: 0,
              cursor: "pointer",
              background: "var(--paper)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === active ? 1 : 0.55 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
