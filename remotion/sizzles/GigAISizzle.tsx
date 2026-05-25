import * as React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { SizzleShell, Numeral } from "./SizzleShell";

const NODES = [
  { x: 200, y: 460, label: "transcript" },
  { x: 500, y: 380, label: "normalise" },
  { x: 800, y: 460, label: "rag" },
  { x: 1100, y: 380, label: "propose" },
  { x: 1400, y: 460, label: "rank" },
];

const TRANSCRIPT_LINES = [
  "PM: We swapped the rebar spec to grade-500.",
  "ENG: That changes column #C12 — flag rerun.",
  "→ EVENT  spec.change(member=C12, prop=rebar)",
  "→ RAG    ACI-318 §10.5.1, ProjectMemo-04",
  "→ PROPOSE  revise reinforcement schedule",
  "→ RANK    confidence 0.87 · approve?",
];

export const GigAISizzle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opt = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // 300 frames @ 30 fps = 10s
  //   0–15   title slam
  //  15–195  pipeline dot traverses 5 nodes (45 frames between each = 1.5s/hop)
  //  30–210  transcript scrolls in (one line every ~30 frames)
  // 195–235  confidence counter ticks 0 → 85
  // 235–300  hold w/ blinking active dot

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 200 } });
  const flow = interpolate(frame, [15, 195], [0, NODES.length - 1], opt);
  const idxRaw = Math.floor(flow);
  const idx = Math.max(0, Math.min(idxRaw, NODES.length - 1));
  const idxNext = Math.max(0, Math.min(idxRaw + 1, NODES.length - 1));
  const local = Math.max(0, Math.min(1, flow - idxRaw));
  const a = NODES[idx];
  const b = NODES[idxNext];
  const dotX = a.x + (b.x - a.x) * local;
  const dotY = a.y + (b.y - a.y) * local;

  const counter = Math.round(interpolate(frame, [195, 235], [0, 85], opt));
  const metricsFade = interpolate(frame, [195, 230], [0, 1], opt);
  const blink = (frame % 20) < 10 ? 1 : 0.3;

  return (
    <SizzleShell number="02" project="GigAI" tagline="Material change coordinator for PMs">
      <Numeral value="02" x={0} y={0} />

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
        Audio → events → RAG → ranked PM actions.
      </h1>

      {/* Transcript lines scrolling in over the dot trail */}
      <div
        style={{
          position: "absolute",
          left: 360,
          top: 200,
          width: 720,
          fontFamily: FONT_MONO,
          fontSize: 18,
          lineHeight: 1.45,
          color: COLORS.ink2,
        }}
      >
        {TRANSCRIPT_LINES.map((line, i) => {
          const start = 30 + i * 28;
          const visible = interpolate(frame, [start, start + 12], [0, 1], opt);
          const accent = line.startsWith("→");
          return (
            <div
              key={i}
              style={{
                opacity: visible,
                transform: `translateY(${(1 - visible) * 6}px)`,
                color: accent ? COLORS.accent : COLORS.ink2,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      <svg
        viewBox="0 0 1600 600"
        style={{ position: "absolute", left: 0, top: 470, width: "100%", height: 520 }}
      >
        {NODES.map((n, i) => {
          const active = i === idx || (i === idxNext && local > 0.5);
          return (
            <g key={i}>
              {i < NODES.length - 1 && (
                <line
                  x1={n.x}
                  y1={n.y}
                  x2={NODES[i + 1].x}
                  y2={NODES[i + 1].y}
                  stroke={i < idx ? COLORS.accent : COLORS.ink}
                  strokeOpacity={i < idx ? 0.9 : 0.4}
                  strokeWidth={i < idx ? 2 : 1}
                  strokeDasharray={i < idx ? "0" : "6 6"}
                />
              )}
              <rect
                x={n.x - 36}
                y={n.y - 36}
                width={72}
                height={72}
                fill={active ? COLORS.accent : "none"}
                stroke={active ? COLORS.accent : COLORS.ink}
                strokeWidth={2}
              />
              <text
                x={n.x}
                y={n.y + 96}
                textAnchor="middle"
                fontFamily={FONT_MONO}
                fontSize={16}
                fill={i <= idx ? COLORS.ink : COLORS.ink3}
                letterSpacing={3}
              >
                {n.label.toUpperCase()}
              </text>
            </g>
          );
        })}
        <circle cx={dotX} cy={dotY} r={16} fill={COLORS.accent} />
        <circle cx={dotX} cy={dotY} r={28} fill="none" stroke={COLORS.accent} strokeWidth={1} opacity={blink} />
      </svg>

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 180,
          width: 440,
          opacity: metricsFade,
          fontFamily: FONT_MONO,
          fontSize: 18,
          lineHeight: 1.55,
          color: COLORS.ink2,
        }}
      >
        <div style={{ letterSpacing: 4, color: COLORS.ink3, marginBottom: 12 }}>
          4-FACTOR CONFIDENCE SCORE
        </div>
        <div style={{ fontSize: 120, fontFamily: FONT_DISPLAY, color: COLORS.accent, lineHeight: 1, letterSpacing: -6 }}>
          {counter}%
        </div>
        <div style={{ marginTop: 16, color: COLORS.ink }}>
          Demo proposals approved without rework.
        </div>
        <div style={{ marginTop: 8, color: COLORS.ink3, fontSize: 14, letterSpacing: 2 }}>
          REAL-TIME SSE DASHBOARD
        </div>
      </div>
    </SizzleShell>
  );
};
