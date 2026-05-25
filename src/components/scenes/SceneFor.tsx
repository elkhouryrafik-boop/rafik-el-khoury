"use client";

import dynamic from "next/dynamic";

const NatureGooddestScene = dynamic(
  () => import("./NatureGooddestScene").then((m) => m.NatureGooddestScene),
  { ssr: false }
);
const GigAIScene = dynamic(
  () => import("./GigAIScene").then((m) => m.GigAIScene),
  { ssr: false }
);
const ArchaiScene = dynamic(
  () => import("./ArchaiScene").then((m) => m.ArchaiScene),
  { ssr: false }
);

export function SceneFor({ id }: { id: "naturegooddest" | "gigai" | "archai" }) {
  if (id === "naturegooddest") return <NatureGooddestScene />;
  if (id === "gigai") return <GigAIScene />;
  if (id === "archai") return <ArchaiScene />;
  return null;
}
