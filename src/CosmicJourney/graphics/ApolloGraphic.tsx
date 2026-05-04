import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const ApolloGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const drawIn = interpolate(frame, [0, 50], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Horizon line draws in from center
  const horizonWidth = interpolate(frame, [10, 55], [0, 300], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lander descends
  const landerY = interpolate(frame, [20, 70], [-60, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = 280;
  const cx = size / 2;
  const groundY = size / 2 + 50;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Moon surface glow */}
      <line
        x1={cx - horizonWidth / 2}
        y1={groundY}
        x2={cx + horizonWidth / 2}
        y2={groundY}
        stroke="#00D4FF"
        strokeWidth={2}
        opacity={drawIn * 0.8}
      />
      <line
        x1={cx - horizonWidth / 2}
        y1={groundY}
        x2={cx + horizonWidth / 2}
        y2={groundY}
        stroke="#00D4FF"
        strokeWidth={10}
        opacity={drawIn * 0.06}
        strokeLinecap="round"
      />

      {/* Lander */}
      <g transform={`translate(${cx}, ${groundY + landerY})`} opacity={drawIn}>
        {/* Legs */}
        <line x1={0} y1={10} x2={-35} y2={30} stroke="#00D4FF" strokeWidth={1.5} strokeLinecap="round" />
        <line x1={0} y1={10} x2={35} y2={30} stroke="#00D4FF" strokeWidth={1.5} strokeLinecap="round" />
        <line x1={-35} y1={30} x2={-50} y2={28} stroke="#00D4FF" strokeWidth={1.5} strokeLinecap="round" />
        <line x1={35} y1={30} x2={50} y2={28} stroke="#00D4FF" strokeWidth={1.5} strokeLinecap="round" />

        {/* Body */}
        <rect x={-22} y={-30} width={44} height={40} rx={4} fill="#050505" stroke="#00D4FF" strokeWidth={2} />

        {/* Foil texture lines */}
        <line x1={-22} y1={-15} x2={22} y2={-15} stroke="#00D4FF" strokeWidth={0.5} opacity={0.3} />
        <line x1={-22} y1={-3} x2={22} y2={-3} stroke="#00D4FF" strokeWidth={0.5} opacity={0.3} />

        {/* Ascent module top */}
        <rect x={-14} y={-52} width={28} height={24} rx={3} fill="#050505" stroke="#00D4FF" strokeWidth={1.5} />

        {/* Window */}
        <circle cx={0} cy={-42} r={5} fill="#00D4FF" opacity={0.4} />

        {/* Antenna */}
        <line x1={0} y1={-52} x2={0} y2={-68} stroke="#00D4FF" strokeWidth={1} />
        <circle cx={0} cy={-70} r={3} fill="none" stroke="#00D4FF" strokeWidth={1} />

        {/* Engine nozzle */}
        <polygon points="-10,10 10,10 14,24 -14,24" fill="#050505" stroke="#00D4FF" strokeWidth={1.5} />

        {/* Thruster glow (while descending) */}
        {landerY < -5 && (
          <ellipse cx={0} cy={30} rx={8} ry={5} fill="#FF4D00" opacity={0.7} />
        )}
      </g>

      {/* Footprints */}
      {drawIn > 0.8 && landerY > -5 && (
        <>
          <ellipse cx={cx - 60} cy={groundY + 5} rx={6} ry={3} fill="none" stroke="#00D4FF" strokeWidth={1} opacity={(drawIn - 0.8) * 5 * 0.5} />
          <ellipse cx={cx - 75} cy={groundY + 8} rx={6} ry={3} fill="none" stroke="#00D4FF" strokeWidth={1} opacity={(drawIn - 0.8) * 5 * 0.4} />
        </>
      )}
    </svg>
  );
};
