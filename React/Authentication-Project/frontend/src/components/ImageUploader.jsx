import React from 'react'

function ImageUploader(props) {
    const {handleChange,selectedImages} = props;
    return (
        <div className="inline-block p-6 rounded-md border shadow-md">
            <div className="mb-4">
                <label className="mr-2">Select files:</label>
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleChange}
                    accept="image/*"
                    multiple
                    hidden
                />
                <label
                    htmlFor="fileInput"
                    className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer">
                    Click Here
                </label>
            </div>

            {/* Show preview of selected file */}
            {selectedImages.length > 0 && (
                <div className="mb-4 flex justify-evenly gap-2.5">
                    {selectedImages.map((file, index) => (
                        <img
                            key={index}
                            src={file.url}
                            alt="preview"
                            className=" mb-4 w-40 h-28 object-cover mx-auto rounded shadow"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImageUploader