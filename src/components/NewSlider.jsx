import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const berita = [
  {
    id: 1,
    img: "/images/berita1.jpeg",
    judul: "Peningkatan Kualitas Pendidikan Anak Usia Dini",
    caption: "Program PAUD HI memberikan dampak positif bagi anak-anak.",
  },
  {
    id: 2,
    img: "/images/berita2.jpg",
    judul: "Pelatihan Guru PAUD di Seluruh Indonesia",
    caption: "Guru PAUD mendapat pelatihan terbaru untuk metode belajar.",
  },
  {
    id: 3,
    img: "/images/berita3.jpg",
    judul: "Meningkatkan Sarana & Prasarana PAUD",
    caption: "Pemerintah mengalokasikan anggaran lebih besar untuk PAUD.",
  },
];

export default function NewsSlider() {
  return (
    <section className="w-full flex flex-col justify-center items-center bg-white px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Berita Terkini PAUD HI
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 4000 }}
        loop
        direction="vertical"
        className="w-full max-w-6xl"
        style={{ height: '50vh', maxHeight: '500px' }}
      >
        {berita.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-xl overflow-hidden p-6 md:p-8 transition-transform duration-300 hover:scale-105">
              <img
                src={item.img}
                alt={item.judul}
                className="w-full md:w-[50%] h-[250px] md:h-[400px] object-cover rounded-md"
              />
              <div className="md:ml-8 mt-6 md:mt-0 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  {item.judul}
                </h3>
                <p className="text-gray-700 text-md md:text-lg mt-4">
                  {item.caption}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
