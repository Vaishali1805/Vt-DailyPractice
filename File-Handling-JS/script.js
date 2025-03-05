const single_btn = document.getElementsByClassName("btn-single");
const multiple_btn = document.getElementsByClassName("btn-multiple");

single_btn.addEventListener("Click",handleSingleButton);
multiple_btn.addEventListener("Click",handleMultipleButton);

function handleSingleButton(){
    console.log("Single-btn-clicked")
}

function handleMultipleButton(){
    console.log("multiple-btn-clicked")
}
