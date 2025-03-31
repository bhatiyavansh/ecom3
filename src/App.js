import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import BuyDashboard from './BuyDashboard';
import SellerDashboard from './SellerDashboard';
import Selection from './Selection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buyerdashboard" element={<BuyDashboard />} />
        <Route path="/sellerdashboard" element={<SellerDashboard />} />
        <Route path="/selection" element={<Selection />} />
      </Routes>
    </Router>
  );
}

export default App;