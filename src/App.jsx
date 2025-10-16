// src/App.jsx
import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Komponen utama (tetap di-import langsung untuk performance)
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';
import NewsSection from './components/NewsSection';
import KLSection from './components/KLSection';
import DirectorySection from './components/DirectorySection';

// Lazy loading untuk komponen yang tidak critical
const Chatbot = lazy(() => import('./components/Chatbot/Chatbot'));
const EducationSection = lazy(() => import('./components/EducationSection/'));
const FaqPage = lazy(() => import('./components/FAQApp'));
const AboutPage = lazy(() => import('./components/About/AboutPage'));
const Main = lazy(() => import('./components/PengasuhanAi/Main'));
const MaknaLogo = lazy(() => import('./components/MaknaLogo'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const LoginForm = lazy(() => import('./pages/LoginForm'));
const PublicRanPaudDashboard = lazy(() => import('./pages/ranpaud/PublicRanPaudDashboard'));
const CeriaPage = lazy(() => import('./components/CeriaPage'));

// ✅ Import AuthProvider, ProtectedRoute, and ErrorBoundary
import { AuthProvider } from './pages/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from './components/Toast';
import { ToastProvider, useToast } from './components/ToastContext';
import LoadingSpinner from './components/LoadingSpinner';
import ServiceWorkerUpdate from './components/ServiceWorkerUpdate';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
      <Suspense fallback={<LoadingSpinner size="lg" text="Memuat konten pendidikan..." className="py-8" />}>
        <EducationSection />
      </Suspense>
      <KLSection />
      <Footer />
    </>
  );
}

// 🔁 Komponen pembungkus routing dan chatbot logic
function AppWrapper() {
  const location = useLocation();
  const { toasts, removeToast } = useToast();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/directory" element={<DirectorySection />} />
        <Route 
          path="/faq" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat FAQ..." className="py-8" />}>
              <FaqPage />
            </Suspense>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat halaman tentang..." className="py-8" />}>
              <AboutPage />
            </Suspense>
          } 
        />
        <Route 
          path="/pengasuhan" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat AI Pengasuhan..." className="py-8" />}>
              <Main />
            </Suspense>
          } 
        />
        <Route 
          path="/maknalogo" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat makna logo..." className="py-8" />}>
              <MaknaLogo />
            </Suspense>
          } 
        />
        {/* Arahkan ke halaman publik untuk kedua route berikut */}
        <Route 
          path="/dashboard" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat dashboard..." className="py-8" />}>
              <PublicRanPaudDashboard />
            </Suspense>
          } 
        />
        <Route 
          path="/ran-paud-dashboard" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat dashboard RAN PAUD..." className="py-8" />}>
              <PublicRanPaudDashboard />
            </Suspense>
          } 
        />
        <Route 
          path="/ceria" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat CERIA Dashboard..." className="py-8" />}>
              <CeriaPage />
            </Suspense>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
              <Suspense fallback={<LoadingSpinner size="lg" text="Memuat admin dashboard..." className="py-8" />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/ran-paud-dashboard" 
          element={
            <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
              <Suspense fallback={<LoadingSpinner size="lg" text="Memuat admin dashboard..." className="py-8" />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
              <Suspense fallback={<LoadingSpinner size="lg" text="Memuat admin dashboard..." className="py-8" />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/ran-paud-data" 
          element={
            <ProtectedRoute requiredRoles={['super_admin', 'admin']}>
              <Suspense fallback={<LoadingSpinner size="lg" text="Memuat admin dashboard..." className="py-8" />}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <Suspense fallback={<LoadingSpinner size="lg" text="Memuat halaman login..." className="py-8" />}>
              <LoginForm />
            </Suspense>
          } 
        />
      </Routes>

      {/* ⛔ Sembunyikan chatbot di halaman admin */}
      {!location.pathname.startsWith('/admin') && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}
      
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Service Worker Update Notifications */}
      <ServiceWorkerUpdate />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        {/* ✅ Bungkus semua dengan AuthProvider dan ToastProvider */}
        <ToastProvider>
          <AuthProvider>
            <AppWrapper />
          </AuthProvider>
        </ToastProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;