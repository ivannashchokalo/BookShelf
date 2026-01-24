import { getUser } from '../utils/storage';

export function initMobileMenu() {
    const mobMenu = document.getElementById('mobile-menu');
    const burgerOpenBtn = document.getElementById('menu-open-btn');
    const burgerCloseBtn = document.getElementById('menu-close-btn');

    const userBtn = document.getElementById('mob-user-btn');
    const userName = document.getElementById('mob-user-name');
    const loginBtn = document.getElementById('mob-login-btn');
    const logoutBtn = document.getElementById('mob-logout-btn');
    const menuList = mobMenu.querySelector('.mob-menu-list');

    if (!mobMenu || !burgerOpenBtn || !burgerCloseBtn) return null;

    const renderMobileMenu = () => {
        const user = getUser();

        if (!user) {
            userBtn.classList.add('hidden');
            logoutBtn.classList.add('hidden');
            menuList.classList.add('hidden');

            loginBtn.classList.remove('hidden');
            return;
        }

        userBtn.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
        menuList.classList.remove('hidden');

        loginBtn.classList.add('hidden');
        userName.textContent = user.name;
    };

    const openMenu = () => {
        renderMobileMenu(); 
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

    return {
        closeMenu,
        renderMobileMenu, 
    };
}
