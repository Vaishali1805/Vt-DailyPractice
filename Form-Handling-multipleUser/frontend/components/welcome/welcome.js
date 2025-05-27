document.addEventListener('DOMContentLoaded',checkLoginStatus());
// const urlParams = new URLSearchParams(window.location.search);

function checkLoginStatus() {
    const id = getLocalStorageData('userId');
    if(!id){
        redirectToPath('../../auth/login.html');
    }
    document.getElementById('name').textContent = `Welcome ${getLocalStorageData('name')}`;
}