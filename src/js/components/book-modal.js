import { fetchBookById } from '../utils/books-api';
import { refs } from '../utils/constants';
import {
  addToWishlist,
  isInWishlist,
  removeFromWishlist,
} from './shopping-list-components';
import { renderBookLinks } from './book-links';

export function initBookModal() {
  refs.mainBookList.addEventListener('click', handleOpenBookModal);
}

async function handleOpenBookModal(e) {
  const bookCard = e.target.closest('li.book-card');
  if (!bookCard) {
    return;
  }
  const bookId = bookCard.dataset.id;
  const data = await fetchBookById(bookId);
  renderBookModal(data);
  refs.bookModal.showModal();
  refs.bookModal.addEventListener('click', handleModalBtnClick);
  // bookModalcloseBtn.addEventListener('click', () => refs.bookModal.close());
  refs.bookModal.addEventListener('click', handleBackdropClick);
}

function renderBookModal({ _id, book_image, title, author, buy_links }) {
  const linksMarkup = renderBookLinks(buy_links);

  const markup = `<div class="book-modal-wrapper" role="document">
  <button type="button" class="book-modal-close-btn">✕</button>
  <div class="book-modal-content">
    <img class="book-modal-cover" src="${book_image}" alt="Book cover of ${title}">
    <div class="book-modal-info">
      <h3 class="book-modal-title">${title}</h3>
      <p class="book-modal-author">${author}</p>
      <ul class="book-modal-shops-list">${linksMarkup}</ul>
    </div>
  </div>
  <button type="button" class="book-modal-btn" data-id="${_id}">Add to shopping list</button>
  </div>`;
  refs.bookModal.innerHTML = markup;
}

function handleModalBtnClick(e) {
  const btn = e.target.closest('.book-modal-btn');
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) return;

  if (isInWishlist(id)) {
    removeFromWishlist(id);
    btn.textContent = 'Add to shopping list';
  } else {
    addToWishlist(id);
    btn.textContent = 'Remove from shopping list';
  }
}

function handleBackdropClick(e) {
  if (e.target !== refs.bookModal) {
    return;
  }
  refs.bookModal.close();
  refs.bookModal.removeEventListener('click', handleBackdropClick);
}
