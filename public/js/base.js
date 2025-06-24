const slides = document.querySelector(".slides");
const slideList = document.querySelectorAll(".slide");
const slideCount = slideList.length;
let currentIndex = 1;
const duration = 1000;
let allowShift = true;

// 초기 위치 설정
slides.style.transform = `translateX(-${100 * currentIndex}%)`;

function moveTo(index, animated = true) {
  if (animated) {
    slides.style.transition = `transform ${duration}ms ease`;
  } else {
    slides.style.transition = "none";
  }
  slides.style.transform = `translateX(-${100 * index}%)`;
  currentIndex = index;
}

function nextSlide() {
  if (!allowShift) return;
  allowShift = false;

  moveTo(currentIndex + 1);

  setTimeout(() => {
    // 클론 마지막 → 진짜 첫 번째로 점프
    if (currentIndex === slideCount - 1) {
      moveTo(1, false);
    }
    allowShift = true;
  }, duration);
}

setInterval(nextSlide, 5000);

// 전통주 슬라이더
const track = document.querySelector(".slider-track");
let items = Array.from(track.children);

function getItemWidth() {
  const item = track.querySelector(".item");
  const style = window.getComputedStyle(track);
  const gap = parseInt(style.columnGap || style.gap || 0);
  return item.offsetWidth + gap;
}

function applyCenterClass() {
  items.forEach((el) => el.classList.remove("center"));
  if (items[1]) items[1].classList.add("center");
}

function moveSlider() {
  const itemWidth = getItemWidth();

  // 먼저 center 클래스 적용 (슬라이드 이동과 동시에 커짐)
  const nextCenterIndex = 2 % items.length;
  items.forEach((el) => el.classList.remove("center"));
  if (items[nextCenterIndex]) items[nextCenterIndex].classList.add("center");

  // 슬라이더 이동
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${itemWidth}px)`;

  // 이동 후 DOM 재배치
  setTimeout(() => {
    const first = items.shift();
    track.appendChild(first);

    track.style.transition = "none";
    track.style.transform = `translateX(0)`;

    items.push(first);
  }, 500);
}
window.addEventListener("load", () => {
  applyCenterClass();
  setInterval(moveSlider, 2500);
});

window.addEventListener("resize", () => {
  track.style.transition = "none";
  track.style.transform = `translateX(0)`;
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

  const fixedContent = document.querySelector(".fixed-content");
  const introTextEl = document.querySelector(".intro div");

  if (fixedContent) observer.observe(fixedContent);
  if (introTextEl) observer.observe(introTextEl);
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
  };

  // 기본 등장 애니메이션 처리
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, observerOptions);

  const fixedContent = document.querySelector(".fixed-content");

  if (fixedContent) observer.observe(fixedContent);

  // 기본 애니메이션 대상 요소들
  const targets = [
    ...document.querySelectorAll(".intro-left p, .intro-left button"),
    document.querySelector(".intro-right"),
  ];

  targets.forEach((el) => {
    if (el) observer.observe(el);
  });

  // 마스코트 요소들 순차 등장
  const talkMascots = document.querySelectorAll(".intro-talk-in span");

  const mascotObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        talkMascots.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 150); // 150ms 간격
        });
        mascotObserver.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, observerOptions);

  // 마스코트 관찰 트리거
  if (talkMascots.length > 0) {
    mascotObserver.observe(talkMascots[0]);
  }
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
