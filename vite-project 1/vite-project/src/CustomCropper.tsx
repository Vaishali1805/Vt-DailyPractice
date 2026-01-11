import React, { useEffect, useRef, useState } from "react";
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

const CustomCropper: React.FC<CropperProps> = ({
  image,
  crop,
  zoom,
  aspect,
  onCropChange,
  onZoomChange,
  onCropComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({
    mouseX: 0,
    mouseY: 0,
    cropX: 0,
    cropY: 0,
  });

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      cropX: crop.x,
      cropY: crop.y,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    onCropChange({
      x: dragStart.current.cropX + (e.clientX - dragStart.current.mouseX),
      y: dragStart.current.cropY + (e.clientY - dragStart.current.mouseY),
    });
  };

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const img = imgRef.current;

    const cropFrameWidth = container.width * 0.8;
    const cropFrameHeight = cropFrameWidth / aspect;

    // image rendered size
    const renderedImageWidth = container.width * zoom;
    const renderedImageHeight = container.height * zoom;

    // scale factor: rendered → natural
    const scaleX = img.naturalWidth / renderedImageWidth;
    const scaleY = img.naturalHeight / renderedImageHeight;

    const offsetX = (renderedImageWidth - cropFrameWidth) / 2 - crop.x;
    const offsetY = (renderedImageHeight - cropFrameHeight) / 2 - crop.y;

    const croppedAreaPixels: CropArea = {
      x: Math.max(0, offsetX * scaleX),
      y: Math.max(0, offsetY * scaleY),
      width: cropFrameWidth * scaleX,
      height: cropFrameHeight * scaleY,
    };

    onCropComplete(
      { x: 0, y: 0, width: cropFrameWidth, height: cropFrameHeight },
      croppedAreaPixels
    );
  }, [crop, zoom, aspect, onCropComplete]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-dark"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <img
        ref={imgRef}
        src={image}
        alt="crop"
        draggable={false}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `
            translate(-50%, -50%)
            translate(${crop.x}px, ${crop.y}px)
            scale(${zoom})
          `,
          transformOrigin: "center",
          userSelect: "none",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={onMouseDown}
      />

      {/* Crop Frame */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "80%",
          aspectRatio: `${aspect}`,
          transform: "translate(-50%, -50%)",
          border: "2px solid #fff",
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CustomCropper;
