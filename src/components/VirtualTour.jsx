import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, Maximize, Minimize, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VirtualTour = ({ tourImages, onClose }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const tourContainerRef = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigatePrevious();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, tourImages.length]);

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide info after 5 seconds
  useEffect(() => {
    if (showInfo) {
      const timer = setTimeout(() => {
        setShowInfo(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInfo]);

  const navigatePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tourImages.length - 1 : prevIndex - 1
    );
  };

  const navigateNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      tourContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Mouse events for thumbnail scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={tourContainerRef}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      {/* Main image display */}
      <div className="flex-grow flex items-center justify-center relative">
        <img 
          src={tourImages[currentImageIndex].url} 
          alt={tourImages[currentImageIndex].caption || `Tour image ${currentImageIndex + 1}`}
          className="max-h-full max-w-full object-contain"
        />
        
        {/* Navigation arrows */}
        <button 
          onClick={navigatePrevious}
          className="absolute left-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
          aria-label={t('virtualTour.previous')}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={navigateNext}
          className="absolute right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
          aria-label={t('virtualTour.next')}
        >
          <ArrowRight className="h-6 w-6" />
        </button>

        {/* Caption */}
        {tourImages[currentImageIndex].caption && showInfo && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-3 rounded-md max-w-md text-center">
            {tourImages[currentImageIndex].caption}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div 
        ref={containerRef}
        className="h-24 bg-black flex items-center overflow-x-auto scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {tourImages.map((image, index) => (
          <div 
            key={index}
            className={`flex-shrink-0 h-20 w-32 mx-1 cursor-pointer border-2 ${
              index === currentImageIndex ? 'border-teal-500' : 'border-transparent'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img 
              src={image.url} 
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
          aria-label={showInfo ? t('virtualTour.hideInfo') : t('virtualTour.showInfo')}
        >
          <Info className="h-5 w-5" />
        </button>
        
        <button 
          onClick={toggleFullscreen}
          className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
          aria-label={isFullscreen ? t('virtualTour.exitFullscreen') : t('virtualTour.fullscreen')}
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
        
        <button 
          onClick={onClose}
          className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-opacity"
          aria-label={t('virtualTour.close')}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Counter */}
      <div className="absolute bottom-28 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md">
        {currentImageIndex + 1} / {tourImages.length}
      </div>
    </div>
  );
};

export default VirtualTour;