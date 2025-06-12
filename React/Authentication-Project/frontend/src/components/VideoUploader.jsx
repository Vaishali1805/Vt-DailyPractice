import React, { useEffect } from 'react';

const VideoUploader = (props) => {
    const {handleChange,selectedVideos} = props;

    return (
        <div className="inline-block p-6 rounded-md border shadow-md">
            <div className="mb-4">
                <label className="mr-2">Select videos:</label>
                <input
                    type="file"
                    id="videoInput"
                    onChange={handleChange}
                    accept="video/*"
                    multiple
                    hidden
                />
                <label
                    htmlFor="videoInput"
                    className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer">
                    Click Here
                </label>
            </div>

            {/* Show preview of selected videos */}
            {selectedVideos.length > 0 && (
                <div className="mb-4 flex justify-evenly gap-2.5">
                    {selectedVideos.map((file, index) => (
                        <video key={index} className="mb-4 w-40 h-28 object-cover mx-auto rounded shadow" >
                            <source src={file.url} ></source>
                        </video>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideoUploader;
