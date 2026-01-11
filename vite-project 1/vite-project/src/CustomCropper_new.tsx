import React, { useEffect, useRef, useState } from "react";
import type { CropArea } from "./CropTypes";

interface CropperProps {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  // onZoomChange: (zoom: number) => void;
  onCropComplete: (area: CropArea, areaPixels: CropArea) => void;
}

const CustomCropper: React.FC<CropperProps> = ({ image, crop, zoom, aspect, onCropChange, onCropComplete }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

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

  // calculate after image load
  const handleImageLoad = () => {
    calculateCropFrame();
  };

  // recalc when zoom changes
  useEffect(() => {
    calculateCropFrame();
  }, [aspect]);

  //   Boundary clamp helper
  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  //   Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imgRef.current) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    const img = imgRef.current;

    const renderedWidth = img.clientWidth;
    const renderedHeight = img.clientHeight;

    const maxOffsetX = Math.max(0, (renderedWidth * zoom - cropSize.width) / 2);
    const maxOffsetY = Math.max(0, (renderedHeight * zoom - cropSize.height) / 2);

    const nextX = clamp(crop.x + dx, -maxOffsetX, maxOffsetX);
    const nextY = clamp(crop.y + dy, -maxOffsetY, maxOffsetY);

    onCropChange({ x: nextX, y: nextY });
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  //   Final Crop Pixels
  useEffect(() => {
    if (!imgRef.current || cropSize.width === 0) return;

    const img = imgRef.current;

    const renderedWidth = img.clientWidth;
    const renderedHeight = img.clientHeight;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const scaleX = naturalWidth / renderedWidth;
    const scaleY = naturalHeight / renderedHeight;

    const imageLeft = (renderedWidth * zoom) / 2 - cropSize.width / 2 - crop.x;

    const imageTop = (renderedHeight * zoom) / 2 - cropSize.height / 2 - crop.y;

    // convert screen → original image pixels
    const cropAreaPixels: CropArea = {
      x: Math.round((imageLeft / zoom) * scaleX),
      y: Math.round((imageTop / zoom) * scaleY),
      width: Math.round((cropSize.width / zoom) * scaleX),
      height: Math.round((cropSize.height / zoom) * scaleY),
    };

    onCropComplete(cropAreaPixels, cropAreaPixels);
  }, [crop, zoom, cropSize, onCropComplete]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#7F7F7F",
        // backgroundColor: "#000",
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
