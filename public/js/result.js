const resultId = window.location.pathname.split("/").pop();

// 잘못된 접근 방지
if (!resultId || resultId === "result") {
  alert("잘못된 결과 주소입니다.");
  throw new Error("잘못된 resultId");
}

// 결과 조회
fetch(`/api/result/${resultId}`)
  .then((res) => res.json())
  .then((data) => {
    const result = data.result;

    // 결과가 없을 경우
    if (!result) {
      alert("결과 데이터가 없습니다.");
      return;
    }

    // DOM에 데이터 삽입
    document.getElementById("resultTitle").textContent = result.title;
    document.getElementById("resultDesc").textContent = result.desc;
    document.getElementById("resultImage").src = result.image;
  })
  .catch((err) => {
    alert("결과를 불러오지 못했습니다.");
    console.error(err);
  });
