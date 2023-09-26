import React, { useState, useEffect } from 'react';
import { userPictureData as pictureData } from '../sampleLeaderboardData.js'
import '../Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser] = useState(pictureData[8]);
  const [userRank, setUserRank] = useState(0);

  // Creates a data row for each user with their rank, username, and total uploads
  const renderTable = (user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="lb-name">{user.username}</td>
      <td>{user.totalUploads}</td>
    </tr>
  )

  // Sorts users by total uploads
  useEffect(() => {
    pictureData.sort((a, b) => (b.totalUploads - a.totalUploads));
    setLeaderboardData(pictureData.slice(0, 10));

  // Ses the current user's rank by finding the index of their username in the sorted data
    const rank = pictureData.findIndex(user => user.username === currentUser.username) + 1;
    setUserRank(rank);
  }, [currentUser])


  return (
    <div className="lb-container">
      <div className="lb-user-stats">
        <h3>Your rank: {userRank}</h3>
        <h3>Total: {currentUser.totalUploads}</h3>
      </div>
      <table className="lb-table">
        <thead>
          <tr className="lb-header">
            <th scope="col">Rank</th>
              <th scope="col" className="lb-header-name">Name</th>
              <th scope="col">Total</th>
          </tr>
        </thead>
      <tbody>
        {leaderboardData.map((user, index) => (renderTable(user, index)))}
      </tbody>
      </table>
    </div>
  )
}