import React from 'react';
import mockCategoryData from '../../MockData/mockCategoryData';

export default function SubmissionModal({ modalOpen, setModalOpen, separateString }) {
  const mockDescription = mockCategoryData.plastic.desc_long;
  const mockName = mockCategoryData.plastic.name;
  return (
    <div className="modal-container" data-testid="modal">
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
      <div className="modal-text">{separateString(mockDescription)}</div>
      <button
        type="button"
        className="modal-got-it-button"
        data-testid="modal-got-it-button"
        onClick={() => { setModalOpen(!modalOpen); }}
      >
        Got it
      </button>
    </div>
  );
}
