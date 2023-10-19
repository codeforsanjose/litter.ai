import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import LandingPage from './Components/LandingPage';
import CameraCapture from './Components/CameraCapture';
import Leaderboard from './Components/Leaderboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/capture' element={<CameraCapture />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
