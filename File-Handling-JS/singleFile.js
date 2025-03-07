const fileSelectBtn = document.getElementById("fileSelect");
const fileInput = document.getElementById("fileElem");
const preview = document.getElementById("preview");

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

function handleFileSelection(event) {
    const file = event.target.files[0];
    console.log("files: ", file);
    console.log("file.type: ", file.type)

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
