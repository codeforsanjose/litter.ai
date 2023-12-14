import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineWrongLocation } from 'react-icons/md';
import '../css/PageNotFound.css';

export default function PageNotFound() {
  return (
    <div className="PNF-container">
      <MdOutlineWrongLocation />
      <h1>404</h1>
      <h3>Your litter can be recycled somewhere else.</h3>
      <div className="profile-buttons">
        <Link to="/">
          <button className="button-home" type="button">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
