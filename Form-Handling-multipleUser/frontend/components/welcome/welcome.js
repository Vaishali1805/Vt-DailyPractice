document.addEventListener('DOMContentLoaded',showName);
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
function showName() {
    document.getElementById('name').textContent = `Welcome ${name}`;
}