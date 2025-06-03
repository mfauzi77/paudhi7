import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full shadow-md">
      {/* Background Merah Putih */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo & Judul */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-12 rounded-md shadow-md" />
            <h1 className="text-1xl font-bold text-black drop-shadow-md">
              PAUD HI<br />
              Pengembangan Anak Usia Dini Holistik Integratif
            </h1>
        
          </Link>

          {/* Tombol Menu (Mobile) */}
          <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Navigasi */}
      <nav className={`md:flex md:justify-center ${isOpen ? "block" : "hidden"} bg-white shadow-lg border-b-2 border-red-600`}>
        <ul className="flex flex-col md:flex-row md:space-x-8 py-3 md:py-2">
          {[
            { name: "Beranda", to: "/" },
            { name: "Data", to: "/data" },
            { name: "Laporan", to: "/laporan" },
            { name: "Kontak", to: "/kontak" },
            { name: "K/L", to: "/kl" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className="block px-4 py-2 text-gray-700 hover:text-red-600 transition duration-300 font-bold"
              >
                {item.name}

                
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
    </header>
  );
}
