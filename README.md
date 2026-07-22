# 세계관 기능 패치

## GitHub에서 교체할 파일

- `index.html`
- `assets/app.js`
- `assets/styles.css`
- `assets/data.js`
- `images/worlds/astral-crown.svg`
- `images/worlds/after-network.svg`
- `images/worlds/midnight-index.svg`

기존 `images/platforms`와 캐릭터 이미지 파일은 교체할 필요가 없습니다.

## 데이터 구조

최상단 `worlds` 배열에서 세계관을 관리합니다.

```js
worlds: [
  {
    id: "astral-crown",
    name: "별의 왕관",
    subtitle: "사라진 별과 패전국을 둘러싼 왕국 연대기",
    image: "worlds/astral-crown.svg",
    tags: ["왕국", "천문", "정치극"],
    description: ["첫 문단", "두 번째 문단"],
    sections: [
      {
        title: "세계의 핵심",
        content: ["섹션 본문"]
      }
    ]
  }
]
```

캐릭터에는 선택적으로 `worldId` 한 줄만 추가합니다.

```js
{
  id: "lyra",
  worldId: "astral-crown",
  name: "리라 베일"
}
```

`worldId`가 없는 캐릭터는 독립 캐릭터로 처리되며 `세계 구경하기` 버튼이 나타나지 않습니다.

세계관 페이지의 캐릭터 목록은 `worldId`를 기준으로 자동 생성하므로, 세계관 객체에 캐릭터 ID를 중복해서 적지 않습니다.

## 프로토타입 연결 예시

- 별의 왕관: 리라 베일, 카시안 로웰
- 애프터 네트워크: 노아 제로, 세이블
- 미드나이트 인덱스: 서해준, 강태오

## 생성기에서 필요한 입력 흐름

1. `세계관 추가`
2. 이름, 소개, 대표 이미지, 태그, 설명 입력
3. 필요하면 세계관 정보 섹션 추가
4. 캐릭터 편집 화면에서 `연결할 세계관` 선택
5. 연결하지 않으면 독립 캐릭터로 저장

플랫폼 정의와 각 캐릭터의 플랫폼 ID, URL, 이미지 배열은 사용자가 제공한 `data.js`를 기준으로 그대로 유지했습니다.
