async function handlelogin(event) {
    event.preventDefault();
    let loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    try {
        const url = 'http://localhost:5000/auth/login/user';
        const data = await fetchReq(url,'POST', JSON.stringify(loginData));
        if(data.success) {
            createToast(data.message,'fa-circle-check','green');
            setTimeout(() => {
                removeToast();
                window.location.href = `../components/welcome/welcome.html?name=${data.name}`;
            }, 5000);
        }
        else{
            createToast(data.message,'fa-circle-xmark','red');
            setTimeout(() => removeToast(),5000);
        }
    } catch (error) {
        console.log("error: ", error)
    }
}