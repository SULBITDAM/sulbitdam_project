const SurveyResult = require("../models/surveyResult");
const { SolapiMessageService } = require("solapi");
const messageService = new SolapiMessageService(
  process.env.API_KEY,
  process.env.API_SECRET
);

// 결과 계산 함수는 함수 밖으로 분리해도 좋아
function calculateResult(answers) {
  if (
    answers.includes("도수 높은 술") &&
    answers.includes("매운 안주") &&
    answers.includes("강렬한 향")
  ) {
    return {
      title: "안동소주",
      desc: "강한 도수와 독보적인 향! 소주의 끝판왕 안동소주.",
      image: "/public/img/andong.png",
    };
  }

  if (
    answers.includes("달콤한 향") &&
    answers.includes("단 안주") &&
    answers.includes("도수 낮은 술")
  ) {
    return {
      title: "불로막걸리",
      desc: "장인의 손맛이 살아있는 불로막걸리, 부드럽고 달콤한 전통의 맛입니다.",
      image: "/public/img/bullo.png",
    };
  }

  if (
    answers.includes("혼자 마시기") &&
    answers.includes("도수 낮은 술") &&
    answers.includes("산뜻한 향")
  ) {
    return {
      title: "경주법주",
      desc: "350년 역사의 궁중 비법으로 만든 경주법주, 정갈한 맛이 일품입니다.",
      image: "/public/img/gybp.png",
    };
  }

  if (
    answers.includes("파티") &&
    answers.includes("시원한 술") &&
    answers.includes("별미 안주")
  ) {
    return {
      title: "경주 별맥주",
      desc: "감각적인 패키지와 향긋한 홉의 조화! 경주에서만 맛볼 수 있는 수제맥주.",
      image: "/public/img/starbeer.png",
    };
  }

  if (
    answers.includes("힐링하고 싶다") &&
    answers.includes("조용한 자리") &&
    answers.includes("산뜻한 향")
  ) {
    return {
      title: "문경 풍정사계",
      desc: "자연을 담은 술, 사계절의 맛을 담은 풍정사계.",
      image: "/public/img/poongjeong.png",
    };
  }

  if (
    answers.includes("달콤한 향") &&
    answers.includes("과일향") &&
    answers.includes("와인 느낌")
  ) {
    return {
      title: "청도 감와인",
      desc: "청도의 햇감으로 만든 스위트 와인! 산뜻하고 로맨틱한 감와인.",
      image: "/public/img/gamwine.png",
    };
  }

  // 기본값
  return {
    title: "경주법주",
    desc: "기본 추천 전통주: 정갈한 맛의 경주법주",
    image: "/public/img/gybp.png",
  };
}

exports.sendMessage = async (req, res) => {
  const { name, phone, answers } = req.body;

  try {
    // 1. 결과 계산
    const calculatedResult = calculateResult(answers);

    // 2. DB 저장 (계산된 결과 포함)
    const result = await SurveyResult.create({
      name,
      phone,
      answers,
      result: calculatedResult,
    });

    // 3. 알림톡 발송
    await messageService.send({
      to: phone,
      from: process.env.SOLAPI_PHONE,
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name,
          "#{text}": "전통주 테스트 결과를 확인하세요!",
          "#{url}": `http://localhost:8080/result/${result._id}`,
        },
      },
    });

    res.json({ success: true, id: result._id });
  } catch (e) {
    console.error("전송 실패", e);
    res.status(500).json({ success: false, message: "전송 실패" });
  }
};
