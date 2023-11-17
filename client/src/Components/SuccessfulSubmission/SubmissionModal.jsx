import React from 'react';
import mockCategoryData from '../../MockData/mockCategoryData';

export default function SubmissionModal({ modalOpen, setModalOpen }) {
  const mockDescription = mockCategoryData.plastic.desc_long;
  const mockName = mockCategoryData.plastic.name;
  return (
    <div>
      {modalOpen && (
        <div className="modal-container">
          <h2>{mockName}</h2>
          <button
            type="button"
            onClick={() => { setModalOpen(!modalOpen); }}
          >
            X
          </button>
          <p className="modal-text">{mockDescription}</p>
        </div>
      )}
    </div>
  );
}
