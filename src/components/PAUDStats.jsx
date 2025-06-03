import React from "react";

export default function PAUDStats() {
  return (
    <section className="container mx-auto px-4 py-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Statistik PAUD HI Seluruh Indonesia
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
     { /*bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105"}



  {/* Statistik 1 */}
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300">
    <h3 className="text-xl font-semibold text-gray-700">Jumlah PAUD</h3>
    <p className="text-3xl font-bold text-red-600 mt-2">237.751</p>
    <p className="text-gray-600 mt-2">PAUD di seluruh Indonesia</p>
  </div>

  {/* Statistik 2 */}
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300">
    <h3 className="text-xl font-semibold text-gray-700">Jumlah PAUD HI</h3>
    <p className="text-3xl font-bold text-red-600 mt-2">187.616</p>
    <p className="text-gray-600 mt-2">Jumlah PAUD yang sudah menerapkan PAUD HI</p>
  </div>

  {/* Statistik 3 */}
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300">
    <h3 className="text-xl font-semibold text-gray-700">Jumlah Peserta Didik</h3>
    <p className="text-3xl font-bold text-red-600 mt-2">6.78jt</p>
    <p className="text-gray-600 mt-2">Anak-anak yang bersekolah di PAUD</p>
  </div>

  {/* Statistik 4 */}
  <div className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300">
    <h3 className="text-xl font-semibold text-gray-700">Jumlah Tenaga Pendidik</h3>
    <p className="text-3xl font-bold text-red-600 mt-2">482.731</p>
    <p className="text-gray-600 mt-2">Tenaga pendidik di PAUD dan sejenis</p>
  </div>
</div>

      

      {/* Informasi Lanjutan */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-700">
          Data ini diperoleh berdasarkan laporan dari seluruh fasilitas PAUD HI yang terdaftar di Indonesia.
          Kami terus bekerja sama dengan pemerintah dan lembaga terkait untuk memastikan data yang akurat dan up-to-date.
        </p>
      </div>
    </section>
  );
}
