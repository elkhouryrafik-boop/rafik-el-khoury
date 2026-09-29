export function Footer() {
  return (
    <footer className="mx-auto max-w-[1440px] px-6 pb-12 md:px-10 lg:px-14">
      <div
        className="flex flex-wrap items-baseline justify-between gap-4 border-t pt-6"
        style={{
          borderColor: "var(--rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
        }}
      >
        <span>© Rafik El Khoury · 2026</span>
        <span>Source: github.com/elkhouryrafik-boop/rafik-el-khoury</span>
      </div>
    </footer>
  );
}
