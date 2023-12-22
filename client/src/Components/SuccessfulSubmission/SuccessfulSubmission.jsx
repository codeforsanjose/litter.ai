/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import SubmissionModal from './SubmissionModal';
import Icons from '../Icons';
import categoryData from '../../MockData/mockCategoryData';
import '../../css/SuccessfulSubmission.css';

export default function SuccessfulSubmission() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [type] = useState(categoryData[category]);
  const [categoryName] = useState(category);
  const [modalOpen, setModalOpen] = useState(false);

  const separateString = (text) => (
    text.split('\n').map((line) => (
      <p key={uuid()}>{line}</p>
    ))
  );

  useEffect(() => {
    if (!categoryData[category]) {
      navigate('/404', { replace: true });
    }
  }, [category, navigate]);

  return (
    <>
      {type
      && (
      <div className="category-container main-container">
        <div className="category-wrapper">
          <h4>{type.category}</h4>
          <Icons name={categoryName} classname="category-icon" />
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
      )}
    </>
  );
}
