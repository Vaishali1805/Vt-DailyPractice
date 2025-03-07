const fileInput = document.getElementById("fileElem");
const fileSelectBtn = document.getElementById("fileSelect");
const preview = document.getElementById("preview");

fileSelectBtn.addEventListener("click", (e) => {
    if (fileInput) {
        fileInput.click();
    }
    e.preventDefault();         //prevent navigation to "#"
}, false,)

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
    const files = event.target.files;
    console.log("files: ", files);

    for (let i = 0; i < files.length; i++) {
        const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']

        if (!validTypes.includes(files[i].type)){
            alert("Invalid file type. Please select an image (JPG, JPEG, PNG, PDF).");
            return;
        }

        const maxSize = 5 * 1024 * 1024;        //5MB
        if(files[i].size > maxSize){
            alert("File size exceeds 5MB. Please select a smaller image.")
            return;
        }

        if (files[i].type.startsWith("image")) {
            const img = document.createElement("img");
            img.classList.add("setImg")
            img.src = URL.createObjectURL(files[i]);
            preview.appendChild(img);
        }

        if (files[i].type == 'application/pdf') {
            const iFrame = document.createElement("iframe");
            iFrame.classList.add("pdfPreview")
            iFrame.src = URL.createObjectURL(files[i]);
            preview.appendChild(iFrame);
        }
    }
}