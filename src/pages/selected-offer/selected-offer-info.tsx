// Components.
import Container from '../../components/container/container';
import Rating from '../../components/rating/rating';
import OfferFeatures from './selected-offer-features';
import OfferHost from './selected-offer-host';
import OfferInside from './selected-offer-inside';
import OfferReviews from './selected-offer-reviews';
import FavoriteButton from '../../components/favorite-button/favorite-button';

// Types.
import type { SelectedOffer } from '../../types/selected-offer';

type OfferInfoProps = {
  offerData: SelectedOffer;
};

type OfferMarkProps = Pick<SelectedOffer, 'isPremium'>;

type OfferNameProps = Pick<SelectedOffer, 'title' | 'isFavorite'>;

const BOOKMARK_BUTTON_SIZES = {
  width: 31,
  height: 33,
};

function OfferMark({ isPremium }: OfferMarkProps): JSX.Element | null {
  return isPremium ? (
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  ) : null;
}

function OfferName({ title, isFavorite }: OfferNameProps): JSX.Element | null {
  return (
    <div className="offer__name-wrapper">
      <h1 className="offer__name">{title}</h1>
      <FavoriteButton
        rootClassName="offer"
        imageSizes={BOOKMARK_BUTTON_SIZES}
        isFavorite={isFavorite}
      />
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
    maxAdults,
    goods,
    isFavorite,
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
