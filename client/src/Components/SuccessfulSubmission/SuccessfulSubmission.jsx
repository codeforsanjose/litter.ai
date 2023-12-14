import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PiPlantBold } from 'react-icons/pi';
import { FaRecycle, FaRegTrashAlt } from 'react-icons/fa';
import Modal from './SubmissionModal';
import '../../css/SuccessfulSubmission.css';

export default function SuccessfulSubmission({ type }) {
  const [category] = useState(type.category);
  const [modalOpen, setModalOpen] = useState(false);

  const separateString = (text) => (
    text.split('\n').map((line) => (
      <p key={uuid()}>{line}</p>
    ))
  );
  return (
    <div className="category-container main-container">
      <div className="category-wrapper">
        <h4>{type.category}</h4>
        {category === 'Recycle' && <FaRecycle className="category-icon" />}
        {category === 'Trash' && <FaRegTrashAlt className="category-icon" />}
        {category === 'Compost' && <PiPlantBold className="category-icon" />}
        <h1>{type.name}</h1>
        <div className="category-short-desc">{separateString(type.description)}</div>
        <div className="category-buttons lower-buttons">
          <button
            type="button"
            data-testid="modal-learn-more"
            onClick={() => { setModalOpen(!modalOpen); }}
          >
            Learn More
          </button>
          <Link to="/capture">
            <button type="button">
              Capture another photo
            </button>
          </Link>
          <Link to="/">
            <button className="button-home" type="button">
              Home
            </button>
          </Link>
        </div>
      </div>
      {modalOpen && (
        <>
          <div className="category-modal">
            <Modal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              separateString={separateString}
            />
          </div>
          <div
            className="modal-background"
            role="presentation"
            onClick={() => { setModalOpen(!modalOpen); }}
            onKeyDown={() => { setModalOpen(!modalOpen); }}
          />
        </>
      )}
    </div>
  );
}
