import React, { useState } from 'react';
import './css/App.css';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
} from 'react-router-dom';
import categoryData from './MockData/mockCategoryData';
import LandingPage from './components/LandingPage';
import CameraCapture from './components/CameraCapture';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profile';
import SuccessfulSubmission from './components/SuccessfulSubmission/SuccessfulSubmission';
// import Register from './components/Register/Register';
import Login from './components/Register/Login';

export default function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/capture" element={<CameraCapture />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/register" element={<Register setUser={setUserData} />} /> */}
          <Route path="/login" element={<Login setUser={setUserData} user={userData} />} />
          <Route path="/success" element={<SuccessfulSubmission type={categoryData.plastic} />} />
        </Routes>
      </Router>
    </div>
  );
}
