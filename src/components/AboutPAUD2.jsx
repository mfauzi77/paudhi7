export default function AboutPAUD2() {
  return (
    <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-8 bg-white">
      
      {/* Deskripsi di Kiri */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-5xl font-bold text-yellow-600 mb-4 animate-pulse">
          PAUD Holistik Integratif: Sinergi Lintas Sektor untuk Masa Depan Anak Indonesia
        </h2>
        <p className="text-lg text-black leading-relaxed mb-4">
         Memahami PAUD Holistik Integratif (PAUD HI) penting agar setiap pemangku kepentingan dapat 
         berperan aktif dalam memberikan layanan yang menyeluruh dan terpadu bagi anak usia dini. 
         Pemahaman ini menjadi kunci dalam mewujudkan generasi yang sehat, cerdas, dan berkarakter sejak dini.
        </p>

      
        </div>

      {/* Gambar di Kanan */}
      <div className="md:w-1/2 animate-fade-in">
        <img
          src="/images/indikator.png"
          alt="PAUD HI"
          className="w-full rounded-lg transform hover:scale-105 transition-all duration-300"
        />
      </div>
    </section>
  );
}
