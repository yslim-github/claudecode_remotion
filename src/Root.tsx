import React from "react";
import { Composition } from "remotion";
import { OpenDesignVideo } from "./OpenDesign";

// 20 × 912 − 19 × 12 = 18,012 frames (≈ 10 minutes @ 30fps)
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="OpenDesignVideo"
      component={OpenDesignVideo}
      durationInFrames={18012}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
