import React, { useState, useEffect } from 'react';
import RecyclingIcon from '@mui/icons-material/Recycling';

export default function ProfileStatistics({ user }) {
  const [userStatistics, setUserStatistics] = useState([]);

  const handleUserData = (category) => (
    <>
      <div className="profile-stats-row">
        <div className="profile-stats-left">
          <div className="profile-stats-icon-bg">
            <RecyclingIcon className="profile-stats-icon" />
          </div>
          <h4>{category[0]}</h4>
        </div>
        <p className="profile-stats-number">{category[1]}</p>
      </div>
      <hr />
    </>
  );

  useEffect(() => {
    const list = Object.keys(user).map(
      (key) => [key.charAt(0).toUpperCase() + key.slice(1), user[key]],
    );
    list.sort((a, b) => b[1] - a[1]);
    setUserStatistics(list);
  }, [user]);

  return (
    <>
      { userStatistics.map((category) => handleUserData(category)) }
    </>
  );
}
