import React, { useState } from 'react';
import ImageUploaded from './ImageUploaded';
import AddImage from './AddImage';
import '../../css/Capture.css';

export default function CameraCapture() {
  const [image, setImage] = useState(null);

  return (
    <div className="capture-container main-container">
      {image
        ? <ImageUploaded image={image} setImage={setImage} />
        : <AddImage setImage={setImage} />}
      <script src="ImageCapture.js" />
    </div>
  );
}
