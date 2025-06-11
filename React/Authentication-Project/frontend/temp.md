multiple request prevention

1. Disable button while processing
const [isProcessing, setIsProcessing] = useState(false);

const handleClick = async () => {
  if (isProcessing) return; // Prevent double click

  setIsProcessing(true); // Disable button
  const res = await someAsyncRequest();
  setIsProcessing(false); // Enable button again

  // handle response...
};

<Button 
  onClick={handleClick} 
  disabled={isProcessing}
  className={isProcessing ? "opacity-50 cursor-not-allowed" : ""}
  value={isProcessing ? "Please wait..." : "Submit"} 
/>

2. Debounce the button click

npm install lodash
import { debounce } from "lodash";

const handleClick = debounce(async () => {
  const res = await someAsyncRequest();
}, 1000); // executes only once per 1 second


import jwtDecode from "jwt-decode";

// Get token from localStorage
const token = localStorage.getItem("token");

// Decode token
if (token) {
  const decoded = jwtDecode(token);
  console.log("User ID from token:", decoded.id);
}

//createPost.jsx

import React, { useEffect, useState } from "react";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import { useAuth } from "../context/AuthContext";
import ShowToastMessage from "../components/showToastMessage";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const { users, currentUserId } = useAuth();
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const user = users.find((u) => u.id === currentUserId);
    if (user) {
      setPosts(user.uploadedImages || []);
      setVideos(user.uploadedVideos || []);
    }
  }, [users, currentUserId]);

  const getUploadSettings = (type) => ({
    saveUrl: `http://localhost:5000/auth/${type === "images" ? "uploadImages" : "uploadVideos"}`,
    chunkSize: 102400,
    // Optional: attach userId to request headers or formData on backend side
  });

  return (
    <div className="p-6 text-center">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold w-full text-center">Upload Post or Video</h2>
        <div className="absolute top-6 right-6">
          <Button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigate("/userlist")}
            value="Back"
          />
        </div>
      </div>

      {/* Image Uploader */}
      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Upload Images</h3>
        <UploaderComponent
          asyncSettings={getUploadSettings("images")}
          allowedExtensions=".jpg,.jpeg,.png"
          multiple={true}
        />
      </div>

      {/* Video Uploader */}
      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Upload Videos</h3>
        <UploaderComponent
          asyncSettings={getUploadSettings("videos")}
          allowedExtensions=".mp4,.avi"
          multiple={true}
        />
      </div>

      {/* Uploaded Images */}
      {posts?.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((img, idx) => (
            <div key={idx} className="border p-2 rounded shadow hover:scale-105 transition-transform">
              <img
                src={`http://localhost:5000/${img}`}
                alt={`Image-${idx}`}
                className="w-full h-40 object-cover rounded"
              />
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Videos */}
      {videos?.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((vid, idx) => (
            <div key={idx} className="border p-2 rounded shadow hover:scale-105 transition-transform">
              <video controls className="w-full h-40 object-cover rounded">
                <source src={`http://localhost:5000/${vid}`} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
