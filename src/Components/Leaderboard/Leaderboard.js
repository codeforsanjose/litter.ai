import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import '../../Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [dropdownSelection, setDropdownSelection] = useState('total');
  const [userRank, setUserRank] = useState(0);

  // Creates a data row for each user with their rank, username, and total uploads
  const renderTable = (user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="lb-name">{user.username}</td>
      <td>{user.totalUploads}</td>
    </tr>
  )

  const handleCategoryDropdown = (e) => {
    e.preventDefault();
    setCategoryOpen(!categoryOpen)
  }

  // Sorts users by total uploads
  useEffect(() => {
    axios.get('http://localhost:3001/leaderboard')
      .then((response) => {
        setLeaderboardData(response.data.leaderboard);
        setUserRank(response.data.rank);
      })
      .catch((err) => console.log(err));
  }, [])


  return (
    <div className="lb-container">
      <Dropdown setCategory={setDropdownSelection} cat={dropdownSelection} />
      <div className="lb-user-stats">
        <h3>Your rank: 9999</h3>
        <h3>Total: 99999999</h3>
      </div>
      <table className="lb-table">
        <thead>
          <tr className="lb-header">
            <th scope="col">Rank</th>
            <th scope="col" className="lb-header-name">Name</th>
            <th scope="col">Total
              {!categoryOpen && (
                <button onClick={handleCategoryDropdown}>^</button>
              )}
            </th>
          </tr>
        </thead>
      <tbody>
        {leaderboardData.map((user, index) => (renderTable(user, index)))}
      </tbody>
      </table>
    </div>
  )
}