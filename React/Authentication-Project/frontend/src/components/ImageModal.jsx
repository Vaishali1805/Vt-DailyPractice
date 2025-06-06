import React, { useEffect, useState } from 'react'
import formStyles from '../styles/formStyles'
import { useAuth } from '../context/AuthContext';

const ImageModal = ({ setShowImageModal, userId }) => {
    const { users } = useAuth();
    const [name, setName] = useState();
    const [modalImages, setModalImages] = useState([]);

    useEffect(() => {
        function setImages() {
            const user = users.map(user => {
                if (user.id === userId) return user
            }).filter(Boolean)[0];
            if (user.hasOwnProperty('uploadedImages')) {
                setModalImages(user.uploadedImages);
            }
            setName(user.name);
        }
        setImages()
    }, []);

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                {!modalImages.length ? (<p>No Posts uploaded yet</p>) : (
                    <>
                        <h2 className="text-lg font-semibold mb-2">All Posts of {name}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {modalImages.map((img, index) => (
                                <img key={index} src={`http://localhost:5000/${img}`} alt={`Image-${index}`} className="w-full h-auto rounded" />
                            ))}
                        </div>
                    </>
                )}
                <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                    onClick={() => setShowImageModal(false)}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ImageModal