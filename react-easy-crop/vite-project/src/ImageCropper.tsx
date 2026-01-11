import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

interface ImageCropperModalProps {
  image: string;                // input image
  aspect?: number;              // aspect ratio (default 4/3)
  onCropDone: (croppedImg: string) => void; // return cropped image
  onClose: () => void;          // close modal without cropping
}

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ image, aspect = 4 / 3, onCropDone, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
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
    onCropDone(base64Image); // send back to parent
  };

  // Helper to load image
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (err) => reject(err));
      img.setAttribute("crossOrigin", "anonymous");
      img.src = url;
    });

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crop Image</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Cropper */}
            <div style={{ position: "relative", width: "100%", height: "400px" }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
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
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={getCroppedImage}>Crop & Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
