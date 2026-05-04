import React from "react";
import { Audio, staticFile } from "remotion";

type Props = {
  sceneId: string;
  startFrom?: number;
};

export const SceneAudio: React.FC<Props> = ({ sceneId, startFrom = 0 }) => {
  return (
    <Audio
      src={staticFile(`audio/${sceneId}.mp3`)}
      startFrom={startFrom}
      volume={1}
    />
  );
};
