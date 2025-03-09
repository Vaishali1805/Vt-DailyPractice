{/* <input type="file" id="fileInput">

<div id="progressBar"></div>  */}

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
