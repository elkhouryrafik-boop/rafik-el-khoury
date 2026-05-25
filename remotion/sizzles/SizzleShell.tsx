import * as React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";

export const SizzleShell: React.FC<{
  number: string;
  project: string;
  tagline: string;
  children: React.ReactNode;
}> = ({ number, project, tagline, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const headerFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const progress = Math.min(1, frame / Math.max(1, durationInFrames - 1));
  const marqueeOffset = (frame * 6) % 1600;

  return (
    <AbsoluteFill style={{ background: COLORS.paper, padding: 72 }}>
      <div
        style={{
          opacity: headerFade,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingBottom: 16,
          borderBottom: `1px solid ${COLORS.rule}`,
          fontFamily: FONT_MONO,
          fontSize: 16,
          letterSpacing: 3,
          color: COLORS.ink3,
          textTransform: "uppercase",
        }}
      >
        <span>fig. {number} — {project}</span>
        <span>{tagline}</span>
      </div>

      <div style={{ position: "relative", flex: 1, marginTop: 32 }}>{children}</div>

      {/* Scrolling marquee strip — continuous motion */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: 28,
          borderTop: `1px solid ${COLORS.rule}`,
          borderBottom: `1px solid ${COLORS.rule}`,
          marginTop: 16,
          opacity: headerFade,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 4,
            left: -marqueeOffset,
            whiteSpace: "nowrap",
            fontFamily: FONT_MONO,
            fontSize: 14,
            letterSpacing: 4,
            color: COLORS.ink3,
            textTransform: "uppercase",
          }}
        >
          {`◉ ${project} · ${tagline} · `.repeat(20)}
        </div>
      </div>

      {/* Progress bar — guaranteed per-frame motion */}
      <div
        style={{
          position: "relative",
          height: 4,
          background: COLORS.rule,
          marginTop: 8,
          opacity: headerFade,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${progress * 100}%`,
            background: COLORS.accent,
          }}
        />
      </div>

      <div
        style={{
          opacity: headerFade,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingTop: 12,
          fontFamily: FONT_MONO,
          fontSize: 16,
          letterSpacing: 3,
          color: COLORS.ink3,
          textTransform: "uppercase",
        }}
      >
        <span>RAFIK EL KHOURY · PERSONAL SITE 2026</span>
        <span style={{ color: COLORS.accent }}>
          ◉ ACTIVE · {String(frame).padStart(3, "0")} / {String(durationInFrames).padStart(3, "0")}
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const Numeral: React.FC<{ value: string; x?: number; y?: number }> = ({ value, x = 0, y = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontFamily: FONT_DISPLAY,
      fontSize: 280,
      lineHeight: 1,
      letterSpacing: -12,
      color: COLORS.ink,
    }}
  >
    {value}
  </div>
);
