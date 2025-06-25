import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 'education',
    title: 'Layanan Pendidikan',
    subtitle:
      'Menjamin akses dan kualitas pendidikan anak usia dini, serta penguatan peran pendidik dan lembaga keagamaan',
    icon: 'fas fa-graduation-cap',
    gradient: 'from-blue-100 to-blue-400',
    features: [
      'Program Pendidikan Anak Usia Dini Pendidikan Dasar dan Pendidikan Menengah',
      'Program Guru dan Tenaga Kependidikan',
      'Program Pendidikan Islam',
      'Program Bimbingan Masyarakat Katolik',
      'Program Bimbingan Masyarakat Buddha',
      'Program Bimbingan Masyarakat Hindu',
      'Program Bimbingan Masyarakat Khonghucu',
    ],
    button: {
      text: 'Jelajahi',
      link: 'https://api.whatsapp.com/send/?phone=62812202050',
      style: 'bg-white text-blue-700 border-3 border-blue-100 hover:bg-white',
    },
  },
  {
    id: 'health',
    title: 'Layanan Kesehatan dan Gizi',
    subtitle:
      'Mendukung kesehatan fisik dan gizi anak sejak dini melalui program-program strategis nasional',
    icon: 'fas fa-heartbeat',
    gradient: 'from-emerald-100 to-emerald-400',
    features: [
      'Program Peningkatan Kesehatan Ibu, Anak, Keluarga Berencana (KB), dan Kesehatan Reproduksi',
      'Program Percepatan Perbaikan Gizi Masyarakat',
      'Peningkatan Pengendalian Penyakit',
      'Penguatan Gerakan Masyarakat Hidup Sehat (GERMAS)',
      'Penguatan Pelayanan Kesehatan Dasar dan Rujukan',
    ],
    button: {
      text: 'Akses',
      link: 'https://asiksupport-stg.dto.kemkes.go.id',
      style: 'bg-white text-emerald-700 border-3 border-emerald-100 hover:bg-white',
    },
  },
  {
    id: 'parenting',
    title: 'Layanan Perlindungan, Pengasuhan dan Kesejahteraan',
    subtitle:
      'Memberikan perlindungan menyeluruh bagi anak serta memperkuat lingkungan pengasuhan dan kesejahteraan keluarga',
    icon: 'fas fa-users',
    gradient: 'from-amber-100 to-amber-400',
    features: [
      'Program Kesejahteraan Sosial Anak Terlantar dan Miskin',
      'Program Kependudukan, Keluarga Berencana, dan Pembangunan Keluarga',
      'Program Pendidikan Anak Usia Dini dan Pendidikan Masyarakat',
      'Program Perlindungan Anak',
      'Program Pendidikan Islam',
    ],
    button: {
      text: 'Hubungi Ai',
      link: '/pengasuhan',
      style: 'bg-white text-amber-700 border-3 border-amber-100 hover:bg-white',
    },
  },
  {
    id: 'protection',
    title: 'Layanan Tata Kelola',
    subtitle:
      'Menjamin tata kelola program PAUD HI yang sinergis, terukur, dan berbasis data melalui koordinasi lintas sektor',
    icon: 'fas fa-shield-alt',
    gradient: 'from-purple-100 to-purple-400',
    features: [
      'Koordinasi Perencanaan Program PAUD HI',
      'Koordinasi Penyelenggaraan Program PAUD HI',
      'Koordinasi Pendataan Anak Usia Dini',
      'Program Pembangunan dan Pemberdayaan Masyarakat Desa',
    ],
    button: {
      text: 'Hubungi',
      link: 'https://api.whatsapp.com/send?phone=628111129129',
      style: 'bg-white text-purple-700 border-3 border-purple-100 hover:bg-white',
    },
  },
];

const ServicesSection = () => {
  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Layanan Unggulan PAUD HI
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Beragam program dan kegiatan lintas sektor disinergikan untuk memastikan pemenuhan hak dasar anak secara menyeluruh, mulai dari aspek kesehatan, gizi, pendidikan, pengasuhan, hingga tata kelola yang mendukung tumbuh kembang optimal.
          </p>
        </div>

        {/* Kartu layanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 bg-gradient-to-br ${service.gradient} text-gray-800 transition-all duration-300 min-h-[540px] flex flex-col`}
            >
              {/* Konten utama */}
              <div className="p-6 relative z-10 flex-1">
                <div className="w-14 h-14 flex items-center justify-center bg-white bg-opacity-30 rounded-xl mb-4">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.subtitle}</p>
              </div>

              {/* Tombol selalu tampil */}
              <div className="px-6 pb-6 z-10">
                <a
                  href={service.button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${service.button.style}`}
                >
                  {service.button.text}
                </a>
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 z-20 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold mb-2">Program Utama:</p>
                  <ul className="space-y-2 text-sm mb-4">
                    {service.features.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tombol tetap muncul saat hover */}
                <a
                  href={service.button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${service.button.style}`}
                >
                  {service.button.text}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-4xl">🚀</div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Butuh bantuan memilih layanan yang tepat?
              </h3>
              <p className="text-gray-600 mb-4">
                Tim ahli kami siap membantu Anda menemukan solusi terbaik untuk kebutuhan anak Anda
              </p>
              <button
                onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <i className="fas fa-robot mr-2"></i>
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
