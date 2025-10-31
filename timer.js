function getNextSundayStart() {
  const now = new Date();
  const nextSunday = new Date();

  // Get day index (0 = Sunday, 6 = Saturday)
  const dayOfWeek = now.getDay();

  // Always move to *next week's* Sunday
  const daysUntilNextSunday = 7 - dayOfWeek + 7; // always 7 days ahead of next Sunday

  nextSunday.setDate(now.getDate() + daysUntilNextSunday);
  nextSunday.setHours(0, 0, 0, 0); // Start of Sunday (midnight)

  return nextSunday;
}

function updateCountdown() {
  const now = new Date().getTime();
  const target = getNextSundayStart().getTime();
  const distance = target - now;

  if (distance <= 0) {
    document.querySelector(".countdown").innerHTML = "<h2>Offer Ended</h2>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();
