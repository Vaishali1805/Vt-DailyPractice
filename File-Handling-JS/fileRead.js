const fileSelectBtn = document.getElementById("fileSelect");
const fileInput = document.getElementById("fileElem");
const fileContentDisplay = document.getElementById("file-content");
const messageDisplay = document.getElementById("message");

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
    console.log("file: ", file);

    // Validate file existence and type
    if (!file) {
        showMessage("No file selected. Please choose a file.", "error");
        return;
    }

    if (!file.type.startsWith("text")) {
        showMessage("Unsupported file type. Please select a text file.", "error");
        return;
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = () => {
        fileContentDisplay.textContent = reader.result;
    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    showMessage("Below is the content of the text file");
    reader.readAsText(file);
}

function showMessage(message, type) {
    messageDisplay.textContent = message;
    messageDisplay.style.color = type === "error" ? "red" : "green";
}