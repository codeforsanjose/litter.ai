import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';

export default function CategoryDescription ({ type }) {

  return (
    <div>
      <h4>Hooray!!!!</h4>
      <h4>You made it</h4>
      {/* <img src={category.icon} alt={category.alt} /> */}
      <RecyclingIcon />
      <div>{type.description}</div>
      <button>Learn More</button>
      <Link to="/capture"><button>Capture another photo</button></Link>
      <Link to="/"><button>Home</button></Link>
    </div>
  );
};
