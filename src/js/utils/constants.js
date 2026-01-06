export const refs = {
  mainBooksBlock: document.querySelector('.books'),
  mainBookList: document.querySelector('.main-books-list'),
  categoriesList: document.querySelector('.categories-list'),
  charityElem: document.querySelector('.swiper-wrapper'),
  swiperBtnElem: document.querySelector('.support-swiper-btn'),
  arrowElem: document.querySelector('.swiper-button-icon'),
  scrollUpBtn: document.querySelector('.scroll-up'),
  bookModal: document.querySelector('.book-modal'),
  loader: document.querySelector('.loader'),
  list: document.getElementById('books-list'),
  empty: document.querySelector('.shop-list-empty'),
};

export const STATE = {
  screenType: 'mobile', // "desktop", "tablet", "mobile"
};

export const WISHLIST_KEY = 'wishlist';