import React, { useEffect, useState } from "react";
import { Audio, staticFile } from "remotion";

type Props = {
  sceneId: string;
  startFrom?: number;
};

export const SceneAudio: React.FC<Props> = ({ sceneId, startFrom = 0 }) => {
  const [exists, setExists] = useState(false);
  const src = staticFile(`audio/${sceneId}.mp3`);

  useEffect(() => {
    fetch(src, { method: "HEAD" })
      .then((r) => setExists(r.ok && r.headers.get("content-length") !== "0"))
      .catch(() => setExists(false));
  }, [src]);

  if (!exists) return null;

  return <Audio src={src} startFrom={startFrom} volume={1} />;
};
