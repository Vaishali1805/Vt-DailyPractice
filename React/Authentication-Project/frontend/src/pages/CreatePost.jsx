import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ShowToastMessage from "../components/showToastMessage";
import { uploadFiles, uploadVideos } from "../api/apiHandlers";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ImageUploader from "../components/ImageUploader";
import VideoUploader from "../components/VideoUploader";
import { CHUNK_SIZE } from "../utils/constant";
import ShowUploadedImage from "../components/ShowUploadedImage";
import ShowUploadedVideo from "../components/ShowUploadedVideo";

const CreatePost = () => {
  const navigate = useNavigate();
  const { users, currentUserId } = useAuth();
  const [uploadedMedia, setUploadedMedia] = useState({ images: [], videos: [] });
  const [selectedMedia, setSelectedMedia] = useState({ images: [], videos: [] });

  useEffect(() => {
    const user = users.find((u) => u.id === currentUserId);
    if (!user) return;
    setUploadedMedia({
      images: user.uploadedImages || [],
      videos: user.uploadedVideos || [],
    });
  }, [users, currentUserId]);

  const handleMediaChange = async (e, type) => {
    const files = Array.from(e.target.files);
    if (!files.length) return ShowToastMessage(false, "No File Selected");
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    console.log("previews: ", previews);
    setSelectedMedia((prev) => ({
      ...prev,
      [type]: [...prev[type], ...previews]
    }))
  }

   const uploadImages = async (images, userId) => {
    const formData = new FormData();
    images.forEach(img => formData.append("files", img.file));
    formData.append("userId", userId);
    const res = await uploadFiles(formData);
    if (!res?.success) throw new Error(res.message || "Image upload failed");
    return res;
  };

  const uploadVideoInChunks = async (videoFile, userId) => {
    const totalChunks = Math.ceil(videoFile.size / CHUNK_SIZE);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = videoFile.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      const formData = new FormData();

      formData.append("chunk", chunk);
      formData.append("fileName", videoFile.name);
      formData.append("chunkIndex", i);
      formData.append("totalChunks", totalChunks);
      formData.append("userId", userId);

      const res = await uploadVideos(formData);
      if (!res?.success) {
        throw new Error(`Chunk ${i + 1} failed: ${res.message}`);
      }
    }
    return true;
  };

  const handleUpload = async () => {
    const { images, videos } = selectedMedia;
    const userId = currentUserId;

    const tasks = [];

    if (images.length > 0) {
      tasks.push(uploadImages(images, userId));
    }

    videos.forEach(video =>
      tasks.push(uploadVideoInChunks(video.file, userId))
    );

    try {
      await Promise.all(tasks);
      ShowToastMessage(true, "All media uploaded successfully!");
      setTimeout(() => {
        setSelectedMedia({ images: [], videos: [] });
        navigate("/userlist");
      }, 1000);
    } catch (err) {
      console.error("Upload failed:", err);
      ShowToastMessage(false, err.message || "Some uploads failed.");
    }
  };

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

        <div className="mb-2 flex justify-center gap-2.5">
          <ImageUploader handleChange={(e) => handleMediaChange(e, "images")} selectedImages={[...selectedMedia.images]} />
          <VideoUploader handleChange={(e) => handleMediaChange(e, "videos")} selectedVideos={[...selectedMedia.videos]} />
        </div>

        {(selectedMedia.images.length > 0 || selectedMedia.videos.length > 0) && (
          <div className="flex justify-center mt-5">
            <Button
              onClick={handleUpload}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
              value="Upload"
            />
          </div>
        )}

        {/* All uploaded images shown below */}
        <ShowUploadedImage uploadedImages={uploadedMedia.images}  />

        {/* All uploaded videos shown below */}
        <ShowUploadedVideo uploadedVideos={uploadedMedia.videos} />
        
      </div>
    </>
  );
};

export default CreatePost;
