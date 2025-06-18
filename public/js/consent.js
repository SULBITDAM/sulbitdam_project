document
  .getElementById("consentForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const agree = document.getElementById("agree").checked;

    if (!name || !phone || !agree) {
      alert("모든 항목을 입력하고 동의해 주세요.");
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
        window.location.href = "/result";
      } else {
        alert("전송 실패: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("에러가 발생했습니다.");
    }
  });
