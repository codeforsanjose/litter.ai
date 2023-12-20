import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PiPlantBold } from 'react-icons/pi';
import { FaRecycle, FaRegTrashAlt } from 'react-icons/fa';
import SubmissionModal from './SubmissionModal';
import categoryData from '../../MockData/mockCategoryData';
import '../../css/SuccessfulSubmission.css';

export default function SuccessfulSubmission() {
  const { category } = useParams();
  const [type] = useState(categoryData[category]);
  const [categoryName] = useState(type.category);
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
        {categoryName === 'Recycle' && <FaRecycle className="category-icon" data-testid="recycle-icon" />}
        {categoryName === 'Trash' && <FaRegTrashAlt className="category-icon" />}
        {categoryName === 'Compost' && <PiPlantBold className="category-icon" />}
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
            <SubmissionModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              separateString={separateString}
              type={type}
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
