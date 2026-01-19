import {
  initShoppingListRemove,
  renderShoppingList,
} from '../components/shopping-list-components';
import { handleShoppingListResize, showEmptyPage } from '../utils/helpers';

export function initShoppingList() {
  renderShoppingList();
  initShoppingListRemove();
  showEmptyPage(); // це тут тимчасово

  // приховання charity
  handleShoppingListResize();
  window.addEventListener('resize', handleShoppingListResize);
}
