import * as React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../theme";
import { SizzleShell, Numeral } from "./SizzleShell";

type HeatSpot = {
  x: number;
  y: number;
  intensity: number;
};

const HEAT_SPOTS: HeatSpot[] = [
  { x: 220, y: 200, intensity: 0.55 },
  { x: 340, y: 320, intensity: 0.7 },
  { x: 480, y: 180, intensity: 0.95 }, // hero
  { x: 620, y: 260, intensity: 0.6 },
  { x: 760, y: 340, intensity: 0.5 },
  { x: 880, y: 220, intensity: 0.65 },
  { x: 980, y: 300, intensity: 0.5 },
];

const HERO_SPOT = HEAT_SPOTS[2];

const SHELTERS = [
  { x: 460, y: 165, w: 24, h: 28 },
  { x: 492, y: 168, w: 22, h: 26 },
  { x: 478, y: 195, w: 28, h: 24 },
  { x: 510, y: 192, w: 20, h: 22 },
  { x: 444, y: 188, w: 22, h: 22 },
];

function EixampleGrid({ opacity, scan }: { opacity: number; scan: number }) {
  const cells: React.ReactNode[] = [];
  const cols = 12;
  const rows = 7;
  const cellW = 90;
  const cellH = 60;
  const ox = 110;
  const oy = 100;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * cellW + (r % 2 === 0 ? 0 : 20);
      const y = oy + r * cellH;
      const cellIdx = r * cols + c;
      const cellOp = Math.min(1, Math.max(0, scan * (cols * rows) - cellIdx));
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={x}
          y={y}
          width={cellW - 14}
          height={cellH - 14}
          fill="none"
          stroke={COLORS.ink}
          strokeOpacity={0.45 * opacity * cellOp}
          strokeWidth={1}
        />
      );
    }
  }
  return <g>{cells}</g>;
}

function Coastline({ opacity }: { opacity: number }) {
  return (
    <path
      d="M 0 540 L 0 460 Q 240 480 480 470 T 1100 440 L 1100 540 Z"
      fill={COLORS.ink}
      fillOpacity={0.06 * opacity}
      stroke={COLORS.ink}
      strokeOpacity={0.3 * opacity}
      strokeWidth={1}
    />
  );
}

function HeatBlob({
  spot,
  progress,
  highlight,
}: {
  spot: HeatSpot;
  progress: number;
  highlight: number;
}) {
  const radius = spot.intensity * 90 * progress;
  return (
    <g>
      <circle cx={spot.x} cy={spot.y} r={radius * 1.6} fill={COLORS.accent} opacity={0.12 * spot.intensity * progress} />
      <circle cx={spot.x} cy={spot.y} r={radius} fill={COLORS.accent} opacity={0.55 * spot.intensity * progress} />
      <circle cx={spot.x} cy={spot.y} r={radius * 0.4} fill={COLORS.accent} opacity={0.95 * spot.intensity * progress} />
      {spot === HERO_SPOT && highlight > 0 && (
        <circle
          cx={spot.x}
          cy={spot.y}
          r={radius * 1.05 + highlight * 24}
          fill="none"
          stroke={COLORS.ink}
          strokeWidth={1.5}
          opacity={highlight}
        />
      )}
    </g>
  );
}

function Crosshair({ x, y, opacity, pulse }: { x: number; y: number; opacity: number; pulse: number }) {
  const r = 28 + Math.sin(pulse) * 4;
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={r} fill="none" stroke={COLORS.ink} strokeWidth={1.5} />
      <line x1={x - 40} y1={y} x2={x - 12} y2={y} stroke={COLORS.ink} strokeWidth={1.5} />
      <line x1={x + 12} y1={y} x2={x + 40} y2={y} stroke={COLORS.ink} strokeWidth={1.5} />
      <line x1={x} y1={y - 40} x2={x} y2={y - 12} stroke={COLORS.ink} strokeWidth={1.5} />
      <line x1={x} y1={y + 12} x2={x} y2={y + 40} stroke={COLORS.ink} strokeWidth={1.5} />
    </g>
  );
}

function PlacaPolygon({ opacity }: { opacity: number }) {
  return (
    <polygon
      points="430,150 540,148 552,210 470,222 422,200"
      fill={COLORS.paper}
      stroke={COLORS.ink}
      strokeWidth={2}
      opacity={opacity}
    />
  );
}

function ShelterFootprint({ s, progress }: { s: (typeof SHELTERS)[number]; progress: number }) {
  if (progress <= 0) return null;
  const grow = Math.min(1, progress);
  const tilt = (s.x + s.y) % 11 - 5;
  return (
    <g transform={`rotate(${tilt} ${s.x + s.w / 2} ${s.y + s.h / 2})`}>
      <rect
        x={s.x}
        y={s.y + s.h * (1 - grow)}
        width={s.w}
        height={s.h * grow}
        fill="none"
        stroke={COLORS.ink}
        strokeWidth={1.5}
      />
      <line x1={s.x} y1={s.y + s.h * (1 - grow)} x2={s.x + s.w} y2={s.y + s.h} stroke={COLORS.ink} strokeWidth={1} />
      <line x1={s.x + s.w} y1={s.y + s.h * (1 - grow)} x2={s.x} y2={s.y + s.h} stroke={COLORS.ink} strokeWidth={1} />
    </g>
  );
}

export const NatureGooddestSizzle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opt = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

  // 300 frames @ 30 fps = 10s
  //   0–15   title slam in (spring)
  //  15–60   grid + coastline scan-draw
  //  60–110  heat blobs bloom
  // 110–140  crosshair lock + label
  // 140–215  shelters generate fast (5 in 75 frames)
  // 215–260  metrics counter ticks up
  // 260–300  hold w/ scanning sweep

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 200 } });
  const gridFade = interpolate(frame, [15, 35], [0, 1], opt);
  const gridScan = interpolate(frame, [15, 60], [0, 1], opt);
  const heatProgress = interpolate(frame, [60, 110], [0, 1], opt);
  const heroHighlight = interpolate(frame, [100, 140, 200, 300], [0, 1, 1, 0.5], opt);
  const crosshairFade = interpolate(frame, [110, 140], [0, 1], opt);
  const placaFade = interpolate(frame, [130, 160], [0, 1], opt);
  const shelterProgress = interpolate(frame, [140, 215], [0, SHELTERS.length], opt);
  const metricsFade = interpolate(frame, [215, 245], [0, 1], opt);

  const tmrtCounter = Math.round(interpolate(frame, [215, 260], [0, -12], opt));
  const shadedCounter = Math.round(interpolate(frame, [215, 260], [0, 38], opt));

  const stage =
    frame < 60 ? "OPEN DATA BCN INTAKE"
      : frame < 110 ? "HEAT-VULNERABILITY ASSESSMENT"
      : frame < 140 ? "TARGET LOCK"
      : frame < 215 ? "SHELTER GENERATION (NSGA-II)"
      : "FIELD-VALIDATED OUTPUT";

  const titleX = (1 - titleSpring) * -60;

  return (
    <SizzleShell number="01" project="NatureGooddest / COOLSTOCK" tagline="Regenerative-design platform">
      <Numeral value="01" x={0} y={0} />

      <h1
        style={{
          position: "absolute",
          left: 360 + titleX,
          top: 32,
          maxWidth: 720,
          fontFamily: FONT_DISPLAY,
          fontSize: 64,
          lineHeight: 1.02,
          letterSpacing: -2.5,
          color: COLORS.ink,
          opacity: titleSpring,
        }}
      >
        Find Barcelona&apos;s most heat-vulnerable site. Design the shelter that fixes it.
      </h1>

      {/* Stage badge — flashes accent on stage transitions */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 40,
          fontFamily: FONT_MONO,
          fontSize: 18,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: COLORS.ink3,
          opacity: titleSpring,
          textAlign: "right",
        }}
      >
        <div>STAGE / 01</div>
        <div style={{ color: COLORS.ink, marginTop: 4 }}>{stage}</div>
        <div style={{ marginTop: 8, color: COLORS.accent, fontSize: 14 }}>
          ▌FRAME {String(frame).padStart(3, "0")} / 300
        </div>
      </div>

      <svg
        viewBox="0 0 1100 540"
        style={{ position: "absolute", left: 0, top: 220, width: "100%", height: 540 }}
      >
        <Coastline opacity={gridFade} />
        <EixampleGrid opacity={gridFade} scan={gridScan} />

        {HEAT_SPOTS.map((s, i) => (
          <HeatBlob key={i} spot={s} progress={heatProgress} highlight={heroHighlight} />
        ))}

        <Crosshair x={HERO_SPOT.x} y={HERO_SPOT.y} opacity={crosshairFade} pulse={frame * 0.2} />

        <g opacity={placaFade}>
          <PlacaPolygon opacity={placaFade} />
          {SHELTERS.map((s, i) => (
            <ShelterFootprint key={i} s={s} progress={Math.max(0, Math.min(1, shelterProgress - i))} />
          ))}
        </g>

        <g opacity={crosshairFade}>
          <line x1={HERO_SPOT.x + 30} y1={HERO_SPOT.y - 10} x2={HERO_SPOT.x + 110} y2={HERO_SPOT.y - 60} stroke={COLORS.ink} strokeWidth={1} />
          <text x={HERO_SPOT.x + 116} y={HERO_SPOT.y - 64} fontFamily={FONT_MONO} fontSize={16} letterSpacing={3} fill={COLORS.ink}>
            PLAÇA DELS ÀNGELS
          </text>
          <text x={HERO_SPOT.x + 116} y={HERO_SPOT.y - 44} fontFamily={FONT_MONO} fontSize={14} letterSpacing={2} fill={COLORS.accent}>
            Tmrt 58 °C · WORST IN SAMPLE
          </text>
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 420,
          opacity: metricsFade,
          fontFamily: FONT_MONO,
          fontSize: 18,
          lineHeight: 1.5,
          color: COLORS.ink2,
        }}
      >
        <div style={{ letterSpacing: 4, color: COLORS.ink3, marginBottom: 8, textTransform: "uppercase" }}>
          FIELD-VALIDATED OUTPUT
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", rowGap: 6, columnGap: 16 }}>
          <span>Site</span>
          <span style={{ color: COLORS.ink }}>3,800 m²</span>
          <span>Patterns applied</span>
          <span style={{ color: COLORS.ink }}>27 / 89</span>
          <span>Shelters placed</span>
          <span style={{ color: COLORS.ink }}>5 (NSGA-II)</span>
          <span>Tmrt reduction</span>
          <span style={{ color: COLORS.accent, fontFamily: FONT_DISPLAY, fontSize: 28 }}>
            {tmrtCounter} °C
          </span>
          <span>Shaded area gain</span>
          <span style={{ color: COLORS.accent, fontFamily: FONT_DISPLAY, fontSize: 28 }}>
            +{shadedCounter} %
          </span>
        </div>
        <div
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: `1px solid ${COLORS.rule}`,
            color: COLORS.ink3,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontSize: 14,
          }}
        >
          Theory · data · field — three-citation rule
        </div>
      </div>
    </SizzleShell>
  );
};
