import { fetchBookById } from "../utils/books-api";
import { refs } from "../utils/constants";
import { loadFromLS, saveToLS } from "../utils/storage";



// --- шаблон картки книги ---
function bookCardTemplate(book) {
  const { _id, title, author, category, description, book_image, buy_links = [] } = book;

  const shops = buy_links
    .map(link => `<a class="book-shop-link" href="${link.url}" target="_blank" rel="noopener">${link.name}</a>`)
    .join('');

  return `
    <li class="book-card" data-id="${_id}">
      <div class="book-cover">
        <img src="${book_image}" alt="Cover of ${title}" loading="lazy" />
      </div>
      <div class="book-info">
        <h3 class="book-title">${title}</h3>
        <div class="book-meta">
          <span class="book-category">${category}</span>
          <span class="book-author">by ${author}</span>
        </div>
        <p class="book-description">${description}</p>
        <div class="book-actions">
          <div class="book-shops">${shops}</div>
          <button type="button" class="shop-list-delete-btn" aria-label="Remove ${title}">Remove</button>
        </div>
      </div>
    </li>
  `;
}

