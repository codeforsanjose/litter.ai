import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';
import Loading from '../Loading';
import { fetchImageToAI } from '../../utils/fetchUserData';

export default function ImageUploaded({
  image,
  setImage,
}) {
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [categoryPrediction, setCategoryPrediction] = useState('');
  const [categoryCorrected, setCategoryCorrected] = useState(null);
  const [imageConfidence, setImageConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  // Submit image to AI and returns predicted category and confidence level
  const submitImageToAI = async () => {
    setLoading(true);
    const response = await fetchImageToAI(image.imageFile);
    setCategoryPrediction(response.class);
    setImageConfidence(Math.trunc(response.confidence * 100));
    setImageSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="capture-image-wrapper">
      <div className="capture-image-preview">
        <div className="image-x-button-wrapper">
          <button
            type="button"
            className="image-x-button"
            aria-label="image-x-button"
            onClick={() => { setImage(null); }}
          >
            &#x2715;
          </button>
        </div>
        <img alt="" src={image.imagePreview} className="capture-image" data-testid="image-preview" />
        { loading
        && (
          // Loading spinner while data is being fetched
          <div className="capture-loading">
            <Loading loading={loading} />
          </div>
        )}
      </div>
      {/* Image has been uploaded and submitted to the AI */}
      {!imageSubmitted
        ? (
          // Image preview before sending to the AI
          <div className="capture-submit-button lower-buttons">
            <button
              type="button"
              onClick={submitImageToAI}
            >
              Submit
            </button>
          </div>
        )
        : (
          <div className="capture-classify">
            <h1>Classify This Item</h1>
            <div className="capture-dropdown">
              <Dropdown
                setCategoryCorrected={setCategoryCorrected}
                categoryPrediction={categoryPrediction}
                aria-label="image-dropdown"
              />
            </div>
            <p>
              We are&nbsp;
              <strong>
                {imageConfidence}
                %&nbsp;
              </strong>
              confident that this is&nbsp;
              <strong>{categoryPrediction}</strong>
              .
              <br />
              <br />
              {/* Text changes based on if the AI prediction is not the same the users */}
              {(
                categoryCorrected
                && categoryCorrected !== categoryPrediction)
                ? (
                  <span>
                    You chose&nbsp;
                    <strong>{categoryCorrected}</strong>
                    .
                  </span>
                )
                : <span>If it is not, please select the correct category from the dropdown.</span>}
            </p>
            <div className="capture-confirm-button lower-buttons">
              <Link to={
                categoryCorrected
                  ? `/success/${categoryCorrected}`
                  : `/success/${categoryPrediction}`
                }
              >
                <button type="button">
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        )}
    </div>
  );
}
