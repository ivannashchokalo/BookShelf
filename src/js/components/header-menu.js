
export function setActiveLinks() {
    const currentPath = window.location.pathname;

    const links = document.querySelectorAll(
        '.menu-home, .menu-shopping-list, .mob-menu-link, .mob-menu-list-link'
    );

    links.forEach(link => {
        link.classList.remove('is-active');

        const linkPath = new URL(link.href).pathname;

        if (
            (linkPath === '/index.html' && (currentPath === '/' || currentPath === '/index.html')) ||
            linkPath === currentPath
        ) {
            link.classList.add("active");
        }
    });
}
