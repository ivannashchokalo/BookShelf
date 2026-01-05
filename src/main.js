import '../src/sass/main.scss';
import { initCharity } from './js/components/charity.js';
import { initHeader } from './js/components/header.js';
import { initScrollUp } from './js/components/scroll-up.js';
import { initHome } from './js/pages/home.js';
import { initShoppingList } from './js/pages/shopping-list.js';

const page = document.body.dataset.page;

switch (page) {
  case 'home':
    initHome();
    break;
  case 'shopping-list':
    initShoppingList();
    break;
  default:
    console.log('Unknown page');
}

initHeader();
initCharity();
initScrollUp();
