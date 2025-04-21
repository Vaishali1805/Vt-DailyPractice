const Name = document.getElementById('name');
const nameErr_msg = document.getElementById('nameErr_msg');
const email = document.getElementById('email');
const emailErr_msg = document.getElementById('emailErr_msg');
const password = document.getElementById('password');
const passwordErr_msg = document.getElementById('passwordErr_msg');
const img1 = document.getElementById('eye1');
const img2 = document.getElementById('eye2');
let active = false; 

Name.addEventListener('blur',() => validate_Name(Name,nameErr_msg));
email.addEventListener('input',() => validate_Email(email,emailErr_msg));
password.addEventListener('blur',() => validate_Password(password,passwordErr_msg));

// validate_Name(Name,nameErr_msg);
// function handleSubmit(e) {
//     e.preventDefault();
//     validate_Name(Name, nameErr_msg);
//     // if(!validateRegisterInfo()) {}
//     //send req. to backend
//     console.log("yess");
// }

// // function validateRegisterInfo() {

// // }

function handleEye1() {
    img1.src  = active ? '../assets/icons/eyeHide.svg' : '../assets/icons/eyeShow.svg';
    active = !active;
}
function handleEye2() {
    img2.src  = active ? '../assets/icons/eyeHide.svg' : '../assets/icons/eyeShow.svg';
    active = !active;
}