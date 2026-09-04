const nav = document.querySelector(".nav");
const navMenu = nav.querySelector(".nav-menu");
const navButtons = [...navMenu.querySelectorAll(".nav-button")];
const searchArea = nav.querySelector(".search-area");
const header = document.querySelector("header");
const menuButton = header.querySelector(".menu-icon");
const headerMenu = header.querySelector(".header-menu-content");
const desktop = matchMedia("(min-width: 911px)");
const stackedNav = matchMedia("(max-width: 730px)");

let wheelCount = 0;

function closeMegaMenus() {
  nav.querySelectorAll(".mega-menu-open, .mega-menu-active").forEach((element) =>
    element.classList.remove("mega-menu-open", "mega-menu-active"),
  );
  nav.querySelectorAll("[data-mega-menu]").forEach((button) =>
    button.setAttribute("aria-expanded", "false"),
  );
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
  header.classList.remove("header--menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
  header.querySelectorAll(".mobile-dropdown-open").forEach((menu) =>
    menu.classList.remove("mobile-dropdown-open"),
  );
}

nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mega-menu]");
  if (button) toggleMegaMenu(button);
});

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("header--menu-open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

headerMenu.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  const wrapper = link.parentElement.closest(".menu-wrapper");
  if (wrapper && link.parentElement === wrapper && !desktop.matches) {
    event.preventDefault();
    const open = !wrapper.classList.contains("mobile-dropdown-open");
    header.querySelectorAll(".mobile-dropdown-open").forEach((menu) =>
      menu.classList.remove("mobile-dropdown-open"),
    );
    wrapper.classList.toggle("mobile-dropdown-open", open);
  } else {
    closeHeaderMenu();
  }
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target)) closeMegaMenus();
  if (!header.contains(event.target)) closeHeaderMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMegaMenus();
  closeHeaderMenu();
  menuButton.focus();
});

function updateVisibleButtons() {
  navButtons.forEach((button) => (button.hidden = false));
  const style = getComputedStyle(nav);
  const available = nav.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  const searchWidth = stackedNav.matches ? 0 : searchArea.offsetWidth;

  while (navMenu.scrollWidth + searchWidth > available) {
    [...navMenu.children].filter((button) => !button.hidden).at(-1).hidden = true;
  }
}

window.addEventListener(
  "wheel",
  ({ deltaY }) => {
    if (!deltaY) return;

    if (nav.querySelector(".mega-menu-open")) {
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
