import { toast } from 'react-toastify';
import { getReviewValidationError } from './reviews-form.helper';

import type {
  ReviewSubmit,
  ReviewText,
  SubmitReviewType,
} from '../../types/reviews';
import type { RatingValue } from '../../types/general';
import type { Dispatch, SetStateAction } from 'react';

type SetStateBooleanType = Dispatch<SetStateAction<boolean>>;

type CreateHandleSubmitTypes = {
  userRating: RatingValue | null;
  userReviewText: ReviewText;
  setIsSubmitDisabled: SetStateBooleanType;
  submitReview: SubmitReviewType;
};

// Из-за настроек конфига вместо стрелочной функции.
const createHandleSubmit = function ({
  userRating,
  userReviewText,
  setIsSubmitDisabled,
  submitReview,
}: CreateHandleSubmitTypes): ReviewSubmit {
  return (e) => {
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
};

export { createHandleSubmit };
