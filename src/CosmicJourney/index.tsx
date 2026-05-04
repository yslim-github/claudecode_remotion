import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { Scene1_Sputnik } from "./scenes/Scene1_Sputnik";
import { Scene2_Vostok } from "./scenes/Scene2_Vostok";
import { Scene3_Apollo } from "./scenes/Scene3_Apollo";
import { Scene4_Hubble } from "./scenes/Scene4_Hubble";
import { Scene5_Webb } from "./scenes/Scene5_Webb";
import { Scene6_Mars } from "./scenes/Scene6_Mars";

loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

// 6 scenes × 280 frames − 5 transitions × 12 frames = 1620 total
const SCENE_FRAMES = 280;
const TRANSITION_FRAMES = 12;

const TRANSITION = fade();
const TIMING = linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const CosmicJourney: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
          <Scene1_Sputnik />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={TRANSITION} timing={TIMING} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
          <Scene2_Vostok />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={TRANSITION} timing={TIMING} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
          <Scene3_Apollo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={TRANSITION} timing={TIMING} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
          <Scene4_Hubble />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={TRANSITION} timing={TIMING} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
          <Scene5_Webb />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={TRANSITION} timing={TIMING} />

        <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
          <Scene6_Mars />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
