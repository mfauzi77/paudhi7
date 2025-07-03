import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Beranda', href: '/', active: false },
    { name: 'Direktori', href: '/directory', active: false },
    { name: 'Pengasuhan Ai', href: '/pengasuhan', active: false },
    { name: 'Tentang', href: '/About', active: false },
    { name: 'Dashboard', href: '/dashboard', active: false },
    { name: 'FAQ', href: '/faq', active: false },
    

  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-200' 
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 text-xl font-black text-black hover:text-blue-600 transition-colors">
  <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow">
    <img
      src="/logo.png"
      alt="Logo PAUD HI"
      className="w-full h-full object-contain"
    />
  </div>
              <span className="hidden sm:block">PAUD HI</span>
              <span className="block sm:hidden">SISMONEV</span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    className={`relative font-medium py-2 px-1 transition-all duration-300 group ${
                      item.active 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-700 hover:text-blue-600 hover:underline'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${
                      item.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button 
              <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group">
                <i className="fas fa-search text-base group-hover:scale-110 transition-transform"></i>
              </button> */}
              
              {/* Notification Button 
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group">
                <i className="fas fa-bell text-base group-hover:scale-110 transition-transform"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  3
                </span>
              </button>
            */}
              {/* Login Button */}
              <button className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden relative">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                <span className="relative">Masuk</span>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-base`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 py-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block font-medium py-2 px-3 rounded-lg transition-all duration-200 ${
                      item.active 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                  Masuk
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="flex">
          {[
            { icon: 'fa-home', label: 'Beranda', active: true },
            { icon: 'fa-th-large', label: 'Layanan', active: false },
            { icon: 'fa-chart-line', label: 'Monitor', active: false },
            { icon: 'fa-map-marker-alt', label: 'Lokasi', active: false },
            { icon: 'fa-user', label: 'Profil', active: false },
          ].map((item, index) => (
            <button 
              key={index}
              className={`flex-1 py-3 px-2 text-center transition-all duration-200 ${
                item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <i className={`fas ${item.icon} text-lg mb-1 block ${item.active ? 'scale-110' : ''} transition-transform`}></i>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;