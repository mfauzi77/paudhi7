import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'SISMONEV PAUD HI',
      content: 'description',
      description: 'Sistem Informasi, Monitoring, dan Evaluasi PAUD Holistik Integratif yang mendukung tumbuh kembang optimal anak-anak Indonesia melalui layanan terintegrasi dan berkualitas.',
      contact: {
        phone: '+62 21 1234 5678',
        email: 'info@paudhi.kemenkopmk.go.id',
        address: ' Jl. Medan Merdeka Barat No.3, RT.2/RW.3, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110, Indonesia'
      }
    },
    {
      title: 'Layanan',
      content: 'links',
      links: [
        { name: 'Direktori PAUD', href: '#direktori' },
        { name: 'Layanan Kesehatan', href: '#kesehatan' },
        { name: 'Konseling Keluarga', href: '#konseling' },
        { name: 'Monitoring Tumbuh Kembang', href: '#monitoring' },
        { name: 'Edukasi Parenting', href: '#parenting' },
        { name: 'Perlindungan Anak', href: '#perlindungan' }
      ]
    },
    {
      title: 'Informasi',
      content: 'links',
      links: [
        { name: 'Tentang Kami', href: '#tentang' },
        { name: 'Berita Terkini', href: '#berita' },
        { name: 'Panduan Pengguna', href: '#panduan' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Kebijakan Privasi', href: '#privasi' },
        { name: 'Syarat & Ketentuan', href: '#syarat' }
      ]
    },
    {
      title: 'Dukungan',
      content: 'links',
      links: [
        { name: 'Pusat Bantuan', href: '#bantuan' },
        { name: 'Kontak Support', href: '#support' },
        { name: 'Pelatihan & Workshop', href: '#pelatihan' },
        { name: 'API Documentation', href: '#api' },
        { name: 'Download Mobile App', href: '#app' },
        { name: 'Hubungi Kami', href: '#kontak' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', href: '#facebook', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: 'fab fa-twitter', href: '#twitter', color: 'hover:bg-blue-400' },
    { name: 'Instagram', icon: 'fab fa-instagram', href: '#instagram', color: 'hover:bg-pink-500' },
    { name: 'YouTube', icon: 'fab fa-youtube', href: '#youtube', color: 'hover:bg-red-600' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', href: '#linkedin', color: 'hover:bg-blue-700' },
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', href: '#whatsapp', color: 'hover:bg-green-500' }
  ];

  const partnerLogos = [
    { name: 'Kemendikbud', icon: 'fas fa-university' },
    { name: 'Kemenkes', icon: 'fas fa-hospital' },
    { name: 'BKKBN', icon: 'fas fa-users' },
    { name: 'Kemensos', icon: 'fas fa-hands-helping' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {footerSections.map((section, index) => (
            <div key={index} className={`${index === 0 ? 'lg:col-span-1' : ''}`}>
              <h3 className="text-xl font-bold mb-6 relative">
                {section.title}
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transform origin-left"></div>
              </h3>
              
              {section.content === 'description' ? (
                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                      <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <i className="fas fa-phone text-sm"></i>
                      </div>
                      <span>{section.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                      <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                        <i className="fas fa-envelope text-sm"></i>
                      </div>
                      <span>{section.contact.email}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors group">
                      <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors flex-shrink-0 mt-0.5">
                        <i className="fas fa-map-marker-alt text-sm"></i>
                      </div>
                      <span className="leading-relaxed">{section.contact.address}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                      >
                        <i className="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Partners Section */}
        

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Social Media Links */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold mb-4">
                Ikuti Kami
              </h4>
              <div className="flex gap-4 justify-center lg:justify-start">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                    title={social.name}
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="text-center lg:text-right">
              <h4 className="text-lg font-semibold mb-4">
                Newsletter
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
                />
                <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
                  Berlangganan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">
              Download Aplikasi Mobile
            </h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Akses layanan SISMONEV PAUD HI kapan saja dan di mana saja melalui aplikasi mobile kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 group">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                  <i className="fab fa-apple text-white"></i>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download di</div>
                  <div className="font-semibold group-hover:text-blue-300">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 group">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                  <i className="fab fa-google-play text-white"></i>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download di</div>
                  <div className="font-semibold group-hover:text-green-300">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <p className="text-gray-400">
                © {currentYear} SISMONEV PAUD HI. Seluruh hak cipta dilindungi undang-undang.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#privasi" className="text-gray-400 hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#syarat" className="text-gray-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#aksesibilitas" className="text-gray-400 hover:text-white transition-colors">
                Aksesibilitas
              </a>
              <a href="#sitemap" className="text-gray-400 hover:text-white transition-colors">
                Peta Situs
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-50 flex items-center justify-center group"
        >
          <i className="fas fa-chevron-up group-hover:animate-bounce"></i>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
    </footer>
  );
};

export default Footer;