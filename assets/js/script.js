fetch("partials/navbar.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("navbar-placeholder").innerHTML = html;
  })
  .catch((error) => {
    console.error("Error fetching navbar:", error);
  });

// Intersection Observer untuk trigger animasi saat scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

// Observer untuk fade-up elements
const fadeUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const delay = element.getAttribute("data-delay") || 0;

      setTimeout(() => {
        element.classList.add("animate");
      }, delay * 1000);

      fadeUpObserver.unobserve(element);
    }
  });
}, observerOptions);

// Observer untuk typing text
const typingObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const delay = element.getAttribute("data-delay") || 0;

      setTimeout(() => {
        element.classList.add("active");
        const paragraphs = element.querySelectorAll(".typing-paragraph");

        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            p.classList.add("typing");

            // Remove typing class and cursor after animation
            setTimeout(() => {
              p.classList.remove("typing");
              p.classList.add("typed");
            }, 3000);
          }, index * 3200);
        });
      }, delay * 1000);

      typingObserver.unobserve(element);
    }
  });
}, observerOptions);

// Apply observers
document.addEventListener("DOMContentLoaded", () => {
  // Fade up elements di page-2
  document.querySelectorAll("#page-2 .fade-up").forEach((el) => {
    fadeUpObserver.observe(el);
  });

  // Typing text
  document.querySelectorAll(".typing-text").forEach((el) => {
    typingObserver.observe(el);
  });
});
