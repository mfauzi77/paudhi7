export default function AboutPAUD() {
  return (
   <section className="relative w-full">
  {/* Layer background dengan opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
  
  ></div>

      {/* Konten */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
        {/* Gambar di kiri */}
        <div className="md:w-1/2 animate-fade-in">
          <img
            src="/images/anak2.png"
            alt="PAUD HI"
            className="w-full rounded-lg transform hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Deskripsi di kanan */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl font-bold text-blue-900 mb-4 animate-bounce">
            Apa Itu PAUD HI?
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            PAUD HI (Pengembang Anak Usia Dini Holistik Integratif) adalah layanan yang membantu anak-anak tumbuh dengan sehat, ceria, dan pintar!
            Kami mendukung anak-anak dalam belajar, bermain, dan berkembang dengan cara yang menyenangkan.
          </p>
          <p className="text-lg text-gray-700 mt-2">
            Dengan PAUD HI, anak-anak memiliki kesempatan untuk tumbuh sesuai dengan kemampuan mereka, mendapatkan asupan gizi yang baik,
            serta pendidikan yang menyenangkan.
          </p>

          {/* Ikon layanan */}
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <div className="flex flex-col items-center">
              <img src="/images/icons/edukasi-icon.jpg" alt="Edukasi" className="w-12 h-12" />
              <span className="text-sm">Edukasi</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/icons/kesehatan-icon.png" alt="Kesehatan" className="w-12 h-12" />
              <span className="text-sm">Kesehatan</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/icons/gizi-icon.png" alt="Gizi" className="w-12 h-12" />
              <span className="text-sm">Gizi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
