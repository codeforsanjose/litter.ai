import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineWrongLocation } from 'react-icons/md';
import '../css/PageNotFound.css';

export default function PageNotFound() {
  return (
    <div className="PNF-container main-container">
      <div className="PNF-404">
        <MdOutlineWrongLocation className="PNF-icon" />
        <h1>4&nbsp;&nbsp;&nbsp;&nbsp;4</h1>
      </div>
      <h3>Your litter will have to be recycled elsewhere.</h3>
      <div className="PNF-buttons lower-buttons">
        <Link to="/">
          <button type="button">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
