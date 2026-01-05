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

export function renderBooksListByCategory(category) {
  const markup = category.map(renderBookListCard).join('');
  refs.mainBookList.innerHTML = markup;
}

export function renderCategories(categories) {
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
// Support render//

export function fundsMarkup(funds) {
  return funds
    .map(({ title, url, img, img1 }, index) => {
      const paddedIndex = String(index + 1).padStart(2, '0');
      return `
        <div class="swiper-slide">
          <a class="support-funds-link" href="${url}" target="_blank"
             rel="noopener noreferrer nofollow" aria-label="Read more about ${title}">
            <p class="support-fund-number">${paddedIndex}</p>
            <img
              src="${img}"
              srcset="${img} 1x, ${img1} 2x"
              class="support-funds-list-link-image"
              alt="${title}"
              loading="lazy"
            >
          </a>
        </div>`;
    })
    .join('');
}
