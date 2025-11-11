export function initToggleDescription() {
  const captionButton = document.querySelector(".projTitle button");
  const descContainer = document.querySelector(".descContainer");

  if (!captionButton || !descContainer) return;

  captionButton.addEventListener("click", () => {
    descContainer.classList.toggle("active");
  });
}
