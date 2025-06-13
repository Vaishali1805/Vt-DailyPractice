import React, { useEffect, useState } from 'react'
import formStyles from '../styles/formStyles'
import { useAuth } from '../context/AuthContext';

const MediaModal = ({ setShowMediaModal, userId }) => {
    const { users } = useAuth();
    const [name, setName] = useState();
    const [modalMedia, setModalMedia] = useState({ images: [], videos: [] });

    useEffect(() => {
        function setImages() {
            const user = users.find(user => user.id === userId);
            setModalMedia({
                images: user.uploadedImages || [],
                videos: user.uploadedVideos || []
            });
            setName(user.name);
        }
        setImages()
        document.body.style.overflow = 'hidden';

        // Cleanup to re-enable scroll
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full max-h-[90vh] overflow-y-auto text-center">
                {!modalMedia.images.length && !modalMedia.videos.length ? (<p>No Posts uploaded yet</p>) : (
                    <>
                        <h2 className="text-lg font-semibold mb-2">All Posts of {name}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {modalMedia.images.map((img, index) => (
                                <img key={index} src={`http://localhost:5000/${img}`} alt={`Image-${index}`} className="w-full h-auto rounded" />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {modalMedia.videos.map((video, index) => (
                                <video className="w-full h-auto rounded" key={index}>
                                    <source src={`http://localhost:5000/${video}`} alt={`Video-${index}`}></source>
                                </video>
                            ))}
                        </div>
                    </>
                )}
                <button
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                    onClick={() => setShowMediaModal(false)}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default MediaModal