// src/components/EducationSection/PanduanHolistik.jsx
import React, { useRef } from 'react';
import { panduanData } from './data';

const PanduanHolistik = ({ onItemClick }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const gap = window.innerWidth >= 640 ? 24 : 16;
      container.scrollBy({
        left: -(cardWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0].offsetWidth;
      const gap = window.innerWidth >= 640 ? 24 : 16;
      container.scrollBy({
        left: cardWidth + gap,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      {/* Mobile Swipe Indicator */}
      <div className="flex justify-center mb-4 sm:hidden">
        <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>

      {/* Container with Navigation */}
      <div className="relative flex items-center">
        {/* Left Navigation Button */}
        {panduanData.length > 3 && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 shadow-xl -translate-x-3 hidden sm:flex"
            aria-label="Scroll Left"
          >
            <i className="fas fa-chevron-left text-sm lg:text-base"></i>
          </button>
        )}

        {/* Right Navigation Button */}
        {panduanData.length > 3 && (
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 shadow-xl translate-x-3 hidden sm:flex"
            aria-label="Scroll Right"
          >
            <i className="fas fa-chevron-right text-sm lg:text-base"></i>
          </button>
        )}

        {/* Cards Container - Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 px-1 ${
            panduanData.length > 3 ? 'sm:mx-16 lg:mx-20' : ''
          }`}
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollPaddingLeft: '16px',
            scrollPaddingRight: '16px'
          }}
        >
          {panduanData.map((item) => (
            <PanduanCard key={item.id} item={item} onItemClick={onItemClick} />
          ))}
        </div>
      </div>

      {/* Scroll Indicators */}
      {panduanData.length > 3 && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {Array.from({ length: Math.max(1, panduanData.length - 2) }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-300 opacity-60"
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 640px) {
          .scrollbar-hide {
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
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
      className="group bg-white rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] flex flex-col flex-shrink-0 w-64 sm:w-80 lg:w-96"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Buka detail panduan: ${item.title}`}
      style={{ scrollSnapAlign: 'start' }}
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