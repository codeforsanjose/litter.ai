import React, { useState } from 'react';
import { GrLocation } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa';
import { FaAngleLeft, FaRegEnvelope } from 'react-icons/fa6';
import { FiLock } from 'react-icons/fi';
import { PiUserListBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../utils/fetchUserData';
import '../css/LoginSignUp.css';

export default function Register({ setUser }) {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    zipCode: '',
  });
  const [validPassword, setValidPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const minPassLen = 6;

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (passwordMatch && validPassword) {
      try {
        const response = await fetchRegister(registerData);
        setUser(response.user.displayUsername);
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  const handlePasswordCheck = () => {
    const [pass, confPass] = [registerData.password, registerData.confirmPassword];

    // If passwords don't match, user will be notified.
    if (confPass.length && pass !== confPass) {
      setPasswordMatch(false);
    } else if (pass === confPass) {
      setPasswordMatch(true);
    }

    // If password is shorter than 6 characters, user will be notified.
    if (pass.length && pass.length >= minPassLen) {
      setValidPassword(true);
    } else if (pass.length && pass.length < minPassLen) {
      setValidPassword(false);
    }
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
          <h3>Create a New Account</h3>
          <p>Join us in making a cleaner world</p>
        </article>
      </section>

      <form className="login-signup-form" onSubmit={handleRegister}>
        <div className="login-signup-first-name">
          <PiUserListBold className="login-signup-icon" />
          <input
            type="text"
            id="firstName"
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
            id="lastName"
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
            minLength={minPassLen}
            value={registerData.password}
            onChange={(e) => handleChange(e)}
            onKeyUp={handlePasswordCheck}
            required
          />
        </div>
        {(registerData.password.length > 0 && !validPassword)
          && (
            <div className="valid-password">
              <small>
                Password must be a minimum of&nbsp;
                {minPassLen}
                &nbsp;characters
              </small>
            </div>
          )}
        <br className="login-signup-form-break" />
        <div className="login-signup-confirm-password">
          <FiLock className="login-signup-icon" />
          <input
            type="password"
            id="confirmPassword"
            aria-label="Confirm Password"
            placeholder="Confirm Password"
            value={registerData.confirmPassword}
            onChange={(e) => handleChange(e)}
            onKeyUp={handlePasswordCheck}
            required
          />
        </div>
        {!passwordMatch
          && (
            <div className="matching-password">
              <small>Passwords do not match</small>
            </div>
          )}
        <br className="login-signup-form-break" />

        <section className="lower-buttons login-signup-buttons">
          <button
            type="submit"
            className="login-signup-button"
          >
            Register
          </button>
        </section>
      </form>
    </main>
  );
}
