import React, { useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { interpolate, Easing } from "remotion";

type SrtCue = {
  index: number;
  startMs: number;
  endMs: number;
  text: string;
};

function parseSrt(srt: string): SrtCue[] {
  const cues: SrtCue[] = [];
  const blocks = srt.trim().split(/\n\s*\n/);
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;
    const index = parseInt(lines[0], 10);
    const timeParts = lines[1].match(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
    );
    if (!timeParts) continue;
    const toMs = (h: string, m: string, s: string, ms: string) =>
      parseInt(h) * 3600000 + parseInt(m) * 60000 + parseInt(s) * 1000 + parseInt(ms);
    const startMs = toMs(timeParts[1], timeParts[2], timeParts[3], timeParts[4]);
    const endMs = toMs(timeParts[5], timeParts[6], timeParts[7], timeParts[8]);
    const text = lines.slice(2).join(" ");
    cues.push({ index, startMs, endMs, text });
  }
  return cues;
}

type Props = {
  sceneId: string;
};

export const SubtitleTrack: React.FC<Props> = ({ sceneId }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [cues, setCues] = useState<SrtCue[]>([]);

  useEffect(() => {
    fetch(staticFile(`subtitles/${sceneId}.srt`))
      .then((r) => r.text())
      .then((text) => setCues(parseSrt(text)))
      .catch(() => setCues([]));
  }, [sceneId]);

  const currentMs = (frame / fps) * 1000;
  const activeCue = cues.find(
    (c) => currentMs >= c.startMs && currentMs <= c.endMs
  );

  if (!activeCue) return null;

  const cueProgress = (currentMs - activeCue.startMs) /
    Math.max(1, activeCue.endMs - activeCue.startMs);

  const opacity = interpolate(cueProgress, [0, 0.05, 0.9, 1.0], [0, 1, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 52,
        left: 80,
        right: 80,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.72)",
          borderRadius: 6,
          padding: "10px 24px",
          maxWidth: 1100,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 32,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          {activeCue.text}
        </span>
      </div>
    </div>
  );
};
