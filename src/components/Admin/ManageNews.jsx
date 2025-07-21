// components/Admin/ManageNews.jsx

import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';

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

  // --- Ambil data dari API (Simulasi) ---
  useEffect(() => {
    // fetch('/api/news')
    //   .then(res => res.json())
    //   .then(data => setNews(data))
    //   .finally(() => setLoading(false));
    
    // Simulasi
    setTimeout(() => {
      setNews(initialNewsData);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddNews = () => {
    alert('Fungsi Tambah Berita (akan membuka form/modal)');
    // Di sini Anda akan mengarahkan ke halaman form atau membuka modal
  };

  const handleEditNews = (id) => {
    alert(`Fungsi Edit Berita ID: ${id}`);
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      // Panggil API untuk hapus
      // fetch(`/api/news/${id}`, { method: 'DELETE' })
      // Setelah berhasil, update state
      setNews(news.filter(item => item.id !== id));
      alert(`Berita ID: ${id} telah dihapus.`);
    }
  };

  return (
    <DashboardLayout pageTitle="Manajemen Berita">
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleAddNews}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Berita Baru
        </button>
      </div>
      
      {loading ? (
        <p>Loading data berita...</p>
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
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleEditNews(item.id)} className="text-indigo-600 hover:text-indigo-900 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeleteNews(item.id)} className="text-red-600 hover:text-red-900 transition">
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