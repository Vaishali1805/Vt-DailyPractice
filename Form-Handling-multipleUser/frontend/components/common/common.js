document.querySelectorAll('.form-outline .form-control').forEach((input) => {
    // Run on load
    if (input.value) {
        input.classList.add('active');
    }

    // Run on input change
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('active');
        } else {
            input.classList.remove('active');
        }
    });
});

function validate_Name(firstName,nameError_msg) {
    const name = firstName.value.trim();
    console.log("🚀 ~ validate_Name ~ name:", name)
    const error = name === "" ? "*First name is required" : (name.length < 2 || name.length > 30) ? "*First name must be between 2 and 30 characters" : "";
    error ? setError(nameError_msg, error) : nameError_msg.textContent = "";
}

function validate_Email(email, emailError_msg) {
    const EmailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const Email = email.value.trim();
    const error = Email === "" ? "*Email is required" : !EmailRegex.test(Email) ? '*Invalid email address' : "";
    error ? setError(emailError_msg, error) : emailError_msg.textContent = "";
}

function validate_Password(password,passwordErr_msg) {
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const Password = password.value.trim();
    const error = !PasswordRegex.test(Password) ? '*Invalid PassWord' : "";
    error ? setError(passwordErr_msg,error) : passwordErr_msg.textContent = "";
}

function setError(element, message) {
    element.textContent = message;
}