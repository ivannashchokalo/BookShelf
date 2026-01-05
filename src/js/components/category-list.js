import { fetchAllCategories, fetchBookByCategory } from '../utils/books-api';
import { refs, STATE } from '../utils/constants';
import { getTopBooks, renderBooksListByCategory } from './main-book-list';

export async function initCategoryList() {
  try {
    const categories = await fetchAllCategories();
    renderCategories(categories);
  } catch (error) {
    console.log(error);
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

  try {
    if (categoryName === 'All categories') {
      refs.mainBookList.dataset.booklist = 'top-books';
      await getTopBooks();
    } else {
      refs.mainBookList.dataset.booklist = 'books-by-category';
      const category = await fetchBookByCategory(categoryName);
      renderBooksListByCategory(category);
    }

    if (STATE.screenType === 'mobile' || STATE.screenType === 'tablet') {
      refs.mainBooksBlock.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  } catch (error) {
    console.log(error);
  }
}
