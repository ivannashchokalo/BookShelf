import { setUser, clearUser } from '../utils/storage';

export function initAuth({ onAuthChange }) {
    const authBackdrop = document.getElementById('auth-backdrop');
    const authForm = document.getElementById('auth-form');
    const authCloseBtn = document.getElementById('auth-close');
    const signUpBtn = document.getElementById('header-sign-up-btn');
    const mobLoginBtn = document.getElementById('mob-login-btn');

    if (!authForm) return;

    const openAuth = () => {
        authBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeAuth = () => {
        authBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    };

    signUpBtn?.addEventListener('click', openAuth);
    mobLoginBtn?.addEventListener('click', openAuth);
    authCloseBtn?.addEventListener('click', closeAuth);

    authForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('auth-name').value.trim();
        const user = { name };

        setUser(user);
        onAuthChange(user);

        closeAuth();
        authForm.reset();
    });

    return {
        logout() {
            clearUser();
            onAuthChange(null);
        },
    };
}
