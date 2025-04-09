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

if (id) {
  getData(id);
} else {
  document.addEventListener("DOMContentLoaded", getAllCountries);
}

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      selectedGender = radio.value;
    }
  });
});

// if (!terms_Condn_check.checked) {
//   submitBtn.disabled = true;
// } else {
//   submitBtn.disabled = false;
// }
submitBtn.disabled = !terms_Condn_check.checked;

terms_Condn_check.addEventListener("change", function () {
  submitBtn.disabled = !terms_Condn_check.checked;
  // if (this.checked) {
  //   submitBtn.disabled = false;
  // } else submitBtn.disabled = true;
});

email.addEventListener('keypress', validateEmail);
contactNo.addEventListener('keypress', validateContactNo);

function validateEmail() {
  const EMAIL_REGEX =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(email.value))
    emailError_msg.textContent = "*Invalid Email Address";
  else
    emailError_msg.textContent = "";
}

function validateContactNo() {
  const PHONE_REGEX = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  if (!PHONE_REGEX.test(contactNo.value))
    contactNoError_msg.textContent = "*Invalid contact number";
  else
    contactNoError_msg.textContent = "";
}

// Handle form submission
submitBtn.addEventListener("click", (e) => {
  if (id) {
    handleEditForm(e);
  } else
    handleSubmit(e);
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
    const defaultImage = "defaultImage.webp";
    const fileToUpload = file ? file : null; // Set to null if no file

    if (fileToUpload) {
      const originalname = fileToUpload.name;
      const safeName = originalname.replace(/\s+/g, '_');
      formData.append("profile", fileToUpload, `${Date.now()}_${safeName}`);
    } else
      formData.append("profile", defaultImage); // Send the image path as a string
    formData.append("formData", JSON.stringify(formDataObj));

    // submit the student data
    const url = "http://localhost:5000/user/submit/formData";
    const result = await postFetchReq(url,formData)
    if(result){
      window.location.href = "/table.html";
    }
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
    const formData = new FormData();
    const file = inputProfile.files[0];

    if (file) {
      const originalname = file.name;
      const safeName = originalname.replace(/\s+/g, '_');
      formData.append("profile",file,`${Date.now()}_${safeName}`);
    }
    formData.append("formData", JSON.stringify(formDataObj));

    //submit the edited data
    const url = "http://localhost:5000/user/edit/formData";
    const result = await postFetchReq(url,formData)
    if(result){
      window.location.href = "/table.html";
    }
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
  } else {
    emailError_msg.textContent = "";
  }

  // Validate phone number
  if (!contactNo.value.trim()) {
    setError(contactNoError_msg, "*Contact number is required");
  } else {
    contactNoError_msg.textContent = "";
  }

  //Validate Date of Birth
  if (!dateOfBirth.value || isNaN(Date.parse(dateOfBirth.value))) {
    setError(dobError_msg, "*Invalid date of birth");
  } else {
    dobError_msg.textContent = "";
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
inputProfileBtn.addEventListener(
  "click",
  (e) => {
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
  console.log("file: ",file);

  if (!file) {
    // User canceled the dialog, keep showing last preview
    return;
  }

  // Validate selected file before displaying preview
  if (!validateFile(file)) {
    inputProfile.value = ""; // clear the input if file is invalid
    preview.innerHTML = "";
    lastValidFile = null;
    return;
  }
  
  lastValidFile = file;
  preview.innerHTML = ""; //to remove the old preview

  const fileContainer = document.createElement("div");
  fileContainer.classList.add("fileContainer");
  const img = document.createElement("img");
  img.classList.add("setImg");
  img.src = URL.createObjectURL(file);
  fileContainer.appendChild(img);
  preview.appendChild(fileContainer);
}

function validateFile(file) {
  if (!file) {
    // profileError_msg.textContent = "Please select a file";
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
    let { countries } = await getFetchReq(url);
    const result = await createOptions(countries, selectCountry, 'countries');
    if(result) return true;
    else return;

  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getAllStates(countryId) {
  try {
    const url = `http://localhost:5000/user/get/states?countryId=${countryId}`;
    const { states } = await getFetchReq(url);
    const result = await createOptions(states, selectState, 'states');
    if(result) return true;
    else return;

  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getAllCities(countryId, stateId) {
  try {
    const url = `http://localhost:5000/user/get/cities?countryId=${countryId}&stateId=${stateId}`;
    const { cities } = await getFetchReq(url);
    const result = await createOptions(cities,selectCity,'cities');
    if(result) return true;
    else return;

  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getFetchReq(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let data = await response.json();
    if (data.success) {
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function postFetchReq(url,formData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      return true;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function createOptions(data, element, name) {
  if (!data.length) {
    console.error(`No ${name} available.`);
    element.innerHTML =
      `<option value="">No ${name} available</option>`;
    element.disabled = true;
    return false;
  }
  element.innerHTML = `<option value="">Select ${name}</option>`; //Default option
  data.map((elem) => {
    let option = document.createElement("option");
    option.value = elem.id;
    option.textContent = elem.name; // name as text
    element.appendChild(option);
  });
  element.disabled = false;
  return true;
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

    selectOption(selectCountry,selectedCountryId);
    selectOption(selectState,selectedStateID);
    selectOption(selectCity,selectedCityId);
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function selectOption(element,selectedId) {
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
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const data = await response.json();
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