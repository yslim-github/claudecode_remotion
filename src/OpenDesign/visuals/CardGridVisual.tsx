import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

type Card = { icon: string; title: string; desc: string };
type Props = { title?: string; cols?: number; cards: Card[]; accent?: string };

export const CardGridVisual: React.FC<Props> = ({ title, cols = 2, cards, accent = "#58A6FF" }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [5, 25], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap: 28, width:"100%" }}>
      {title && (
        <div style={{ fontSize: 26, fontWeight: 600, color: accent, fontFamily:"'Montserrat',sans-serif", opacity: titleOp, letterSpacing:"0.06em" }}>
          {title}
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20, width: cols === 3 ? 840 : 640 }}>
        {cards.map((card, i) => {
          const delay = 15 + i * 8;
          const op = interpolate(frame, [delay, delay + 22], [0, 1], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
          const y = interpolate(frame, [delay, delay + 22], [20, 0], { easing: Easing.bezier(0.16,1,0.3,1), extrapolateLeft:"clamp", extrapolateRight:"clamp" });
          return (
            <div key={i} style={{
              background: "#161B22", border: `1px solid #30363D`,
              borderRadius: 12, padding: "20px 22px",
              display:"flex", flexDirection:"column", gap: 8,
              opacity: op, transform: `translateY(${y}px)`,
            }}>
              <div style={{ fontSize: 30 }}>{card.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#E6EDF3", fontFamily:"'Montserrat',sans-serif" }}>{card.title}</div>
              {card.desc && (
                <div style={{ fontSize: 14, color: "#8B949E", fontFamily:"'Montserrat',sans-serif" }}>{card.desc}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
