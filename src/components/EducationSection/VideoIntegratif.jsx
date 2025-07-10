// src/components/EducationSection/VideoIntegratif.jsx
import React from 'react';
import { videoData } from './data';

const VideoIntegratif = ({ onItemClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {videoData.map((item) => (
        <VideoCard key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  );
};

const VideoCard = React.memo(({ item, onItemClick }) => {
  const handleClick = () => {
    onItemClick(item);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onItemClick(item);
    }
  };

  const handlePlayVideo = (event) => {
    event.stopPropagation();
    // Buka video di tab baru
    window.open(`https://www.youtube.com/watch?v=${item.youtubeId}`, '_blank');
  };

  return (
    <article 
      className="group bg-white rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 lg:hover:-translate-y-2 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-red-500 min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] flex flex-col"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Tonton video: ${item.title}`}
    >
      <div className="relative h-24 sm:h-32 lg:h-48 bg-gray-900 overflow-hidden flex-shrink-0">
        <img 
          src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayVideo}
            className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Play video ${item.title}`}
          >
            <i className="fas fa-play text-white text-xs sm:text-sm lg:text-xl ml-0.5 sm:ml-1" aria-hidden="true"></i>
          </button>
        </div>
        <div className="absolute bottom-1 sm:bottom-2 lg:bottom-4 right-1 sm:right-2 lg:right-4 bg-black/80 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-semibold">
          {item.duration}
        </div>
        <div className="absolute top-1 sm:top-2 lg:top-4 left-1 sm:left-2 lg:left-4">
          <span className="bg-red-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col">
        <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 lg:mb-4 leading-relaxed line-clamp-2 lg:line-clamp-3 flex-1">
          {item.description}
        </p>

        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          {/* Channel and Expert - Hidden on mobile for space */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1 truncate">
              <i className="fas fa-play-circle" aria-hidden="true"></i>
              <span className="truncate">{item.channel}</span>
            </span>
            <span className="flex items-center gap-1 truncate hidden lg:flex">
              <i className="fas fa-user-tie" aria-hidden="true"></i>
              <span className="truncate">{item.expert}</span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <i className="fas fa-eye" aria-hidden="true"></i>
              <span className="hidden sm:inline">{item.views.toLocaleString()}</span>
              <span className="sm:hidden">{(item.views / 1000).toFixed(0)}k</span>
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-thumbs-up" aria-hidden="true"></i>
              <span className="hidden sm:inline">{item.likes.toLocaleString()}</span>
              <span className="sm:hidden">{(item.likes / 1000).toFixed(0)}k</span>
            </span>
          </div>

          {/* Play Button */}
          <button 
            onClick={handlePlayVideo}
            className="w-full bg-red-600 text-white py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-xs sm:text-sm"
            aria-label={`Tonton video ${item.title}`}
          >
            <i className="fas fa-play" aria-hidden="true"></i>
            <span className="hidden sm:inline">Tonton Video</span>
            <span className="sm:hidden">Play</span>
          </button>
        </div>
      </div>
    </article>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoIntegratif;