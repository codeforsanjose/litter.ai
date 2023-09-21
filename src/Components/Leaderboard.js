import React, { useState, useEffect } from 'react';
import { userPictureData as pictureData, userData } from '../sampleLeaderboardData.js'

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  const renderTable = (user, index) => (
    <tr>
      <td>{index + 1}</td>
      <td>{user.username}</td>
      <td>{user.totalUploads}</td>
    </tr>
  )

  useEffect(() => {
    pictureData.sort((a, b) => (b.totalUploads - a.totalUploads))
    setLeaderboardData(pictureData);
  }, [leaderboardData])

  return (
    <div className="leaderboard-container">
      <table>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Total</th>
        </tr>
        {leaderboardData.map((user, index) => (renderTable(user, index)))}
      </table>
    </div>
  )
}