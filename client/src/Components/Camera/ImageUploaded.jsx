import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';

export default function ImageUploaded({
  image,
  setImage,
}) {
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [imageCategory, setImageCategory] = useState('glass');

  return (
    <div className="capture-image-wrapper">
      <div className="capture-image-preview">
        <button
          type="button"
          className="image-x-button"
          onClick={() => { setImage(null); }}
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
        : ( // Image preview before sending to the AI
          <div className="capture-submit-button lower-buttons">
            <button
              type="button"
              onClick={() => { setImageSubmitted(true); }}
            >
              Submit
            </button>
          </div>
        )}
    </div>
  );
}
