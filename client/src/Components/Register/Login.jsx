import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetchLogin, fetchLogOut } from '../../utils/fetchUserData';

export default function Login({ user }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      await fetchLogin(loginData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleCheck = () => {
    console.log('user: ', user);
    const token = Cookies.get('authToken');
    const userData = Cookies.get('username');
    console.log('token: ', token);
    console.log('userData: ', userData);
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
        <button type="button" onClick={() => fetchLogOut()}>Log out</button>
        <Link to="/leaderboard"><button type="button">Leaderboard</button></Link>
      </form>
    </div>
  );
}
