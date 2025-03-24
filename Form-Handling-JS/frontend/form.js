const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const nameErr_msg = document.getElementById('nameError');

const inputEmail = document.getElementById('inputEmail');
const emailError_msg = document.getElementById('emailError');

const ph_Number = document.getElementById("phoneNumber");
const phError_msg = document.getElementById("ph_error");

const dateOfBirth = document.getElementById("birthday");
const dobError_msg = document.getElementById("dob_error");
const studentId = document.getElementById('floatingInputGrid');
const gender = document.getElementById('floatingSelectGrid');

const parentName = document.getElementById('parentName');
const parentRel = document.getElementById('relation');
const parent_contactNo = document.getElementById('contactNo');
const parent_email = document.getElementById('email');

const streetAddress = document.getElementById('streetAddress');
const inputCountry = document.getElementById('countries');
const inputState = document.getElementById('inputState');
const inputCity = document.getElementById('inputCity');

const selectCountry = document.querySelector("#countries");
const selectState = document.querySelector("#inputState");
const selectCity = document.querySelector("#inputCity");

const submitBtn = document.getElementById('submitBtn');

const api_key = 'TUNvRDM2cXJkWkZ1cURYODlqWWJQc2lXb0YzNDZPUWtpY2JsOERieg==';

document.addEventListener("DOMContentLoaded", getAllCountries_API);

selectCountry.addEventListener("change", function () {
  const obj = JSON.parse(this.value);
  const countryCode = obj.code;
  getStates_API(countryCode);
  // getStates(countryCode);
})

submitBtn.addEventListener('click', (e) => {
  handleSubmit(e);
});

function handleSubmit(event) {
  event.preventDefault();

  if(!validate_form()){
    return;
  }

  // Accessing form values
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const userEmailValue = inputEmail.value;
  const phNumberValue = ph_Number.value;
  const dateOfBirthValue = dateOfBirth.value;
  const studentIdValue = studentId.value;
  const genderValue = gender.value;
  const parentNameValue = parentName.value;
  const parentRelValue = parentRel.value;
  const parentContactNoValue = parent_contactNo.value;
  const parentEmailValue = parent_email.value;
  const streetAddressValue = streetAddress.value;

  const selectedCountry = JSON.parse(inputCountry.value).name;
  const selectedState = JSON.parse(inputState.value).name;
  const selectedCity = JSON.parse(inputCity.value).name;

  // Now add a new row to the table
  const tableBody = document.querySelector('#formDataTable tbody');
  const newRow = document.createElement('tr');

  // Create and append each table cell for the new row
  newRow.innerHTML = `
    <td>${firstNameValue}</td>
    <td>${lastNameValue}</td>
    <td>${userEmailValue}</td>
    <td>${phNumberValue}</td>
    <td>${dateOfBirthValue}</td>
    <td>${studentIdValue}</td>
    <td>${genderValue}</td>
    <td>${parentNameValue}</td>
    <td>${parentRelValue}</td>
    <td>${parentContactNoValue}</td>
    <td>${parentEmailValue}</td>
    <td>${streetAddressValue}</td>
    <td>${selectedCountry}</td>
    <td>${selectedState}</td>
    <td>${selectedCity}</td>
  `;

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Optionally, clear the form after submission
  document.querySelector('form').reset();
}

function validate_form() {
  const EmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ph_Pattern = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  let flag = true;

  if (firstName.value.trim() == "" || lastName.value.trim() == "") {
    nameErr_msg.textContent = '*First name and last name is required';
    flag = false;       //max 30 char,and not less than 2 char
  }

  if (inputEmail.value.trim() == "") {
    emailError_msg.textContent = '*Email is required';
    flag = false;
  }

  if (!EmailPattern.test(inputEmail.value)) {
    emailError_msg.textContent = '*Invalid email address';
    flag = false;
  }

  if (!ph_Number.value) {
    phError_msg.textContent = '*Contact Number is required';
    flag = false;
  }

  if (!ph_Pattern.test(ph_Number.value)) {
    phError_msg.textContent = '*Invalid Contact Number';
    flag = false;
  }

  if (isNaN(new Date(dateOfBirth.value))) {
    dobError_msg.textContent = '*Invalid Date of Birth'
    flag = false;
  }

  //validate studentId and guardian Info
  return flag;
}

//using API
function getAllCountries_API() {
  fetch(" https://api.countrystatecity.in/v1/countries", { headers: { "X-CSCAPI-KEY": api_key } })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      selectCountry.innerHTML = '<option value="">Select Country</option>'; // Default option
      data.forEach((country) => {
        let option = document.createElement("option");
        const obj = { code: country.iso2, name: country.name };
        option.value = JSON.stringify(obj);
        // option.value = country.iso2;         // Country code as value
        option.textContent = country.name;      // Country name as text
        selectCountry.appendChild(option);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

//using API
function getStates_API(countryCode) {
  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, { headers: { "X-CSCAPI-KEY": api_key } })
    .then(res => res.json())
    .then((data) => {
      selectState.innerHTML = '<option value="">Select State</option>';
      data.forEach((state) => {
        let option = document.createElement("option");
        const obj = { code: state.iso2, name: state.name };
        option.value = JSON.stringify(obj);
        // option.value = state.iso2;         // state code as value
        option.textContent = state.name;      // state name as text
        selectState.appendChild(option);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    })

  selectState.addEventListener("change", function () {
    const obj = JSON.parse(this.value);
    const stateCode = obj.code;    
    getCities_API(countryCode, stateCode);
  })
}

//using API
function getCities_API(countryCode, stateCode) {
  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, { headers: { "X-CSCAPI-KEY": api_key } })
    .then(res => res.json())
    .then((data) => {      
      selectCity.innerHTML = '<option value="">Select City</option>';
      data.forEach((city) => {
        let option = document.createElement("option");
        const obj = { code: city.iso2, name: city.name };
        option.value = JSON.stringify(obj);
        // option.value = city.code;              // city code as value
        option.textContent = city.name;           // city name as text
        selectCity.appendChild(option);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
}

//using JSON File
function getAllCountries() {
  fetch('./countryData.json').then(res => res.json())
    .then(data => {
      console.log("data: ", data);
      const arr = data.map(country => {
        let option = document.createElement("option");
        option.value = country.code2;
        option.textContent = country.name;
        selectCountry.appendChild(option);
      })
    })
    .catch(error => {
      console.log("error: ", error);
    })
}

//using JSON File
function getStates(countryCode) {
  console.log("countryCode: ", countryCode);
  fetch('./countryData.json').then(res => res.json())
    .then(data => {
      const arr = data.map((country, _) => {
        if (country.code2 === countryCode)
          return { states: country.states }
      }).filter(Boolean)            // used to remove undefined values from the array

      if (arr[0].states.length) {
        console.log("state array: ", arr[0].states);
        const stateArray = arr[0].states;
        stateArray.forEach((country) => {
          let option = document.createElement("option");
          option.value = country.code; // Country code as value
          option.textContent = country.name; // Country name as text
          selectState.appendChild(option);
        });
      } else {
        let option = document.createElement("option");
        option.value = '';
        option.textContent = 'No states available'
        selectState.appendChild(option);
      }
    })
    .catch(error => {
      console.log("Error: ", error);
    })
}

