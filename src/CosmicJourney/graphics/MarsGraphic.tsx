import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const MarsGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const drawIn = interpolate(frame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rocket lift animation (subtle hover oscillation)
  const rocketHover = interpolate(frame % 60, [0, 30, 60], [-2, 2, -2], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Flame flicker
  const flameScale = interpolate(frame % 8, [0, 4, 8], [0.85, 1.15, 0.85], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Launch thrust after frame 120
  const launchY = interpolate(frame, [120, 200], [0, -80], {
    easing: Easing.bezier(0.45, 0, 0.16, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = 280;
  const cx = size / 2;
  const groundY = size / 2 + 60;
  const baseY = groundY - 10 + rocketHover + launchY;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Ground line */}
      <line
        x1={cx - 100}
        y1={groundY}
        x2={cx + 100}
        y2={groundY}
        stroke="#FF4D00"
        strokeWidth={2}
        opacity={drawIn * 0.5}
      />
      <line
        x1={cx - 100}
        y1={groundY}
        x2={cx + 100}
        y2={groundY}
        stroke="#FF4D00"
        strokeWidth={10}
        opacity={drawIn * 0.05}
        strokeLinecap="round"
      />

      {/* Launch pad */}
      <rect x={cx - 22} y={groundY - 6} width={44} height={8} rx={2} fill="#050505" stroke="#FF4D00" strokeWidth={1.5} opacity={drawIn * 0.7} />

      {/* Rocket group */}
      <g transform={`translate(${cx}, ${baseY})`} opacity={drawIn}>
        {/* Flame (below engine) */}
        <g transform={`scale(1, ${flameScale})`} style={{ transformOrigin: "0 10px" }}>
          {/* Outer flame */}
          <path
            d="M -14,10 Q -20,30 -8,50 Q 0,60 8,50 Q 20,30 14,10 Z"
            fill="#FF4D00"
            opacity={0.8}
          />
          {/* Inner flame */}
          <path
            d="M -8,10 Q -10,28 -4,42 Q 0,50 4,42 Q 10,28 8,10 Z"
            fill="#FFB347"
            opacity={0.9}
          />
          {/* Core */}
          <path
            d="M -4,10 Q -5,22 0,34 Q 5,22 4,10 Z"
            fill="#FFFFFF"
            opacity={0.7}
          />
        </g>

        {/* Fin left */}
        <polygon points="-16,0 -26,10 -16,10" fill="#050505" stroke="#FF4D00" strokeWidth={1.5} />
        {/* Fin right */}
        <polygon points="16,0 26,10 16,10" fill="#050505" stroke="#FF4D00" strokeWidth={1.5} />

        {/* Engine bell */}
        <path d="M -16,-5 Q -18,0 -16,10 L 16,10 Q 18,0 16,-5 Z" fill="#050505" stroke="#00D4FF" strokeWidth={1.5} />

        {/* Body */}
        <rect x={-14} y={-100} width={28} height={95} rx={4} fill="#050505" stroke="#00D4FF" strokeWidth={2} />

        {/* Body stripes */}
        <rect x={-14} y={-60} width={28} height={8} rx={1} fill="#00D4FF" opacity={0.15} />
        <rect x={-14} y={-40} width={28} height={3} rx={1} fill="#00D4FF" opacity={0.2} />

        {/* Window */}
        <circle cx={0} cy={-70} r={7} fill="#00D4FF" opacity={0.3} stroke="#00D4FF" strokeWidth={1.5} />

        {/* Nose cone */}
        <polygon points="-14,-100 14,-100 0,-148" fill="#050505" stroke="#00D4FF" strokeWidth={2} />

        {/* Nose tip glow */}
        <circle cx={0} cy={-148} r={4} fill="#00D4FF" opacity={0.6} />
        <circle cx={0} cy={-148} r={10} fill="#00D4FF" opacity={0.08} />
      </g>

      {/* Exhaust trail when launching */}
      {launchY < -10 && (
        <ellipse
          cx={cx}
          cy={groundY - 5}
          rx={20}
          ry={8}
          fill="#FF4D00"
          opacity={Math.min(1, (-launchY / 40)) * 0.4}
        />
      )}
    </svg>
  );
};
