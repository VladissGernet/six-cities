import { RATING_VALUES } from '../../const';
import type { RatingValue } from '../../types/general';

const isRatingValue = (value: number): value is RatingValue =>
  (RATING_VALUES as readonly number[]).includes(value);

export { isRatingValue };
