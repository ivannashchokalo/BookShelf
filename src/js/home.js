import { handleOpenBookModal } from './book-modal';
import {
  handleCategoryClick,
  handleHomePageInit,
  handleHomeResize,
} from './handlers';
import { refs } from './refs';

export function initHome() {
  document.addEventListener('DOMContentLoaded', handleHomePageInit);
  window.addEventListener('resize', handleHomeResize);
  refs.categoriesList.addEventListener('click', handleCategoryClick);
  refs.mainBookList.addEventListener('click', handleOpenBookModal);
}
