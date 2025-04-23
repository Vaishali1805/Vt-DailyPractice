async function handlelogin(event) {
    event.preventDefault();
    let loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    console.log("loginData: ", loginData);
    try {
        const url = 'http://localhost:5000/auth/login/user';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
        const data = await response.json();
        if(data.success) {
            createToast(data.message,'fa-circle-check');
            setTimeout(() => {
                removeToast();
                window.location.href = '../components/welcome/welcome.html';
            }, 5000);
        }
        else{
            createToast(data.message,'fa-circle-xmark');
            setTimeout(() => removeToast(),5000);
        }
    } catch (error) {
        console.log("error: ", error)
    }
}