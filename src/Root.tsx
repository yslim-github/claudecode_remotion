import React from "react";
import { Composition } from "remotion";
import { CosmicJourney } from "./CosmicJourney";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CosmicJourney"
        component={CosmicJourney}
        durationInFrames={1620}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
