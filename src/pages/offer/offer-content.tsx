// General.
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

// Components.
import Gallery from '../../components/gallery/gallery';
import Rating from '../../components/rating/rating';
import Container from '../../components/container/container';
import OfferPlaces from './offer-places';
import OfferMap from './offer-map';
import OfferFeatures from './offer-features';
import OfferReviews from './offer-reviews';

// This folder.
import OfferHost from './offer-host';
import OfferInside from './offer-inside';

// Types.
import { useAppSelector } from '../../hooks/redux';
import { getExtraOffer } from '../../store/selectors/offer';

export default function OfferContent(): JSX.Element | null {
  const extraOffer = useAppSelector(getExtraOffer);

  if (!extraOffer) {
    return null;
  }

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
    images,
  } = extraOffer;

  const bookmarkClass = cn(
    'offer__bookmark-button',
    isFavorite && 'offer__bookmark-button--active',
    'button',
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="offer">
        <Container className="offer__gallery-container container">
          <Gallery images={images} />
        </Container>
        <Container className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <button className={bookmarkClass} type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use href="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <Rating
              rating={rating}
              rootClassName={'offer__rating'}
              starsWrapperClassName={'offer__stars'}
              valueClassName={'offer__rating-value'}
              showValue
            />
            <OfferFeatures
              type={type}
              bedrooms={bedrooms}
              maxAdults={maxAdults}
            />
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <OfferInside goods={goods} />
            <OfferHost description={description} host={host} />
            <OfferReviews />
          </div>
        </Container>
        <OfferMap />
      </section>
      <OfferPlaces />
    </>
  );
}
