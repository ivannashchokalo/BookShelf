import { fetchAllCategories } from "./books-api";
import { renderCategories } from "./render-function";

export async function initHome() {
    try {
        const categories = await fetchAllCategories();
        renderCategories(categories); 
    } catch (error) {
        console.log(error);
        
    }

}