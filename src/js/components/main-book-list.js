import { fetchTopBooks } from '../utils/books-api';
import { refs, STATE } from '../utils/constants';
import { getResponsiveCardsLimit, getScreenType } from '../utils/helpers';
import { hideLoader, showLoader } from '../utils/loader';
import { notyf } from '../utils/notifications';

export async function initBookList() {
  // зчитати і застосувати тему з локального сховища
  // за бажанням можна додати каунтер в хедер до шопінг листа. Зчитати і застосувати його з локального сховища
  STATE.screenType = getScreenType();
  await getTopBooks();
}

export async function getTopBooks() {
  const cardsLimit = getResponsiveCardsLimit();
  showLoader()
  try {
    const data = await fetchTopBooks();
    renderTopBooks(data, cardsLimit);
  } catch (err) {
    console.log(err);
    notyf.error('An error occurred while loading');
  } finally {
    hideLoader()
  }
}

function renderTopBooks(data, cardsLimit) {
  const markup = [];
  data.forEach(category => {
    const booksMarkup = category.books
      .slice(0, cardsLimit)
      .map(book => renderBookListCard(book))
      .join('');
    markup.push(
      `<li class="top-books-category">
      <h2 class="top-books-category-title">${category.list_name}</h2>
      <ul class="books-cards-list">${booksMarkup}</ul>
      <button type="button" class="more-books-btn" data-category="${category.list_name}">SEE MORE</button>
      </li>`
    );
  });
  refs.mainBookList.innerHTML = markup.join('');
}

function renderBookListCard({ _id, book_image, title, author }) {
  return `<li class="book-card" data-id="${_id}">
  <img class="book-card-cover" src="${book_image}" alt="Book cover of ${title}">
  <h3 class="book-card-title">${title}</h3>
  <p class="book-card-author">${author}</p>
  </li>`;
}

export function renderBooksListByCategory(category) {
  const markup = category.map(renderBookListCard).join('');
  refs.mainBookList.innerHTML = markup;
}
