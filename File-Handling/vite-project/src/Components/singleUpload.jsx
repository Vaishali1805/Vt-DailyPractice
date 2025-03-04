import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Loader from './loader.jsx';
import pdfImage from '../assets/pdfImage.webp'
import { useStates } from '../context/stateContext'

import './singleUpload.css'

const SingleUpload = () => {
    const Navigate = useNavigate();
    const { setUploadType } = useStates();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setisloading] = useState(false);

    useEffect(() => {
        console.log("in useEffect")
        console.log("isLoading: ",isLoading);
        if(isLoading){
            return <Loader />
        }
    },[isLoading]);

    // For handle the change of the file
    const handleChange = (event) => {
        console.log("am in handleChange")
        setisloading(true);                     //Loader not working correctly -- pending
        const file = event.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

            if (!validTypes.includes(file.type)) {
                alert("Invalid file type. Please select an image (JPG, JPEG, PNG, PDF).");
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5MB

            if (file.size > maxSize) {
                alert("File size exceeds 5MB. Please select a smaller image.");
                return;
            }
            setisloading(false);
            setSelectedFile(file);
        }
    }

    //Navigate to home page
    const handleClick = () => {
        setUploadType(null);
        Navigate("/");
    }

    // For Submit the form 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted");
    }

    return (
        <>
            <h2>Upload Any One File or Image</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="imageUpload">Upload Your file here:</label> <br /><br />
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        required
                    /><br /> <br />
                </div>

                {/* Image Preview */}
                {isLoading && <Loader />}
                
                {selectedFile && selectedFile.type == 'application/pdf'
                    ? <img className='pdfImage' src={pdfImage} alt="pdfImage" />
                    : selectedFile && <div className='imagePreview'>
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                    </div>
                }

                <input type="submit" value="Submit"></input> <br />

            </form>
            <button type="button" onClick={handleClick}>
                Go Home
            </button>
        </>
    )
}

export default SingleUpload