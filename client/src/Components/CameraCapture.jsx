import React, { useState, useRef } from 'react';

export default function CameraCapture() {
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const handleImage = (e) => {
    const imageData = [e.target.files[0]];
    setImage({
      imagePreview: URL.createObjectURL(new Blob(imageData, { type: 'application/zip' })),
      imageFile: e.target.files[0],
    });
  };
  const showImageData = () => {
    console.log('Image Data: ', image);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        id="cameraFileInput"
        capture="environment"
        onChange={handleImage}
      />
      <button type="button" onClick={() => inputRef.current.click()}>Confirm</button>
      <button type="button" onClick={showImageData}>Show image data</button>
      {image && <img id="pictureFromCamera" alt="" src={image.imagePreview} />}
      <script src="ImageCapture.js" />
    </div>
  );
}
