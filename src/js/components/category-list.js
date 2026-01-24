import { fetchAllCategories, fetchBookByCategory } from '../utils/books-api';
import { refs, STATE } from '../utils/constants';
import { hideEmptyPage, showEmptyPage } from '../utils/helpers';
import { hideLoader, showLoader } from '../utils/loader';
import { notyf } from '../utils/notifications';
import { getTopBooks, renderBooksListByCategory } from './main-book-list';

export async function initCategoryList() {
  try {
    const categories = await fetchAllCategories();
    renderCategories(categories);
  } catch {
    notyf.error('An error occurred while loading');
  }
  refs.categoriesList.addEventListener('click', handleCategoryClick);
}

function renderCategories(categories) {
  const firstCategoryItem = `<li class="categories-list-item">
                <button class="categories-list-button current">All categories</button>
              </li>`;
  const markup = categories
    .map(({ list_name }) => {
      if (list_name) {
        return `<li class="categories-list-item">
                <button class="categories-list-button">${list_name}</button>
              </li>`;
      }
    })
    .join('');
  refs.categoriesList.innerHTML = firstCategoryItem + markup;
}

async function handleCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.textContent;

  const prevBtn = document.querySelector('.current');
  if (prevBtn) prevBtn.classList.remove('current');
  e.target.classList.add('current');

  refs.mainBookList.innerHTML = '';
  showLoader();

  try {
    let data = [];

    if (categoryName === 'All categories') {
      refs.mainBookList.dataset.booklist = 'top-books';
      data = await getTopBooks();
    } else {
      refs.mainBookList.dataset.booklist = 'books-by-category';
      const category = await fetchBookByCategory(categoryName);
      if (category && category.length > 0) {
        renderBooksListByCategory(category);
        data = category;
      }
    }

    if (!data || data.length === 0) {
      showEmptyPage();
    } else {
      hideEmptyPage();
    }

    if (STATE.screenType === 'mobile' || STATE.screenType === 'tablet') {
      refs.mainBooksBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  } catch (error) {
    console.log(error);
    notyf.error('An error occurred while loading');
    showEmptyPage();
  } finally {
    hideLoader();
  }
}
