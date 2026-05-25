import * as React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "./theme";

export const IntroReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const monoFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const rDraw = spring({ frame: frame - 15, fps, config: { damping: 18 } });
  const nameY = interpolate(frame, [40, 80], [40, 0], { extrapolateRight: "clamp" });
  const nameFade = interpolate(frame, [40, 80], [0, 1], { extrapolateRight: "clamp" });
  const taglineFade = interpolate(frame, [85, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.paper, padding: 96 }}>
      <div
        style={{
          opacity: monoFade,
          fontFamily: FONT_MONO,
          fontSize: 18,
          letterSpacing: 4,
          color: COLORS.ink3,
          textTransform: "uppercase",
        }}
      >
        — Personal site / 2026 .......................................................
      </div>

      <div
        style={{
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            border: `${4 * rDraw}px solid ${COLORS.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${0.6 + rDraw * 0.4})`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 80,
              color: COLORS.ink,
              opacity: rDraw,
            }}
          >
            R
          </span>
        </div>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 32,
            letterSpacing: 6,
            color: COLORS.ink,
            opacity: rDraw,
          }}
        >
          EL KHOURY
        </span>
      </div>

      <h1
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 180,
          lineHeight: 1.0,
          letterSpacing: -6,
          color: COLORS.ink,
          marginTop: 80,
          transform: `translateY(${nameY}px)`,
          opacity: nameFade,
        }}
      >
        AI Engineer
        <br />
        for the Built
        <br />
        Environment.
      </h1>

      <div
        style={{
          marginTop: 40,
          fontFamily: FONT_MONO,
          fontSize: 22,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: COLORS.accent,
          opacity: taglineFade,
        }}
      >
        ◉ Personal site · github.com/elkhouryrafik-boop
      </div>
    </AbsoluteFill>
  );
};
