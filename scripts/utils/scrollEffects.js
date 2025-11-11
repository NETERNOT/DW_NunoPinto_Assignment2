export function initScrollEffects() {
  const container = document.querySelector(".containerAbout");

  document.addEventListener("scroll", () => {
    if (container) {
      const scrollY = window.scrollY;
      container.style.transform = `translateY(${scrollY}px) scale(${
        1 - scrollY / 1000
      })`;
    }
  });
}
