import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 drop-shadow-md">
          Selamat Datang di SISMONEV PAUD HI
        </h2>
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          Sistem Monitoring dan Evaluasi untuk mendukung layanan PAUD Holistik Integratif di seluruh Indonesia.
          Pantau perkembangan, kelola data, dan tingkatkan kualitas layanan pendidikan usia dini secara menyeluruh.
        </p>
        <Link
          to="/data"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition shadow-md"
        >
          Lihat Data
        </Link>
      </section>

      {/* Fitur Utama */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Monitoring Data</h3>
          <p className="text-gray-600">
            Cek data perkembangan anak, kesehatan, gizi, dan layanan PAUD HI secara real-time.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Evaluasi Program</h3>
          <p className="text-gray-600">
            Analisis laporan dan rekomendasi untuk peningkatan kualitas layanan PAUD HI.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Pelaporan Mudah</h3>
          <p className="text-gray-600">
            Buat dan kirim laporan langsung dari platform secara cepat dan akurat.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-20 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Mulai gunakan SISMONEV PAUD HI sekarang</h3>
        <Link
          to="/kontak"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition shadow-md"
        >
          Hubungi Kami
        </Link>
      </section>
    </main>
  );
}
