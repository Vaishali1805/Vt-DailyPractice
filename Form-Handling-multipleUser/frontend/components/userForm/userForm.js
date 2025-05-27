formFields.forEach(field => {
    field = document.getElementById(field);
})

function fillForm() {
    const userData = getLocalStorageData("userData");
    firstName.value = userData.name;
    email.value = userData.email;
    role.value = userData.role;
}

function backToUserList() {
    redirectToPath('../userList/userList.html');
}

async function submitData() {
    const userData = {
        id: getParamsData('id'),
        name: firstName.value,
        email: (email.value).toLowerCase(),
        role: role.value,
    }
    const url = BASE_URL + routes.editData;
    const data = await fetchReq(url, "POST", JSON.stringify(userData));
    console.log("data: ", data);
    if (data.success) {
        createToast(data.message, 'fa-circle-check', 'green');
        runAfterDelay(() => {
            removeToast();
            redirectToPath(`../userList/userList.html`);
        }, 1500);
    }
    else {
        createToast(data.message, 'fa-circle-xmark', 'red');
        runAfterDelay(removeToast, 1500);
    }
}

fillForm();