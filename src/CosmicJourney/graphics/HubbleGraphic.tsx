import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const HubbleGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const drawIn = interpolate(frame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Solar panels unfold
  const panelExtend = interpolate(frame, [15, 65], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;

  const tubeW = 40;
  const tubeH = 110;
  const panelW = 70 * panelExtend;
  const panelH = 28;
  const panelGap = 16;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Telescope body */}
      <rect
        x={cx - tubeW / 2}
        y={cy - tubeH / 2}
        width={tubeW}
        height={tubeH}
        rx={6}
        fill="#050505"
        stroke="#00D4FF"
        strokeWidth={2}
        opacity={drawIn}
      />

      {/* Aperture */}
      <ellipse cx={cx} cy={cy - tubeH / 2} rx={tubeW / 2} ry={8} fill="#00D4FF" opacity={drawIn * 0.3} />
      <ellipse cx={cx} cy={cy - tubeH / 2} rx={tubeW / 2} ry={8} fill="none" stroke="#00D4FF" strokeWidth={2} opacity={drawIn} />

      {/* Detail rings */}
      <line x1={cx - tubeW / 2} y1={cy - 20} x2={cx + tubeW / 2} y2={cy - 20} stroke="#00D4FF" strokeWidth={1} opacity={drawIn * 0.4} />
      <line x1={cx - tubeW / 2} y1={cy + 10} x2={cx + tubeW / 2} y2={cy + 10} stroke="#00D4FF" strokeWidth={1} opacity={drawIn * 0.4} />

      {/* Left solar panel arm */}
      <line
        x1={cx - tubeW / 2}
        y1={cy - 15}
        x2={cx - tubeW / 2 - panelGap - panelW}
        y2={cy - 15}
        stroke="#00D4FF"
        strokeWidth={1.5}
        opacity={drawIn * panelExtend}
      />

      {/* Left panel cells */}
      {panelExtend > 0.05 && (
        <rect
          x={cx - tubeW / 2 - panelGap - panelW}
          y={cy - 15 - panelH / 2}
          width={panelW}
          height={panelH}
          rx={2}
          fill="#00D4FF"
          opacity={drawIn * panelExtend * 0.25}
          stroke="#00D4FF"
          strokeWidth={1}
        />
      )}
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={cx - tubeW / 2 - panelGap - panelW + (panelW / 4) * i}
          y1={cy - 15 - panelH / 2}
          x2={cx - tubeW / 2 - panelGap - panelW + (panelW / 4) * i}
          y2={cy - 15 + panelH / 2}
          stroke="#00D4FF"
          strokeWidth={0.8}
          opacity={drawIn * panelExtend * 0.5}
        />
      ))}

      {/* Right solar panel arm */}
      <line
        x1={cx + tubeW / 2}
        y1={cy - 15}
        x2={cx + tubeW / 2 + panelGap + panelW}
        y2={cy - 15}
        stroke="#00D4FF"
        strokeWidth={1.5}
        opacity={drawIn * panelExtend}
      />

      {/* Right panel cells */}
      {panelExtend > 0.05 && (
        <rect
          x={cx + tubeW / 2 + panelGap}
          y={cy - 15 - panelH / 2}
          width={panelW}
          height={panelH}
          rx={2}
          fill="#00D4FF"
          opacity={drawIn * panelExtend * 0.25}
          stroke="#00D4FF"
          strokeWidth={1}
        />
      )}
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={cx + tubeW / 2 + panelGap + (panelW / 4) * i}
          y1={cy - 15 - panelH / 2}
          x2={cx + tubeW / 2 + panelGap + (panelW / 4) * i}
          y2={cy - 15 + panelH / 2}
          stroke="#00D4FF"
          strokeWidth={0.8}
          opacity={drawIn * panelExtend * 0.5}
        />
      ))}

      {/* Focal point glow */}
      <circle cx={cx} cy={cy + tubeH / 2 + 20} r={6} fill="#00D4FF" opacity={drawIn * 0.5} />
      <circle cx={cx} cy={cy + tubeH / 2 + 20} r={16} fill="#00D4FF" opacity={drawIn * 0.08} />
    </svg>
  );
};
