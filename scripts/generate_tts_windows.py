"""
로컬 Windows에서 실행하세요:
  pip install edge-tts
  python scripts/generate_tts_windows.py

생성된 파일을 public/audio/, public/subtitles/ 에 넣고 커밋하세요.
"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"

SCRIPTS = [
    {
        "id": "scene1",
        "text": "1957년, 소련이 발사한 스푸트니크 1호. 인류 최초의 인공위성이 지구 궤도에 오르며 우주 시대의 문을 열었습니다. 작은 금속 구체 하나가 온 세상의 시선을 밤하늘로 향하게 했습니다."
    },
    {
        "id": "scene2",
        "text": "1961년, 유리 가가린은 보스토크 1호를 타고 지구 궤도를 완주했습니다. 단 108분간의 여정으로 그는 별을 향한 인류의 첫 발자국을 남겼습니다."
    },
    {
        "id": "scene3",
        "text": "1969년 7월 20일, 닐 암스트롱이 달 표면에 첫 발을 내딛었습니다. 고요의 바다에 새겨진 그 발자국은 인류 역사상 가장 위대한 도전의 증거로 영원히 남을 것입니다."
    },
    {
        "id": "scene4",
        "text": "1990년, 허블 우주 망원경이 지구 궤도에 배치되었습니다. 수십억 광년 너머의 은하를 선명하게 담아내며, 우주의 광활한 비밀을 인류에게 펼쳐 보였습니다."
    },
    {
        "id": "scene5",
        "text": "2021년, 제임스 웹 우주 망원경이 우주로 향했습니다. 138억 년 전 빅뱅 직후의 빛을 포착하며 시간의 시작, 그 경이로운 순간을 향한 시선을 열었습니다."
    },
    {
        "id": "scene6",
        "text": "2026년 이후, 인류는 화성을 향해 나아갑니다. 지구를 넘어 두 번째 고향을 꿈꾸는 다행성 인류의 시대가 지금 시작되고 있습니다."
    }
]

async def generate(script, audio_dir, subtitle_dir):
    audio_path = os.path.join(audio_dir, f"{script['id']}.mp3")
    srt_path = os.path.join(subtitle_dir, f"{script['id']}.srt")

    communicate = edge_tts.Communicate(script["text"], VOICE, rate="-5%")
    sub_maker = edge_tts.SubMaker()

    with open(audio_path, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                sub_maker.feed(chunk)

    with open(srt_path, "w", encoding="utf-8") as f:
        f.write(sub_maker.get_srt())

    print(f"✓ {script['id']}: {audio_path}")

async def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    audio_dir = os.path.join(base, "public", "audio")
    subtitle_dir = os.path.join(base, "public", "subtitles")
    os.makedirs(audio_dir, exist_ok=True)
    os.makedirs(subtitle_dir, exist_ok=True)

    for script in SCRIPTS:
        await generate(script, audio_dir, subtitle_dir)

    print("\n완료! public/audio/ 와 public/subtitles/ 를 확인하세요.")

asyncio.run(main())
