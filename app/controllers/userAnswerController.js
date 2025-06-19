const UserAnswer = require("../models/userAnswer");

function calculateResult(answers = []) {
  const has = (list) => list.filter((ans) => answers.includes(ans)).length;

  // 🎯 명확한 조건 (2개 이상 일치 시 해당)
  if (
    has([
      "도수가 높고 강렬한 술",
      "진하게 취하고 생각도 잊고 싶어서",
      "향, 깊이, 여운까지 중요하다",
      "혼자 조용히 마시며 생각하는 시간",
    ]) >= 3
  ) {
    return getResultByTitle("안동소주");
  }

  if (
    has([
      "도수가 낮고 부드러운 술",
      "가볍게 기분내고 싶어서",
      "구수하거나 진한 맛",
      "맛있고 마시기 쉬운 술이면 OK",
    ]) >= 4
  ) {
    return getResultByTitle("불로막걸리");
  }

  if (
    has([
      "달콤하거나 상큼한 맛",
      "가볍게 기분내고 싶어서",
      "향, 깊이, 여운까지 중요하다",
    ]) >= 3
  ) {
    return getResultByTitle("청도감와인");
  }

  if (
    has([
      "도수가 낮고 부드러운 술",
      "함께 마시며 수다 떠는 시간",
      "달콤하거나 상큼한 맛",
    ]) >= 3
  ) {
    return getResultByTitle("경주별맥");
  }

  if (
    has([
      "도수가 낮고 부드러운 술",
      "혼자 조용히 마시며 생각하는 시간",
      "맛있고 마시기 쉬운 술이면 OK",
    ]) >= 3
  ) {
    return getResultByTitle("경주법주");
  }

  if (
    has([
      "혼자 조용히 마시며 생각하는 시간",
      "구수하거나 진한 맛",
      "향, 깊이, 여운까지 중요하다",
    ]) >= 3
  ) {
    return getResultByTitle("문경풍정사계춘");
  }

  // 🎯 조건 불충분 → 도수에 따라 랜덤 분기
  if (answers.includes("도수가 높고 강렬한 술")) {
    const candidates = ["문경풍정사계춘", "안동소주", "청도감와인"];
    return getResultByTitle(pickRandom(candidates));
  }

  if (answers.includes("도수가 낮고 부드러운 술")) {
    const candidates = ["경주별맥", "경주법주", "불로막걸리"];
    return getResultByTitle(pickRandom(candidates));
  }
}

// 🔄 랜덤 선택
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// 🍶 결과 매핑
function getResultByTitle(title) {
  const map = {
    안동소주: {
      title,
      resultId: "resultD",
      desc: `\n\u3000🎩 \n(•ᵕᴗᵕ•)つ🍶\n〰️〰️〰️\n\n강한 도수와 독보적인 향!\n소주의 끝판왕 안동소주.`,
      image: "/public/img/result1.png",
    },
    불로막걸리: {
      title,
      resultId: "resultA",
      desc: "\n◌☁\n(｡•‿•｡)つ🍶\n⎯⎯⎯\n\n장인의 손맛이 살아있는 불로막걸리,\n부드럽고 달콤한 전통의 맛",
      image: "/public/img/result1.png",
    },
    청도감와인: {
      title,
      resultId: "resultC",
      desc: "\n🍃🟠\n(•ᴗ•)ﾉ\n︶︶︶\n\n청도의 햇감으로 만든 스위트 와인!\n산뜻하고 로맨틱한 감와인.",
      image: "/public/img/result1.png",
    },
    경주별맥: {
      title,
      resultId: "resultF",
      desc: "\nꔛ☁ꔛ\n( •͈ᴗ•͈ )🍺\n⎯⎯⎯⎯⎯\n\n감각적인 패키지와 향긋한 홉의 조화!\n경주에서만 맛볼 수 있는 수제맥주",
      image: "/public/img/result1.png",
    },
    경주법주: {
      title,
      resultId: "resultB",
      desc: "\n\u3000🟫\n(｡•‿•｡)\n⊃🍶⊂\n\n350년 역사의 궁중 비법으로 만든 경주법주,\n정갈한 맛이 일품!",
      image: "/public/img/result1.png",
    },
    문경풍정사계춘: {
      title,
      resultId: "resultE",
      desc: "\n\u3000ᕱ ᕱ\n(｡•‿•｡)\n(∗🍶∗)つ\n\n자연을 담은 술,\n사계절의 맛을 담은 풍정사계.",
      image: "/public/img/result1.png",
    },
  };
  return map[title];
}

exports.saveAnswer = async (req, res) => {
  const { answers } = req.body;

  try {
    const result = calculateResult(answers);
    console.log("🎯 계산된 결과:", result); // ✅ 이거 꼭 넣어보세요
    const saved = await UserAnswer.create({ answers, result });

    res.json({ success: true, id: saved._id, result });
  } catch (err) {
    console.error("❌ 답변 저장 실패:", err);
    res.status(500).json({ success: false, message: "답변 저장 실패" });
  }
};
