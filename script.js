document.addEventListener("DOMContentLoaded", () => {
  /* --------------------
     Typing animation (custom, no external lib)
     -------------------- */
  const typedElm = document.getElementById("typed-text");
  const phrases = [
    "Pertunia Lesego Ndhlovu",
    "Frontend Developer",
    "React Developer",
    "MERN Stack Developer",
  ];
  let pIndex = 0,
    lIndex = 0,
    deleting = false;
  const typeSpeed = 90,
    deleteSpeed = 50,
    pause = 1600;

  function tick() {
    const current = phrases[pIndex];
    if (!deleting) {
      typedElm.textContent = current.slice(0, ++lIndex);
      if (lIndex === current.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      typedElm.textContent = current.slice(0, --lIndex);
      if (lIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  }
  // start typing a little after load
  setTimeout(tick, 700);

  /* --------------------
     Hero smooth entrance (fade + translate)
     -------------------- */
  const heroSection = document.querySelector(".hero");
  heroSection.style.opacity = 0;
  heroSection.style.transform = "translateY(28px)";
  setTimeout(() => {
    heroSection.style.transition = "all 1.4s ease";
    heroSection.style.opacity = 1;
    heroSection.style.transform = "translateY(0)";
  }, 100);

  /* --------------------
     IntersectionObserver: Reveal sections & animate skills
     -------------------- */
  const sections = document.querySelectorAll(".section");
  const skillItems = document.querySelectorAll(".skill-item");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // if skills section, reveal skills with stagger
          if (entry.target.id === "skills") {
            skillItems.forEach((item, idx) => {
              setTimeout(() => item.classList.add("revealed"), idx * 90);
            });
          }
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  /* --------------------
     Projects filtering
     -------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  function showAllProjects() {
    projectCards.forEach((card, i) => {
      card.style.display = "block";
      setTimeout(() => card.classList.add("show"), i * 50);
    });
  }

  projectCards.forEach((card) => (card.style.display = "none"));
  setTimeout(showAllProjects, 120);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      projectCards.forEach((card, idx) => {
        const category = (card.dataset.category || "").toLowerCase();
        const match = filter === "all" || category === filter;
        if (match) {
          card.style.display = "block";
          setTimeout(() => card.classList.add("show"), 20 + idx * 30);
        } else {
          card.classList.remove("show");
          setTimeout(() => (card.style.display = "none"), 320);
        }
      });
    });
  });

  /* --------------------
     Navbar scroll highlight
     -------------------- */
  const navLinks = document.querySelectorAll(".nav-link");
  function onScrollHighlight() {
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentId}`) link.classList.add("active");
    });
  }
  window.addEventListener("scroll", onScrollHighlight, { passive: true });
  onScrollHighlight();

  /* --------------------
     Smooth scroll for nav links
     -------------------- */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* --------------------
     Sticky navbar shadow
     -------------------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 30) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    },
    { passive: true }
  );

  /* --------------------
     Optional social nav helpers
     -------------------- */
  window.goToGitHub = () => {
    window.location.href = "https://github.com/PertuniaSegoss";
  };
  window.goToLinkedIn = () => {
    window.location.href =
      "https://www.linkedin.com/in/pertunia-ndhlovu-384372201/";
  };
});
