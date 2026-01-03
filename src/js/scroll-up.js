import { refs } from "./refs";


export function showScrollUpBtn() {
    refs.scrollUpBtn.style.display = 'none';
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    refs.scrollUpBtn.style.display = 'block';
  } else {
    refs.scrollUpBtn.style.display = 'none';
  }
}

export function scrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}