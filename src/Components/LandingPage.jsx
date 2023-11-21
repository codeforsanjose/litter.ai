import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to Litter.ai</h1>
      <p>With just a click, sort your garbage and save the world</p>
      <div style={{
        position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '200px',
      }}
      >
        <button type="button">Learn More</button>
        <Link to="/capture">
          <button type="button">Capture Image</button>
        </Link>
      </div>
    </div>
  );
}
