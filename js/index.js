async function animateIntro() {
    var introPage = document.getElementById('introPage');
    var cards = document.getElementsByClassName('mosaic-card');
    var heroCard = document.getElementById('heroCard');

    heroCard.style.opacity = 1;
    introPage.style.opacity = 0;

    introPage.classList.add('zoom-entrance-animation');

    for (i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        if (card.id == 'heroCard') continue;

        await sleep(40);

        card.classList.add('zoom-entrance-animation');
    }
}

function explore() {
    var url = new URL(window.location.href);
    var params = url.searchParams;

    params.set('skip_intro', true);
    url.search = params.toString();

    history.pushState({path: url.href}, '', url.href);

    var introPage = document.getElementById('introPage');
    introPage.classList.add('zoom-exit-animation');

    introPage.addEventListener('animationend', () => {
        introPage.classList.remove('zoom-exit-animation');
        switchToMainPage();
    }, { once: true });
}

function switchToMainPage() {
    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    introPage.style.display = 'none';
    mainPage.style.display = 'block';
    mainPage.scrollTop = 0;

    mainPage.classList.add('slide-up-fade-in-animation');

    mainPage.addEventListener('animationend', () => {
        mainPage.classList.remove('slide-up-fade-in-animation');
        mainPage.style.opacity = 1;

        var cards = document.getElementsByClassName('mosaic-card');

        introPage.classList.remove('zoom-entrance-animation');
        for (i = 0; i < cards.length; i++) {
            var card = cards[i];
            
            if (card.id == 'heroCard') continue;

            card.classList.remove('zoom-entrance-animation');
        }
    }, { once: true });
}

function switchToIntro() {
    menusVisible = false;
    updateMenuItems();

    var url = new URL(window.location.href);
    var params = url.searchParams;

    params.delete('skip_intro');
    url.search = params.toString();

    history.pushState({path: url.href}, '', url.href);

    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    mainPage.classList.add('slide-down-fade-out-animation');

    mainPage.addEventListener('animationend', () => {
        introPage.style.display = 'block';
        mainPage.style.display = 'none';
        mainPage.style.opacity = 0;

        mainPage.classList.remove('slide-down-fade-out-animation');

        animateIntro();
    }, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
    var query = window.location.search;
    var params = new URLSearchParams(query);

    if (params.has('skip_intro') && params.get('skip_intro') == 'true') {
        switchToMainPage();
    }
});

window.addEventListener('load', () => {
    var query = window.location.search;
    var params = new URLSearchParams(query);

    if (params.has('skip_intro') && params.get('skip_intro') == 'true') {
        switchToMainPage();
    } else {
        animateIntro();
    }
});