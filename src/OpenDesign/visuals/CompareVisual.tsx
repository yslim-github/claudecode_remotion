import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Side = { label: string; icon: string; items: string[] };

export const CompareVisual: React.FC<{ left: Side; right: Side }> = ({ left, right }) => {
  const frame = useCurrentFrame();

  const leftIn = interpolate(frame, [10, 45], [-80, 0], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const leftOp = interpolate(frame, [10, 45], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const rightIn = interpolate(frame, [25, 60], [80, 0], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const rightOp = interpolate(frame, [25, 60], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const divIn = interpolate(frame, [18, 40], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });

  const Card: React.FC<{ side: Side; x: number; op: number; accent: string }> = ({ side, x, op, accent }) => (
    <div style={{
      transform: `translateX(${x}px)`, opacity: op,
      background: "#161B22", border: `1px solid ${accent}44`,
      borderRadius: 16, padding: "32px 36px", width: 360,
      display:"flex", flexDirection:"column", gap: 16,
    }}>
      <div style={{ fontSize: 40 }}>{side.icon === "cloud-lock" ? "☁️🔒" : "🖥️✅"}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, fontFamily:"'Montserrat',sans-serif" }}>{side.label}</div>
      {side.items.map((item, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:10, color:"#E6EDF3", fontSize:18, fontFamily:"'Montserrat',sans-serif" }}>
          <span style={{ color: accent, fontSize:20 }}>{side.icon === "cloud-lock" ? "✕" : "✓"}</span>
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display:"flex", alignItems:"center", gap: 40 }}>
      <Card side={left} x={leftIn} op={leftOp} accent="#FF7B72" />
      <div style={{ width: 2, height: 200, background: "#30363D", opacity: divIn }} />
      <Card side={right} x={rightIn} op={rightOp} accent="#3FB950" />
    </div>
  );
};
