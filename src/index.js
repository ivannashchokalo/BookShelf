import '../src/sass/main.scss';

import { initHome } from './js/home';
import { initShoppingList } from './js/shopping-list.js';

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