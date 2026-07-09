export function HeroPlate() {
  return (
    <figure
      className="relative w-full overflow-hidden border"
      style={{ borderColor: "var(--rule)", aspectRatio: "16 / 9" }}
    >
      <video
        src="/videos/hero-motion.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Motion study — brutalist concrete architecture at golden hour with vermilion contour annotations drifting across the surfaces."
      />

      <figcaption
        className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-4"
        style={{
          background: "color-mix(in oklab, var(--paper) 78%, transparent)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-2)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <span>fig. 00 — motion study · higgsfield / seedance 2.0</span>
        <span style={{ color: "var(--ink-3)" }}>8 s · muted loop</span>
      </figcaption>
    </figure>
  );
}
