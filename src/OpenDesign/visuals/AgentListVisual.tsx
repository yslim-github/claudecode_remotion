import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = { header: string; items: string[]; accent?: string };

export const AgentListVisual: React.FC<Props> = ({ header, items, accent = "#58A6FF" }) => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [5, 25], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });

  return (
    <div style={{ display:"flex", flexDirection:"column", gap: 18, alignItems:"flex-start", minWidth: 480 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, fontFamily:"'Montserrat',sans-serif", opacity: headerOp, letterSpacing:"0.04em", marginBottom: 8 }}>
        {header}
      </div>
      {items.map((item, i) => {
        const delay = 18 + i * 14;
        const op = interpolate(frame, [delay, delay+20], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const x = interpolate(frame, [delay, delay+20], [-30, 0], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const checkDelay = delay + 14;
        const checkOp = interpolate(frame, [checkDelay, checkDelay+10], [0,1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        return (
          <div key={i} style={{ display:"flex", alignItems:"center", gap: 16, opacity: op, transform: `translateX(${x}px)` }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              border: `2px solid ${accent}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              background: `${accent}18`,
            }}>
              <span style={{ fontSize: 16, opacity: checkOp, color: accent }}>✓</span>
            </div>
            <span style={{ fontSize: 20, color: "#E6EDF3", fontFamily:"'Montserrat',sans-serif", fontWeight: 500 }}>{item}</span>
          </div>
        );
      })}
    </div>
  );
};
