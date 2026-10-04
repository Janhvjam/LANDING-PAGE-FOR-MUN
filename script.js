const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const filterButtons = document.querySelectorAll(".filter-button");
const committeeCards = document.querySelectorAll(".committee-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    committeeCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.level === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

document.querySelectorAll(".card-action").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".committee-card");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    button.firstChild.textContent = isExpanded ? "Explore committee " : "Close details ";
    card.classList.toggle("expanded", !isExpanded);
  });
});
