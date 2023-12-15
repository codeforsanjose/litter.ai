import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetchLogin, fetchLogOut } from '../utils/fetchUserData';

export default function Login({ user, setUser }) {
  const [loginData, setLoginData] = useState({
    email: 'barton50@yahoo.com',
    password: 'password',
  });

  const handleLogin = async () => {
    try {
      const response = await fetchLogin(loginData);
      setUser(response.user.displayUsername);
    } catch (err) {
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
    <div>
      <form>
        <label htmlFor="email">
          email:
          <input
            type="text"
            id="email"
            value={loginData.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            type="text"
            id="password"
            value={loginData.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleCheck}>Test Login Data</button>
        <button type="button" onClick={async () => { await fetchLogOut(); await setUser(null); }}>Log out</button>
        <Link to="/leaderboard"><button type="button">Leaderboard</button></Link>
        <Link to="/profile"><button type="button">Profile</button></Link>
      </form>
    </div>
  );
}
