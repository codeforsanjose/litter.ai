import React from 'react';

export default function Register() {
  const handleRegisterClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <button type="button" onClick={handleRegisterClick}>Register</button>
    </div>
  );
}
