import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CeriaApp from './ceria/App';
import { ThemeProvider } from './ceria/components/ThemeContext';

const CeriaPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">Memuat CERIA</h2>
          <p className="text-indigo-600">Sistem Pendukung Keputusan Cerdas untuk PAUD HI</p>
          <p className="text-sm text-indigo-500 mt-2">Mengintegrasikan aplikasi CERIA...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* CERIA App Container - Full Screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-screen"
      >
        <ThemeProvider>
          <CeriaApp />
        </ThemeProvider>
      </motion.div>
    </div>
  );
};

export default CeriaPage;
