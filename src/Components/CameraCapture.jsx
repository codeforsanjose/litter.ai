import React from 'react';

function CameraCapture() {
  return (
    <div>
      <input
        type="file"
        accept=".jpg, .jpeg, .img, .HEIC"
        id="cameraFileInput"
        capture="environment"
      />
      <img id="pictureFromCamera" alt="" />
      <script src="ImageCapture.js" />
    </div>
  );
}

export default CameraCapture;
