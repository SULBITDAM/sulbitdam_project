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
