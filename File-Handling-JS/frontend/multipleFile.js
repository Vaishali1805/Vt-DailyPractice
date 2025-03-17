const fileInput = document.getElementById("fileElem");
const fileSelectBtn = document.getElementById("fileSelect");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progressBar");
const message = document.getElementById("message");
const dialog = document.getElementById("dialog");
const yesBtn = document.getElementById("yesBtn");
const form = document.getElementById("form");

progressBar.style.display = "none";
let uploadedFiles = [];

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

function handleFileSelection(event) {
    progressBar.style.display = "none";
    message.textContent = " ";

    const files = event.target.files;
    // console.log("files: ", files);

    for (let i = 0; i < files.length; i++) {
        if (!validateFile(files[i])) {
            fileInput.value = "";
            preview.innerHTML = "";
            return;
        }

        if (files[i].type.startsWith("image")) {
            const img = document.createElement("img");
            img.classList.add("setImg");
            img.src = URL.createObjectURL(files[i]);
            preview.appendChild(img);
        }

        if (files[i].type == "application/pdf") {
            const iFrame = document.createElement("iframe");
            iFrame.classList.add("pdfPreview");
            iFrame.src = URL.createObjectURL(files[i]);
            preview.appendChild(iFrame);
        }
    }
}

function handleSubmit(event) {
    event.preventDefault();
    progressBar.style.display = "block";
    message.style.display = "block";
    const files = fileInput.files;

    if (files.length === 0) {
        console.log("No files selected.");
        return;
    }
    console.log("files: ", files);

    // Create FormData object
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i], `${Date.now()}_${files[i].name}`); // 'files' should match multer's field name
    }

    // debugger;
    //Send multiple files together
    const xhttp = new XMLHttpRequest();

    xhttp.onprogress = function (event) {
        if (event.lengthComputable) {
            progressBar.style.display = "block";
            let progress = parseInt((event.loaded / event.total) * 100);
            //   console.log(`Upload Progress: ${progress.toFixed(2)}%`);
            progressBar.value = progress;
            message.textContent = `uploading....${progress}%`;
            // message.textContent = 'hlo';
        }
    };

    xhttp.onloadend = function () {
        if (xhttp.status === 200) {
            let response = JSON.parse(this.responseText);
            console.log("message: ", response.message)
            uploadedFiles = [...response.files];
            previewUploadedFiles();
        }
    };

    xhttp.open("POST", "http://localhost:3500/upload/multipleFiles", true);
    xhttp.send(formData);

    //In chunks
    // for (let i = 0; i < files.length; i++) {

    //     if (!validateFile(files[i])) {
    //         return;
    //     }

    //     progressBar.style.display = "block";

    //     const chunkSize = 1024 * 1024;      //1Mb size
    //     const totalChunks = Math.ceil(files[i].size / chunkSize);

    //     for (let j = 0; j < totalChunks; j++) {
    //         let chunk = files[i].slice(j * chunkSize, Math.min(files[i].size, (j + 1) * chunkSize));
    //         const formData = new FormData();
    //         formData.append('fileChunk', chunk);
    //         formData.append('chunkNumber', j);

    //         const xhttp = new XMLHttpRequest();
    //         xhttp.upload.addEventListener('progress', (e) => {
    //             const progress = parseInt((e.loaded / e.total) * 100);
    // progressBar.value = progress;
    // message.textContent = `uploading....${progress}%`;
    //         })
    // xhttp.open('POST', "http://localhost:3500/upload/multipleFiles", true);
    // xhttp.send(formData);
    //     }
    // }
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
    console.log("fileId: ",fileId);
}

//using cache 
function previewUploadedFiles() {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        if (xhttp.status === 200) {
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
                    preview.appendChild(img);
                }
                else {
                    const iFrame = document.createElement("iframe");
                    iFrame.classList.add("pdfPreview");
                    iFrame.src = fileUrl;
                    preview.appendChild(iFrame);
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
            })

        }
    }
    xhttp.open("GET", "http://localhost:3500/get/multipleFiles", true);
    xhttp.send();
}

previewUploadedFiles();
