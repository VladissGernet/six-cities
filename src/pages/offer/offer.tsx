// General.
import { useParams } from 'react-router-dom';

// Components
import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Gallery from '../../components/gallery/gallery';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import Map from '../../components/map/map';
import Places from '../../components/places/places';

// This folder.
import OfferHost from './offer-host';
import OfferInside from './offer-inside';

// Pages.
import NotFoundPage from '../not-found-page/not-found-page';

// Utils.
import { capitalizeFirstLetter } from '../../utils/utils';
import { createGroupedOffersByCity } from '../../utils/offers';

// Types.
import { Offers, GroupedOffers } from '../../types/offers';

type OfferProps = {
  offers: Offers;
  groupedOffers: GroupedOffers;
};

const MAX_OFFERS = 3;

export default function Offer({
  offers,
  groupedOffers,
}: OfferProps): JSX.Element {
  const { id } = useParams();
  const offer = offers.find((item) => item.id === id);
  if (!offer) {
    return <NotFoundPage />;
  }

  const { title, isPremium, rating, type, price, city } = offer;
  // TODO, решение можно оформить еще более “по-реактовски”: через useMemo, чтобы groupedOffersByCity не пересоздавался на каждом рендере.
  const groupedOffersByCity = createGroupedOffersByCity(
    city.name,
    groupedOffers,
    MAX_OFFERS,
  );

  return (
    <Page>
      <Header />
      <Main isOffer>
        <section className="offer">
          <div className="offer__gallery-container container">
            <Gallery />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className="offer__bookmark-button button" type="button">
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
                  {/* TODO, Исправить на реальное, сейчас mock данные */}3
                  Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  {/* TODO, Исправить на реальное, сейчас mock данные */}
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInside />
              <OfferHost />
              <Reviews />
            </div>
          </div>
          <Map />
        </section>
        <div className="container">
          <Places
            rootClassName="near-places"
            title="Other places in the neighbourhood"
            titleClassName="near-places__title"
            groupedOffersByCity={groupedOffersByCity}
          />
        </div>
      </Main>
    </Page>
  );
}
