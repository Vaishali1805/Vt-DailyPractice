const fileSelectBtn = document.getElementById("fileSelect");
const fileInput = document.getElementById("fileElem");
const fileContentDisplay = document.getElementById("file-content");
const messageDisplay = document.getElementById("message");
const ShowFileName = document.getElementById("ShowFileName");

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

async function handleFileSelection(event) {
    // const file = event.target.files[0];
    const files = event.target.files;
    console.log("files: ", files);
    console.log("files.length: ", files.length);
    for (let i = 0; i < files.length; i++) {
        // Validate file existence and type
        if (!files[i]) {
            showMessage("No file selected. Please choose a file.", "error");
            return;
        }

        if (!files[i].type.startsWith("text")) {
            showMessage("Unsupported file type. Please select a text file.", "error");
            return;
        }

        const maxSize = 5 * 1024 * 1024;        //5MB
        if (files[i].size > maxSize) {
            showMessage("File size exceeds 5MB. Please select a smaller image.", "error");
            return;
        }

        // Read the file
        const reader = new FileReader();
        reader.onload = () => {
            const preTag = document.createElement("pre");
            preTag.textContent = reader.result;
            fileContentDisplay.appendChild(preTag);
        };
        reader.onerror = () => {
            showMessage("Error reading the file. Please try again.", "error");
        };
        reader.readAsText(files[i]);
        const fileName = document.createElement("p");
        fileName.textContent = `Below is the content of the text file ${files[i].name}`;
        await delay(400, fileName);
        // ShowFileName.appendChild(fileName);
    }
}

function showMessage(message, type) {
    const msg = document.createElement("p");
    msg.textContent = message;
    msg.style.color = type === "error" ? "red" : "green";
    messageDisplay.appendChild(msg)
}

// Fake delay using Promise
const delay = (ms, fileName) =>
    new Promise((resolve) => setTimeout(() => {
        ShowFileName.appendChild(fileName);
        resolve('Hello')
    }, ms));