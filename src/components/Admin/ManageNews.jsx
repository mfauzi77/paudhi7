// components/Admin/ManageNews.jsx

import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Edit, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

// --- DATA DUMMY ---
// Di aplikasi nyata, data ini akan datang dari API
const initialNewsData = [
    {
      id: 1,
      title: 'Kemenko PMK Lakukan Monitoring dan Evaluasi di DIY',
      author: 'Kemenko PMK',
      date: '2025-06-26',
      tags: ['Perlindungan Anak', 'Monitoring'],
    },
    {
      id: 2,
      title: 'Deputi Woro Tegaskan Sinergi PAUD HI Hadapi ECDI 2030',
      author: 'Kemenko PMK',
      date: '2025-05-15',
      tags: ['PAUD HI', 'ECDI 2030'],
    }
];

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // --- Ambil data dari API (Simulasi) ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Simulasi API call
        // const response = await fetch('/api/news');
        // if (!response.ok) {
        //   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        // }
        // const data = await response.json();
        // setNews(data);
        
        // Simulasi delay dan error handling
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulasi random error (untuk testing - hapus di production)
        // if (Math.random() < 0.1) {
        //   throw new Error('Gagal mengambil data berita dari server');
        // }
        
        setNews(initialNewsData);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('❌ Gagal memuat data berita. Silakan refresh halaman atau coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Clear success/error messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleAddNews = () => {
    try {
      // Di sini Anda akan mengarahkan ke halaman form atau membuka modal
      setSuccess('✅ Fitur tambah berita akan segera tersedia');
      // window.location.href = '/admin/news/add';
      // atau showModal(true);
    } catch (err) {
      setError('❌ Gagal membuka form tambah berita');
    }
  };

  const handleEditNews = (id) => {
    try {
      if (!id) {
        throw new Error('ID berita tidak valid');
      }
      
      const newsItem = news.find(item => item.id === id);
      if (!newsItem) {
        throw new Error('Berita tidak ditemukan');
      }

      setSuccess(`✏️ Membuka editor untuk: ${newsItem.title}`);
      // Di implementasi nyata:
      // window.location.href = `/admin/news/edit/${id}`;
      // atau showEditModal(newsItem);
    } catch (err) {
      console.error('Error editing news:', err);
      setError(`❌ ${err.message}`);
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      if (!id) {
        throw new Error('ID berita tidak valid');
      }

      const newsItem = news.find(item => item.id === id);
      if (!newsItem) {
        throw new Error('Berita tidak ditemukan');
      }

      const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus berita "${newsItem.title}"?\n\nTindakan ini tidak dapat dibatalkan.`);
      
      if (confirmed) {
        setLoading(true);
        
        // Simulasi API call
        // const response = await fetch(`/api/news/${id}`, { 
        //   method: 'DELETE',
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // 
        // if (!response.ok) {
        //   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        // }

        // Simulasi delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update state setelah berhasil hapus
        setNews(prevNews => prevNews.filter(item => item.id !== id));
        setSuccess(`✅ Berita "${newsItem.title}" berhasil dihapus`);
      }
    } catch (err) {
      console.error('Error deleting news:', err);
      setError(`❌ Gagal menghapus berita: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    window.location.reload();
  };

  return (
    <DashboardLayout pageTitle="Manajemen Berita">
      {/* Alert Messages */}
      {error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button 
            onClick={() => setError('')}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            ✕
          </button>
        </div>
      )}
      
      {success && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">{success}</span>
          <button 
            onClick={() => setSuccess('')}
            className="text-green-500 hover:text-green-700 font-medium"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <button
          onClick={handleAddNews}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          Tambah Berita Baru
        </button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data berita...</p>
          </div>
        </div>
      ) : error && news.length === 0 ? (
        <div className="text-center py-20">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
          <p className="text-gray-600 mb-6">Terjadi kesalahan saat mengambil data berita</p>
          <button
            onClick={retryFetch}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Coba Lagi
          </button>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Berita</h3>
          <p className="text-gray-600 mb-6">Mulai dengan menambahkan berita pertama</p>
          <button
            onClick={handleAddNews}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Tambah Berita Pertama
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</div>
                    {item.tags && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleEditNews(item.id)} 
                        disabled={loading}
                        className="text-indigo-600 hover:text-indigo-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit berita"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteNews(item.id)} 
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Hapus berita"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageNews;