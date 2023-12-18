import React from 'react';
import { TbWorldHeart } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import '../css/Landing.css';

export default function LandingPage() {
  return (
    <div className="landing-container main-container">
      <TbWorldHeart className="landing-logo" />
      <div className="landing-bottom-section">
        <div className="landing-text">
          <h1>Welcome to Litter.ai</h1>
          <p>With just a click, sort your garbage and save the world.</p>
        </div>
        <div className="landing-buttons lower-buttons">
          <Link to="/capture">
            <button type="button" className="landing-capture-button">
              Capture Picture
            </button>
          </Link>
          <Link to="/register">
            <button type="button">
              Sign Up
            </button>
          </Link>
          <p>Already have an account?</p>
          <Link to="/login">
            <a href="/login">
              Log in
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
