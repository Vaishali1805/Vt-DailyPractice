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

async function submitData() {
    const userId = urlParams.get('id');
    const userData = {
        id: userId,
        name: Name.value,
        email: (email.value).toLowerCase(),
        role: role.value,
    }
    const url = 'http://localhost:5000/auth/edit/userData';
    const data = await fetchReq(url, "POST", JSON.stringify(userData));
    console.log("data: ", data);
    if (data.success) {
        createToast(data.message, 'fa-circle-check', 'green');
        setTimeout(() => {
            removeToast();
            window.location.href = `../userList/userList.html`;
        }, 5000);
    }
    else {
        createToast(data.message, 'fa-circle-xmark', 'red');
        setTimeout(() => removeToast(), 5000);
    }
}

fillForm();