export function initHeader() {
    // ===== ACTIVE MENU =====
    const currentPage = window.location.pathname;

    const homeLink = document.querySelector('.menu-home');
    const shoppingLink = document.querySelector('.menu-shopping-list');

    if (homeLink && shoppingLink) {
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
            homeLink.classList.add('active');
        }

        if (currentPage.includes('shopping-list.html')) {
            shoppingLink.classList.add('active');
        }
    }
    /* ===== MOBILE MENU ACTIVE LINK ===== */
    const mobHomeLink = document.querySelector('.mob-menu-link');
    const mobShoppingLink = document.querySelector('.mob-menu-list-link');

    if (mobHomeLink && mobShoppingLink) {
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
            mobHomeLink.classList.add('active');
            mobShoppingLink.classList.remove('active');
        }

        if (currentPage.includes('shopping-list.html')) {
            mobShoppingLink.classList.add('active');
            mobHomeLink.classList.remove('active');
        }
    }


    // ===== THEME TOGGLE =====
    const toggle = document.querySelector('.toggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.classList.add('active');
    }

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            toggle.classList.remove('active');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggle.classList.add('active');
        }
    });
    /* ===== BURGER / MOBILE MENU ===== */
    const openBtn = document.querySelector('#menu');
    const closeBtn = document.querySelector('#menu-close');
    const mobileMenu = document.querySelector('#mobile-menu');

    if (!openBtn || !closeBtn || !mobileMenu) return;

    function openMobileMenu() {
        mobileMenu.classList.add('is-open');
        openBtn.classList.add('disabled');
        closeBtn.classList.remove('disabled');
        document.body.classList.add('no-scroll');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('is-open');
        openBtn.classList.remove('disabled');
        closeBtn.classList.add('disabled');
        document.body.classList.remove('no-scroll');
    }

    openBtn.addEventListener('click', openMobileMenu);
    closeBtn.addEventListener('click', closeMobileMenu);

    /* ESC */
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    /* Клік по пункту меню */
    mobileMenu.addEventListener('click', e => {
        if (e.target.closest('a')) {
            closeMobileMenu();
        }
    });
    
}
