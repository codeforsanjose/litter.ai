import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetchLogin, fetchLogOut } from '../utils/fetchUserData';
import '../css/Login.css';
import logo from '../images/Logo_large_white.png';

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
      <div className="login-logo">
        <img className="login-logo-image" src={logo} alt="Logo" />
      </div>
      <form className="login-form">
        {invalidLogin && <p className="invalid-login">Incorrect username and/or password</p> }
        <div className="login-email">
          <label htmlFor="email">
            Email:&nbsp;
            <input
              type="text"
              id="email"
              value={loginData.email}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="login-password">
          <label htmlFor="password">
            Password:&nbsp;
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className="lower-buttons">
          <button
            className="login-button"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="login-button"
            type="button"
            onClick={handleCheck}
          >
            Test Login Data
          </button>
          <button
            className="login-button"
            type="button"
            onClick={async () => {
              await fetchLogOut();
              await setUser(null);
            }}
          >
            Log out
          </button>
          <Link to="/leaderboard">
            <button className="login-button" type="button">Leaderboard</button>
          </Link>
          <Link to="/profile">
            <button className="login-button" type="button">Profile</button>
          </Link>
          <Link to="/">
            <button className="button-home" type="button">
              Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
