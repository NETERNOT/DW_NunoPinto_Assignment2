export function initWorkDetail() {
  const detailedWork = document.querySelector(".detailedWork");
  if (!detailedWork) return;

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".carouselItem img");

    // Clicked on a carousel image
    if (img) {
      // If detailedWork is already active, close it
      if (detailedWork.classList.contains("active")) {
        detailedWork.classList.remove("active");
        return;
      }

      // Otherwise, open and populate detailedWork
      const index = img.dataset.index;

      const title =
        document.querySelectorAll(".projTitle .carousel p")[index]
          ?.textContent || "";
      const date =
        document.querySelectorAll(".dayAndMonth p")[index]?.textContent || "";
      const year =
        document.querySelectorAll(".year p")[index]?.textContent || "";
      let description =
        document.querySelectorAll(".descContainer .carousel p")[index]
          ?.textContent || "";

      description +=
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    description += "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      detailedWork.innerHTML = `
        <p class="goBack">&lt; Go back</p>
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
      return; // stop here so outside click logic doesn't trigger
    }

    // Clicked the "Go back" button
    if (e.target.matches(".goBack")) {
      detailedWork.classList.remove("active");
      return;
    }

    // Clicked outside detailedWork → close it
    if (
      !detailedWork.contains(e.target) &&
      detailedWork.classList.contains("active")
    ) {
      detailedWork.classList.remove("active");
    }
  });
}
