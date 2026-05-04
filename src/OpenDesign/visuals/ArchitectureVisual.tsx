import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Node = { id: string; label: string; icon: string };

export const ArchitectureVisual: React.FC<{ nodes: Node[] }> = ({ nodes }) => {
  const frame = useCurrentFrame();

  const boxIn = interpolate(frame, [5, 35], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const lineIn = interpolate(frame, [35, 60], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });

  // Layout: center node (daemon) + 3 around it
  const positions = [
    { x: 0, y: 0 },       // center: daemon
    { x: 240, y: -80 },   // web
    { x: -240, y: -80 },  // folder
    { x: 0, y: 150 },     // db
  ];

  return (
    <div style={{ position:"relative", width: 640, height: 360, display:"flex", alignItems:"center", justifyContent:"center" }}>
      {/* PC outer frame */}
      <div style={{
        position:"absolute", inset:0,
        border: "2px solid #30363D", borderRadius: 20,
        background: "#0D1117", opacity: boxIn,
      }}>
        <div style={{ position:"absolute", top:8, left:16, fontSize:13, color:"#8B949E", fontFamily:"'Montserrat',sans-serif", fontWeight:600 }}>
          Local PC
        </div>
      </div>

      {/* SVG connections */}
      <svg style={{ position:"absolute", inset:0 }} width="640" height="360">
        {[1,2,3].map((i) => {
          const cx = 320, cy = 180;
          const tx = 320 + positions[i].x, ty = 180 + positions[i].y;
          return (
            <line key={i} x1={cx} y1={cy} x2={tx} y2={ty}
              stroke="#58A6FF" strokeWidth={1.5} strokeDasharray="6 4"
              opacity={lineIn * 0.6}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const delay = 10 + i * 12;
        const op = interpolate(frame, [delay, delay+22], [0,1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const pos = positions[i];
        return (
          <div key={node.id} style={{
            position:"absolute",
            left: `calc(50% + ${pos.x}px - 64px)`,
            top: `calc(50% + ${pos.y}px - 40px)`,
            opacity: op,
            background: i === 0 ? "#1C2128" : "#161B22",
            border: `1px solid ${i === 0 ? "#58A6FF" : "#30363D"}`,
            borderRadius: 12, padding: "10px 18px",
            display:"flex", flexDirection:"column", alignItems:"center", gap:4, minWidth: 128,
          }}>
            <span style={{ fontSize: 26 }}>{node.icon}</span>
            <span style={{ fontSize:13, fontWeight:600, color: i===0 ? "#58A6FF" : "#E6EDF3", fontFamily:"'Montserrat',sans-serif" }}>{node.label}</span>
          </div>
        );
      })}
    </div>
  );
};
