import { refs } from './refs';


// Support helpers //

export function fundsMarkup(funds) {
  return funds
    .map(({ title, url, img, img1 }, index) => {
      const paddedIndex = String(index + 1).padStart(2, '0');
      return `
        <div class="swiper-slide">
          <a class="support-funds-link" href="${url}" target="_blank"
             rel="noopener noreferrer nofollow" aria-label="Read more about ${title}">
            <p class="support-fund-number">${paddedIndex}</p>
            <img
              src="${img}"
              srcset="${img} 1x, ${img1} 2x"
              class="support-funds-list-link-image"
              alt="${title}"
              loading="lazy"
            >
          </a>
        </div>`;
    })
    .join('');
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
