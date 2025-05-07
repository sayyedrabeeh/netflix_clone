import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login'; 
import Home from './pages/Home/Home'; 
import Player from './pages/player/Player'; 
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/player/:id" element={<Player />} />
         
      </Routes>
    </Router>
  );
}

export default App;
