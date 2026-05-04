import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Props = { steps: string[]; color?: string };

export const FlowVisual: React.FC<Props> = ({ steps, color = "#58A6FF" }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", justifyContent:"center", gap: 0, maxWidth: 1100 }}>
      {steps.map((step, i) => {
        const delay = 10 + i * 15;
        const op = interpolate(frame, [delay, delay+22], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const y = interpolate(frame, [delay, delay+22], [20, 0], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
        const arrowDelay = delay + 10;
        const arrowOp = interpolate(frame, [arrowDelay, arrowDelay+12], [0,1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });

        return (
          <React.Fragment key={i}>
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap: 10,
              opacity: op, transform: `translateY(${y}px)`,
            }}>
              <div style={{
                width: 90, height: 90, borderRadius: 12,
                background: "#161B22", border: `2px solid ${color}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow: `0 0 20px ${color}33`,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily:"'Montserrat',sans-serif", textAlign:"center", whiteSpace:"pre-line", lineHeight:1.3 }}>
                  {step}
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#8B949E", fontFamily:"'Montserrat',sans-serif" }}>
                0{i+1}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ fontSize: 24, color, opacity: arrowOp, margin:"0 8px", paddingBottom: 22 }}>→</div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
