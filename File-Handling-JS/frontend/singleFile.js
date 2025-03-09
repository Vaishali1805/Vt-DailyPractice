const fileSelectBtn = document.getElementById("fileSelect");
const form = document.getElementById("fileUploadForm");
const fileInput = document.getElementById("fileElem");
// const submitBtn = document.getElementById("submitBtn");
const preview = document.getElementById("preview");

const data = new FormData(form);

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

// submitBtn.addEventListener("click",(e) => {
//     e.preventDefault();
//     console.log("am in submitBtn");
//     handleSubmit(e);
// })

function handleFileSelection(event) {
  const file = event.target.files[0];
  console.log("file: ", file);

  if (!validateFile(file)) {
    fileInput.value = ""; // clear the input if file is invalid
    preview.innerHTML = "";
    return;
  }

  preview.innerHTML = "";   //to remove the old preview

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
  const file = fileInput.files[0];

  if(!validateFile(file)){
    return;     //if file is invalid then don't submit it
  }

  const formData = new FormData();
  formData.append("file", file, file.name); //Here browser will automatically set the content-type
  console.log("formData: ", formData);

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log("xhttp.status: ", xhttp.status);
    if (xhttp.status === 200) {
      console.log("Successfully uploaded");
      console.log("response:", this.responseText);
    } else console.log("Error in uploading!! Please Try Again");
  };
  xhttp.open("POST", "http://localhost:3500/singleUpload", true);
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

// const files = document.getElementById("files");
// const formData = new FormData();
// formData.append("name", name.value);
// for (let i = 0; i < files.files.length; i++) {
//     formData.append("files", files.files[i]);
// }
