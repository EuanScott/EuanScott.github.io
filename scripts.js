const savedLang = localStorage.getItem("euanscott_lang");
const path = window.location.pathname;
const targetPaths = { no: "/no/", af: "/af/", en: "/" };

if (savedLang && targetPaths[savedLang] && path !== targetPaths[savedLang]) {
  window.location.href = targetPaths[savedLang];
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".lang-switcher");

  if (nav) {
    nav.addEventListener("click", (event) => {
      const lang = event.target.getAttribute("data-lang");
      if (lang) {
        localStorage.setItem("euanscott_lang", lang);
      }
    });
  }
});
