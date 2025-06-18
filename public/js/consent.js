document.getElementById("consentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const tel = document
    .getElementById("tel")
    .value.trim()
    .replace(/[^0-9]/g, ""); // 숫자만 남기기

  const agree = document.getElementById("agree").checked;
  if (!agree) {
    alert("개인정보 수집 및 이용에 동의해주세요.");
    return;
  }

  // 로컬스토리지에서 answerId 불러오기
  const answerId = localStorage.getItem("answerId");

  if (!answerId) {
    alert("설문 결과가 없습니다. 테스트를 먼저 완료해주세요.");
    return;
  }

  try {
    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        tel,
        answerId,
      }),
    });

    const data = await res.json();
    console.log("✅ 서버 응답:", data);

    if (data.success) {
      // alert("알림톡이 전송되었습니다!");
      // 결과 페이지로 이동
      window.location.href = `/result/${answerId}`;
    } else {
      alert("전송 실패: " + data.message);
    }
  } catch (err) {
    console.error("❌ 서버 오류:", err);
    alert("서버 오류가 발생했습니다.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleConsent");
  const detail = document.getElementById("consentDetail");

  toggleBtn.addEventListener("click", () => {
    if (detail.style.display === "none") {
      detail.style.display = "block";
      detail.style.maxHeight = detail.scrollHeight + "px";
      toggleBtn.textContent = "알림톡 수신 동의서 닫기";
    } else {
      detail.style.display = "none";
      toggleBtn.textContent = "알림톡 수신 동의서 보기";
    }
  });
});
