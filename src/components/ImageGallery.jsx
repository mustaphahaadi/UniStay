import { useState } from 'react';

const ImageGallery = ({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrevious = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsLightboxOpen(false);
    } else if (e.key === 'ArrowLeft') {
      handlePrevious(e);
    } else if (e.key === 'ArrowRight') {
      handleNext(e);
    }
  };

  const Lightbox = () => {
    if (!isLightboxOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={() => setIsLightboxOpen(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button
          className="absolute left-4 text-white hover:text-gray-300"
          onClick={handlePrevious}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <img
          src={images[selectedImage]}
          alt={`Gallery image ${selectedImage + 1}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />

        <button
          className="absolute right-4 text-white hover:text-gray-300"
          onClick={handleNext}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {selectedImage + 1} / {images.length}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div
        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
        onClick={() => setIsLightboxOpen(true)}
      >
        <img
          src={images[selectedImage]}
          alt={`Gallery image ${selectedImage + 1}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              className="rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
              onClick={handlePrevious}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
              onClick={handleNext}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`aspect-video overflow-hidden rounded-lg ${
                selectedImage === index
                  ? 'ring-2 ring-teal-500'
                  : 'hover:opacity-75'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox />
    </div>
  );
};

export default ImageGallery; 