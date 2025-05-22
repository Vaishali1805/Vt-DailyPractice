document.addEventListener('DOMContentLoaded',showName);
const urlParams = new URLSearchParams(window.location.search);

function showName() {
    localStorage.setItem('userId',urlParams.get("id"))
    document.getElementById('name').textContent = `Welcome ${urlParams.get("name")}`;
}