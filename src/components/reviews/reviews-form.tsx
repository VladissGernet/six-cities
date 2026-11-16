// General.
import { useState } from 'react';
import { toast } from 'react-toastify';

// Components.
import ReviewsContent from './reviews-content';

// Store.
import { fetchComments, sendCommentAction } from '../../store/api-actions';
import { getSelectedOffer } from '../../store/selected-offer/selected-offer.selectors';
import { getAuthenticationStatus } from '../../store/user/user.selectors';

// Hooks.
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Const.
import { AuthenticationStatus } from '../../const';

// Helpers.
import { getReviewValidationError, isRatingValue } from './reviews-form.helper';

// Types.
import type { RatingValue } from '../../types/general';
import type {
  ReviewHandleChange,
  ReviewHandleText,
  ReviewSubmit,
} from '../../types/reviews';

export default function ReviewsForm(): JSX.Element | null {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const selectedOffer = useAppSelector(getSelectedOffer);

  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  if (!selectedOffer) {
    return null;
  }

  if (authenticationStatus !== AuthenticationStatus.Auth) {
    return <span>Sign in to leave a review.</span>;
  }

  const submitReview = async (rating: RatingValue): Promise<void> => {
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

  const formProps = {
    handleSubmit: handleSubmit,
    userRating: userRating,
    handleRatingChange: handleRatingChange,
    userReviewText: userReviewText,
    handleReviewText: handleReviewText,
    isSubmitting,
    isSubmitDisabled,
  };

  return <ReviewsContent {...formProps} />;
}
