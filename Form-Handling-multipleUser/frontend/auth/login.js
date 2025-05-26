async function handlelogin(event) {
    event.preventDefault();
    let loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    // baseUrl+routes.login
    // const routes={
    //     login:'/login/user'
    // }
    try {
        const url = 'http://localhost:5000/auth/login/user';
        const data = await fetchReq(url,'POST', JSON.stringify(loginData));
        if(data.success) {
            createToast(data.message,'fa-circle-check','green');
            setTimeout(() => {
                removeToast();
                localStorage.setItem("userId",JSON.stringify(data.id));
                localStorage.setItem("name",JSON.stringify(data.name));
                window.location.href = `../components/welcome/welcome.html`;
                // window.location.href = `../components/welcome/welcome.html?name=${data.name}&&id=${data.id}`;
            }, 1500);
        }
        else{
            createToast(data.message,'fa-circle-xmark','red');
            setTimeout(() => removeToast(),1500);
        }
    } catch (error) {
        console.log("error: ", error)
    }
}