const dropBox = document.getElementById("dropBox");
const dropBoxMsg = document.querySelector("#dropBox p");
const input = document.querySelector("input");
const preview = document.getElementById("preview");

dropBox.addEventListener("click",(e) => {
    input.click();
    input.onchange = (e) => {
        const files = e.target.files;
        handleFileSelection(files);
    }
})

dropBox.addEventListener("dragenter",dragenter,false);
dropBox.addEventListener("dragover",dragover,false);
dropBox.addEventListener("drop",drop,false);

function dragenter(e){
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e){
    e.stopPropagation();
    e.preventDefault();
}

function drop(e){
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFileSelection(files);
}

function handleFileSelection(files){
    
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