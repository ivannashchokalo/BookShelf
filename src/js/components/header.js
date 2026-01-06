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

    // ESC key
    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Click on mobile menu link
    mobileMenuContainerEl.addEventListener('click', event => {
        if (event.target.closest('a')) {
            closeMobileMenu();
        }
    });

    // ===== AUTH / USER =====
    const signUpButtonEl = document.getElementById('sign-up-btn');
    const userInfoContainerEl = document.getElementById('user-info');
    const userNameTextEl = document.getElementById('user-name');

    const authBackdropEl = document.getElementById('auth-backdrop');
    const authCloseBtnEl = document.getElementById('auth-close');
    const authFormEl = document.getElementById('auth-form');

    // ===== INIT USER =====
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    if (storedUserData) {
        updateUserUI(storedUserData);
    }

    // ===== OPEN MODAL =====
    signUpButtonEl.addEventListener('click', () => {
        authBackdropEl.classList.remove('hidden');
        document.body.classList.add('no-scroll');
    });

    // ===== CLOSE MODAL =====
    authCloseBtnEl.addEventListener('click', closeAuthModal);
    authBackdropEl.addEventListener('click', event => {
        if (event.target === authBackdropEl) closeAuthModal();
    });

    function closeAuthModal() {
        authBackdropEl.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }

    // ===== SUBMIT FORM =====
    authFormEl.addEventListener('submit', event => {
        event.preventDefault();

        const userNameInputValue =
            document.getElementById('auth-name').value.trim();
        const userEmailInputValue =
            document.getElementById('auth-email').value.trim();

        const newUserData = {
            name: userNameInputValue,
            email: userEmailInputValue,
        };

        localStorage.setItem('user', JSON.stringify(newUserData));

        updateUserUI(newUserData);
        closeAuthModal();
        authFormEl.reset();
    });

    // ===== UI STATE =====
    function updateUserUI(user) {
        signUpButtonEl.classList.add('hidden');
        userInfoContainerEl.classList.remove('hidden');
        userNameTextEl.textContent = user.name;
    }
}
