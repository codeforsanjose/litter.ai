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
import LandingPage from './components/LandingPage';
import CameraCapture from './components/Camera/CameraCapture';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile/Profile';
import SuccessfulSubmission from './components/SuccessfulSubmission/SuccessfulSubmission';
import Register from './components/Register';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) { setUser(username); }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Routes>
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
