import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { fetchProfileData, fetchLogOut } from '../../utils/fetchUserData';
import '../../css/Profile.css';
import ProfileStatistics from './ProfileStatistics';

export default function Profile({ user }) {
  const [userLeaderboardData, setUserLeaderboardData] = useState(null);

  // Authenticates user and fetches user's waste statistics
  useEffect(() => {
    if (user) {
      const token = Cookies.get('authToken');
      const fetchData = async () => {
        const userData = await fetchProfileData(user, token);
        setUserLeaderboardData(userData);
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="profile-container">
      { user ? (
        <>
          <div className="profile-header">
            <h1>{user}</h1>
            <div className="profile-background" />
          </div>
          <div className="profile-password">
            <h2>User Status</h2>
            <button type="button" onClick={() => fetchLogOut()}>Log out</button>
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
        </>
      )
        : <div>You need to log in</div>}
    </div>
  );
}
