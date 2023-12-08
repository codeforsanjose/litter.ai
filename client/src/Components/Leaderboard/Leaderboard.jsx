import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../../css/Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [dropdownSelection, setDropdownSelection] = useState('total');
  // const [userRank, setUserRank] = useState(0);

  // Creates a data row for each user with their rank, username, and total uploads
  const renderTable = (user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td className="lb-name">{user.username}</td>
      <td>{user.itemCount}</td>
    </tr>
  );

  // Sorts users by total uploads
  useEffect(() => {
    // Data for the total uploads is a different link than the categories
    const link = 'http://localhost:3001/leaderboard';
    const path = dropdownSelection === 'total' ? link : `${link}/${dropdownSelection}`;

    const fetchData = async () => {
      try {
        const res = await fetch(path);
        const response = await res.json();
        setLeaderboardData(response.leaderboard);
        // setUserRank(response.rank);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dropdownSelection]);

  return (
    <div className="lb-container">
      <div className="lb-user-stats">
        <h3>Your rank: 9999</h3>
        <h3>Total: 99999999</h3>
      </div>
      <table className="lb-table">
        <thead>
          <tr className="lb-header">
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">
              <Dropdown setCategory={setDropdownSelection} aria-label="Dropdown" />
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (renderTable(user, index)))}
        </tbody>
      </table>
    </div>
  );
}
