import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetchProfileData } from '../../utils/fetchUserData';
import '../../css/Profile.css';
import ProfileStatistics from './ProfileStatistics';
// import { userPictureData } from '../../MockData/mockUserData';

export default function Profile({ user }) {
  const [userLeaderboardData, setUserLeaderboardData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (user && token) {
      const fetchData = async () => {
        const userData = await fetchProfileData(user.username, token);
        setUserLeaderboardData(userData);
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.username}</h1>
        <h3>{user.email}</h3>
        <div className="profile-background" />
      </div>
      <div className="profile-password">
        <h2>User Status</h2>
        <button type="button">Log out</button>
      </div>
      <div className="profile-statistics">
        <h2>My Waste Statistics</h2>
        { userLeaderboardData
          && <ProfileStatistics user={userLeaderboardData.pictureData} />}
      </div>
      <div className="profile-buttons">
        <Link to="/capture"><button type="button">Capture Picture</button></Link>
        <Link to="/"><button className="button-home" type="button">Home</button></Link>
      </div>
    </div>
  );
}
