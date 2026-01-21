// js/components/mobile-menu.js
export function initMobileMenu() {
    const mobMenu = document.getElementById('mobile-menu');
    const burgerOpenBtn = document.getElementById('menu-open-btn');
    const burgerCloseBtn = document.getElementById('menu-close-btn');

    if (!mobMenu || !burgerOpenBtn || !burgerCloseBtn) {
        return null;
    }

    const openMenu = () => {
        mobMenu.classList.add('is-open');
        burgerOpenBtn.classList.add('disabled');
        burgerCloseBtn.classList.remove('disabled');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobMenu.classList.remove('is-open');
        burgerOpenBtn.classList.remove('disabled');
        burgerCloseBtn.classList.add('disabled');
        document.body.style.overflow = '';
    };

    burgerOpenBtn.addEventListener('click', openMenu);
    burgerCloseBtn.addEventListener('click', closeMenu);

    return { closeMenu };
}
