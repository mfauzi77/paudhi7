// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import NewsSection from './components/NewsSection';
import Chatbot from './components/Chatbot/Chatbot';
import EducationSection from './components/EducationSection/';
import KLSection from './components/KLSection';
import DirectorySection from './components/DirectorySection';
import PAUDDashboard from './components/PAUDDashboard/PAUDDashboard';
import FaqPage from './components/FAQApp';
import AboutPage from './components/About/AboutPage';
import Main from './components/PengasuhanAi/Main';
import MaknaLogo from './components/MaknaLogo';


function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
      <EducationSection />
      <KLSection />
      <Footer />
    </>
  );
}

// Komponen pembungkus untuk mengatur Chatbot di semua halaman kecuali "/pengasuhan"
function AppWrapper() {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/directory" element={<DirectorySection />} />
        <Route path="/dashboard" element={<PAUDDashboard />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pengasuhan" element={<Main />} />
        <Route path="/maknalogo" element={<MaknaLogo />} />
    

      </Routes>

      {/* Tampilkan chatbot di semua halaman kecuali /pengasuhan */}
      {location.pathname !== '/pengasuhan' && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
