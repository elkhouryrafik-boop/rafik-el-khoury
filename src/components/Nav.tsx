"use client";

import { useEffect, useState } from "react";
import { Monogram } from "./Monogram";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "earlier", label: "Earlier" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", ...sections.map((s) => s.id), "colophon"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300`}
        style={{
          background: scrolled
            ? "color-mix(in oklab, var(--paper) 80%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--rule)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-14">
          <a href="#top" className="no-underline">
            <Monogram size={28} />
          </a>

          <nav
            aria-label="Sections"
            className="hidden items-center gap-6 md:flex"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {sections.map((s, i) => {
              const active = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="transition-colors"
                  style={{ color: active ? "var(--accent)" : "var(--ink)" }}
                >
                  <span style={{ color: "var(--ink-3)" }}>0{i + 1}.</span>{" "}
                  {s.label}
                </a>
              );
            })}
          </nav>

          <a
            href="https://cal.com/rafik-el-khoury-6vwa4v"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border px-3 py-2 transition-colors"
            style={{
              borderColor: "var(--ink)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-micro)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "var(--accent)",
              color: "var(--accent-ink)",
              borderRadius: 0,
            }}
          >
            Book a call <span aria-hidden>↗</span>
          </a>
        </div>
      </header>

      {/* Mobile section index — bottom-pinned, brutalist [01][02][03][04] */}
      <nav
        aria-label="Sections (mobile)"
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{
          background: "color-mix(in oklab, var(--paper) 92%, transparent)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid var(--rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-micro)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <ul className="grid grid-cols-4">
          {sections.map((s, i) => {
            const active = activeId === s.id;
            return (
              <li key={s.id} className="contents">
                <a
                  href={`#${s.id}`}
                  className="flex flex-col items-center justify-center gap-1 px-2 py-3"
                  style={{
                    color: active ? "var(--accent)" : "var(--ink)",
                    borderLeft: i === 0 ? "none" : "1px solid var(--rule)",
                    minHeight: 56,
                  }}
                >
                  <span style={{ color: "var(--ink-3)" }}>0{i + 1}</span>
                  <span>{s.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
