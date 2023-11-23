import React from 'react';
import mockCategoryData from '../../MockData/mockCategoryData';

export default function SubmissionModal({ modalOpen, setModalOpen, separateString }) {
  const mockDescription = mockCategoryData.plastic.desc_long;
  const mockName = mockCategoryData.plastic.name;
  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <h2>{mockName}</h2>
        <button
          type="button"
          onClick={() => { setModalOpen(!modalOpen); }}
        >
          X
        </button>
        <p className="modal-text">{separateString(mockDescription)}</p>
        <button type="button" className="modal-got-it-button">Got it</button>
      </div>
    </div>
  );
}
