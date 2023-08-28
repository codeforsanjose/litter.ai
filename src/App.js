import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


import LandingPage from './Components/LandingPage';
import CameraCapture from './Components/CameraCapture';

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/capture' element={<CameraCapture/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
