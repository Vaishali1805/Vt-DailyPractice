const selectCountry = document.querySelector("#countries");
const selectState = document.querySelector("#inputState");
const apiKey = 'aabbccdd';

document.addEventListener("DOMContentLoaded", getAllCountries);
selectCountry.addEventListener("change",function() {
    const countryCode = this.value;
    console.log("countryCode: ",countryCode);
    getStates(countryCode);
})

function getAllCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      selectCountry.innerHTML = '<option value="">Select Country</option>'; // Default option
      console.log(data)
      data.forEach((country) => {
        let option = document.createElement("option");
        option.value = country.cca2; // Country code as value
        option.textContent = country.name.common; // Country name as text
        selectCountry.appendChild(option);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

function getStates(countryCode) {
    selectState.innerHTML = '<option value="">Select State</option>';
    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
        headers: { "X-CSCAPI-KEY": apiKey }
    })
    .then(res => res.json())
    .then((data) => {
        console.log("data: ",data);
    })
}
