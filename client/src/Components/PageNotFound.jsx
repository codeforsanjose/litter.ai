import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineWrongLocation } from 'react-icons/md';
import '../css/PageNotFound.css';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="PNF-container main-container">
      <div className="PNF-404">
        <MdOutlineWrongLocation className="PNF-icon" data-testid="PNF-icon" />
        <h1>4&nbsp;&nbsp;&nbsp;&nbsp;4</h1>
      </div>
      <h3>Your litter will have to be recycled elsewhere.</h3>
      <div className="PNF-buttons lower-buttons">
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
