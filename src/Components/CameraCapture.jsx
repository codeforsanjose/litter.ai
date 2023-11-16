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
        <img id="pictureFromCamera" />
      <script src="ImageCapture.js"></script>
    </div>
  )
}

export default CameraCapture;
