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

window.addEventListener('load', () => {
    var loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.remove();
});

window.addEventListener('resize', () => {
    menusVisible = window.innerWidth > 600;
    updateMenuItems();
});