import { getTopBooks } from '../components/main-book-list';
import { refs, STATE, WISHLIST_KEY } from './constants';
import { loadFromLS, saveToLS } from './storage';

export async function handleHomeResize() {
  const screenType = getScreenType();
  if (screenType === STATE.screenType) {
    return;
  }
  STATE.screenType = screenType;
  const currentBtn = refs.categoriesList.querySelector('.current');
  if (currentBtn.textContent !== 'All categories') return;
  await getTopBooks();
}

export function getScreenType() {
  const width = window.innerWidth;
  if (width >= 1440) {
    return 'desktop';
  } else if (width >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

export function getResponsiveCardsLimit() {
  const screenType = getScreenType();
  const limits = {
    mobile: 1,
    tablet: 3,
    desktop: 5,
  };
  return limits[screenType];
}


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