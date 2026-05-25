"use client";

import { useEffect, useRef, useState } from "react";

export function IntroReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onError = () => setMissing(true);
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, []);

  if (missing) {
    return (
      <div
        className="flex items-center justify-center border"
        style={{
          borderColor: "var(--rule)",
          aspectRatio: "16 / 9",
          background: "var(--ink)",
          color: "var(--paper)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Run npm run remotion:render
      </div>
    );
  }

  return (
    <video
      ref={ref}
      src="/videos/intro-reel.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Intro reel — Remotion-rendered 5-second loop. REK monogram draws in, name fades up."
      className="block w-full border"
      style={{ borderColor: "var(--rule)", aspectRatio: "16 / 9" }}
    />
  );
}
