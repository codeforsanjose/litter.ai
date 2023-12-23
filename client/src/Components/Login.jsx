import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaRegEnvelope } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { fetchLogin, fetchLogOut } from '../utils/fetchUserData';
import '../css/Login.css';

export default function Login({ user, setUser }) {
  const [loginData, setLoginData] = useState({
    email: 'bertram.hermiston@gmail.com',
    password: 'password',
  });

  const [invalidLogin, setInvalidLogin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetchLogin(loginData);
      setUser(response.user.displayUsername);
      setInvalidLogin(false);
    } catch (err) {
      setInvalidLogin(true);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleCheck = () => {
    const token = Cookies.get('authToken');
    const userData = Cookies.get('username');
    console.log('user: ', user);
    console.log('token: ', token);
    console.log('userCookie: ', userData);
  };

  return (
    <div className="login-container main-container">
      <div className="login-header">
        <Link to="/" className="back-button">
          <button className="back-button" type="button" aria-label="Back">
            <FaAngleLeft />
          </button>
        </Link>
        <div className="login-header-text">
          <h3>Sign In</h3>
          <p>Enter your credentials to continue</p>
        </div>
      </div>
      <form className="login-form">
        {invalidLogin
          ? (
            <div className="invalid-login">
              <small>Incorrect username and/or password</small>
            </div>
          )
          : <br className="invalid-login" />}
        <div className="login-email">
          <FaRegEnvelope className="login-icon" />
          <input
            type="text"
            id="email"
            aria-label="Email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br className="login-form-break" />
        <div className="login-password">
          <FiLock className="login-icon" />
          <input
            type="password"
            id="password"
            aria-label="Password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="forgot-password">
          <small>Forgot Password?</small>
        </div>
      </form>
      <div className="lower-buttons login-buttons">
        <button
          type="button"
          onClick={handleLogin}
        >
          Login
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
