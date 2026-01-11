import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function App() {
  const [image, setImage] = useState<string>();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string>();

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event: any) => {
    const url = URL.createObjectURL(event.target.files[0]);
    setImage(url);
    setCroppedImage(undefined);
  };

  // Function to actually crop and return final image
  const getCroppedImg = async () => {
    if (!image || !croppedAreaPixels) return;

    const imageElement = await createImage(image);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const { width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
      imageElement,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      width,
      height,
      0,
      0,
      width,
      height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setCroppedImage(base64Image);
  };

  // Helper to load image
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // for CORS
      image.src = url;
    });

  return (
    <div className="container p-3">
      <h2 className="mb-2 bg-secondary text-white p-2 rounded">
        Upload and Crop Image
      </h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {image && !croppedImage && (
        <div>
          {/* Cropper */}
          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3} // you can change aspect ratio
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Zoom Slider */}
          <div className="mt-3">
            <label className="form-label">Zoom</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="form-range"
            />
          </div>

          {/* Crop Button */}
          <button
            className="btn btn-primary mt-2"
            onClick={getCroppedImg}
          >
            Crop Image
          </button>
        </div>
      )}

      {/* Cropped Image Preview */}
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
