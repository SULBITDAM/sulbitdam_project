const resultId = window.location.pathname.split("/").pop();

fetch(`/api/result/${resultId}`)
  .then((res) => res.json())
  .then((data) => {
    const result = data.result;
    if (!result) throw new Error("결과 없음");

    document.getElementById("resultTitle").textContent = result.title;
    document.getElementById("resultDesc").textContent = result.desc;
    document.getElementById("resultImage").src = result.image;
  })
  .catch((err) => {
    alert("결과를 불러오지 못했습니다.");
    console.error(err);
  });
