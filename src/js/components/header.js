export function initHeader() {
    // ================= STATE =================
    let currentUser = JSON.parse(sessionStorage.getItem('user'));

    // ================= ELEMENTS =================
    const themeToggleBtn = document.querySelector('.toggle');

    const desktopNav = document.getElementById('desktop-nav');
    const signUpBtn = document.getElementById('header-sign-up-btn');
    const userBtn = document.getElementById('header-user-btn');
    const userNameEl = document.getElementById('header-user-name');

    const mobMenu = document.getElementById('mobile-menu');
    const mobLoginBtn = document.getElementById('mob-login-btn');
    const mobLogoutBtn = document.getElementById('mob-logout-btn');
    const mobUserBtn = document.getElementById('mob-user-btn');
    const mobUserName = document.getElementById('mob-user-name');

    const burgerOpenBtn = document.getElementById('menu-open-btn');
    const burgerCloseBtn = document.getElementById('menu-close-btn');

    const authBackdrop = document.getElementById('auth-backdrop');
    const authForm = document.getElementById('auth-form');
    const authCloseBtn = document.getElementById('auth-close');

    // ================= THEME =================
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.classList.add('active');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark =
                document.documentElement.getAttribute('data-theme') === 'dark';

            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.classList.remove('active');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.classList.add('active');
            }
        });
    }

    // ================= ACTIVE LINKS =================
    function setActiveLinks() {
        let currentPage = window.location.pathname;

        if (currentPage === '/' || currentPage.endsWith('/')) {
            currentPage = 'index.html';
        } else {
            currentPage = currentPage.split('/').pop();
        }

        const links = document.querySelectorAll(
            '.menu-home, .menu-shopping-list, .mob-menu-link, .mob-menu-list-link'
        );

        links.forEach(link => {
            const href = link.getAttribute('href')?.split('/').pop();
            link.classList.toggle('active', href === currentPage);
        });
    }


    // ================= HEADER VISIBILITY =================
    function updateHeader() {
        const isMobile = window.innerWidth < 768;
        const isAuth = Boolean(currentUser);

        document
            .querySelectorAll('.menu-shopping-list, .mob-menu-list-link')
            .forEach(link => {
                link.parentElement.style.display = isAuth ? 'block' : 'none';
            });

        if (isMobile) {
            desktopNav.classList.add('hidden');
            signUpBtn.classList.add('hidden');
            userBtn.classList.add('hidden');

            mobLoginBtn.classList.toggle('hidden', isAuth);
            mobLogoutBtn.classList.toggle('hidden', !isAuth);
            mobUserBtn.classList.toggle('hidden', !isAuth);

            if (isAuth) mobUserName.textContent = currentUser.name;
        } else {
            desktopNav.classList.toggle('hidden', !isAuth);
            signUpBtn.classList.toggle('hidden', isAuth);
            userBtn.classList.toggle('hidden', !isAuth);

            if (isAuth) userNameEl.textContent = currentUser.name;
        }
    }

    // ================= MOBILE MENU =================
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

    // ================= MOBILE MENU LINKS =================
    const mobileNavLinks = document.querySelectorAll(
        '.mob-menu-link, .mob-menu-list-link'
    );

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
            setTimeout(setActiveLinks, 0);
        });
    });

    // ================= AUTH MODAL =================
    const openAuth = () => {
        authBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeAuth = () => {
        authBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    };

    signUpBtn.addEventListener('click', openAuth);
    mobLoginBtn.addEventListener('click', openAuth);
    authCloseBtn.addEventListener('click', closeAuth);

    // ================= LOGIN =================
    authForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('auth-name').value.trim();

        currentUser = { name };
        sessionStorage.setItem('user', JSON.stringify(currentUser));

        updateHeader();
        setActiveLinks();
        closeAuth();
        authForm.reset();
    });

    // ================= LOGOUT =================
    const logout = () => {
        currentUser = null;
        sessionStorage.removeItem('user');
        updateHeader();
        setActiveLinks();
        closeMenu();
    };

    userBtn.addEventListener('click', logout);
    mobLogoutBtn.addEventListener('click', logout);

    // ================= INIT =================
    window.addEventListener('resize', () => {
        updateHeader();
        setActiveLinks();
    });

    updateHeader();
    setActiveLinks();
}
