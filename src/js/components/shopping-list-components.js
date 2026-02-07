import { refs, WISHLIST_KEY } from '../utils/constants';
import { loadFromLS, saveToLS } from '../utils/storage';
import { fetchBookById } from '../utils/books-api';
import icon from '../../icons/symbol-defs.svg';
import trash from '../../icons/symbol-defs.svg?url';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';



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
  const {
    _id,
    book_image,
    title,
    list_name,
    description,
    author,
    amazon_product_url,
    buy_links,
  } = book;

  return `<li class="shop-list-item" id="${_id}">
        <img class="shop-list-img"
            src="${book_image}"
            alt="${title}" />  
        <div class="book-info">
        <h1 class="book-title">${title}</h1>
        <p class="book-category">${list_name}</p>
        <p class="book-description">${description}</p>
        <div class="card-footer">
        <p class="book-author">${author}</p>
        <ul class="book-shop-links">
        <li><a href="${amazon_product_url}" target="_blank"><svg class="book-shop-img amazon-logo"><use href="${icon}#icon-amazon"></use></svg></a></li>
        <li><a class="book-shop-link" href="${buy_links[1].url}" target="_blank"><svg class="book-shop-img apple-books-logo"><use href="${icon}#icon-ibooks"></use></svg></a></li>
        </ul>
        </div> 
        </div>
         <button class="shop-list-delete-btn" data-id="${_id}" aria-label="Remove book">
        <svg class="delete-btn-icon"><use href="${trash}#icon-trash"></use></svg>
      </button>
    </li>`;
}
export async function renderShoppingList() {
  if (!refs.list || !refs.empty) return;

  const ids = getWishlist() || [];

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

//комент

//Pagination//
let pagination;

const getPerPage = () => (window.innerWidth < 768 ? 4 : 3);
const getPaginationEl = () => refs.paginationElem ?? document.getElementById('pagination');

document.addEventListener('DOMContentLoaded', () => {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;

  const total = getWishlist().length;

  pagination = new Pagination(paginationContainer, {
    totalItems: total,
    itemsPerPage: getPerPage(),
    visiblePages: 2,
    centerAlign: true,
  });

  pagination.on('afterMove', () => {
    pagination.setItemsPerPage(getPerPage());
    renderWithPagination();
  });

  window.addEventListener('resize', onResize);

  renderWithPagination();
});

function onResize() {
  if (!pagination) return;

  const current = pagination.getCurrentPage();
  pagination.setItemsPerPage(getPerPage());

  pagination.reset(getWishlist().length);
  pagination.movePageTo(current);
}

async function renderWithPagination() {
  const ids = getWishlist();
  const pagEl = getPaginationEl();

  if (!ids.length) {
    showEmpty();
    if (pagEl) pagEl.classList.add('is-hidden');
    return;
  }

  hideEmpty();
  if (pagEl) pagEl.classList.remove('is-hidden');

  const perPage = getPerPage();
  const page = pagination.getCurrentPage();

  const start = (page - 1) * perPage;
  const sliceIds = ids.slice(start, start + perPage);

  refs.list.innerHTML = '<li>Loading...</li>';

  const results = await Promise.allSettled(sliceIds.map(fetchBookById));
  const books = results
    .filter(r => r.status === 'fulfilled' && r.value?._id)
    .map(r => r.value);

  if (!books.length) {
    showEmpty();
    return;
  }

  refs.list.innerHTML = books.map(bookCardTemplate).join('');
}
