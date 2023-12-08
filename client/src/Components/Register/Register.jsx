import React from 'react';

export default function Register({ setUser }) {
  const handleRegisterClick = (e) => {
    e.preventDefault();
    const link = 'http://localhost:3001/login';

    const fetchData = async () => {
      try {
        const res = await fetch(link);
        const response = await res.json();
        setUser(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  };

  return (
    <div>
      <button type="button" onClick={handleRegisterClick}>Register</button>
    </div>
  );
}
