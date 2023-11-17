import React from 'react';
import mockCategoryData from '../../MockData/mockCategoryData';

export default function SubmissionModal({ modalOpen, setModalOpen }) {
  const mockData = mockCategoryData.plastic.desc_long;
  return (
    <div>
      {modalOpen && (
        <div className="modal-container">
          <button type="button" onClick={() => { setModalOpen(!modalOpen); }}>X</button>
          <p>{mockData}</p>
        </div>
      )}
    </div>
  );
}
