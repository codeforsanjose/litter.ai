import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoHomeOutline,
  IoCameraOutline,
  IoPodiumOutline,
  IoPersonOutline,
  IoHome,
  IoCamera,
  IoPodium,
  IoPerson,
} from 'react-icons/io5';
import '../css/Navbar.css';

export default function Navbar({ activePage, setActivePage }) {
  const changeActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <nav className="navbar-container main-container">
      <ul className="navbar-wrapper">
        <li>
          <Link to="/" onClick={() => changeActivePage('home')}>
            {activePage === 'home'
              ? <IoHome className="navbar-icon navbar-home-icon" />
              : <IoHomeOutline className="navbar-icon navbar-home-icon" />}
          </Link>
        </li>
        <li>
          <Link to="/capture" onClick={() => changeActivePage('capture')}>
            {activePage === 'capture'
              ? <IoCamera className="navbar-icon navbar-camera-icon" />
              : <IoCameraOutline className="navbar-icon navbar-camera-icon" />}
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" onClick={() => changeActivePage('leaderboard')}>
            {activePage === 'leaderboard'
              ? <IoPodium className="navbar-icon navbar-lb-icon" />
              : <IoPodiumOutline className="navbar-icon navbar-lb-icon" />}
          </Link>
        </li>
        <li>
          <Link to="/profile" onClick={() => changeActivePage('profile')}>
            {activePage === 'profile'
              ? <IoPerson className="navbar-icon navbar-profile-icon" />
              : <IoPersonOutline className="navbar-icon navbar-profile-icon" />}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
