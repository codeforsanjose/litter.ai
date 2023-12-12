import React, { useState, useMemo } from 'react';
import { fetchLogin, fetchLogOut } from './fetchUserData';
import userContext from './UserContext';

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  const login = async (loginData) => {
    try {
      const authUserData = await fetchLogin(loginData);
      setUserData(authUserData);
    } catch (err) {
      console.error(err);
    }
  };

  const contextValue = useMemo(() => ({
    userData,
    setUserData,
    login,
  }), [userData]);

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
}
