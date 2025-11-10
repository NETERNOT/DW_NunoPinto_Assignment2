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


const captionButton = document.querySelector(".projTitle button")
const descContainer = document.querySelector(".descContainer")

captionButton.addEventListener("click", ()=>{
    descContainer.classList.toggle("active")
})