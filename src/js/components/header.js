export function initHeader() {
    // ===== ACTIVE MENU =====
    const currentPathname = window.location.pathname;

    const desktopHomeLinkEl = document.querySelector('.menu-home');
    const desktopShoppingLinkEl = document.querySelector('.menu-shopping-list');

    if (desktopHomeLinkEl && desktopShoppingLinkEl) {
        if (currentPathname.includes('index.html') || currentPathname.endsWith('/')) {
            desktopHomeLinkEl.classList.add('active');
        }

        if (currentPathname.includes('shopping-list.html')) {
            desktopShoppingLinkEl.classList.add('active');
        }
    }

    // ===== MOBILE MENU ACTIVE LINK =====
    const mobileHomeLinkEl = document.querySelector('.mob-menu-link');
    const mobileShoppingLinkEl = document.querySelector('.mob-menu-list-link');

    if (mobileHomeLinkEl && mobileShoppingLinkEl) {
        if (currentPathname.includes('index.html') || currentPathname.endsWith('/')) {
            mobileHomeLinkEl.classList.add('active');
            mobileShoppingLinkEl.classList.remove('active');
        }

        if (currentPathname.includes('shopping-list.html')) {
            mobileShoppingLinkEl.classList.add('active');
            mobileHomeLinkEl.classList.remove('active');
        }
    }

    // ===== THEME TOGGLE =====
    const themeToggleBtnEl = document.querySelector('.toggle');
    if (!themeToggleBtnEl) return;

    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtnEl.classList.add('active');
    }

    themeToggleBtnEl.addEventListener('click', () => {
        const isDarkThemeActive =
            document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDarkThemeActive) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtnEl.classList.remove('active');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtnEl.classList.add('active');
        }
    });

    // ===== BURGER / MOBILE MENU =====
    const burgerOpenBtnEl = document.querySelector('#menu');
    const burgerCloseBtnEl = document.querySelector('#menu-close');
    const mobileMenuContainerEl = document.querySelector('#mobile-menu');

    if (!burgerOpenBtnEl || !burgerCloseBtnEl || !mobileMenuContainerEl) return;

    function openMobileMenu() {
        mobileMenuContainerEl.classList.add('is-open');
        burgerOpenBtnEl.classList.add('disabled');
        burgerCloseBtnEl.classList.remove('disabled');
        document.body.classList.add('no-scroll');
    }

    function closeMobileMenu() {
        mobileMenuContainerEl.classList.remove('is-open');
        burgerOpenBtnEl.classList.remove('disabled');
        burgerCloseBtnEl.classList.add('disabled');
        document.body.classList.remove('no-scroll');
    }

    burgerOpenBtnEl.addEventListener('click', openMobileMenu);
    burgerCloseBtnEl.addEventListener('click', closeMobileMenu);

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMobileMenu();
    });

    mobileMenuContainerEl.addEventListener('click', event => {
        if (event.target.closest('a')) closeMobileMenu();
    });

    // ===== AUTH / USER =====
    const signUpButtonEl = document.getElementById('sign-up-btn');
    const userNameTextEl = document.getElementById('user-name');
    const desktopNavEl = document.getElementById('desktop-nav');
    const userBtnEl = document.getElementById('user-btn');

    const authBackdropEl = document.getElementById('auth-backdrop');
    const authCloseBtnEl = document.getElementById('auth-close');
    const authFormEl = document.getElementById('auth-form');

    function updateHeaderVisibility() {
        const isMobile = window.innerWidth < 768;
        const storedUser = localStorage.getItem('user');

        if (isMobile) {
            desktopNavEl.classList.add('hidden');
            signUpButtonEl.classList.add('hidden');
            userBtnEl.classList.add('hidden');
        } else {
            desktopNavEl.classList.remove('hidden');

            if (storedUser) {
                signUpButtonEl.classList.add('hidden');
                userBtnEl.classList.remove('hidden');
            } else {
                signUpButtonEl.classList.remove('hidden');
                userBtnEl.classList.add('hidden');
            }
        }
    }

    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
        userNameTextEl.textContent = storedUserData.name;
    }

    updateHeaderVisibility();
    window.addEventListener('resize', updateHeaderVisibility);

    signUpButtonEl.addEventListener('click', () => {
        authBackdropEl.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    });

    authCloseBtnEl.addEventListener('click', closeAuthModal);
    authBackdropEl.addEventListener('click', event => {
        if (event.target === authBackdropEl) closeAuthModal();
    });

    function closeAuthModal() {
        authBackdropEl.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }

    authFormEl.addEventListener('submit', event => {
        event.preventDefault();

        const newUserData = {
            name: document.getElementById('auth-name').value.trim(),
            email: document.getElementById('auth-email').value.trim(),
        };

        localStorage.setItem('user', JSON.stringify(newUserData));
        userNameTextEl.textContent = newUserData.name;

        closeAuthModal();
        authFormEl.reset();
        updateHeaderVisibility();
    });
}
