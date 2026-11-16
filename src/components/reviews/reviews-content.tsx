// Components.
import ReviewsButtonWrapper from './reviews-button-wrapper';
import ReviewsFormRating from './reviews-form-rating';

// Types.
import type { RatingValue } from '../../types/general';
import type {
  ReviewHandleChange,
  ReviewHandleText,
  ReviewSubmit,
  ReviewText,
} from '../../types/reviews';

type ReviewsContentTypes = {
  handleSubmit: ReviewSubmit;
  userRating: RatingValue | null;
  handleRatingChange: ReviewHandleChange;
  handleReviewText: ReviewHandleText;
  userReviewText: ReviewText;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
};

export default function ReviewsContent({
  handleSubmit,
  userRating,
  handleRatingChange,
  handleReviewText,
  userReviewText,
  isSubmitting,
  isSubmitDisabled,
}: ReviewsContentTypes): JSX.Element {
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <ReviewsFormRating
        userRating={userRating}
        handleChange={handleRatingChange}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewText}
        value={userReviewText}
      />
      <ReviewsButtonWrapper
        isSubmitting={isSubmitting}
        isSubmitDisabled={isSubmitDisabled}
      />
    </form>
  );
}
