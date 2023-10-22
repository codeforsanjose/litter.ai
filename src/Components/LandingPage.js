import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';
import Image from '../landingPage.png';

function LandingPage () {
    return (
        <div className='landing-page-container'>
            <img src={Image} />
            <div className="landing-page-text">
                <h1 className="pageTitle">Welcome to Litter.ai</h1>
                <p className="pageDescription">With just a click, sort your garbage and save the world</p>
            </div>
            <div className="landing-page-buttons">
                <button className="button">Learn More</button>
                <br></br><br></br>
                <Link to="/capture">
                    <button className="button">Capture Image</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;