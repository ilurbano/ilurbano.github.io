var menusVisible = false;

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

document.addEventListener('DOMContentLoaded', () => {
    var query = window.location.search;
    var params = new URLSearchParams(query);

    if (params.has('skip_intro') && params.get('skip_intro') == 'true') {
        switchToMainPage();
    } else {
        // animateIntro();
    }
});

window.addEventListener('load', () => {
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.remove();

    var query = window.location.search;
    var params = new URLSearchParams(query);

    if (!(params.has('skip_intro') && params.get('skip_intro') == 'true')) {
        animateIntro();
    }
});

window.addEventListener('resize', () => {
    menusVisible = window.innerWidth > 600;
    updateMenuItems();
});

async function animateIntro() {
    var introPage = document.getElementById('introPage');
    var cards = document.getElementsByClassName('mosaic-card');
    var heroCard = document.getElementById('heroCard');

    heroCard.style.opacity = 1;
    introPage.style.opacity = 0;

    await sleep(100);

    introPage.classList.add('zoom-entrance-animation');

    for (i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        if (card.id == 'heroCard') continue;

        await sleep(33);

        card.classList.add('zoom-entrance-animation');
    }
}

async function explore() {
    var url = new URL(window.location.href);
    var params = url.searchParams;

    params.set('skip_intro', true);
    url.search = params.toString();

    history.pushState({path: url.href}, '', url.href);

    var introPage = document.getElementById('introPage');
    introPage.classList.add('zoom-exit-animation');

    await sleep(400);

    introPage.classList.remove('zoom-exit-animation');

    switchToMainPage();
}

async function switchToMainPage() {
    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    introPage.style.display = 'none';
    mainPage.style.display = 'block';
    mainPage.scrollTop = 0;

    mainPage.classList.add('slide-up-animation');

    await sleep(500);

    mainPage.classList.remove('slide-up-animation');
    // document.body.style.overflow = 'auto';

    var cards = document.getElementsByClassName('mosaic-card');

    introPage.classList.remove('zoom-entrance-animation');
    for (i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        if (card.id == 'heroCard') continue;

        card.classList.remove('zoom-entrance-animation');
    }
}

async function switchToIntroPage() {
    menusVisible = false;
    updateMenuItems();

    var url = new URL(window.location.href);
    var params = url.searchParams;

    params.delete('skip_intro');
    url.search = params.toString();

    history.pushState({path: url.href}, '', url.href);

    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    mainPage.classList.add('fade-out-animation');

    await sleep(300);

    // window.location.href = "index.html";

    introPage.style.display = 'block';
    mainPage.style.display = 'none';

    mainPage.classList.remove('fade-out-animation');
    // document.body.style.overflow = 'hidden';

    animateIntro();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}