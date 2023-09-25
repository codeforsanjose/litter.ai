import React, { useState, useEffect } from 'react';
import { userPictureData as pictureData } from '../sampleLeaderboardData.js'
import '../Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser] = useState(pictureData[8]);
  const [userRank, setUserRank] = useState(0);

  const renderTable = (user, index) => (
    <tr>
      <td>{index + 1}</td>
      <td className="lb-name">{user.username}</td>
      <td>{user.totalUploads}</td>
    </tr>
  )

  useEffect(() => {
    pictureData.sort((a, b) => (b.totalUploads - a.totalUploads));
    setLeaderboardData(pictureData.slice(0, 10));

    const rank = pictureData.findIndex(user => user.username === currentUser.username) + 1;
    setUserRank(rank);
  }, [currentUser])


  return (
    <div className="lb-container">
      <table className="lb-table">
      <tr className="lb-header">
        <th scope="col">Rank</th>
          <th scope="col" className="lb-header-name">Name</th>
          <th scope="col">Total</th>
        </tr>
        <tr className="lb-user-stats">
          <td>{userRank}</td>
          <td className="lb-name">{currentUser.username}</td>
          <td>{currentUser.totalUploads}</td>
        </tr>
        {leaderboardData.map((user, index) => (renderTable(user, index)))}
      </table>
    </div>
  )
}