import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const WebbGraphic: React.FC = () => {
  const frame = useCurrentFrame();

  const drawIn = interpolate(frame, [0, 50], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;

  // Hexagon geometry
  const hexR = 34;
  const gap = 3;
  const hexW = hexR * Math.sqrt(3);
  const hexH = hexR * 2;

  // 7-hex mirror layout (1 center + 6 around)
  const positions = [
    { q: 0, r: 0 },
    { q: 1, r: 0 },
    { q: 0, r: 1 },
    { q: -1, r: 1 },
    { q: -1, r: 0 },
    { q: 0, r: -1 },
    { q: 1, r: -1 },
  ];

  const hexPoints = (x: number, y: number, r: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`;
    }).join(" ");
  };

  const hexToXY = (q: number, r: number) => ({
    x: cx + q * (hexW + gap) - (r * (hexW / 2 + gap / 2)),
    y: cy + r * (hexH * 0.75 + gap),
  });

  // Golden shimmer
  const shimmer = interpolate(frame % 80, [0, 40, 80], [0.6, 1.0, 0.6], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Stagger reveal of hexagons
  const hexReveal = positions.map((_, i) =>
    interpolate(frame, [i * 6, i * 6 + 30], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* Light cone going upward */}
      <path
        d={`M ${cx} ${cy - hexH * 0.5} L ${cx - 60} ${cy - 160} L ${cx + 60} ${cy - 160} Z`}
        fill="#00D4FF"
        opacity={drawIn * 0.04}
      />

      {positions.map((pos, i) => {
        const { x, y } = hexToXY(pos.q, pos.r);
        const golden = `rgba(255, 200, 80, ${0.15 * shimmer * hexReveal[i]})`;
        const stroke = `rgba(255, 190, 60, ${0.9 * hexReveal[i]})`;
        return (
          <g key={i} opacity={hexReveal[i]}>
            <polygon
              points={hexPoints(x, y, hexR - 1)}
              fill={golden}
              stroke={stroke}
              strokeWidth={1.5}
            />
            {/* Inner hex detail */}
            <polygon
              points={hexPoints(x, y, hexR * 0.55)}
              fill="none"
              stroke={`rgba(255, 190, 60, ${0.2 * hexReveal[i]})`}
              strokeWidth={1}
            />
          </g>
        );
      })}

      {/* Center star shimmer */}
      {drawIn > 0.6 && (
        <>
          <line x1={cx} y1={cy - 20} x2={cx} y2={cy - 80} stroke="#00D4FF" strokeWidth={1} opacity={drawIn * 0.3 * shimmer} />
          <line x1={cx - 15} y1={cy - 50} x2={cx + 15} y2={cy - 50} stroke="#00D4FF" strokeWidth={0.5} opacity={drawIn * 0.2 * shimmer} />
        </>
      )}
    </svg>
  );
};
