const fileSelectBtn = document.getElementById("fileSelect");
const form = document.getElementById("fileUploadForm");
const fileInput = document.getElementById("fileElem");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progressBar");
const message = document.getElementById("message");
const dialog = document.getElementById("dialog");
const yesBtn = document.getElementById("yesBtn");
const mainCheckBoxDiv = document.getElementById("mainCheckBoxDiv");
const mainCheckBox = document.getElementById("mainCheckBox");
const deleteBtn = document.getElementById("deleteBtn");
const submitBtn = document.getElementById("submitBtn");

let files = [];
let uploadedFiles = [];
let selectedFiles = new Set();

progressBar.style.display = "none";
mainCheckBoxDiv.style.display = "none";

if (selectedFiles.size === 0) {
    deleteBtn.disabled = true;
    deleteBtn.classList.add("disabled");
} else {
    deleteBtn.disabled = false;
    deleteBtn.classList.remove('disabled');
}

deleteBtn.addEventListener("click", deleteAllFiles);
mainCheckBox.addEventListener("change", check_uncheck_all);
fileSelectBtn.addEventListener(
    "click",
    (e) => {
        if (fileInput) {
            submitBtn.style.display = "block";
            mainCheckBoxDiv.style.display = "none";
            fileInput.click();
        }
        e.preventDefault();     //prevent navigation to "#"
    },
    false
);

fileInput.addEventListener("change", handleFileSelection);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // handleSubmit_chunks(e);     //send file in chunks
    handleSubmit(e);               //send file without chunks
});

function handleFileSelection(event) {
    progressBar.style.display = "none";
    message.textContent = " ";
    const file = event.target.files[0];
    // console.log("file: ", file);

    if (!validateFile(file)) {
        fileInput.value = "";   // clear the input if file is invalid
        preview.innerHTML = "";
        return;
    }

    preview.innerHTML = "";     //to remove the old preview

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

function handleSubmit_chunks(event) {
    event.preventDefault();
    const file = fileInput.files[0];
    // console.log("file in submit: ", file);

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
        formData.append("file", chunk, `${Date.now()}_${file.name}`);
        formData.append("chunkNumber", i);

        // debugger;    
        const xhttp = new XMLHttpRequest();

        xhttp.onprogress = function (event) {
            if (event.lengthComputable) {
                progressBar.style.display = "block";
                let progress = parseInt((event.loaded / event.total) * 100);
                //   console.log(`Upload Progress: ${progress.toFixed(2)}%`);
                progressBar.value = progress;
                message.textContent = `uploading....${progress}%`;
            }
        };

        xhttp.onloadend = function () {
            if (xhttp.status === 200) {
                //receive the array of uploaded files
                let response = JSON.parse(this.responseText);
                console.log("message: ", response.message)
                uploadedFiles = [...response.files];
                // console.log("uploadedFiles: ", uploadedFiles);
                // previewUploadedFiles();
                previewUploadedFiles_checkBoxes();
            }
        };

        // xhttp.upload.addEventListener("progress", (e) => {
        //     const progress = parseInt((e.loaded / e.total) * 100);
        //     progressBar.value = progress;
        //     message.textContent = `uploading....${progress}%`;
        // });

        xhttp.open("POST", "http://localhost:3500/upload/singleFile", true);
        xhttp.send(formData);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const file = fileInput.files[0];

    if (!validateFile(file)) {
        return; //if file is invalid then don't submit it
    }

    progressBar.style.display = "block";
    message.style.display = "block";

    // To send complete file at once
    const formData = new FormData();
    formData.append("file", file, `${Date.now()}_${file.name}`); //Here browser will automatically set the content-type

    const xhttp = new XMLHttpRequest();

    xhttp.onprogress = function (event) {
        if (event.lengthComputable) {
            progressBar.style.display = "block";
            let progress = parseInt((event.loaded / event.total) * 100);
            //   console.log(`Upload Progress: ${progress.toFixed(2)}%`);
            progressBar.value = progress;
            message.textContent = `uploading....${progress}%`;
        }
    };

    xhttp.onloadend = function () {
        if (xhttp.status === 200) {
            //receive the array of uploaded files
            let response = JSON.parse(this.responseText);
            console.log("message: ", response.message)
            uploadedFiles = [...response.files];
            // console.log("uploadedFiles: ", uploadedFiles);
            // previewUploadedFiles();
            previewUploadedFiles_checkBoxes();
        }
    };

    xhttp.open("POST", "http://localhost:3500/upload/singleFile", true);
    xhttp.send(formData);
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

function deleteFile(fileId) {
    console.log("fileId: ", fileId);
    let obj = { id: fileId }

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            let response = JSON.parse(this.responseText)
            console.log("response: ", response);
            uploadedFiles = [...response.files];
            previewUploadedFiles();
            // previewUploadedFiles_checkBoxes();
            // getUploadedFiles();
        }
    };
    xhttp.open("POST", "http://localhost:3500/delete/file", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(obj));
}

//without cache get from directory
function getUploadedFiles() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            const resFiles = JSON.parse(this.responseText);
            files = [...resFiles];
            console.log("files: ", files);
            preview.innerHTML = "";

            files.forEach((file, index) => {
                let ext = file.name.split(".");
                let fileName = ext[0].split("+");

                const fileContainer = document.createElement("div");
                fileContainer.classList.add("file-container");

                const fileUrl = `http://localhost:3500${file.fileLoc}`;
                if (ext[1].toLowerCase() !== "pdf") {
                    const img = document.createElement("img");
                    img.classList.add("setImg");
                    img.src = fileUrl;
                    img.alt = fileName[1];
                    fileContainer.appendChild(img);
                } else {
                    const iFrame = document.createElement("iframe");
                    iFrame.classList.add("pdfPreview");
                    iFrame.src = fileUrl;
                    iFrame.alt = fileName[1];
                    fileContainer.appendChild(iFrame);
                }

                //create a delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete";
                deleteBtn.classList.add("delete-btn");

                deleteBtn.onclick = function (e) {
                    e.preventDefault();
                    dialog.showModal();

                    console.log("fileId: ", file.id);
                    yesBtn.addEventListener("click", (e) => {
                        dialog.close();
                        deleteFile(file.id);
                    });
                };

                fileContainer.appendChild(deleteBtn);
                preview.appendChild(fileContainer);
            })
        }
    };
    xhttp.open("GET", "http://localhost:3500/get/singleFiles", true);
    xhttp.send();
}

//using cache 
// with delete button attach with all files
function previewUploadedFiles() {
    deleteBtn.style.display = "none";
    submitBtn.style.display = "none";
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            // console.log("response: ", JSON.parse(this.responseText));
            let response = JSON.parse(this.responseText);
            uploadedFiles = [...response];
            console.log("uploadedFiles: ", uploadedFiles);

            progressBar.style.display = "none";
            message.style.display = "none";
            preview.innerHTML = ""; //to remove the old preview

            uploadedFiles.forEach((file, index) => {
                let ext = file.path.split('.');

                const fileContainer = document.createElement("div");
                fileContainer.classList.add("file-container");

                const fileUrl = `http://localhost:3500/${file.path}`;

                if (ext[1].toLowerCase() !== "pdf") {
                    const img = document.createElement("img");
                    img.classList.add("setImg");
                    img.src = fileUrl;
                    fileContainer.appendChild(img);
                }
                else {
                    const iFrame = document.createElement("iframe");
                    iFrame.classList.add("pdfPreview");
                    iFrame.src = fileUrl;
                    fileContainer.appendChild(iFrame);
                }

                //create a delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete";
                deleteBtn.classList.add("delete-btn");

                deleteBtn.onclick = function (e) {
                    e.preventDefault();
                    dialog.showModal();

                    // console.log("fileId: ", file.id);
                    yesBtn.addEventListener("click", (e) => {
                        dialog.close();
                        deleteFile(file.id);
                    });
                };

                fileContainer.appendChild(deleteBtn);
                preview.appendChild(fileContainer);

            });
        }
    }
    xhttp.open("GET", "http://localhost:3500/get/singleFiles", true);
    xhttp.send();
}

//using cache
//with checkboxes attach with every file
function previewUploadedFiles_checkBoxes() {
    deleteBtn.style.display = "block";
    submitBtn.style.display = "none";

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status === 200) {
            // console.log("response: ", JSON.parse(this.responseText));
            let response = JSON.parse(this.responseText);
            uploadedFiles = [...response];
            console.log("uploadedFiles: ", uploadedFiles);

            if (uploadedFiles.length == 0) {
                mainCheckBoxDiv.style.display = 'none';
            } else
                mainCheckBoxDiv.style.display = "block";

            console.log("selectedFiles: ", selectedFiles);

            progressBar.style.display = "none";
            message.style.display = "none";
            preview.innerHTML = "";     //to remove the old preview

            //selectedFiles = new Set(); // Store selected file IDs

            uploadedFiles.forEach((file, index) => {
                let ext = file.path.split('.');

                const fileContainer = document.createElement("div");
                fileContainer.classList.add("file-container");

                const fileUrl = `http://localhost:3500/${file.path}`;

                if (ext[1].toLowerCase() !== "pdf") {
                    const img = document.createElement("img");
                    img.classList.add("setImg");
                    img.src = fileUrl;
                    fileContainer.appendChild(img);
                }
                else {
                    const iFrame = document.createElement("iframe");
                    iFrame.classList.add("pdfPreview");
                    iFrame.src = fileUrl;
                    fileContainer.appendChild(iFrame);
                }

                // create checkboxes for every file
                let checkBox = document.createElement('input');
                checkBox.type = 'checkbox'
                checkBox.classList.add('check');
                checkBox.dataset.fileId = file.id;  //add a custom data in the checkbox for fileId

                checkBox.addEventListener("change", function () {
                    if (this.checked) {
                        // selectedFiles.add(file.id);
                        check(file.id);
                    } else {
                        // selectedFiles.delete(file.id);
                        unCheck(file.id);
                    }
                    updateMainCheckbox();
                });

                fileContainer.appendChild(checkBox);
                preview.appendChild(fileContainer);
            });
        }
    }
    xhttp.open("GET", "http://localhost:3500/get/singleFiles", true);
    xhttp.send();
}

function updateMainCheckbox() {
    const checkBoxes = document.getElementsByClassName('check');
    mainCheckBox.checked = checkBoxes.length > 0 && selectedFiles.size === checkBoxes.length;
}

function check(fileId) {
    selectedFiles.add(fileId);
    console.log("selectedFiles: ", selectedFiles)
    deleteBtn.disabled = false;
    deleteBtn.classList.remove('disabled')
}

function unCheck(fileId) {
    selectedFiles.delete(fileId);
    console.log("selectedFiles: ", selectedFiles)
    if (selectedFiles.size == 0) {
        deleteBtn.disabled = true;
        deleteBtn.classList.add('disabled')
    }
}

function check_uncheck_all() {
    const checkBoxes = document.getElementsByClassName('check');
    if (this.checked) {
        //update the selected files array and check all checkBoxes
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = true;
        }
        uploadedFiles.forEach((file, index) => {
            selectedFiles.add(file.id);
        })
        console.log("selectedFiles: ", selectedFiles)
        deleteBtn.disabled = false;
        deleteBtn.classList.remove('disabled');
    } else {
        //update the selected files array and uncheck all checkBoxes
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
        selectedFiles.clear();
        console.log("selectedFiles: ", selectedFiles)
        deleteBtn.disabled = true;
        deleteBtn.classList.add("disabled");
    }
}

function deleteAllFiles() {
    let obj = { selectedFiles: Array.from(selectedFiles)};
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if(xhttp.status == 200){
            let response = JSON.parse(this.responseText);
            console.log("message: ", response.message);
            uploadedFiles = [...response.files];
            previewUploadedFiles_checkBoxes();
        }
    }
    xhttp.open("POST","http://localhost:3500/delete/AllFiles",true);
    xhttp.send(JSON.stringify(obj));
}

function getFiles() {
    console.log("am here")
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (xhttp.status == 200) {
            console.log("response: ", this.responseText);
        }
    }
    xhttp.onerror = function () {
        console.error("Request failed");
        alert("Network error! Unable to connect to server.");
    };
    xhttp.open("GET", "http://localhost:3500/get/singleFiles", true);
    xhttp.send();
}

// getUploadedFiles();
// getFiles();
// previewUploadedFiles();
previewUploadedFiles_checkBoxes();



// const deleteBtn = document.createElement("button");
// deleteBtn.textContent = "Delete";
// deleteBtn.innerHTML = "&times;"; // HTML entity for × (cross)
// deleteBtn.classList.add("delete-btn");

// deleteBtn.addEventListener("click", (e) => {
// e.preventDefault();
// dialog.showModal();
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
