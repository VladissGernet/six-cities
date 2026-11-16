// General.
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAppDispatch } from '../redux';

// Helpers.
import { isRatingValue } from './reviews-form.helper';

// Store.
import { fetchComments, sendCommentAction } from '../../store/api-actions';

// Types.
import type { RatingValue } from '../../types/general';
import type {
  ReviewHandleChange,
  ReviewHandleText,
  ReviewText,
  SubmitReviewType,
} from '../../types/reviews';
import type { SelectedOffer } from '../../types/selected-offer';

import { createHandleSubmit } from './reviews-form.handlers';

const useReviewsForm = (selectedOffer: SelectedOffer | null) => {
  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState<ReviewText>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const submitReview: SubmitReviewType = async (rating) => {
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

  const handleSubmit = createHandleSubmit({
    userRating,
    userReviewText,
    setIsSubmitDisabled,
    submitReview,
  });

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
