import React, { useEffect, useState } from "react";
import { Audio, staticFile } from "remotion";

type Props = { sceneId: string };

export const SceneAudio: React.FC<Props> = ({ sceneId }) => {
  const [ready, setReady] = useState(false);
  const src = staticFile(`audio/${sceneId}.mp3`);

  useEffect(() => {
    fetch(src, { method: "HEAD" })
      .then((r) => setReady(r.ok && (r.headers.get("content-length") ?? "0") !== "0"))
      .catch(() => setReady(false));
  }, [src]);

  if (!ready) return null;
  return <Audio src={src} volume={1} />;
};
