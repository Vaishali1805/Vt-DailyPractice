export function setLocalStorageData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageData(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

export function sendResponseTofunction(success,message) {
    return { success, message};
}