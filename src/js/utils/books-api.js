import axios from "axios";
const BASE_URL = "https://books-backend.p.goit.global";

const server = axios.create({
    baseURL: BASE_URL,
})

const ENDPOINTS = {
  allCategories: "/books/category-list",
  top: "/books/top-books",                
  byCategory: "/books/category",          
  bookById: "/books",                     
};

export async function fetchAllCategories() {
    const response = await server.get(ENDPOINTS.allCategories);
    return response.data;
}

export async function fetchTopBooks() {
    const response = await server.get(ENDPOINTS.top);
    return response.data;
}

export async function fetchBookByCategory(category) {
     const response = await server.get(ENDPOINTS.byCategory, {
        params: {
            category,
        }
    });
    return response.data;
}

export async function fetchBookById(id) {
    const response = await server.get(`${ENDPOINTS.bookById}/${id}`)
    return response.data;
}


