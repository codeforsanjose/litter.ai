import React from 'react';

export default function ProfileStatistics({ user }) {
  return (
    <div className="profile-container">
      Profile Statistics
      {user[0].username}
    </div>
  );
}
