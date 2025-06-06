const THEME_KEY = 'theme';

var menusVisible = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Theme Mode //

function setTheme(theme) {
    const htmlElement = document.body;
    const themeToggleIcon = document.getElementById('themeToggleIcon');

    htmlElement.classList.remove('light', 'dark');

    if (theme == 'light') {
        htmlElement.classList.add('light');
        themeToggleIcon.innerHTML = 'light_mode'
    } else if (theme == 'dark') {
        htmlElement.classList.add('dark');
        themeToggleIcon.innerHTML = 'dark_mode'
    } else if (theme == 'system') {
        themeToggleIcon.innerHTML = 'brightness_auto'
    }

    // Save theme to local storage

    localStorage.setItem(THEME_KEY, theme);
}

function getPreferredTheme() {
    const storedPreference = localStorage.getItem(THEME_KEY);

    if (storedPreference === 'light' || storedPreference === 'dark' || storedPreference === 'system') {
        return storedPreference;
    } else {
        return 'system';
    }
}

function toggleThemes() {
    let theme = getPreferredTheme();

    if (theme == 'light') {
        theme = 'dark';
    } else if (theme == 'dark') {
        theme = 'system';
    } else if (theme == 'system') {
        theme = 'light';
    }

    setTheme(theme);
}

function updateMenuItems() {
    var menus = document.getElementsByClassName('menu-item');

    for (var i = 0; i < menus.length; i++) {
        var menu = menus[i];

        if (menusVisible || window.innerWidth > 600) {
            menu.style.display = 'inline-flex';
        } else {
            menu.style.display = 'none';
        }
    }
}

function toggleMenu() {
    menusVisible = !menusVisible;
    updateMenuItems();
}

function hideMenu() {
    menusVisible = false;
    updateMenuItems();
}

function animateEntrance() {
    var mainPage = document.getElementById('mainPage');

    mainPage.classList.add('slide-up-fade-in-animation');

    mainPage.addEventListener('animationend', () => {
        mainPage.classList.remove('slide-up-fade-in-animation');
        mainPage.style.opacity = 1;
    }, { once: true });
}

async function animateLoadingMessage() {
    var loadingMessage = document.getElementById('loadingMessage');
    await sleep(3000);
    loadingMessage.style.opacity = 1;
}

async function browseTo(href) {
    hideMenu();
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.add('slide-down-fade-out-animation');

    mainPage.addEventListener('animationend', () => {
        window.location.href = href;
    }, { once: true });
}

async function intro() {
    hideMenu();
    browseTo('index.html');
}

async function home() {
    hideMenu();
    browseTo('index.html?skip_intro=true');
}

async function about() {
    hideMenu();
    browseTo('about.html');
}

async function projects() {
    hideMenu();
    browseTo('projects.html');
}

async function contact() {
    hideMenu();
    browseTo('contact.html');
}

function scrollToTop() {
    hideMenu();
    var mainPage = document.body;
    mainPage.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getPreferredTheme());
    animateLoadingMessage();
});

window.addEventListener('load', () => {
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.remove();
});

window.addEventListener('pageshow', persisted => {
    if (!persisted) return;
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.remove('slide-down-fade-out-animation');
});

window.addEventListener('resize', () => {
    menusVisible = window.innerWidth > 600;
    updateMenuItems();
});

window.addEventListener('unload', event => {
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.remove('slide-down-fade-out-animation');
});