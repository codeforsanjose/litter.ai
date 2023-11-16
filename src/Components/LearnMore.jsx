import React from 'react';
import { Link } from 'react-router-dom';

export default function LearnMore() {
  return (
    <div>
      <p>Thank you for learning more.</p>
      <Link to="/capture"><button type="button">Capture another photo</button></Link>
      <Link to="/"><button className="button-home" type="button">Home</button></Link>
    </div>
  );
}
