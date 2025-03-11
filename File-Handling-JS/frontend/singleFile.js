const fileSelectBtn = document.getElementById("fileSelect");
const form = document.getElementById("fileUploadForm");
const fileInput = document.getElementById("fileElem");
// const submitBtn = document.getElementById("submitBtn");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progressBar");
const message = document.getElementById("message");
const dialog = document.getElementById("dialog");
const yesBtn = document.getElementById("yesBtn");
const yesBtcancelBtn = document.getElementById("closeBtn");
const forDeleteBtn = document.getElementById("forDeleteBtn");

progressBar.style.display = "none";
let files = [];

fileSelectBtn.addEventListener(
    "click",
    (e) => {
        if (fileInput) {
            fileInput.click();
        }
        e.preventDefault(); //prevent navigation to "#"
    },
    false
);

fileInput.addEventListener("change", handleFileSelection);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit(e);
});

yesBtn.addEventListener("click", (e) => {
    dialog.close();
    deleteFile(e);
});

// submitBtn.addEventListener("click",(e) => {
//     e.preventDefault();
//     console.log("am in submitBtn");
//     handleSubmit(e);
// })

function handleFileSelection(event) {
    progressBar.style.display = "none";
    message.textContent = " ";
    const file = event.target.files[0];
    // console.log("file: ", file);

    if (!validateFile(file)) {
        fileInput.value = ""; // clear the input if file is invalid
        preview.innerHTML = "";
        return;
    }

    preview.innerHTML = ""; //to remove the old preview

    if (file.type.startsWith("image")) {
        const img = document.createElement("img");
        img.classList.add("setImg");
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
    }

    if (file.type == "application/pdf") {
        const iFrame = document.createElement("iframe");
        iFrame.classList.add("pdfPreview");
        iFrame.src = URL.createObjectURL(file);
        preview.appendChild(iFrame);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    progressBar.style.display = "block";
    const file = fileInput.files[0];
    console.log("file in submit: ", file);

    if (!validateFile(file)) {
        return; //if file is invalid then don't submit it
    }

    const chunkSize = 1024 * 1024; //1MB chunk Size
    const totalChunks = Math.ceil(file.size / chunkSize); //rounds a number rounded UP to the nearest integer.

    for (let i = 0; i < totalChunks; i++) {
        const chunk = file.slice(
            i * chunkSize,
            Math.min(file.size, (i + 1) * chunkSize)
        );
        const formData = new FormData();
        formData.append("fileChunk", chunk, file.name);
        formData.append("chunkNumber", i);

        const xhttp = new XMLHttpRequest();
        xhttp.upload.addEventListener("progress", (e) => {
            const progress = parseInt((e.loaded / e.total) * 100);
            progressBar.value = progress;
            message.textContent = `uploading....${progress}%`;
        });
        xhttp.open("POST", "http://localhost:3500/upload/singleFile", true);
        xhttp.send(formData);
    }

    //To send complete file at once
    //   const formData = new FormData();
    //   formData.append("file", file, file.name); //Here browser will automatically set the content-type

    //   const xhttp = new XMLHttpRequest();
    //   xhttp.onload = function () {
    //     console.log("xhttp.status: ", xhttp.status);
    //     if (xhttp.status === 200) {
    //       console.log("Successfully uploaded");
    //       console.log("response:", this.responseText);
    //     } else console.log("Error in uploading!! Please Try Again");
    //   };
    //   xhttp.open("POST", "http://localhost:3500/singleUpload", true);
    //   xhttp.send(formData);
}

function validateFile(file) {
    if (!file) {
        alert("Please select a file.");
        return false;
    }

    const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; //5MB

    if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please select an image (JPG, JPEG, PNG, PDF).");
        return false;
    }

    if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please select a smaller image.");
        return false;
    }

    return true;
}

function deleteFile(event) {
    console.log("am in delete file");

    const file = fileInput.files[0];
    console.log("file: ", file)

    const formData = new FormData();
    formData.append("file", file, file.name);

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            console.log("response: ", this.responseText);
            preview.innerHTML = "";
            fileInput.value = "";
        }
    }
    xhttp.open("POST", "http://localhost:3500/deleteFile", true);
    xhttp.send(formData);
}

function getUploadedFiles() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            const resFiles = JSON.parse(this.responseText);
            files = [...resFiles];
            console.log("files: ", files);

            // console.log("new path: ",window.Ionic.WebView.convertFileSrc(file.fileLoc));
            for (file of files) {
                let ext = file.fileLoc.split(".");
                let arr = ext[0].split('\\');
                let fileName = arr[arr.length - 1].split("+");

                if (ext != 'PDF') {
                    const img = document.createElement("img");
                    img.classList.add("setImg");
                    // img.src = file.fileLoc;
                    img.alt = fileName[1];
                    preview.appendChild(img);
                }
                else {
                    const iFrame = document.createElement("iframe");
                    iFrame.classList.add("pdfPreview");
                    // iFrame.src = file.fileLoc;
                    iFrame.alt = fileName[1];
                    preview.appendChild(iFrame);
                }
                
            }
        }
    }
    xhttp.open("GET", "http://localhost:3500/get/singleFiles", true);
    xhttp.send();
}

getUploadedFiles();

// const deleteBtn = document.createElement("button");
// deleteBtn.textContent = "Delete";
// deleteBtn.innerHTML = "&times;"; // HTML entity for × (cross)
// deleteBtn.classList.add("delete-btn");

// deleteBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     dialog.showModal();
//     deleteBtn.style.display = "none";
// });

// forDeleteBtn.appendChild(deleteBtn);

// const obj = JSON.parse(this.responseText);
// Array.from(countries).forEach((country, index) => {
//     country.innerText = obj.countries_capitals[index].country;
// });

// Array.from(capitals).forEach((capital, index) => {
//     capital.innerText = obj.countries_capitals[index].capital;
// });

// const files = document.getElementById("files");
// const formData = new FormData();
// formData.append("name", name.value);
// for (let i = 0; i < files.files.length; i++) {
//     formData.append("files", files.files[i]);
// }

//to get the file extension
/*function getFileExtension(filename) {
    const parts = filename.split('.');
    return parts.pop();
}
    
function getFileExtension(filename) {
    if (!filename.includes('.')) return ''; // No dot found, or it's a hidden file without an extension
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop() : ''; // Avoid popping the only part for hidden files like .gitignore
}*/
