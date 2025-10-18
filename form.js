const modal = document.getElementById("contactModal");
const closeBtn = modal.querySelector(".close");
const form = modal.querySelector("#contactForm");
const successMsg = modal.querySelector("#successMsg");
const submitBtn = form.querySelector("button[type='submit']");

// Open modal
document.querySelectorAll(".contactBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
    successMsg.style.display = "none";
  });
});

// Close modal
closeBtn.addEventListener("click", () => modal.style.display = "none");

// Close modal on clicking outside
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const organization = form.elements["organization"].value;
  const phone = form.elements["phone"].value;
  const timestamp = new Date().toISOString();

  // Loading state
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Submitting...";

  try {
    await fetch("https://script.google.com/macros/s/AKfycbxM8beb7Ydq7G5DuBFhUG8QkicPDsOFYsyEgN35azyLNJxLOQeGKhxdIH55_LzqCuGi3w/exec", {
      method: "POST",
      mode: "no-cors", // required for Apps Script if CORS not enabled
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, organization, phone, timestamp })
    });

    // Success (can't read response in no-cors, so assume success)
    form.reset();
    successMsg.style.color = "green";
    successMsg.textContent = "Submitted successfully!";
    successMsg.style.display = "block";
  } catch (err) {
    successMsg.style.color = "red";
    successMsg.textContent = "Error submitting form. Try again!";
    successMsg.style.display = "block";
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});