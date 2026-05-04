import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const LogoVisual: React.FC<{ tagline?: string }> = ({ tagline = "" }) => {
  const frame = useCurrentFrame();

  const logoIn = interpolate(frame, [15, 50], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const lineW = interpolate(frame, [50, 80], [0, 320], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const tagIn = interpolate(frame, [75, 105], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  const orb = interpolate(frame, [0, 300], [0, Math.PI * 2], { extrapolateRight: "extend" });

  const icons = ["</>", "▦", "⊞"];

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap: 24 }}>
      {/* Orbiting dots */}
      <div style={{ position:"relative", width: 400, height: 160 }}>
        {icons.map((icon, i) => {
          const angle = orb + (i * Math.PI * 2) / 3;
          const r = 200;
          return (
            <div key={i} style={{
              position:"absolute",
              left: 200 + Math.cos(angle) * r - 20,
              top: 80 + Math.sin(angle) * 40 - 14,
              fontSize: 22, color: "#58A6FF", opacity: logoIn * 0.5,
              fontFamily: "monospace",
            }}>
              {icon}
            </div>
          );
        })}
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{
            fontSize: 72, fontWeight: 800, color: "#E6EDF3",
            fontFamily: "'Montserrat', sans-serif",
            opacity: logoIn,
            letterSpacing: "-0.02em",
          }}>
            Open Design
          </div>
        </div>
      </div>

      {/* Animated underline */}
      <div style={{ width: lineW, height: 3, background: "linear-gradient(90deg, #58A6FF, #3FB950)", borderRadius: 2 }} />

      {/* Tagline */}
      <div style={{
        fontSize: 28, color: "#8B949E",
        fontFamily: "'Montserrat', sans-serif", fontWeight: 400,
        opacity: tagIn, letterSpacing: "0.08em",
      }}>
        {tagline}
      </div>
    </div>
  );
};
