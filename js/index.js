async function explore() {
    var heroCard = document.getElementById('heroCard');
    heroCard.classList.add('full');

    await sleep(500);

    var introPage = document.getElementById('introPage');
    var mainPage = document.getElementById('mainPage');

    introPage.style.display = 'none';
    mainPage.style.display = 'block';

    mainPage.classList.add('slide-up-animation');

    await sleep(500);

    mainPage.classList.remove('slide-up-animation');
    document.body.style.overflow = 'auto'
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}