export function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to LocalStorage:', error);
  }
}

export function loadFromLS(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from LocalStorage:', error);
    return null;
  }
}

const USER_KEY = 'user';

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}


// Function by pagination//

export function handleGetBtnClick() {
  const itemCount = localStorage.length;
  const downloadedBooks = [];

  for (let i = 0; i < itemCount; i++) {
    const key = localStorage.key(i);
    const value = loadFromLS(key);

    if (value._id) {
      downloadedBooks.push(value);
    }
  }
    return downloadedBooks;
}
