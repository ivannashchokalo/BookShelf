// src/js/components/header-menu.js
export function setActiveLinks() {
    const currentPath = window.location.pathname;

    const links = document.querySelectorAll(
        '.menu-home, .menu-shopping-list, .mob-menu-link, .mob-menu-list-link'
    );

    links.forEach(link => {
        link.classList.remove('active');

        let linkPath;
        try {
            linkPath = new URL(link.href, window.location.origin).pathname;
        } catch (err) {
            return;
        }

        if (
            (linkPath === '/index.html' && (currentPath === '/' || currentPath === '/index.html')) ||
            linkPath === currentPath
        ) {
            link.classList.add('active');
        }
    });
}