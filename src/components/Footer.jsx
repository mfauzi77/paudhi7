import React from 'react';
import pmklogo from '../assets/kl/pmk.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <a href="/maknalogo" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12">
                <img
                  src="/logo.png"
                  alt="Logo PAUD HI"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-base">Makna Logo PAUD HI</span>
            </a>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Navigasi
            </h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://asiksupport-stg.dto.kemkes.go.id/"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Layanan Kesehatan
                  </a>
                </li>
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=628111129129"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Konseling Keluarga
                  </a>
                </li>
                <li>
                  <a 
                    href="/pengasuhan"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Edukasi Parenting
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">
              Company
            </h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="/faq"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Kemenko PMK Info */}
          <div>
            <div className="mb-4">
              <img
                src={pmklogo}
                alt="Logo Kemenko PMK"
                className="h-12 w-auto mb-4"
              />
              <div className="text-white font-semibold text-base mb-1">
                Kementerian Koordinator Bidang
              </div>
              <div className="text-white font-semibold text-base mb-4">
                Pembangunan Manusia dan Kebudayaan
              </div>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">
              <p>Jl. Medan Merdeka Barat No.3</p>
              <p>RT.2/RW.3, Gambir, Kota Jakarta Pusat</p>
              <p>Daerah Khusus Ibukota Jakarta 10110</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} SISMONEV PAUD HI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;