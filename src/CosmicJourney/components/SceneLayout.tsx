import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { StarField } from "./StarField";
import { SceneAudio } from "./SceneAudio";
import { SubtitleTrack } from "./SubtitleTrack";

type Props = {
  year: string;
  title: string;
  subtitle: string;
  graphic: React.ReactNode;
  accentColor?: string;
  sceneId: string;
};

const FADE_IN_END = 20;
const YEAR_SCALE_START = 20;
const YEAR_SCALE_END = 40;
const TITLE_START = 30;
const TITLE_END = 55;
const SUBTITLE_START = 45;
const SUBTITLE_END = 65;
const GRAPHIC_START = 55;
const HOLD_END = 255;
const FADE_OUT_START = 255;

export const SceneLayout: React.FC<Props> = ({
  year,
  title,
  sceneId,
  subtitle,
  graphic,
  accentColor = "#00D4FF",
}) => {
  const frame = useCurrentFrame();

  const sceneFade = interpolate(frame, [0, FADE_IN_END], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [FADE_OUT_START, 280], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sceneOpacity = sceneFade * (1 - fadeOut);

  const yearScale = interpolate(frame, [YEAR_SCALE_START, YEAR_SCALE_END], [0.8, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const yearOpacity = interpolate(frame, [YEAR_SCALE_START, YEAR_SCALE_END], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [TITLE_START, TITLE_END], [40, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [TITLE_START, TITLE_END], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [SUBTITLE_START, SUBTITLE_END], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const graphicOpacity = interpolate(frame, [GRAPHIC_START, GRAPHIC_START + 25], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #0A0A0A 0%, #050505 100%)",
        opacity: sceneOpacity,
      }}
    >
      <SceneAudio sceneId={sceneId} startFrom={0} />
      <StarField />

      {/* Graphic layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: graphicOpacity,
          paddingBottom: 120,
        }}
      >
        {graphic}
      </div>

      {/* Text block */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Year */}
        <div
          style={{
            fontSize: 22,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            color: accentColor,
            letterSpacing: "0.25em",
            opacity: yearOpacity,
            transform: `scale(${yearScale})`,
            textTransform: "uppercase",
          }}
        >
          {year}
        </div>

        {/* Title glow backdrop */}
        <div style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "120%",
              background: `radial-gradient(ellipse at center, ${accentColor}22 0%, transparent 70%)`,
              filter: "blur(24px)",
              opacity: titleOpacity,
            }}
          />
          <div
            style={{
              fontSize: 64,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.1,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              position: "relative",
              textShadow: `0 0 40px ${accentColor}66`,
            }}
          >
            {title}
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            opacity: subtitleOpacity,
            letterSpacing: "0.05em",
          }}
        >
          {subtitle}
        </div>
      </div>

      <SubtitleTrack sceneId={sceneId} />
    </AbsoluteFill>
  );
};
