import { initCategoryList } from '../components/category-list';
import { initBookList } from '../components/main-book-list';
import { handleHomeResize } from '../utils/helpers';

export function initHome() {
  initCategoryList();
  initBookList();
  initBookModal();
  window.addEventListener('resize', handleHomeResize);
}
