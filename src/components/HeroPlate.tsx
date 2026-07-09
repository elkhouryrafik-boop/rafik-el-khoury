export function HeroPlate() {
  return (
    <figure
      className="relative w-full overflow-hidden border"
      style={{ borderColor: "var(--rule)", aspectRatio: "16 / 9" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/ushade-system-diagram.png"
        alt="U-Shade system diagram — user brief and floor layout flow through an LLM parser and site geometry into climate analysis (Infrared.city API) and crowd simulation (JuPedSim), then an ILP/MCLP placer with UMATS upcycled-material selection, ending in the architect report."
        className="absolute inset-0 h-full w-full object-cover"
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
        <span>fig. 00 — u-shade system diagram · inputs → analysis → place &amp; clad → output</span>
        <span style={{ color: "var(--ink-3)" }}>Project 01 · 2026</span>
      </figcaption>
    </figure>
  );
}
