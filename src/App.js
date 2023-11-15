import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { categoryData } from '../src/MockData/mockCategoryData.js'

import LandingPage from './Components/LandingPage';
import CameraCapture from './Components/CameraCapture';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import CategoryDescription from './Components/CategoryDescription';
import LearnMore from './Components/LearnMore';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/capture' element={<CameraCapture />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/success' element={<CategoryDescription type={categoryData.plastic}/>} />
          <Route path='/learn-more' element={<LearnMore />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
