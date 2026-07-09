export function HeroPlate() {
  return (
    <figure
      className="relative w-full overflow-hidden border"
      style={{ borderColor: "var(--rule)", aspectRatio: "16 / 9" }}
    >
      <video
        src="/videos/ushade-marketing-30s.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label="U-Shade marketing demo — the full product run compressed to thirty seconds: brief in, heat and crowd simulation, shade placement, material plan out."
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
        <span>fig. 00 — u-shade demo · full run in 30 s</span>
        <span style={{ color: "var(--ink-3)" }}>muted loop · project 01</span>
      </figcaption>
    </figure>
  );
}
