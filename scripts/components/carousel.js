import { IMAGE_COUNT } from "../config.js";

export function initCarousel(starsNodeList) {
  const carousels = document.querySelectorAll(".carousel");
  if (!carousels.length) return;

  let counter = -1;
  let timer;

  function moveCarousel(dir = 1) {
    counter += dir;
    const currentSlide = ((counter % IMAGE_COUNT) + IMAGE_COUNT) % IMAGE_COUNT;

    for (const carousel of carousels) {
      const children = carousel.children;
      for (const child of children) {
        child.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    }

    if (starsNodeList) {
      starsNodeList.forEach((star, index) => {
        star.style.paddingLeft = index > currentSlide ? "100%" : "0%";
      });
    }

    resetTimer();
  }

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => moveCarousel(), 5000);
  }

  moveCarousel();

  // Button listeners
  const fwrdButton = document.querySelector(".buttonContainer :last-child");
  if (fwrdButton) fwrdButton.addEventListener("click", () => moveCarousel());

  const bkwButton = document.querySelector(".buttonContainer :first-child");
  if (bkwButton) bkwButton.addEventListener("click", () => moveCarousel(-1));
}
