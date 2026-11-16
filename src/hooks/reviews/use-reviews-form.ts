// General.
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAppDispatch } from '../redux';

// Helpers.
import {
  getReviewValidationError,
  isRatingValue,
} from '../../components/reviews/reviews-form.helper';

// Store.
import { fetchComments, sendCommentAction } from '../../store/api-actions';

// Types.
import type { RatingValue } from '../../types/general';
import type {
  ReviewHandleChange,
  ReviewHandleText,
  ReviewSubmit,
} from '../../types/reviews';
import type { SelectedOffer } from '../../types/selected-offer';

const useReviewsForm = (selectedOffer: SelectedOffer | null) => {
  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const submitReview = async (rating: RatingValue): Promise<void> => {
    if (!selectedOffer) {
      return;
    }

    try {
      setIsSubmitting(true);
      setIsSubmitDisabled(true);

      await dispatch(
        sendCommentAction({
          comment: userReviewText,
          rating,
          id: selectedOffer.id,
        }),
      ).unwrap();

      setUserRating(null);
      setUserReviewText('');

      // Запрашиваем обновлённый список комментариев.
      void dispatch(fetchComments(selectedOffer.id));
    } catch (error: unknown) {
      toast.error('Failed to send review. Try again.');
    } finally {
      setIsSubmitting(false);
      setIsSubmitDisabled(false);
    }
  };

  const handleSubmit: ReviewSubmit = (e) => {
    e.preventDefault();

    const validationError = getReviewValidationError({
      rating: userRating,
      text: userReviewText,
    });

    setIsSubmitDisabled(Boolean(validationError));

    if (validationError) {
      toast.warn(validationError);
      return;
    }

    if (userRating === null) {
      return;
    }

    void submitReview(userRating);
  };

  const handleReviewText: ReviewHandleText = (e) => {
    const value = e.currentTarget.value;
    setIsSubmitDisabled(false);
    setUserReviewText(value);
  };

  const handleRatingChange: ReviewHandleChange = (e) => {
    const value = Number(e.currentTarget.value);

    if (!isRatingValue(value)) {
      return;
    }
    setIsSubmitDisabled(false);
    setUserRating(value);
  };

  return {
    handleSubmit,
    userRating,
    handleRatingChange,
    userReviewText,
    handleReviewText,
    isSubmitting,
    isSubmitDisabled,
  };
};

export { useReviewsForm };
