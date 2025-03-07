const fileInput = document.getElementById("fileElem");
const fileSelectBtn = document.getElementById("fileSelect");
const preview = document.getElementById("preview");

fileSelectBtn.addEventListener("click", (e) => {
    if (fileInput) {
        fileInput.click();
    }
    e.preventDefault();
}, false,);

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
    const files = event.target.files;
    console.log("files: ", files);

    for (let i = 0; i < files.length; i++) {
        if (!(files[i].type.startsWith("video") || files[i].type.startsWith("audio"))) {
            alert("Unsupported file type. Please select a audio/video file");
            return;
        }

        const maxSize = 5 * 1024 * 1024;        //5MB
        if (files[i].size > maxSize) {
            alert("File size exceeds 5MB. Please select a smaller image.")
            return;
        }

        const iFrame = document.createElement("iFrame");
        iFrame.src = URL.createObjectURL(files[i]);
        preview.appendChild(iFrame);
    }
}