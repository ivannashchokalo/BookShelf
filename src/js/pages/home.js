import { initCategoryList } from '../components/category-list';
import { initBookList } from '../components/main-book-list';
import { initBookModal } from '../components/book-modal';
import { handleHomeResize } from '../utils/helpers';

export function initHome() {
  initCategoryList();
  initBookList();
  initBookModal();
  window.addEventListener('resize', handleHomeResize);
}
