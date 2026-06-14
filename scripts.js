// Theme Initialization
(function () {
    const saved = localStorage.getItem("euanscott_theme");
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (systemPrefersLight ? 'light' : 'dark');
    document.documentElement.setAttribute("data-theme", theme);
})();

// Language Redirect
const savedLang = localStorage.getItem("euanscott_lang");
const path = window.location.pathname;
const targetPaths = {no: "/no/", af: "/af/", en: "/"};

if (savedLang && targetPaths[savedLang] && path !== targetPaths[savedLang]) {
    window.location.href = targetPaths[savedLang];
}

document.addEventListener("DOMContentLoaded", () => {

    // Theme Toggle (Event Delegation)
    document.body.addEventListener("click", (event) => {
        if (event.target.closest('#theme-toggle')) {
            const root = document.documentElement;
            const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
            root.setAttribute("data-theme", next);
            localStorage.setItem("euanscott_theme", next);
        }
    });

    // Language Selector Change (Event Delegation)
    document.body.addEventListener("change", (event) => {
        if (event.target && event.target.id === 'lang-select') {
            const lang = event.target.options[event.target.selectedIndex].getAttribute('data-lang');
            if (lang) {
                localStorage.setItem("euanscott_lang", lang);
                window.location.href = event.target.value;
            }
        }
    });

    // Update Lang Select value when HTMX swaps nav
    document.body.addEventListener("htmx:afterSettle", (event) => {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            langSelect.value = window.location.pathname;
        }
    });
});
