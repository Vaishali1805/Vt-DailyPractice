{/* <input type="file" id="fileInput">

<div id="progressBar"></div>   */}

const fileInput = document.getElementById('fileInput');

const progressBar = document.getElementById('progressBar'); 



fileInput.addEventListener('change', (event) => {

  const file = event.target.files[0];

  const chunkSize = 1024 * 1024; // 1MB chunk size (adjust as needed)

  const totalChunks = Math.ceil(file.size / chunkSize);

  let uploadedChunks = 0;



  for (let i = 0; i < totalChunks; i++) {

    const chunk = file.slice(i * chunkSize, Math.min(file.size, (i + 1) * chunkSize));

    const formData = new FormData(); 

    formData.append('fileChunk', chunk);

    formData.append('chunkNumber', i);



    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {

      const progress = (e.loaded / e.total) * 100;

      progressBar.style.width = `${progress}%`;

    });



    xhr.open('POST', 'upload_handler.php'); // Replace with your server-side upload endpoint

    xhr.send(formData);

  }

});

//2
{/* <form id="fileUploadForm">
    <input type="file" id="fileElem" />
    <button type="submit">Upload</button>
</form>

<div id="progressContainer" style="width: 100%; background: #ddd; height: 20px; display: none;">
    <div id="progressBar" style="width: 0%; height: 100%; background: green;"></div>
</div>

<p id="progressText">0%</p> */}

const form = document.getElementById("fileUploadForm");
const fileInput2 = document.getElementById("fileElem");
const progressContainer = document.getElementById("progressContainer");
const progressBar2 = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const CHUNK_SIZE = 1024 * 100;  // **100KB per chunk** (Adjust as needed)

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file");
        return;
    }

    progressContainer.style.display = "block"; // Show progress UI
    await uploadFileInChunks(file);
});

async function uploadFileInChunks(file) {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkIndex", chunkIndex);
        formData.append("totalChunks", totalChunks);
        formData.append("fileName", file.name);

        await sendChunk(formData, chunkIndex, totalChunks);
    }

    console.log("File Upload Completed!");
}

async function sendChunk(formData, chunkIndex, totalChunks) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3500/uploadChunk", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(`Chunk ${chunkIndex + 1}/${totalChunks} uploaded`);
                
                // **Update Progress Bar**
                const percentComplete = Math.round(((chunkIndex + 1) / totalChunks) * 100);
                progressBar.style.width = percentComplete + "%";
                progressText.innerText = percentComplete + "%";
                
                resolve();
            } else {
                reject("Chunk upload failed");
            }
        };

        xhr.onerror = function () {
            reject("Network Error");
        };

        xhr.send(formData);
    });
}


