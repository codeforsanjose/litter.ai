import React, { useState } from 'react';
import fetchUserData from '../../utils/fetchUserData';

export default function Login({ user, setUser }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setUser(await fetchUserData(loginData, 'login'));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleCheckData = () => {
    console.log(user);
  };

  return (
    <div>
      <form>
        <label htmlFor="email">email: </label>
        <input
          type="text"
          id="email"
          value={loginData.email}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password">password: </label>
        <input
          type="text"
          id="password"
          value={loginData.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleCheckData}>Check Data</button>
      </form>
    </div>
  );
}
