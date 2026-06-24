import { RATING_TO_PERCENT } from '../../const';

type RatingProps = {
  rating: number;
};

export default function Rating({ rating }: RatingProps): JSX.Element {
  const finalWidth = `${Math.round(rating) * RATING_TO_PERCENT}%`;

  return (
    // TODO, исправить класс.
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: finalWidth }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
