const fields = ['studentName', 'email', 'password', 'confirmPassword'];
const elements = {};
const EmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,15}$/;

fields.forEach(field => {
    elements[field] = document.getElementById(field);
    elements[`${field}Err_msg`] = document.getElementById(`${field}Err_msg`);
});

function validate_form() {
    const errors = {};
    const nameVal = elements.studentName.value.trim();
    const emailVal = elements.email.value.trim();
    const passwordVal = elements.password.value.trim();
    const confirmPasswordVal = elements.confirmPassword.value.trim();

    errors.studentName = !nameVal ? "*Name is required" : (nameVal.length < 2 || nameVal.length > 30) ? "*Name must be between 2 and 30 characters" : "";
    errors.email = !emailVal ? "*Email is required" : !EmailRegex.test(emailVal) ? '*Invalid email address' : "";
    errors.password = passwordVal.length < 6 ? 'Password must be at least 6 characters'
        : !PasswordRegex.test(passwordVal) ? 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@ . # $ ! % * ? &)' : '';
    errors.confirmPassword = !(confirmPasswordVal === passwordVal) ? "*Confirm password must match the password." : "";
    return errors;
}

fields.forEach(field => {
    const eventType = field === 'studentName' || field === 'confirmPassword' ? 'blur' : 'input';
    elements[field].addEventListener(eventType, () => handleFieldValidation(field));
});

function handleFieldValidation(field) {
    const errors = validate_form();
    display_error(elements[`${field}Err_msg`], errors[field]);
}

function display_error(element, error) {
    element.textContent = error;
}

async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate_form();
    fields.forEach(field => handleFieldValidation(field));
    const isValid = Object.values(errors).every(msg => msg === "");
    if (isValid) {
        let signUpData = {
            name: studentName.value,
            email: email.value,
            password: password.value
        }
        const url = 'http://localhost:5000/auth/register/user';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpData)
        });
        const data = await response.json();
        if (data.success) {
            createToast(data.message,'fa-circle-check','green');
            setTimeout(() => {
                removeToast();
                window.location.href = './login.html';
            }, 5000);
        } else {
            createToast(data.message,'fa-circle-xmark','red');
            setTimeout(() => removeToast(),5000);
        }
    } else {
        console.log("Form has errors:", errors);
    }
}

document.querySelectorAll('.show-hide-password').forEach(eyeIcon => {
    eyeIcon.addEventListener('click', () => {
        const inputId = eyeIcon.getAttribute('data-input');
        const input = document.getElementById(inputId);
        const isVisible = input.type === 'text';

        input.type = isVisible ? 'password' : 'text';
        eyeIcon.src = isVisible ? '../assets/icons/eyeHide.svg' : '../assets/icons/eyeShow.svg';
    });
});