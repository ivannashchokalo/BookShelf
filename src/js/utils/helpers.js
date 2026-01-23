import { getTopBooks } from '../components/main-book-list';
import { refs, STATE } from './constants';

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

export function handleShoppingListResize() {
  const screenType = getScreenType();

  if (screenType === STATE.shoppingScreenType) {
    return;
  }

  STATE.shoppingScreenType = screenType;

  if (screenType === 'mobile' || screenType === 'tablet') {
    refs.charity.classList.add('is-hidden');
  } else {
    refs.charity.classList.remove('charity-hidden');
  }
}

export function showEmptyPage() {
  const page = document.body.dataset.page;

  refs.emptyList.classList.remove('empty-list-hidden');

  if (page === 'home') {
    refs.emptyListMessageHome.classList.remove('list-empty-message-hidden');
    refs.emptyListMessageShopping.classList.add('list-empty-message-hidden');
  } else if (page === 'shopping-list') {
    refs.emptyListMessageShopping.classList.remove('list-empty-message-hidden');
    refs.emptyListMessageHome.classList.add('list-empty-message-hidden');
  }
}

export function hideEmptyPage() {
  refs.emptyList.classList.add('empty-list-hidden');
}
