const API_KEY = "qR4ziHpPM6em6t1N0Tq7GyJC6Ig8P2p66b2bWFi2ozNzy7OYEybWMpMS";
const IMAGE_COUNT = 2;
const QUERY = "black sand beach";
let stars = []

document.addEventListener("DOMContentLoaded", () => {
  fetchContent();
});

async function fetchContent() {
  const url = `https://api.pexels.com/v1/search?query=${QUERY}&per_page=${IMAGE_COUNT}&orientation=landscape`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch images from Pexels");
    }

    const data = await response.json();
    const imageWrapper = document.querySelector(".imageWrapper");
    imageWrapper.innerHTML = renderImages(data);

    const paginationDiv = document.querySelector(".pagination");
    paginationDiv.innerHTML = getText("pagination");

    const titleDiv = document.querySelector(".projTitle>.carousel");
    titleDiv.innerHTML = getText("title");

    const designAreaDiv = document.querySelector(".areaDesign");
    designAreaDiv.innerHTML = getText("areas");

    const dateDiv = document.querySelector(".dayAndMonth");
    dateDiv.innerHTML = getText("date");

    const yearDiv = document.querySelector(".year");
    yearDiv.innerHTML = getText("year");

    const descriptionDiv = document.querySelector(".descContainer>.carousel");
    descriptionDiv.innerHTML = getText("description");

    stars = document.querySelectorAll(".pagination span");
  } catch (error) {
    console.error("Error loading images:", error);
  }
}

function renderImages(data) {
  let html = "";
  data.photos.forEach((photo) => {
    html += `<div class="carouselItem"><img src=${photo.src.landscape} alt=${photo.alt}></div>`;
  });
  return html;
}

function getText(type) {
  let html = "";
  for (let i = 0; i < IMAGE_COUNT; i++) {
    switch (type) {
      case "pagination":
        html += "<span>*</span>";
        break;

      case "title":
        html += `<p>Lorem Ipsum ${i}</p>`;
        break;

      case "areas":
        html += `<p>${getRandomAreas()}</p>`;
        break;

      case "date":
        html += `<p>${getRandomDate()}</p>`;
        break;

      case "year":
        html += `<p>${String(Math.floor(Math.random() * 10 + 2015))}</p>`;
        break;

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
  let day = String(Math.floor(Math.random() * 29 + 1)).padStart(2, "0");
  let month = String(Math.floor(Math.random() * 11 + 1)).padStart(2, "0");

  return day + "." + month;
}

function getRandomAreas() {
  const categories = ["WebDesign", "UX/UI", "Motion", "Generative", "Graphic"];

  const selected = categories.filter(() => Math.random() > 0.5);

  return (selected.length ? selected : ["WebDesign"]).join(", ");
}

/* CAROUSEL LOGIC */
const carousels = document.querySelectorAll(".carousel");

let timer;

let counter = -1;

function moveCarousel(dir = 1) {
  counter += dir;
  let currentSlide = ((counter % IMAGE_COUNT) + IMAGE_COUNT) % IMAGE_COUNT;

  for (carousel of carousels) {
    let children = carousel.children;
    for (child of children) {
      child.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }

  stars.forEach((star, index) => {
    if (index > currentSlide) star.style.paddingLeft = "100%";
    else star.style.paddingLeft = "0%";
  });

  resetTimer();
}
moveCarousel();

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => moveCarousel(), 5000);
}

const fwrdButton = document.querySelector(".buttonContainer :last-child");
fwrdButton.addEventListener("click", () => moveCarousel());

const bkwButton = document.querySelector(".buttonContainer :first-child");
bkwButton.addEventListener("click", () => moveCarousel(-1));
