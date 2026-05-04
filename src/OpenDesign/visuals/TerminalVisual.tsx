import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = { title: string; commands: string[] };

export const TerminalVisual: React.FC<Props> = ({ title, commands }) => {
  const frame = useCurrentFrame();

  const boxIn = interpolate(frame, [5, 25], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const cursor = Math.floor(frame / 15) % 2 === 0;

  return (
    <div style={{
      background: "#0D1117", border: "1px solid #30363D", borderRadius: 12,
      overflow:"hidden", width: 700, opacity: boxIn,
      boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
    }}>
      {/* Title bar */}
      <div style={{ background: "#161B22", padding: "10px 16px", display:"flex", alignItems:"center", gap: 8 }}>
        <span style={{ width:12, height:12, borderRadius:"50%", background:"#FF5F57", display:"inline-block" }} />
        <span style={{ width:12, height:12, borderRadius:"50%", background:"#FEBC2E", display:"inline-block" }} />
        <span style={{ width:12, height:12, borderRadius:"50%", background:"#28C840", display:"inline-block" }} />
        <span style={{ flex:1, textAlign:"center", fontSize:13, color:"#8B949E", fontFamily:"monospace" }}>{title}</span>
      </div>
      {/* Body */}
      <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap: 10, minHeight: 260 }}>
        {commands.map((cmd, i) => {
          const delay = 20 + i * 18;
          const op = interpolate(frame, [delay, delay+15], [0,1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
          const isComment = cmd.startsWith("#");
          return (
            <div key={i} style={{ opacity: op, display:"flex", gap: 12, alignItems:"flex-start" }}>
              {!isComment && <span style={{ color:"#3FB950", fontFamily:"monospace", fontSize:15, userSelect:"none" }}>$</span>}
              <span style={{ color: isComment ? "#8B949E" : "#E6EDF3", fontFamily:"monospace", fontSize:15, whiteSpace:"pre-wrap" }}>
                {cmd}
                {i === commands.length - 1 && cursor && !isComment && (
                  <span style={{ color:"#58A6FF" }}>▍</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
