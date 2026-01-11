import { useRef, useState, useEffect } from "react";
import type { CropAreaPixels } from "./CropTypes";

interface CropperProps {
  image: string;
  aspect?: number;
  onCropComplete: (areaPixels: CropAreaPixels) => void;
}

const Cropper: React.FC<CropperProps> = ({
  image,
  aspect = 4 / 3,
  onCropComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<CropAreaPixels>({
    x: 50,
    y: 50,
    width: 200,
    height: 200 / aspect,
  });

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    onCropComplete(crop);
  }, [crop, onCropComplete]);

  const startDrag = () => setDragging(true);
  const stopDrag = () => setDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current || !imgRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const img = imgRef.current;

    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;

    const x =
      (e.clientX - containerRect.left - crop.width / 2) * scaleX;
    const y =
      (e.clientY - containerRect.top - crop.height / 2) * scaleY;

    setCrop((prev) => ({
      ...prev,
      x: Math.max(0, x),
      y: Math.max(0, y),
    }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <img
        ref={imgRef}
        src={image}
        alt="Crop"
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          userSelect: "none",
        }}
      />

      {/* Crop box */}
      <div
        onMouseDown={startDrag}
        style={{
          position: "absolute",
          left: crop.x / (imgRef.current?.naturalWidth || 1) * 100 + "%",
          top: crop.y / (imgRef.current?.naturalHeight || 1) * 100 + "%",
          width:
            crop.width /
              (imgRef.current?.naturalWidth || 1) *
              100 +
            "%",
          height:
            crop.height /
              (imgRef.current?.naturalHeight || 1) *
              100 +
            "%",
          border: "2px solid #fff",
          background: "rgba(0,0,0,0.3)",
          cursor: "move",
        }}
      />
    </div>
  );
};

export default Cropper;
