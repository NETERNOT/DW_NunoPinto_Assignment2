// workDetails.js
export function initWorkDetail() {
  const detailedWork = document.querySelector(".detailedWork");
  if (!detailedWork) return;

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".carouselItem img");

    if (img) {
      // If detailedWork is already active, close it
      if (detailedWork.classList.contains("active")) {
        detailedWork.classList.remove("active");
        return; // stop further processing
      }

      // Otherwise, open and populate detailedWork
      const index = img.dataset.index;

      const title = document.querySelectorAll(".projTitle .carousel p")[index]?.textContent || "";
      const date = document.querySelectorAll(".dayAndMonth p")[index]?.textContent || "";
      const year = document.querySelectorAll(".year p")[index]?.textContent || "";
      const description = document.querySelectorAll(".descContainer .carousel p")[index]?.textContent || "";

      detailedWork.innerHTML = `
        <h1>${title}</h1>
        <p>${date}.${year}</p>
        <p>${description}</p>
        <div class="photoGrid">
          <img src="${img.src}">
          <img src="${img.src}">
          <img src="${img.src}">
          <img src="${img.src}">
        </div>
      `;

      detailedWork.classList.add("active");
      return; // stop here so the outside click logic doesn't trigger
    }

    // Clicked outside detailedWork → close it
    if (!detailedWork.contains(e.target) && detailedWork.classList.contains("active")) {
      detailedWork.classList.remove("active");
    }
  });
}
