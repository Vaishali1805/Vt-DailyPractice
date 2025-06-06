import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ShowToastMessage from '../components/showToastMessage';
import { validateFile } from '../utils/validation';
import { uploadFiles } from '../api/apiHandlers';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const { users, currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    function getPost() {
      const user = users.map(user => {
        if (user.id === currentUser.id) return user;
      }).filter(Boolean)[0];
      if (user.hasOwnProperty('uploadedImages')) {
        setPosts(user.uploadedImages)
      }
    }
    getPost()
  }, []);


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return ShowToastMessage(false, "No File Selected");
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(urls)
  };

  const handleUpload = async () => {
    console.log("in handleupload")
    if (!selectedFiles) return ShowToastMessage(false, "Please select a file!");
    const files = Array.from(document.getElementById("fileInput").files);
    // validateFile(files);       --pending bottom

    const filesData = new FormData();
    filesData.append("userId", currentUser.id);
    files.map((file) => filesData.append("files", file, `${Date.now()}_${file.name}`));
    const res = await uploadFiles(filesData);
    ShowToastMessage(res?.success, res?.message);
    setTimeout(() => {
      setSelectedFiles(null);
      navigate('/userlist')
    }, 1000);
  };

  return (
    <>
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Upload Any Post or Image</h2>

        <div className="inline-block p-6 rounded-md border shadow-md">
          <div className="mb-4">
            <label className="mr-2">Select a file:</label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              hidden
            />
            <label htmlFor="fileInput" className="px-4 py-2 bg-gray-700 text-white rounded cursor-pointer">
              Click Here
            </label>
          </div>

          {/* Show preview of selected file */}
          {selectedFiles && (
            <div className="mb-4 flex justify-evenly gap-2.5">
              {selectedFiles.map((file, index) => (
                <img key={index} src={file} alt="preview" className=" mb-4 w-40 h-28 object-cover mx-auto rounded shadow" />
              ))}
            </div>
          )}

          {selectedFiles && (
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Upload
            </button>
          )}
        </div>

        {/* All uploaded images shown below */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((img, index) => (
            <div key={index} className="border rounded p-2 shadow hover:scale-105 transition-transform">
              <img src={`http://localhost:5000/${img}`} alt={`Image-${index}`} className="w-full h-40 object-cover rounded" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/*
for (let i = 0; i < files.length; i++) {
        if (!validateFile(files[i])) {
            fileInput.value = "";
            preview.innerHTML = "";
            return;
        }

        if (files[i].type.startsWith("image")) {
            const img = document.createElement("img");
            img.classList.add("setImg");
            img.src = URL.createObjectURL(files[i]);
            preview.appendChild(img);
        }

        if (files[i].type == "application/pdf") {
            const iFrame = document.createElement("iframe");
            iFrame.classList.add("pdfPreview");
            iFrame.src = URL.createObjectURL(files[i]);
            preview.appendChild(iFrame);
        }
    }
 */

export default CreatePost