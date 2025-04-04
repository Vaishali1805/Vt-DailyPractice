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

// const parentName = document.getElementById('parentName');
// const parentNameError_msg = document.getElementById('parentNameError');
// const parentRelation = document.getElementById('parentRelation');
// const parentRelError_msg = document.getElementById('parentRelError');
// const parentContactNo = document.getElementById('parentContactNo');
// const parentContactNoError_msg = document.getElementById('parentContactNoError');
// const parentEmail = document.getElementById('parentEmail');
// const parentEmailError_msg = document.getElementById('parentEmailError');

const address = document.getElementById("address");
const addressError_msg = document.getElementById("addressError");
const countryError_msg = document.getElementById("countryError");

// Country, state, and city selection elements
const selectCountry = document.getElementById("inputCountry");
const selectState = document.getElementById("inputState");
const selectCity = document.getElementById("inputCity");
const api_key = "TUNvRDM2cXJkWkZ1cURYODlqWWJQc2lXb0YzNDZPUWtpY2JsOERieg==";
// let countryCode;
let countryId;
let countries;
let states;
let cities;

const terms_Condn_check = document.getElementById("terms_Condn_check");
let selectedGender;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("studentId");

if (id) {
  getStudentData();
}

// Form submission button
const submitBtn = document.getElementById("submitBtn");

const radios = document.querySelectorAll('input[name="gender"]');
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      selectedGender = radio.value;
    }
  });
});

if (!terms_Condn_check.checked) {
  submitBtn.disabled = true;
} else {
  submitBtn.disabled = false;
}

terms_Condn_check.addEventListener("change", function () {
  if (this.checked) {
    submitBtn.disabled = false;
  } else submitBtn.disabled = true;
});

// Handle form submission
submitBtn.addEventListener("click", (e) => {
  if(id){
    handleEditForm(e);
  }else
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
    console.log("formDataObj: ", formDataObj);

    // // Handle Profile Picture
    // const formData = new FormData();
    // const file = inputProfile.files[0];
    // const defaultImage = 'default_userImage.webp';

    // const fileToUpload = file ? file : new File([], defaultImage);
    // console.log("fileToUpload: ", fileToUpload);
    // formData.append("profile", fileToUpload, `${Date.now()}_${fileToUpload.name}`);
    // formData.append("formData", JSON.stringify(formDataObj));

    // Handle Profile Picture
    const formData = new FormData();
    const file = inputProfile.files[0];
    console.log("file: ", file);
    const defaultImage = "defaultImage.webp";
    const fileToUpload = file ? file : null; // Set to null if no file

    if (fileToUpload) {
      formData.append(
        "profile",
        fileToUpload,
        `${Date.now()}_${fileToUpload.name}`
      );
    } else {
      formData.append("profile", defaultImage); // Send the image path as a string
    }
    formData.append("formData", JSON.stringify(formDataObj));

    // submit the student data
    const url = "http://localhost:5000/submit/formData";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
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
    console.log("formDataObj: ",formDataObj);
    const formData = new FormData();
    const file = inputProfile.files[0];

    if(file){
      formData.append(
        "profile",
        file,
        `${Date.now()}_${file.name}`
      );
    }
    formData.append("formData", JSON.stringify(formDataObj));

    //submit the edited data
    const url = "http://localhost:5000/edit/formData";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("🚀 ~ handleEditForm ~ data:", data);
    if (data.success) {
      window.location.href = "/table.html";
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

function create_FormDataObj(){
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
    // country:
    //   selectCountry && selectCountry.value
    //     ? JSON.parse(selectCountry.value)
    //     : null,
    // state:
    //   selectState && selectState.value
    //     ? JSON.parse(selectState.value)
    //     : null,
    // city:
    //   selectCity && selectCity.value
    //     ? JSON.parse(selectCity.value)
    //     : null,
  };
  return formDataObj;
}

function validate_form() {
  const EmailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ph_Pattern =
    /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
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
  if (inputEmail.value.trim() == "") {
    setError(emailError_msg, "*Email is required");
  } else if (!EmailPattern.test(inputEmail.value)) {
    setError(emailError_msg, "*Invalid email address");
  } else {
    emailError_msg.textContent = "";
  }

  // Validate phone number
  if (!contactNo.value.trim()) {
    setError(contactNoError_msg, "*Contact number is required");
  } else if (!ph_Pattern.test(contactNo.value)) {
    setError(contactNoError_msg, "*Invalid contact number");
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

  // // Validate Parent/Guardian Name
  // if (!parentName.value.trim()) {
  //     setError(parentNameError_msg, '*Parent/Guardian name is required');
  // } else if (parentName.value.length < 2 || parentName.value.length > 30) {
  //     setError(parentNameError_msg, '*Parent Name must be between 2 and 30 characters');
  // } else {
  //     parentNameError_msg.textContent = "";
  // }

  // // Validate Parent/Guardian contact no.
  // if (!parentContactNo.value.trim()) {
  //     setError(parentContactNoError_msg, '*Contact number is required');
  // } else if (!ph_Pattern.test(parentContactNo.value)) {
  //     setError(parentContactNoError_msg, '*Invalid contact number');
  // } else {
  //     parentContactNoError_msg.textContent = "";
  // }

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
  console.log("file: ", file);

  // Validate selected file before displaying preview
  if (!validateFile(file)) {
    inputProfile.value = ""; // clear the input if file is invalid
    preview.innerHTML = "";
    return;
  }

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
    profileError_msg.textContent = "Please select a file";
    return false;
  }

  const validTypes = ["image/jpeg", "image/png", "image/jpg"];

  const maxSize = 5 * 1024 * 1024; //5MB
  if (!validTypes.includes(file.type)) {
    profileError_msg.textContent =
      "Invalid file type. Please select an image (JPG, JPEG, PNG)";
    return false;
  }

  if (file.size > maxSize) {
    profileError_msg.textContent =
      "File size exceeds 5MB. Please select a smaller image";
    return false;
  }

  return true;
}

// Fetch and populate country, state, and city dropdowns
document.addEventListener("DOMContentLoaded", getAllCountries);
selectCountry.addEventListener("change", function () {
  // const obj = JSON.parse(this.value);
  // countryCode = obj.code;
  countryId = this.value;
  selectState.innerHTML = '<option value="">Select State</option>';
  selectCity.innerHTML = '<option value="">Select City</option>';
  getAllStates(countryId);
});
selectState.addEventListener("change", function () {
  // const obj = JSON.parse(this.value);
  // const stateCode = obj.code;
  const stateId = this.value;
  selectCity.innerHTML = '<option value="">Select City</option>';
  getAllCities(stateId);
});

async function getAllCountries() {
  try {
    // const url = "https://api.countrystatecity.in/v1/countries";
    // const response = await fetch(url, {
    //   headers: { "X-CSCAPI-KEY": api_key },
    // });
    const url = "http://localhost:5000/get/countries";
    const response = await fetch(url, {
      method: "get",
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    countries = await response.json();
    // console.log(countries);
    if (!countries.length) {
      console.error("No countries available.");
      selectCountry.innerHTML =
        '<option value="">No countries available</option>';
      selectCountry.disabled = true;
      return;
    }
    selectCountry.innerHTML = '<option value="">Select Country</option>'; //Default option
    countries.map((country) => {
      let option = document.createElement("option");
      // const obj = { code: country.iso2, name: country.name };
      // option.value = JSON.stringify(obj);
      option.value = country.id;
      option.textContent = country.name; // Country name as text
      selectCountry.appendChild(option);
    });
    selectCountry.disabled = false;
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getAllStates(countryId) {
  try {
    // const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/states`;
    // const response = await fetch(url, {
    //   headers: { "X-CSCAPI-KEY": api_key },
    // });
    const url = `http://localhost:5000/get/states?countryId=${countryId}`;  
    const response = await fetch(url, {
      method: "get",
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    states = await response.json();
    // console.log("states:", states);
    if (!states.length) {
      console.warn("No states available for this country.");
      selectState.innerHTML = '<option value="">No states available</option>';
      selectState.disabled = true; // Disable dropdown
      return;
    }
    selectState.disabled = false;
    selectState.innerHTML = '<option value="">Select State</option>'; //Default option
    states.map((state) => {
      let option = document.createElement("option");
      // const obj = { code: state.iso2, name: state.name };
      // option.value = JSON.stringify(obj);
      option.value = state.id;
      option.textContent = state.name; // state name as text
      selectState.appendChild(option);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getAllCities(stateId) {
  try {
    // const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`;
    // const response = await fetch(url, {
    //   headers: { "X-CSCAPI-KEY": api_key },
    // });
    const url = `http://localhost:5000/get/cities?countryId=${countryId}&stateId=${stateId}`;
    const response = await fetch(url, {
      method: "get",
    })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    cities = await response.json();
    // console.log("cities:", cities);
    if (!cities.length) {
      console.warn("No cities available for this state.");
      selectCity.innerHTML = '<option value="">No cities available</option>';
      selectCity.disabled = true; // Disable dropdown
      return;
    }

    selectCity.disabled = false;
    selectCity.innerHTML = '<option value="">Select city</option>'; //Default option
    cities.map((city) => {
      let option = document.createElement("option");
      // const obj = { code: city.iso2, name: city.name };
      // option.value = JSON.stringify(obj);
      option.value = city.id;
      option.textContent = city.name; // city name as text
      selectCity.appendChild(option);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

function getStudentData() {
  try {
    const data = JSON.parse(localStorage.getItem("studentData"));
    console.log("data: ", data);

    if (data) {
      firstName.value = data[0]?.firstName || "";
      lastName.value = data[0]?.lastName || "";
      email.value = data[0]?.email || "";
      contactNo.value = data[0]?.contactNo || "";
      dateOfBirth.value = data[0]?.dateOfBirth || "";
      studentId.value = data[0]?.studentId || "";
      address.value = data[0]?.address || "";

      const genderRadios = document.querySelectorAll('input[name="gender"]');
      genderRadios.forEach((radio) => {
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
      console.log("selectedCountryId:", selectedCountryId)
      const selectedStateID = data[0]?.state || "";
      console.log("selectedStateID:", selectedStateID)
      const selectedCityId = data[0]?.city || "";
      console.log("selectedCityId:", selectedCityId)
      
      console.log("selectCountry: ", selectCountry);
      const options = Array.from(selectCountry.options);
      console.log("options:",options);

      const optionVal = options.map(option => option.value);
      console.log("optionVal:", optionVal)

      // for(let i=0; i<options.length; i++){
      //   console.log("option value: ",options[i].value);
      //   if(options[i].value === selectedCountryId)
      //     options[i].selected = true;
      //   break;
      // }

    }
  } catch (error) {
    console.error("Error: ", error);
  }
}