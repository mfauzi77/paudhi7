import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown, LogOut, BarChart3, FileText, GraduationCap } from 'lucide-react';
import { useAuth } from '../pages/contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import apiService from '../utils/apiService';
import LogoutConfirmModal from './LogoutConfirmModal';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const searchPromises = [
        apiService.searchNews ? apiService.searchNews(query).catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
        apiService.searchRanPaud ? apiService.searchRanPaud(query).catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
        apiService.searchPembelajaran ? apiService.searchPembelajaran(query).catch(() => ({ data: [] })) : Promise.resolve({ data: [] })
      ];

      const [newsResults, ranPaudResults, pembelajaranResults] = await Promise.all(searchPromises);

      const results = [
        ...(newsResults?.data || []).map(item => ({
          ...item,
          type: 'news',
          title: item.title,
          description: item.content?.substring(0, 100) + '...',
          url: `/news/${item._id}`
        })),
        ...(ranPaudResults?.data || []).map(item => ({
          ...item,
          type: 'ranpaud',
          title: `${item.klName} - ${item.program}`,
          description: `Program RAN PAUD HI dari ${item.klName}`,
          url: `/ran-paud-dashboard`
        })),
        ...(pembelajaranResults?.data || []).map(item => ({
          ...item,
          type: 'pembelajaran',
          title: item.judul || item.nama,
          description: item.deskripsi?.substring(0, 100) + '...' || 'Materi pembelajaran',
          url: `/education`
        }))
      ];

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setSearchError('Gagal melakukan pencarian. Silakan coba lagi.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchError(null);

    if (value.trim()) {
      handleSearch(value);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result) => {
    setShowSearchResults(false);
    setSearchTerm('');
    navigate(result.url);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Menu items shared between desktop and mobile
  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Tentang', path: '/about' },
    { label: 'Tanya Jawab PAUD HI', path: '/faq' },
    { label: 'Pelaporan PAUD HI', path: '/ran-paud-dashboard' },
    { label: 'CERIA', path: '/ceria' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="Beranda">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/src/images/logo.svg"
                alt="PAUD HI Logo"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">SISMONEV CERIA</h1>
            </div>
          </Link>

          {/* Search Bar - Desktop only */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari berita, program, atau materi pembelajaran..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchInputChange}
                onFocus={() => searchTerm.trim() && setShowSearchResults(true)}
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={`${result.type}-${index}`}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {result.type === 'news' && <FileText className="h-4 w-4 text-blue-600" />}
                        {result.type === 'ranpaud' && <BarChart3 className="h-4 w-4 text-green-600" />}
                        {result.type === 'pembelajaran' && <GraduationCap className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {result.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {result.description}
                        </div>
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            result.type === 'news' ? 'bg-blue-100 text-blue-800' :
                            result.type === 'ranpaud' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {result.type === 'news' ? 'Berita' :
                             result.type === 'ranpaud' ? 'Program RAN PAUD' :
                             'Materi Pembelajaran'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {showSearchResults && searchResults.length === 0 && searchTerm.trim() && !isSearching && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-4">
                <div className="text-center text-gray-500">
                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>Tidak ada hasil ditemukan</p>
                  <p className="text-sm">Coba kata kunci yang berbeda</p>
                </div>
              </div>
            )}

            {/* Error Display */}
            {searchError && (
              <div className="absolute z-50 w-full mt-1 bg-red-50 rounded-md shadow-lg border border-red-200 p-4">
                <div className="text-center text-red-600">
                  <div className="text-red-500 text-6xl mb-2">⚠️</div>
                  <p className="font-medium">Error Pencarian</p>
                  <p className="text-sm">{searchError}</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </a>
            ))}

            {!user ? (
              <Link
                to="/admin"
                className="text-sm font-medium bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
              >
                Masuk
              </Link>
            ) : (
              <Link
                to="/admin"
                className="text-sm font-medium bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {!user ? (
              <Link
                to="/admin"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/admin')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Masuk
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/admin')
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  } flex items-center justify-between`}
                >
                  Admin
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    <Link
                      to="/admin"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Dashboard Admin
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </nav>
  );
};

export default Navigation;