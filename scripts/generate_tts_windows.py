"""
로컬 Windows에서 실행:
  pip install edge-tts
  python scripts/generate_tts_windows.py

생성 완료 후 public/audio/, public/subtitles/ 파일을 확인하세요.
"""

import asyncio, edge_tts, os

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = [
    {"id": "scene1",  "text": "요즘 AI 도구는 단순히 글을 써주는 수준을 넘어, 실제 화면과 문서를 만들어내는 단계로 이동하고 있습니다. 그 흐름 속에서 주목받는 오픈소스가 있습니다. 바로 Open Design입니다. 오늘 영상에서는 Open Design이 무엇이고, 왜 등장했으며, Remotion이나 HyperFrames 같은 영상 제작 워크플로우와 어떻게 연결할 수 있는지 살펴보겠습니다."},
    {"id": "scene2",  "text": "AI 디자인 도구는 편리하지만, 대부분 특정 회사의 모델, 특정 클라우드, 특정 결제 구조에 묶여 있습니다. 사용자는 좋은 결과물을 얻을 수 있지만, 내부 구조를 바꾸거나, 다른 모델을 연결하거나, 로컬 환경에서 자유롭게 확장하기는 어렵습니다. Open Design은 바로 이 지점을 겨냥합니다. 디자인 생성의 편리함은 유지하면서, 실행 환경과 에이전트 선택권은 사용자에게 돌려주는 방식입니다."},
    {"id": "scene3",  "text": "Open Design은 Claude Design과 비슷한 아티팩트 중심의 디자인 워크플로우를 오픈소스로 구현하려는 프로젝트입니다. 단순한 프롬프트 입력창이 아니라, 사용자의 요청을 받아 디자인 방향을 정하고, 스킬을 선택하고, 실제 HTML이나 프레젠테이션, 모바일 프로토타입 같은 결과물을 만들어내는 구조입니다. 중요한 점은 자체 AI 모델을 제공하는 것이 아니라, 사용자가 이미 쓰고 있는 코딩 에이전트 CLI를 디자인 엔진처럼 활용한다는 것입니다."},
    {"id": "scene4",  "text": "Open Design의 중요한 특징은 로컬 우선입니다. 웹 화면은 브라우저에서 열리지만, 실제 작업은 로컬 데몬과 프로젝트 폴더를 중심으로 진행됩니다. 생성된 파일, 대화, 프로젝트 상태는 로컬의 .od 폴더와 SQLite 데이터베이스에 저장됩니다. 그래서 단순히 클라우드에서 결과만 받는 방식이 아니라, 내 컴퓨터 안에 실제 작업 공간이 만들어지고, 그 안에서 에이전트가 파일을 읽고 쓰는 구조입니다."},
    {"id": "scene5",  "text": "Open Design은 특정 모델 하나에 고정되지 않습니다. 설치된 코딩 에이전트 CLI를 PATH에서 자동 감지하고, 그중 하나를 선택해 디자인 작업에 사용합니다. 예를 들어 Claude Code, Codex CLI, Cursor Agent, Gemini CLI, OpenCode, Qwen 같은 도구를 연결할 수 있습니다. 사용자는 자신이 이미 구독 중이거나 이미 세팅해 둔 CLI를 활용할 수 있고, 필요하다면 BYOK 방식으로 API 키를 넣어 대체 경로를 사용할 수도 있습니다."},
    {"id": "scene6",  "text": "Open Design의 결과물은 그냥 무작위로 생성되지 않습니다. 프로젝트 안에는 여러 Skills가 들어 있습니다. 웹 프로토타입, SaaS 랜딩 페이지, 대시보드, 모바일 앱, 온보딩 화면, 소셜 캐러셀, 매거진 포스터, 프레젠테이션 덱 같은 스킬이 각각 폴더 단위로 구성됩니다. 이 스킬은 에이전트에게 어떤 형식으로 결과물을 만들어야 하는지 알려주는 작업 지침서 역할을 합니다."},
    {"id": "scene7",  "text": "또 하나의 핵심은 Design Systems입니다. Open Design은 다양한 브랜드 스타일을 참고할 수 있는 디자인 시스템 파일들을 포함합니다. 사용자는 특정한 분위기나 브랜드 감각을 선택하고, 에이전트는 그 규칙에 맞춰 색상, 타이포그래피, 레이아웃을 구성합니다. 이 방식은 AI가 아무렇게나 예쁜 화면을 만드는 것을 줄이고, 일관된 시각 언어를 유지하도록 돕습니다."},
    {"id": "scene8",  "text": "Open Design의 작업 흐름은 꽤 체계적입니다. 사용자가 투자 유치용 피치덱을 만들어줘 같은 요청을 입력하면, 바로 결과를 만들기보다 먼저 질문 폼을 띄웁니다. 대상, 톤, 목적, 브랜드 맥락을 확인한 뒤 시각 방향을 고르고, 에이전트가 할 일 목록을 만들고, 실제 산출물을 생성합니다. 마지막에는 샌드박스 iframe에서 결과를 미리 보고, 필요하면 수정하거나 다운로드할 수 있습니다."},
    {"id": "scene9",  "text": "설치는 일반적인 Node 프로젝트와 비슷합니다. 저장소를 클론하고, open-design 폴더로 이동한 다음, corepack을 활성화하고 pnpm install을 실행합니다. 그다음 pnpm tools-dev run web 명령으로 로컬 데몬과 웹 화면을 실행합니다. 실행 후 출력되는 웹 주소를 브라우저에서 열면 Open Design의 시작 화면을 볼 수 있습니다."},
    {"id": "scene10", "text": "Windows에서 사용할 때는 Node와 pnpm 버전을 먼저 확인하는 것이 좋습니다. Open Design README는 Node 24 계열과 pnpm 10.33.x 환경을 기준으로 안내합니다. 또한 Codex나 Claude Code 같은 CLI를 연결하려면, 해당 실행 파일이 PowerShell의 PATH에서 제대로 잡혀야 합니다. 즉, Open Design 자체보다 먼저 로컬 개발 환경과 에이전트 CLI 경로를 안정적으로 맞추는 것이 중요합니다."},
    {"id": "scene11", "text": "첫 번째 활용 사례는 피치덱입니다. 예를 들어 AI 기반 HR SaaS의 시드 투자용 매거진 스타일 피치덱을 만들어줘라고 입력할 수 있습니다. Open Design은 deck 모드의 스킬을 사용해 프레젠테이션 구조를 만들고, 디자인 시스템을 적용해 시각 스타일을 잡습니다. 결과는 웹에서 미리 보고, PDF나 PPTX 형태로 내보내는 식으로 활용할 수 있습니다."},
    {"id": "scene12", "text": "두 번째 활용은 모바일 앱 프로토타입입니다. 사용자가 앱 아이디어를 입력하면, Open Design은 모바일 프레임과 화면 구조를 사용해 여러 화면의 시안을 만들 수 있습니다. 온보딩, 로그인, 홈 화면, 상세 화면처럼 서비스의 기본 흐름을 시각적으로 확인할 수 있습니다. 기획자나 개발자가 초기 아이디어를 빠르게 검토할 때 특히 유용합니다."},
    {"id": "scene13", "text": "세 번째 활용은 대시보드와 업무 문서입니다. Open Design에는 dashboard, finance-report, team-okrs, hr-onboarding, kanban-board 같은 업무형 스킬도 포함되어 있습니다. 그래서 단순히 예쁜 랜딩 페이지만 만드는 것이 아니라, 실제 회사 업무에서 쓰는 보고서, 운영 문서, 관리 화면까지 생성할 수 있습니다. HR, 재무, 제품, 엔지니어링 팀 모두 활용 가능성이 있습니다."},
    {"id": "scene14", "text": "여기서 Remotion 사용자에게 중요한 연결점이 생깁니다. Open Design으로 만든 HTML 스타일의 화면, 카드, 포스터, 프레젠테이션 구성을 Remotion의 영상 장면으로 옮길 수 있습니다. 예를 들어 피치덱을 만들고, 각 슬라이드를 Remotion 컴포지션으로 변환한 다음, 음성 나레이션과 자막을 붙여 MP4로 렌더링할 수 있습니다. 즉 Open Design은 영상의 시각 자료를 빠르게 만드는 사전 제작 도구가 될 수 있습니다."},
    {"id": "scene15", "text": "Remotion에서는 장면을 데이터 배열로 나누어 관리하면 편합니다. 각 장면에는 시작 시간, 종료 시간, 화면 설명, 나레이션, 자막을 넣습니다. 그런 다음 Sequence 컴포넌트로 장면을 배치하고, Audio 컴포넌트로 TTS 음성 파일을 삽입하고, 자막은 현재 프레임에 맞춰 표시합니다. Open Design에서 만든 이미지를 배경으로 넣거나, HTML 레이아웃을 React 컴포넌트로 재구성하면 자동화하기 쉽습니다."},
    {"id": "scene16", "text": "Open Design의 장점은 분명합니다. 첫째, 오픈소스이기 때문에 구조를 보고 수정할 수 있습니다. 둘째, 로컬 우선 구조라 내 프로젝트 파일을 직접 다룰 수 있습니다. 셋째, 특정 모델에 고정되지 않고 여러 CLI 에이전트를 연결할 수 있습니다. 넷째, Skills와 Design Systems 덕분에 결과물이 더 체계적입니다. 다섯째, HTML, PDF, PPTX, ZIP 같은 형식으로 산출물을 가져갈 수 있습니다."},
    {"id": "scene17", "text": "하지만 주의할 점도 있습니다. Open Design은 아직 빠르게 변화하는 오픈소스 프로젝트입니다. 설치 과정에서 Node 버전, pnpm 버전, native dependency, 에이전트 CLI 경로 문제가 생길 수 있습니다. 또한 AI가 만든 디자인은 반드시 사람이 검수해야 합니다. 브랜드 일관성, 문구 정확성, 접근성, 저작권, 실제 구현 가능성을 확인해야 최종 산출물로 사용할 수 있습니다."},
    {"id": "scene18", "text": "Open Design은 특히 빠른 초안이 필요한 사람에게 잘 맞습니다. 스타트업 창업자는 피치덱을 빠르게 만들 수 있고, 기획자는 앱 화면 흐름을 시각화할 수 있습니다. 개발자는 제품 아이디어를 HTML 프로토타입으로 확인할 수 있고, 1인 창작자는 카드뉴스나 영상용 시각 자료를 만들 수 있습니다. 이미 Codex, Claude Code, Gemini CLI 같은 도구를 쓰고 있다면 활용 가능성은 더 커집니다."},
    {"id": "scene19", "text": "실전에서는 이렇게 사용할 수 있습니다. 먼저 영상 주제나 제품 아이디어를 정합니다. 다음으로 Open Design에서 피치덱, 랜딩 페이지, 모바일 앱 화면, 포스터 같은 시각 자료를 만듭니다. 생성된 결과를 검수하고 필요한 부분을 수정합니다. 그다음 Remotion에서 장면별로 배치하고, TTS 음성과 자막을 연결합니다. 마지막으로 MP4로 렌더링하면 설명형 영상이나 홍보 영상을 빠르게 만들 수 있습니다."},
    {"id": "scene20", "text": "정리하면, Open Design은 단순한 디자인 생성기가 아니라, 로컬 에이전트와 스킬, 디자인 시스템을 묶어 실제 산출물을 만드는 오픈소스 디자인 작업대입니다. 아직 완성형 상용 서비스처럼 매끄럽지는 않을 수 있지만, 내가 쓰는 모델과 CLI를 연결하고, 결과물을 직접 소유하며, 영상 제작 파이프라인까지 확장할 수 있다는 점에서 매우 흥미로운 프로젝트입니다. AI 디자인을 내 손안의 로컬 워크플로우로 가져오고 싶다면, Open Design은 충분히 테스트해볼 만한 선택지입니다."},
]

async def generate(script, audio_dir, sub_dir):
    communicate = edge_tts.Communicate(script["text"], VOICE, rate="-5%")
    sub_maker = edge_tts.SubMaker()
    with open(os.path.join(audio_dir, f"{script['id']}.mp3"), "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                sub_maker.feed(chunk)
    with open(os.path.join(sub_dir, f"{script['id']}.srt"), "w", encoding="utf-8") as f:
        f.write(sub_maker.get_srt())
    print(f"✓ {script['id']}")

async def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    audio_dir = os.path.join(base, "public", "audio")
    sub_dir   = os.path.join(base, "public", "subtitles")
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs(sub_dir, exist_ok=True)
    for s in SCRIPTS:
        await generate(s, audio_dir, sub_dir)
    print("\n완료! public/audio/ 와 public/subtitles/ 를 확인하세요.")

asyncio.run(main())
