import { fetchBookById } from '../utils/books-api';
import { refs } from '../utils/constants';
import { addToWishlist, isInWishlist, removeFromWishlist } from './shopping-list-components';

export function initBookModal() {
  // Делегування кліку в модалці
  refs.bookModal.addEventListener('click', onModalClick);
}

export async function handleOpenBookModal(e) {
  const bookCard = e.target.closest('li.book-card');
  if (!bookCard) {
    return;
  }
  const bookId = bookCard.dataset.id;
  const data = await fetchBookById(bookId);
  console.log(data);
  renderBookModal(data);

  refs.bookModal.showModal();
}

function renderBookModal({ _id, book_image, title, author, buy_links }) {
  const markup = `<img class="book-modal-cover" src="${book_image}" alt="Book cover of ${title}">
  <div class="book-modal-wrap">
  <h3 class="book-modal-title">${title}</h3>
  <p class="book-modal-author">${author}</p>
  <div class="book-modal-shops-wrap></div>
  <button class="book-modal-btn" data-id="${_id}">Add to shopping list</button>
  </div>`;
  refs.bookModal.innerHTML = markup;
}

function onModalClick(e) {
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
