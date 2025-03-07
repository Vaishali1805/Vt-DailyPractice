const fileSelectBtn = document.getElementById("fileSelect");
const form = document.getElementById("fileUploadForm");
const fileInput = document.getElementById("fileElem");
const submitBtn = document.getElementById("submitBtn");
const preview = document.getElementById("preview");

const data = new FormData(form);

fileSelectBtn.addEventListener(
    "click",
    (e) => {
        if (fileInput) {
            fileInput.click();
        }
        e.preventDefault();         //prevent navigation to "#"
    },
    false,
);

fileInput.addEventListener("change", handleFileSelection);
form.addEventListener("submit", handleSubmit);

// submitBtn.addEventListener("click",(e) => {
//     console.log("am in submitBtn");
//     e.preventDefault();
//     handleSubmit(e); 
// })

function handleFileSelection(event) {
    const file = event.target.files[0];
    console.log("files: ", file);

    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']

        if (!validTypes.includes(file.type)) {
            alert("Invalid file type. Please select an image (JPG, JPEG, PNG, PDF).");
            return;
        }

        const maxSize = 5 * 1024 * 1024;        //5MB
        if (file.size > maxSize) {
            alert("File size exceeds 5MB. Please select a smaller image.")
            return;
        }

        if (file.type.startsWith("image")) {
            const img = document.createElement("img");
            img.classList.add("setImg")
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        }

        if (file.type == 'application/pdf') {
            const iFrame = document.createElement("iframe");
            iFrame.classList.add("pdfPreview")
            iFrame.src = URL.createObjectURL(file);
            preview.appendChild(iFrame);
        }
    }
}

function handleSubmit(event) {
    console.log("Am in handleSubmit")
    debugger
    event.preventDefault();
    const file = fileInput.files[0];
    
    const formData = new FormData();
    formData.append('file', file, file.name);   //Here browser will automatically set the content-type
    console.log("formData: ", formData)

    if (fileInput.files.length == 0) {        //If format is not correct then it dont work properly
        alert("Please select any File");
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        console.log("xhttp.status: ", xhttp.status);
        if (xhttp.status === 200) {
            console.log("Successfully uploaded");
            console.log("response:", this.responseText);
        }
        else
            console.log("Error in uploading!! Please Try Again")
    }
    xhttp.open("POST", "http://localhost:3500/singleUpload", true);
    xhttp.send(formData);
}

// const files = document.getElementById("files");
// const formData = new FormData();
// formData.append("name", name.value);
// for (let i = 0; i < files.files.length; i++) {
//     formData.append("files", files.files[i]);
// }