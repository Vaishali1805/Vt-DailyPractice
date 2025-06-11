import React, { useEffect, useState } from "react";
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { useAuth } from "../context/AuthContext";
import ShowToastMessage from "../components/showToastMessage";
import { uploadFiles } from "../api/apiHandlers";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const CreatePost = () => {
  const navigate = useNavigate();
  const { users, currentUserId } = useAuth();
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({ images: [], videos: [] });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState(null);

  useEffect(() => {
    const user = users.find((u) => u.id === currentUserId);
    if (!user) return;

    setPosts(user.uploadedImages || []);
    setVideos(user.uploadedVideos || []);
  }, [users, currentUserId]);


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return ShowToastMessage(false, "No File Selected");
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(urls);
  };

  const handleFileChange2 = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return ShowToastMessage(false, "No File Selected");
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedVideos(urls);
  };

  const handleMediaChange = (type, e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return ShowToastMessage(false, "No File Selected");

    const urls = files.map(file => URL.createObjectURL(file));
    setSelectedMedia(prev => ({ ...prev, [type]: urls }));
  };

  const handleUpload = async () => {
    if (!selectedFiles) return ShowToastMessage(false, "Please select a file!");
    const files = Array.from(document.getElementById("fileInput").files);
    // validateFile(files);       --pending bottom

    const filesData = new FormData();
    filesData.append("userId", currentUserId);
    files.map((file) =>
      filesData.append("files", file, `${Date.now()}_${file.name}`)
    );
    const res = await uploadFiles(filesData);
    ShowToastMessage(res?.success, res?.message);
    setTimeout(() => {
      setSelectedFiles(null);
      navigate("/userlist");
    }, 1000);
  };

  const new_handleUpload = async (type, inputId) => {
    const media = selectedMedia[type];
    if (!media.length) return ShowToastMessage(false, "Please select files!");

    const files = Array.from(document.getElementById(inputId).files);
    const formData = new FormData();
    formData.append("userId", currentUserId);
    files.forEach(file =>
      formData.append("files", file, `${Date.now()}_${file.name}`)
    );

    const res = await uploadFiles(formData);
    ShowToastMessage(res?.success, res?.message);
    if (res?.success) {
      setSelectedMedia(prev => ({ ...prev, [type]: [] }));
      setTimeout(() => navigate("/userlist"), 1000);
    }
  };

  const handleUpload2 = async () => {
    console.log("am in handleUpload2")
  }

  return (
    <>
      <div className="p-6 text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center w-full">
            Upload Any Post or Image
          </h2>
          <div className="absolute top-6 right-6">
            <Button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
              onClick={() => navigate("/userlist")}
              value="Back"
            />
          </div>
        </div>

        {/* <UploaderComponent
          asyncSettings={{
            saveUrl: "http://localhost:5000/auth/uploadImages", // your backend upload route
            // removeUrl: "http://localhost:5000/auth/remove", // optional
            chunkSize: 102400,
          }}
          allowedExtensions={type === 'images' ? '.jpg,.jpeg,.png' : '.mp4,.avi'}
          multiple={true}
        /> */}


        <div className="flex justify-center gap-2">
          {/* To upload photos */}
          <div className="inline-block p-6 rounded-md border shadow-md">
            <div className="mb-4">
              <label className="mr-2">Select files:</label>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
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
            {selectedFiles && (
              <div className="mb-4 flex justify-evenly gap-2.5">
                {selectedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt="preview"
                    className=" mb-4 w-40 h-28 object-cover mx-auto rounded shadow"
                  />
                ))}
              </div>
            )}
            {selectedFiles && (
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Upload
              </button>
            )}
          </div>
          {/* To upload videos */}
          <div className="inline-block p-6 rounded-md border shadow-md">
            <div className="mb-4">
              <label className="mr-2">Select videos:</label>
              <input
                type="file"
                id="videoInput"
                onChange={handleFileChange2}
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
            {selectedVideos && (
              <div className="mb-4 flex justify-evenly gap-2.5">
                {selectedVideos.map((file, index) => (
                  <video key={index} className="mb-4 w-40 h-28 object-cover mx-auto rounded shadow" >
                    <source src={file} ></source>
                  </video>
                ))}
              </div>
            )}
            {selectedVideos && (
              <button
                onClick={handleUpload2}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                Upload
              </button>
            )}
          </div>
        </div>

        {/* All uploaded images shown below */}
        {posts && <>
          {/* <h4>Uploaded Images/Posts</h4> */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((img, index) => (
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

        {/* All uploaded videos shown below */}
        {videos && <>
          {/* <h4>Uploaded Videos</h4> */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* {videos.map((img, index) => (
            <div
              key={index}
              className="border rounded p-2 shadow hover:scale-105 transition-transform">
              <img
                src={`http://localhost:5000/${img}`}
                alt={`Image-${index}`}
                className="w-full h-40 object-cover rounded"
              />
            </div>
          ))} */}
          </div>
        </>}
      </div>
    </>
  );
};

export default CreatePost;
