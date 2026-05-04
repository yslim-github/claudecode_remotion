import React from "react";
import { VisualType } from "../SceneData";
import { LogoVisual } from "./LogoVisual";
import { CompareVisual } from "./CompareVisual";
import { CardGridVisual } from "./CardGridVisual";
import { ArchitectureVisual } from "./ArchitectureVisual";
import { AgentListVisual } from "./AgentListVisual";
import { FlowVisual } from "./FlowVisual";
import { TerminalVisual } from "./TerminalVisual";
import { MobileFrameVisual } from "./MobileFrameVisual";
import { DashboardVisual } from "./DashboardVisual";
import { ClosingVisual } from "./ClosingVisual";

type Props = { visualType: VisualType; visualData: Record<string, unknown> };

export const VisualDispatch: React.FC<Props> = ({ visualType, visualData: d }) => {
  switch (visualType) {
    case "logo":
      return <LogoVisual tagline={d.tagline as string} />;
    case "compare":
      return <CompareVisual left={d.left as any} right={d.right as any} />;
    case "card-grid":
      return <CardGridVisual title={d.title as string} cols={d.cols as number} cards={d.cards as any} accent={d.accent as string} />;
    case "architecture":
      return <ArchitectureVisual nodes={d.nodes as any} />;
    case "agent-list":
      return <AgentListVisual header={d.header as string} items={d.items as string[]} accent={d.accent as string} />;
    case "flow":
      return <FlowVisual steps={d.steps as string[]} color={d.color as string} />;
    case "terminal":
      return <TerminalVisual title={d.title as string} commands={d.commands as string[]} />;
    case "mobile-frame":
      return <MobileFrameVisual screens={d.screens as string[]} />;
    case "dashboard":
      return <DashboardVisual kpis={d.kpis as string[]} skills={d.skills as string[]} />;
    case "closing":
      return <ClosingVisual lines={d.lines as string[]} tagline={d.tagline as string} />;
    default:
      return null;
  }
};
