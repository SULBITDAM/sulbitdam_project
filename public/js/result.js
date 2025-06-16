const resultId = window.location.pathname.split("/").pop();

fetch(`/api/result/${resultId}`)
  .then((res) => res.json())
  .then((data) => {
    const answers = data.answers;

    // 예시
    document.getElementById("resultTitle").textContent = "복분자주";
  })
  .catch((err) => {
    alert("결과를 불러오지 못했습니다.");
    console.error(err);
  });
