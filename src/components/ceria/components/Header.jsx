import React, { useState, useEffect, useRef } from 'react';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, CalendarIcon, BellAlertIcon } from './icons/Icons';
import { View, ActiveAlertData, AlertLevel } from '../types';
import { fetchLastUpdated } from '../services/dataService';
import { useTheme } from './ThemeContext';
import { allActiveAlerts } from '../services/mockData';
import NotificationDropdown from './header/NotificationDropdown';

const Header = ({ setIsSidebarOpen, onLogout, setActiveView, onNavigateToRegion, activeView }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { isAdmin, logout, useIntegration } = useTheme();
  
  const profileMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const highPriorityAlerts = useIntegration ? [] : allActiveAlerts.filter(
    alert => alert.level === AlertLevel.Critical || alert.level === AlertLevel.High
  );

  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const ts = await fetchLastUpdated();
        setLastUpdated(ts);
      } catch {}
    })();
  }, []);

  const handleNotificationNavigate = (view) => {
    setActiveView(view);
    setIsNotificationsOpen(false);
  };

  const handleNotificationRegionNavigate = (regionName) => {
    onNavigateToRegion(regionName);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm z-10 border-b border-slate-200 dark:border-slate-700">
      <div className="px-4 sm:px-6">
        <div className="py-2.5 sm:py-0.5 flex justify-between items-center">
          <div className="flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="text-slate-500 dark:text-slate-400 mr-4 lg:hidden" aria-label="Open sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Title/description intentionally hidden per request */}
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
          {/* Notifications moved to horizontal header */}
          {/* Profile avatar and greeting hidden per request */}
          </div>
        </div>
      </div>
      {/* Last-updated info intentionally hidden per request */}
    </header>
  );
};

export default Header;
