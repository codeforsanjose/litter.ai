import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoHomeOutline,
  IoCameraOutline,
  IoPodiumOutline,
  IoPersonOutline,
  // IoHome,
  // IoCamera,
  // IoPodium,
  // IoPerson
} from 'react-icons/io5';
import '../css/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-container main-container">
      <ul className="navbar-wrapper">
        <li>
          <Link to="/">
            <IoHomeOutline className="navbar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/capture">
            <IoCameraOutline className="navbar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/leaderboard">
            <IoPodiumOutline className="navbar-icon" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <IoPersonOutline className="navbar-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
