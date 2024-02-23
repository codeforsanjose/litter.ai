import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaRegEnvelope } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { fetchLogin } from '../utils/fetchUserData';
import '../css/LoginSignUp.css';

export default function Login({ setUser }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="login-signup-container main-container">
      <section className="login-signup-header">
        <button className="back-button" type="button" aria-label="Back" onClick={goBack}>
          <FaAngleLeft />
        </button>
        <article className="login-signup-header-text">
          <h3>Sign In</h3>
          <p>Enter your credentials to continue</p>
        </article>
      </section>

      <form className="login-signup-form" onSubmit={handleLogin}>
        {invalidLogin
          ? (
            <div className="invalid-login-signup">
              <small>Incorrect username and/or password</small>
            </div>
          )
          : <br className="invalid-login-signup" />}
        <div className="login-signup-email">
          <FaRegEnvelope className="login-signup-icon" />
          <input
            type="email"
            id="email"
            aria-label="Email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => handleChange(e)}
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
            value={loginData.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br className="login-signup-form-break" />

        <section className="lower-buttons login-signup-buttons">
          <button
            type="submit"
            className="login-signup-button"
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
        </section>
      </form>
    </main>
  );
}
