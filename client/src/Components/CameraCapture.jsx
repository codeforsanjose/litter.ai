import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import Dropdown from './Dropdown';
import '../css/Capture.css';

export default function CameraCapture() {
  const [image, setImage] = useState(null);
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [imageCategory, setImageCategory] = useState('glass');
  const captureRef = useRef(null);

  const openCamera = () => {
    captureRef.current.click();
  };

  const removePhoto = () => {
    setImage(null);
  };

  const handleImage = (e) => {
    const imageData = [e.target.files[0]];
    setImage({
      imagePreview: URL.createObjectURL(new Blob(imageData, { type: 'application/zip' })),
      imageFile: e.target.files[0],
    });
  };

  const handlePhotoSubmit = () => {
    setImageSubmitted(true);
  };

  return (
    <div className="capture-container main-container">
      {/* Image has been uploaded; preview the image */}
      {image
        ? (
          <div className="capture-image-wrapper">
            <div className="capture-image-preview">
              <button
                type="button"
                className="image-x-button"
                onClick={removePhoto}
              >
                &#x2715;
              </button>
              <img alt="" src={image.imagePreview} className="capture-image" />
            </div>
            {/* Image has been uploaded and submitted to the AI */}
            {imageSubmitted
              ? (
                <div className="capture-classify">
                  <h1>Help us classify</h1>
                  <div className="capture-dropdown">
                    <Dropdown
                      setImageCategory={setImageCategory}
                      imageCategory={imageCategory}
                    />
                  </div>
                  <p>
                    Is this&nbsp;
                    {imageCategory}
                    ?
                    If it is not,
                    please select the correct category from the dropdown.
                  </p>
                  <div className="capture-confirm-button lower-buttons">
                    <Link to={`/success/${imageCategory}`}>
                      <button type="button">
                        Confirm
                      </button>
                    </Link>
                  </div>
                </div>
              )
              : (
                <div className="capture-submit-button lower-buttons">
                  <button
                    type="button"
                    onClick={handlePhotoSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}
          </div>
        )
        /* Image has not been uploaded, opens device's camera or gives option to upload an image */
        : (
          <>
            <div className="capture-top-section">
              <CiCirclePlus onClick={openCamera} className="capture-icon" />
              <input
                type="file"
                accept="image/*"
                id="cameraFileInput"
                ref={captureRef}
                capture="environment"
                onChange={handleImage}
                style={{ display: 'none' }}
              />
              <div className="capture-icon-bg" />
              <h1>Take a photo of the item</h1>
              <p>
                <span>Click on the camera to open up your device&#x27;s camera.</span>
                <br />
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
