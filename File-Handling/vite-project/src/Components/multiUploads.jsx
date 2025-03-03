import React from 'react'
import './multiUploads.css'

function multiUploads() {

    const handleChange = (event) => {
        const file = event.target.files;
        console.log("file: ",file);
    }

    return (
        <form enctype="multipart/form-data">
            <div>
                <label for="image_uploads">Choose images to upload (PNG, JPG)</label> <br /> <br />
                <input
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange = {handleChange}
                    multiple />
            </div>
            <div class="preview">
                <p>No files currently selected for upload</p>
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    )
}

export default multiUploads