import React, { useState, useRef } from 'react';
import { IoCameraOutline } from 'react-icons/io5';

export default function CameraCapture() {
  const [image, setImage] = useState(null);
  const captureRef = useRef(null);

  const openCamera = () => {
    captureRef.current.click();
  };

  const handleImage = (e) => {
    const imageData = [e.target.files[0]];
    setImage({
      imagePreview: URL.createObjectURL(new Blob(imageData, { type: 'application/zip' })),
      imageFile: e.target.files[0],
    });
  };
  const handlePhotoSubmit = () => {
    console.log('Image Data: ', image);
  };

  return (
    <div className="capture-container main-container">
      <IoCameraOutline onClick={openCamera} />
      <input
        type="file"
        accept="image/*"
        id="cameraFileInput"
        ref={captureRef}
        capture="environment"
        onChange={handleImage}
        style={{ display: 'none' }}
      />
      <button type="button" onClick={handlePhotoSubmit}>Confirm</button>
      <div className="capture-image-preview">
        {image && <img id="pictureFromCamera" alt="" src={image.imagePreview} />}
      </div>
      <script src="ImageCapture.js" />
    </div>
  );
}
