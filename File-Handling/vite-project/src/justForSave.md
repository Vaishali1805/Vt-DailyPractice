import React, { useState } from 'react';

import axios from 'axios';



function UploadPDF() {

  const [selectedFile, setSelectedFile] = useState(null);



  const handleFileChange = (event) => {

    setSelectedFile(event.target.files[0]);

  };



  const handleFileUpload = async () => {

    const formData = new FormData();

    formData.append('pdfFile', selectedFile);



    try {

      const response = await axios.post('/upload-pdf', formData, {

        headers: {'Content-Type': 'multipart/form-data'}

      });

      console.log('File uploaded successfully:', response);

    } catch (error) {

      console.error('Error uploading file:', error);

    }

  };



  return (

    <div>

      <input type="file" onChange={handleFileChange} accept="application/pdf" />

      <button onClick={handleFileUpload}>Upload PDF</button>

    </div>

  );

}



export default UploadPDF;
