const UserAnswer = require("../models/userAnswer");

// 결과 계산
function calculateResult(answers = []) {
  if (
    answers.includes("도수 높은 술") &&
    answers.includes("매운 안주") &&
    answers.includes("강렬한 향")
  ) {
    return {
      title: "안동소주",
      desc: "강한 도수와 독보적인 향! 소주의 끝판왕 안동소주.",
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
    };
  }

  if (
    answers.includes("파티") &&
    answers.includes("시원한 술") &&
    answers.includes("별미 안주")
  ) {
    return {
      title: "경주 별맥",
      desc: "감각적인 패키지와 향긋한 홉의 조화! 경주에서만 맛볼 수 있는 수제맥주.",
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
    };
  }

  // 기본값
  return {
    title: "경주법주",
    desc: "기본 추천 전통주: 정갈한 맛의 경주법주",
  };
}

exports.saveAnswer = async (req, res) => {
  const { answers } = req.body;

  try {
    const result = calculateResult(answers);
    const saved = await UserAnswer.create({ answers, result });

    res.json({ success: true, id: saved._id });
  } catch (err) {
    console.error("❌ 답변 저장 실패:", err);
    res.status(500).json({ success: false, message: "답변 저장 실패" });
  }
};
