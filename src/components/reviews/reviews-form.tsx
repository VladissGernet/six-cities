import {
  useState,
  FormEventHandler,
  ChangeEventHandler,
  Fragment,
} from 'react';
import { RatingValue } from '../../types/general';
import { RATING_VALUES, MIN_TEXTAREA_CHARACTERS } from '../../const';
// TODO
// DEV ONLY, REMOVE!!!
const TEST_MIN_TEXTAREA_CHARACTERS = 3;

// Доработать на основании
// https://www.perplexity.ai/search/b2463bbb-8574-4a34-bc58-7dc06efacd57#4
const isRatingValue = (value: string): value is RatingValue =>
  (RATING_VALUES as readonly string[]).includes(value);

export default function ReviewsForm(): JSX.Element {
  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(true);

  const toggleSubmitButton = (
    ratingValue: RatingValue,
    reviewText: string,
  ): boolean =>
    !(
      isRatingValue(ratingValue) &&
      reviewText.length >= TEST_MIN_TEXTAREA_CHARACTERS
    );

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('userRating :', userRating);
    console.log('userReviewText :', userReviewText);
  };

  const reviewTextHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.target.value;
    setUserReviewText(value);
    setIsSubmitButtonDisabled(
      toggleSubmitButton(userRating as RatingValue, value),
    );
  };

  const ratingChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (!isRatingValue(value)) {
      return;
    }
    setUserRating(value);
    setIsSubmitButtonDisabled(toggleSubmitButton(value, userReviewText));
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={submitHandler}
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
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={ratingChangeHandler}
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
        onChange={reviewTextHandler}
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
          disabled={isSubmitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
