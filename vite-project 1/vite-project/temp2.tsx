import React, { useRef, useState, useEffect } from "react";
import type { CropArea } from "./CropTypes";

interface CropperProps {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (area: CropArea, areaPixels: CropArea) => void;
}

const CustomCropper: React.FC<CropperProps> = ({ image, crop, zoom, aspect, onCropChange }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  /* ---------------- crop frame calculation ---------------- */

  const calculateCropFrame = () => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const imageWidth = img.clientWidth;
    const imageHeight = img.clientHeight;

    let cropWidth = imageWidth;
    let cropHeight = cropWidth / aspect;

    if (cropHeight > imageHeight) {
      cropHeight = imageHeight;
      cropWidth = cropHeight * aspect;
    }

    setCropSize({ width: cropWidth, height: cropHeight });
  };

  const handleImageLoad = () => {
    calculateCropFrame();
  };

  useEffect(() => {
    calculateCropFrame();
  }, [zoom, aspect]);

  /* ---------------- drag handlers ---------------- */

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    onCropChange({
      x: crop.x + dx,
      y: crop.y + dy,
    });

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /* ---------------- render ---------------- */

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      {/* IMAGE */}
      <img
        ref={imgRef}
        src={image}
        alt="crop-source"
        draggable={false}
        onLoad={handleImageLoad}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${crop.x}px, ${crop.y}px) scale(${zoom})`,
          maxWidth: "100%",
          maxHeight: "100%",
          userSelect: "none",
        }}
      />

      {/* CROP FRAME */}
      {cropSize.width > 0 && cropSize.height > 0 && (
        <div
          style={{
            position: "absolute",
            width: cropSize.width,
            height: cropSize.height,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #fff",
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default CustomCropper;

//old.tsx
const imageLeft = renderedWidth / 2 - cropSize.width / 2 - crop.x;

const imageTop = renderedHeight / 2 - cropSize.height / 2 - crop.y;

const cropAreaPixels: CropArea = {
  x: Math.round(imageLeft * scaleX),
  y: Math.round(imageTop * scaleY),
  width: Math.round(cropSize.width * scaleX),
  height: Math.round(cropSize.height * scaleY),
};

const scaledImageWidth = renderedWidth * zoom;
const scaledImageHeight = renderedHeight * zoom;

// const scaledImageWidth = img.clientWidth * zoom;
// const scaledImageHeight = img.clientHeight * zoom;

const maxOffsetX = Math.max(0, (scaledImageWidth - cropSize.width) / 2);
const maxOffsetY = Math.max(0, (scaledImageHeight - cropSize.height) / 2);
