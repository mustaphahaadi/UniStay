import { useState } from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

const ReviewForm = ({ hostelId, onReviewSubmitted }) => {
  const { user, isAuthenticated } = useAuth();
  const { success: showSuccess, error: showError } = useNotification();
  const { t } = useLanguage();
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (rating === 0) {
      newErrors.rating = t('reviews.errors.rating');
    }
    
    if (!comment.trim()) {
      newErrors.comment = t('reviews.errors.comment');
    } else if (comment.trim().length < 10) {
      newErrors.comment = t('reviews.errors.commentLength');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      showError(t('reviews.errors.login'));
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to submit the review
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSuccess(t('reviews.success'));
      
      // Reset form
      setRating(0);
      setComment('');
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted({
          id: Date.now(),
          user_id: user.id,
          hostel_id: hostelId,
          rating,
          comment,
          created_at: new Date().toISOString(),
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          }
        });
      }
    } catch (error) {
      showError(t('reviews.errors.submission'));
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        {t('reviews.writeReview')}
      </h3>
      
      {!isAuthenticated ? (
        <div className="flex items-start p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-300">
          <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
          <div>
            {t('reviews.loginRequired')}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('reviews.rating')}
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      (hoverRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {rating > 0 && (
                  <>
                    {rating}/5 - {
                      rating === 1 ? t('reviews.ratings.poor') :
                      rating === 2 ? t('reviews.ratings.fair') :
                      rating === 3 ? t('reviews.ratings.good') :
                      rating === 4 ? t('reviews.ratings.veryGood') :
                      t('reviews.ratings.excellent')
                    }
                  </>
                )}
              </span>
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rating}</p>
            )}
          </div>
          
          {/* Comment */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('reviews.comment')}
            </label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.comment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white`}
              placeholder={t('reviews.commentPlaceholder')}
            ></textarea>
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.comment}</p>
            )}
          </div>
          
          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? t('reviews.submitting') : t('reviews.submit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;