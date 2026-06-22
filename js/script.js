/* Ticket Modal */
const ticketModal = document.getElementById("ticketModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeModalBtn2 = document.getElementById("closeModalBtn2");

/* Gallery Modal */
const galleryModal = document.getElementById("galleryModal");
const closeGalleryBtn = document.getElementById("closeGalleryBtn");
const galPrevBtn = document.getElementById("galPrevBtn");
const galNextBtn = document.getElementById("galNextBtn");
const galleryMainImage = document.getElementById("galleryMainImage");
const galleryMemberInfo = document.getElementById("galleryMemberInfo");
const galleryTriggers = document.querySelectorAll(".gallery-trigger");

let currentGalleryIndex = 0;
let galleryElements = [];

// Gallery Modal functions
function openGalleryModal(index = 0) {
  currentGalleryIndex = index;
  updateGalleryDisplay();
  galleryModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeGalleryModal() {
  galleryModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function nextGalleryImage() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryElements.length;
  updateGalleryDisplay();
}

function prevGalleryImage() {
  currentGalleryIndex =
    (currentGalleryIndex - 1 + galleryElements.length) % galleryElements.length;
  updateGalleryDisplay();
}

// Gallery trigger click
galleryTriggers.forEach((trigger) => {
  galleryElements.push(trigger);
  trigger.addEventListener("click", () => {
    const index = galleryElements.indexOf(trigger);
    openGalleryModal(index);
  });
});

// Gallery close button
closeGalleryBtn.addEventListener("click", closeGalleryModal);

// Gallery navigation buttons
galPrevBtn.addEventListener("click", prevGalleryImage);
galNextBtn.addEventListener("click", nextGalleryImage);

// Close gallery on overlay click
galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeGalleryModal();
  }
});

// Update gallery display
function updateGalleryDisplay() {
  const element = galleryElements[currentGalleryIndex];
  const image = element.getAttribute("data-gallery-image");
  const name = element.getAttribute("data-gallery-name");

  galleryMainImage.src = image;
  galleryMemberInfo.textContent = name;
}

// Close gallery on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && galleryModal.classList.contains("active")) {
    closeGalleryModal();
  }
  // Arrow keys navigation
  if (galleryModal.classList.contains("active")) {
    if (e.key === "ArrowLeft") {
      prevGalleryImage();
    } else if (e.key === "ArrowRight") {
      nextGalleryImage();
    }
  }
});

const seats = document.querySelectorAll(".seat:not(.reserved)");
const selectedSeatsText = document.getElementById("selectedSeatsText");
const confirmSeatsBtn = document.getElementById("confirmSeatsBtn");
let selectedSeats = new Set();

// Modal functions
function openModal() {
  selectedSeats.clear();
  updateSeatsUI();
  ticketModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  ticketModal.classList.remove("active");
  document.body.style.overflow = "auto";
  seats.forEach((seat) => seat.classList.remove("selected"));
  selectedSeats.clear();
}

// Open modal on button click
document.querySelectorAll(".btn-primary, .btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (
      btn.textContent.includes("Замовити") ||
      btn.textContent.includes("ЗАМОВИТИ")
    ) {
      e.preventDefault();
      openModal();
    }
  });
});

// Close modal on button click
closeModalBtn.addEventListener("click", closeModal);
closeModalBtn2.addEventListener("click", closeModal);

// Close modal on overlay click
ticketModal.addEventListener("click", (e) => {
  if (e.target === ticketModal) {
    closeModal();
  }
});

// Close modal on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && ticketModal.classList.contains("active")) {
    closeModal();
  }
});

// Seat selection
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    const seatId = seat.getAttribute("data-seat");
    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
      seat.classList.remove("selected");
    } else {
      selectedSeats.add(seatId);
      seat.classList.add("selected");
    }
    updateSeatsUI();
  });
});

function updateSeatsUI() {
  if (selectedSeats.size === 0) {
    selectedSeatsText.textContent = "Виберіть місце";
    confirmSeatsBtn.disabled = true;
  } else {
    const seatsArray = Array.from(selectedSeats).sort();
    selectedSeatsText.textContent = `Вибрано: ${seatsArray.join(", ")}`;
    confirmSeatsBtn.disabled = false;
  }
}

// Confirm selection
confirmSeatsBtn.addEventListener("click", () => {
  const seatsArray = Array.from(selectedSeats).sort();
  showNotification(
    `Квитки на місця ${seatsArray.join(", ")} успішно замовлені!`,
  );
  closeModal();
});

// Notification function
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");

  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 4000);
}

/* form submission */
const form = document.getElementById("form");
const formErrors = document.getElementById("formErrors");

function showFormErrors(errors) {
  formErrors.innerHTML = errors.map((error) => `<p>${error}</p>`).join("");
  formErrors.style.display = errors.length ? "block" : "none";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let msg = document.getElementById("msg").value.trim();
  const errors = [];

  if (name.length < 2) errors.push("Ім'я коротке");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Email некоректний");
  if (msg.length < 5) errors.push("Повідомлення коротке");

  if (errors.length) {
    showFormErrors(errors);
    return;
  }

  showFormErrors([]);

  const recipient = "admin@demolink.com"; // Замените на нужный email
  const subject = `Повідомлення від ${name}`;
  const body = `Ім'я: ${name}%0AEmail: ${email}%0A%0AПовідомлення:%0A${msg}`;
  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
});

/* loadng */
window.onload = function () {
  document.querySelector(".preloader").style.display = "none";
};

/* menu burger */
const hamburger = document.querySelector(".menu__icon");
const navMenu = document.querySelector(".header__menu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

/* scroll to top */
var scrollToTopBtn = document.getElementById("scrollToTopBtn");
var rootElement = document.documentElement;
function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    scrollToTopBtn.style.opacity = 1;
  } else {
    scrollToTopBtn.style.opacity = 0;
  }
});

/* sticky menu */
const navbar = document.querySelector(".navbar");
const pageHeight = document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  if (window.scrollY > 10 && !navbar.classList.contains("sticky")) {
    navbar.classList.add("sticky");
  } else if (window.scrollY <= 10 && navbar.classList.contains("sticky")) {
    navbar.classList.remove("sticky");
  }
});
