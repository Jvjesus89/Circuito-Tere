import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Atrativos from './pages/Atrativos';
import ParkTemplate from './pages/ParkTemplate';
import './App.css';

function App() {
  const location = useLocation();
  
  const isParkPage = location.pathname.startsWith('/parque/');

  return (
    <div className="app-container">
    
      {!isParkPage && <Menu />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atrativos" element={<Atrativos />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/parque/:id" element={<ParkTemplate />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;