import React,{useState} from 'react'
import pdfImage from '../../public/pdfImage.webp'
import './singleUpload.css'

const SingleUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    // For Submit the form 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted");
    }

    // For handle the change of the file
    const handleChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

            if (!validTypes.includes(file.type)) {
                alert("Invalid file type. Please select an image (JPG, JPEG, PNG).");
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert("File size exceeds 5MB. Please select a smaller image.");
                return;
            }
            setSelectedFile(file);
        }
    }

    return (
        <>
            <h2>Upload Any One File or Image</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="imageUpload">Upload Your file here:</label> <br /><br />
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*,application/pdf"
                    onChange={handleChange}
                    required
                /><br /> <br />

                {/* Image Preview */}
                {selectedFile && selectedFile.type == 'application/pdf'
                    ? <img className='pdfImage' src={pdfImage} alt="pdfImage" />
                    : selectedFile && <div className='imagePreview'>
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                    </div>
                }

                <input type="submit" value="Submit"></input>
            </form>
        </>
    )
}

export default SingleUpload