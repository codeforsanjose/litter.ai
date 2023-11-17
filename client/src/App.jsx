import React from 'react';
import './css/App.css';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
} from 'react-router-dom';
import categoryData from './MockData/mockCategoryData';
import LandingPage from './Components/LandingPage';
import CameraCapture from './Components/CameraCapture';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import SuccessfulSubmission from './Components/SuccessfulSubmission/SuccessfulSubmission';
import LearnMore from './Components/LearnMore';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/capture" element={<CameraCapture />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/success" element={<SuccessfulSubmission type={categoryData.plastic} />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </Router>
    </div>
  );
}
