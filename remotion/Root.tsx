import * as React from "react";
import { Composition } from "remotion";
import { IntroReel } from "./IntroReel";
import { NatureGooddestSizzle } from "./sizzles/NatureGooddestSizzle";
import { GigAISizzle } from "./sizzles/GigAISizzle";
import { ArchaiSizzle } from "./sizzles/ArchaiSizzle";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="intro-reel"
        component={IntroReel}
        durationInFrames={150}
        fps={30}
        width={1600}
        height={900}
      />
      <Composition
        id="sizzle-naturegooddest"
        component={NatureGooddestSizzle}
        durationInFrames={300}
        fps={30}
        width={1600}
        height={900}
      />
      <Composition
        id="sizzle-gigai"
        component={GigAISizzle}
        durationInFrames={300}
        fps={30}
        width={1600}
        height={900}
      />
      <Composition
        id="sizzle-archai"
        component={ArchaiSizzle}
        durationInFrames={300}
        fps={30}
        width={1600}
        height={900}
      />
    </>
  );
};
