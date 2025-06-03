export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="container mx-auto px-4">
          {/* Grid untuk layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {/* Kolom 1: Tentang */}
            <div>
            <img src="/logo.png" alt="Logo" className="h-12 rounded-md shadow-md items-center" />
              <h2 className="text-lg font-semibold mb-3">Kementerian Koordinator Bidang Pembangunan Manusia dan Kependudukan</h2>
         
            </div>
  
            {/* Kolom 2: Navigasi */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Navigasi</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-red-500 transition">Beranda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-500 transition">Data</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-500 transition">Laporan</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-500 transition">Kontak</a></li>
              </ul>
            </div>
  
            {/* Kolom 3: Kontak */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Kontak Kami</h2>
              <p className="text-gray-400 text-sm">Email: info@paudhi.id</p>
              <p className="text-gray-400 text-sm">Telepon: +62 812-3456-7890</p>
              <p className="text-gray-400 text-sm">Jl. Medan Merdeka Barat No.3, RT.2/RW.3, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110</p>
            </div>
          </div>
  
          {/* Garis pembatas */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-center">
            <p className="text-gray-500 text-sm">&copy; 2024 Sistem Monitoring dan Evaluasi PAUD HI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  