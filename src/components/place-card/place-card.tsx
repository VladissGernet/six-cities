import cn from 'classnames';
import { Offer } from '../../types/offers';
import Rating from '../rating/rating';

type PlaceCardProps = {
  offer: Offer;
};

export default function PlaceCard({ offer }: PlaceCardProps): JSX.Element {
  const { isFavorite, isPremium, previewImage, price, rating, title, type } =
    offer;

  const bookmarkButtonClassName = cn(
    'place-card__bookmark-button',
    {
      'place-card__bookmark-button--active': isFavorite,
    },
    'button',
  );

  return (
    <article className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={bookmarkButtonClassName} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <Rating rating={rating} />
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
