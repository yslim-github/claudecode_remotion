import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = { lines: string[]; tagline: string };

export const ClosingVisual: React.FC<Props> = ({ lines, tagline }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap: 20 }}>
      {lines.map((line, i) => {
        const delay = 10 + i * 22;
        const op = interpolate(frame, [delay, delay+25], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const y = interpolate(frame, [delay, delay+25], [20, 0], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const isArrow = line.startsWith("→");
        return (
          <div key={i} style={{
            fontSize: i === 0 ? 58 : 36, fontWeight: i === 0 ? 800 : 600,
            fontFamily:"'Montserrat',sans-serif",
            color: i === 0 ? "#58A6FF" : isArrow ? "#3FB950" : "#E6EDF3",
            opacity: op, transform: `translateY(${y}px)`,
            letterSpacing: i === 0 ? "-0.02em" : "0.01em",
          }}>
            {line}
          </div>
        );
      })}

      {/* Divider */}
      {(() => {
        const op = interpolate(frame, [75, 95], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const w = interpolate(frame, [75, 105], [0, 400], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        return <div style={{ width: w, height: 2, background:"linear-gradient(90deg,#58A6FF,#3FB950)", borderRadius:2, opacity: op, margin:"8px 0" }} />;
      })()}

      {(() => {
        const op = interpolate(frame, [100, 120], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        return (
          <div style={{ fontSize: 22, color: "#8B949E", fontFamily:"'Montserrat',sans-serif", fontWeight:400, opacity: op, letterSpacing:"0.04em" }}>
            {tagline}
          </div>
        );
      })()}
    </div>
  );
};
