import React from "react";
import { SceneLayout } from "../components/SceneLayout";
import { SputnikGraphic } from "../graphics/SputnikGraphic";

export const Scene1_Sputnik: React.FC = () => (
  <SceneLayout
    year="1957"
    title="우주 시대의 개막"
    subtitle="스푸트니크 1호 — 인류 최초의 인공위성"
    graphic={<SputnikGraphic />}
  />
);
