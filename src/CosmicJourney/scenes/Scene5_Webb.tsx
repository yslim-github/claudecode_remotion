import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { WebbGraphic } from "../graphics/WebbGraphic";

export const Scene5_Webb: React.FC = () => (
  <SceneLayout
    year="2021"
    title="시간의 시작을 향한 시선"
    subtitle="제임스 웹 우주 망원경 — 138억 년의 빛을 포착하다"
    graphic={<WebbGraphic />}
    accentColor="#FFB800"
  />
);
