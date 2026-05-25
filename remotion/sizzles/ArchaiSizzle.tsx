import * as React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { SizzleShell, Numeral } from "./SizzleShell";

const RULES = [
  { code: "BCN-04-A", text: "FAR ≤ 3.6", pass: true },
  { code: "BCN-12-B", text: "Setback ≥ 6 m", pass: true },
  { code: "BCN-21-D", text: "Height ≤ 24 m", pass: false },
  { code: "BCN-30-A", text: "Footprint ratio ≤ 0.55", pass: true },
  { code: "BCN-44-C", text: "Daylight factor ≥ 2.0", pass: true },
];

export const ArchaiSizzle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opt = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // 300 frames @ 30 fps = 10s
  //   0–15   title spring
  //  15–60   wireframe building draws in
  //  60–180  rules stamp in (24 frames each = ~0.8s)
  // 180–210  violation flash
  // 210–270  scan sweep + final stats
  // 270–300  hold

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 200 } });
  const buildingFade = interpolate(frame, [15, 60], [0, 1], opt);
  const rulesProgress = interpolate(frame, [60, 180], [0, RULES.length], opt);
  const violationFlash = interpolate(frame, [180, 200, 230], [0, 1, 0.4], opt);

  const passCount = RULES.filter((r, i) => r.pass && i < rulesProgress).length;
  const failCount = RULES.filter((r, i) => !r.pass && i < rulesProgress).length;

  const scanY = interpolate(frame, [60, 180], [80, 500], opt);

  return (
    <SizzleShell number="03" project="ARCHAI" tagline="Compliance checker — Rhino → RAG → pass/fail">
      <Numeral value="03" x={0} y={0} />

      <h1
        style={{
          position: "absolute",
          left: 360,
          top: 40,
          maxWidth: 1000,
          fontFamily: FONT_DISPLAY,
          fontSize: 80,
          lineHeight: 1.0,
          letterSpacing: -3,
          color: COLORS.ink,
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * 20}px)`,
        }}
      >
        Rhino geometry. Vector-store rules. Article-cited verdict.
      </h1>

      {/* Wireframe building w/ scanning line */}
      <svg
        viewBox="0 0 700 600"
        style={{ position: "absolute", left: 60, top: 280, width: 480, height: 480, opacity: buildingFade }}
      >
        <g stroke={COLORS.ink} strokeWidth={2} fill="none">
          <rect x={120} y={80} width={420} height={420} />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={120}
              x2={540}
              y1={80 + i * 52}
              y2={80 + i * 52}
              stroke={i === 5 ? COLORS.accent : COLORS.ink}
              strokeWidth={i === 5 ? 3 : 1.5}
            />
          ))}
          <line x1={120} y1={80} x2={210} y2={20} />
          <line x1={540} y1={80} x2={630} y2={20} />
          <line x1={540} y1={500} x2={630} y2={440} />
          <line x1={210} y1={20} x2={630} y2={20} />
          <line x1={630} y1={20} x2={630} y2={440} />
        </g>

        {/* Scanning sweep line during rule check */}
        {frame >= 60 && frame <= 180 && (
          <line
            x1={120}
            x2={540}
            y1={scanY}
            y2={scanY}
            stroke={COLORS.accent}
            strokeWidth={2}
            strokeOpacity={0.8}
          />
        )}

        <circle cx={500} cy={342} r={12} fill={COLORS.accent} opacity={violationFlash} />
        <line x1={500} y1={300} x2={500} y2={342} stroke={COLORS.accent} opacity={violationFlash} />
        <line x1={500} y1={342} x2={620} y2={342} stroke={COLORS.accent} strokeDasharray="4 4" opacity={violationFlash} />
        <text
          x={628}
          y={345}
          fontFamily={FONT_MONO}
          fontSize={14}
          fill={COLORS.accent}
          letterSpacing={2}
          opacity={violationFlash}
        >
          BCN-21-D VIOLATION
        </text>
      </svg>

      {/* Live pass/fail tally */}
      <div
        style={{
          position: "absolute",
          left: 60,
          bottom: 0,
          fontFamily: FONT_MONO,
          fontSize: 18,
          color: COLORS.ink2,
          opacity: buildingFade,
        }}
      >
        <div style={{ letterSpacing: 4, color: COLORS.ink3 }}>LIVE TALLY</div>
        <div style={{ marginTop: 8, display: "flex", gap: 24 }}>
          <div>
            <span style={{ color: COLORS.ink3, letterSpacing: 2 }}>PASS</span>{" "}
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: COLORS.ink }}>{passCount}</span>
          </div>
          <div>
            <span style={{ color: COLORS.ink3, letterSpacing: 2 }}>FAIL</span>{" "}
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 36, color: COLORS.accent }}>{failCount}</span>
          </div>
        </div>
      </div>

      {/* Rule list */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 280,
          width: 700,
          fontFamily: FONT_MONO,
          fontSize: 22,
          color: COLORS.ink2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 80px",
            gap: 16,
            paddingBottom: 12,
            borderBottom: `1px solid ${COLORS.rule}`,
            color: COLORS.ink3,
            letterSpacing: 3,
            fontSize: 16,
          }}
        >
          <span>CODE</span>
          <span>RULE</span>
          <span style={{ textAlign: "right" }}>STATUS</span>
        </div>
        {RULES.map((r, i) => {
          const visible = i < rulesProgress;
          const partial = interpolate(rulesProgress - i, [0, 1], [0, 1], opt);
          return (
            <div
              key={r.code}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 80px",
                gap: 16,
                padding: "14px 0",
                borderBottom: `1px solid ${COLORS.rule}`,
                opacity: visible ? 1 : 0,
                transform: visible ? `translateY(0)` : `translateY(8px)`,
                transition: "opacity 200ms, transform 200ms",
              }}
            >
              <span style={{ color: COLORS.ink3 }}>{r.code}</span>
              <span style={{ opacity: partial }}>{r.text}</span>
              <span
                style={{
                  textAlign: "right",
                  color: r.pass ? COLORS.ink : COLORS.accent,
                  fontFamily: FONT_DISPLAY,
                  letterSpacing: 2,
                }}
              >
                {r.pass ? "PASS" : "FAIL"}
              </span>
            </div>
          );
        })}
      </div>
    </SizzleShell>
  );
};
