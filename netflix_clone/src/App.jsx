import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login'; 
import Home from './pages/Home/Home'; 
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
         
      </Routes>
    </Router>
  );
}

export default App;
