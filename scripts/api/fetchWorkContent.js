import { IMAGE_COUNT, API_KEY, QUERY } from "../config.js";
import { initWorkDetail } from "../components/workDetails.js";

/* ------------------ LOADER + SCROLL CONTROL FIXES ------------------ */

history.scrollRestoration = "manual";
window.scrollTo(0, 0);
document.body.classList.add("no-scroll");

// If URL has hash, block initial auto-jump and retry after loader
const pendingHash = window.location.hash;
if (pendingHash) {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}

/* ------------------ MAIN FETCH FUNCTION ------------------ */

export async function fetchContent() {
  const url = `https://api.pexels.com/v1/search?query=${QUERY}&per_page=${IMAGE_COUNT}&orientation=landscape`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) throw new Error("Failed to fetch images from Pexels");

    const data = await response.json();

    // Render images
    const imageWrapper = document.querySelector(".imageWrapper");
    if (imageWrapper) imageWrapper.innerHTML = renderImages(data);

    // Populate carousel content
    document.querySelector(".pagination").innerHTML = getText("pagination");
    document.querySelector(".projTitle>.carousel").innerHTML = getText("title");
    document.querySelector(".areaDesign").innerHTML = getText("areas");
    document.querySelector(".dayAndMonth").innerHTML = getText("date");
    document.querySelector(".year").innerHTML = getText("year");
    document.querySelector(".descContainer>.carousel").innerHTML = getText("description");

    hideLoader();

    initWorkDetail();

    return document.querySelectorAll(".pagination span");
  } catch (error) {
    console.error("Error loading images:", error);
    hideLoader();
  }
}

/* ------------------ RENDER HELPERS ------------------ */

function renderImages(data) {
  return data.photos
    .map((photo, i) => `
      <div class="carouselItem">
        <img 
          src="${photo.src.landscape}" 
          alt="${photo.alt}" 
          data-index="${i}"
        >
      </div>
    `)
    .join("");
}

function getText(type) {
  let html = "";
  for (let i = 0; i < IMAGE_COUNT; i++) {
    switch (type) {
      case "pagination": html += "<span>*</span>"; break;
      case "title": html += `<p>Lorem Ipsum ${i}</p>`; break;
      case "areas": html += `<p>${getRandomAreas()}</p>`; break;
      case "date": html += `<p>${getRandomDate()}</p>`; break;
      case "year": html += `<p>${String(Math.floor(Math.random() * 10 + 2015))}</p>`; break;
      case "description":
        html += `<p>There are many variations of passages of Lorem Ipsum available, but the majority have
        suffered alteration in some form, by injected humour, or randomised words which don't look
        even slightly believable. If you are going to use a passage of Lorem Ipsum</p>`;
        break;
    }
  }
  return html;
}

function getRandomDate() {
  const day = String(Math.floor(Math.random() * 29 + 1)).padStart(2, "0");
  const month = String(Math.floor(Math.random() * 11 + 1)).padStart(2, "0");
  return day + "." + month;
}

function getRandomAreas() {
  const categories = ["WebDesign", "UX/UI", "Motion", "Generative", "Graphic"];
  const selected = categories.filter(() => Math.random() > 0.5);
  return (selected.length ? selected : ["WebDesign"]).join(", ");
}

/* ------------------ HIDE LOADER ------------------ */

function hideLoader() {
  const loadingDiv = document.getElementById("loading");
  const loaderImg = loadingDiv.querySelector("img");

  const rotationDuration = 1500;
  loaderImg.style.animationIterationCount = 1;
 
  setTimeout(() => {
     loadingDiv.classList.remove("active");
    loadingDiv.classList.add("exit"); 
    document.body.classList.remove("no-scroll");

    if (pendingHash) {
      const target = document.querySelector(pendingHash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  }, rotationDuration);
}
