import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetchLogOut } from '../utils/fetchUserData';

export default function Register({ user, setUser }) {
  const handleCheck = () => {
    const token = Cookies.get('authToken');
    const userData = Cookies.get('username');
    console.log('user: ', user);
    console.log('token: ', token);
    console.log('userCookie: ', userData);
  };

  return (
    <div className="register-container main-container">
      <div>Registration page</div>
      <div className="lower-buttons">
        <button
          type="button"
          onClick={handleCheck}
        >
          Test Login Data
        </button>
        <button
          type="button"
          onClick={async () => {
            await fetchLogOut();
            await setUser(null);
          }}
        >
          Log out
        </button>
        <Link to="/leaderboard">
          <button type="button">Leaderboard</button>
        </Link>
        <Link to="/profile">
          <button type="button">Profile</button>
        </Link>
        <Link to="/">
          <button className="button-home" type="button">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
