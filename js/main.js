var menusVisible = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

function animateExit() {
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.add('slide-down-fade-out-animation');
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
    await sleep(300);
    window.location.href = href;
}

async function intro() {
    hideMenu();
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.add('slide-down-fade-out-animation');
    await sleep(300);
    window.location.href = 'index.html';
}

async function home() {
    hideMenu();
    animateExit();
    await sleep(300);
    window.location.href = 'index.html?skip_intro=true';
}

async function about() {
    hideMenu();
    animateExit();
    await sleep(300);
    window.location.href = 'about.html';
}

async function projects() {
    hideMenu();
    animateExit();
    await sleep(300);
    window.location.href = 'projects.html';
}

async function contact() {
    hideMenu();
    animateExit();
    await sleep(300);
    window.location.href = 'contact.html';
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
    animateLoadingMessage();
});

window.addEventListener('load', () => {
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.remove();
});

window.addEventListener('resize', () => {
    menusVisible = window.innerWidth > 600;
    updateMenuItems();
});

window.addEventListener('unload', event => {
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.remove('slide-down-fade-out-animation');
});