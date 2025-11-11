import { initScrollEffects } from "./utils/scrollEffects.js";
import { initClock } from "./utils/time.js";
import { initToggleDescription } from "./utils/toggleDescription.js";
import { fetchContent } from "./api/fetchWorkContent.js";
import { initCarousel } from "./components/carousel.js";

document.addEventListener("DOMContentLoaded", async () => {
  initScrollEffects();
  initClock();
  initToggleDescription();

  // Fetch content first to populate images & stars
  const starsNodeList = await fetchContent();
  // Initialize carousel after stars are available
  initCarousel(starsNodeList);
});
 