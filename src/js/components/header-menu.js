export function setActiveLinks() {
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const links = document.querySelectorAll(
        '.menu-home, .menu-shopping-list, .mob-menu-link, .mob-menu-list-link'
    );

    links.forEach(link => {
        if (!link) return;

        let href = link.getAttribute('href');
        if (!href) return;

        href = href.split('/').pop().split('?')[0].split('#')[0];

        link.classList.toggle('active', href === currentPage);
    });
}
