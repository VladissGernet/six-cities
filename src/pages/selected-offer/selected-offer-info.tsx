// General.
import cn from 'classnames';

// Components.
import Container from '../../components/container/container';
import Rating from '../../components/rating/rating';
import OfferFeatures from './selected-offer-features';
import OfferHost from './selected-offer-host';
import OfferInside from './selected-offer-inside';
import OfferReviews from './selected-offer-reviews';

// Types.
import type { SelectedOffer } from '../../types/offers';

type OfferInfoProps = {
  offerData: SelectedOffer;
};

type OfferMarkProps = Pick<SelectedOffer, 'isPremium'>;

type OfferNameProps = Pick<SelectedOffer, 'title' | 'isFavorite'>;

function OfferMark({ isPremium }: OfferMarkProps): JSX.Element | null {
  return isPremium ? (
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  ) : null;
}

function OfferName({ title, isFavorite }: OfferNameProps): JSX.Element | null {
  const bookmarkClass = cn(
    'offer__bookmark-button',
    isFavorite && 'offer__bookmark-button--active',
    'button',
  );

  return (
    <div className="offer__name-wrapper">
      <h1 className="offer__name">{title}</h1>
      <button className={bookmarkClass} type="button">
        <svg className="offer__bookmark-icon" width="31" height="33">
          <use href="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    </div>
  );
}

export default function OfferInfo({ offerData }: OfferInfoProps): JSX.Element {
  const {
    title,
    isPremium,
    rating,
    type,
    price,
    bedrooms,
    description,
    host,
    isFavorite,
    maxAdults,
    goods,
  } = offerData;

  return (
    <Container className="offer__container container">
      <div className="offer__wrapper">
        <OfferMark isPremium={isPremium} />
        <OfferName title={title} isFavorite={isFavorite} />
        <Rating
          rating={rating}
          rootClassName={'offer__rating'}
          starsWrapperClassName={'offer__stars'}
          valueClassName={'offer__rating-value'}
          showValue
        />
        <OfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults} />
        <div className="offer__price">
          <b className="offer__price-value">&euro;{price}</b>
          <span className="offer__price-text">&nbsp;night</span>
        </div>
        <OfferInside goods={goods} />
        <OfferHost description={description} host={host} />
        <OfferReviews />
      </div>
    </Container>
  );
}
