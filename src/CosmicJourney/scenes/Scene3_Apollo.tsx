import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { ApolloGraphic } from "../graphics/ApolloGraphic";

export const Scene3_Apollo: React.FC = () => (
  <SceneLayout
    sceneId="scene3"
    year="1969"
    title="고요의 바다에 새긴 발자국"
    subtitle="아폴로 11호 — 닐 암스트롱의 한 걸음"
    graphic={<ApolloGraphic />}
  />
);
