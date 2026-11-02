// ========================================
// KANNAN PORTFOLIO - SCRIPT.JS
// ========================================

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Update navigation button when scrolling
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// ====================================
// CERTIFICATE POPUP FUNCTIONALITY
// ====================================

const certificateImages = document.querySelectorAll(".certificate-gallery img");

const certificateModal = document.getElementById("certificateModal");
const modalCertificate = document.getElementById("modalCertificate");
const closeModal = document.getElementById("closeModal");

const prevButton = document.getElementById("prevCertificate");
const nextButton = document.getElementById("nextCertificate");

const certificateCounter = document.getElementById("certificateCounter");

let currentCertificate = 0;

// Open certificate popup
function openCertificate(index) {
  currentCertificate = index;

  modalCertificate.src = certificateImages[index].src;
  modalCertificate.alt = certificateImages[index].alt;

  certificateCounter.textContent = `Certificate ${index + 1} of ${certificateImages.length}`;

  certificateModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Close popup
function closeCertificate() {
  certificateModal.classList.remove("show");
  document.body.style.overflow = "";
}

// Display previous certificate
function previousCertificate() {
  currentCertificate--;

  if (currentCertificate < 0) {
    currentCertificate = certificateImages.length - 1;
  }

  openCertificate(currentCertificate);
}

// Display next certificate
function nextCertificate() {
  currentCertificate++;

  if (currentCertificate >= certificateImages.length) {
    currentCertificate = 0;
  }

  openCertificate(currentCertificate);
}

// Click certificate images
certificateImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    openCertificate(index);
  });
});

// Close button
closeModal.addEventListener("click", closeCertificate);

// Previous and next buttons
prevButton.addEventListener("click", previousCertificate);
nextButton.addEventListener("click", nextCertificate);

// Close when clicking outside the certificate
certificateModal.addEventListener("click", (event) => {
  if (event.target === certificateModal) {
    closeCertificate();
  }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
  if (!certificateModal.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeCertificate();
  }

  if (event.key === "ArrowLeft") {
    previousCertificate();
  }

  if (event.key === "ArrowRight") {
    nextCertificate();
  }
});
