import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Sidebar from './Sidebar';
import DashboardOverview from './DashboardOverview';
import AdminAnalytics from './AdminAnalytics';
import NewsManagement from './news/NewsManagement';
import FAQManagement from './FAQManagement';
import UserManagement from './UserManagement';
import RanPaudDashboard from './ranpaud/RanPaudDashboard';
import RanPaudManagement from './ranpaud/RanPaudManagement';
import PembelajaranManagement from './education/PembelajaranManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('ran-paud-data');

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Set active tab based on current route
    if (location.pathname === '/admin/analytics') {
      setActiveTab('analytics');
    } else if (location.pathname === '/admin/ran-paud-dashboard') {
      setActiveTab('ran-paud-dashboard');
    } else if (location.pathname === '/admin/ran-paud-data') {
      setActiveTab('ran-paud-data');
    } else if (location.pathname === '/admin') {
      // Auto-redirect ke halaman Input Data sebagai landing admin
      setActiveTab('ran-paud-data');
      navigate('/admin/ran-paud-data', { replace: true });
    }
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    if (tabId === 'analytics') {
      navigate('/admin/analytics');
    } else if (tabId === 'ran-paud-dashboard') {
      navigate('/admin/ran-paud-dashboard');
    } else if (tabId === 'ran-paud-data') {
      navigate('/admin/ran-paud-data');
    } else if (tabId === 'overview') {
      navigate('/admin');
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'news':
        return <NewsManagement />;
      case 'faq':
        return <FAQManagement />;
      case 'users':
        return <UserManagement />;
      case 'ran-paud-dashboard':
        return <RanPaudDashboard setActiveTab={handleTabChange} />;
      case 'ran-paud-data':
        return <RanPaudManagement setActiveTab={handleTabChange} />;
      case 'pembelajaran-panduan':
        return <PembelajaranManagement activeTab="panduan" setActiveTab={handleTabChange} />;
      case 'pembelajaran-video':
        return <PembelajaranManagement activeTab="video" setActiveTab={handleTabChange} />;
      case 'pembelajaran-tools':
        return <PembelajaranManagement activeTab="tools" setActiveTab={handleTabChange} />;
      default:
        return <DashboardOverview />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
        </main>
    </div>
  );
};

export default AdminDashboard;
