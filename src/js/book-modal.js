import { fetchBookById } from './books-api';
import { refs } from './refs';

export async function handleOpenBookModal(e) {
  const bookCard = e.target.closest('li.book-card');
  if (!bookCard) {
    return;
  }
  const bookId = bookCard.dataset.id;
  const data = await fetchBookById(bookId);
  console.log(data);

  refs.bookModal.showModal();
}
