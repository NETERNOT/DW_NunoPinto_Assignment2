const API_KEY = "qR4ziHpPM6em6t1N0Tq7GyJC6Ig8P2p66b2bWFi2ozNzy7OYEybWMpMS";
const IMAGE_COUNT = 10;
const QUERY = "chick";

document.addEventListener("DOMContentLoaded", () => {
    fetchImages();
});

async function fetchImages() {
    const url = `https://api.pexels.com/v1/search?query=${QUERY}&per_page=${IMAGE_COUNT}&orientation=landscape`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: API_KEY
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch images from Pexels");
        }

        const data = await response.json();
        const imageWrapper = document.querySelector(".imageWrapper");

        // Clear existing images
        imageWrapper.innerHTML = "";

        data.photos.forEach(photo => {
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("carouselItem");

            const img = document.createElement("img");
            img.src = photo.src.landscape;
            img.alt = photo.alt || QUERY;

            imgDiv.appendChild(img);
            imageWrapper.appendChild(imgDiv);
        });

    } catch (error) {
        console.error("Error loading images:", error);
    }
}
