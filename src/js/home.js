import { handleCategoryClick, handleHomePageInit, handleHomeResize } from './handlers';
import { refs } from './refs';

export function initHome() {
  document.addEventListener('DOMContentLoaded', handleHomePageInit);
  refs.categoriesList.addEventListener('click', handleCategoryClick)
}

window.addEventListener('resize', handleHomeResize);