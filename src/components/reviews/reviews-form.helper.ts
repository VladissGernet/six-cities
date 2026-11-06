import { RATING_VALUES } from '../../const';
import type { RatingValue } from '../../types/general';

type ReviewData = {
  rating: RatingValue | null;
  text: string;
};

const isRatingValue = (value: number): value is RatingValue =>
  (RATING_VALUES as readonly number[]).includes(value);

const MIN_TEXTAREA_CHARACTERS = 50;
const MAX_TEXTAREA_CHARACTERS = 300;

const getReviewValidationError = ({
  rating,
  text,
}: ReviewData): string | null => {
  if (rating === null) {
    return 'Please select a rating.';
  }

  if (
    text.length < MIN_TEXTAREA_CHARACTERS ||
    text.length > MAX_TEXTAREA_CHARACTERS
  ) {
    return `
      Review must contain between ${MIN_TEXTAREA_CHARACTERS}
      and ${MAX_TEXTAREA_CHARACTERS} characters. Present review
      text length is ${text.length}.
    `;
  }

  return null;
};

export { isRatingValue, getReviewValidationError };
