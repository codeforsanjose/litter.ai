import React from 'react';
import { PiFlowerTulipThin } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import '../css/Landing.css';

export default function LandingPage() {
  return (
    <>
      <div className="landing-container main-container">
        <PiFlowerTulipThin className="landing-logo" />
        <div className="landing-bottom-section">
          <div className="landing-text">
            <h1>Welcome to LitterSort</h1>
            <p>With just a photo, sort your garbage and save the world.</p>
          </div>
          <div className="landing-buttons lower-buttons">
            <Link to="/capture">
              <button type="button" className="landing-capture-button">
                Capture Picture
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="landing-register-button">
                Sign Up
              </button>
            </Link>
            <div className="landing-login-text">
              <p>Already have an account?</p>
              <Link to="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-full-bg" />
    </>
  );
}
