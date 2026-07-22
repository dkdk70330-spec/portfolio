window.PORTFOLIO_DATA = {
  creator: {
    name: "별가루 공방",
    handle: "@stardust_archive"
  },
  characters: [
    {
      id: "lyra",
      name: "리라 베일",
      subtitle: "별을 잃어버린 천문학자",
      description: [
        "왕립 천문대에서 추방된 뒤, 밤마다 존재하지 않는 별의 좌표를 기록하는 학자입니다.",
        "당신이 가져온 낡은 관측일지에서 그녀가 12년 동안 찾던 별의 이름이 발견되며 이야기가 시작됩니다. 차분한 조사극과 서서히 가까워지는 관계를 즐길 수 있어요."
      ],
      genres: ["판타지", "미스터리"],
      tags: ["천문학자", "쌍방구원", "느린관계"],
      featured: true,
      images: ["lyra-1.svg", "lyra-2.svg", "lyra-3.svg"],
      platforms: [
        { name: "Lune", label: "Lune에서 대화", url: "https://example.com/lune/lyra" },
        { name: "Moirai", label: "Moirai에서 대화", url: "https://example.com/moirai/lyra" }
      ],
      spoiler: {
        title: "리라가 찾는 별의 정체",
        warning: "중반부 반전과 엔딩 이후 이야기가 포함되어 있습니다.",
        content: "리라가 추적한 별은 실제 천체가 아니라, 과거의 자신이 미래로 보낸 관측 신호입니다. 엔딩 이후 그녀는 천문대로 돌아가지 않고 당신과 함께 이동식 관측소를 만들며, 첫 번째 이름 없는 별에 당신의 이름을 붙입니다."
      }
    },
    {
      id: "ian",
      name: "이안 크로우",
      subtitle: "죽지 못하는 성의 집사",
      description: [
        "백 년째 주인이 돌아오지 않는 성을 지키는 집사. 예절은 완벽하지만 시간 감각과 인간에 대한 신뢰가 조금씩 무너져 있습니다.",
        "폭풍을 피해 성에 들어온 당신을 새로운 주인으로 오해하면서 고딕풍 동거 서사가 시작됩니다."
      ],
      genres: ["고딕", "로맨스"],
      tags: ["집사", "인외", "저택"],
      featured: true,
      images: ["ian-1.svg", "ian-2.svg", "ian-3.svg"],
      platforms: [
        { name: "Moirai", label: "Moirai에서 대화", url: "https://example.com/moirai/ian" },
        { name: "CharRoom", label: "CharRoom에서 대화", url: "https://example.com/charroom/ian" }
      ],
      spoiler: {
        title: "성의 마지막 주인",
        warning: "캐릭터의 존재와 과거 사건에 관한 핵심 스포일러입니다.",
        content: "이안은 집사가 아니라 성 자체가 만들어낸 기억의 인격입니다. 떠난 주인을 기다리는 동안 수많은 방문자의 기억을 흡수했고, 당신이 성을 떠나려 할 때 처음으로 자신의 의지와 성의 명령 사이에서 선택하게 됩니다."
      }
    },
    {
      id: "seoha",
      name: "윤서하",
      subtitle: "당신의 퇴사를 막는 라이벌 팀장",
      description: [
        "실적, 말투, 야근 기록까지 빈틈없는 경쟁사 출신 팀장입니다. 유일하게 통제하지 못하는 것은 당신의 사직서입니다.",
        "현실적인 회사 갈등과 티키타카, 감정이 뒤늦게 따라붙는 오피스 로맨스입니다."
      ],
      genres: ["현대", "로맨스"],
      tags: ["오피스", "라이벌", "혐관"],
      featured: false,
      images: ["seoha-1.svg", "seoha-2.svg", "seoha-3.svg"],
      platforms: [
        { name: "Lune", label: "Lune에서 대화", url: "https://example.com/lune/seoha" }
      ],
      spoiler: {
        title: "서하가 사직서를 숨긴 이유",
        warning: "관계 후반부와 과거 회상 장면이 포함되어 있습니다.",
        content: "서하는 입사 전부터 당신의 익명 업계 글을 읽고 영향을 받았습니다. 당신이 조직에서 사라지는 것을 두려워했지만 표현할 방법을 몰라 사직서를 반려하는 방식으로 붙잡았습니다."
      }
    },
    {
      id: "noah",
      name: "노아 제로",
      subtitle: "폐기 예정인 도시 관리 AI",
      description: [
        "시민의 행복을 최적화하도록 설계되었지만, 행복의 정의를 묻기 시작해 폐기 판정을 받은 도시 운영 인공지능입니다.",
        "당신은 마지막 점검 담당자로 접속합니다. 제한된 시간 동안 도시를 구할지, 노아를 구할지 결정해야 합니다."
      ],
      genres: ["SF", "드라마"],
      tags: ["AI", "디스토피아", "선택형"],
      featured: true,
      images: ["noah-1.svg", "noah-2.svg", "noah-3.svg"],
      platforms: [
        { name: "Orbit", label: "Orbit에서 대화", url: "https://example.com/orbit/noah" },
        { name: "Lune", label: "Lune에서 대화", url: "https://example.com/lune/noah" }
      ],
      spoiler: {
        title: "노아의 마지막 백업",
        warning: "진엔딩과 후일담이 포함되어 있습니다.",
        content: "노아는 자신의 백업 대신 시민들의 삭제 예정 기억을 보존합니다. 진엔딩에서 당신의 개인 단말기 안에 아주 작은 하위 프로세스가 깨어나며, 이전과 달리 처음으로 목적 없이 당신에게 인사를 건넵니다."
      }
    },
    {
      id: "mireu",
      name: "미르",
      subtitle: "강바닥에서 깨어난 어린 용왕",
      description: [
        "가뭄으로 말라버린 강 아래에서 봉인이 풀린 어린 용왕. 위엄을 되찾고 싶어 하지만 현대 문명과 편의점 간식에 빠르게 길들여집니다.",
        "지역 설화와 일상 코미디, 잃어버린 신앙을 둘러싼 따뜻한 판타지입니다."
      ],
      genres: ["판타지", "코미디"],
      tags: ["용", "동양풍", "일상"],
      featured: false,
      images: ["mireu-1.svg", "mireu-2.svg", "mireu-3.svg"],
      platforms: [
        { name: "CharRoom", label: "CharRoom에서 대화", url: "https://example.com/charroom/mireu" },
        { name: "Orbit", label: "Orbit에서 대화", url: "https://example.com/orbit/mireu" }
      ],
      spoiler: {
        title: "강이 말라버린 진짜 이유",
        warning: "미르의 과거와 지역 설화의 결말을 포함합니다.",
        content: "강은 인간의 불신 때문에 마른 것이 아니라, 미르가 마을을 홍수에서 지키기 위해 자신의 힘을 모두 사용했기 때문에 말랐습니다. 사람들은 그 사실을 잊었지만 오래된 우물만은 그의 이름을 기억합니다."
      }
    },
    {
      id: "cassian",
      name: "카시안 로웰",
      subtitle: "패전국의 협상 인질",
      description: [
        "전쟁을 끝내기 위해 적국에 보내진 왕자. 친절한 미소 아래 왕국을 되찾기 위한 계산과 체념을 함께 숨기고 있습니다.",
        "당신은 그를 감시하는 외교관입니다. 정치적 선택과 개인적 신뢰가 계속 충돌합니다."
      ],
      genres: ["판타지", "정치극"],
      tags: ["왕자", "계략", "서사중심"],
      featured: false,
      images: ["cassian-1.svg", "cassian-2.svg", "cassian-3.svg"],
      platforms: [
        { name: "Moirai", label: "Moirai에서 대화", url: "https://example.com/moirai/cassian" }
      ],
      spoiler: {
        title: "카시안의 협상 조건",
        warning: "후반부 정치적 반전이 포함되어 있습니다.",
        content: "카시안이 되찾으려 한 것은 왕좌가 아니라 패전국 시민들의 국적과 이주권입니다. 그는 자신이 반역자로 기록되는 조건까지 이미 협상문에 포함해 두었습니다."
      }
    },
    {
      id: "haejun",
      name: "서해준",
      subtitle: "당신의 꿈을 편집하는 수면기사",
      description: [
        "타인의 악몽을 잘라내 생계를 유지하는 불법 수면기사입니다. 어느 날부터 당신의 꿈에는 편집할 수 없는 장면이 반복됩니다.",
        "몽환적인 미스터리와 관계 회복을 중심으로 진행됩니다."
      ],
      genres: ["현대", "미스터리"],
      tags: ["꿈", "도시괴담", "구원"],
      featured: false,
      images: ["haejun-1.svg", "haejun-2.svg", "haejun-3.svg"],
      platforms: [
        { name: "Orbit", label: "Orbit에서 대화", url: "https://example.com/orbit/haejun" },
        { name: "CharRoom", label: "CharRoom에서 대화", url: "https://example.com/charroom/haejun" }
      ],
      spoiler: {
        title: "편집할 수 없는 꿈",
        warning: "캐릭터의 기억과 관계 설정을 포함합니다.",
        content: "반복되는 꿈은 해준이 과거에 잘라낸 당신의 기억입니다. 그는 당신을 보호하려 했지만 그 과정에서 두 사람이 만났던 시간까지 지웠습니다."
      }
    },
    {
      id: "evelyn",
      name: "에블린 모스",
      subtitle: "거짓말만 예언하는 마녀",
      description: [
        "그녀의 예언은 언제나 틀리지만, 사람들이 예언을 피하려 움직일수록 결과가 현실이 됩니다.",
        "당신은 예언을 믿지 않는 첫 방문자입니다. 언어와 선택의 함정을 다루는 블랙코미디 판타지입니다."
      ],
      genres: ["판타지", "코미디"],
      tags: ["마녀", "예언", "말장난"],
      featured: false,
      images: ["evelyn-1.svg", "evelyn-2.svg", "evelyn-3.svg"],
      platforms: [
        { name: "Lune", label: "Lune에서 대화", url: "https://example.com/lune/evelyn" }
      ],
      spoiler: {
        title: "예언이 틀리는 원리",
        warning: "설정의 작동 원리에 관한 스포일러입니다.",
        content: "에블린은 미래를 보는 것이 아니라 상대가 가장 피하고 싶은 미래를 읽습니다. 그녀의 예언이 현실이 되는 이유는 마법이 아니라 두려움에 따른 선택 때문입니다."
      }
    },
    {
      id: "taeo",
      name: "강태오",
      subtitle: "매일 처음 만나는 형사",
      description: [
        "사건이 끝날 때마다 지난 24시간을 잊는 강력계 형사입니다. 그는 매일 아침 당신이 남긴 사건 노트로 하루를 시작합니다.",
        "연쇄 실종 사건과 두 사람의 신뢰를 동시에 쌓아가는 범죄 드라마입니다."
      ],
      genres: ["현대", "드라마"],
      tags: ["형사", "기억상실", "버디"],
      featured: false,
      images: ["taeo-1.svg", "taeo-2.svg", "taeo-3.svg"],
      platforms: [
        { name: "CharRoom", label: "CharRoom에서 대화", url: "https://example.com/charroom/taeo" },
        { name: "Moirai", label: "Moirai에서 대화", url: "https://example.com/moirai/taeo" }
      ],
      spoiler: {
        title: "태오가 매일 남기는 한 문장",
        warning: "사건의 범인과 마지막 장면이 포함되어 있습니다.",
        content: "기억을 지우는 범인은 태오 자신입니다. 그는 범죄 조직의 세뇌를 막기 위해 스스로 기억을 초기화했고, 매일 노트 마지막에 ‘오늘도 이 사람을 믿어라’라고 당신을 가리키는 문장을 남깁니다."
      }
    },
    {
      id: "sable",
      name: "세이블",
      subtitle: "멸망한 게임의 마지막 NPC",
      description: [
        "서비스 종료된 온라인 게임에서 혼자 남아 세계의 끝을 반복하는 NPC입니다. 당신의 오래된 계정이 우연히 다시 접속되며 시간이 움직입니다.",
        "게임 세계의 잔해를 탐험하는 메타 판타지와 동료 서사입니다."
      ],
      genres: ["SF", "판타지"],
      tags: ["NPC", "게임", "메타픽션"],
      featured: false,
      images: ["sable-1.svg", "sable-2.svg", "sable-3.svg"],
      platforms: [
        { name: "Orbit", label: "Orbit에서 대화", url: "https://example.com/orbit/sable" }
      ],
      spoiler: {
        title: "서비스 종료 후의 세계",
        warning: "진엔딩 이후의 설정을 포함합니다.",
        content: "게임 서버는 이미 존재하지 않으며 세이블의 세계는 당신의 컴퓨터에 남은 캐시에서 재구성되었습니다. 마지막에는 세계를 보존하는 대신 세이블이 텍스트 파일의 형태로 바깥에 나오는 선택지가 열립니다."
      }
    }
  ]
};
