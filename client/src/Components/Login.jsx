import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaRegEnvelope } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { fetchLogin } from '../utils/fetchUserData';
import '../css/Login.css';

export default function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    email: 'barton50@yahoo.com',
    password: 'password',
  });

  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetchLogin(loginData);
      setUser(response.user.displayUsername);
      setInvalidLogin(false);
      navigate('/');
    } catch (err) {
      setInvalidLogin(true);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
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
      </form>
      <div className="lower-buttons login-buttons">
        <button
          type="button"
          onClick={handleLogin}
          id="login-button"
        >
          Login
        </button>
        <div className="sign-up">
          <small>Don&apos;t have an account?</small>
          <Link
            to="/register"
            className="register-button"
          >
            <small>Sign Up</small>
          </Link>
        </div>
      </div>
    </div>
  );
}
