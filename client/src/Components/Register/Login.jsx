import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLogin, fetchLogOut } from '../../utils/fetchUserData';

export default function Login({ setUser, user }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const userData = await fetchLogin(loginData);
      await setUser(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogOut = async () => {
    try {
      const userData = await fetchLogOut('logout');
      await setUser(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleCheck = (e) => {
    e.preventDefault();
    console.log('user: ', user);
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
        <button type="button" onClick={handleLogOut}>Log out</button>
        <Link to="/leaderboard"><button type="button">Leaderboard</button></Link>
      </form>
    </div>
  );
}
