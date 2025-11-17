document.addEventListener("DOMContentLoaded", () => {
  // Fetch and inject the navbar
  fetch("partials/navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbar-placeholder").innerHTML = html;

      // Active navbar link on scroll
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                  link.classList.add("active");
                }
              });
            }
          });
        },
        {
          threshold: 0.5, // When 50% of the section is visible
          rootMargin: "0px",
        }
      );

      sections.forEach((section) => {
        sectionObserver.observe(section);
      });
    })
    .catch((error) => {
      console.error("Error fetching navbar:", error);
    });

  // Unified Intersection Observer for all animations
  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = parseInt(element.getAttribute("data-delay")) || 0;

          setTimeout(() => {
            // Trigger typing animation
            if (element.classList.contains("typing-text")) {
              element.classList.add("active");
              const paragraphs =
                element.querySelectorAll(".typing-paragraph");
              paragraphs.forEach((p, index) => {
                setTimeout(() => {
                  p.classList.add("typing");
                  // After typing animation, remove class and add 'typed'
                  setTimeout(() => {
                    p.classList.remove("typing");
                    p.classList.add("typed");
                  }, 3000); // Duration of typing animation
                }, index * 3200); // Stagger paragraph animations
              });
            } else {
              // Trigger other animations like fade-up, scale-in, etc.
              element.classList.add("animate");
            }
          }, delay);

          // Stop observing the element after animation is triggered
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1, // Start animation when 10% of the element is visible
      rootMargin: "0px",
    }
  );

  // Select all elements that need to be animated
  const animatedElements = document.querySelectorAll(
    ".fade-up, .scale-in, .slide-from-left, .typing-text"
  );

  // Observe each animated element
  animatedElements.forEach((el) => {
    animationObserver.observe(el);
  });
});