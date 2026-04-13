// INIT AOS
AOS.init();

// OPEN ADMIN
function openAdmin() {
  window.open("admin.html", "_blank");
}

// SHOW POPUP
function showPopup(name) {
  document.getElementById("popupMessage").innerText =
    `${name}, your slot has been successfully booked!`;

  document.getElementById("popup").classList.add("show");
}

// CLOSE POPUP
function closePopup() {
  document.getElementById("popup").classList.remove("show");
}

// FORM SUBMIT
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("serviceSelect").value;

  if (phone.length !== 10) {
    alert("Phone number must be 10 digits");
    return;
  }

  await fetch("http://localhost:5000/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, phone, service })
  });

  // SHOW POPUP
  showPopup(name);

  // RESET FORM
  document.getElementById("contactForm").reset();
});