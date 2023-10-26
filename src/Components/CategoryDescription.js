import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteIcon from '@mui/icons-material/Delete';
import EggIcon from '@mui/icons-material/Egg';
import '../CategoryDescription.css'

export default function CategoryDescription ({ type }) {
  const [category] = useState(type.name);

  return (
    <div className="category-container">
      <h4>Thank you!</h4>
      {category === 'Recycle' && <RecyclingIcon className="category-icon" />}
      {category === 'Trash' && <DeleteIcon className="category-icon" />}
      {category === 'Compost' && <EggIcon className="category-icon" />}
      <h1>{type.name}</h1>
      <p>{type.description}</p>
      <div className="category-buttons">
      <Link to="/learn-more"><button>Learn More</button></Link>
        <Link to="/capture"><button>Capture another photo</button></Link>
        <Link to="/"><button className="button-home">Home</button></Link>
      </div>
    </div>
  );
};
