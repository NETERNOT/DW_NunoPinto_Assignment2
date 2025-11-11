import { IMAGE_COUNT, API_KEY, QUERY } from "../config.js";

export async function fetchContent() {
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

    // Render images
    const imageWrapper = document.querySelector(".imageWrapper");
    if (imageWrapper) imageWrapper.innerHTML = renderImages(data);

    // Populate carousel content
    const paginationDiv = document.querySelector(".pagination");
    if (paginationDiv) paginationDiv.innerHTML = getText("pagination");

    const titleDiv = document.querySelector(".projTitle>.carousel");
    if (titleDiv) titleDiv.innerHTML = getText("title");

    const designAreaDiv = document.querySelector(".areaDesign");
    if (designAreaDiv) designAreaDiv.innerHTML = getText("areas");

    const dateDiv = document.querySelector(".dayAndMonth");
    if (dateDiv) dateDiv.innerHTML = getText("date");

    const yearDiv = document.querySelector(".year");
    if (yearDiv) yearDiv.innerHTML = getText("year");

    const descriptionDiv = document.querySelector(".descContainer>.carousel");
    if (descriptionDiv) descriptionDiv.innerHTML = getText("description");

    return document.querySelectorAll(".pagination span"); // Stars for carousel
  } catch (error) {
    console.error("Error loading images:", error);
    return [];
  }
}

function renderImages(data) {
  let html = "";
  data.photos.forEach((photo) => {
    html += `<div class="carouselItem"><img src=${photo.src.landscape} alt="${photo.alt}"></div>`;
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
  const day = String(Math.floor(Math.random() * 29 + 1)).padStart(2, "0");
  const month = String(Math.floor(Math.random() * 11 + 1)).padStart(2, "0");
  return day + "." + month;
}

function getRandomAreas() {
  const categories = ["WebDesign", "UX/UI", "Motion", "Generative", "Graphic"];
  const selected = categories.filter(() => Math.random() > 0.5);
  return (selected.length ? selected : ["WebDesign"]).join(", ");
}
