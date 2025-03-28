//Get elements from HTML file
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const nameError_msg = document.getElementById('nameError');

//for profile
const inputProfile = document.getElementById('inputProfile');
const inputProfileBtn = document.getElementById('inputProfileBtn');
const preview = document.getElementById('preview');
const profileError_msg = document.getElementById('profileError');

const inputEmail = document.getElementById('inputEmail');
const emailError_msg = document.getElementById('emailError');

const contactNo = document.getElementById('contactNo');
const contactNoError_msg = document.getElementById('contactNoError');

const dateOfBirth = document.getElementById('dateOfBirth');
const dobError_msg = document.getElementById('dobError');

const studentId = document.getElementById('studentId');
const studentIdError_msg = document.getElementById('studentId_error');

const selectGender = document.getElementById('selectGender');
const genderError_msg = document.getElementById('genderError');

const parentName = document.getElementById('parentName');
const parentNameError_msg = document.getElementById('parentNameError');
const parentRelation = document.getElementById('parentRelation');
const parentRelError_msg = document.getElementById('parentRelError');
const parentContactNo = document.getElementById('parentContactNo');
const parentContactNoError_msg = document.getElementById('parentContactNoError');
const parentEmail = document.getElementById('parentEmail');
const parentEmailError_msg = document.getElementById('parentEmailError');

const address = document.getElementById('address');
const addressError_msg = document.getElementById('addressError');
const countryError_msg = document.getElementById('countryError');

//for country,state,city
const selectCountry = document.getElementById('inputCountry');
const selectState = document.getElementById('inputState');
const selectCity = document.getElementById('inputCity');
const api_key = 'TUNvRDM2cXJkWkZ1cURYODlqWWJQc2lXb0YzNDZPUWtpY2JsOERieg==';
let countryCode;

//submit Button 
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', (e) => {
    handleSubmit(e);
});

function handleSubmit(event) {
    try {
        event.preventDefault();

        if (!validate_form()) {
            return;
        }

    } catch (error) {
        console.log("Error: ", error);
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

    //Name validation
    if (firstName.value.trim() == "") {
        setError(nameError_msg, '*First name is required');
    } else if (firstName.value.length < 2 || firstName.value.length > 30) {
        setError(nameError_msg, '*First name must be between 2 and 30 characters');
    } else {
        nameError_msg.textContent = "";         // Clear error if valid
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
    if (!contactNo.value.trim()) {
        setError(contactNoError_msg, '*Contact number is required');
    } else if (!ph_Pattern.test(contactNo.value)) {
        setError(contactNoError_msg, '*Invalid contact number');
    } else {
        contactNoError_msg.textContent = "";
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

    // Parent/Guardian Name Validation
    if (!parentName.value.trim()) {
        setError(parentNameError_msg, '*Parent/Guardian name is required');
    } else if (parentName.value.length < 2 || parentName.value.length > 30) {
        setError(parentNameError_msg, '*Parent Name must be between 2 and 30 characters');
    } else {
        parentNameError_msg.textContent = "";
    }

    // Parent/Guardian contact no. Validation
    if (!parentContactNo.value.trim()) {
        setError(parentContactNoError_msg, '*Contact number is required');
    } else if (!ph_Pattern.test(parentContactNo.value)) {
        setError(parentContactNoError_msg, '*Invalid contact number');
    } else {
        parentContactNoError_msg.textContent = "";
    }

    //country validation
    if (!selectCountry.value) {
        setError(countryError_msg, '*Country is required')
    } else
        countryError_msg.textContent = "";

    return flag;
}

//Profile section
inputProfileBtn.addEventListener('click', (e) => {
    if (inputProfile) {
        inputProfile.click();
    }
    e.preventDefault();
}, false                 //prevent navigation to "#"
)

inputProfile.addEventListener('change', handleFileSelection);

function handleFileSelection(event) {
    const file = event.target.files[0];
    console.log("file: ", file);

    if (!validateFile(file)) {
        inputProfile.value = "";   // clear the input if file is invalid
        preview.innerHTML = "";
        return;
    }

    preview.innerHTML = "";     //to remove the old preview
    const fileContainer = document.createElement('div');
    fileContainer.classList.add('fileContainer');
    const img = document.createElement("img");
    img.classList.add("setImg");
    img.src = URL.createObjectURL(file);
    fileContainer.appendChild(img);
    preview.appendChild(fileContainer);
}

function validateFile(file) {
    if (!file) {
        profileError_msg.textContent = 'Please select a file';
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
        return false;
    }

    if (file.size > maxSize) {
        profileError_msg.textContent = "File size exceeds 5MB. Please select a smaller image";
        return false;
    }

    return true;
}

//Get country,states and API section
document.addEventListener("DOMContentLoaded", getAllCountries);
selectCountry.addEventListener('change', function () {
    const obj = JSON.parse(this.value);
    countryCode = obj.code;
    getAllStates(countryCode);
})
selectState.addEventListener("change", function () {
    const obj = JSON.parse(this.value);
    const stateCode = obj.code;
    getAllCities(stateCode);
})

async function getAllCountries() {
    try {
        const url = 'https://api.countrystatecity.in/v1/countries';
        const response = await fetch(url, {
            headers: { "X-CSCAPI-KEY": api_key }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const countries = await response.json();
        console.log(countries);
        selectCountry.innerHTML = '<option value="">Select Country</option>'; // Default option
        countries.map((country) => {
            let option = document.createElement("option");
            const obj = { code: country.iso2, name: country.name };
            option.value = JSON.stringify(obj);
            option.textContent = country.name;      // Country name as text
            selectCountry.appendChild(option);
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function getAllStates(countryCode) {
    try {
        const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/states`;
        const response = await fetch(url, {
            headers: { "X-CSCAPI-KEY": api_key }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const state = await response.json();
        if (!state.length) {
            console.log("No states Available");
            return;
        }

        state.map((state) => {
            let option = document.createElement("option");
            const obj = { code: state.iso2, name: state.name };
            option.value = JSON.stringify(obj);
            option.textContent = state.name;      // state name as text
            selectState.appendChild(option);
        })
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function getAllCities(stateCode) {
    try {
        const url = `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`;
        const response = await fetch(url, {
            headers: { "X-CSCAPI-KEY": api_key }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const city = await response.json();
        if (!city.length) {
            console.log("No cities Available");
            return;
        }

        city.map((state) => {
            let option = document.createElement("option");
            const obj = { code: city.iso2, name: city.name };
            option.value = JSON.stringify(obj);
            option.textContent = state.name;      // city name as text
            selectCity.appendChild(option);
        })
    } catch (error) {
        console.log("Error: ", err);
    }
}
