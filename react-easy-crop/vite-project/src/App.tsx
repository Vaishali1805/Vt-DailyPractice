import { useState } from "react";
import ImageCropperModal from "./ImageCropper";

function App() {
  const [image, setImage] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<string>();
  const [showCropper, setShowCropper] = useState(false);

  const handleFileChange = (event: any) => {
    const url = URL.createObjectURL(event.target.files[0]);
    setImage(url);
    setCroppedImage(undefined);
    setShowCropper(true); // open modal
  };

  return (
    <div className="container p-3">
      <h2 className="mb-2 bg-secondary text-white p-2 rounded">Upload and Crop Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Show modal if cropper is active */}
      {showCropper && image && (
        <ImageCropperModal
          image={image}
          aspect={4 / 1}
          onCropDone={(croppedImage) => {
            setCroppedImage(croppedImage);
            setShowCropper(false);
          }}
          onClose={() => setShowCropper(false)}
        />
      )}

      {/* Final Cropped Preview */}
      {croppedImage && (
        <div className="mt-4 text-center">
          <h4>Cropped Image Preview</h4>
          <img
            src={croppedImage}
            alt="Cropped"
            className="img-fluid rounded border shadow"
            style={{ maxHeight: "300px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
