import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { MarsGraphic } from "../graphics/MarsGraphic";

export const Scene6_Mars: React.FC = () => (
  <SceneLayout
    year="2026+"
    title="다행성 인류의 시대"
    subtitle="화성 이주 계획 — 두 번째 고향을 향한 도전"
    graphic={<MarsGraphic />}
    accentColor="#FF4D00"
  />
);
