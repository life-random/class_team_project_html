const nav = document.querySelector(".nav");
const navMenu = nav?.querySelector(".nav-menu");
const navButtons = [...(navMenu?.querySelectorAll(".nav-button") ?? [])];
const searchInput = nav?.querySelector("#search-input");
const searchButton = nav?.querySelector(".search");

let downwardWheelCount = 0;

function updateVisibleButtons() {
  if (!nav || !navMenu || !searchInput || !searchButton) return;

  navButtons.forEach((button) => {
    button.hidden = false;
  });

  const navStyle = getComputedStyle(nav);
  const menuStyle = getComputedStyle(navMenu);
  const horizontalPadding =
    parseFloat(navStyle.paddingLeft) + parseFloat(navStyle.paddingRight);
  const gap = parseFloat(menuStyle.columnGap) || 0;
  const searchWidth = searchInput.offsetWidth + searchButton.offsetWidth;
  const availableWidth = nav.clientWidth - horizontalPadding;
  const isStacked = window.matchMedia("(max-width: 730px)").matches;

  let visibleButtons = navButtons.length;
  let buttonsWidth = navButtons.reduce(
    (total, button) => total + button.offsetWidth,
    0,
  );

  while (
    visibleButtons > 0 &&
    buttonsWidth +
        gap * Math.max(visibleButtons - 1, 0) +
        (isStacked ? 0 : searchWidth) >
      availableWidth
  ) {
    const button = navButtons[visibleButtons - 1];
    buttonsWidth -= button.offsetWidth;
    button.hidden = true;
    visibleButtons -= 1;
  }
}

window.addEventListener(
  "wheel",
  (event) => {
    if (!nav || event.deltaY === 0) return;

    if (event.deltaY > 0) {
      downwardWheelCount += 1;

      if (downwardWheelCount >= 5) {
        nav.classList.add("nav--hidden");
      }
      return;
    }

    downwardWheelCount = 0;
    nav.classList.remove("nav--hidden");
  },
  { passive: true },
);

window.addEventListener("resize", updateVisibleButtons);
window.addEventListener("DOMContentLoaded", updateVisibleButtons);
