const getCountry = document.querySelector('.country');
console.log("getCountry",getCountry)

document.addEventListener('DOMContentLoaded',getAllCountries);

function getAllCountries() {
    const selectDrop = document.querySelector('#countries');

    fetch('https://restcountries.com/v3.1/all').then(res => {
        return res.json();
    }).then(data => {
        console.log(data[0]);
    }).catch(err => {
        console.log("Error: ",err);
    })
}