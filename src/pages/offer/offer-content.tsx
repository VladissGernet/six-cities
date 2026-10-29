// General.
import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

// Components.
import Gallery from '../../components/gallery/gallery';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import OffersMap from '../../components/offers-map/offers-map';
import Places from '../../components/places/places';
import Container from '../../components/container/container';

// This folder.
import OfferHost from './offer-host';
import OfferInside from './offer-inside';

// Utils.
import { capitalizeFirstLetter, pluralizeEn } from '../../utils/utils';
import {
  getOffersByCity,
  getNearOffersWithRestriction,
} from '../../utils/offers';

// Styles.
import styles from './offer.module.css';

// Types.
import type { OfferId } from '../../types/offers';
import { useAppSelector } from '../../hooks/redux';
import {
  getExtraOffer,
  getGroupedOffers,
} from '../../store/offers/offers-selectors';

type OfferContentProps = {
  offerId: OfferId;
};

export default function OfferContent({
  offerId,
}: OfferContentProps): JSX.Element | null {
  const extraOffer = useAppSelector(getExtraOffer);
  const groupedOffers = useAppSelector(getGroupedOffers);

  if (!extraOffer) {
    return null;
  }

  const {
    title,
    isPremium,
    rating,
    type,
    price,
    city,
    location,
    bedrooms,
    description,
    host,
    isFavorite,
    maxAdults,
    goods,
    images,
  } = extraOffer;

  // TODO, fetchNearbyOffers нужно просто обрезать до первых трех городов.
  // Подготовка данных для рендера городов поблизости.
  const groupedOffersByCity = getOffersByCity(city.name, groupedOffers);
  const nearOffers = getNearOffersWithRestriction(
    groupedOffersByCity.offerPlacesByCity,
    offerId,
  );

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
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalizeFirstLetter(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {pluralizeEn(bedrooms, { one: 'bedroom', other: 'bedrooms' })}
              </li>
              <li className="offer__feature offer__feature--adults">
                {pluralizeEn(maxAdults, { one: 'adult', other: 'adults' })}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <OfferInside goods={goods} />
            <OfferHost description={description} host={host} />
            <Reviews />
          </div>
        </Container>
        <Container>
          <OffersMap
            rootClassName="offer__map"
            offers={nearOffers}
            selectedMarkerLocation={location}
          />
        </Container>
      </section>
      <Container className={cn('container', styles['offer__places-container'])}>
        <Places
          rootClassName={cn('near-places', styles['offer__places-content'])}
          title="Other places in the neighbourhood"
          titleClassName="near-places__title"
          groupedOffersByCity={nearOffers}
        />
      </Container>
    </>
  );
}
