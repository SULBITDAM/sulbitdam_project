// 질문 데이터
const questions = [
  {
    text: "어떤 향을 선호하시나요?",
    image: "/public/img/q1.png",
    options: ["달콤한 향", "강렬한 향"], // ✅ 수정됨
  },
  {
    text: "선호하는 도수는?",
    image: "/public/img/q2.png",
    options: ["도수 낮은 술", "도수 높은 술"],
  },
  {
    text: "어떤 자리에서 마시고 싶나요?",
    image: "/public/img/q3.png",
    options: ["조용한 자리", "파티"], // ✅ 조건에 맞춰 수정됨
  },
  {
    text: "술과 어울리는 음식은?",
    image: "/public/img/q4.png",
    options: ["달콤한 안주", "매운 안주"], // OK
  },
  {
    text: "당신이 원하는 술 느낌은?",
    image: "/public/img/q5.png",
    options: ["와인 느낌", "별미 안주"], // ✅ 추가됨
  },
  {
    text: "술을 마실 때 기분은?",
    image: "/public/img/q6.png",
    options: ["힐링하고 싶다", "즐기고 싶다"],
  },
];

let currentIndex = 0;
let answers = [];

const questionText = document.querySelector(".question-text");
const questionImage = document.querySelector(".question-image img");
const answerButtons = document.querySelectorAll(".answer-btn");
const progressFill = document.querySelector(".progress-fill");

function renderQuestion(index) {
  const q = questions[index];
  questionText.textContent = `Q. ${q.text}`;
  questionImage.src = q.image;
  answerButtons[0].textContent = q.options[0];
  answerButtons[1].textContent = q.options[1];
  progressFill.style.width = `${((index + 1) / questions.length) * 100}%`;
}

answerButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    answers.push(questions[currentIndex].options[i]);
    currentIndex++;

    if (currentIndex < questions.length) {
      renderQuestion(currentIndex);
    } else {
      // 🎯 마지막 질문 후 서버에 답변 저장
      fetch("/api/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("surveyAnswers", JSON.stringify(answers));
            localStorage.setItem("answerId", data.id); // ✔️ 이거 중요
            location.href = "/consent"; // 다음 페이지로
          } else {
            alert("설문 저장 실패");
          }
        })
        .catch((err) => {
          console.error("❌ 설문 저장 에러:", err);
          alert("서버 오류 발생");
        });
    }
  });
});

// 시작 시 첫 질문 렌더
renderQuestion(currentIndex);
