import React from 'react';
import { Link } from 'react-router-dom';
import { userPictureData } from '../../MockData/mockUserData';
import '../../css/Profile.css';
import ProfileStatistics from './ProfileStatistics';

export default function Profile({ user }) {
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
        <ProfileStatistics user={userPictureData[0].pictureData} />
      </div>
      <div className="profile-buttons">
        <Link to="/capture"><button type="button">Capture Picture</button></Link>
        <Link to="/"><button className="button-home" type="button">Home</button></Link>
      </div>
    </div>
  );
}
