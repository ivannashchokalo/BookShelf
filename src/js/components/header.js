import { getUser } from '../utils/storage';
import { initThemeToggle } from './theme-toggle';
import { initMobileMenu } from './mobile-menu';
import { initAuth } from './auth';
import { setActiveLinks } from './header-menu';

export function initHeader() {
    let currentUser = getUser();

    const desktopNav = document.getElementById('desktop-nav');
    const signUpBtn = document.getElementById('header-sign-up-btn');
    const userBtn = document.getElementById('header-user-btn');
    const userNameEl = document.getElementById('header-user-name');

    const mobLoginBtn = document.getElementById('mob-login-btn');
    const mobLogoutBtn = document.getElementById('mob-logout-btn');
    const mobUserBtn = document.getElementById('mob-user-btn');
    const mobUserName = document.getElementById('mob-user-name');

    const updateHeader = () => {
        const isMobile = window.innerWidth < 768;
        const isAuth = Boolean(currentUser);

        document.querySelectorAll('.menu-shopping-list, .mob-menu-list-link').forEach(link => {
            if (link.parentElement) {
                link.parentElement.style.display = isAuth ? 'block' : 'none';
            }
        });

        if (isMobile) {
            if (desktopNav) desktopNav.classList.add('hidden');
            if (signUpBtn) signUpBtn.classList.add('hidden');
            if (userBtn) userBtn.classList.add('hidden');

            if (mobLoginBtn) mobLoginBtn.classList.toggle('hidden', isAuth);
            if (mobLogoutBtn) mobLogoutBtn.classList.toggle('hidden', !isAuth);
            if (mobUserBtn) mobUserBtn.classList.toggle('hidden', !isAuth);

            if (isAuth && mobUserName) mobUserName.textContent = currentUser.name;
        } else {
            if (desktopNav) desktopNav.classList.toggle('hidden', !isAuth);
            if (signUpBtn) signUpBtn.classList.toggle('hidden', isAuth);
            if (userBtn) userBtn.classList.toggle('hidden', !isAuth);

            if (isAuth && userNameEl) userNameEl.textContent = currentUser.name;
        }
    };

    initThemeToggle();
    const mobileMenu = initMobileMenu(); 

    const auth = initAuth({
        onAuthChange(user) {
            currentUser = user;
            updateHeader();
            setActiveLinks();
        },
    });

    if (userBtn) {
        userBtn.addEventListener('click', () => {
            auth.logout();
            if (mobileMenu?.closeMenu) mobileMenu.closeMenu();
        });
    }

    if (mobLogoutBtn) {
        mobLogoutBtn.addEventListener('click', () => {
            auth.logout();
            if (mobileMenu?.closeMenu) mobileMenu.closeMenu();
        });
    }

    window.addEventListener('resize', () => {
        updateHeader();
        setActiveLinks();
    });

    updateHeader();
    setActiveLinks();
}
