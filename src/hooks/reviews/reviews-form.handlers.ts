import { toast } from 'react-toastify';
import { getReviewValidationError } from './reviews-form.helper';

import type {
  ReviewSubmit,
  ReviewText,
  SubmitReviewType,
} from '../../types/reviews';
import type { RatingValue } from '../../types/general';
import type { Dispatch, SetStateAction } from 'react';

type CreateHandleSubmitTypes = {
  userRating: RatingValue | null;
  userReviewText: ReviewText;
  setIsSubmitDisabled: Dispatch<SetStateAction<boolean>>;
  submitReview: SubmitReviewType;
};

const createHandleSubmit = ({
  userRating,
  userReviewText,
  setIsSubmitDisabled,
  submitReview,
}: CreateHandleSubmitTypes): ReviewSubmit => {
  const validationError = getReviewValidationError({
    rating: userRating,
    text: userReviewText,
  });

  return (e) => {
    e.preventDefault();

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
};

// TODO, продолжить перенос обработчиков.
export { createHandleSubmit };
