import { refs, STATE, WISHLIST_KEY } from './constants';
import { loadFromLS, saveToLS } from './storage';


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