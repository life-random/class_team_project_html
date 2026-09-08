const nav = document.querySelector(".nav");
const navMenu = nav?.querySelector(".nav-menu");
const navButtons = navMenu ? [...navMenu.querySelectorAll(".nav-button")] : [];
const searchArea = nav?.querySelector(".search-area");
const header = document.querySelector("header");
const sidebarToggle = header.querySelector("#sidebar");
const headerMenu = header.querySelector(".hd-menu");
const desktop = matchMedia("(min-width: 911px)");
const stackedNav = matchMedia("(max-width: 730px)");

let wheelCount = 0;

function closeMegaMenus() {
  if (!nav) return;

  nav
    .querySelectorAll(".mega-menu-open, .mega-menu-active")
    .forEach((element) => element.classList.remove("mega-menu-open", "mega-menu-active"));
  nav.querySelectorAll("[data-mega-menu]").forEach((button) => button.setAttribute("aria-expanded", "false"));
}

function toggleMegaMenu(button) {
  const wasOpen = button.classList.contains("mega-menu-active");
  closeMegaMenus();
  if (wasOpen || !desktop.matches) return;

  document.getElementById(button.dataset.megaMenu).classList.add("mega-menu-open");
  button.classList.add("mega-menu-active");
  button.setAttribute("aria-expanded", "true");
  nav.classList.remove("nav--hidden");
  wheelCount = 0;
}

function closeHeaderMenu() {
  sidebarToggle.checked = false;
  header.querySelectorAll(".accordion-toggle").forEach((toggle) => (toggle.checked = false));
}

nav?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mega-menu]");
  if (button) toggleMegaMenu(button);
});

sidebarToggle.addEventListener("change", () => {
  if (sidebarToggle.checked) closeMegaMenus();
  else closeHeaderMenu();
});

headerMenu.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  closeHeaderMenu();
});

document.addEventListener("click", (event) => {
  if (!nav?.contains(event.target)) closeMegaMenus();
  if (!header.contains(event.target)) closeHeaderMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMegaMenus();
  closeHeaderMenu();
});

function updateVisibleButtons() {
  if (!nav || !navMenu || !searchArea) return;

  navButtons.forEach((button) => (button.hidden = false));
  const style = getComputedStyle(nav);
  const available = nav.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  const searchWidth = stackedNav.matches ? 0 : searchArea.offsetWidth;

  while (navMenu.scrollWidth + searchWidth > available) {
    const lastVisibleButton = navButtons.filter((button) => !button.hidden).at(-1);
    if (!lastVisibleButton) break;
    lastVisibleButton.hidden = true;
  }
}

window.addEventListener(
  "wheel",
  ({ deltaY }) => {
    if (!deltaY) return;

    if (nav?.querySelector(".mega-menu-open")) {
      wheelCount = 0;
      nav.classList.remove("nav--hidden");
    } else if (deltaY > 0 && nav.getBoundingClientRect().top <= 0) {
      if (++wheelCount >= 5) nav.classList.add("nav--hidden");
    } else if (deltaY < 0) {
      wheelCount = 0;
      nav.classList.remove("nav--hidden");
    } else {
      wheelCount = 0;
    }
  },
  { passive: true },
);

window.addEventListener("resize", () => {
  updateVisibleButtons();
  desktop.matches ? closeHeaderMenu() : closeMegaMenus();
});

updateVisibleButtons();
