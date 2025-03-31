import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import BuyDashboard from './BuyDashboard';
import SellerDashboard from './SellerDashboard';
import Selection from './Selection';
import Test from './Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buyerdashboard" element={<BuyDashboard />} />
        <Route path="/sellerdashboard" element={<SellerDashboard />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;