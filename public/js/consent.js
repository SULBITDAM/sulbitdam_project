document
  .getElementById("consentForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    const agree = document.getElementById("agree").checked;

    if (!name || !phone || !agree) {
      alert("모든 항목을 입력하고 동의해 주세요.");
      return;
    }

    // 숫자 외 문자 제거 (하이픈, 공백 등)
    phone = phone.replace(/[^0-9]/g, "");

    // 전화번호 유효성 검사 (숫자 10~11자리)
    if (!/^01[016789][0-9]{7,8}$/.test(phone)) {
      alert("올바른 전화번호를 입력해 주세요.");
      return;
    }

    try {
      const answers = JSON.parse(localStorage.getItem("surveyAnswers")) || [];

      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          answers,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("알림톡이 전송되었습니다!");
        window.location.href = `/result/${data.id}`; // ✅ resultId 포함해서 이동!
      } else {
        alert("전송 실패: " + data.message);
      }
    } catch (err) {
      console.error("에러 발생:", err);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  });
