import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoCameraOutline } from 'react-icons/io5';
import '../css/Capture.css';

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
      {image
        ? (
          <>
            <div className="capture-image-wrapper">
              <img alt="" src={image.imagePreview} className="capture-image" />
            </div>
            <button type="button" onClick={handlePhotoSubmit}>Submit photo</button>
          </>
        )
        : (
          <>
            <div className="capture-top-section">
              <IoCameraOutline onClick={openCamera} className="capture-camera-icon" />
              <input
                type="file"
                accept="image/*"
                id="cameraFileInput"
                ref={captureRef}
                capture="environment"
                onChange={handleImage}
                style={{ display: 'none' }}
              />
              <div className="capture-camera-bg" />
              <h1>Take a photo of the item</h1>
              <p>
                <span>Click on the camera to open up your device&#x27;s camera.</span>
                <span>Please take the photo in portrait mode for best results.</span>
              </p>
            </div>
            <div className="capture-buttons lower-buttons">
              <Link to="/">
                <button className="button-home" type="button">
                  Home
                </button>
              </Link>
            </div>
          </>
        )}
      <script src="ImageCapture.js" />
    </div>
  );
}
