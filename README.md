# AI 캐릭터 포트폴리오

정적 HTML, CSS, JavaScript로 동작하는 개인 포트폴리오입니다. `index.html`을 열거나 GitHub Pages에 배포하면 됩니다.

## 이번 상단 개편

- 제작자 소개와 입문 캐릭터를 하나의 히어로 영역으로 결합
- 카드형 통계 대신 작은 요약 정보로 정리
- 첫 번째 `featured: true` 캐릭터를 입문 캐릭터로 자동 노출
- 나머지 추천 캐릭터는 `이어 만나볼 캐릭터` 섹션에 노출
- 입문 캐릭터에서 캐릭터 상세 및 연결 세계관으로 바로 이동
- 모바일에서는 제작자 소개와 입문 캐릭터가 세로로 배치

## 제작자 정보 수정

`assets/data.js` 상단에서 수정합니다.

```js
site: {
  title: "별개의 서재",
  description: "다정한 파국과 오래 남는 관계를 수집하는 AI 캐릭터 아카이브"
},
creator: {
  avatar: "profile/profile.png",
  fallbackText: "별",
  name: "별가루 공방",
  handle: "@stardust_archive",
  bio: ["첫 번째 소개 문단", "두 번째 소개 문단"],
  links: [
    { id: "twitter", url: "https://x.com/..." }
  ]
}
```

프로필 PNG는 `images/profile/`에 넣고 `avatar` 경로를 지정합니다. 이미지 경로가 비어 있거나 파일을 찾지 못하면 `fallbackText`가 표시됩니다.

프로필 링크 종류는 `profileLinkServices`에서 관리하고, 제작자는 `creator.links`에서 서비스 ID와 URL을 연결합니다.

## 이미지 폴더

모든 이미지는 PNG를 사용합니다.

```text
images/
├── characters/
├── platforms/
├── profile/
└── worlds/
```

## 고정 플랫폼 ID

아래 플랫폼 ID는 캐릭터 데이터와 아이콘을 연결하므로 임의로 변경하지 않습니다.

```text
bloom
caveduck
rofan
tingle
```
