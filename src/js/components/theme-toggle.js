export function initThemeToggle() {
    const themeToggleBtn = document.querySelector('.toggle');
    if (!themeToggleBtn) return;

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
