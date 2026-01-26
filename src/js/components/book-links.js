import amazonLogo from '../../img/book-links/amazon.svg';
import appleLogo from '../../img/book-links/apple-books.svg';
import barnerAndNobleLogo from '../../img/book-links/barner-and-noble.svg';
import bamLogo from '../../img/book-links/books-a-million.svg';
import bookshopLogo from '../../img/book-links/bookshop.svg';
import defaultLogo from '../../img/book-links/default.svg';

export function renderBookLinks(links) {
  const markup = links.map(link => renderBookLink(link)).join('');
  return markup;
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

  return `<li class="book-link-item">
  <a class="book-link" href="${url}"  target="_blank" rel="noopener noreferrer nofollow">
  <img src="${logoSrc}" alt="${name} logo" class="book-link-logo"/>
  </a>
  </li>`;
}
