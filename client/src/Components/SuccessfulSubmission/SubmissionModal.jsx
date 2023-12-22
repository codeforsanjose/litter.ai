import React from 'react';
import parse from 'html-react-parser';

export default function SubmissionModal({
  modalOpen,
  setModalOpen,
  type,
}) {
  return (
    <div className="modal-container" data-testid="modal">
      <div className="modal-container-top">
        <h2>{type.name}</h2>
        <button
          type="button"
          className="modal-x-button"
          onClick={() => { setModalOpen(!modalOpen); }}
        >
          &#x2715;
        </button>
      </div>
      <hr />
      <div className="modal-text">{parse(type.desc_long)}</div>
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
