"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || reduced) {
      setEnabled(false);
      document.body.style.cursor = "auto";
      return;
    }

    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0;

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      const isInteractive =
        !!t &&
        (t.closest("a, button, [role='button'], summary, input, textarea, select") !==
          null);
      setHovering(isInteractive);
    }

    function tick() {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className="flex items-center justify-center transition-all duration-150"
        style={{
          width: hovering ? 36 : 14,
          height: hovering ? 36 : 14,
          border: `1px solid var(--paper)`,
          borderRadius: hovering ? "9999px" : "0",
          background: "transparent",
        }}
      >
        {!hovering && (
          <span
            style={{
              width: 1,
              height: 14,
              background: "var(--paper)",
              position: "absolute",
            }}
          />
        )}
        {!hovering && (
          <span
            style={{
              width: 14,
              height: 1,
              background: "var(--paper)",
              position: "absolute",
            }}
          />
        )}
      </div>
    </div>
  );
}
