import { refs, WISHLIST_KEY } from '../utils/constants';
import { handleGetBtnClick, loadFromLS, saveToLS } from '../utils/storage';
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
document.addEventListener("DOMContentLoaded", function() {
  const paginationContainer = document.getElementById('pagination');
  const pagination = new Pagination(paginationContainer, {
    totalItems: handleGetBtnClick().length,
    itemsPerPage: window.innerWidth < 768 ? 4 : 3, 
    visiblePages: 2,
    centerAlign: true,
  });

  pagination.on('afterMove', function(event) {
    const itemsPerPage = window.innerWidth < 768 ? 4 : 3;
    pagination.setItemsPerPage(itemsPerPage);
    renderWithPagination();
  });
});

window.addEventListener("resize", onResize);

function onResize() {
  const targetPage = pagination.page;
  pagination.movePageTo(targetPage);
}

function renderWithPagination() {
    if (checkIfEmpty()) {
        const currentPage = pagination.getCurrentPage();
        const itemsPerPage = window.innerWidth < 768 ? 4 : 3;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const booksToRender = handleGetBtnClick().slice(startIndex, endIndex);
        renderShopList(booksToRender);
    }
}

function checkIfEmpty() {
  if (handleGetBtnClick().length === 0) {
    refs.list.classList.add("is-hidden");
    refs.paginationElem.classList.add("is-hidden");
    refs.emptyList.classList.remove("is-hidden");
    return false;
  } else {
    refs.list.classList.remove("is-hidden");
    refs.emptyList.classList.add("is-hidden");
    refs.paginationElem.classList.remove("is-hidden");
    return true;
  }
}
