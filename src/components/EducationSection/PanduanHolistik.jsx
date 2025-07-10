// src/components/EducationSection/PanduanHolistik.jsx
import React from 'react';
import { panduanData } from './data';

const PanduanHolistik = ({ onItemClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
      className="group bg-white rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] flex flex-col"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Buka detail panduan: ${item.title}`}
    >
      <div className="relative h-24 sm:h-32 lg:h-48 overflow-hidden flex-shrink-0">
        <img 
          src={item.thumbnail} 
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4">
          <span className="bg-blue-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
            {item.category}
          </span>
        </div>
        <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1">
          <div className="flex items-center gap-1 text-amber-500">
            <i className="fas fa-star text-xs sm:text-sm" aria-hidden="true"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">{item.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col">
        <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 lg:mb-4 leading-relaxed line-clamp-2 lg:line-clamp-3 flex-1">
          {item.description}
        </p>

        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {/* Author and Date - Hidden on mobile for space */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1 truncate">
              <i className="fas fa-user" aria-hidden="true"></i>
              <span className="truncate">{item.author}</span>
            </span>
            <span className="flex items-center gap-1 hidden lg:flex">
              <i className="fas fa-calendar" aria-hidden="true"></i>
              {item.publishDate}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <i className="fas fa-file-alt" aria-hidden="true"></i>
              <span className="hidden sm:inline">{item.pages} hal</span>
              <span className="sm:hidden">{item.pages}</span>
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-download" aria-hidden="true"></i>
              <span className="hidden sm:inline">{item.downloads.toLocaleString()}</span>
              <span className="sm:hidden">{(item.downloads / 1000).toFixed(0)}k</span>
            </span>
          </div>

          {/* Download Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (item.pdfUrl) {
                window.open(item.pdfUrl, '_blank');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xs sm:text-sm"
            aria-label={`Download panduan ${item.title}`}
          >
            <i className="fas fa-download" aria-hidden="true"></i>
            <span className="hidden sm:inline">{item.pdfUrl ? 'Buka PDF' : 'Download'}</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </article>
  );
});

PanduanCard.displayName = 'PanduanCard';

export default PanduanHolistik;