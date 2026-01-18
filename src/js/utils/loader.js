import { refs } from "./constants";

export function showLoader() {
    refs.loader.classList.remove('hide-loader')
}

export function hideLoader() {
    refs.loader.classList.add('hide-loader')
}