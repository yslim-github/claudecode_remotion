import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { HubbleGraphic } from "../graphics/HubbleGraphic";

export const Scene4_Hubble: React.FC = () => (
  <SceneLayout
    sceneId="scene4"
    year="1990"
    title="우주의 눈을 뜨다"
    subtitle="허블 우주 망원경 — 수십억 광년을 품은 시선"
    graphic={<HubbleGraphic />}
  />
);
