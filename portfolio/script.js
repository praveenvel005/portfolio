// Global variables
let maniCurrentTheme = "dark";
let senthilTypingIndex = 0;
let balaTypingSpeed = 100;
let praveenDeleteSpeed = 50;
let velPauseTime = 2000;

const subraTypingTexts = [
  "Web Developer",
  "Frontend Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Creative Coder",
];

// Preloader
window.addEventListener("load", () => {
  const praveenLoader = document.getElementById("praveenLoader");
  setTimeout(() => {
    praveenLoader.style.opacity = "0";
    setTimeout(() => {
      praveenLoader.style.display = "none";
      maniInitAnimations();
    }, 500);
  }, 1500);
});

// Initialize animations
function maniInitAnimations() {
  velCreateParticles();
  senthilStartTyping();
  balaObserveElements();
  subraInitScrollProgress();
}

// Particle system
function velCreateParticles() {
  const particleContainer = document.getElementById("velParticles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "praveen-particle";

    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = x + "%";
    particle.style.top = y + "%";
    particle.style.animationDelay = delay + "s";
    particle.style.opacity = Math.random() * 0.5 + 0.2;

    particleContainer.appendChild(particle);
  }
}

// Typing animation
function senthilStartTyping() {
  const typingElement = document.getElementById("senthilTyping");
  let maniCurrentTextIndex = 0;
  let praveenCurrentCharIndex = 0;
  let velIsDeleting = false;

  function balaType() {
    const currentText = subraTypingTexts[maniCurrentTextIndex];

    if (velIsDeleting) {
      typingElement.textContent = currentText.substring(
        0,
        praveenCurrentCharIndex - 1
      );
      praveenCurrentCharIndex--;
    } else {
      typingElement.textContent = currentText.substring(
        0,
        praveenCurrentCharIndex + 1
      );
      praveenCurrentCharIndex++;
    }

    let senthilSpeed = velIsDeleting ? praveenDeleteSpeed : balaTypingSpeed;

    if (!velIsDeleting && praveenCurrentCharIndex === currentText.length) {
      senthilSpeed = velPauseTime;
      velIsDeleting = true;
    } else if (velIsDeleting && praveenCurrentCharIndex === 0) {
      velIsDeleting = false;
      maniCurrentTextIndex =
        (maniCurrentTextIndex + 1) % subraTypingTexts.length;
    }

    setTimeout(balaType, senthilSpeed);
  }

  balaType();
}

// Intersection Observer for animations
function balaObserveElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("mani-visible");

          // Animate progress bars
          if (entry.target.classList.contains("senthil-skills")) {
            praveenAnimateSkills();
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".subra-section").forEach((section) => {
    observer.observe(section);
  });
}

// Skills animation
function praveenAnimateSkills() {
  const progressBars = document.querySelectorAll(".mani-progress-fill");
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    }, index * 200);
  });
}

// Scroll progress bar
function subraInitScrollProgress() {
  const progressBar = document.getElementById("velProgressBar");

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrolled + "%";
  });
}

// Navigation functionality
const maniHamburger = document.getElementById("maniHamburger");
const velMenu = document.getElementById("velMenu");
const praveenLinks = document.querySelectorAll(".praveen-link");

maniHamburger.addEventListener("click", () => {
  velMenu.classList.toggle("bala-active");

  const spans = maniHamburger.querySelectorAll("span");
  spans.forEach((span, index) => {
    if (velMenu.classList.contains("bala-active")) {
      if (index === 0)
        span.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (index === 1) span.style.opacity = "0";
      if (index === 2)
        span.style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      span.style.transform = "none";
      span.style.opacity = "1";
    }
  });
});

// Smooth scrolling and active link highlighting
praveenLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Close mobile menu
    velMenu.classList.remove("bala-active");
    const spans = maniHamburger.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.transform = "none";
      span.style.opacity = "1";
    });
  });
});

// Active link highlighting on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".subra-section, .senthil-hero");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const correspondingLink = document.querySelector(`a[href="#${id}"]`);

    if (scrollPos >= top && scrollPos <= bottom) {
      praveenLinks.forEach((link) => link.classList.remove("bala-active"));
      if (correspondingLink) {
        correspondingLink.classList.add("bala-active");
      }
    }
  });
});

// Theme toggle
const subraThemeToggle = document.getElementById("subraThemeToggle");

subraThemeToggle.addEventListener("click", () => {
  maniCurrentTheme = maniCurrentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", maniCurrentTheme);

  subraThemeToggle.textContent = maniCurrentTheme === "dark" ? "🌙" : "☀️";

  // Add ripple effect
  velCreateRipple(subraThemeToggle, event);
});

// Ripple effect function
function velCreateRipple(element, event) {
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  const rect = element.getBoundingClientRect();
  circle.style.width = circle.style.height = diameter + "px";
  circle.style.left = event.clientX - rect.left - radius + "px";
  circle.style.top = event.clientY - rect.top - radius + "px";
  circle.classList.add("praveen-ripple");

  const ripple = element.getElementsByClassName("praveen-ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  element.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 600);
}

// Add ripple CSS
const praveenRippleStyle = document.createElement("style");
praveenRippleStyle.textContent = `
            .praveen-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: bala-ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes bala-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(praveenRippleStyle);

// Add ripple to all buttons
document.querySelectorAll(".senthil-cta, .vel-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    velCreateRipple(button, e);
  });
});
// Slideshow functionality
window.onload = () => {
  let balaSlideIndex = 1;
  showSlides(balaSlideIndex);

  function balaPlusSlides(n) {
    showSlides((balaSlideIndex += n));
  }

  function balaCurrentSlide(n) {
    showSlides((balaSlideIndex = n));
  }

  function showSlides(n) {
    const slides = document.getElementsByClassName("praveen-slide");
    const dots = document.getElementsByClassName("mani-slide-dot");

    if (slides.length === 0) return;

    if (n > slides.length) balaSlideIndex = 1;
    if (n < 1) balaSlideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove("bala-active");
    }

    slides[balaSlideIndex - 1].style.display = "block";
    if (dots.length >= balaSlideIndex) {
      dots[balaSlideIndex - 1].classList.add("bala-active");
    }
  }

  // Auto slide change every 5s
  setInterval(() => {
    balaPlusSlides(1);
  }, 3000);

  // Make the functions available globally for inline onclick
  window.balaPlusSlides = balaPlusSlides;
  window.balaCurrentSlide = balaCurrentSlide;

  // Timeline observer
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("mani-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".bala-timeline-container").forEach((item) => {
    timelineObserver.observe(item);
  });
};

// Enhanced Contact form with email functionality
const balaContactForm = document.getElementById("balaContactForm");
const emailServiceURL = "https://formspree.io/f/xwpbrgnk"; // Replace with your Formspree ID

balaContactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("praveenName").value.trim();
  const email = document.getElementById("velEmail").value.trim();
  const message = document.getElementById("subraMessage").value.trim();

  let senthilIsValid = true;

  // Reset errors
  document.querySelectorAll(".vel-form-error").forEach((error) => {
    error.style.display = "none";
  });

  // Name validation
  if (!name) {
    document.getElementById("praveenNameError").style.display = "block";
    senthilIsValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById("velEmailError").style.display = "block";
    senthilIsValid = false;
  }

  // Message validation
  if (!message) {
    document.getElementById("subraMessageError").style.display = "block";
    senthilIsValid = false;
  }

  if (senthilIsValid) {
    const submitButton = balaContactForm.querySelector(".senthil-cta");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch(emailServiceURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });

      if (response.ok) {
        // Success animation
        submitButton.innerHTML = "✓ Sent!";
        submitButton.style.backgroundColor = "#4BB543";

        // Show success message with animation
        const successMessage = document.createElement("div");
        successMessage.className = "mani-success-message";
        successMessage.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                `;
        balaContactForm.appendChild(successMessage);

        // Reset form after delay
        setTimeout(() => {
          balaContactForm.reset();
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.style.backgroundColor = "";
          successMessage.remove();
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      submitButton.textContent = "Error! Try Again";
      submitButton.style.backgroundColor = "#ff6b6b";

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "";
      }, 2000);
    }
  }
});

// Add floating animation to project cards
function maniFloatingAnimation() {
  const projectCards = document.querySelectorAll(".vel-project-card");

  projectCards.forEach((card, index) => {
    const delay = index * 0.1;
    card.style.animation = `bala-float 6s ease-in-out infinite ${delay}s`;
  });
}

// Initialize floating animation when projects section is visible
const projectsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        maniFloatingAnimation();
      }
    });
  },
  { threshold: 0.3 }
);

const projectsSection = document.getElementById("praveenProjects");
if (projectsSection) {
  projectsObserver.observe(projectsSection);
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".vel-particles");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add scroll-triggered animations for about section
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const profileImg = entry.target.querySelector(".bala-profile-img");
        const aboutText = entry.target.querySelector(".mani-about-text");

        if (profileImg) {
          profileImg.style.animation = "mani-slideInLeft 1s ease-out";
        }
        if (aboutText) {
          aboutText.style.animation =
            "senthil-slideInRight 1s ease-out 0.3s both";
        }
      }
    });
  },
  { threshold: 0.3 }
);

const aboutSection = document.getElementById("velAbout");
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}

// Performance optimization: Throttle scroll events
function maniThrottle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = maniThrottle(() => {
  subraInitScrollProgress();
}, 16);

window.addEventListener("scroll", throttledScrollHandler);

// Add entrance animations for skills cards
function praveenAnimateSkillCards() {
  const skillCards = document.querySelectorAll(".praveen-skill");

  skillCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
    }, index * 100);
  });
}

// Initialize skill cards with initial hidden state
document.querySelectorAll(".praveen-skill").forEach((card) => {
  card.style.transform = "translateY(30px)";
  card.style.opacity = "0";
  card.style.transition = "all 0.6s ease";
});

// Enhanced skills section observer
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        praveenAnimateSkillCards();
        setTimeout(() => {
          praveenAnimateSkills();
        }, 800);
      }
    });
  },
  { threshold: 0.2 }
);

const skillsSection = document.getElementById("senthilSkills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Add dynamic cursor effect
const cursor = document.createElement("div");
cursor.className = "subra-cursor-effect";
cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--praveen-primary), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor.style.opacity = "0.7";
});

document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

// Enhanced project card interactions
document.querySelectorAll(".vel-project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02) rotateX(5deg)";
    card.style.transformStyle = "preserve-3d";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1) rotateX(0deg)";
  });
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme
  document.documentElement.setAttribute("data-theme", maniCurrentTheme);

  // Add loading animation to elements
  const elements = document.querySelectorAll(".subra-section");
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
});



console.log(
  "🚀 Portfolio by Praveenvel Balasubramanian - Updated successfully!"
);
