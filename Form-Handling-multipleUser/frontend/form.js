// Get form input elements from the DOM
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const nameError_msg = document.getElementById("nameError");

// Profile picture upload elements
const inputProfile = document.getElementById("inputProfile");
const inputProfileBtn = document.getElementById("inputProfileBtn");
const preview = document.getElementById("preview");
const profileError_msg = document.getElementById("profileError");

// Other form fields and their error messages
const email = document.getElementById("inputEmail");
const emailError_msg = document.getElementById("emailError");
const contactNo = document.getElementById("contactNo");
const contactNoError_msg = document.getElementById("contactNoError");
const dateOfBirth = document.getElementById("dateOfBirth");
const dobError_msg = document.getElementById("dobError");
const studentId = document.getElementById("studentId");
const studentIdError_msg = document.getElementById("studentId_error");
const radios = document.querySelectorAll('input[name="gender"]');
const genderError_msg = document.getElementById("genderError");
const address = document.getElementById("address");
const addressError_msg = document.getElementById("addressError");
const countryError_msg = document.getElementById("countryError");

// Country, state, and city selection elements
const selectCountry = document.getElementById("inputCountry");
const selectState = document.getElementById("inputState");
const selectCity = document.getElementById("inputCity");
const api_key = "TUNvRDM2cXJkWkZ1cURYODlqWWJQc2lXb0YzNDZPUWtpY2JsOERieg==";

const submitBtn = document.getElementById("submitBtn");
const terms_Condn_check = document.getElementById("terms_Condn_check");
let countryId;
let selectedGender;
let lastValidFile = null;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("studentId");

id ? getData(id) : document.addEventListener("DOMContentLoaded", getAllCountries);

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    radio.checked ? selectedGender = radio.value : "";
  });
});

!terms_Condn_check.checked ? submitBtn.disabled = true : submitBtn.disabled = false;
terms_Condn_check.addEventListener("change", function () {
  submitBtn.disabled = this.checked ? false : true;
});

email.addEventListener('keypress', validateEmail);
contactNo.addEventListener('keypress', validateContactNo);

function validateEmail() {
  const EmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailError_msg.textContent = !EmailRegex.test(email.value) ? "*Invalid Email Address" : "";
}

function validateContactNo() {
  const PhoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  contactNoError_msg.textContent = !PhoneRegex.test(contactNo.value) ? "*Invalid contact number" : "";
}

// Handle form submission
submitBtn.addEventListener("click", (e) => {
  id ? handleEditForm(e) : handleSubmit(e);
});

//Function to submit the form
async function handleSubmit(event) {
  try {
    event.preventDefault();
    // Validate form before proceeding
    if (!validate_form()) {
      return;
    }
    const formDataObj = create_FormDataObj();

    // Handle Profile Picture
    const formData = new FormData();
    const file = inputProfile.files[0];
    const fileToUpload = file ? file : null; // Set to null if no file
    if (fileToUpload) {
      const safeName = fileToUpload.name.replace(/\s+/g, '_');
      formData.append("profile", fileToUpload, `${Date.now()}_${safeName}`);
    } else
      formData.append("profile", "defaultImage.webp"); // Send the image path as a string
    formData.append("formData", JSON.stringify(formDataObj));

    // submit the student data
    const url = "http://localhost:5000/user/submit/formData";
    const result = await fetchReq(url,"POST",formData);
    result && (window.location.href = "/table.html");
  } catch (error) {
    console.log("Error: ", error);
  }
}

//Function to edit the form
async function handleEditForm(event) {
  try {
    event.preventDefault();
    // Validate form before proceeding
    if (!validate_form()) {
      return;
    }
    const formDataObj = create_FormDataObj();

    // Handle Profile Picture
    const formData = new FormData();
    const file = inputProfile.files[0];
    if (file) {
      const safeName = file.name.replace(/\s+/g, '_');
      formData.append("profile", file, `${Date.now()}_${safeName}`);
    }
    formData.append("formData", JSON.stringify(formDataObj));

    //submit the edited data
    const url = "http://localhost:5000/user/edit/formData";
    const result = await fetchReq(url,"POST",formData)
    result && (window.location.href = "/table.html");                                                     
  } catch (error) {
    console.log("Error: ", error);
  }
}

function create_FormDataObj() {
  const formDataObj = {
    firstName: firstName.value || null,
    lastName: lastName.value || null,
    email: email.value || null,
    contactNo: contactNo.value || null,
    dateOfBirth: dateOfBirth.value || null,
    studentId: studentId.value || null,
    gender: selectedGender || null,
    address: address.value || null,
    country: selectCountry && selectCountry.value ? selectCountry.value : null,
    state: selectState && selectState.value ? selectState.value : null,
    city: selectCity && selectCity.value ? selectCity.value : null,
  };
  return formDataObj;
}

function validate_form() {
  const EmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PhoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  let flag = true;

  function setError(element, message) {
    element.textContent = message;
    flag = false;
  }
  // Validate first name
  if (firstName.value.trim() == "") {
    setError(nameError_msg, "*First name is required");
  } else if (firstName.value.length < 2 || firstName.value.length > 30) {
    setError(nameError_msg, "*First name must be between 2 and 30 characters");
  } else {
    nameError_msg.textContent = ""; // Clear error if valid
  }
  // Validate email format
  if (email.value.trim() == "") {
    setError(emailError_msg, "*Email is required");
  } else if (!EmailRegex.test(email.value)) {
    setError(emailError_msg, '*Invalid email address');
  } else {
    emailError_msg.textContent = "";
  }
  // Validate phone number
  if (!contactNo.value.trim()) {
    setError(contactNoError_msg, "*Contact number is required");
  } else if (!PhoneRegex.test(contactNo.value)) {
    setError(contactNoError_msg, '*Invalid contact number');
  } else {
    contactNoError_msg.textContent = "";
  }
  //Validate Date of Birth
  if (!dateOfBirth.value || isNaN(Date.parse(dateOfBirth.value))) {
    setError(dobError_msg, "*Invalid date of birth");
  } else {
    const dobDate = new Date(dateOfBirth.value);
    const today = new Date();
    if(dobDate > today) {
      setError(dobError_msg,"Date of birth cannot be in the future");
    } else {
      dobError_msg.textContent = "";
    }
  }
  //Validate StudentId
  if (!studentId.value.trim()) {
    setError(studentIdError_msg, "*Student ID is required");
  } else {
    studentIdError_msg.textContent = "";
  }
  //Validate gender
  const selectedRadio = document.querySelector('input[name="gender"]:checked');
  if (!selectedRadio) {
    setError(genderError_msg, "*Gender is required");
  } else {
    genderError_msg.textContent = "";
  }
  // Validate country
  if (!selectCountry.value) {
    setError(countryError_msg, "*Country is required");
  } else countryError_msg.textContent = "";

  return flag;
}

// Profile picture upload event
inputProfileBtn.addEventListener("click",(e) => {
    if (inputProfile) {
      inputProfile.click();
    }
    e.preventDefault();
  },
  false //prevent navigation to "#"
);

inputProfile.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
  const file = event.target.files[0];
  console.log("file: ", file);

  // Validate selected file before displaying preview
  if (!validateFile(file)) {
    inputProfile.value = ""; // clear the input if file is invalid
    preview.innerHTML = "";
    lastValidFile = null;
    return;
  }
  preview.innerHTML = `<div class="fileContainer"><img src=${URL.createObjectURL(file)} class="setImg"></img></div>`;
}

function validateFile(file) {
  if (!file) {
    return false;
  }

  const validTypes = ["image/jpeg", "image/png", "image/jpg"];

  const maxSize = 5 * 1024 * 1024; //5MB
  if (!validTypes.includes(file.type)) {
    profileError_msg.textContent =
      "Invalid file type. Please select an image (JPG, JPEG, PNG)";
    return false;
  } else {
    profileError_msg.textContent = "";
  }

  if (file.size > maxSize) {
    profileError_msg.textContent =
      "File size exceeds 5MB. Please select a smaller image";
    return false;
  } else {
    profileError_msg.textContent = "";
  }
  return true;
}

// Fetch and populate country, state, and city dropdowns
selectCountry.addEventListener("change", function () {
  countryId = this.value;
  selectState.innerHTML = '<option value="">Select State</option>';
  selectCity.innerHTML = '<option value="">Select City</option>';
  getAllStates(countryId);
});
selectState.addEventListener("change", function () {
  const stateId = this.value;
  selectCity.innerHTML = '<option value="">Select City</option>';
  getAllCities(countryId, stateId);
});

async function getAllCountries() {
  try {
    const url = "http://localhost:5000/user/get/countries";
    let { countries } = await fetchReq(url,"GET");
    console.log("🚀 ~ getAllCountries ~ countries:", countries)
    await createOptions(countries, selectCountry, 'countries');
    return true;

  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getAllStates(countryId) {
  try {
    const url = `http://localhost:5000/user/get/states?countryId=${countryId}`;
    const { states } = await fetchReq(url,"GET");
    await createOptions(states, selectState, 'states');
    return true;

  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getAllCities(countryId, stateId) {
  try {
    const url = `http://localhost:5000/user/get/cities?countryId=${countryId}&stateId=${stateId}`;
    const { cities } = await fetchReq(url,"GET");
    await createOptions(cities, selectCity, 'cities');
    return true;

  } catch (error) {
    console.log("Error: ", error);
  }
}

async function fetchReq(url, reqMethod, formData=null) {
  try {
    const options = {
      method: reqMethod,
    };
    // Only add body if method is not GET
    if (reqMethod.toUpperCase() !== "GET" && formData) {
      options.body = formData;
    }
    const response = await fetch(url,options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      if(reqMethod.toUpperCase() !== "GET")
        return true;
      else
        return data;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function createOptions(data, element, name) {
  element.innerHTML = !data.length ? `<option value="">No ${name} available</option>` : `<option value="">Select ${name}</option>`; //Default option
  data.map((elem) => {
    element.innerHTML += `<option value=${elem.id}> ${elem.name} </option>`
  });
}

function appendData(data) {
  try {
    firstName.value = data[0]?.firstName || "";
    lastName.value = data[0]?.lastName || "";
    email.value = data[0]?.email || "";
    contactNo.value = data[0]?.contactNo || "";
    dateOfBirth.value = data[0]?.dateOfBirth || "";
    studentId.value = data[0]?.studentId || "";
    address.value = data[0]?.address || "";

    // const genderRadios = document.querySelectorAll('input[name="gender"]');
    radios.forEach((radio) => {
      if (radio.value === data[0]?.gender) {
        selectedGender = radio.value;
        radio.checked = true;
      }
    });

    // Handle Profile Image Preview
    preview.innerHTML = ""; //to remove the old preview
    const fileContainer = document.createElement("div");
    fileContainer.classList.add("fileContainer");
    const profileImg = document.createElement('img');
    if (data[0]?.profile) {
      const fileUrl = data[0].profile && data[0].profile.path
        ? `http://localhost:5000/${data[0]?.profile.path}`
        : `http://localhost:5000/uploads/${data[0]?.profile}`;
      profileImg.src = fileUrl;
      profileImg.classList.add('setImg');
    }
    fileContainer.appendChild(profileImg);
    preview.appendChild(fileContainer);

    const selectedCountryId = data[0]?.country || "";
    const selectedStateID = data[0]?.state || "";
    const selectedCityId = data[0]?.city || "";

    selectOption(selectCountry, selectedCountryId);
    selectOption(selectState, selectedStateID);
    selectOption(selectCity, selectedCityId);
  } catch (error) { 
    console.error("Error: ", error);
  }
}

async function selectOption(element, selectedId) {
  const optionArr = Array.from(element.options);
  for (let i = 1; i < optionArr.length; i++) {
    if (optionArr[i].value === selectedId) {
      optionArr[i].selected = true;
      break;
    }
  }
}

async function getData(id) {
  const url = `http://localhost:5000/user/get/dataById?studentId=${id}`;
  // const response = await fetch(url, {
  //   method: "GET",
  // });
  // if (!response.ok) {
  //   throw new Error(`Response status: ${response.status}`);
  // }
  // const data = await response.json();
  const data = await fetchReq(url,"GET");
  if (data.success) {
    const { studentData } = data;
    console.log("studentData: ", studentData);
    const selectedCountryId = studentData[0].country;
    const selectedStateID = studentData[0].state;
    Promise.all([getAllCountries(), getAllStates(selectedCountryId), getAllCities(selectedCountryId, selectedStateID)]).then(() => {
      appendData(studentData);
    }).catch((err) => {
      console.log("Error: ", err);
    });
  }
}