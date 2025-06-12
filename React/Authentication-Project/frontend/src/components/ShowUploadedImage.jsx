import React from 'react'

const ShowUploadedImage = (props) => {
    const {uploadedImages} = props || {};
  return (
    <>
        {uploadedImages.length > 0 && <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {uploadedImages.map((img, index) => (
              <div
                key={index}
                className="border rounded p-2 shadow hover:scale-105 transition-transform">
                <img
                  src={`http://localhost:5000/${img}`}
                  alt={`Image-${index}`}
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </>
        }
    </>
  )
}

export default ShowUploadedImage