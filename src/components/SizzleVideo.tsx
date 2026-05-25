"use client";

import { useEffect, useRef, useState } from "react";

export function SizzleVideo({
  src,
  label,
  autoPlay = true,
  showControls = true,
  numberLabel,
  shortName,
}: {
  src: string;
  label: string;
  autoPlay?: boolean;
  showControls?: boolean;
  numberLabel?: string;
  shortName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onError = () => setMissing(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("error", onError);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("error", onError);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  // Auto-play when the video scrolls into view; pause when out.
  useEffect(() => {
    if (!autoPlay) return;
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [autoPlay]);

  if (missing) return null;

  return (
    <figure
      className="relative w-full overflow-hidden border"
      style={{ borderColor: "var(--ink)", aspectRatio: "16 / 9" }}
    >
      <video
        ref={ref}
        src={src}
        controls={showControls}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="block h-full w-full"
        style={{ objectFit: "cover", background: "var(--paper)" }}
      />
      <figcaption
        className="pointer-events-none absolute inset-x-0 top-0 flex items-baseline justify-between gap-4 p-3"
        style={{
          background: "color-mix(in oklab, var(--paper) 82%, transparent)",
          borderBottom: "1px solid var(--rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-2)",
        }}
      >
        <span>
          {numberLabel ? `fig. ${numberLabel}` : "Sizzle"} ·{" "}
          {shortName ?? "Remotion"}
        </span>
        <span style={{ color: playing ? "var(--accent)" : "var(--ink-3)" }}>
          {playing ? "◉ playing · muted loop" : "◉ ready"}
        </span>
      </figcaption>
    </figure>
  );
}
