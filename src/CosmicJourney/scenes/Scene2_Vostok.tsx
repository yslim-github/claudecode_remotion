import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { VostokGraphic } from "../graphics/VostokGraphic";

export const Scene2_Vostok: React.FC = () => (
  <SceneLayout
    sceneId="scene2"
    year="1961"
    title="지구 궤도의 첫 인간"
    subtitle="보스토크 1호 — 유리 가가린, 108분의 여정"
    graphic={<VostokGraphic />}
  />
);
