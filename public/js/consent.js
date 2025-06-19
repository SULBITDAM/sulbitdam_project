document.getElementById("consentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const tel = document
    .getElementById("tel")
    .value.trim()
    .replace(/[^0-9]/g, ""); // 숫자만 남기기

  const agree = document.getElementById("agree").checked;
  // ✅ 이름 유효성 검사 (한글 또는 영문만 허용)
  const nameRegex = /^[가-힣a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    alert("이름은 한글 또는 영문만 입력 가능합니다.");
    return;
  }

  if (!agree) {
    alert("개인정보 수집 및 이용에 동의해주세요.");
    return;
  }

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
    console.log(data.result.resultId);
    console.log("✅ 서버 응답:", data);

    if (data.success && data.result?.resultId) {
      // 결과 페이지로 이동 (서버에서 받은 resultId 사용)
      window.location.href = `/result/${data.result.resultId}`;
    } else {
      alert("전송 실패: " + (data.message || "결과 정보가 부족합니다."));
    }
  } catch (err) {
    console.error("❌ 서버 오류:", err);
    console.log(data);
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
