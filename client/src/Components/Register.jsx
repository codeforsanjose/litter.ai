import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { GrLocation } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa';
import { FaAngleLeft, FaRegEnvelope } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { PiUserListBold } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRegister, fetchLogOut } from '../utils/fetchUserData';
import '../css/LoginSignUp.css';

export default function Register({ user, setUser }) {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    zipCode: '',
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetchRegister(registerData);
      setUser(response.user.displayUsername);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  const handleCheck = () => {
    const token = Cookies.get('authToken');
    const userData = Cookies.get('username');
    console.log('user: ', user);
    console.log('token: ', token);
    console.log('userCookie: ', userData);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-signup-container main-container">
      <div className="login-signup-header">
        <button className="back-button" type="button" aria-label="Back" onClick={goBack}>
          <FaAngleLeft />
        </button>
        <div className="login-signup-header-text">
          <h3>Create a New Account</h3>
          <p>Join us in making a cleaner world</p>
        </div>
      </div>

      <form className="login-signup-form">
        <div className="login-signup-first-name">
          <PiUserListBold className="login-signup-icon" />
          <input
            type="text"
            id="first-name"
            aria-label="First Name"
            placeholder="First Name"
            value={registerData.firstName}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <br className="login-signup-form-break" />
        <div className="login-signup-last-name">
          <PiUserListBold className="login-signup-icon" />
          <input
            type="text"
            id="last-name"
            aria-label="Last Name"
            placeholder="Last Name"
            value={registerData.lastName}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <br className="login-signup-form-break" />
        <div className="login-signup-email">
          <FaRegEnvelope className="login-signup-icon" />
          <input
            type="email"
            id="email"
            aria-label="Email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <br className="login-signup-form-break" />
        <div className="login-signup-username">
          <FaRegUser className="login-signup-icon" />
          <input
            type="text"
            id="username"
            aria-label="Username"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <br className="login-signup-form-break" />
        <div className="login-signup-password">
          <FiLock className="login-signup-icon" />
          <input
            type="password"
            id="password"
            aria-label="Password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <br className="login-signup-form-break" />
        <div className="login-signup-confirm-password">
          <FiLock className="login-signup-icon" />
          <input
            type="password"
            id="confirm-password"
            aria-label="Confirm Password"
            placeholder="ConfirmPassword"
            value={registerData.confirmPassword}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <br className="login-signup-form-break" />
        <div className="login-signup-zipCode">
          <GrLocation className="login-signup-icon" />
          <input
            type="zipCode"
            id="zipCode"
            aria-label="Zip Code"
            placeholder="Zip Code"
            value={registerData.zipCode}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
      </form>

      <div className="lower-buttons login-signup-buttons">
        <button
          type="button"
          onClick={handleRegister}
          id="login-signup-button"
        >
          Register
        </button>
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
