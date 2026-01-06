import { fetchBookById } from '../utils/books-api';
import { refs } from '../utils/constants';
import amazonLogo from '../../img/book-modal/amazon.svg';
import appleLogo from '../../img/book-modal/apple-books.svg';
import barnerAndNobleLogo from '../../img/book-modal/barner-and-noble.svg';
import bamLogo from '../../img/book-modal/books-a-million.svg';
import bookshopLogo from '../../img/book-modal/bookshop.svg';
import defaultLogo from '../../img/book-modal/default.svg';

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
  console.log(data);
  renderBookModal(data);
  // слухач на кнопку
  refs.bookModal.showModal();
}

function renderBookModal({ _id, book_image, title, author, buy_links }) {
  const linksMarkup = buy_links.map(link => renderBookLink(link)).join('');
  const markup = `<img class="book-modal-cover" src="${book_image}" alt="Book cover of ${title}">
  <div class="book-modal-wrap">
  <h3 class="book-modal-title">${title}</h3>
  <p class="book-modal-author">${author}</p>
  <ul class="book-modal-links-list">${linksMarkup}</ul>
  <button class="book-modal-btn" data-id="${_id}">Add to shopping list</button>
  </div>`;
  refs.bookModal.innerHTML = markup;
}

function renderBookLink({ name, url }) {
  let logoSrc;
  switch (name) {
    case 'Amazon':
      logoSrc = amazonLogo;
      break;
    case 'Apple Books':
      logoSrc = appleLogo;
      break;
    case 'Barnes & Noble':
    case 'Barnes and Noble':
      logoSrc = barnerAndNobleLogo;
      break;
    case 'Books-A-Million':
      logoSrc = bamLogo;
      break;
    case 'Bookshop.org':
      logoSrc = bookshopLogo;
      break;
    default:
      logoSrc = defaultLogo;
  }
  return `<li class="modal-book-link-item">
  <a class="modal-book-link" href="${url}"  target="_blank" rel="noopener noreferrer nofollow">
  <img src="${logoSrc}" alt="${name} logo" class="modal-book-logo"/>
  </a>
  </li>`;
}
