import { useState } from 'react';

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  readOnly = false,
  onChange,
  showValue = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleMouseEnter = (index) => {
    if (!readOnly) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  const handleClick = (index) => {
    if (!readOnly && onChange) {
      onChange(index);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex">
        {[...Array(max)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <button
              key={index}
              type={readOnly ? 'button' : 'button'}
              className={`${sizeClasses[size]} ${
                readOnly ? 'cursor-default' : 'cursor-pointer'
              }`}
              onMouseEnter={() => handleMouseEnter(ratingValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(ratingValue)}
              disabled={readOnly}
            >
              <svg
                className={`${sizeClasses[size]} ${
                  ratingValue <= displayValue
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {displayValue.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};

export default Rating; 