export function initHeader() {
    const currentPathname = window.location.pathname;

    const mobileUserEl = document.getElementById('mobile-user');
const mobileUserNameEl = document.getElementById('mobile-user-name');


    // ===== MENU LINKS =====
    const desktopHomeLinkEl = document.querySelector('.menu-home');
    const desktopShoppingLinkEl = document.querySelector('.menu-shopping-list');
    const mobileHomeLinkEl = document.querySelector('.mob-menu-link');
    const mobileShoppingLinkEl = document.querySelector('.mob-menu-list-link');

    // ===== HEADER / AUTH ELEMENTS =====
    const signUpButtonEl = document.getElementById('sign-up-btn');
    const userNameTextEl = document.getElementById('user-name');
    const desktopNavEl = document.getElementById('desktop-nav');
    const userBtnEl = document.getElementById('user-btn');

    const authBackdropEl = document.getElementById('auth-backdrop');
    const authCloseBtnEl = document.getElementById('auth-close');
    const authFormEl = document.getElementById('auth-form');

    // ===== MOBILE AUTH BUTTONS =====
    const mobileLoginBtnEl = document.getElementById('mobile-login-btn');
    const mobileLogoutBtnEl = document.getElementById('mobile-logout-btn');

    // ===== THEME TOGGLE =====
    const themeToggleBtnEl = document.querySelector('.toggle');
    if (themeToggleBtnEl) {
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtnEl.classList.add('active');
        }

        themeToggleBtnEl.addEventListener('click', () => {
            const isDark =
                document.documentElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtnEl.classList.remove('active');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtnEl.classList.add('active');
            }
        });
    }

    // ===== BURGER / MOBILE MENU =====
    const burgerOpenBtnEl = document.querySelector('#menu');
    const burgerCloseBtnEl = document.querySelector('#menu-close');
    const mobileMenuContainerEl = document.querySelector('#mobile-menu');

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

    burgerOpenBtnEl?.addEventListener('click', openMobileMenu);
    burgerCloseBtnEl?.addEventListener('click', closeMobileMenu);

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    mobileMenuContainerEl?.addEventListener('click', e => {
        if (e.target.closest('a')) closeMobileMenu();
    });

    // ===== HEADER VISIBILITY (CORE LOGIC) =====
    function updateHeaderVisibility() {
        const isMobile = window.innerWidth < 768;
        const storedUser = localStorage.getItem('user');
        const isAuthorized = Boolean(storedUser);

        // MENU LINKS
        [
            desktopHomeLinkEl,
            desktopShoppingLinkEl,
            mobileHomeLinkEl,
            mobileShoppingLinkEl,
        ].forEach(el => {
            if (!el) return;
            el.classList.toggle('hidden', !isAuthorized);
        });

        // DESKTOP HEADER
        if (isMobile) {
            desktopNavEl.classList.add('hidden');
            signUpButtonEl.classList.add('hidden');
            userBtnEl.classList.add('hidden');
        } else {
            desktopNavEl.classList.remove('hidden');

            if (isAuthorized) {
                signUpButtonEl.classList.add('hidden');
                userBtnEl.classList.remove('hidden');
            } else {
                signUpButtonEl.classList.remove('hidden');
                userBtnEl.classList.add('hidden');
            }
        }

        // MOBILE AUTH BUTTONS
        if (mobileLoginBtnEl && mobileLogoutBtnEl) {
            mobileLoginBtnEl.classList.toggle('hidden', isAuthorized);
            mobileLogoutBtnEl.classList.toggle('hidden', !isAuthorized);
        }
    }

    // ===== ACTIVE MENU (ONLY IF AUTHORIZED) =====
    if (localStorage.getItem('user')) {
        if (
            currentPathname.includes('index.html') ||
            currentPathname.endsWith('/')
        ) {
            desktopHomeLinkEl?.classList.add('active');
            mobileHomeLinkEl?.classList.add('active');
        }

        if (currentPathname.includes('shopping-list.html')) {
            desktopShoppingLinkEl?.classList.add('active');
            mobileShoppingLinkEl?.classList.add('active');
        }
    }

    // ===== LOAD USER DATA =====
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData && userNameTextEl) {
        userNameTextEl.textContent = storedUserData.name;
    }

    updateHeaderVisibility();
    window.addEventListener('resize', updateHeaderVisibility);

    // ===== AUTH MODAL =====
    signUpButtonEl?.addEventListener('click', () => {
        authBackdropEl.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    });

    mobileLoginBtnEl?.addEventListener('click', () => {
        authBackdropEl.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    });

    function closeAuthModal() {
        authBackdropEl.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }

    authCloseBtnEl?.addEventListener('click', closeAuthModal);
    authBackdropEl?.addEventListener('click', e => {
        if (e.target === authBackdropEl) closeAuthModal();
    });

    authFormEl?.addEventListener('submit', e => {
        e.preventDefault();

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

    // ===== LOGOUT =====
    function logout() {
        localStorage.removeItem('user');
        updateHeaderVisibility();
        closeMobileMenu();
    }

    mobileLogoutBtnEl?.addEventListener('click', logout);
    userBtnEl?.addEventListener('click', logout);
}
