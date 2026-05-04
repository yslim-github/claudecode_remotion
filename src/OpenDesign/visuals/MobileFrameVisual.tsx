import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = { screens: string[] };

export const MobileFrameVisual: React.FC<Props> = ({ screens }) => {
  const frame = useCurrentFrame();

  const CYCLE = 60;
  const screenIdx = Math.floor(frame / CYCLE) % screens.length;
  const screenColors = ["#1C2128", "#161B22", "#0D1117", "#1C2128"];

  const frameIn = interpolate(frame, [5, 35], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const screenOp = interpolate(frame % CYCLE, [0, 8, CYCLE-8, CYCLE], [0, 1, 1, 0], { easing: Easing.bezier(0.45,0,0.55,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });

  return (
    <div style={{ opacity: frameIn, position:"relative" }}>
      {/* iPhone frame */}
      <svg width="220" height="420" viewBox="0 0 220 420">
        <rect x="5" y="5" width="210" height="410" rx="30" ry="30" fill="#161B22" stroke="#58A6FF" strokeWidth="2.5" />
        {/* Notch */}
        <rect x="70" y="14" width="80" height="18" rx="9" fill="#0D1117" />
        {/* Home indicator */}
        <rect x="80" y="394" width="60" height="5" rx="2.5" fill="#30363D" />
        {/* Screen area */}
        <rect x="15" y="40" width="190" height="340" rx="4" fill={screenColors[screenIdx]} />
      </svg>

      {/* Screen label */}
      <div style={{
        position:"absolute", top: 90, left: 15, width: 190, textAlign:"center",
        opacity: screenOp,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#58A6FF", fontFamily:"'Montserrat',sans-serif", marginBottom: 12 }}>
          {screens[screenIdx]}
        </div>
        {/* Mock UI elements */}
        <div style={{ display:"flex", flexDirection:"column", gap: 8, padding:"0 16px" }}>
          <div style={{ height: 40, background:"#30363D44", borderRadius: 8, border:"1px solid #30363D" }} />
          <div style={{ height: 24, background:"#58A6FF22", borderRadius: 6, width:"70%", margin:"0 auto" }} />
          <div style={{ height: 24, background:"#30363D44", borderRadius: 6 }} />
          <div style={{ height: 24, background:"#30363D44", borderRadius: 6, width:"85%" }} />
          <div style={{ height: 40, background:"#3FB95022", borderRadius: 8, border:"1px solid #3FB95044", marginTop: 8 }} />
        </div>
      </div>

      {/* Screen indicator dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:8 }}>
        {screens.map((_, i) => (
          <div key={i} style={{ width:8, height:8, borderRadius:"50%", background: i===screenIdx ? "#58A6FF" : "#30363D" }} />
        ))}
      </div>
    </div>
  );
};
