export type VisualType =
  | "logo"
  | "compare"
  | "card-grid"
  | "architecture"
  | "agent-list"
  | "flow"
  | "terminal"
  | "mobile-frame"
  | "dashboard"
  | "closing";

export type SceneItem = {
  id: number;
  title: string;
  narration: string;
  subtitle: string;
  visualType: VisualType;
  visualData: Record<string, unknown>;
};

export const SCENES: SceneItem[] = [
  {
    id: 1,
    title: "오프닝",
    narration: `요즘 AI 도구는 단순히 글을 써주는 수준을 넘어, 실제 화면과 문서를 만들어내는 단계로 이동하고 있습니다. 그 흐름 속에서 주목받는 오픈소스가 있습니다. 바로 Open Design입니다. 오늘 영상에서는 Open Design이 무엇이고, 왜 등장했으며, Remotion이나 HyperFrames 같은 영상 제작 워크플로우와 어떻게 연결할 수 있는지 살펴보겠습니다.`,
    subtitle: `AI가 글을 넘어 디자인 산출물까지 만드는 시대. 오늘은 Open Design을 살펴봅니다.`,
    visualType: "logo",
    visualData: { tagline: "오픈소스 AI 디자인 작업대" },
  },
  {
    id: 2,
    title: "문제 제기",
    narration: `AI 디자인 도구는 편리하지만, 대부분 특정 회사의 모델, 특정 클라우드, 특정 결제 구조에 묶여 있습니다. 사용자는 좋은 결과물을 얻을 수 있지만, 내부 구조를 바꾸거나, 다른 모델을 연결하거나, 로컬 환경에서 자유롭게 확장하기는 어렵습니다. Open Design은 바로 이 지점을 겨냥합니다. 디자인 생성의 편리함은 유지하면서, 실행 환경과 에이전트 선택권은 사용자에게 돌려주는 방식입니다.`,
    subtitle: `Open Design의 핵심 질문은 이것입니다. AI 디자인 도구를 내 로컬 환경에서, 내가 원하는 에이전트로 쓸 수 없을까?`,
    visualType: "compare",
    visualData: {
      left: { label: "기존 AI 디자인 도구", icon: "cloud-lock", items: ["특정 모델 고정", "클라우드 종속", "결제 구조 의존"] },
      right: { label: "Open Design", icon: "local-open", items: ["로컬 우선", "에이전트 선택", "오픈소스"] },
    },
  },
  {
    id: 3,
    title: "Open Design이란",
    narration: `Open Design은 Claude Design과 비슷한 아티팩트 중심의 디자인 워크플로우를 오픈소스로 구현하려는 프로젝트입니다. 단순한 프롬프트 입력창이 아니라, 사용자의 요청을 받아 디자인 방향을 정하고, 스킬을 선택하고, 실제 HTML이나 프레젠테이션, 모바일 프로토타입 같은 결과물을 만들어내는 구조입니다. 중요한 점은 자체 AI 모델을 제공하는 것이 아니라, 사용자가 이미 쓰고 있는 코딩 에이전트 CLI를 디자인 엔진처럼 활용한다는 것입니다.`,
    subtitle: `Open Design은 자체 모델이 아니라, 사용자의 코딩 에이전트를 디자인 엔진으로 활용합니다.`,
    visualType: "card-grid",
    visualData: {
      title: "핵심 개념",
      cols: 2,
      cards: [
        { icon: "🖥️", title: "Local-first", desc: "로컬 환경 중심 실행" },
        { icon: "🔑", title: "BYOK", desc: "직접 API 키 연결" },
        { icon: "🛠️", title: "Skills", desc: "산출물 유형별 작업 지침" },
        { icon: "🎨", title: "Design Systems", desc: "일관된 시각 언어 적용" },
      ],
    },
  },
  {
    id: 4,
    title: "로컬 우선 구조",
    narration: `Open Design의 중요한 특징은 로컬 우선입니다. 웹 화면은 브라우저에서 열리지만, 실제 작업은 로컬 데몬과 프로젝트 폴더를 중심으로 진행됩니다. 생성된 파일, 대화, 프로젝트 상태는 로컬의 .od 폴더와 SQLite 데이터베이스에 저장됩니다. 그래서 단순히 클라우드에서 결과만 받는 방식이 아니라, 내 컴퓨터 안에 실제 작업 공간이 만들어지고, 그 안에서 에이전트가 파일을 읽고 쓰는 구조입니다.`,
    subtitle: `Open Design은 로컬 데몬과 .od 폴더를 중심으로 프로젝트를 관리합니다.`,
    visualType: "architecture",
    visualData: {
      nodes: [
        { id: "daemon", label: "Local Daemon", icon: "⚙️" },
        { id: "web", label: "Web App", icon: "🌐" },
        { id: "folder", label: ".od Folder", icon: "📁" },
        { id: "db", label: "SQLite DB", icon: "🗄️" },
      ],
    },
  },
  {
    id: 5,
    title: "에이전트 CLI 연결",
    narration: `Open Design은 특정 모델 하나에 고정되지 않습니다. 설치된 코딩 에이전트 CLI를 PATH에서 자동 감지하고, 그중 하나를 선택해 디자인 작업에 사용합니다. 예를 들어 Claude Code, Codex CLI, Cursor Agent, Gemini CLI, OpenCode, Qwen 같은 도구를 연결할 수 있습니다. 사용자는 자신이 이미 구독 중이거나 이미 세팅해 둔 CLI를 활용할 수 있고, 필요하다면 BYOK 방식으로 API 키를 넣어 대체 경로를 사용할 수도 있습니다.`,
    subtitle: `핵심은 모델 종속이 아니라, 내가 쓰는 CLI를 선택해서 연결하는 것입니다.`,
    visualType: "agent-list",
    visualData: {
      header: "PATH 자동 감지",
      items: ["Claude Code", "Codex CLI", "Cursor Agent", "Gemini CLI", "OpenCode", "Qwen"],
    },
  },
  {
    id: 6,
    title: "Skills 개념",
    narration: `Open Design의 결과물은 그냥 무작위로 생성되지 않습니다. 프로젝트 안에는 여러 Skills가 들어 있습니다. 웹 프로토타입, SaaS 랜딩 페이지, 대시보드, 모바일 앱, 온보딩 화면, 소셜 캐러셀, 매거진 포스터, 프레젠테이션 덱 같은 스킬이 각각 폴더 단위로 구성됩니다. 이 스킬은 에이전트에게 어떤 형식으로 결과물을 만들어야 하는지 알려주는 작업 지침서 역할을 합니다.`,
    subtitle: `Skills는 에이전트가 어떤 종류의 산출물을 만들지 결정하는 작업 지침서입니다.`,
    visualType: "card-grid",
    visualData: {
      title: "Skills 폴더",
      cols: 3,
      cards: [
        { icon: "🖥️", title: "web-prototype", desc: "" },
        { icon: "📊", title: "dashboard", desc: "" },
        { icon: "📱", title: "mobile-app", desc: "" },
        { icon: "📋", title: "guizang-ppt", desc: "" },
        { icon: "🎠", title: "social-carousel", desc: "" },
        { icon: "🖼️", title: "magazine-poster", desc: "" },
      ],
    },
  },
  {
    id: 7,
    title: "Design Systems 개념",
    narration: `또 하나의 핵심은 Design Systems입니다. Open Design은 다양한 브랜드 스타일을 참고할 수 있는 디자인 시스템 파일들을 포함합니다. 사용자는 특정한 분위기나 브랜드 감각을 선택하고, 에이전트는 그 규칙에 맞춰 색상, 타이포그래피, 레이아웃을 구성합니다. 이 방식은 AI가 아무렇게나 예쁜 화면을 만드는 것을 줄이고, 일관된 시각 언어를 유지하도록 돕습니다.`,
    subtitle: `Design Systems는 색상, 폰트, 레이아웃의 일관성을 잡아주는 기준입니다.`,
    visualType: "card-grid",
    visualData: {
      title: "Design Systems",
      cols: 3,
      cards: [
        { icon: "⬡", title: "Linear", desc: "#5E6AD2" },
        { icon: "⬡", title: "Stripe", desc: "#635BFF" },
        { icon: "⬡", title: "Vercel", desc: "#000000" },
        { icon: "⬡", title: "Notion", desc: "#373737" },
        { icon: "⬡", title: "Apple", desc: "#1D1D1F" },
        { icon: "⬡", title: "Custom", desc: "직접 설정" },
      ],
    },
  },
  {
    id: 8,
    title: "작업 흐름",
    narration: `Open Design의 작업 흐름은 꽤 체계적입니다. 사용자가 "투자 유치용 피치덱을 만들어줘" 같은 요청을 입력하면, 바로 결과를 만들기보다 먼저 질문 폼을 띄웁니다. 대상, 톤, 목적, 브랜드 맥락을 확인한 뒤 시각 방향을 고르고, 에이전트가 할 일 목록을 만들고, 실제 산출물을 생성합니다. 마지막에는 샌드박스 iframe에서 결과를 미리 보고, 필요하면 수정하거나 다운로드할 수 있습니다.`,
    subtitle: `프롬프트 → 질문 폼 → 방향 선택 → 작업 계획 → 미리보기 → 내보내기 순서로 진행됩니다.`,
    visualType: "flow",
    visualData: {
      steps: ["프롬프트\n입력", "질문 폼", "방향\n선택", "TODO\n계획", "iframe\n미리보기", "내보내기"],
      color: "#58A6FF",
    },
  },
  {
    id: 9,
    title: "설치와 실행",
    narration: `설치는 일반적인 Node 프로젝트와 비슷합니다. 저장소를 클론하고, open-design 폴더로 이동한 다음, corepack을 활성화하고 pnpm install을 실행합니다. 그다음 pnpm tools-dev run web 명령으로 로컬 데몬과 웹 화면을 실행합니다. 실행 후 출력되는 웹 주소를 브라우저에서 열면 Open Design의 시작 화면을 볼 수 있습니다.`,
    subtitle: `기본 흐름은 clone, install, run web입니다. 실행 후 브라우저에서 로컬 주소를 엽니다.`,
    visualType: "terminal",
    visualData: {
      title: "Terminal",
      commands: [
        "git clone https://github.com/open-design-systems/open-design",
        "cd open-design",
        "corepack enable",
        "pnpm install",
        "pnpm tools-dev run web",
        "# → http://localhost:3000 열기",
      ],
    },
  },
  {
    id: 10,
    title: "Windows 사용자의 관점",
    narration: `Windows에서 사용할 때는 Node와 pnpm 버전을 먼저 확인하는 것이 좋습니다. Open Design README는 Node 24 계열과 pnpm 10.33.x 환경을 기준으로 안내합니다. 또한 Codex나 Claude Code 같은 CLI를 연결하려면, 해당 실행 파일이 PowerShell의 PATH에서 제대로 잡혀야 합니다. 즉, Open Design 자체보다 먼저 로컬 개발 환경과 에이전트 CLI 경로를 안정적으로 맞추는 것이 중요합니다.`,
    subtitle: `Windows에서는 Node, pnpm, 에이전트 CLI PATH 확인이 먼저입니다.`,
    visualType: "terminal",
    visualData: {
      title: "PowerShell",
      commands: [
        "where node      # → v24.x.x 필요",
        "where pnpm      # → v10.33.x 필요",
        "where codex     # → CLI PATH 확인",
        "where claude    # → Claude Code 확인",
        "# Node 없으면: winget install OpenJS.NodeJS",
        "# pnpm 없으면: npm install -g pnpm",
      ],
    },
  },
  {
    id: 11,
    title: "첫 번째 활용: 피치덱",
    narration: `첫 번째 활용 사례는 피치덱입니다. 예를 들어 "AI 기반 HR SaaS의 시드 투자용 매거진 스타일 피치덱을 만들어줘"라고 입력할 수 있습니다. Open Design은 deck 모드의 스킬을 사용해 프레젠테이션 구조를 만들고, 디자인 시스템을 적용해 시각 스타일을 잡습니다. 결과는 웹에서 미리 보고, PDF나 PPTX 형태로 내보내는 식으로 활용할 수 있습니다.`,
    subtitle: `피치덱은 Open Design의 대표적인 활용 사례입니다. 기획, 디자인, 내보내기를 한 흐름으로 처리합니다.`,
    visualType: "card-grid",
    visualData: {
      title: "피치덱 슬라이드 구성",
      cols: 3,
      cards: [
        { icon: "🏷️", title: "Cover", desc: "브랜드 · 슬로건" },
        { icon: "❓", title: "Problem", desc: "문제 정의" },
        { icon: "💡", title: "Solution", desc: "솔루션 제시" },
        { icon: "📈", title: "Market", desc: "시장 규모" },
        { icon: "💰", title: "Revenue", desc: "수익 모델" },
        { icon: "🗺️", title: "Roadmap", desc: "실행 계획" },
      ],
    },
  },
  {
    id: 12,
    title: "두 번째 활용: 모바일 앱 프로토타입",
    narration: `두 번째 활용은 모바일 앱 프로토타입입니다. 사용자가 앱 아이디어를 입력하면, Open Design은 모바일 프레임과 화면 구조를 사용해 여러 화면의 시안을 만들 수 있습니다. 온보딩, 로그인, 홈 화면, 상세 화면처럼 서비스의 기본 흐름을 시각적으로 확인할 수 있습니다. 기획자나 개발자가 초기 아이디어를 빠르게 검토할 때 특히 유용합니다.`,
    subtitle: `앱 아이디어를 입력하면 모바일 화면 흐름을 빠르게 시각화할 수 있습니다.`,
    visualType: "mobile-frame",
    visualData: {
      screens: ["온보딩", "로그인", "대시보드", "상세 화면"],
    },
  },
  {
    id: 13,
    title: "세 번째 활용: 대시보드와 업무 문서",
    narration: `세 번째 활용은 대시보드와 업무 문서입니다. Open Design에는 dashboard, finance-report, team-okrs, hr-onboarding, kanban-board 같은 업무형 스킬도 포함되어 있습니다. 그래서 단순히 예쁜 랜딩 페이지만 만드는 것이 아니라, 실제 회사 업무에서 쓰는 보고서, 운영 문서, 관리 화면까지 생성할 수 있습니다. HR, 재무, 제품, 엔지니어링 팀 모두 활용 가능성이 있습니다.`,
    subtitle: `대시보드, 보고서, OKR, HR 온보딩 같은 업무형 산출물도 만들 수 있습니다.`,
    visualType: "dashboard",
    visualData: {
      kpis: ["DAU +24%", "MRR $48K", "Churn 1.2%"],
      skills: ["dashboard", "finance-report", "team-okrs", "hr-onboarding", "kanban-board"],
    },
  },
  {
    id: 14,
    title: "영상 제작과의 연결",
    narration: `여기서 Remotion 사용자에게 중요한 연결점이 생깁니다. Open Design으로 만든 HTML 스타일의 화면, 카드, 포스터, 프레젠테이션 구성을 Remotion의 영상 장면으로 옮길 수 있습니다. 예를 들어 피치덱을 만들고, 각 슬라이드를 Remotion 컴포지션으로 변환한 다음, 음성 나레이션과 자막을 붙여 MP4로 렌더링할 수 있습니다. 즉 Open Design은 영상의 시각 자료를 빠르게 만드는 사전 제작 도구가 될 수 있습니다.`,
    subtitle: `Open Design은 Remotion 영상의 시각 자료를 빠르게 만드는 사전 제작 도구가 될 수 있습니다.`,
    visualType: "flow",
    visualData: {
      steps: ["Open\nDesign", "HTML\n시각자료", "Remotion\n컴포지션", "TTS\n음성", "자막\n싱크", "MP4\n렌더"],
      color: "#3FB950",
    },
  },
  {
    id: 15,
    title: "Remotion 구성 아이디어",
    narration: `Remotion에서는 장면을 데이터 배열로 나누어 관리하면 편합니다. 각 장면에는 시작 시간, 종료 시간, 화면 설명, 나레이션, 자막을 넣습니다. 그런 다음 Sequence 컴포넌트로 장면을 배치하고, Audio 컴포넌트로 TTS 음성 파일을 삽입하고, 자막은 현재 프레임에 맞춰 표시합니다. Open Design에서 만든 이미지를 배경으로 넣거나, HTML 레이아웃을 React 컴포넌트로 재구성하면 자동화하기 쉽습니다.`,
    subtitle: `장면 데이터, 음성 파일, 자막 배열을 분리하면 Remotion 영상 제작이 쉬워집니다.`,
    visualType: "terminal",
    visualData: {
      title: "scenes.ts · captions.ts · Remotion",
      commands: [
        "// scenes.ts",
        "const scenes = [{ id:1, title:'오프닝',",
        "  narration:'...', subtitle:'...' }]",
        "",
        "// Remotion composition",
        "<AbsoluteFill>",
        "  <Sequence from={0} durationInFrames={900}>",
        "    <Audio src={staticFile('scene1.mp3')} />",
        "    {/* interpolate, Easing.bezier */}",
        "  </Sequence>",
        "</AbsoluteFill>",
      ],
    },
  },
  {
    id: 16,
    title: "장점 정리",
    narration: `Open Design의 장점은 분명합니다. 첫째, 오픈소스이기 때문에 구조를 보고 수정할 수 있습니다. 둘째, 로컬 우선 구조라 내 프로젝트 파일을 직접 다룰 수 있습니다. 셋째, 특정 모델에 고정되지 않고 여러 CLI 에이전트를 연결할 수 있습니다. 넷째, Skills와 Design Systems 덕분에 결과물이 더 체계적입니다. 다섯째, HTML, PDF, PPTX, ZIP 같은 형식으로 산출물을 가져갈 수 있습니다.`,
    subtitle: `오픈소스, 로컬 우선, 에이전트 선택, 디자인 시스템, 다양한 내보내기가 핵심 장점입니다.`,
    visualType: "card-grid",
    visualData: {
      title: "Open Design 장점 5가지",
      cols: 3,
      accent: "#3FB950",
      cards: [
        { icon: "🔓", title: "오픈소스", desc: "구조 열람·수정 가능" },
        { icon: "🖥️", title: "로컬 우선", desc: "내 파일 직접 관리" },
        { icon: "🔗", title: "에이전트 선택", desc: "CLI 자유 연결" },
        { icon: "🎨", title: "디자인 시스템", desc: "일관된 결과물" },
        { icon: "📤", title: "내보내기", desc: "HTML·PDF·PPTX·ZIP" },
      ],
    },
  },
  {
    id: 17,
    title: "주의할 점",
    narration: `하지만 주의할 점도 있습니다. Open Design은 아직 빠르게 변화하는 오픈소스 프로젝트입니다. 설치 과정에서 Node 버전, pnpm 버전, native dependency, 에이전트 CLI 경로 문제가 생길 수 있습니다. 또한 AI가 만든 디자인은 반드시 사람이 검수해야 합니다. 브랜드 일관성, 문구 정확성, 접근성, 저작권, 실제 구현 가능성을 확인해야 최종 산출물로 사용할 수 있습니다.`,
    subtitle: `설치 환경과 결과물 검수는 필수입니다. AI 디자인은 자동 완성이 아니라 초안 생성에 가깝습니다.`,
    visualType: "agent-list",
    visualData: {
      header: "⚠️ 주의사항",
      accent: "#FF7B72",
      items: ["Node 버전 호환성", "pnpm 버전 호환성", "CLI PATH 설정", "API key 관리", "결과물 검수 필수"],
    },
  },
  {
    id: 18,
    title: "추천 대상",
    narration: `Open Design은 특히 빠른 초안이 필요한 사람에게 잘 맞습니다. 스타트업 창업자는 피치덱을 빠르게 만들 수 있고, 기획자는 앱 화면 흐름을 시각화할 수 있습니다. 개발자는 제품 아이디어를 HTML 프로토타입으로 확인할 수 있고, 1인 창작자는 카드뉴스나 영상용 시각 자료를 만들 수 있습니다. 이미 Codex, Claude Code, Gemini CLI 같은 도구를 쓰고 있다면 활용 가능성은 더 커집니다.`,
    subtitle: `피치덱, 앱 프로토타입, 업무 문서, 영상 자료가 필요한 사람에게 특히 유용합니다.`,
    visualType: "card-grid",
    visualData: {
      title: "추천 대상",
      cols: 3,
      cards: [
        { icon: "📋", title: "기획자", desc: "앱 화면 흐름 시각화" },
        { icon: "💻", title: "개발자", desc: "HTML 프로토타입 검토" },
        { icon: "🎨", title: "디자이너", desc: "빠른 시안 초안 생성" },
        { icon: "🎬", title: "1인 창작자", desc: "영상·카드뉴스 자료" },
        { icon: "🚀", title: "스타트업 팀", desc: "피치덱·랜딩 페이지" },
      ],
    },
  },
  {
    id: 19,
    title: "실전 워크플로우 제안",
    narration: `실전에서는 이렇게 사용할 수 있습니다. 먼저 영상 주제나 제품 아이디어를 정합니다. 다음으로 Open Design에서 피치덱, 랜딩 페이지, 모바일 앱 화면, 포스터 같은 시각 자료를 만듭니다. 생성된 결과를 검수하고 필요한 부분을 수정합니다. 그다음 Remotion에서 장면별로 배치하고, TTS 음성과 자막을 연결합니다. 마지막으로 MP4로 렌더링하면 설명형 영상이나 홍보 영상을 빠르게 만들 수 있습니다.`,
    subtitle: `Open Design으로 시각 자료를 만들고, Remotion으로 음성·자막·렌더링을 완성합니다.`,
    visualType: "flow",
    visualData: {
      steps: ["아이디어\n입력", "Open Design\n생성", "결과\n검수", "Remotion\n편집", "MP4\n렌더링"],
      color: "#E3B341",
    },
  },
  {
    id: 20,
    title: "클로징",
    narration: `정리하면, Open Design은 단순한 디자인 생성기가 아니라, 로컬 에이전트와 스킬, 디자인 시스템을 묶어 실제 산출물을 만드는 오픈소스 디자인 작업대입니다. 아직 완성형 상용 서비스처럼 매끄럽지는 않을 수 있지만, 내가 쓰는 모델과 CLI를 연결하고, 결과물을 직접 소유하며, 영상 제작 파이프라인까지 확장할 수 있다는 점에서 매우 흥미로운 프로젝트입니다. AI 디자인을 내 손안의 로컬 워크플로우로 가져오고 싶다면, Open Design은 충분히 테스트해볼 만한 선택지입니다.`,
    subtitle: `Open Design은 로컬 에이전트 기반의 오픈소스 디자인 작업대입니다. 영상 제작 파이프라인과도 잘 연결됩니다.`,
    visualType: "closing",
    visualData: {
      lines: [
        "Open Design",
        "→  Local AI Design Studio",
        "→  Remotion Video Pipeline",
      ],
      tagline: "오픈소스 디자인 워크플로우의 시작점",
    },
  },
];
