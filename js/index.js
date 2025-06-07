async function animateIntro() {
    var introPage = document.getElementById('introPage');
    var cards = document.getElementsByClassName('mosaic-card');
    var heroCard = document.getElementById('heroCard');

    heroCard.style.opacity = 1;
    heroCard.style.pointerEvents = 'none';
    introPage.style.position = 'fixed';
    introPage.style.opacity = 0;

    introPage.classList.add('zoom-entrance-animation');

    introPage.addEventListener('animationend', async () => {
        introPage.style.position = '';
        introPage.style.opacity = 1;
        introPage.classList.remove('zoom-entrance-animation');
        await sleep(200);
        heroCard.style.pointerEvents = '';
    }, { once: true });

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        
        if (card.id == 'heroCard') continue;

        await sleep(25);

        card.classList.add('zoom-entrance-animation');

        card.addEventListener('animationend', () => {
            card.style.opacity = 1;
            card.classList.remove('zoom-entrance-animation');
        }, { once: true });
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

    mainPage.classList.add('slide-up-fade-in-animation');

    mainPage.addEventListener('animationend', () => {
        mainPage.classList.remove('slide-up-fade-in-animation');
        mainPage.style.opacity = 1;

        var cards = document.getElementsByClassName('mosaic-card');

        introPage.classList.remove('zoom-entrance-animation');
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            
            if (card.id == 'heroCard') continue;

            card.classList.remove('zoom-entrance-animation');
            card.style.opacity = ''
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
        mainPage.scrollTop = 0;

        mainPage.classList.remove('slide-down-fade-out-animation');

        animateIntro();
    }, { once: true });
}

function toggleCardExpansion(cardElement) {
    if (cardElement.classList.contains('full')) {
        shrinkCardFromFullScreen(cardElement);
    } else {
        expandCardToFullScreen(cardElement);
    }
}

async function expandCardToFullScreen(cardElement) {
    // 1. FIRST: Get the initial position and dimensions of the card
    //    This must happen *before* changing its position property.
    const initialRect = cardElement.getBoundingClientRect();
    console.log('Initial Rect:', initialRect);

    // Store these values as custom properties or data attributes if you need them later
    // for the reverse animation without re-calculating (e.g., when shrinking back)
    cardElement.dataset.initialTop = initialRect.top;
    cardElement.dataset.initialLeft = initialRect.left;
    cardElement.dataset.initialWidth = initialRect.width;
    cardElement.dataset.initialHeight = initialRect.height;
    cardElement.dataset.initialZIndex = window.getComputedStyle(cardElement).zIndex; // Store initial z-index

    // 2. INVERT: Set the element to fixed positioning and its *current* visual dimensions
    //    This needs to happen immediately, without triggering a transition.
    //    The CSS 'transition' property on .mosaic-card handles the *animation* later.
    cardElement.style.position = 'fixed';
    cardElement.style.top = `${initialRect.top}px`;
    cardElement.style.left = `${initialRect.left}px`;
    cardElement.style.width = `${initialRect.width}px`;
    cardElement.style.height = `${initialRect.height}px`;
    cardElement.style.margin = '0'; // Crucial to remove any margins from grid layout
    cardElement.style.padding = '0'; // Crucial to remove any padding from grid layout
    cardElement.style.boxSizing = 'border-box'; // Ensure consistency
    cardElement.style.zIndex = '100'; // Make it appear on top instantly

    // 3. PLAY: Allow the browser to render the "fixed at current location" state,
    //    then add the 'full' class to trigger the CSS transition to the target state.
    //    The double rAF ensures repaint happens before the class is added.
    await new Promise(resolve => requestAnimationFrame(() => resolve()));
    await new Promise(resolve => requestAnimationFrame(() => resolve())); // Double rAF for robustness

    cardElement.classList.add('full');
    console.log('Full class added, animation should start.');
}

// Function to shrink a card back from full screen
async function shrinkCardFromFullScreen(cardElement) {
    cardElement.classList.remove('full');
    console.log('Full class removed, animation should reverse.');

    // Wait for the transition to finish before reverting position/dimensions
    await new Promise(resolve => {
        const onTransitionEnd = (event) => {
            // Only listen for the transition on properties we're animating back
            if (event.propertyName === 'width' || event.propertyName === 'height' || event.propertyName === 'top' || event.propertyName === 'left') {
                cardElement.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            }
        };
        cardElement.addEventListener('transitionend', onTransitionEnd);
    });

    // After the transition back, revert to the original grid layout
    cardElement.style.position = ''; // Remove fixed position
    cardElement.style.top = '';   // Remove inline top/left
    cardElement.style.left = '';
    cardElement.style.width = ''; // Remove inline width/height
    cardElement.style.height = '';
    cardElement.style.margin = ''; // Revert margins/padding
    cardElement.style.padding = '';
    cardElement.style.boxSizing = ''; // Revert box-sizing
    cardElement.style.zIndex = ''; // Revert z-index

    // If you need to re-apply grid-column/grid-row, you could
    // cardElement.style.gridColumn = '13 / span 4';
    // cardElement.style.gridRow = '9 / span 8';
    // But since these are on the CSS class, removing inline styles usually makes the class apply.

    console.log('Card reverted to grid state.');
}

async function jumpTo(card, href) {
    localStorage.setItem('expandedCardId', card.id);
    expandCardToFullScreen(card);
    card.addEventListener('transitionend', () => {
        window.location.href = href;
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

window.addEventListener('pageshow', async event => {
    let expandedCardId = localStorage.getItem('expandedCardId');
    if (expandedCardId) {
        let card = document.getElementById(expandedCardId);
        if (card) {
            // If coming from bfcache, instantly reset the card
            if (event.persisted) {
                card.classList.remove('full');
                card.style.position = '';
                card.style.top = '';
                card.style.left = '';
                card.style.width = '';
                card.style.height = '';
                card.style.margin = '';
                card.style.padding = '';
                card.style.boxSizing = '';
                card.style.zIndex = '';
            } else {
                // Otherwise, animate back as usual
                await sleep(1000);
                await shrinkCardFromFullScreen(card);
            }
        }
    }
});

window.addEventListener('unload', () => {
    var cards = document.getElementsByClassName('mosaic-card');

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        
        if (card.id == 'heroCard') continue;

        card.classList.remove('zoom-entrance-animation');
        card.style.opacity = ''
        shrinkCardFromFullScreen(card);
    }
});