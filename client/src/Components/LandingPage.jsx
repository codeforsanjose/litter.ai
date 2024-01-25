import React from 'react';
// import { PiFlowerTulipThin } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import '../css/Landing.css';
import LogoWhite from '../images/Logo_large_white.png';

export default function LandingPage({ user }) {
  return (
    <>
      <div className="landing-container main-container">
        <div className="landing-top-section">
          <img src={LogoWhite} alt="litterai-logo-white" className="landing-logo" data-testid="litterai-logo" />
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
          </div>
        </div>
        <div className="landing-bottom-section">
          <div className="landing-buttons lower-buttons">
            { !user
              && (
                <>
                  <p className="landing-signup-description">Create an account to track your statistics and compete against others!</p>
                  <Link to="/register">
                    <button type="button" className="landing-secondary-button">
                      Sign Up
                    </button>
                  </Link>
                  <div className="landing-login-text">
                    <p>Already have an account?</p>
                    <Link to="/login">
                      Log in
                    </Link>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
      <div className="landing-full-bg" />
    </>
  );
}
