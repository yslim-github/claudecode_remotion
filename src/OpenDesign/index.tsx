import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES } from "./SceneData";
import { SceneFrame } from "./components/SceneFrame";

// 20 scenes × 912 frames − 19 transitions × 12 frames = 18,012 frames ≈ 10:00
const SCENE_FRAMES = 912;
const TRANSITION_FRAMES = 12;
const TOTAL = SCENES.length;

export const OpenDesignVideo: React.FC = () => (
  <AbsoluteFill style={{ background: "#0D1117" }}>
    <TransitionSeries>
      {SCENES.map((scene, i) => (
        <React.Fragment key={scene.id}>
          <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
            <SceneFrame scene={scene} total={TOTAL} />
          </TransitionSeries.Sequence>
          {i < SCENES.length - 1 && (
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
            />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);
