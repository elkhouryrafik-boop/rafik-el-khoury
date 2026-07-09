"use client";

import dynamic from "next/dynamic";

const GigAIScene = dynamic(
  () => import("./GigAIScene").then((m) => m.GigAIScene),
  { ssr: false }
);
const ArchaiScene = dynamic(
  () => import("./ArchaiScene").then((m) => m.ArchaiScene),
  { ssr: false }
);

export function SceneFor({ id }: { id: "gigai" | "archai" | undefined }) {
  if (id === "gigai") return <GigAIScene />;
  if (id === "archai") return <ArchaiScene />;
  return null;
}
