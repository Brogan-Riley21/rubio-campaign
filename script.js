const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteShell = document.getElementById("site-shell");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const form = document.getElementById("signup-form");
const formMessage = document.getElementById("form-message");

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.classList.remove("success");

    if (!form.checkValidity()) {
      formMessage.textContent = "Please fill out all fields correctly.";
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = data.get("name");
    formMessage.classList.add("success");
    formMessage.textContent = `Thank you, ${name}. You're on the team — we'll reach out with opportunities near you.`;
    form.reset();
  });
}

const footerSignup = document.getElementById("footer-signup");
const footerSignupMsg = document.getElementById("footer-signup-msg");

if (footerSignup && footerSignupMsg) {
  footerSignup.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!footerSignup.checkValidity()) {
      footerSignup.reportValidity();
      return;
    }
    footerSignupMsg.textContent = "You're signed up for campaign updates.";
    footerSignup.reset();
  });
}

function setupHorizontalScroll(trackId, prevSelector, nextSelector, amount = 280) {
  const track = document.getElementById(trackId);
  const prev = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);
  if (!track || !prev || !next) return;

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -amount, behavior: "smooth" });
  });
  next.addEventListener("click", () => {
    track.scrollBy({ left: amount, behavior: "smooth" });
  });
}

setupHorizontalScroll("subnav-track", ".subnav-scroll-btn--prev", ".subnav-scroll-btn--next", 220);
setupHorizontalScroll("priority-track", ".priority-scroll-btn--prev", ".priority-scroll-btn--next", 300);

if (siteShell) {
  const onScroll = () => {
    siteShell.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const navLinks = document.querySelectorAll("[data-nav]");
const sections = [...navLinks]
  .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

const searchRoot = document.getElementById("site-search");
const searchToggle = document.querySelector(".search-toggle");
const searchClose = document.querySelector(".search-close");
const searchBackdrop = document.querySelector(".site-search-backdrop");
const searchInput = document.getElementById("search-input");

function openSearch() {
  if (!searchRoot) return;
  searchRoot.hidden = false;
  searchToggle?.setAttribute("aria-expanded", "true");
  searchInput?.focus();
}

function closeSearch() {
  if (!searchRoot) return;
  searchRoot.hidden = true;
  searchToggle?.setAttribute("aria-expanded", "false");
}

searchToggle?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);
searchBackdrop?.addEventListener("click", closeSearch);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchRoot && !searchRoot.hidden) {
    closeSearch();
  }
});

searchRoot?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeSearch);
});

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    searchRoot.querySelectorAll(".search-suggestions li").forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.hidden = query.length > 0 && !text.includes(query);
    });
  });
}
