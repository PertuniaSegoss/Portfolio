document.addEventListener("DOMContentLoaded", () => {
  /* --------------------
     Typing animation (hero)
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
    if (!typedElm) return; // safety check
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
  setTimeout(tick, 700);

  /* --------------------
     IntersectionObserver: Reveal sections & animate skills
     -------------------- */
  const sections = document.querySelectorAll("section");
  const skillItems = document.querySelectorAll(".skill-card");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

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

  // Initial hide
  projectCards.forEach((card) => (card.style.display = "none"));
  setTimeout(showAllProjects, 120);

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter.toLowerCase();

      projectCards.forEach((card, idx) => {
        const category = (card.dataset.category || "").toLowerCase();
        const match = filter === "all" || category === filter;
        if (match) {
          card.style.display = "block";
          setTimeout(() => card.classList.add("show"), 20 + idx * 30);
        } else {
          card.classList.remove("show");
          setTimeout(() => {
            card.style.display = "none";
          }, 320);
        }
      });
    });
  });

  /* --------------------
     Navbar scroll highlight
     -------------------- */
  const navLinks = document.querySelectorAll(".nav-links a");

  function onScrollHighlight() {
    let currentId = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`)
        link.classList.add("active");
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
     Optional helper navigation functions
     -------------------- */
  window.goToGitHub = () => {
    window.open("https://github.com/PertuniaSegoss", "_blank");
  };
  window.goToLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/pertunia-ndhlovu-384372201/",
      "_blank"
    );
  };
});
