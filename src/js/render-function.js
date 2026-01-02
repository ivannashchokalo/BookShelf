import { refs } from "./refs";

export function renderCategories(categories) {
    const firstCategoryItem = `<li class="categories-list-item">
                <button class="categories-list-button current">All categories</button>
              </li>`

    const markup = categories.map(({ list_name }) => {
        if (list_name) {
            return `<li class="categories-list-item">
                <button class="categories-list-button">${list_name}</button>
              </li>`
        }
    }).join('');

    refs.categoriesList.innerHTML = firstCategoryItem+markup;
}