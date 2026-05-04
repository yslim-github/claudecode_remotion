import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const VostokGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const drawIn = interpolate(frame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orbit angle
  const orbitAngle = interpolate(frame, [0, 200], [0, Math.PI * 2], {
    extrapolateRight: "extend",
  });

  const size = 280;
  const cx = size / 2;
  const cy = size / 2 + 30;
  const earthR = 90;
  const orbitRx = 115;
  const orbitRy = 42;

  const capsuleX = cx + Math.cos(orbitAngle) * orbitRx;
  const capsuleY = cy - Math.sin(orbitAngle) * orbitRy;
  const capsuleAngle = Math.atan2(
    Math.sin(orbitAngle) * orbitRy,
    -Math.cos(orbitAngle) * orbitRx
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Earth arc (bottom curve) */}
      <ellipse
        cx={cx}
        cy={cy + earthR + 10}
        rx={earthR}
        ry={earthR}
        fill="none"
        stroke="#00D4FF"
        strokeWidth={2}
        strokeDasharray="180 360"
        strokeDashoffset={"-90"}
        opacity={drawIn * 0.7}
      />
      {/* Earth glow */}
      <ellipse
        cx={cx}
        cy={cy + earthR + 10}
        rx={earthR}
        ry={earthR}
        fill="none"
        stroke="#00D4FF"
        strokeWidth={8}
        strokeDasharray="180 360"
        strokeDashoffset={"-90"}
        opacity={drawIn * 0.08}
        filter="blur(4px)"
      />

      {/* Orbit path */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={orbitRx}
        ry={orbitRy}
        fill="none"
        stroke="#00D4FF"
        strokeWidth={1}
        strokeDasharray="4 6"
        opacity={drawIn * 0.35}
      />

      {/* Capsule */}
      <g
        transform={`translate(${capsuleX}, ${capsuleY}) rotate(${(capsuleAngle * 180) / Math.PI})`}
        opacity={drawIn}
      >
        {/* Capsule body */}
        <ellipse cx={0} cy={0} rx={10} ry={7} fill="#0A0A0A" stroke="#00D4FF" strokeWidth={1.5} />
        {/* Nose */}
        <polygon points="10,0 16,0 14,-3 14,3" fill="#00D4FF" opacity={0.7} />
        {/* Solar panel hint */}
        <rect x={-6} y={-13} width={4} height={7} fill="#00D4FF" opacity={0.5} />
        <rect x={2} y={-13} width={4} height={7} fill="#00D4FF" opacity={0.5} />
      </g>

      {/* Thruster trail */}
      <circle
        cx={capsuleX + Math.cos(capsuleAngle + Math.PI) * 14}
        cy={capsuleY + Math.sin(capsuleAngle + Math.PI) * 14}
        r={3}
        fill="#FF4D00"
        opacity={drawIn * 0.6}
      />
    </svg>
  );
};
