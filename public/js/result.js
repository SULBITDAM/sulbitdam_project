// const resultId = window.location.pathname.split("/").pop();

// fetch(`/api/result/${resultId}`)
//   .then((res) => res.json())
//   .then((data) => {
//     const answers = data.answers;

//     // 예시
//     document.getElementById("resultTitle").textContent = "복분자주";
//   })
//   .catch((err) => {
//     alert("결과를 불러오지 못했습니다.");
//     console.error(err);
//   });

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("mobileMenu");
  const button = document.querySelector(".hamburger");
  if (
    menu.style.display === "block" &&
    !menu.contains(e.target) &&
    !button.contains(e.target)
  ) {
    menu.style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let id = window.location.pathname.split("/").pop() || "resultA";

  document.querySelectorAll(".tabs a, #mobileMenu a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === id) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });

  const data = liquorData[id];
  if (!data) {
    alert("해당 술 정보를 찾을 수 없습니다.");
    return;
  }
  document.querySelector(
    "header"
  ).style.backgroundImage = `url(${data.headerImage})`;
  document.title = data.title;
  // Header
  document.querySelector("header h1").textContent = data.title;
  document.querySelector("header p").textContent = data.description;

  // Info
  document.querySelector(".char").src = data.img;
  document.querySelector(".details").innerHTML = `
    <p><strong>종류</strong> ${data.type}</p>
    <p><strong>원재료</strong> ${data.ingredients}</p>
    <p><strong>알콜도수</strong> ${data.alcohol}</p>
    <p><strong>용량</strong> ${data.volume}</p>
    <p><a href="${data.homepage}" target="_blank">공식 홈페이지</a></p>
  `;

  // 소개 이미지
  document.querySelector(".intro img").src = data.introImage;

  // 소개 문단
  const introTextContainer = document.querySelector(".intro div");
  introTextContainer.innerHTML = data.introParagraphs
    .map(
      (p, i) =>
        `<p${
          i === 0 ? ' style="font-weight:bold;font-size:24px;"' : ""
        }>${p}</p>`
    )
    .join("");

  // 찾아가는 양조장 정보 렌더링
  const mapInfoEl = document.querySelector(".map-info");
  const mapInfo = data.map.info;

  mapInfoEl.innerHTML = `
  <p><strong>${data.map.label}</strong></p>
  ${mapInfo.address ? `<p>${mapInfo.address}</p>` : ""}
  ${mapInfo.tel ? `<p><span>T.</span>${mapInfo.tel}</p>` : ""}
  ${mapInfo.fax ? `<p><span>F.</span>${mapInfo.fax}</p>` : ""}
  ${mapInfo.email ? `<p><span>E.</span>${mapInfo.email}</p>` : ""}
`;

  // 최신 소식
  const newsList = document.querySelector(".news-list");
  newsList.innerHTML = data.news
    .map(
      (item) => `
        <a href="${item.link}" target="_blank">
          <div class="item">
            <img src="${item.img}" alt="${item.title}" />
            <p>${item.title}</p>
          </div>
        </a>
      `
    )
    .join("");

  // 지도 초기화
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(data.map.lat, data.map.lng),
    level: 4,
  };

  const map = new kakao.maps.Map(container, options);
  const markerPosition = new kakao.maps.LatLng(data.map.lat, data.map.lng);
  const marker = new kakao.maps.Marker({ position: markerPosition });
  marker.setMap(map);

  const infoWindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:8px;font-size:14px;">${data.map.label}</div>`,
  });
  infoWindow.open(map, marker);
});

// 애니메이션
// 요소가 10% 이상 보이면 visible 클래스 추가
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const contentEl = document.querySelector("header .content");
  const introTextEl = document.querySelector(".intro div");

  if (contentEl) observer.observe(contentEl);
  if (introTextEl) observer.observe(introTextEl);
});

// 꽃잎
const flowerContainer = document.querySelector(".flower-container");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // 랜덤 값들
  const startLeft = Math.random() * window.innerWidth;
  const size = 20 + Math.random() * 20; // 크기 20~40
  const duration = 5 + Math.random() * 5; // 지속시간
  const rotateDeg = 100 + Math.random() * 200;

  // 스타일 지정
  petal.style.left = `${startLeft}px`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.transform = `rotate(${rotateDeg}deg)`;

  // 생성
  flowerContainer.appendChild(petal);

  // 일정 시간 뒤 제거
  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

// 반복 생성
setInterval(createPetal, 600); // 0.3초마다 생성
