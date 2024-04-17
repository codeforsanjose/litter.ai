import React, { useRef } from 'react';
import { CiCirclePlus } from 'react-icons/ci';

export default function AddImage({ setImage }) {
  const captureRef = useRef(null);

  const openCamera = () => {
    captureRef.current.click();
  };

  const handleImage = (e) => {
    const imageData = [e.target.files[0]];
    setImage({
      imagePreview: URL.createObjectURL(
        new Blob(imageData, { type: 'application/zip' }),
      ),
      imageFile: e.target.files[0],
    });
  };
  return (
    <>
      { /* Image has not been uploaded, opens device's camera or gives option to upload an image */}
      <div className="capture-top-section">
        <CiCirclePlus onClick={openCamera} className="capture-icon" data-testid="camera-plus" />
        {/* <label htmlFor="cameraFileInput">camera</label> */}
        <input
          type="file"
          accept="image/*"
          id="cameraFileInput"
          ref={captureRef}
          capture="environment"
          onChange={handleImage}
          style={{ display: 'none' }}
          data-testid="camera-input"
        />
        <div className="capture-icon-bg" />
        <h1>Take a photo of the item</h1>
        <p>
          <span>Click on the icon to open up your device&#x27;s camera.</span>
          <br />
          <span>Please take the photo in portrait mode for best results.</span>
          <br />
          <br />
          <span><strong>This is a beta application, still under development.</strong></span>
        </p>
      </div>
    </>
  );
}
