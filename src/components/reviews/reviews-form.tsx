import { useState } from 'react';
import { RatingValue } from '../../types/general';
import { RATING_VALUES } from '../../const';

const isRatingValue = (value: string): value is RatingValue =>
  (RATING_VALUES as readonly string[]).includes(value);

export default function ReviewsForm(): JSX.Element {
  // TODO, остановился здесь
  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState('');

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log('userRating :', userRating);
    console.log('userReviewText :', userReviewText);
  };

  const ratingChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { value } = e.target;
    if (!isRatingValue(value)) {
      return;
    }
    setUserRating(value);
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
      <div
        className="reviews__rating-form form__rating"
        onChange={ratingChangeHandler}
      >
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={ratingChangeHandler}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={ratingChangeHandler}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={ratingChangeHandler}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={ratingChangeHandler}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={ratingChangeHandler}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
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
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
