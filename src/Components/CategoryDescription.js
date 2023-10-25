import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';
import '../CategoryDescription.css'

export default function CategoryDescription ({ type }) {

  return (
    <div className="category-container">
      <h4>Hooray!!!!</h4>
      <h4>You made it</h4>
      {/* <img src={category.icon} alt={category.alt} /> */}
      <RecyclingIcon className="category-icon" />
      <div>{type.description}</div>
      <div>
        <button>Learn More</button>
        <Link to="/capture"><button>Capture another photo</button></Link>
        <Link to="/"><button className="button-home">Home</button></Link>
      </div>
    </div>
  );
};
