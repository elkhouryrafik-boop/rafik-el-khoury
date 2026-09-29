import type { CSSProperties } from "react";

/** One snippet of real project work, pre-cropped to its natural ratio. */
type Tile = { src: string; w: number; h: number };

const t = (name: string, w: number, h: number): Tile => ({
  src: `/assets/wall/${name}.webp`,
  w,
  h,
});

/**
 * Columns left to right. `show` decides when a column joins the grid:
 * the three always-visible columns sit on the right, clear of the title
 * block, so the strongest images are never covered.
 */
const columns: { show: string; offset: string; tiles: Tile[] }[] = [
  {
    show: "hidden xl:flex",
    offset: "0%",
    tiles: [
      t("archai-osm", 530, 398),
      t("coolspend-demand", 470, 290),
      t("primavera-schematic", 640, 480),
      t("archai-graph-json", 390, 311),
      t("render-massing", 400, 300),
    ],
  },
  {
    show: "hidden lg:flex",
    offset: "-55%",
    tiles: [
      t("coliath-hillshade", 480, 480),
      t("ushade-pipeline", 600, 470),
      t("gigai-layers", 622, 388),
      t("ushade-risk", 640, 402),
      t("render-interior", 300, 300),
    ],
  },
  {
    show: "hidden md:flex",
    offset: "-20%",
    tiles: [
      t("ushade-halftone", 520, 520),
      t("coliath-section", 640, 452),
      t("archai-io", 590, 590),
      t("relk-site", 640, 358),
      t("coolspend-budget", 500, 360),
    ],
  },
  {
    show: "flex",
    offset: "-45%",
    tiles: [
      t("coliath-tower", 640, 853),
      t("ushade-trees", 640, 640),
      t("coolspend-utci", 640, 402),
      t("gigai-approval", 640, 480),
    ],
  },
  {
    show: "flex",
    offset: "0%",
    tiles: [
      t("ushade-canopy", 640, 480),
      t("coolspend-map", 478, 638),
      t("render-massing", 400, 300),
      t("coliath-rings", 585, 585),
    ],
  },
  {
    show: "flex",
    offset: "-30%",
    tiles: [
      t("render-aerial", 400, 300),
      t("ushade-heatmap", 580, 580),
      t("archai-massing", 640, 354),
      t("coolspend-budget", 500, 360),
      t("render-interior", 300, 300),
    ],
  },
  {
    show: "hidden min-[106rem]:flex",
    offset: "-60%",
    tiles: [
      t("archai-io", 590, 590),
      t("coliath-section", 640, 452),
      t("ushade-risk", 640, 402),
      t("relk-site", 640, 358),
      t("gigai-layers", 622, 388),
      t("ushade-pipeline", 600, 470),
    ],
  },
  {
    show: "hidden min-[138rem]:flex",
    offset: "-15%",
    tiles: [
      t("coliath-hillshade", 480, 480),
      t("archai-osm", 530, 398),
      t("primavera-schematic", 640, 480),
      t("coolspend-demand", 470, 290),
      t("archai-graph-json", 390, 311),
    ],
  },
];

/** Each column is laid down this many times so it never runs short on tall viewports. */
const REPEATS = [0, 1, 2];

export function WorkWall() {
  return (
    <div
      aria-hidden="true"
      className="work-wall absolute inset-0 -z-10 grid grid-cols-3 gap-[3px] overflow-hidden md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[106rem]:grid-cols-7 min-[138rem]:grid-cols-8"
    >
      {columns.map((col, c) => (
        <div
          key={c}
          className={`${col.show} flex-col gap-[3px]`}
          style={{ marginTop: col.offset }}
        >
          {REPEATS.flatMap((copy) =>
            col.tiles.map((tile, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${copy}-${tile.src}`}
                src={tile.src}
                width={tile.w}
                height={tile.h}
                alt=""
                loading={copy === 0 ? "eager" : "lazy"}
                decoding="async"
                className="wall-tile block h-auto w-full"
                style={{ "--i": c + i } as CSSProperties}
              />
            )),
          )}
        </div>
      ))}
    </div>
  );
}
