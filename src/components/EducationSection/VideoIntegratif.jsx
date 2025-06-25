// src/components/EducationSection/VideoIntegratif.jsx
import React from 'react';
import { videoData } from './data';

const VideoIntegratif = ({ onItemClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-red-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Tonton video: ${item.title}`}
    >
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <img 
          src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayVideo}
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Play video ${item.title}`}
          >
            <i className="fas fa-play text-white text-xl ml-1" aria-hidden="true"></i>
          </button>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-semibold">
          {item.duration}
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <i className="fas fa-play-circle" aria-hidden="true"></i>
            {item.channel}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-user-tie" aria-hidden="true"></i>
            {item.expert}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <i className="fas fa-eye" aria-hidden="true"></i>
            {item.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-thumbs-up" aria-hidden="true"></i>
            {item.likes.toLocaleString()}
          </span>
        </div>

        <button 
          onClick={handlePlayVideo}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label={`Tonton video ${item.title}`}
        >
          <i className="fas fa-play" aria-hidden="true"></i>
          Tonton Video
        </button>
      </div>
    </article>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoIntegratif;