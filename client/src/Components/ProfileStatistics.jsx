import React, { useState, useEffect } from 'react';

export default function ProfileStatistics({ user }) {
  const [userStatistics, setUserStatistics] = useState([]);

  const handleUserData = (category) => (
    <div>
      <div>{category[0]}</div>
      <div>{category[1]}</div>
    </div>
  );

  useEffect(() => {
    const list = Object.keys(user).map((key) => [key, user[key]]);
    list.sort((a, b) => b[1] - a[1]);
    setUserStatistics(list);
  }, [user]);

  return (
    <div className="profile-container">
      { userStatistics.map((category) => handleUserData(category)) }
    </div>
  );
}
