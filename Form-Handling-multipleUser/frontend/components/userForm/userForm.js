const fields = ['Name', 'email', 'role'];
fields.forEach(field => {
    field = document.getElementById(field);
})
const urlParams = new URLSearchParams(window.location.search);

function fillForm() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    Name.value = userData.name;
    email.value = userData.email;
    role.value = userData.role;
}

function backToUserList() {
    window.location.href = '../userList/userList.html';
}

function submitData() {
    const userId = urlParams.get('id');
    const userData = {
        id: userId,
        name: Name.value,
        email: (email.value).toLowerCase(),
        role: role.value,
    }
    const url = 'http://localhost:5000/auth/edit/userData';
    const data = fetchReq(url, "POST", JSON.stringify(userData));
    if (data.success) {
        console.log(data.message);
        console.log("userData: ",data.userData);
    }
    else{
        document.querySelector('.emailErr_msg').textContent = data.message;
    }
}


fillForm();