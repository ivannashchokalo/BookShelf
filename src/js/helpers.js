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
}
