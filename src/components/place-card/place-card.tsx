import cn from 'classnames';
import { Offer } from '../../types/offers';
import Rating from '../rating/rating';

type PlaceCardProps = {
  offer: Offer;

  parentName: string;
  imageSizes: {
    width: number;
    height: number;
  };
};

export default function PlaceCard({
  offer,
  /*
  TODO, исправить parentName на такойже, как и в Rating решение.
  TODO, рассмотреть возможность использования переиспользование и наращивание типов через "&"
  // Например
  type Item = {
    id: string;
  };

  type Post = Item & {
    title: string;
    description: string;
  };

  type MegaPost = Post & {
    viewsCount: number;
  };
  */
  parentName,
  imageSizes,
}: PlaceCardProps): JSX.Element {
  const { isFavorite, isPremium, previewImage, price, rating, title, type } =
    offer;

  const bookmarkButtonClassName = cn(
    'place-card__bookmark-button',
    isFavorite && 'place-card__bookmark-button--active',
    'button',
  );

  return (
    <article className={`${parentName}__card place-card`}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${parentName}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={imageSizes.width}
            height={imageSizes.height}
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
        <Rating
          rating={rating}
          rootClassName={'place-card__rating'}
          starsWrapperClassName={'place-card__stars'}
        />
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
