const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const nameErr_msg = document.getElementById('nameError');

const userEmail = document.getElementById('inputEmail');
const emailError_msg = document.getElementById('emailError');

const ph_Number = document.getElementById("phoneNumber");
const phError_msg = document.getElementById("ph_error");

const dateOfBirth = document.getElementById("birthday");
const dobError_msg = document.getElementById("dob_error");

const studentId = document.getElementById('floatingInputGrid');
const studentIdError_msg = document.getElementById('studentId_error');

const gender = document.getElementById('floatingSelectGrid');
const genderErr_msg = document.getElementById('gender_error');

const parentName = document.getElementById('parentName');
const parentNameError_msg = document.getElementById('parentName_error');
const parentRel = document.getElementById('relation');
const parentRelErr_msg = document.getElementById('parentRel_error');
const parent_contactNo = document.getElementById('contactNo');
const parent_contactNoErr_msg = document.getElementById('parentContactNo_error')
const parent_email = document.getElementById('email');
const parent_emailErr_msg = document.getElementById('parentEmail_error');

const streetAddress = document.getElementById('streetAddress');
const streetAddressErr_msg = document.getElementById('address_error');
const inputCountry = document.getElementById('countries');
const countryErr_msg = document.getElementById('country_error');
const inputState = document.getElementById('inputState');
const stateErr_msg = document.getElementById('state_error');
const inputCity = document.getElementById('inputCity');
const cityErr_msg = document.getElementById('city_error');
                                                                
const selectCountry = document.querySelector("#countries");
const selectState = document.querySelector("#inputState");
const selectCity = document.querySelector("#inputCity");

const submitBtn = document.getElementById('submitBtn');

const inputProfile = document.getElementById('inputProfile');
const inputProfileBtn = document.getElementById('inputProfileBtn');
const profileError_msg = document.getElementById('profileError');
const preview = document.getElementById('preview');

const api_key = 'TUNvRDM2cXJkWkZ1cURYODlqWWJQc2lXb0YzNDZPUWtpY2JsOERieg==';
let countryCode;

inputProfileBtn.addEventListener('click', (e) => {
  if (inputProfile) {
    inputProfile.click();
  }
  e.preventDefault();     //prevent navigation to "#"
},
  false
)

inputProfile.addEventListener('change', handleFileSelection)

document.addEventListener("DOMContentLoaded", getAllCountries_API);

selectCountry.addEventListener("change", function () {
  const obj = JSON.parse(this.value);
  countryCode = obj.code;
  getStates_API(countryCode);
  // getStates(countryCode);
})

selectState.addEventListener("change", function () {
  const obj = JSON.parse(this.value);
  const stateCode = obj.code;

  if (countryCode && stateCode) {
    getCities_API(countryCode, stateCode);
  }
})

submitBtn.addEventListener('click', (e) => {
  handleSubmit(e);
});

function handleFileSelection(event) {
  const file = event.target.files[0];
  console.log("file: ", file);

  if (!validateFile(file)) {
    inputProfile.value = "";   // clear the input if file is invalid
    preview.innerHTML = "";
    return;
  }

  preview.innerHTML = "";     //to remove the old preview
  const img = document.createElement("img");
  img.classList.add("setImg");
  img.src = URL.createObjectURL(file);
  preview.appendChild(img);
}

function validateFile(file) {
  if (!file) {
    profileError_msg.textContent = 'Please select a file';
    // alert("Please select a file.");
    return false;
  }

  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  const maxSize = 5 * 1024 * 1024; //5MB
  if (!validTypes.includes(file.type)) {
    profileError_msg.textContent = "Invalid file type. Please select an image (JPG, JPEG, PNG)"
    // alert("Invalid file type. Please select an image (JPG, JPEG, PNG).");
    return false;
  }

  if (file.size > maxSize) {
    profileError_msg.textContent = "File size exceeds 5MB. Please select a smaller image";
    // alert("File size exceeds 5MB. Please select a smaller image.");
    return false;
  }

  return true;
}

async function handleSubmit(event) {
  try {
  event.preventDefault();

  if (!validate_form()) {
    return;
  }

  const formDataObj = {
    FirstName: firstName.value,
    LastName: lastName.value,
    Email: userEmail.value,
    ContactNo: ph_Number.value,
    Date_Of_Birth: dateOfBirth.value,
    Gender: gender.value,
    StudentId: studentId.value,
    ParentName: parentName.value,
    ParentRel: parentRel.value,
    ParentContactNo: parent_contactNo.value,
    ParentEmail: parent_email.value,
    Address: streetAddress.value,
    Country: JSON.parse(inputCountry.value).name,
    State: JSON.parse(inputState.value).name,
    City: JSON.parse(inputCity.value).name,
  }
  // console.log("formDataObj: ", formDataObj);
  const file = inputProfile.files[0];
  console.log("file: ",file);

  const formData = new FormData();
  formData.append("profilePic", file, `${Date.now()}_${file.name}`);
  formData.append("formData",JSON.stringify(formDataObj));       //other fields of form

    const response = await fetch("http://localhost:4500/submit/formData", {
      method: "POST",
      body: formData,
      // body: JSON.stringify({ formData: formDataObj }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    window.location.href = '/table.html';

  } catch (error) {
    console.log("Error: ", error);
    // console.error(error.message);
  }
}

function validate_form() {
  const EmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ph_Pattern = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  let flag = true;

  function setError(element, message) {
    element.textContent = message;
    flag = false;
  }

  //Name Validation
  // console.log("firstName: ", firstName.value.length);
  // console.log("lastName: ", lastName.value.length);
  if (firstName.value.trim() == "" || lastName.value.trim() == "") {
    setError(nameErr_msg, '*First name and last name are required');
  } else if (firstName.value.length < 2 || firstName.value.length > 30 || lastName.value.length < 2 || lastName.value.length > 30) {
    setError(nameErr_msg, '*First and last name must be between 2 and 30 characters');
  } else {
    nameErr_msg.textContent = "";         // Clear error if valid
  }

  //profile picture validation
  if (!inputProfile.value) {
    setError(profileError_msg, "Profile picture is required");
  } else {
    profileError_msg.textContent = "";
  }

  //Email Validation
  if (inputEmail.value.trim() == "") {
    setError(emailError_msg, '*Email is required');
  } else if (!EmailPattern.test(inputEmail.value)) {
    setError(emailError_msg, '*Invalid email address');
  } else {
    emailError_msg.textContent = "";
  }

  //Phone Number Validation
  if (!ph_Number.value.trim()) {
    setError(phError_msg, '*Contact number is required');
  } else if (!ph_Pattern.test(ph_Number.value)) {
    setError(phError_msg, '*Invalid contact number');
  } else {
    phError_msg.textContent = "";
  }

  //Date of Birth Validation
  if (!dateOfBirth.value || isNaN(Date.parse(dateOfBirth.value))) {
    setError(dobError_msg, '*Invalid date of birth');
  } else {
    dobError_msg.textContent = "";
  }

  //StudentId validation
  console.log("studentId: ", studentId.value.length);
  if (!studentId.value.trim()) {
    setError(studentIdError_msg, '*Student ID is required');
  } else {
    studentIdError_msg.textContent = "";
  }

  //Gender Validation   -- don't know why it is not working
  if (!gender.value) {
    setError(genderErr_msg, '*Gender is required');
  }

  // Parent/Guardian Name Validation
  if (!parentName.value.trim()) {
    setError(parentNameError_msg, '*Guardian name is required');
  } else if (parentName.value.length < 2 || parentName.value.length > 30) {
    setError(parentNameError_msg, '*Parent Name must be between 2 and 30 characters');
  } else {
    parentNameError_msg.textContent = "";
  }

  // Parent/Guardian Relation Validation
  if (parentRel.value.trim() == "") {
    setError(parentRelErr_msg, 'Relation is required');
  } else if (parentRel.value.length < 2 || parentRel.value.length > 10) {
    setError(parentRelErr_msg, 'Relation must be between 2 and 10 characters');
  } else {
    parentRelErr_msg.textContent = "";
  }

  // Parent/Guardian contact no. Validation
  if (!parent_contactNo.value.trim()) {
    setError(parent_contactNoErr_msg, '*Contact number is required');
  } else if (!ph_Pattern.test(parent_contactNo.value)) {
    setError(parent_contactNoErr_msg, '*Invalid contact number');
  } else {
    parent_contactNoErr_msg.textContent = "";
  }

  // Parent/Guardian Email Validation
  if (parent_email.value.trim() == "") {
    setError(parent_emailErr_msg, '*Email is required');
  } else if (!EmailPattern.test(parent_email.value)) {
    setError(parent_emailErr_msg, '*Invalid email address');
  } else {
    parent_emailErr_msg.textContent = "";
  }

  //Street Address Validation
  if (streetAddress.value.trim() == "") {
    setError(streetAddressErr_msg, '*Street address is required');
  }

  //country,state,city validation
  if (!inputCountry.value) {
    setError(countryErr_msg, '*Country is required')
  } else
    countryErr_msg.textContent = "";

  if (!inputState.value) {
    setError(stateErr_msg, '*state is required')
  } else
    stateErr_msg.textContent = "";

  if (!inputCity.value) {
    setError(cityErr_msg, '*City is required')
  } else
    cityErr_msg.textContent = "";

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
      console.log("country: ",data);
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
      console.log("state: ",data)
      selectState.innerHTML = '<option value="">Select State</option>';

      if (!data.length) {
        console.log("no states available");
      }

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
}

//using API
function getCities_API(countryCode, stateCode) {

  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, { headers: { "X-CSCAPI-KEY": api_key } })
    .then(res => res.json())
    .then((data) => {
      console.log("city: ",data)
      selectCity.innerHTML = '<option value="">Select City</option>';
      // console.log("data for cities: ", data);
      // console.log("data.length for cities: ", data.length);

      if (!data.length) {
        console.log("no cities available")
      }

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

//get the data from the local storage and append it into the form
async function getData() {

  let formData = JSON.parse(localStorage.getItem("formData"));
  console.log("🚀 ~ getData ~ formData:", formData)

  if (formData) {
    firstName.value = formData.FirstName;
    lastName.value = formData.LastName;
    userEmail.value = formData.Email;
    ph_Number.value = formData.ContactNo;
    dateOfBirth.value = formData.Date_Of_Birth;
    studentId.value = formData.StudentId;
    gender.value = formData.Gender;
    parentName.value = formData.ParentName;
    parentRel.value = formData.ParentRel;
    parent_contactNo.value = formData.ParentContactNo;
    parent_email.value = formData.ParentEmail;
    streetAddress.value = formData.Address;
    inputCountry.value = formData.Country;    //Not append?
    inputState.value = formData.State;
    inputCity.value = formData.City;
  }

  // const urlParams = new URLSearchParams(window.location.search);
  // const greetingValue = urlParams.get('formData');
  // console.log(JSON.parse(greetingValue));      //not a good approach to store the data in params
}

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

if (type == 4) {
  getData();
}

// console.log("navigation type: ", window.performance.navigation.type)
