/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Error from './Error';
import Dropdown from './Dropdown';
import { fetchLeaderboardData } from '../utils/fetchUserData';
import '../css/Leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [dropdownSelection, setDropdownSelection] = useState('total');
  const [userRank, setUserRank] = useState(null);
  const [userItemCount, setUserItemCount] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const path = dropdownSelection === 'total' ? 'leaderboard' : `leaderboard/${dropdownSelection}`;

    // Authenticates user and grabs user's leaderboard data
    const fetchData = async () => {
      const response = await fetchLeaderboardData(path);
      await setLeaderboardData(response.leaderboard);
      await setUserRank(response.userRank);
      await setUserItemCount(response.userItemCount);
    };
    fetchData();
  }, [dropdownSelection]);

  return (
    <>
      { loading
        ? (
          // Loading spinner while data is being fetched
          <Loading loading={loading} />
        ) : (
          <div className="lb-container main-container">
            { leaderboardData ? (
              <>
                <h1>Leaderboard</h1>
                { userRank && (
                <div className="lb-user-stats">
                  <h3>
                    Your rank:&nbsp;
                    {userRank > 0 ? userRank : 'No photos'}
                  </h3>
                  <h3>
                    {dropdownSelection}
                    :&nbsp;
                    {userItemCount}
                  </h3>
                </div>
                )}
                <table className={`lb-table ${userRank && 'lb-table-user'}`} data-testid="lb-table">
                  <thead>
                    <tr className="lb-header">
                      <th scope="col">Rank</th>
                      <th scope="col">Name</th>
                      <th scope="col">
                        <Dropdown
                          setLBCategory={setDropdownSelection}
                          defaultValue={null}
                          aria-label="Dropdown"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((user, index) => (renderTable(user, index)))}
                  </tbody>
                </table>
              </>
            )
            // Error page if data fails to load
              : <Error />}
          </div>
        )}
    </>
  );
}
