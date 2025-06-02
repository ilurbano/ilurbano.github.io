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

    mainPage.classList.add('zoom-in-fade-in-animation');

    mainPage.addEventListener('animationend', () => {
        mainPage.classList.remove('zoom-in-fade-in-animation');
        mainPage.style.opacity = 1;
    }, { once: true });
}

function animateExit() {
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.add('zoom-in-fade-out-animation');
}

function animateLoadingMessage() {
    var loadingMessage = document.getElementById('loadingMessage');

    loadingMessage.addEventListener('animationend', () => {
        loadingMessage.classList.remove('fade-in-animation');
        loadingMessage.style.opacity = 1;
    }, { once: true });
}

async function intro() {
    hideMenu();
    var mainPage = document.getElementById('mainPage');
    mainPage.classList.add('zoom-out-fade-out-animation');
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