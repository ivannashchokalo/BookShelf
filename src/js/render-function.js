import { refs } from './refs';

export function renderTopBooks(data, cardsLimit) {
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
  return `<li class="book-card" data-id="${_id}" alt="Book cover of ${title}">
  <img class="book-card-cover" src="${book_image}">
  <h3 class="book-card-title">${title}</h3>
  <p class="book-card-author">${author}</p>
  </li>`;
}
