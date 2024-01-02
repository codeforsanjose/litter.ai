import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Icons from '../Icons';

export default function ProfileStatistics({ user }) {
  const [userStatistics, setUserStatistics] = useState([]);

  const handleUserData = (category) => (
    <div key={uuid()}>
      <div className="profile-stats-row">
        <div className="profile-stats-left">
          <div className="profile-stats-icon-bg">
            <Icons name={category[0]} classname="profile-stats-icon" />
          </div>
          <h4>{category[0]}</h4>
        </div>
        <p className="profile-stats-number">{category[1]}</p>
      </div>
      <hr />
    </div>
  );

  // Converts data into array sorts the list in descending order
  useEffect(() => {
    const list = Object.keys(user).map((key) => [key, user[key]]);
    list.sort((a, b) => b[1] - a[1]);
    setUserStatistics(list);
  }, [user]);

  return (
    <>
      { userStatistics.map((category) => handleUserData(category)) }
    </>
  );
}
