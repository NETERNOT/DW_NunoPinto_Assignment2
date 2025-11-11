export function initScrollEffects() {
  const container = document.querySelector(".containerAbout");

  if (!container) return; // Safety check if container exists

  document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    container.style.transform = `translateY(${scrollY}px) scale(${1 - scrollY / 1000})`;
  });
}
