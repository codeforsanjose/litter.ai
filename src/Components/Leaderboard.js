import React, { useState, useEffect } from 'react';
import { userPictureData as pictureData } from '../sampleLeaderboardData.js'

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser] = useState(pictureData[2]);
  const [userRank, setUserRank] = useState(0);

  const renderTable = (user, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{user.username}</td>
      <td>{user.totalUploads}</td>
    </tr>
  )

  useEffect(() => {
    pictureData.sort((a, b) => (b.totalUploads - a.totalUploads));
    setLeaderboardData(pictureData.slice(0, 10));

    const rank = pictureData.findIndex(user => user.username === currentUser.username) + 1;
    setUserRank(rank);
  }, [leaderboardData, currentUser])


  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Total</th>
        </tr>
        {leaderboardData.map((user, index) => (renderTable(user, index)))}
        <tr>
          <td>{userRank}</td>
          <td>{currentUser.username}</td>
          <td>{currentUser.totalUploads}</td>
        </tr>
      </table>
    </div>
  )
}