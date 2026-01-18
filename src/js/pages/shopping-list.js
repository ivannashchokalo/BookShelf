import {
  initShoppingListRemove,
  renderShoppingList,
} from '../components/shopping-list-components';
import { refs } from '../utils/constants';
import { getScreenType, handleShoppingListResize } from '../utils/helpers';

export function initShoppingList() {
  renderShoppingList();
  initShoppingListRemove();

  // приховання charity
  handleShoppingListResize();
  window.addEventListener('resize', handleShoppingListResize);
}
