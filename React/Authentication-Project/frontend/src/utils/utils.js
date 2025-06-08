import defaultImage from '../assets/defaultImage.webp';

export function setLocalStorageData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageData(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

export function sendResponseTofunction(success, message) {
    return { success, message };
}

export const getSource = (profilePath,selectedImage = null) => {
    if (selectedImage) return selectedImage;
    if (profilePath) return `http://localhost:5000/${profilePath}`
    return defaultImage;
}