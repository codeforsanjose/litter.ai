import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProfileData, fetchLogOut } from '../../utils/fetchUserData';
import '../../css/Profile.css';
import ProfileStatistics from './ProfileStatistics';

export default function Profile({ user, setUser }) {
  const [userStatisticData, setUserStatisticData] = useState(null);

  const handleLogout = async () => {
    await fetchLogOut();
    await setUser(null);
  };

  // Authenticates user and fetches user's waste statistics
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userData = await fetchProfileData(user.toLowerCase());
        setUserStatisticData(userData);
      };
      fetchData();
    }
  }, [user]);

  return (
    <div className="profile-container main-container">
      { user ? (
        <div className="profile-login-wrapper">
          <div className="profile-login-header">
            <h1>{user}</h1>
          </div>
          <div className="profile-logout-button">
            <h2>User Status</h2>
            <button type="button" onClick={handleLogout}>Log out</button>
          </div>
          <div className="profile-statistics">
            <h2>My Waste Statistics</h2>
            { userStatisticData
              && <ProfileStatistics user={userStatisticData.pictureData} />}
          </div>
          <div className="profile-buttons lower-buttons">
            <Link to="/capture">
              <button type="button">
                Capture Picture
              </button>
            </Link>
            <Link to="/">
              <button className="button-home" type="button">
                Home
              </button>
            </Link>
          </div>
        </div>
      )
      // Screen if a user is not logged in
        : (
          <div className="profile-logout-wrapper">
            <div className="profile-logout-top">
              <div className="profile-logout-bg" />
              <div className="profile-logout-header">
                <h1>Join us!</h1>
                <h3>Keep track of your sorting statistics</h3>
              </div>
              <div className="profile-buttons lower-buttons">
                <Link to="/login">
                  <button type="button">
                    Log In
                  </button>
                </Link>
                <Link to="/register">
                  <button type="button" className="button-signup">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
            <div className="profile-logout-bottom">
              <Link to="/">
                <button className="button-home" type="button">
                  Home
                </button>
              </Link>
            </div>
          </div>
        )}
    </div>
  );
}
