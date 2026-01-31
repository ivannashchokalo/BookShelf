import { setUser, clearUser } from '../utils/storage';

export function initAuth({ onAuthChange }) {
    const authBackdrop = document.getElementById('auth-backdrop');
    const authForm = document.getElementById('auth-form');
    const authCloseBtn = document.getElementById('auth-close');

    const signUpBtn = document.getElementById('header-sign-up-btn');
    const mobLoginBtn = document.getElementById('mob-login-btn');
    const mobLogoutBtn = document.getElementById('mob-logout-btn');

    // if (!authForm || !authBackdrop) {
    //     return {
    //         logout() {
    //             clearUser();
    //             onAuthChange?.(null);
    //         },
    //     };
    // }

    if (!authForm || !authBackdrop) {
    console.warn('Auth modal not found in DOM');
}


    const openAuth = () => {
        authBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        const nameInput = document.getElementById('auth-name');
        nameInput?.focus();
        document.addEventListener('keydown', onKeyDown);
    };

    const closeAuth = () => {
        authBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown);
    };

    signUpBtn?.addEventListener('click', openAuth);
    mobLoginBtn?.addEventListener('click', openAuth);

    authCloseBtn?.addEventListener('click', closeAuth);
    authBackdrop?.addEventListener('click', e => {
        if (e.target === authBackdrop) closeAuth();
    });

    const onKeyDown = (e) => {
        if (e.key === 'Escape') closeAuth();
    };

    // submit логіну
    authForm.addEventListener('submit', e => {
        e.preventDefault();

        const nameInput = document.getElementById('auth-name');
        const name = nameInput?.value?.trim() || '';

        if (!name) return;

        const user = { name };

        setUser(user);
        onAuthChange?.(user);

        closeAuth();
        authForm.reset();
    });

    // logout (мобільна кнопка)
    mobLogoutBtn?.addEventListener('click', () => {
        clearUser();
        onAuthChange?.(null);
    });

    // return {
    //     logout() {
    //         clearUser();
    //         onAuthChange?.(null);
    //     },
    // };

    const logout = () => {
    clearUser();
    onAuthChange?.(null);
};

return { logout };

}