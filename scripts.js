// Material Icon Web Component
const _iconPaths = {
    dark_mode: 'M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z',
    light_mode: 'M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-226.5 56.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z',
    translate: 'm476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z',
};
customElements.define('material-icon', class extends HTMLElement {
    connectedCallback() {
        const path = _iconPaths[this.getAttribute('name')];
        if (!path) return;
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;
    }
});

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

    // Update Lang Select value and nav tooltip when HTMX swaps nav
    document.body.addEventListener("htmx:afterSettle", (event) => {
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            langSelect.value = window.location.pathname;
        }

    });
});
