import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useStates } from '../context/stateContext'
import './multiUploads.css'

function multiUploads() {
    const Navigate = useNavigate();
    const { setUploadType } = useStates();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        console.log("in useEffect");
        console.log("files: ",files);
    },[files]);

    // For Submit the form 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted");
    }

    const handleChange = (e) => {
        const newFiles = [];
        if(!files){
            alert("First select an image");
            return;
        }
        for (let i = 0; i < e.target.files.length; i++) {
            newFiles.push(e.target.files[i]);
        }
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }

    //Navigate to home page
    const handleClick = () => {
        setUploadType(null);
        Navigate("/");
    }

    return (
        <>
            <h2>Here You can upload multiple Images and Pdf's</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="image_uploads">Choose images to upload (PNG, JPG, JPEG, PDF)</label> <br /> <br />
                    <input
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={handleChange}
                        multiple
                        required />
                </div>

                {/* Image Preview */}
                {files && files.map((file, index) => (
                    <div key={index} >
                        <div className='flex'>
                            <img className="preview" src={URL.createObjectURL(file)} alt="Preview" />
                        </div>
                    </div>
                ))}

                <input type="submit" value="Submit" />
            </form>

            <button type="button" onClick={handleClick}>
                Go Home
            </button>
        </>
    )
}

export default multiUploads