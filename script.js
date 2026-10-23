/* Brewlogue interactive features */
(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const searchButton = document.getElementById("searchButton");
  const searchPanel = document.getElementById("searchPanel");
  const searchClose = document.getElementById("searchClose");
  const searchForm = document.getElementById("searchPanel");
  const siteSearch = document.getElementById("siteSearch");
  const searchMessage = document.getElementById("searchMessage");
  const cartButton = document.getElementById("cartButton");
  const toast = document.getElementById("toast");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("currentYear");
  let toastTimeout;

  if (year) year.textContent = new Date().getFullYear();

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (searchButton && searchPanel) {
    searchButton.addEventListener("click", () => {
      searchPanel.hidden = !searchPanel.hidden;
      if (!searchPanel.hidden && siteSearch) siteSearch.focus();
    });
  }
  if (searchClose && searchPanel) {
    searchClose.addEventListener("click", () => {
      searchPanel.hidden = true;
      if (searchMessage) searchMessage.textContent = "";
    });
  }

  if (searchForm && siteSearch && searchMessage) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const term = siteSearch.value.trim().toLocaleLowerCase();
      document.querySelectorAll(".search-match").forEach((el) => el.classList.remove("search-match"));
      if (!term) {
        searchMessage.textContent = "Enter a word to search this page.";
        return;
      }
      const candidates = [...document.querySelectorAll("main h1, main h2, main h3, main p")];
      const match = candidates.find((el) => el.textContent.toLocaleLowerCase().includes(term));
      if (match) {
        match.classList.add("search-match");
        match.scrollIntoView({ behavior: "smooth", block: "center" });
        searchMessage.textContent = `Found “${term}”.`;
      } else {
        searchMessage.textContent = `No matching text found for “${term}”.`;
      }
    });
  }

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      showToast("Your cart is ready for products. Online checkout is not set up yet.");
    });
  }

  function updateBackToTop() {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 400);
  }
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const style = document.createElement("style");
  style.textContent = ".search-match{outline:2px solid #964B00;outline-offset:5px;background:rgba(150,75,0,.08);transition:background .2s}";
  document.head.appendChild(style);
})();
