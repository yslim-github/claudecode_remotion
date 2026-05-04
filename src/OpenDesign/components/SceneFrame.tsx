import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import { SceneItem } from "../SceneData";
import { VisualDispatch } from "../visuals/VisualDispatch";
import { SceneAudio } from "./SceneAudio";
import { SubtitleTrack } from "./SubtitleTrack";

loadFont("normal", { weights: ["400", "600", "700", "800"], subsets: ["latin"] });

// Each scene slot: 912 frames. Audio/subtitle sceneId = "scene{id}"
const FADE_IN = 18;
const FADE_OUT_START = 880;
const TITLE_IN = 22;

type Props = { scene: SceneItem; total: number };

export const SceneFrame: React.FC<Props> = ({ scene, total }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, FADE_IN], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [FADE_OUT_START, 912], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const opacity = fadeIn * (1 - fadeOut);

  const titleOp = interpolate(frame, [TITLE_IN, TITLE_IN + 20], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const sceneId = `scene${scene.id}`;

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0D1117 0%, #0A0F1A 100%)", opacity }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(#58A6FF 1px, transparent 1px), linear-gradient(90deg, #58A6FF 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Audio */}
      <SceneAudio sceneId={sceneId} />

      {/* Scene number badge */}
      <div style={{
        position: "absolute", top: 40, left: 60,
        display: "flex", alignItems: "center", gap: 12,
        opacity: titleOp,
      }}>
        <div style={{
          background: "#58A6FF22", border: "1px solid #58A6FF44",
          borderRadius: 8, padding: "4px 14px",
          fontSize: 13, fontWeight: 700, color: "#58A6FF",
          fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.08em",
        }}>
          {String(scene.id).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div style={{
          fontSize: 15, fontWeight: 600, color: "#8B949E",
          fontFamily: "'Montserrat', sans-serif",
        }}>
          {scene.title}
        </div>
      </div>

      {/* Visual area */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        paddingTop: 60, paddingBottom: 120,
      }}>
        <VisualDispatch visualType={scene.visualType} visualData={scene.visualData} />
      </div>

      {/* Subtitle */}
      <SubtitleTrack sceneId={sceneId} />

      {/* Bottom progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#161B22" }}>
        <div style={{
          height: "100%",
          width: `${(frame / 912) * 100}%`,
          background: "linear-gradient(90deg, #58A6FF, #3FB950)",
          borderRadius: "0 2px 2px 0",
        }} />
      </div>
    </AbsoluteFill>
  );
};
