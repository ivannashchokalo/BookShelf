export function saveToLS(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to LocalStorage:', error)
    }
}

export function loadFromLS(key) {
    try {
         const data = localStorage.getItem(key);
        return data?  JSON.parse(data):null;
    } catch (error) {
        console.error('Error loading from LocalStorage:', error);
        return null;
    }
}