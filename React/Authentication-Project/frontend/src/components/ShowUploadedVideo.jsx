import React from 'react'

const ShowUploadedVideo = (props) => {
    const {uploadedVideos} = props || {};
    return (
        <>
            {uploadedVideos.length > 0 && <>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {uploadedVideos.map((video, index) => (
                        <div
                            key={index}
                            className="border rounded p-2 shadow hover:scale-105 transition-transform">
                            <video className="w-full h-40 object-cover rounded" >
                                <source src={`http://localhost:5000/${video}`} alt={`Video-${index}`} ></source>
                            </video>
                        </div>
                    ))}
                </div>
            </>}
        </>
    )
}

export default ShowUploadedVideo