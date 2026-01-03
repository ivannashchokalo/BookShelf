import { fetchTopBooks } from './books-api';
import { renderTopBooks } from './render-function';

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

export async function getTopBooks() {
  const cardsLimit = getResponsiveCardsLimit();
  try {
    const data = await fetchTopBooks();
    renderTopBooks(data, cardsLimit);
  } catch (err) {
    console.error(err);
  }
}

function getResponsiveCardsLimit() {
  const screenType = getScreenType();
  const limits = {
    mobile: 1,
    tablet: 3,
    desktop: 5,
  };
  return limits[screenType];
}
