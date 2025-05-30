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

async function animateIntro() {
    var introPage = document.getElementById('introPage');
    var cards = document.getElementsByClassName('mosaic-card');
    var heroCard = document.getElementById('heroCard');

    heroCard.style.opacity = 1;
    introPage.style.opacity = 0;

    await sleep(200);

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

    var heroCard = document.getElementById('heroCard');
    heroCard.classList.add('full');

    await sleep(500);

    heroCard.classList.remove('full');

    switchToMainPage();
}

async function switchToMainPage() {
    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    introPage.style.display = 'none';
    mainPage.style.display = 'block';

    mainPage.classList.add('slide-up-animation');

    await sleep(500);

    mainPage.classList.remove('slide-up-animation');
    document.body.style.overflow = 'auto';

    var cards = document.getElementsByClassName('mosaic-card');

    introPage.classList.remove('zoom-entrance-animation');
    for (i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        if (card.id == 'heroCard') continue;

        card.classList.remove('zoom-entrance-animation');
    }
}

async function switchToIntroPage() {
    var url = new URL(window.location.href);
    var params = url.searchParams;

    params.delete('skip_intro');
    url.search = params.toString();

    history.pushState({path: url.href}, '', url.href);

    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    mainPage.classList.add('fade-out-animation');

    await sleep(500);

    introPage.style.display = 'block';
    mainPage.style.display = 'none';

    mainPage.classList.remove('fade-out-animation');
    document.body.style.overflow = 'hidden';

    animateIntro();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}