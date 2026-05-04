import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = { kpis: string[]; skills: string[] };

export const DashboardVisual: React.FC<Props> = ({ kpis, skills }) => {
  const frame = useCurrentFrame();

  const kpiIn = interpolate(frame, [5, 30], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const kpiColors = ["#3FB950", "#58A6FF", "#E3B341"];
  const barH = [120, 80, 140, 60, 100];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap: 20, width: 720 }}>
      {/* KPI row */}
      <div style={{ display:"flex", gap: 16 }}>
        {kpis.map((kpi, i) => {
          const d = 10 + i * 12;
          const op = interpolate(frame, [d, d+20], [0,1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
          return (
            <div key={i} style={{
              flex:1, background:"#161B22", border:`1px solid ${kpiColors[i]}44`,
              borderRadius:12, padding:"16px 20px", opacity: op,
            }}>
              <div style={{ fontSize:24, fontWeight:800, color: kpiColors[i], fontFamily:"'Montserrat',sans-serif" }}>{kpi}</div>
              <div style={{ fontSize:13, color:"#8B949E", fontFamily:"'Montserrat',sans-serif", marginTop:4 }}>Key Metric {i+1}</div>
            </div>
          );
        })}
      </div>

      {/* Chart area */}
      <div style={{ background:"#161B22", border:"1px solid #30363D", borderRadius:12, padding:"16px 20px", opacity: kpiIn }}>
        <div style={{ fontSize:14, color:"#8B949E", fontFamily:"'Montserrat',sans-serif", marginBottom:12 }}>Monthly Overview</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:160 }}>
          {barH.map((h, i) => {
            const barD = 30 + i * 10;
            const barH2 = interpolate(frame, [barD, barD+25], [0, h], { easing: Easing.bezier(0.34,1.56,0.64,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
            return (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ width:"100%", height: barH2, background:"linear-gradient(180deg,#58A6FF,#58A6FF44)", borderRadius:"4px 4px 0 0" }} />
                <div style={{ fontSize:12, color:"#8B949E", fontFamily:"monospace" }}>0{i+1}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills list */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {skills.map((s, i) => {
          const d = 55 + i * 8;
          const op = interpolate(frame, [d, d+15], [0,1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
          return (
            <div key={i} style={{ background:"#1C2128", border:"1px solid #30363D", borderRadius:8, padding:"6px 14px", opacity: op }}>
              <span style={{ fontSize:13, color:"#58A6FF", fontFamily:"monospace" }}>{s}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
