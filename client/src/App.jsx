import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cookies from 'js-cookie';
import {
  Navigate,
  BrowserRouter as
  Router,
  Routes,
  Route,
} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import CameraCapture from './Components/Camera/CameraCapture';
import Leaderboard from './Components/Leaderboard';
import Profile from './Components/Profile/Profile';
import SuccessfulSubmission from './Components/SuccessfulSubmission/SuccessfulSubmission';
import Register from './Components/Register';
import Login from './Components/Login';
import PageNotFound from './Components/PageNotFound';
import Navbar from './Components/Navbar';

export default function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) { setUser(username); }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/capture" element={<CameraCapture />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/success/:category" element={<SuccessfulSubmission />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </div>
  );
}
