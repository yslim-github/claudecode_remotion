import React, { useEffect, useState } from "react";
import { useCurrentFrame, useVideoConfig, staticFile, interpolate, Easing } from "remotion";

type Cue = { startMs: number; endMs: number; text: string };

function parseSrt(raw: string): Cue[] {
  return raw
    .trim()
    .split(/\n\s*\n/)
    .flatMap((block) => {
      const lines = block.trim().split("\n");
      if (lines.length < 3) return [];
      const m = lines[1].match(
        /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
      );
      if (!m) return [];
      const ms = (h: string, mn: string, s: string, ms: string) =>
        +h * 3600000 + +mn * 60000 + +s * 1000 + +ms;
      return [{ startMs: ms(m[1],m[2],m[3],m[4]), endMs: ms(m[5],m[6],m[7],m[8]), text: lines.slice(2).join(" ") }];
    });
}

export const SubtitleTrack: React.FC<{ sceneId: string }> = ({ sceneId }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [cues, setCues] = useState<Cue[]>([]);

  useEffect(() => {
    fetch(staticFile(`subtitles/${sceneId}.srt`))
      .then((r) => r.text())
      .then(parseSrt)
      .then(setCues)
      .catch(() => setCues([]));
  }, [sceneId]);

  const ms = (frame / fps) * 1000;
  const cue = cues.find((c) => ms >= c.startMs && ms <= c.endMs);
  if (!cue) return null;

  const prog = (ms - cue.startMs) / Math.max(1, cue.endMs - cue.startMs);
  const opacity = interpolate(prog, [0, 0.08, 0.88, 1], [0, 1, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", bottom: 36, left: 80, right: 80, display: "flex", justifyContent: "center", pointerEvents: "none", opacity }}>
      <div style={{ background: "rgba(0,0,0,0.75)", borderRadius: 6, padding: "10px 28px", maxWidth: 1400, textAlign: "center" }}>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 600, color: "#FFFFFF", lineHeight: 1.5, letterSpacing: "0.01em" }}>
          {cue.text}
        </span>
      </div>
    </div>
  );
};
