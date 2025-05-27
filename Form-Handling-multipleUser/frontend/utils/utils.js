//move common.js code here

function setLocalStorageData(key,value) {
    localStorage.setItem(key,JSON.stringify(value));
}

function getLocalStorageData(key) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

function redirectToPath(path) {
    window.location.href = path;
}

function runAfterDelay(callback, delay) {
    setTimeout(callback, delay);
}