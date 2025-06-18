// 질문 데이터
const questions = [
  {
    text: "당신이 선호하는 술의 도수는?",
    image: "/public/img/survey/q1.png",
    options: ["도수가 낮고 부드러운 술", "도수가 높고 강렬한 술"], // ✅ 수정됨
  },
  {
    text: "술을 마시는 가장 큰 이유는?",
    image: "/public/img/survey/q2.png",
    options: ["가볍게 기분내고 싶어서", "진하게 취하고 생각도 잊고 싶어서"],
  },
  {
    text: "술을 고를 때 당신의 기준은?",
    image: "/public/img/survey/q3.png",
    options: ["맛있고 마시기 쉬운 술이면 OK", "향, 깊이, 여운까지 중요하다"], // ✅ 조건에 맞춰 수정됨
  },
  {
    text: "혼술과 술자리 중 어느쪽이 더 좋은가요?",
    image: "/public/img/survey/q4.png",
    options: ["함께 마시며 수다 떠는 시간", "혼자 조용히 마시며 생각하는 시간"],
  },
  {
    text: "입맛에 더 끌리는 쪽은?",
    image: "/public/img/survey/q5.png",
    options: ["달콤하거나 상큼한 맛", "구수하거나 진한 맛"],
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
  // questionText.textContent = `Q. ${q.text}`;
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
