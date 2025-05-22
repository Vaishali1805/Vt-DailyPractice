function getDataById() {
    console.log("am here")
    const userId = localStorage.getItem("userId");
    console.log("userId: ",userId);
}

getDataById();