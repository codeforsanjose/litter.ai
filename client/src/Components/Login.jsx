import React, { useState } from 'react';
import { fetchLogin } from '../utils/fetchUserData';

export default function Login({ setUser }) {
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
      </form>
    </div>
  );
}
