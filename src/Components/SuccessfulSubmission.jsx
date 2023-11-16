import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteIcon from '@mui/icons-material/Delete';
import EggIcon from '@mui/icons-material/Egg';
import '../css/CategoryDescription.css';

export default function SuccessfulSubmission({ type }) {
  const [category] = useState(type.category);
  return (
    <div className="category-container">
      <h4>{type.category}</h4>
      {category === 'Recycle' && <RecyclingIcon data-testid="recycle-icon" className="category-icon" />}
      {category === 'Trash' && <DeleteIcon data-testid="trash-icon" className="category-icon" />}
      {category === 'Compost' && <EggIcon data-testid="compost-icon" className="category-icon" />}
      <h1>{type.name}</h1>
      <p>{type.description}</p>
      <div className="category-buttons">
        <Link to="/learn-more"><button type="button">Learn More</button></Link>
        <Link to="/capture"><button type="button">Capture another photo</button></Link>
        <Link to="/"><button className="button-home" type="button">Home</button></Link>
      </div>
    </div>
  );
}
