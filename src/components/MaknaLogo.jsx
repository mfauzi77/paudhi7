import React from 'react';
import maknalogo from '../images/maknalogo.jpg'; // Pastikan path ini sesuai dengan lokasi gambar Anda
import Footer from './Footer';
const MaknaLogo = () => {
  return (
    <div>
    <div className="min-h-screen flex flex-col items-center justify-center px-2 py-10 bg-gray-50 text-gray-800 text-center">
      {/* Logo di tengah */}
      <div className="w-350 h-350 py-1 pt-15 ">
        <img
          src={maknalogo} // Pastikan path ini sesuai dengan lokasi gambar Anda maknalogo
          alt="Logo PAUD HI"
          className="w-full h-full object-contain"
        />
      </div>
    
    </div>
    <Footer />
    </div>
  );
};

export default MaknaLogo;
