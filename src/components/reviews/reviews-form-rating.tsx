import { Fragment } from 'react';

import { RATING_VALUES } from '../../const';

// Types.
import type { RatingValue } from '../../types/general';
import type { ReviewHandleChange } from '../../types/reviews';

type ReviewsFormRatingTypes = {
  userRating: RatingValue | null;
  handleChange: ReviewHandleChange;
};

export default function ReviewsFormRating({
  userRating,
  handleChange,
}: ReviewsFormRatingTypes) {
  return (
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
            onChange={handleChange}
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
  );
}

export { ReviewsFormRating };
