import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const SputnikGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const drawIn = interpolate(frame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ripple waves expand over time
  const wave1 = interpolate(frame % 60, [0, 60], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const wave2 = interpolate((frame + 20) % 60, [0, 60], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const wave3 = interpolate((frame + 40) % 60, [0, 60], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const bodyR = 28;

  const antennaAngles = [45, 135, 225, 315];
  const antennaLen = 60;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Ripple circles */}
      {[wave1, wave2, wave3].map((w, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={bodyR + 20 + w * 80}
          fill="none"
          stroke="#00D4FF"
          strokeWidth={1.5}
          opacity={(1 - w) * 0.5 * drawIn}
        />
      ))}

      {/* Antennas */}
      {antennaAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * bodyR;
        const y1 = cy + Math.sin(rad) * bodyR;
        const x2 = cx + Math.cos(rad) * (bodyR + antennaLen);
        const y2 = cy + Math.sin(rad) * (bodyR + antennaLen);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00D4FF"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={drawIn}
          />
        );
      })}

      {/* Satellite body */}
      <circle
        cx={cx}
        cy={cy}
        r={bodyR}
        fill="#050505"
        stroke="#00D4FF"
        strokeWidth={2.5}
        opacity={drawIn}
      />
      <circle
        cx={cx}
        cy={cy}
        r={bodyR - 8}
        fill="none"
        stroke="#00D4FF"
        strokeWidth={1}
        opacity={drawIn * 0.4}
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={5} fill="#00D4FF" opacity={drawIn} />
    </svg>
  );
};
