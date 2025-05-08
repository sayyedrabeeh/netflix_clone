import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login'; 
import Home from './pages/Home/Home'; 
import Player from './pages/player/Player'; 
import ProtectedRoute from './components/ProtectedRoute';
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
         path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      <Route path="/player/:id" element={<Player />} />
         
      </Routes>
    </Router>
  );
}

export default App;
