export default function Bidang() {
    return (
      <section className="container mx-auto px-4 py-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Bidang Layanan PAUD HI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bidang Tata Kelola */}
          <div className="flex flex-col items-center bg-pastel-pink p-6 rounded-lg shadow-lg">
            <img src="/images/logo.png" alt="Tata Kelola" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Tata Kelola</h3>
            <p className="text-center text-gray-600 mt-2">
              Bidang ini berfokus pada pengelolaan dan pengorganisasian berbagai program PAUD.
            </p>
          </div>
  
          {/* Bidang Pendidikan Usia Dini */}
          <div className="flex flex-col items-center bg-pastel-yellow p-6 rounded-lg shadow-lg">
            <img src="/images/logo.png" alt="Pendidikan Usia Dini" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Pendidikan Usia Dini</h3>
            <p className="text-center text-gray-600 mt-2">
              Mengembangkan kurikulum dan metode pengajaran untuk anak usia dini.
            </p>
          </div>
  
          {/* Bidang Kesehatan dan Gizi */}
          <div className="flex flex-col items-center bg-pastel-green p-6 rounded-lg shadow-lg">
            <img src="/images/logo.png" alt="Kesehatan & Gizi" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Kesehatan & Gizi</h3>
            <p className="text-center text-gray-600 mt-2">
              Memberikan asupan gizi yang tepat dan perhatian kesehatan untuk mendukung tumbuh kembang anak.
            </p>
          </div>
  
          {/* Bidang Perlindungan Pengasuhan */}
          <div className="flex flex-col items-center bg-pastel-blue p-6 rounded-lg shadow-lg">
            <img src="/images/logo.png" alt="Perlindungan Pengasuhan" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Perlindungan Pengasuhan</h3>
            <p className="text-center text-gray-600 mt-2">
              Menyediakan perlindungan serta memastikan kesejahteraan dalam pengasuhan anak.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
