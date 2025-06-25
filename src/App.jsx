// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import NewsSection from './components/NewsSection';
import Chatbot from './components/Chatbot/Chatbot';
import EducationSection from './components/EducationSection/';
import KLProgramsMVP from './pages/KLProgramMVP';
import KLSection from './components/KLSection';
import DirectorySection from './components/DirectorySection';
import PAUDDashboard from './components/PAUDDashboard/PAUDDashboard';
import FaqPage from './components/FAQApp';
import AboutPage from './components/About/AboutPage';
import Main from './components/PengasuhanAi/Main';





function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
      < EducationSection />
      <KLSection />
      <Footer />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
                <Route path="/KL" element={<KLProgramsMVP/>} />
        <Route path="/directory" element={<DirectorySection />} />
        <Route path="/dashboard" element={<PAUDDashboard />} />
                <Route path="/faq" element={<FaqPage />} />
                    <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/pengasuhan" element={<Main/>} />


      </Routes>
    </Router>
  );
}

export default App;
