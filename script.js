
const container = document.querySelector(".container");
document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  container.style.transform = `translateY(${scrollY}px) scale(${
    1 - scrollY / 1000
  })`;
});

const now = new Date();
const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const timezoneOffset = String(-now.getTimezoneOffset() / 60).padStart(2, "0");

document.querySelector(
  ".currentTime"
).innerHTML = `${hours}:${minutes} GMT+${timezoneOffset}`;

const carousels = document.querySelectorAll(".carousel");
const stars = document.querySelectorAll(".pagination span");
console.log(stars);
let counter = 0;

function moveCarousel() {
  let total = 0;
  for (carousel of carousels) {
    let children = carousel.children;
    total = children.length;
    for (child of children) {
      child.style.transform = `translateX(-${counter % total}00%)`;
    }
  }

  total = stars.length;
  stars.forEach((star, index) => {
    if (index > counter % total) star.style.paddingLeft = "100%";
    else star.style.paddingLeft = "0%";
  });

  counter += 1;
}
moveCarousel();
setInterval(moveCarousel, 5000);
