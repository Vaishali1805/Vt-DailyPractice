document.addEventListener('DOMContentLoaded',checkLoginStatus());
// const urlParams = new URLSearchParams(window.location.search);

function checkLoginStatus() {
    const id = JSON.parse(localStorage.getItem('userId'));
    if(!id){
        window.location.href = '../../auth/login.html';
    }
    document.getElementById('name').textContent = `Welcome ${JSON.parse(localStorage.getItem('name'))}`;
}