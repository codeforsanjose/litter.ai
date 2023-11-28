import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteIcon from '@mui/icons-material/Delete';
import EggIcon from '@mui/icons-material/Egg';
import Modal from './SubmissionModal';
import '../../css/SuccessfulSubmission.css';

export default function SuccessfulSubmission({ type }) {
  const [category] = useState(type.category);
  const [modalOpen, setModalOpen] = useState(false);

  const separateString = (text, index) => (
    text.split('\n').map((line) => (
      <p key={index}>{line}</p>
    ))
  );
  return (
    <div className="category-container">
      <div className="category-wrapper">
        <h4>{type.category}</h4>
        {category === 'Recycle' && <RecyclingIcon data-testid="recycle-icon" className="category-icon" />}
        {category === 'Trash' && <DeleteIcon data-testid="trash-icon" className="category-icon" />}
        {category === 'Compost' && <EggIcon data-testid="compost-icon" className="category-icon" />}
        <h1>{type.name}</h1>
        <div className="category-short-desc">{separateString(type.description)}</div>
        <div className="category-buttons">
          <button
            type="button"
            data-testid="modal-learn-more"
            onClick={() => { setModalOpen(!modalOpen); }}
          >
            Learn More
          </button>
          <Link to="/capture"><button type="button">Capture another photo</button></Link>
          <Link to="/"><button className="button-home" type="button">Home</button></Link>
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
