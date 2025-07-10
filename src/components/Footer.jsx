import React from 'react';
import { Facebook, Twitter, Instagram, Github, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Use Cases',
      links: [
        { name: 'Layanan Kesehatan', href: 'https://asiksupport-stg.dto.kemkes.go.id/', external: true },
        { name: 'Konseling Keluarga', href: 'https://api.whatsapp.com/send?phone=628111129129', external: true },
        { name: 'Edukasi Parenting', href: '/pengasuhan' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'FAQs', href: '/faq' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook' },
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'Instagram', icon: Instagram, href: '#instagram' },
    { name: 'Github', icon: Github, href: '#github' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
    { name: 'Website', icon: Globe, href: '#website' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
       {/* Logo and Description */}
<div className="md:col-span-1">
  <div className="flex items-center gap-2 mb-4">
    <a href="/maknalogo" className="flex items-center gap-2">
      <div className="w-12 h-12">
        <img
          src="/logo.png"
          alt="Logo PAUD HI"
          className="w-full h-full object-contain"
        />
      </div>
            <span className="text-sm text-white mt-1">Makna Logo PAUD HI</span>

    </a>
  </div>
 
</div>


          {/* Use Cases */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              Navigasi
            </h3>
            <nav>
              <ul className="space-y-4">
                {footerSections[0].links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                      {...(link.external ? { 
                        target: "_blank", 
                        rel: "noopener noreferrer" 
                      } : {})}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              Company
            </h3>
            <nav>
              <ul className="space-y-4">
                {footerSections[1].links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-semibold text-base mb-6">
              Follow us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
                    title={social.name}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
<div className="flex justify-center">
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