import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Star = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  phase: number;
};

export const StarField: React.FC = () => {
  const frame = useCurrentFrame();

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      x: (i * 173 + 47) % 100,
      y: (i * 97 + 23) % 100,
      size: 1.5 + (i % 3) * 0.8,
      speedX: ((i % 5) - 2) * 0.008,
      speedY: ((i % 7) - 3) * 0.006,
      opacity: 0.3 + (i % 4) * 0.15,
      phase: i * 37,
    }));
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {stars.map((star, i) => {
        const pulse = interpolate(
          (frame + star.phase) % 90,
          [0, 45, 90],
          [0.6, 1.0, 0.6],
          { easing: Easing.bezier(0.45, 0, 0.55, 1) }
        );
        const x = (star.x + star.speedX * frame) % 100;
        const y = (star.y + star.speedY * frame) % 100;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${((x + 100) % 100)}%`,
              top: `${((y + 100) % 100)}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              opacity: star.opacity * pulse,
              boxShadow: `0 0 ${star.size * 2}px #FFFFFF`,
            }}
          />
        );
      })}
    </div>
  );
};
