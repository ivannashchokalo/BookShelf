import { refs, WISHLIST_KEY } from '../utils/constants';
import { loadFromLS, saveToLS } from '../utils/storage';
import { fetchBookById } from '../utils/books-api';

export function getWishlist() {
  return loadFromLS(WISHLIST_KEY) || [];
}

export function isInWishlist(id) {
  return getWishlist().includes(id);
}

export function addToWishlist(id) {
  const wishlist = getWishlist();
  if (!wishlist.includes(id)) {
    saveToLS(WISHLIST_KEY, [...wishlist, id]);
  }
}

export function removeFromWishlist(id) {
  const wishlist = getWishlist().filter(itemId => itemId !== id);
  saveToLS(WISHLIST_KEY, wishlist);
}

function showEmpty() {
  refs.list.innerHTML = '';
  refs.empty.classList.remove('is-hidden');
}
function hideEmpty() {
  refs.empty.classList.add('is-hidden');
}

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
          <button type="button" class="shop-list-delete-btn" data-id="${_id}">
            Remove
          </button>
        </div>
      </div>
    </li>
  `;
}

export async function renderShoppingList() {
  if (!refs.list || !refs.empty) return;

  const ids = (getWishlist() || []);

  if (!ids.length) {
    showEmpty();
    return;
  }

  hideEmpty();
  refs.list.innerHTML = '<li>Loading...</li>';

  const results = await Promise.allSettled(ids.map(fetchBookById));
  const books = results
    .filter(r => r.status === 'fulfilled' && r.value?._id)
    .map(r => r.value);

  if (!books.length) {
    showEmpty();
    return;
  }

  refs.list.innerHTML = books.map(bookCardTemplate).join('');
}

export function initShoppingListRemove() {
  if (!refs.list) return;

  refs.list.addEventListener('click', async e => {
    const btn = e.target.closest('.shop-list-delete-btn');
    if (!btn) return;

    const id = btn.dataset.id;
    const nextIds = (getWishlist() || []).filter(x => x !== id);

    saveToLS(WISHLIST_KEY, nextIds);
    await renderShoppingList();
  });
}
