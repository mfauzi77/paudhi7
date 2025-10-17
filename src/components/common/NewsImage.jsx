import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const NewsImage = ({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "",
  showFallback = true,
  fallbackText = "Gambar tidak tersedia",
  fallbackIcon = true,
  hoverEffect = false,
  loading = "lazy",
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef(null);

  // Intersection Observer untuk lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Menggunakan logic yang sama persis dengan getImageUrl dari NewsSection
  const getImageUrl = (rawSrc) => {
    if (!rawSrc) return null;
    
    const apiBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
      ? import.meta.env.VITE_API_URL
      : (window && window.PAUDHI_API_BASE) || import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');
    const backendOrigin = apiBase.replace(/\/$/, '').replace(/\/api$/, '');
    
    // Debug logging
    console.log('🔍 NewsImage getImageUrl called with:', {
      rawSrc: rawSrc,
      backendOrigin: backendOrigin
    });
    
    // Cek apakah artikel memiliki image
    if (!rawSrc) {
      console.log('❌ No image field');
      return null;
    }

    // Jika image adalah string (filename atau URL dari backend)
    if (typeof rawSrc === 'string') {
      // Jika sudah http, return langsung
      if (rawSrc.startsWith('http')) {
        console.log('✅ NewsImage: Full URL image:', rawSrc);
        return rawSrc;
      }
      // Jika filename atau relative, tambahkan path uploads/news
      if (rawSrc.startsWith('/uploads/')) {
        const imageUrl = `${backendOrigin}${rawSrc}`;
        console.log('✅ NewsImage: Constructed image URL (relative /uploads):', imageUrl);
        return imageUrl;
      }
      if (rawSrc.startsWith('uploads/')) {
        const imageUrl = `${backendOrigin}/${rawSrc}`;
        console.log('✅ NewsImage: Constructed image URL (uploads/):', imageUrl);
        return imageUrl;
      }
      const imageUrl = `${backendOrigin}/uploads/news/${rawSrc}`;
      console.log('✅ NewsImage: Constructed image URL (filename):', imageUrl);
      return imageUrl;
    }

    // Fallback untuk object (jika masih ada masalah)
    if (rawSrc && typeof rawSrc === 'object') {
      console.log('⚠️ NewsImage: Image is object, trying to extract filename:', rawSrc);
      
      if (rawSrc.url) {
        const imageUrl = getImageUrl(rawSrc.url);
        console.log('✅ NewsImage: Extracted URL from object:', imageUrl);
        return imageUrl;
      }
      
      if (rawSrc.filename) {
        const imageUrl = `${backendOrigin}/uploads/news/${rawSrc.filename}`;
        console.log('✅ NewsImage: Constructed image URL from object filename:', imageUrl);
        return imageUrl;
      }
    }

    console.log('❌ NewsImage: Could not resolve image URL for:', rawSrc);
    return null;
  };

  // Set initial src ketika component masuk viewport
  useEffect(() => {
    if (isInView && !currentSrc) {
      const imageUrl = getImageUrl(src);
      console.log('🔄 NewsImage: Setting initial src:', {
        isInView: isInView,
        src: src,
        imageUrl: imageUrl
      });
      setCurrentSrc(imageUrl || "");
    }
  }, [isInView, src, currentSrc]);

  // Handle image error
  const handleImageError = () => {
    console.log('❌ NewsImage error:', {
      currentSrc: currentSrc,
      src: src
    });
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ NewsImage loaded successfully:', {
      currentSrc: currentSrc,
      src: src
    });
    setImageLoaded(true);
  };

  const shouldShowImage = !!currentSrc && !imageError && isInView;

  return (
    <div 
      ref={imgRef}
      className={`relative ${hoverEffect ? 'group' : ''}`}
    >
      {(!src || imageError || !shouldShowImage) ? (
        showFallback ? (
          <div className={`flex items-center justify-center bg-gray-100 ${fallbackClassName}`}>
            <div className="text-center">
              {fallbackIcon && <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />}
              <p className="text-xs text-gray-500">{fallbackText}</p>
            </div>
          </div>
        ) : (
          // Placeholder saat belum masuk viewport
          <div className={`bg-gray-100 animate-pulse ${className}`}>
            <div className="w-full h-full bg-gray-200 rounded"></div>
          </div>
        )
      ) : (
        <>
          <img
            src={currentSrc}
            alt={alt}
            className={`${className} ${hoverEffect ? 'transition-transform duration-300 group-hover:scale-105' : ''}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading={loading}
            decoding="async"
            {...props}
          />
          
          {/* Loading state */}
          {!imageLoaded && !imageError && currentSrc ? (
            <div className="absolute inset-0 bg-gray-100/60 backdrop-blur-[1px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
            </div>
          ) : null}
          
          {/* Hover overlay */}
          {hoverEffect && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white bg-opacity-90 rounded-full p-2">
                  <ImageIcon className="w-4 h-4 text-gray-700" />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsImage;
