import React, { useState, useEffect } from 'react';
import slide1 from '../images/slide1.jpg';
import slide2 from '../images/slide2.png';
import slide3 from '../images/slide3.jpg';
import slide4 from '../images/slide4.jpg';
import slide5 from '../images/slide5.jpg';
import slide6 from '../images/slide6.jpg';  
import slide7 from '../images/slide7.jpg';

const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

const HeroSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 5000);
    const transitionTimer = setTimeout(() => setShowIntro(false), 6500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(transitionTimer);
    };
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(autoSlide);
  }, []);

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handleManualStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  };

  return (
    <>
      {/* === PC Version === */}
      <section className="hidden md:flex relative items-center justify-center bg-white px-1 pt-20 overflow-hidden h-[60vh]">
        {/* Background & ornaments */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Main */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {showIntro ? (
            <div className={`text-center transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Sistem Informasi, Monitoring, dan Evaluasi</h1>
              <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-blue-700">PAUD Holistik Integratif</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                Sistem terpadu yang dirancang untuk memantau dan mengevaluasi pelaksanaan layanan PAUD HI lintas sektor guna memastikan keterpaduan data dan efektivitas program.
              </p>
              <button
                onClick={handleManualStart}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-lg shadow-lg transition duration-300"
              >
                Mulai Jelajah
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full rounded-xl shadow-xl overflow-hidden transition-all duration-1000 mx-auto">
              <img
                src={slides[slideIndex]}
                alt={`Slide ${slideIndex}`}
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
              />
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-xl p-3 rounded-full shadow-lg"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-xl p-3 rounded-full shadow-lg"
              >
                ❯
              </button>
            </div>
          )}
        </div>
      </section>

    {/* === MOBILE Version === */}
<section className="block md:hidden bg-white pt-20 pb-0 min-h-0">
  {showIntro ? (
    <div className={`text-center transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">
        Sistem Informasi, Monitoring, dan Evaluasi
      </h1>
      <h2 className="text-lg font-semibold text-blue-700 mb-4">
        PAUD Holistik Integratif
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed mb-6 px-2">
        Sistem terpadu yang dirancang untuk memantau dan mengevaluasi pelaksanaan layanan PAUD HI lintas sektor guna memastikan keterpaduan data dan efektivitas program.
      </p>
      <button
        onClick={handleManualStart}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-lg shadow-lg transition duration-300 w-full max-w-xs"
      >
        Mulai Jelajah
      </button>
    </div>
  ) : (
    <>
      {/* Gambar seperti w-60 img-fluid Bootstrap */}
      <div className="relative w-full">
        <img
          src={slides[slideIndex]}
          alt={`Slide ${slideIndex + 1}`}
className="block mx-auto w-[100%] sm:w-[85%] max-w-full h-auto shadow"
        />
        <button
  onClick={prevSlide}
  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 text-sm p-1.5 rounded-full shadow"
>
  ❮
</button>
<button
  onClick={nextSlide}
  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 text-sm p-1.5 rounded-full shadow"
>
  ❯
</button>

      </div>

      {/* DOT INDICATORS */}
      <div className="flex justify-center space-x-2 mt-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlideIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
  index === slideIndex
    ? 'bg-blue-600 w-4'
    : 'bg-gray-300 hover:bg-gray-400'
}`}

          />
        ))}
      </div>
    </>
  )}
</section>




      {/* Custom Styles */}
      <style jsx>{`
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </>
  );
};

export default HeroSection;
