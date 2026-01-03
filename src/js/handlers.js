import { fetchAllCategories } from './books-api';
import { STATE } from './constants';
import { getScreenType, getTopBooks } from './helpers';
import { renderCategories } from './render-function';

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
  // якщо категорія не "All categories" - return
  await getTopBooks();
}
