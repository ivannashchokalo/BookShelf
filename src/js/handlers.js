import { fetchAllCategories, fetchBookByCategory } from './books-api';
import { STATE } from './constants';
import { getScreenType, getTopBooks } from './helpers';
import { fundsMarkup, renderBooksListByCategory, renderCategories } from './render-function';
import Swiper from 'swiper';
import 'swiper/css';
import { refs } from './refs';


import fund1 from '../img/funds/save-the-children.png';
import fund1x from '../img/funds/save-the-children-2x.png';
import fund2 from '../img/funds/project-hope.png';
import fund2x from '../img/funds/project-hope-2x.png';
import fund3 from '../img/funds/united24.png';
import fund3x from '../img/funds/united24-2x.png';
import fund4 from '../img/funds/international-medical-corps.png';
import fund4x from '../img/funds/international-medical-corps-2x.png';
import fund5 from '../img/funds/medicines-sans-frontieres.png';
import fund5x from '../img/funds/medicine-sans-frontieres-2x.png';
import fund6 from '../img/funds/razom.png';
import fund6x from '../img/funds/razom-2x.png';
import fund7 from '../img/funds/action-against-hunger.png';
import fund7x from '../img/funds/action-against-hunger-2x.png';
import fund8 from '../img/funds/world-vision.png';
import fund8x from '../img/funds/world-vision-2x.png';
import fund9 from '../img/funds/sergiy-prytula.png';
import fund9x from '../img/funds/sergiy-prytula-2x.png';
import { scrollUp, showScrollUpBtn } from './scroll-up';


export async function handleHomePageInit() {
  // призначити активною "All categories"
  // зчитати і застосувати тему з локального сховища
  // за бажанням можна додати каунтер в хедер до шопінг листа. Зчитати і застосувати його з локального сховища
  STATE.screenType = getScreenType();
  await getTopBooks();
  try {
    const categories = await fetchAllCategories();
    renderCategories(categories);
  } catch (error) {
    console.log(error);
  }
}

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

//Support handlers//

 export const funds = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: fund1,
    img1: fund1x,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: fund2,
    img1: fund2x,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: fund3,
    img1: fund3x,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: fund4,
    img1: fund4x,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: fund5,
    img1: fund5x,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: fund6,
    img1: fund6x,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: fund7,
    img1: fund7x,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: fund8,
    img1: fund8x,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: fund9,
    img1: fund9x,
  },
];
// -----------------------------
// Рендер розмітки фондів
// -----------------------------
export function renderFunds() {
  if (!refs.charityElem) return;
  refs.charityElem.innerHTML = fundsMarkup(funds);
}

// -----------------------------
// Ініціалізація Swiper
// -----------------------------
export function initSwiper() {
  const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    loop: false,
    effect: 'slide',
    slidesPerView: 6,
    slidesPerGroup: 6,
  });

  swiper.on('reachBeginning', () => {
    refs.arrowElem.style.transform = '';
  });

  swiper.on('reachEnd', () => {
    refs.arrowElem.style.transform = 'rotate(180deg)';
  });

  refs.swiperBtnElem.addEventListener('click', () => {
    if (refs.arrowElem.style.transform === '') {
      swiper.slideNext(2000);
    } else {
      swiper.slidePrev(2000);
    }
  });
}
//Scroll up

refs.scrollUpBtn.addEventListener('click', scrollUp);
window.addEventListener('scroll', showScrollUpBtn);


export async function handleCategoryClick(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  const categoryName = e.target.textContent;

  const prevBtn = document.querySelector('.current');
  if (prevBtn) prevBtn.classList.remove('current');
  e.target.classList.add('current');

  STATE.screenType = getScreenType();

  try {
    if (categoryName === 'All categories') {
      await getTopBooks();
    } else {
      const category = await fetchBookByCategory(categoryName);
      renderBooksListByCategory(category);
    } 
    
    if (STATE.screenType === 'mobile' || STATE.screenType === 'tablet') {
    refs.mainBooksBlock.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  } catch (error) {
    console.log(error);
  }
}