// General.
import { useState, Fragment } from 'react';
import { toast } from 'react-toastify';

// Types.
import type { RatingValue } from '../../types/general';
import type { FormEventHandler, ChangeEventHandler } from 'react';

// Store.
import { fetchComments, sendCommentAction } from '../../store/api-actions';
import { getSelectedOffer } from '../../store/selected-offer/selected-offer.selectors';
import { getAuthenticationStatus } from '../../store/user/user.selectors';

// Hooks.
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Const.
import { AuthenticationStatus, RATING_VALUES } from '../../const';

// Helpers.
import { getReviewValidationError, isRatingValue } from './reviews-form.helper';

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
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

  const handleReviewText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.currentTarget.value;
    setIsSubmitDisabled(false);
    setUserReviewText(value);
  };

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.currentTarget.value);

    if (!isRatingValue(value)) {
      return;
    }
    setIsSubmitDisabled(false);
    setUserRating(value);
  };

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
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.toReversed().map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              type="radio"
              value={value}
              id={`${value}-stars`}
              checked={userRating === value}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewText}
        value={userReviewText}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
