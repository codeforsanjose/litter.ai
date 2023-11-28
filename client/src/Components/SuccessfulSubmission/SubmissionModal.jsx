import React from 'react';
import mockCategoryData from '../../MockData/mockCategoryData';

export default function SubmissionModal({ modalOpen, setModalOpen, separateString }) {
  const mockDescription = mockCategoryData.plastic.desc_long;
  const mockName = mockCategoryData.plastic.name;
  return (
    <div className="modal-container">
      <div className="modal-container-top">
        <h2>{mockName}</h2>
        <button
          type="button"
          className="modal-x-button"
          onClick={() => { setModalOpen(!modalOpen); }}
        >
          X
        </button>
      </div>
      <hr />
      <p className="modal-text">{separateString(mockDescription)}</p>
      <button
        type="button"
        className="modal-got-it-button"
        onClick={() => { setModalOpen(!modalOpen); }}
      >
        Got it
      </button>
    </div>
  );
}
