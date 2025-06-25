// src/components/EducationSection/PanduanHolistik.jsx
import React from 'react';
import { panduanData } from './data';

const PanduanHolistik = ({ onItemClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {panduanData.map((item) => (
        <PanduanCard key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  );
};

const PanduanCard = React.memo(({ item, onItemClick }) => {
  const handleClick = () => {
    onItemClick(item);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onItemClick(item);
    }
  };

  return (
    <article 
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Buka detail panduan: ${item.title}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {item.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex items-center gap-1 text-amber-500">
            <i className="fas fa-star text-sm" aria-hidden="true"></i>
            <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <i className="fas fa-user" aria-hidden="true"></i>
            {item.author}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-calendar" aria-hidden="true"></i>
            {item.publishDate}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <i className="fas fa-file-alt" aria-hidden="true"></i>
            {item.pages} halaman
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-download" aria-hidden="true"></i>
            {item.downloads.toLocaleString()}
          </span>
        </div>

        <button 
          onClick={() => {
            if (item.pdfUrl) {
              window.open(item.pdfUrl, '_blank');
            }
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Download panduan ${item.title}`}
        >
          <i className="fas fa-download" aria-hidden="true"></i>
          {item.pdfUrl ? 'Buka PDF' : 'Download Panduan'}
        </button>
      </div>
    </article>
  );
});

PanduanCard.displayName = 'PanduanCard';

export default PanduanHolistik;