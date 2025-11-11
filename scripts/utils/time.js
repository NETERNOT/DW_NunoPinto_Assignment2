export function initClock() {
  const currentTimeEl = document.querySelector(".currentTime");
  if (!currentTimeEl) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timezoneOffset = String(-now.getTimezoneOffset() / 60).padStart(2, "0");

  currentTimeEl.innerHTML = `${hours}:${minutes} GMT+${timezoneOffset}`;
}
